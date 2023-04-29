import "./Page404.css"

export default function Page404() {
  return <>
    <div className="page-not-found-wrapper">
      <div className="status-container">
        <h1>404</h1>
        <p>page not found</p>
      </div>
      <div id="separator"></div>
      <div className="quote-container">
        <q>Just because someone stumbles, loses their way... <br/>
          doesn't mean they're lost forever.</q>
        <i>-Charles Xavier-</i>
      </div>
    </div>
  </>
}
