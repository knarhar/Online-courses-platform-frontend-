import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './assets/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/profile/ProfilePage'
import RegisterPage from './pages/register/RegisterPage';
import AboutUsPage from './pages/about us/AboutUsPage';
import CoursesListPage from './pages/courses/CoursesListPage';
import CourseDetailPage from './pages/courses/CourseDetailPage';
import ArticlesPage from './pages/articles/ArticlesPage';
import EditProfilePage from './pages/profile/EditProfilePage';
function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/courses" element={<CoursesListPage/>} />
          <Route path="/courses/:id" element={<CourseDetailPage/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/profile/update' element={<EditProfilePage/>}/>
          <Route path='/about' element={<AboutUsPage/>}/>
          <Route path='/articles' element={<ArticlesPage/>}/>

        </Routes>

        <Footer/>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
