const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.listStudents);
router.get('/add', studentController.renderAddStudentForm);
router.post('/add', studentController.addStudent);
router.get('/allocate', studentController.renderAllocateStudentForm);
router.post('/allocate', studentController.allocateStudentToInterview);
router.get('/:studentId/interviews', async (req, res) => {
    const studentId = req.params.studentId;
  
    try {
      const student = await Student.findById(studentId).populate('interviews');
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const interviews = student.interviews;
    //   console.log("Student Interviws:", student.interviews);
      res.json({ student: { studentName: student.studentName, interviews } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching interviews data' });
    }
  });

module.exports = router;
