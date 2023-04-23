import "./TestResult.css"

export default function TestResults({keystrokeTotal, keystrokeMisspelled, keystrokeCorrected, wordsTotal, sentenceTotal, wpm, acc}) {
  return <>
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

          <p><span className="bold">Keystrokes</span><span className="bold right">{keystrokeTotal}</span></p>
          <p className="indent no-divider">Misspelled<span className="right">{keystrokeMisspelled}</span></p>
          <div className="divider"></div>
          <p className="indent no-divider"><i>Corrections</i><span className="right">{keystrokeCorrected}</span></p>
          <div className="divider"></div>

          <p><span className="bold">Total Words</span><span className="right bold">{wordsTotal}</span></p>
          <p><span className="bold">Total Lines</span><span className="right bold">{sentenceTotal + 1}</span></p>
          <p className="indent no-divider">Completed<span className="right">{sentenceTotal}</span></p>
          <div className="divider lg"></div>

          <p>Words Per Minute<span className="right">{wpm}</span></p>
          <p>Accuracy <span className="right">{acc}%</span></p>
          <p className="no-divider">Testing Time<span className="right">1 minute</span></p>
        </div>
        <div className="divider md"></div>

        <p className="note">* The Test Value (TV) shows the value of the users input based on: characters,
          words, lines. At the bottom: Wpm with mistakes en corrections en
          accuracy in percentage. Thank u for using Typrr.
        </p>
      </div>
  </>
}