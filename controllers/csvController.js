const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Student = require('../models/student');
const Interview = require('../models/interview');

async function downloadCsv(req, res) {
  try {
    // Fetch and format data from the database
    const students = await Student.find().populate({
      path: 'interviews',
      select: 'date company result',
    });

    const data = [];

    students.forEach(student => {
      student.interviews.forEach(interview => {
        data.push({
          studentId: student._id,
          studentName: student.studentName,
          studentCollege: student.college,
          studentStatus: student.status,
          dsaFinalScore: student.scores.dsa,
          webdFinalScore: student.scores.webd,
          reactFinalScore: student.scores.react,
          interviewDate: interview.date,
          interviewCompany: interview.company,
          interviewResult: interview.result,
        });
      });
    });

    const csvWriter = createCsvWriter({
      path: 'output.csv',
      header: [
        { id: 'studentId', title: 'Student ID' },
        { id: 'studentName', title: 'Student Name' },
        { id: 'studentCollege', title: 'Student College' },
        { id: 'studentStatus', title: 'Student Status' },
        { id: 'dsaFinalScore', title: 'DSA Final Score' },
        { id: 'webdFinalScore', title: 'WebD Final Score' },
        { id: 'reactFinalScore', title: 'React Final Score' },
        { id: 'interviewDate', title: 'Interview Date' },
        { id: 'interviewCompany', title: 'Interview Company' },
        { id: 'interviewResult', title: 'Interview Result' },
      ],
    });

    await csvWriter.writeRecords(data);
    res.download('output.csv');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating CSV');
  }
}

module.exports = { downloadCsv };
