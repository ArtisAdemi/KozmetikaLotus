import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            {/* Add routes here */}
            <Route path='/' exact Component={Home} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
