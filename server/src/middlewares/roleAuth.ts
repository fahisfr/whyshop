export default (...Allowed_Roles) => {
  return async (req, res, next) => {
    try {
      const FindRole = Allowed_Roles.includes(req.user.role);
      if (FindRole) {
        if (VerifyRole) {
          next();
        } else {
          res.json({ status: "error", message: "" });
        }
      } else {
        res.json({
          status: "error",
          message: "You don't have permission to perform this action",
        });
      }
    } catch (err) {
      next(err);
    }
  };
};
