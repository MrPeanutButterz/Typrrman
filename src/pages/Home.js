import TextField from '../components/textField/TextField'
import {UserContext} from "../context/UserContext";
import {useContext} from "react";

export default function Home() {

  const {isAuth, user} = useContext(UserContext);

  return <>
    {isAuth ? <p>{user.username}</p> : <p>Hello Stranger</p>}
    <TextField/>
  </>
}