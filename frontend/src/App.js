import './App.css';
import './css/main.css'
import 'bulma/css/bulma.min.css';
import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import Nav from './components/Nav.js';
import Register from './components/Register';
import Login from './components/Login';
import Auth from './middleware/Auth';
import Home from './components/home/Home';
import Tablets from './components/tablet/Tablets';
import AddTablet from './components/tablet/AddTablet';
import UpdateTablet from './components/tablet/UpdateTablet';
import Requests from './components/request/Requests';
import CreateRequest from './components/request/CreateRequest';
import Transaction from './components/transaction/Transaction';
import Inventory from './components/inventory/Inventory';
import CompleteRequest from './components/request/CompleteRequest';
import PrintRequest from './components/request/PrintRequest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;

  const shouldShowNav = !pathname.includes('/requests/print');

  return (
    <>
      {shouldShowNav && <Nav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/laptops' element={<Auth><h1>Laptops Component</h1></Auth>} />
        <Route path='/damages' element={<Auth><h1>Damages Component</h1></Auth>} />
        <Route path='/logout' element={<Auth><Login /></Auth>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        
        <Route exact path='/tablets' element={<Auth><Tablets /></Auth>} />
        <Route exact path='/tablets/create' element={<Auth><AddTablet /></Auth>} />
        <Route exact path='/tablets/update/:id' element={<Auth><UpdateTablet /></Auth>} />

        <Route exact path='/requests' element={<Auth><Requests /></Auth>} />
        <Route exact path='/requests/create' element={<Auth><CreateRequest /></Auth>} />
        <Route exact path='/requests/update/:id' element={<Auth><CompleteRequest /></Auth>} />
        <Route exact path='/requests/print/:id' element={<Auth><PrintRequest /></Auth>} />

        <Route exact path='/transaction/:action/:item_type/:id' element={<Auth><Transaction /></Auth>} />

        <Route exact path='/inventory' element={<Auth><Inventory /></Auth>} />
      </Routes>
    </>
  );
}

export default App;
