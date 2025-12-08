import User from "../models/user.models.js";

export const getMyUserProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const user = await User.findById(userId, "-password").lean();

    res.json({
      message: "Your profile",
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
