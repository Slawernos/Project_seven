import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layout/Layout';
import Dashboard from './pages/DashboardNew';
import Register from './pages/Register'
import * as React from 'react';
import ProfilePage from './pages/Profile';
<<<<<<< Updated upstream
import About from './pages/About';

var ipAddress = "http://" + window.location.toString().split("://")[1].split(":")[0];
=======
>>>>>>> Stashed changes
function App() {
  const navigate = useNavigate();
  var tempauth = { token: null, username: null }
  try {
    tempauth = { token: localStorage.getItem('token'), username: localStorage.getItem('username') }
  }
  catch (err) {
    localStorage.clear();
  }


  const [auth, setAuth] = React.useState(tempauth);


  function login(token, username) {
    if (token != null) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuth({ token, username });
      navigate('/home')
    }
    else {
      alert('wrong credentials')
    }
  }
  function logout() {
    setAuth({ token: null, username: null })
    localStorage.clear();
    navigate('/login')
  }
  return (
    <Layout logout={logout} auth={auth}>
      <Routes>
        <Route path='/' element={<Login login={login} auth={auth} />} exact>

        </Route>
        <Route path='/home' element={<Home login={login} auth={auth} />} exact>

        </Route>
        <Route path='/profile' element={<ProfilePage auth={auth} />} exact>

        </Route>
        <Route path='/login' element={<Login login={login} auth={auth} />} exact>

        </Route>
        <Route path='/dashboard' element={<Dashboard auth={auth} />} exact>

        </Route>
        <Route path='/register' element={<Register auth={auth} />} exact>

        </Route>
        <Route path='/about' element={<About auth={auth} />} exact>

        </Route>
      </Routes>
      {/* <button onClick={getAuth}>AuthCheck</button> */}
    </Layout>
  );
}

export default App;
