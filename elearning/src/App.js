
import './App.css';
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom';

export function CustomerApp() {
  return (
    <div>
        <Header/>
        <div >
          <Outlet/>
        </div>
        <Footer/>
    </div>
  );
}

export function AdminApp() {
  return (
    <div>
        <Header/>
        <div >
          <Outlet/>
        </div>
        <Footer/>
    </div>
  );
}
