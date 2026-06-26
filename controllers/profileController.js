const User = require("../models/User");


// GET PROFILE

exports.getProfile = async (req, res) => {

  try {

    const user = await User.findByPk(
      req.user.id,
      {
        attributes: {
          exclude: ["password"]
        }
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// UPDATE PROFILE

exports.updateProfile = async (req, res) => {

  try {

    const { name, phone } = req.body;

    const user = await User.findByPk(
      req.user.id
    );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      message: "Profile Updated",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};