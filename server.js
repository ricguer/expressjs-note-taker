                                                                /* ===================== IMPORTS ====================== */
const express        =  require("express");
const path           =  require("path");
const fs             =  require("fs");
const recordedNotes  =  require("./db/db.json");


                                                                /* ================= GLOBAL VARIABLES ================= */
const app   =  express();
const PORT  =  3001;


                                                                /* ================= GLOBAL FUNCTIONS ================= */

                                                                /* -------------------- MIDDLEWARE -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

                                                                /* ---------------------- ROUTES ---------------------- */
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get("/api/notes", (req, res) => res.json(recordedNotes));

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;                           /* Deconstruct request body                             */

                                                                /* Make sure that all fields of body are present        */
    if (title && text)
    {
        const newNote = { title, text };                        /* Recreate new note object                             */
        
                                                                /* Read existing notes                                  */
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) 
            {
                console.error(err);                             /* Log error                                            */
            } 
            else 
            {
                const parsedNotes = JSON.parse(data);           /* Convert notes string into JSON object                */
                parsedNotes.push(newNote)                       /* Add new note to parsed notes                         */

                                                                /* Stringify JSON object                                */
                const newNoteString = JSON.stringify(parsedNotes);

                                                                /* Write new note string to file                        */
                fs.writeFile(`./db/db.json`, newNoteString, (err) => {
                err ? console.error(err) : console.log(`Note "${newNote.title}" has been written to JSON file`);
                });
            }
        });

        const response = { status: "success", body: newNote };  /* Create "success" response                            */
        res.status(201).json(response);                         /* Send "success" response                              */
    }
    else {
        res.status(500).json("Error in posting note");          /* Send "error" response                                */
    }
});

                                                                /* Set Express to listen to port                        */
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});