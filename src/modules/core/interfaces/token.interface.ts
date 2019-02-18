import { Document } from 'mongoose';

export interface Token extends Document {
  readonly id: string;
  readonly userId: string;
}