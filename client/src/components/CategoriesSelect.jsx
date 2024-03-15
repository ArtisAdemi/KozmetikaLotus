import React, { useState, useEffect } from 'react';

const CategoriesInput = ({ categoriesFromBackend, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    // Assuming categoriesFromBackend is an array of category names
    setCategories(categoriesFromBackend);
  }, [categoriesFromBackend]);

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategories(prevSelected => {
      const updatedSelectedCategories = prevSelected.includes(categoryName)
        ? prevSelected.filter(name => name !== categoryName)
        : [...prevSelected, categoryName];
      onUpdate(updatedSelectedCategories); // This looks correct
      return updatedSelectedCategories;
    });
  };

  const handleNewCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories(prevCategories => [...prevCategories, newCategoryName]);
      setNewCategoryName('');
    }
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`category-${index}`}
            value={category}
            onChange={() => handleCheckboxChange(category)}
            checked={selectedCategories.includes(category)}
          />
          <label htmlFor={`category-${index}`}>{category}</label>
        </div>
      ))}
      <div className="flex mt-2">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategoryName}
          onChange={handleNewCategoryNameChange}
          className="flex-1"
        />
        <button type="button" onClick={addCategory}>Add</button>
      </div>
    </div>
  );
};

export default CategoriesInput;
