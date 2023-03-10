import './App.css';
import './css/main.css'
import 'bulma/css/bulma.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import Register from './components/Register';
import Login from './components/Login';
import Auth from './middleware/Auth';
import Tablets from './components/tablet/Tablets';
import AddTablet from './components/tablet/AddTablet';
import UpdateTablet from './components/tablet/UpdateTablet';
import Transaction from './components/transaction/Transaction';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Home Component</h1>} />
          <Route exact path='/laptops' element={<Auth><h1>Laptops Component</h1></Auth>} />
          <Route path='/damages' element={<Auth><h1>Damages Component</h1></Auth>} />
          <Route path='/logout' element={<Auth><Login /></Auth>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
          <Route exact path='/tablets'element = {<Auth><Tablets /></Auth>} />
          <Route exact path='/tablets/create'element = {<Auth><AddTablet /></Auth>} />
          <Route exact path='/tablets/update/:id'element = {<Auth><UpdateTablet /></Auth>} />

          <Route exact path='/transaction/:action/:item_type/:id' element = {<Auth><Transaction /></Auth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
