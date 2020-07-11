const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Default Endpoint
app.get("/", (req, res) => {
  res.json({
    name: "BookiAPI",
    version: require("./package.json").version,
    status: "Operational",
    date: new Date(),
  });
});

// Start Express Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
