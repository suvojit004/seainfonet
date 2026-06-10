const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const setupAdmin = asyncHandler ( async (req, res, next) => {
   
        const user =
            await authService.createInitialAdmin(
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Initial admin created successfully",
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
});

const login = asyncHandler ( async (
  req,
  res,
  next
) => {
    const result =
      await authService.loginUser(
        req.body
      );

    res.status(200).json({
      success: true,
      accessToken:
        result.accessToken,
      user: {
        id: result.user._id,
        email: result.user.email,
        role: result.user.role,
      },
    });
});

module.exports = {
    setupAdmin,
    login
};