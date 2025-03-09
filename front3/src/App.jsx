
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Login from './Login';
import Register from './Register';




import Navbar from './Navbar';

import './App.css';
import Linkpage from './Linkpage';
import Dashboard from './Dashboard';

import BlogPage from './Blogpage';


const App = () => {
  const location = useLocation();
 

  const showNavbar = ['/dash','/link'].some((path) =>
    location.pathname.startsWith(path)
  );



  // Redirect to long URL when short URL is visited



  return (
    <div>
      <Toaster />
      {showNavbar && <Navbar />}

      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
   
     
        <Route path="/link/:userId/" element={<Linkpage />} />
    
        <Route path="/dash" element={<Dashboard />} />
      
        <Route path="/blog/:postId" element={<BlogPage />} />
      </Routes>
    </div>
  );
};

export default App;
