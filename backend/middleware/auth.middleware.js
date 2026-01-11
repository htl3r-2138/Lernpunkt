exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.session.user.role !== "student") {
    return res.status(403).json({ message: "Access restricted to students" });
  }

  next();
};

exports.isTutor = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.session.user.role !== "tutor") {
    return res.status(403).json({ message: "Access restricted to tutors" });
  }

  next();
};
