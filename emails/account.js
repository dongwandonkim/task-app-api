const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'brkpar@gmail.com', // Change to your recipient
  from: 'dongwan.don.kim@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dongwan.don.kim@gmail.com',
    subject: 'Welcome to the Task Management',
    text: `Thank you for signing up, ${name}. Let me know how you get along with the app`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'dongwan.don.kim@gmail.com',
    subject: 'Sorry to hear you go',
    text: `Sorry ${name}, if you had any bad experience with us Please let us know what could we have done better!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
