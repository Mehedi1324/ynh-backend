import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  applicant_name: String,
  email: String,
  phone: String,
  position: String,
  cv: File,
});

export default mongoose.model('JobApplications', JobApplicationSchema);
