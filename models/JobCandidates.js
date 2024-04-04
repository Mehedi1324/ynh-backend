import mongoose from 'mongoose';
const JobCandidates = mongoose.Schema({
  name: String,
  jobTitle: String,
  phone: String,
  email: String,
  cv: String,
});

export default mongoose.model('Candidates', JobCandidates);
