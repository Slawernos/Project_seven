import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register'
import * as React from 'react';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(null);
  React.useEffect(() => {

    if ((auth == null) && document.location.pathname !== '/login') {
      window.location = '/login';
    }
  }, [auth])


  function login(token, username) {
    setAuth({ token, username });
    navigate('/')
  }
  function logout() {
    setAuth(null)
    navigate('/login')
  }
  return (
    <Layout logout={logout} auth={auth}>
      <Routes>
        <Route path='/' element={<Home auth={auth} />} exact>

        </Route>
        <Route path='/login' element={<Login login={login} auth={auth} />} exact>

        </Route>
        <Route path='/dashboard' element={<Dashboard auth={auth} />} exact>

        </Route>
        <Route path='/register' element={<Register auth={auth} />} exact>

        </Route>
      </Routes>
      {/* <button onClick={getAuth}>AuthCheck</button> */}
    </Layout>
  );
}

export default App;
