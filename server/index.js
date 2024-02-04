//connecting express to react app in the client folder
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("../client/build"));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Express Server on port ${port}`));