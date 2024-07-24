const {
  newUserService,
  checkEmailTokenService,
  unsubscribeUserService,
} = require("../services/user.service");
const RedirectHTML = require("../utils/redirect.html");

class UserController {
  // new User
  newUser = async (req, res, next) => {
    const response = await newUserService({
      email: req.body.email,
      city: req.body.city,
    });

    if (response.error) {
      return res.status(400).json(response);
    }

    res.json(response);
  };

  // check email token
  checkEmailToken = async (req, res, next) => {
    try {
      const response = await checkEmailTokenService({
        token: req.query.token,
      });

      const userData = response.metadata.user;
      const htmlContent = RedirectHTML(userData);
      res.send(htmlContent);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  // Delete user

  deleteUser = async (req, res, next) => {
    try {
      const response = await unsubscribeUserService({ email: req.body.email });

      if (response.error) {
        return res.status(400).json(response);
      }
      res.json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
}

module.exports = new UserController();
