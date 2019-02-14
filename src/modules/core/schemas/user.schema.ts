import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    index: {
      unique: true,
    },
    match: [/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/, 'Please enter a valid email address'],
    required: 'Enter email',
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    index: {
      unique: true,
    },
    match: [/^[a-zA-Z0-9.\-_]*$/, 'Please enter the valid username (should contain only letters, numbers, _, -, .)'],
    required: 'Enter username',
  },
  password: {
    type: String,
    validate: [validatePassword, 'Password should be longer then 6 symbols'],
    required: 'Enter password',
  },
}, {
  versionKey: false,
  timestamps: true,
});

/**
 * Password validation middleware.
 */
function validatePassword(password: string): boolean {
  return password && password.length >= 6;
}

/**
 * Password hash middleware.
 */
const hashPassword = (user, next): void => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      return next();
    });
  });
};

UserSchema.pre('save', function(next): void {
  const user = this;
  if (user.isModified('email')) {
    user.email = user.email.toLowerCase();
  }
  if (user.isModified('password')) { return hashPassword(user, next); }
  return next();
});

UserSchema.pre('findOneAndUpdate', function(next): void {
  const update = this._update;
  if (update.$set && update.$set.password) { return hashPassword(update.$set, next); }
  return next();
});
