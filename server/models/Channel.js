import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  description: String,
  channelBanner: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    
  },
  subscribers: { type: Number, default: 0 }
});

channelSchema.index(
  { owner: 1 },
  { unique: true, partialFilterExpression: { owner: { $exists: true } } }
);

export default mongoose.model('Channel', channelSchema);
