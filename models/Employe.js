const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: Number,
  },
  designation: {
    type: String,
  },
  gender: {
    type: String,
  },
  course: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Employe = mongoose.model("Employe", employeeSchema);
module.exports = Employe;
