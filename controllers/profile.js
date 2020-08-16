const profileHandler = (req, res, pg) => {
  const { id } = req.params;
  pg.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        console.log(user[0]);
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
  profileHandler,
};
