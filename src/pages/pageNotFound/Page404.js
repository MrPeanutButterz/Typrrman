import "./Page404.css"
import {useNavigate} from "react-router-dom";

export default function Page404() {

  const navigate = useNavigate()

  return <>
    <div className="page-not-found">
      <h1>404</h1>
      <div id="separator"></div>
      <div className="quote-container">
        <q>Just because someone stumbles, loses their way... <br/>
          it doesn't mean they're lost forever.</q>
        <i>-Charles Xavier-</i>
      </div>
    </div>
  </>
}
