import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema({
  title: String,
  details: String,
  applied: [{ type: mongoose.Types.ObjectId, ref: 'Candidates' }],
});

export default mongoose.model('Vacancy', VacancySchema);
