import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/Login'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'

function App() {
  return (
    <div style={{'min-height':'721px'}}>
        <Header/>
        <Login/>
        <Footer/>
    </div>
  );
}

export default App;
