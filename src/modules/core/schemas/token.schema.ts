import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
}, {
  versionKey: false,
  timestamps: true,
});
