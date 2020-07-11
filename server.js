const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware Initialisation
app.use(express.json({ extended: false }));

// Default Endpoint
app.get("/api/", (req, res) => {
  res.send("BookiAPI v" + require("./package.json").version);
});

// Authentication Endpoints
app.use("/api/user/auth", require("./routes/api/auth"));

// Start Express Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
