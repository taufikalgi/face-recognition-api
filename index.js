const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const pg = require("knex")({
  client: "pg",
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: true,
  },
  // searchPath: ["knex", "smart_brain"],
});

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const PORT = process.env.PORT || 8000;

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

pg.select("*")
  .from("users")
  .then((data) => {
    // console.log(data);
  });

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.post("/signin", (req, res) => signin.signinHandler(req, res, pg, bcrypt));

app.post("/register", (req, res) =>
  register.registerHandler(req, res, pg, bcrypt)
);

app.get("/profile/:id", (req, res) => profile.profileHandler(req, res, pg));

app.put("/image", (req, res) => image.imageHandler(req, res, pg));

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
