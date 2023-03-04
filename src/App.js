import logo from './logo.svg';
import './App.css';
import SignUP from './Component/Pages/SingnUp';
import Login from './Component/Pages/Login';
import { Route, Routes ,Switch} from 'react-router-dom';
import Header from './Component/Header/Header';
import Welcome from './Component/Pages/Welcome';
import { useContext, useState } from 'react';
import AuthContext from './Component/store/AuthContext';
import CompleteProfile from './Component/Pages/CompleteProfile';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DownloadButton from './Component/Pages/DownLoad';


function App() {
  const show = useSelector(state=>state.authAction.isLogin)
  const dark = useSelector(state=>state.dark.showDarkTheme)
  console.log(dark)
  const [user,setuser] = useState(false)
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  
  const [showDarkTheme,setshowDarkTheme] = useState(dark)
  return (
    <div style={{backgroundColor:dark?'darkslategrey':'lightgrey'}}  >
    
    {<Header/>}
    
    <Routes>
    
     {<Route path='signup' element={<SignUP/>} />}
     {<Route  path='/' element={<Login/>}/>}
     {<Route path='/welcome' element={<Welcome/>}/>}
     
     {<Route path='completeprofile' element = {<CompleteProfile/>}/>}
    </Routes>
    
    </div>
  );
}

export default App;
