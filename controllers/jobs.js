const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const userId = req.user.userId;
  const jobs = await Job.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with job id ${jobId}`);
  }
 
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const createdBy = req.user.userId;
  // const {company, position} = req.body
  const job = await Job.create({ createdBy, ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with job id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
