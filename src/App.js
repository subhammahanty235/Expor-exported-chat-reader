import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Chats from './components/Chats';

function App() {
  return (
    <>
    <div>
      <Router>
          <Navbar/>
          
          <Routes>
            <Route path='' element={<HomePage/>}/>
            <Route path='/convertedchat' element={<Chats/>}/>
          </Routes>
      </Router>
     
    </div>
    </>
  );
}

export default App;
