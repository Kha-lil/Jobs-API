const express = require("express");
const jobRouter = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

jobRouter.route("/").get(getAllJobs).post(createJob);
jobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobRouter