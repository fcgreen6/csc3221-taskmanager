// Modules...
const express = require("express");
const connectDatabase = require("./connection");
const tasks = require("./tasks");

const app = express();

// Incoming information is converted to a JSON object.
app.use(express.json());

// Frontend...
app.use(express.static("./Client"));

// Uses the find function to create a JSON object containing all tasks.
app.get("/tm/tasks", async (req, res) => {

    try {

        const tasksAll = await tasks.find();
        res.status(200).json({tasksAll});
    }
    catch {

        res.status(500).send();
    }
});

// Uses the object sent in the request body to create a new doccument in the database.
app.post("/tm/tasks", async (req, res) => {
    
    try {

        await tasks.create(req.body);
        res.status(200).send();
    }
    catch (error) {

        res.status(500).send();
    }
});

// Uses the object received to update data within an existing doccument in the database.
app.put("/tm/tasks", async (req, res) => {
    
    try {

        await tasks.findByIdAndUpdate(req.body._id, {name: req.body.name, completed: req.body.completed});
        res.status(200).send();
    }
    catch {

        res.status(500).send();
    }
});

// Deletes a document from the database using the id parameter passed within the route.
app.delete("/tm/tasks/:id", async (req, res) => {

    try {

        await tasks.findByIdAndDelete(req.params.id);
        res.status(200).send();
    }
    catch {

        res.status(500).send();
    }
});

async function startServer() {

    try {

        await connectDatabase();
        app.listen(5000, () => {
            console.log(`Task Manager is listening on port 5000.`)
        });
    }
    catch (error) {

        console.log(error);
    }
}

startServer();