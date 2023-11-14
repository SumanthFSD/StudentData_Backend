const axios = require('axios');
const Job = require('../models/job');

async function fetchExternalJobs(req, res) {
  try {
    const response = await axios.get('https://api.adzuna.com/v1/api/jobs/in/india/search/1?app_id=175f713b&app_key=af78e954ffb5be55e83189950b0e86c4&results_per_page=10');
    const externalJobs = response.data.slice(0, 10); // Limit to first 10 jobs for simplicity
    res.render('jobs/list', { externalJobs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching external jobs');
  }
}

module.exports = { fetchExternalJobs };
