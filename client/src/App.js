import {Routes, Route} from 'react-router';

// Components
import Header from './components/Header';
import SideNav from './components/SideNav';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Profile from './pages/ProfilePage';
import AboutUs from './pages/AboutUs';
import Feed from './pages/Feed';
import PrivacyPolicy from './pages/PrivacyPolicy';


const App = () => {

  return (
    <>
      {/* <Header />
      <SideNav /> */}
      {/* Routing Path */}
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App;