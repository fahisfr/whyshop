const db = require("mongoose");
const Role_list = require("../config/roles");

const user = new db.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  role: {
    type: String,
    // enum: Object.values(Role_List),
    default: Role_list.User,
  },

  createAt: { type: Date, immutable: true, default: () => new Date() },
  updateAt: { type: Date, default: () => new Date() },
  cart: [
    {
      productID: { type: db.Schema.ObjectId },

      quantity: { type: Number, default: 1 },
      _id: false,
    },
  ],
  password: { type: String, required: true },
  creaetAt: { type: Date, default: Date.now },
  refreshToken: { type: String, default: null },
});

const Users = db.model("users", user);

module.exports = Users;
