const Orders = require("../dbSchemas/order");

module.exports = async (req, res) => {
  Orders.find({})
    .exec()
    .then((result) => {

      res.json({ status: true, Orders: result });
    })
    .catch((error) => {
      res.json({ status: false, message: "Oops! Something went wrong" });
    });
};
