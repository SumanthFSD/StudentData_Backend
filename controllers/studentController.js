const Student = require('../models/student');
const Interview = require('../models/interview');

async function listStudents(req, res) {
  try {
    const students = await Student.find();
    res.render('students/list', { students });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error listing students');
  }
}

function renderAddStudentForm(req, res) {
  res.render('students/add');
}

async function addStudent(req, res) {
  const { studentName, batch, college, status, dsa, webd, react } = req.body;

  try {
    const newStudent = new Student({
      studentName,
      batch,
      college,
      status,
      scores: {
        dsa,
        webd,
        react,
      }
    });
    console.log("New Student:", newStudent);
    await newStudent.save();
    res.redirect('/students');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding student');
  }
}

async function renderAllocateStudentForm(req, res) {
  try {
    const students = await Student.find();
    const interviews = await Interview.find();
    // console.log("Students:", students, "Interviews:", interviews);
    res.render('students/allocate', { students, interviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering allocate form');
  }
}

async function allocateStudentToInterview(req, res) {
  const { studentId, interviewId } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found');
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).send('Interview not found');
    }

    student.interviews.push(interview);
    await student.save();

    res.redirect('/students');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error allocating student to interview');
  }
}

module.exports = {
  listStudents,
  renderAddStudentForm,
  addStudent,
  renderAllocateStudentForm,
  allocateStudentToInterview,
};
