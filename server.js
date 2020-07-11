const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware Initialisation
app.use(express.json({ extended: false }));

// Default Endpoint
app.get("/api/", (req, res) => {
  res.json({
    name: "BookiAPI",
    version: require("./package.json").version,
    status: "Operational",
    date: new Date(),
  });
});

// Users Endpoint
app.use("/api/users", require("./routes/api/users"));

// Start Express Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
