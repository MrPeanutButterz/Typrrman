import './App.css';
import {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import {UserContext} from "./context/UserContext";

//pages
import Typrr from "./pages/Typrr";
import SignIn from './pages/signForm/SignIn';
import SignUp from './pages/signForm/SignUp';
import ChangePassword from './pages/signForm/changePassword';
import ChangeEmail from './pages/signForm/changeEmail';
import Profile from './pages/profile/Profile';
import Page404 from './pages/pageNotFound/Page404'

//components
import NavBar from "./components/navigation/NavBar";

export default function App() {

  const {isAuth} = useContext(UserContext);

  return (
    <>
      <main>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Typrr/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/changepassword" element={<ChangePassword/>}></Route>
          <Route path="/changeemail" element={<ChangeEmail/>}></Route>
          <Route path="/profile" element={isAuth ? <Profile/> : <Typrr/>}></Route>
          <Route path="*" element={<Page404/>}></Route>
        </Routes>
        <footer><a href="https://www.novi.nl/" target="_blank">NOVI Eindopdracht</a></footer>
      </main>
    </>
  );
}
