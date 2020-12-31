import dbConnect from '../../../utils/dbConnect';
import RSVP from '../../../models/RSVP';
import sendSMS from '../../../utils/sendSMS';
import sendEmail from '../../../utils/sendEmail';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    // case 'GET':
    //   try {
    //     const rsvps = await RSVP.find({});
    //     res.status(200).json({ success: true, data: rsvps });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //     console.log(error);
    //   }
    //   break;
    case 'POST':
      try {
        const {
          firstName,
          lastName,
          email,
          phone,
          attending,
          guestsAttending,
        } = req.body;
        if (!firstName) {
          return res
            .status(400)
            .send({ success: false, message: 'First name is required.' });
        }
        if (!lastName) {
          return res
            .status(400)
            .send({ success: false, message: 'Last name is required.' });
        }
        if (await RSVP.findOne({ email: email })) {
          return res.status(400).send({
            success: false,
            message: `Email: ${email} is already used to RSVP.`,
          });
        }
        if (await RSVP.findOne({ phone: phone })) {
          return res.status(400).send({
            success: false,
            message: `Phone number: ${phone} is already used to RSVP`,
          });
        }
        if (!attending) {
          return res.status(400).send({
            success: false,
            message: 'Please select Yes, No or Maybe.',
          });
        } else if (
          (attending === 'Yes' && guestsAttending < 1) ||
          (attending === 'Maybe' && guestsAttending < 1)
        ) {
          res.status(400).send({
            success: false,
            message: 'Please enter total guests attending for the event.',
          });
        }
        const rsvp = await RSVP.create(req.body);
        res.status(201).json({ success: true, data: rsvp });

        const rsvpMessage = `Thank you, ${firstName} for your RSVP. We look forward to seeing you on April 4th.

        - Vikas & Vaidehi
        `;

        sendSMS(phone, rsvpMessage);
        sendEmail(email, process.env.SENDGRID_EMAIL_ADDRESS, firstName);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
