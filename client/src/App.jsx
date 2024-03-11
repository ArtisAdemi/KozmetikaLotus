import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Navbar, Footer } from './components';
import { AboutUs, ContactUs, Home, Products, SingleProduct } from './pages';



function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            {/* Add routes here */}
            <Route path='/' exact Component={Home} />
            <Route path='/products/:categoryName'exact Component={Products}/>
            <Route path='/products/:categoryName/:productName'exact Component={SingleProduct}/>
            <Route path='/about'exact Component={AboutUs}/>
            <Route path='/contact'exact Component={ContactUs}/>
          </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
