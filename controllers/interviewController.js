const Interview = require('../models/interview');
const Student = require('../models/student');

async function listInterviews(req, res) {
  try {
    const interviews = await Interview.find();
    res.render('interviews/list', { interviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error listing interviews');
  }
}

function renderCreateInterviewForm(req, res) {
  res.render('interviews/create');
}

async function createInterview(req, res) {
  const { companyName, date } = req.body;

  try {
    const newInterview = new Interview({
      companyName,
      date,
    });
    await newInterview.save();
    res.redirect('/interviews');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating interview');
  }
}

function renderMarkResultStatusForm(req, res) {
  try {
    const interviews = Interview.find();
    res.render('interviews/markResult', { interviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering mark result form');
  }
}

async function markResultStatus(req, res) {
  const { interviewId, studentId, resultStatus } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    const interviewResult = student.results.find(result => result.interview.equals(interviewId));
    if (!interviewResult) {
      student.results.push({ interview: interviewId, result: resultStatus });
    } else {
      interviewResult.result = resultStatus;
    }

    await student.save();

    res.redirect('/interviews');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error marking result status');
  }
}

module.exports = {
  listInterviews,
  renderCreateInterviewForm,
  createInterview,
  renderMarkResultStatusForm,
  markResultStatus,
};
