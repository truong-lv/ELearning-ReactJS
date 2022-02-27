
import './App.css';
import Login from './pages/Login/Login'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div style={{minHeight:'721px'}}>
        <Header/>
        <div >
          <Outlet/>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
