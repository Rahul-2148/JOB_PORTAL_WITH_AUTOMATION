import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Job } from "../models/jobModel.js";

// Post a job controller
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobDomain,
    jobDeadline,
    jobStatus,
  } = req.body;

  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualifications ||
    !salary ||
    !jobDomain
  ) {
    return next(new ErrorHandler("Please provide full job details", 400));
  }
  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (personalWebsiteUrl && !personalWebsiteTitle)
  ) {
    return next(
      new ErrorHandler(
        "Please provide both the website title and url, or leave both blank",
        400
      )
    );
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl,
    },
    jobDomain,
    jobDeadline,
    jobStatus,
    postedBy,
  });
  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
});

// Get all jobs controller
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city, domain, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }
  if (domain) {
    query.jobDomain = domain;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
      { responsibilities: { $regex: searchKeyword, $options: "i" } },
      { qualifications: { $regex: searchKeyword, $options: "i" } },
      { offers: { $regex: searchKeyword, $options: "i" } },
      { salary: { $regex: searchKeyword, $options: "i" } },
      { jobStatus: { $regex: searchKeyword, $options: "i" } },
      { location: { $regex: searchKeyword, $options: "i" } },
      { jobDomain: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

// Get my jobs controller
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

// delete job controller
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully.",
  });
});

// Get a single job controller
export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
