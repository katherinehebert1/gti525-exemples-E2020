const express = require('express')
const app = express()
const port = 3000

app.route("/contacts/")
    .get((req, res) => res.send("Get all contacts " + JSON.stringify(req.query)))
    .post((req, res) => res.send("Add a new contact"))

app.route("/contacts/:id")
    .get((req, res) => res.send("Get contact, id=" + req.params["id"]))
    .put((req, res) => res.send("Replace contact, id=" + req.params["id"]))
    .patch((req, res) => res.send("Replace contact partially, id=" + req.params["id"]))
    .delete((req, res) => res.send("Delete contact, id=" + req.params["id"]))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable