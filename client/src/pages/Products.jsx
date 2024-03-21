import { useEffect, useState } from 'react'
import { Navbar } from '../components'
import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList';


const Products = () => {
  // Getting category from url
  const [category, setCategory] = useState("");
  const { categoryName } = useParams();
  const [productName, setProductName] = useState("");

  useEffect(() => {
    // updating category
    setCategory(categoryName);
  }, [categoryName]);


  const handleInputChange = (e) => {
    setProductName(e.target.value);
  }

  return (
    <div>
        <div className='flex w-full justify-center'>
          <Navbar />
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-[80%] flex justify-between p-10'>
            <div className='flex'>
              <div>
                <h2 className='text-2xl font-bold'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
              <div className='mt-1 ml-2'>
                <span>{category}</span>
              </div>
            </div>
            <div>
              <input className='border border-1 border-[#0C0C0C4F] p-1 px-6' style={{color: 'black'}} type="text" onChange={handleInputChange}  placeholder='Kerko...'/>
            </div>
          </div>
        </div>
        <div>
          <ProductList category={categoryName} productName={productName}/>
        </div>
    </div>
  )
}

export default Products