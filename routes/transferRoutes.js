const mongoose = require("mongoose");
const Receipts = mongoose.model("receipts");

module.exports = app => {
  app.get("/api/receipt", async (req, res) => {
    const { username } = req.query;

    const toReceipt = await Receipts.find({ to: username });
    const fromReceipt = await Receipts.find({ from: username });
    console.log(toReceipt);
    res.send(toReceipt.concat(fromReceipt));
  });

  app.post("/api/transfer", (req, res) => {
    const { to, from, amount } = req.body;
    console.log(req.body);

    const receipt = new Receipts({
      to,
      from,
      amount,
      timestamp: Date.now()
    });
    receipt.save();
    res.send(receipt);
  });
};
