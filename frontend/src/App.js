import { Routes , Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import useAuth from './Components/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
     <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
