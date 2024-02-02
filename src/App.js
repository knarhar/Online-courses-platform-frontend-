import './App.css';
import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegisterPage from './pages/register/RegisterPage';
import CoursesListPage from './pages/CoursesListPage';
function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        MY APP
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/courses" element={<CoursesListPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
