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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});