"use strict";
const { randomInt } = require("crypto");
const { newOtp } = require("./otp.service");
const transport = require("../dbs/init.nodemailer");
const { replaceHolder } = require("../utils");
const { htmlEmailToken } = require("../utils/template.email.html");

const sendEmailLinkVerify = async ({
  html,
  toEmail,
  subject = "Confirm Registration",
  text = "Confirm...",
}) => {
  try {
    const mailOptions = {
      from: '"DAILY-WEATHER" <ddhuu.dev@gmail.com>',
      to: toEmail,
      subject,
      text,
      html,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message sent::", info.messageId);
    });
  } catch (error) {
    console.error(`Error send Email`, error);
    return error;
  }
};

const sendEmailToken = async ({ email }) => {
  try {
    // 1. Get token
    const token = await newOtp({ email });
    // 2. Get template
    const template = htmlEmailToken();

    if (!template) {
      throw new Error("Template not found");
    }

    // 3. Replace link_verify in template

    const verifyLink = `http://localhost:5000/api/v1/user/verify?token=${token.otp_token}`;

    const content = replaceHolder(template, {
      link_verify: verifyLink,
      verify_link: verifyLink,
    });

    // 4. Send Email
    sendEmailLinkVerify({
      html: content,
      toEmail: email,
      subject: "Vui lòng xác nhận địa chỉ email đăng ký",
    }).catch((err) => console.error(error));

    return 1;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmailToken,
};
