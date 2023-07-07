                                                                /* ===================== IMPORTS ====================== */
const express  =  require("express");
const path     =  require("path");
const fs       =  require("fs");


                                                                /* ================= GLOBAL VARIABLES ================= */
const app   =  express();
const PORT  =  3001;


                                                                /* ================= GLOBAL FUNCTIONS ================= */

                                                                /* -------------------- MIDDLEWARE -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

                                                                /* ---------------------- ROUTES ---------------------- */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));

    
});

app.get("/api/notes", (req, res) => {
    console.log("Got Request"); // TODO: Render existing notes
});

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;                           /* Deconstruct request body                             */

                                                                /* Make sure that all fields of body are present        */
    if (title && text)
    {
        const newNote = { title, text };                        /* Recreate new note object                             */
        const newNoteString = JSON.stringify(newNote);          /* Stringify JSON object                                */

                                                                /* Write new note string to file                        */
        fs.appendFileSync(`./db/db.json`, newNoteString, (err) => {
            err ? console.error(err) : console.log(`Note "${newNote.title}" has been written to JSON file`);
        });

        const response = { status: "success", body: newNote };  /* Create "success" response                            */
        res.status(201).json(response);                         /* Send "success" response                              */
    }
    else {
        res.status(500).json("Error in posting note");          /* Send "error" response                                */
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});