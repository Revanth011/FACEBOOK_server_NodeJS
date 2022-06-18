const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;
const auth = new google.auth.OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  "https://developers.google.com/oauthplayground"
);
const sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook Email Verification",
    html: `<i>hello, ${name}</i><br><i>FACEBOOK Email Verification</i><br><i><a href="${url}">Confirm Email</a></i>`,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
module.exports = sendVerificationEmail;
