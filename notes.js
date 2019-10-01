const fs = require("fs");
const chalk =  require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    debugger

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen("New note added!"));
    } else {
        console.log(chalk.bgRed("Note title taken!"));
    }
}

const removeNote = title => {
    const notes = loadNotes();

    // for(let i = 0; i < notes.length; i++) {
    //     if(notes[i].title === title) {
    //         notes.splice(i, 1);
    //         console.log(title + " has been deleted!");
    //     }
    // }

    const notesToKeep = notes.filter(note => note.title !== title);

    if(notesToKeep.length < notes.length) {
        console.log(chalk.bgGreen("Note removed"));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed("No note found!"));
    }   
}

const listNotes = () => {
    console.log(chalk.inverse("Your notes"));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note);
    });
}

const readNote = title => {
    const notes = loadNotes();

    const noteToShow = notes.find(note => note.title === title);
    
    if(noteToShow) {
        console.log(chalk.blue.bold("Title: " + noteToShow.title));
        console.log("Body: " + noteToShow.body);
    } else {
        console.log(chalk.red.bold("There is no title with this name"));
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}