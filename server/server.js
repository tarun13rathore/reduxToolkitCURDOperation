const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const App = require("../src/App"); // Your main React component
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  const context = {};
  const appMarkup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexHtml = fs.readFileSync(
    path.resolve(__dirname, "build", "index.html"),
    "utf8"
  );

  const updatedHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appMarkup}</div>`
  );

  res.send(updatedHtml);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
