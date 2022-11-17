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

import { Authenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { fetchUser } from './slices/userSlice';
import { signedIn, signedOut, justSignedUp } from './slices/userSlice';
import { useDispatch } from 'react-redux';

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
          console.log("out")
          break;
        case 'signUp':
          dispatch(fetchUser())
          dispatch(justSignedUp())
          console.log("just")
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
        <Route path="/dashboard" element={<Authenticator><Dashboard/></Authenticator>} /> 
        <Route path="/profile" element={<Authenticator><Profile/></Authenticator>} />
        <Route path="*" element={<NoMatch/>} />
        <Route path="/login" element={<Authenticator/>} />    

      </Routes>
    
  );
}

export default App;
