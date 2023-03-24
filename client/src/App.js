import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signin from './Component/Signin/SignIn';
import SignUp from './Component/SignUp/Signup';
import Home from './Component/Home/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Signin/>}/>
        <Route exact path="/signUp" element={<SignUp/>}/>
        <Route exact path="/signIn" element={<Signin/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
