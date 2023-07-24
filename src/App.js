import { useEffect, useState } from 'react';
import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import Login from './components/Login/Login';
import loadin from '../src/imgs/loading-state.gif'

function App() {
  const [hideCards, setHideCards] = useState(false)
  const [loggedin, setLoggedin] = useState(false)
  const [render,setRender] = useState(false)

  const [success, setSuccess] = useState(false);

  const checkAuthentication = () => {
    const token = localStorage.getItem('jwt_token');
    const user = JSON.parse(localStorage.getItem('user'));
    const expirationDate = localStorage.getItem('expirationDate');
  
    if (token && user && expirationDate) {
      const currentTime = new Date().getTime();
      if (currentTime < expirationDate) {
        setLoggedin(true)
      }
    }
    else{
      setLoggedin(false)
    }
  };
useEffect(checkAuthentication,[render])
useEffect(() => {setSuccess(true);
  const timer = setTimeout(() => {
    setSuccess(false);
  }, 1000);

  return () => clearTimeout(timer);
}, [hideCards])

  return (
      <div className="App">
        {success && <div className='success'><img src={loadin} alt="loading" style={{ width: "200px", height: "200px" }} /></div>}
        {loggedin && <div className="AppGlass">
          <Sidebar setHideCards={setHideCards} render={render} setRender={setRender}/>
          <MainDash setHideCards={setHideCards} hideCards={hideCards} setSuccess={setSuccess}/>
          <RightSide />
        </div>}
        {!loggedin && <Login render={render} setRender={setRender} setHideCards={setHideCards}/>}
      </div>

  );
}

export default App;
