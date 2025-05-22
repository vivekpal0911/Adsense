import mongoose from 'mongoose';

const platformEnum = ['Instagram', 'YouTube', 'TikTok'];
const categoryEnum = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['company', 'influencer'] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String, required: true },
  industry: { type: String }, // Company-specific
  companySize: { type: String }, // Company-specific
  website: { type: String }, // Company-specific
  socialMedia: [
    {
      platform: { type: String, enum: platformEnum, required: true },
      followers: { type: Number, required: true, min: 0 },
    },
  ], // Influencer-specific
  description: { type: String },
  categories: { type: [{ type: String, enum: categoryEnum }], default: [] }, // Influencer-specific
  notifications: [
    {
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ], // For notifications (e.g., "Your ad has been accepted")
});

const User = mongoose.model('User', userSchema);

export default User;