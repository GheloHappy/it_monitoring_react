import './App.css';
import './css/main.css'
import 'bulma/css/bulma.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import Register from './components/Register';
import Login from './components/Login';
import Tablets from './components/tablet/Tablets';
import Auth from './middleware/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Home Component</h1>} />
          <Route exact path='/tablets'element = {<Auth><Tablets /></Auth>} />
          <Route exact path='/laptops' element={<Auth><h1>Laptops Component</h1></Auth>} />
          <Route path='/damages' element={<Auth><h1>Damages Component</h1></Auth>} />
          <Route path='/logout' element={<Auth><Login /></Auth>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
