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

function App() {
  const [user,setuser] = useState(false)
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  
  return (
    <div>
    <Header/>
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
