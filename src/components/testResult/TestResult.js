import "./TestResult.css"
import resetButton from "../../assets/resetBLACK.png"

export default function TestResults() {
  return <>
    <section className="result-container">
      <div className="label">
        <div className="header">
          <h1 className="bold">Typrr Results</h1>
          <div className="divider"></div>
          <p className="bold">Serving size <span className="right">(60s)</span></p>
        </div>

        <div className="divider lg"></div>
        <div className="calories-info">
          <p className="bold sm-text">Experience</p>
          <h1>Amount<span className="right">+score</span></h1>
        </div>

        <div className="divider md"></div>
        <div className="daily-value sm-text">
          <p className="right bold no-divider">Test Value *</p>
          <div className="divider"></div>

          <p><span className="bold">Keystrokes</span><span className="bold right">1</span></p>
          <p className="indent no-divider">Misspelled<span className="right">2</span></p>
          <div className="divider"></div>
          <p className="indent no-divider"><i>Corrections</i><span className="right">3</span></p>
          <div className="divider"></div>

          <p><span className="bold">Total Words</span><span className="right bold">4</span></p>
          <p><span className="bold">Total Lines</span><span className="right bold">5</span></p>
          <p className="indent no-divider">Completed<span className="right">6</span></p>
          <div className="divider lg"></div>

          <p>Words Per Minute<span className="right">7</span></p>
          <p>Accuracy <span className="right">8%</span></p>
          <p className="no-divider">Testing Time<span className="right">1 minute</span></p>
        </div>
        <div className="divider md"></div>

        <p className="note">* The Test Value (TV) shows the value of the users input based on: characters,
          words, lines. At the bottom: Wpm with mistakes en corrections en
          accuracy in percentage. Thank u for using Typrr.
        </p>
      </div>

      <div className="reset-button-container">
        <button
          className="reset-button"
          /*onClick={() => resetTest()}*/
        ><img className="reset-button-img" src={resetButton} alt=""/>
        </button>
      </div>
    </section>
  </>
}