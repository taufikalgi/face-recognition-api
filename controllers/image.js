const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "0419c305d3f84755957c84e4b65c5a99",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const imageHandler = (req, res, pg) => {
  const { id } = req.body;
  pg("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get entries."));
};

module.exports = {
  imageHandler,
  handleApiCall,
};
