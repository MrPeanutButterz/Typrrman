import React from "react";
import "./Typrr.css"

export default function TextField() {

  const userArr = "Hello is it me you are looking for... I can see it in you eyes, ".split("")
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

        }}
      ></textarea>

      </div>
    </section>
  );
}