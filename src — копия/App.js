import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from './Authorization';
import Registration from './Registration';
import Main from './Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/registration' element={<Registration></Registration>}></Route>
        <Route path='/authorization' element={<Authorization></Authorization>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
