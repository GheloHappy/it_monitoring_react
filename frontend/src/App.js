import './App.css';
import './css/main.css'
import 'bulma/css/bulma.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.js';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1>Home Component</h1>}/>
          <Route path='/tablets' element={<h1>Tablets Component</h1>}/>
          <Route path='/laptops' element={<h1>Laptops Component</h1>}/>
          <Route path='/damages' element={<h1>Damages Component</h1>}/>
          <Route path='/logout' element={<h1>Logout Component</h1>}/>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
