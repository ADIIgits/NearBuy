export const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
};

export const requireUser = (req, res, next) => {
  if (!req.session.user || req.session.user.type !== "user") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
};

export const requireShop = (req, res, next) => {
  if (!req.session.user || req.session.user.type !== "shop") {
    return res.status(403).json({ message: "Shop access only" });
  }
  next();
};