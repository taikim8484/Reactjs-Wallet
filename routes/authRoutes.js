const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/api/signup", (req, res) => {
    const { username, password } = req.body;

    const user = new User({
      username,
      password
    });
    user.save();
    res.send(user);
  });
  app.post("/api/signin", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.find({ username });
    if (user[0] && user[0].password == password) {
      res.send(user);
    } else {
      res.status(404).send();
    }
  });

  //Get all user
  app.get("/api/users", async (req, res) => {
    const users = await User.find({}).select({ username: 1 });
    res.send(users);
  });
};
