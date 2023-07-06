                                                                /* ===================== IMPORTS ====================== */
const express  =  require("express");
const path     =  require("path");


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

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text)
    {
        const newNote = {
            title,
            text
        };

        const response = {
            status: "success",
            body: newNote
        };
        res.status(201).json(response);
    }
    else {
        res.status(500).json("Error in posting note");
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});