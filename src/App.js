import './App.css';
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import {UserContext} from "./context/UserContext";

//pages
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Page404 from './pages/Page404'

//components
import NavBar from "./components/navigation/NavBar";

export default function App() {

  const {isAuth} = useContext(UserContext);

  return (
    <>
      <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/profile" element={isAuth ? <Profile/> : <Home/>}></Route>
          <Route path="*" element={<Page404/>}></Route>
        </Routes>
    </>
  );
}
