import "./Typrr.css"
import React, {useState} from "react";

export default function TextField() {

  const [test, setTest] = useState({
    hasStarted: false,
    completed: false,
  })

  const [text, setText] = useState({
    original: "",
    words: [],
    inGhost: "",
    byUser: "",
  })

  const [score, setScore] = useState({
    keyStrokes: 0,
    correct: 0,
    mistake: 0,
    xrp: 0,
    wpm: 0,
    acc: 0,
  })


  function carrotForwardsBy(amount) {

  }

  function carrotBackwardsBy(amount) {

  }

  function handleUserInput(e) {

    if (e.keyCode >= 48 && e.keyCode <= 57) {
      console.log("number")

    } else if (e.keyCode === 8 || e.keyCode === 13 || e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 18
      || e.keyCode === 20 || e.keyCode === 32) {
      console.log("ctrl shift caps enter backspace")

    } else if (e.keyCode === 186 || e.keyCode === 187 || e.keyCode === 188 || e.keyCode === 189
      || e.keyCode === 190 || e.keyCode === 219 || e.keyCode === 220 || e.keyCode === 221 || e.keyCode === 222) {
      console.log("special chars")

    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      console.log("Yes")

    }
  }


  const userArr = "Hello, is it me you are looking for... I can see it in you eyes, ".split("")
  const ghostArr = "I can see it in you smile.".split("")

  return (
    <section className="text-area-container">
      <div className="text-field">

      <span className="text-area-user">
        {userArr.map((letter, index) =>
          <span
            key={index}
            className="user-character"
          >{letter}</span>
        )}
      </span>

        <span className="text-area-ghost">
        {ghostArr.map((letter, index) =>
          <span
            key={index}
            className="ghost-character"
          >{letter}</span>
        )}
      </span>

        <textarea
          autoFocus
          spellCheck="false"
          className="text-area-input"
          onKeyDown={(e) => {
            handleUserInput(e)
          }}
        ></textarea>

      </div>
    </section>
  );
}