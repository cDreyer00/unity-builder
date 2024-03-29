// dependencies
require("dotenv").config();
const express = require("express");
const { createServer } = require("http")

// import routes
const build = require("./src/routes/build");
const clone = require("./src/routes/clone");
const log = require("./src/routes/log");
const projects = require("./src/routes/projects");
const test = require("./src/routes/test");

const app = express();
const server = createServer(app);
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    res.send("server running")
})
app.get("/log", log)
app.get("/projects", projects)

app.post("/build", build)
app.post("/clone", clone)
app.post("/test", test)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

// initialize websocket
const initws = require("./src/handlers/ws/websocketHandler")
initws(server);