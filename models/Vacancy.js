import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema({
  title: String,
  details: String,
});

export default mongoose.model('Vacancy', VacancySchema);
