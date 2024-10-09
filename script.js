let addBtn = document.querySelector("#addBtn");
let main = document.querySelector("#main");

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  // console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
    // console.log(note.value);
  });
//   console.log(data);
  if(data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

const addNotes = (text = "") => {
    let noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"><span>Save</span></i>
            <i class="trash fas fa-trash"><span>Trash</span></i>
        </div>
        <textarea>${text}</textarea>
      `;

    
    noteDiv.querySelector(".trash").addEventListener("click", function () { // noteDiv.querySelector => not document.querySelector
      noteDiv.remove();
      saveNotes();
    });

      noteDiv.querySelector(".save").addEventListener("click", function () {
      saveNotes();
    });

    noteDiv.querySelector("textarea").addEventListener("focusout", function() {
        saveNotes();
    })
    main.appendChild(noteDiv);
    saveNotes();
};

addBtn.addEventListener("click", function () {
    addNotes();
});

( // When page will reload this IIFE function will automatically run 
    function() {
        const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
        // console.log(localStorageNotes);

        if(localStorageNotes === null) {
            addNotes();
        } else {
            localStorageNotes.forEach((lsNote) => {
                addNotes(lsNote);
            })
        }
    }
)()
