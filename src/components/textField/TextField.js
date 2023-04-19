import "./TextField.css"
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function TextField() {

  //todo add on correct
  //todo add on incorrect
  //todo add on backspace
  //todo add on space
  //todo add on enter
  //todo add on ctrl backspace


  const [test, setTest] = useState({
    hasStarted: false,
    completed: false,
    seconds: 60000,
    startTime: 0,
    finishTime: 0,
    api: 0,
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
      total: 0,
      mistake: 0,
      corrected: 0,
    },
    xrp: 0,
    wpm: 0,
    acc: 0,
  })

  useEffect(() => {

    if (test.api === 0 && text.original === "") {
      fetchTechyText()

    } else if (test.api === 1 && text.original === "") {
      fetchWhatTheCommitText()

    }
  }, []);

  async function fetchTechyText() {
    try {

      const response = await axios.get("https://techy-api.vercel.app/api/json")
      let sentence = response.data.message

      const regex = /[^a-zA-Z ]/g;
      sentence = sentence.replace(regex, "") + ". "

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
    } catch
      (error) {
      console.error(error)
    }
  }

  async function fetchWhatTheCommitText() {
    try {

      const response = await axios.get("https://whatthecommit.com/index.txt")
      let sentence = response.data

      const regex = /[^a-zA-Z ]/g;
      sentence = sentence.replace(regex, "") + "."

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
      ...score,
      keyStrokes: {
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

    } else {

      //on un-equal key push key in user with incorrect class
      user.push(key)
      classArr.push("incorrect")
    }

    //update state
    setText({
      ...text,
      classArray: classArr,
      onScreenUser: user,
      onScreenGhost: ghost,
      charIdx: charIndex,
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

    } else {

      //on unequal to key find remaining chars until next space en push to user with skipped class
      let indexToNextSpace = ghost.indexOf(" ")
      for (let i = 0; i <= indexToNextSpace; i++) {
        user.push(ghost.shift())
        classArr.push("skipped")
        charIndex += 1
      }
      wordIndex += 1
    }

    //update state
    setText({
      ...text,
      classArray: classArr,
      onScreenUser: user,
      onScreenGhost: ghost,
      charIdx: charIndex,
      wordIdx: wordIndex,
    })
  }

  function onCharacterBackwards() {

    const user = text.onScreenUser
    const ghost = text.onScreenGhost
    const classArr = text.classArray
    let charIndex = text.charIdx
    let wordIndex = text.wordIdx

    if (text.classArray[text.classArray.length - 1] === "correct"
      || text.classArray[text.classArray.length - 1] === "skipped") {

      //previous class is correct or skipped remove last class
      //remove last character from user en push in ghost
      ghost.unshift(user.pop())
      classArr.pop()
      charIndex -= 1

    } else {

      //previous class is incorrect remove last class
      //remove last character from user
      user.pop()
      classArr.pop()
    }

    //update word index
    if (text.onScreenGhost[0] === " ") {
      wordIndex -= 1
    }

    //update state
    setText({
      ...text,
      classArray: classArr,
      onScreenUser: user,
      onScreenGhost: ghost,
      charIdx: charIndex,
      wordIdx: wordIndex,
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
      if (classArr[classArr.length - 1] === "correct" || classArr[classArr.length - 1] === "skipped") {

        //previous class is correct or skipped remove last class remove last character from user en push in ghost
        ghost.unshift(user.pop())
        classArr.pop()
        charIndex -= 1

      } else {

        //previous class is incorrect delete last class delete last character from user
        user.pop()
        classArr.pop()
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
      ...text,
      classArray: classArr,
      onScreenUser: user,
      onScreenGhost: ghost,
      charIdx: charIndex,
      wordIdx: wordIndex,
    })
  }

  function onEnter() {

    // reset parameters en fetch new data
    if (text.onScreenGhost.length <= 1) {
      if (test.api === 0) {
        fetchTechyText()

      } else if (test.api === 1) {
        fetchWhatTheCommitText()
      }
    }

    //update state
    setText({
      ...text,
      sentenceIdx: text.sentenceIdx += 1,
    })
  }

  function handleUserInput(e) {

    // Handles user input based on the key pressed

    // Disabled keys: F-keys, arrows, pageup pagedown, home end.
    if (e.keyCode === 112 || e.keyCode === 113 || e.keyCode === 114 || e.keyCode === 115
      || e.keyCode === 116 || e.keyCode === 117 || e.keyCode === 118 || e.keyCode === 119
      || e.keyCode === 120 || e.keyCode === 121 || e.keyCode === 122 || e.keyCode === 123
      || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40
      || e.keyCode === 33 || e.keyCode === 34 || e.keyCode === 46 || e.keyCode === 35
      || e.keyCode === 36 || e.altKey || e.keyCode === 18 || e.keyCode === 20 || e.keyCode === 222
      || e.keyCode === 16 || e.keyCode === 9 || e.keyCode === 173 || e.keyCode === 174 || e.keyCode === 175
      || e.keyCode === 27 || e.keyCode === 177 || e.keyCode === 179 || e.keyCode === 176) {

      console.log("Keys are disabled")
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

  return (
    <section className="text-area-container">
      <div className="text-field">
        <span className="text-area-user">
        {text.onScreenUser.map((letter, index) =>
          <span
            key={index}
            className={text.classArray[index]}
          >{letter}</span>
        )}
        </span>
        <span className="text-area-ghost">
        {text.onScreenGhost.map((letter, index) =>
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