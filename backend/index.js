const express = require("express");
const cors = require("cors");
const path = require("path");
const slotRoutes = require("./src/routes/slotRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", slotRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Schedulo Lite server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});
