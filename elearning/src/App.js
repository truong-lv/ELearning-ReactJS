
import './App.css';
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom';

function App() {
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

export default App;
