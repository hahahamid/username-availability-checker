const express = require("express");
const app = express();
const checkUsernameRoute = require("./routes/checkUsername");

app.use(express.json());

app.use("/api", checkUsernameRoute);

app.get("/", (req, res) => {
  res.send("Custom Bloom Filter Demo API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
