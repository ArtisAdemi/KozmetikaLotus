import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Navbar, Footer } from './components';
import { AboutUs, ContactUs, Home, Products, Login, Register } from './pages';

function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            {/* Add routes here */}
            <Route path='/' exact Component={Home} />
            <Route path='/products/:categoryName'exact Component={Products}/>
            <Route path='/about'exact Component={AboutUs}/>
            <Route path='/contact'exact Component={ContactUs}/>
            <Route path='/login'exact Component={Login}/>
            <Route path='/register'exact Component={Register}/>
          </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
