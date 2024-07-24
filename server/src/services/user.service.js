"use strict";

const USER = require("../models/user.model");
const { sendEmailToken } = require("./email.service");
const { checkEmailToken } = require("./otp.service");

const newUserService = async ({ email }) => {
  const user = await USER.findOne({ usr_email: email }).lean();
  if (user) {
    return {
      error: true,
      message: "User already exists",
    };
  }
  const result = await sendEmailToken({
    email,
  });

  return {
    message: "Verify email user",
    metadata: {
      token: result,
    },
  };
};

const checkEmailTokenService = async ({ token }) => {
  try {
    //1. Check Token
    const { otp_email: email } = await checkEmailToken({ token });
    if (!email) throw Error("Token not found");
    //2. Check email
    const hasUser = await findUserByEmail({ usr_email: email });
    if (hasUser) throw new Error("Email exist");
    //3. Create new user

    const newUser = await createUser({
      usr_email: email,
    });

    return {
      code: 201,
      message: "User created successfully",
      metadata: {
        user: {
          _id: newUser._id,
          usr_email: newUser.usr_email,
        },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async ({ email }) => {
  try {
    const user = await USER.findOne({ email: email }).lean();
    return user;
  } catch (error) {
    throw new Error("Cannot find user");
  }
};

const createUser = async ({ usr_email }) => {
  try {
    const newUser = await USER.create({
      usr_email,
    });
    return newUser;
  } catch (error) {
    throw new Error("Cannot create user");
  }
};

const unsubscribeUserService = async ({ email }) => {
  try {
    const result = await USER.deleteOne({ usr_email: email });
    if (result.deletedCount === 0) {
      return {
        error: true,
        message: "User not found or already unsubscribed",
      };
    }
    return {
      message: "User unsubscribed successfully",
    };
  } catch (error) {
    throw new Error("Error unsubscribing user");
  }
};

module.exports = {
  newUserService,
  checkEmailTokenService,
  unsubscribeUserService,
};
