const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Frontend", "Backend", "FullStack"],
    required: true,
  },
  level: {
    type: String,
    enum: ["Junior", "Senior"],
    required: true,
  },
  position: {
    type: String,
    enum: [
      "Backend Developer",
      "Junior Frontend Developer",
      "Junior Backend Developer",
      "FSD",
    ],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    enum: ["full time", "part time"],
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = {
  JobModel
};
