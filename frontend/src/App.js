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
  var tempauth = { token: null, username: null }
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
        response.status === 201 ? console.log() : document.location.pathname !== '/login' ? document.location.pathname = '/login' : console.log('Authenticated!');
      })
    }
    else {
      document.location.pathname !== '/login' ? document.location.pathname = '/login' : console.log('Authenticated!');
    }
  }
  catch (err) {
    console.log(err)
    localStorage.clear();
  }


  const [auth, setAuth] = React.useState(tempauth);


  function login(token, username) {
    if (token != null) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuth({ token, username });
      navigate('/dashboard')
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
