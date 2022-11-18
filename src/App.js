import './App.css';

import { Routes, Route } from 'react-router-dom';
import Services from './pages/Services';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import NoMatch from './pages/404';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';


import { useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { fetchUser } from './slices/userSlice';
import { signedIn, signedOut, justSignedUp } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import WithAuthenticator from './comps/WithAuthenticator';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          dispatch(fetchUser())
          console.log("signedin")
          break;
        case 'signOut':
          dispatch(signedOut())
          break;
        case 'signUp':
          
          dispatch(justSignedUp())
          dispatch(fetchUser())
          break;
        
      }
    }); 
    
    dispatch(fetchUser())


  }, []);

  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />       
        <Route path="/services" element={<Services/>} />
        <Route path="/faq" element={<FAQ/>} /> 
        <Route path="/contact" element={<Contact/>} /> 
        <Route path="/dashboard" element={<WithAuthenticator><Dashboard/></WithAuthenticator>} /> 
        <Route path="/profile" element={<WithAuthenticator><Profile/></WithAuthenticator>} />
        <Route path="*" element={<NoMatch/>} />
        <Route path="/login" element={<WithAuthenticator/>} />    

      </Routes>
    
  );
}

export default App;
