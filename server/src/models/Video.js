import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'draft' },
    filePath: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('Video', videoSchema);
