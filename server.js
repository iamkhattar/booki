const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware Initialisation
app.use(express.json({ extended: false }));

// Default Endpoint
app.get("/api/", (req, res) => {
  res.send("BookiAPI v" + require("./package.json").version);
});

// User Endpoints
app.use("/api/user", require("./routes/api/user"));

// Friend Endpoints
app.use("/api/user/friends", require("./routes/api/friends"));

// Books Endpoints
app.use("/api/books", require("./routes/api/books"));

// Start Express Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
