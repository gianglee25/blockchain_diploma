// backend/models/Certificate.js
import mongoose from 'mongoose';
import { DIPLOMA_STATUS, ACADEMIC_RANK, DIPLOMA_TYPES } from '../utils/constants.js';

const certificateSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    mssv: { type: String, required: true },
    fullName: { type: String, required: true },
    dob: { type: String },
    pob: { type: String },
    gender: { type: String },
    nation: { type: String },
    class: { type: String },
    gpa: { type: Number },
    grade: { type: String },
    major: { type: String },
    diplomaType: { type: String, default: DIPLOMA_TYPES.ENGINEER },
    certNo: { type: String },
    regNo: { type: String },
    decisionNo: { type: String },
    issueDate: { type: String },
    txId: { type: String, default: null },
    status: {
      type: String,
      enum: Object.values(DIPLOMA_STATUS),
      default: DIPLOMA_STATUS.PENDING,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);
