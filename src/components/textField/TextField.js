import "./TextField.css"
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import TestResults from "../testResult/TestResult";
import resetButton from "../../assets/resetBLACK.png";
import {UserContext} from "../../context/UserContext";


export default function TextField() {

  const {uploadScore} = useContext(UserContext);


  const [test, setTest] = useState({
    hasStarted: false, completed: false, lengthInSeconds: 60000, startTime: 0, finishTime: 0, api: 1,
  })

  const [text, setText] = useState({
    original: "",
    words: [],
    onScreenGhost: [],
    onScreenUser: [],
    classArray: [],
    charIdx: 0,
    wordIdx: 0,
    sentenceIdx: 0,
  })

  const [score, setScore] = useState({
    keyStrokes: {
      total: 0, mistake: 0, corrected: 0,
    }, wordsTotal: 0, xrp: 0, wpm: 0, acc: 0,
  })

  useEffect(() => {

    if (test.api === 0 && text.original === "") {
      void fetchTechyText()

    } else if (test.api === 1 && text.original === "") {
      void fetchWhatTheCommitText()

    }
  }, []);

  async function fetchTechyText() {
    try {

      const response = await axios.get("https://techy-api.vercel.app/api/json")
      let sentence = response.data.message + ". "

      setText({
        ...text,
        original: sentence,
        words: sentence.split(" "),
        onScreenGhost: sentence.split(""),
        onScreenUser: [],
        classArray: [],
        charIdx: 0,
        wordIdx: 0,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchWhatTheCommitText() {
    try {

      const response = await axios.get("https://whatthecommit.com/index.txt")
      let sentence = response.data + " "

      setText({
        ...text,
        original: sentence,
        words: sentence.split(" "),
        onScreenGhost: sentence.split(""),
        onScreenUser: [],
        classArray: [],
        charIdx: 0,
        wordIdx: 0,
      })
    } catch (error) {
      console.error(error)
    }
  }

  function updateScoreKeystroke(total, corrected, mistake) {

    //always update keystroke total
    setScore({
      ...score, keyStrokes: {
        total: score.keyStrokes.total += total,
        corrected: score.keyStrokes.corrected += corrected,
        mistake: score.keyStrokes.mistake += mistake,
      },
    })
  }

  function onCharacterForwards(key) {

    const user = text.onScreenUser
    const ghost = text.onScreenGhost
    const classArr = text.classArray
    let charIndex = text.charIdx

    if (key === text.original[text.charIdx]) {

      //on equal remove fist character from ghost en add push in user with correct class
      user.push(ghost.shift())
      classArr.push("correct")
      charIndex += 1

      //update keystrokes
      updateScoreKeystroke(1, 0, 0)

    } else {

      //on un-equal key push key in user with incorrect class
      user.push(key)
      classArr.push("incorrect")

      //update keystrokes
      updateScoreKeystroke(1, 0, 1)
    }

    //update state
    setText({
      ...text, classArray: classArr, onScreenUser: user, onScreenGhost: ghost, charIdx: charIndex,
    })
  }

  function onSpaceBar(key) {

    const user = text.onScreenUser
    const ghost = text.onScreenGhost
    const classArr = text.classArray
    let charIndex = text.charIdx
    let wordIndex = text.wordIdx

    if (key === text.original[text.charIdx]) {

      //on space equal to key remove fist character from ghost en add push in user with correct class
      user.push(ghost.shift())
      classArr.push("correct")
      charIndex += 1
      wordIndex += 1

      //update keystrokes
      updateScoreKeystroke(1, 0, 0)

    } else if (key !== text.original[text.charIdx] && text.onScreenGhost.length !== 0) {

      //on unequal to key find remaining chars until next space en push to user with skipped class
      let indexToNextSpace = ghost.indexOf(" ")
      for (let i = 0; i <= indexToNextSpace; i++) {
        user.push(ghost.shift())
        classArr.push("skipped")
        charIndex += 1

        //update keystrokes
        updateScoreKeystroke(1, 0, 1)
      }
      wordIndex += 1
    }

    //update state
    setText({
      ...text, classArray: classArr, onScreenUser: user, onScreenGhost: ghost, charIdx: charIndex, wordIdx: wordIndex,
    })
  }

  function onCharacterBackwards() {

    const user = text.onScreenUser
    const ghost = text.onScreenGhost
    const classArr = text.classArray
    let charIndex = text.charIdx
    let wordIndex = text.wordIdx

    if (text.classArray[text.classArray.length - 1] === "correct") {

      //previous class is correct or skipped remove last class
      //remove last character from user en push in ghost
      ghost.unshift(user.pop())
      classArr.pop()
      charIndex -= 1

    } else if (text.classArray[text.classArray.length - 1] === "skipped") {

      //same as correct but different keystroke count
      ghost.unshift(user.pop())
      classArr.pop()
      charIndex -= 1

      //update keystrokes
      updateScoreKeystroke(0, 1, 0)

    } else if (text.classArray[text.classArray.length - 1] === "incorrect") {

      //previous class is incorrect remove last class
      //remove last character from user
      user.pop()
      classArr.pop()

      //update keystrokes
      updateScoreKeystroke(0, 1, 0)
    }

    //update word index
    if (text.onScreenGhost[0] === " ") {
      wordIndex -= 1
    }

    //update state
    setText({
      ...text, classArray: classArr, onScreenUser: user, onScreenGhost: ghost, charIdx: charIndex, wordIdx: wordIndex,
    })
  }

  function onMultipleCharacterBackwards() {

    const user = text.onScreenUser
    let ghost = text.onScreenGhost
    const classArr = text.classArray
    let charIndex = text.charIdx
    let wordIndex = text.wordIdx

    //update word index
    if (text.onScreenUser[text.onScreenUser.length - 1] === " ") {
      wordIndex -= 1
    }

    function removeLastChar() {
      if (classArr[classArr.length - 1] === "correct") {

        //previous class is correct or skipped remove last class remove last character from user en push in ghost
        ghost.unshift(user.pop())
        classArr.pop()
        charIndex -= 1

      } else if (classArr[classArr.length - 1] === "skipped") {

        //same as correct but different keystroke count
        ghost.unshift(user.pop())
        classArr.pop()
        charIndex -= 1

        //update keystrokes
        updateScoreKeystroke(0, 1, 0)

      } else if (classArr[classArr.length - 1] === "incorrect") {

        //previous class is incorrect delete last class delete last character from user
        user.pop()
        classArr.pop()

        //update keystrokes
        updateScoreKeystroke(0, 1, 0)
      }
    }

    //pre remove last character to compensate for word index
    removeLastChar()

    //get last index of space for deleting characters en classes
    const lastIndex = user.lastIndexOf(" ")

    for (let i = user.length; i > lastIndex + 1; i--) {
      removeLastChar()
    }

    //update state
    setText({
      ...text, classArray: classArr, onScreenUser: user, onScreenGhost: ghost, charIdx: charIndex, wordIdx: wordIndex,
    })
  }

  function onEnter() {

    // reset parameters en fetch new data
    if (text.onScreenGhost.length <= 2) {
      if (test.api === 0) {
        void fetchTechyText()

      } else if (test.api === 1) {
        void fetchWhatTheCommitText()
      }

      //update state
      setText({
        ...text, sentenceIdx: text.sentenceIdx += 1,
      })

      setScore({
        ...score, words: {
          total: score.wordsTotal += text.wordIdx,
        }
      })
    }
  }

  function onResetButton() {

    setTest({
      ...test, hasStarted: false, completed: false, startTime: 0, finishTime: 0,
    })

    setScore({
      keyStrokes: {
        total: 0, mistake: 0, corrected: 0,
      }, wordsTotal: 0, xrp: 0, wpm: 0, acc: 0,
    })

    // reset parameters en fetch new data
    if (test.api === 0) {
      void fetchTechyText()

    } else if (test.api === 1) {
      void fetchWhatTheCommitText()
    }
  }

  function handleUserInput(e) {

    // Handles user input based on the key pressed

    //timer
    timer(e.timeStamp)

    if (e.keyCode === 112 || e.keyCode === 113 || e.keyCode === 114 || e.keyCode === 115 || e.keyCode === 116 || e.keyCode === 117 || e.keyCode === 118 || e.keyCode === 119 || e.keyCode === 120 || e.keyCode === 121 || e.keyCode === 122 || e.keyCode === 123 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 33 || e.keyCode === 34 || e.keyCode === 46 || e.keyCode === 35 || e.keyCode === 36 || e.altKey || e.keyCode === 18 || e.keyCode === 20 || e.keyCode === 222 || e.keyCode === 16 || e.keyCode === 9 || e.keyCode === 173 || e.keyCode === 174 || e.keyCode === 175 || e.keyCode === 27 || e.keyCode === 177 || e.keyCode === 179 || e.keyCode === 176 || e.keyCode === 91 || e.keyCode === 192) {

      // Disabled keys: F-keys, arrows, pageup pagedown, home end.
      e.preventDefault()

    } else if (e.ctrlKey && e.keyCode === 46) {

      // Control Del
      e.preventDefault()

    } else if (e.keyCode === 8 && e.ctrlKey) { // ============================ WORD <--- WORD

      //ctrl backspace
      onMultipleCharacterBackwards()

    } else if (e.ctrlKey) {

      //catch key ctrl to prevent "control" input in text.user

    } else if (e.keyCode === 32) { // ======================================== WORD ---> WORD

      // Space bar
      onSpaceBar(e.key)

    } else if (e.keyCode === 13) { // ======================================== LINE -<>- LINE

      // Enter
      onEnter()

    } else if (e.keyCode === 8) { // ===================================== CARROT <--- CARROT

      // Backspace
      onCharacterBackwards()

    } else { // ========================================================== CARROT ---> CARROT

      // Letter
      onCharacterForwards(e.key)

    }
  }

  function timer(time) {

    //handles timing of the test en calculates result

    if (!test.hasStarted) {

      //register start en finish time en set hasStarted true
      setTest({
        ...test, startTime: time, finishTime: time + test.lengthInSeconds, hasStarted: true,
      })

    } else if (time > test.finishTime) {

      const minute = 1
      const wpm = (score.keyStrokes.total / 5) / 1
      const acc = (score.keyStrokes.total - (score.keyStrokes.mistake - score.keyStrokes.corrected)) / score.keyStrokes.total * 100

      setScore({
        ...score,
        wpm: wpm,
        acc: acc,
      })

      setTest({...test, hasStarted: true, completed: true,})
      uploadScore(wpm)
    }
  }

  function theTest() {
    return (
      <section className="text-area-container">
        <div className="text-field">

          <span className="text-area-user">
          {text.onScreenUser.map((letter, index) => <span
            key={index}
            className={text.classArray[index]}
          >{letter}</span>)}
          </span>

          <span className="text-area-ghost">
          {text.onScreenGhost.map((letter, index) => <span
            key={index}
            className="ghost-character"
          >{letter}</span>)}
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
      </section>);
  }

  function theResults() {
    return <>
      <section>
        <TestResults
          keystrokeTotal={score.keyStrokes.total}
          keystrokeMisspelled={score.keyStrokes.mistake}
          keystrokeCorrected={score.keyStrokes.corrected}
          wordsTotal={score.wordsTotal}
          sentenceTotal={text.sentenceIdx}
          wpm={(score.keyStrokes.total / 5) / 1}
          acc={((score.keyStrokes.total - (score.keyStrokes.mistake - score.keyStrokes.corrected)) / score.keyStrokes.total * 100).toPrecision(4)}
          reset={onResetButton}
        />
        <div className="reset-button-container">
          <button
            className="reset-button"
            onClick={() => onResetButton()}
          ><img className="reset-button-img" src={resetButton} alt=""/>
          </button>
        </div>
      </section>
    </>
  }

  return (<> {!test.completed ? theTest() : theResults()} </>)
}
