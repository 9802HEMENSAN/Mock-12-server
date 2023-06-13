const express = require('express');
const JobRouter = express.Router();
const {JobModel} = require('../Model/jobs.model');
 
// Create a new job
JobRouter.post('/jobs', async (req, res) => {
  try {
    const job = new JobModel(req.body);
    await job.save();
    res.status(201).send({  msg : "Job created successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all jobs
JobRouter.get('/jobs', async (req, res) => {
  try {
    const { role, search, page } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Search by tech stack
    if (search) {
      query.language = { $regex: new RegExp(search, 'i') };
    }

    const totalJobs = await JobModel.countDocuments(query);

    // Sort by date  
    const jobs = await JobModel.find(query)
      .sort({ postDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalJobs / limit);

    res.send({ jobs, totalPages })

    // const jobs = await  JobModel.find();
    // res.send(jobs);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get a specific job
JobRouter.get('/jobs/:id', async (req, res) => {
    const {id}=req.params
  try {
    const job = await  JobModel.findById(id);
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.send(job);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update a job
JobRouter.patch('/jobs/:id', async (req, res) => {
    const {id}=req.params 
  try {
    const job = await  JobModel.findByIdAndUpdate( id, req.body );
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send({msg : "Job updated successfully"});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete a job
JobRouter.delete('/jobs/:id', async (req, res) => {
    const {id}=req.params
  try {
    const job = await  JobModel.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }
    res.status(200).send({msg : "Job deleted successfully"});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = {
    JobRouter
} 
