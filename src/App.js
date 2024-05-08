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
import PrivacyPolicy from './pages/PrivacyPolicy';
import EnrolledCoursePage from './pages/courses/EnrolledCoursePage';
import LecturePage from './pages/courses/LecturePage';
import ModulePage from './pages/courses/ModulePage';
import ArticleDetailPage from './pages/articles/ArticleDetailPage';


function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
            <Header />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/courses" element={<CoursesListPage />} />
              <Route path="/courses/:id" element={<CourseDetailPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/courses/:id' element={<EnrolledCoursePage />} />
              <Route path='/profile/update' element={<EditProfilePage />} />
              <Route path='/profile/courses/:id/topics/:topicId/lectures/:lectureId' element={<LecturePage />} />
              <Route path='/profile/courses/:id/topics/:topicId/modules/:moduleId' element={<ModulePage />} />

              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/articles' element={<ArticlesPage />} />
              <Route path='/articles/:id' element={<ArticleDetailPage />} />
              <Route path='/policy' element={<PrivacyPolicy />} />
            </Routes>

            <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
