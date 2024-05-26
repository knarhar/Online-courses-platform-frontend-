import './App.css';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import ScrollToTop from './assets/ScrollToTop';
import AddArticle from './pages/articles/AddArticle';
import AddCoursePage from './pages/courses/AddCoursePage';
import AddLecturePage from './pages/courses/AddLecturePage';
import AddModulePage from './pages/courses/AddModulePage';


function Layout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/' element={<Layout />} >
                <Route path='/' element={<HomePage />}/>
                <Route path="/courses" element={<CoursesListPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path='/courses/add' element={<AddCoursePage/>}/>
                <Route path='/courses/add-lecture' element={<AddLecturePage/>}/>
                <Route path='/courses/add-module' element={<AddModulePage/>}/>
                <Route path='/home' element={<HomePage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/profile/courses/:id' element={<EnrolledCoursePage />} />
                <Route path='/profile/update' element={<EditProfilePage />} />
                <Route path='/profile/courses/:id/topics/:topicId/lectures/:lectureId' element={<LecturePage />} />
                <Route path='/profile/courses/:id/topics/:topicId/modules/:moduleId' element={<ModulePage />} />

                <Route path='/about' element={<AboutUsPage />} />
                <Route path='/articles' element={<ArticlesPage />} />
                <Route path='/articles/:id' element={<ArticleDetailPage />} />
                <Route path='/add-article' element={<AddArticle/>}/>
                <Route path='/policy' element={<PrivacyPolicy />} />
                </Route>
            </Routes>

        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
