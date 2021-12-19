import React, { useState, useEffect } from "react";
import Note from "./Note";
import AreaOfTextNote from "./AreaOfTextNote";
import AuthContext from "../store of browser provider/auth-context";
import { useContext } from "react";
import axios from "axios";

function NoteApp() {
  const [notes, setNotes] = useState([{ title: "", content: "" }]);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userData;
  useEffect(() => {
    axios
      .post("http://localhost:4000/app/GetNotes", userId)
      .then((response) => {
        localStorage.setItem("notes", JSON.stringify(response.data.data));
        setNotes(JSON.parse(localStorage.getItem("notes")));

        setNotes(JSON.parse(localStorage.getItem("notes")));
      });

    // setNotes(JSON.parse(localStorage.getItem("notes")));
  }, [userId]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  // const newNotes = JSON.parse(localStorage.getItem("notes"));
  console.log(notes);

  return (
    <div>
      <AreaOfTextNote onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default NoteApp;
