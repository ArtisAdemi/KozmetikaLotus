import React, { useState, useEffect } from 'react';

const CategoriesInput = ({ categoriesFromBackend, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    setCategories(categoriesFromBackend);
  }, [categoriesFromBackend]);

  const handleCategoryChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selected);
    onUpdate(selected); // Notify the parent component about the update
  };

  const handleNewCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      const updatedCategories = [...categories, newCategoryName];
      setCategories(updatedCategories);
      setNewCategoryName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategory(e);
    }
  };

  return (
    <div>
      <select multiple value={selectedCategories} onChange={handleCategoryChange} className="w-full">
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <form onSubmit={addCategory} className="flex mt-2">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategoryName}
          onChange={handleNewCategoryNameChange}
          onKeyPress={handleKeyPress} // Handle Enter key press
          className="flex-1"
        />
        <button type="submit" onClick={addCategory}>Add</button>
      </form>
    </div>
  );
};

export default CategoriesInput;