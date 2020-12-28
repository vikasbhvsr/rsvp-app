const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
      trim: true,
      maxlength: [
        40,
        'Jeez! Your first name is very long. Enter shorter name.',
      ],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
      trim: true,
      maxlength: [40, 'Jeez! Your last name is very long. Enter shorter name.'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      unique: true,
    },
    attending: {
      type: String,
      enum: ['Yes', 'No', 'Maybe'],
      required: [true, 'Let us know if you are attending to our event.'],
    },
    guestsAttending: {
      type: Number,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [
        300,
        `Looks like you have a lot to share. Let's connect at the event.`,
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.RSVP || mongoose.model('RSVP', RSVPSchema);
