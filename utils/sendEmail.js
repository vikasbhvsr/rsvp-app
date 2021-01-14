const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, from, name) {
  const message = {
    to: to,
    from: from,
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {
      subject: `Vaidehi's Baby Shower - RSVP Confirmation`,
      name: name,
    },
  };

  sgMail
    .send(message)
    .then((response) => console.log('Email sent', response))
    .catch((error) => console.error(error));
}

// const sendEmail = (to, from, name) => {
//   const message = {
//     to: to,
//     from: from,
//     templateId: process.env.SENDGRID_TEMPLATE_ID,
//     dynamic_template_data: {
//       subject: `Vaidehi's Baby Shower - RSVP Confirmation`,
//       name: name,
//     },
//   };

//   sgMail
//     .send(message)
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error));
// };

module.exports = sendEmail;
