export const sessionStatus = (req, res) => {
  if (req.session && req.session.user) {
    return res.json({
      loggedIn: true,
      user: req.session.user
    });
  }

  return res.json({
    loggedIn: false,
    user: null
  });
};
