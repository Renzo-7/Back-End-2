export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    if (req.user.role !== role.toUpperCase()) {
      return res
        .status(403)
        .json({ status: "error", message: "Forbidden - No permissions" });
    }

    next();
  };
};
