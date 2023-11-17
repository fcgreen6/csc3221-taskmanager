const express = require("express");
const connectDatabase = require("./connection");
const tasks = require("./tasks");

const app = express();

// Incoming information is converted to a JSON object.
app.use(express.json());

// Frontend...
app.use(express.static("./Client"));

app.get("/tm/tasks", async (req, res) => {

    try {

        const tasksAll = await tasks.find();
        res.status(200).json({tasksAll});
    }
    catch {

        res.status(500);
    }
});

app.post("/tm/tasks", async (req, res) => {
    
    try {

        await tasks.create(req.body);
        res.status(200);
    }
    catch {

        res.status(500);
    }
});

app.put("/tm/tasks", async (req, res) => {
    
    try {

        await tasks.findOneAndUpdate({clientIndex: body.clientIndex}, {name: body.name, completed: body.completed});
        res.status(200);
    }
    catch {

        res.status(500);
    }
});

app.delete("/tm/tasks", async (req, res) => {

    try {

        await tasks.findOneAndDelete({clientIndex: body.clientIndex});
        res.status(200);
    }
    catch {

        res.status(500);
    }
});

async function startServer() {

    try {

        await connectDatabase();
        app.listen(5000, () => {
            console.log(`Task Manager is listening on port 5000.`)
        })
    }
    catch (error) {

        console.log(error);
    }
}

startServer();