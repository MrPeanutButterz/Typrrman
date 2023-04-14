import './App.css';
import {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import {UserContext} from "./context/UserContext";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Typrrman from './pages/Typrrman';

export default function App() {

  const { isAuth } = useContext(UserContext);

  return (
      <>
        <div>
          <Switch>
            <Route exact path="/" component={Typrrman}/>
            <Route exact path="/signin" component={SignUp}/>
            <Route exact path="/signup" component={SignIn}/>
            <Route exact path="/profile" component={ isAuth ? Profile : Typrrman}/>
          </Switch>
        </div>
      </>
  );
}
