const mongoose = require("mongoose");
const Receipts = mongoose.model("receipts");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/receipt", async (req, res) => {
    const { username } = req.query;

    const toReceipt = await Receipts.find({ to: username });
    const fromReceipt = await Receipts.find({ from: username });
    console.log(toReceipt);
    res.send(toReceipt.concat(fromReceipt));
  });

  app.get("/api/receipts", async (req, res) => {
    const receipts = await Receipts.find({});
    console.log(receipts);
    res.send(receipts);
  });

  app.post("/api/transfer", async (req, res) => {
    const { to, from, amount } = req.body;

    const fromUser = await User.findOne({ username: from });
    const toUser = await User.findOne({ username: to });

    fromUser.balance -= amount;
    toUser.balance += amount;

    const receipt = new Receipts({
      to,
      from,
      amount,
      timestamp: Date.now()
    });
    await receipt.save();
    await fromUser.save();
    await toUser.save();
    res.send(fromUser);
  });
};
