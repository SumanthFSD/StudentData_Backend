const axios = require('axios');
const Job = require('../models/job');

async function fetchExternalJobs(req, res) {
  try {
    const response = await axios.get('https://jobs.github.com/positions.json');
    const externalJobs = response.data.slice(0, 10); // Limit to first 10 jobs for simplicity
    res.render('jobs/list', { externalJobs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching external jobs');
  }
}

module.exports = { fetchExternalJobs };
