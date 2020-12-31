const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, from, name) => {
  const message = {
    to: to,
    from: from,
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {
      subject: `Vaidehi's Baby Shower - RSVP Confirmation`,
      name: name,
    },
  };

  const response = await sgMail.send(message);
  console.log(response);
  // .then((response) => console.log(response))
  // .catch((error) => console.log(error));
};

module.exports = sendEmail;
