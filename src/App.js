import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfilePage from './pages/profile/ProfilePage'
import RegisterPage from './pages/register/RegisterPage';
import CoursesListPage from './pages/CoursesListPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './assets/AuthContext';
function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/courses" element={<CoursesListPage/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>

        <Footer/>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
