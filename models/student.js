const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: String,
  batch: String,
  college: String,
  status: { type: String, enum: ['placed', 'not_placed'] },
  scores: {
    dsa: Number,
    webd: Number,
    react: Number,
  },
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
