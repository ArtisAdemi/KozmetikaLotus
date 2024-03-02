import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Navbar } from './components';
import { AboutUs, ContactUs, Home, Products } from './pages';

function App() {
  return (
    <div className='App'>
      <div className='flex w-full justify-center mt-5'>
        <Navbar />
      </div>
      <Router>
          <Routes>
            {/* Add routes here */}
            <Route path='/' exact Component={Home} />
            <Route path='/products'exact Component={Products}/>
            <Route path='/about'exact Component={AboutUs}/>
            <Route path='/contact'exact Component={ContactUs}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
