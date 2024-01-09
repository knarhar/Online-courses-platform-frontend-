import './App.css';
import CoursesListPage from './pages/CoursesListPage'
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Login from './components/Login';
function App() {
  return (
    <div className="App">

      <Header/>
      MY APP
      <RegisterPage/>
    </div>
  );
}

export default App;
