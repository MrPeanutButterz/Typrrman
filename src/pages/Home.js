import TextField from '../components/textField/TextField'
import {UserContext} from "../context/UserContext";
import {useContext} from "react";

export default function Home() {

  const {user} = useContext(UserContext);

  return <>
    <p>{user.username}</p>
    <TextField/>
  </>
}