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
          <div className='w-[80%] md:flex justify-between p-10 ml-[-35px]'>
            <div className='flex '>
              <div>
                <h2 className='text-2xl font-bold text-[#292929]'>Produktet</h2>
              </div>
              <div className='mt-1 ml-2'>
                <FontAwesomeIcon icon={faChevronRight} color='#292929'/>
              </div>
              <div className='mt-1 ml-2 text-[#292929]'>
                <span>{category}</span>
              </div>
            </div>
            <div>
              <input className='border border-1 w-[180px] md:w-[250px] border-[#0C0C0C4F] rounded-md p-1 px-6 ' style={{color: 'black'}} type="text" onChange={handleInputChange}  placeholder='Kerko...'/>
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