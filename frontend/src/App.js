import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register'
import * as React from 'react';

function App() {
  var tempauth = null
  try {
    tempauth = { token: localStorage.getItem('token'), username: localStorage.getItem('username') }
    if (tempauth.token !== null) {
      var authCheck = new Request('http://localhost:5050/api/auth/pingauth', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': JSON.stringify(tempauth)
        }
      });
      fetch(authCheck).then((response) => {
        response.status === 201 ? console.log() : document.location.pathname !== '/login' ? window.location = '/login' : console.log();
      })
    }
    else {
      document.location.pathname !== '/login' ? window.location = '/login' : console.log()
    }
  }
  catch (err) {
    console.log(err)
    localStorage.clear();
  }

  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(tempauth);

  React.useEffect(() => {


    if ((auth == null) && document.location.pathname !== '/login') {
      window.location = '/login';
    }
  }, [auth])


  function login(token, username) {
    setAuth({ token, username });

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    navigate('/')
  }
  function logout() {
    setAuth(null)
    localStorage.clear();
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
