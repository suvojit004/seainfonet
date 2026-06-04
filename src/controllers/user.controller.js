const asyncHandler = require("../utils/asyncHandler");

const userService = require("../services/user.service");

const AppError = require("../utils/AppError")

const createUser =
    asyncHandler(
        async (req, res) => {
            const user =
                await userService.createUser(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        }
    );
const getUsers = asyncHandler(
    async (req, res) => {

        const users = await userService.getUsers();

        res.status(200).json({
            success: true,
            data: users,
        });
    }
);

const getUserById = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const user = await userService.getUserById(id)

        res.status(201).json({
            success: true,
            data: user,
        });
    }
)

const updateUser = asyncHandler(
    async (req, res) => {
        if (
            req.user._id.toString() === req.params.id
        ) {
            throw new AppError(
                "You cannot change your own role",
                400
            );
        }
        const user =
            await userService.updateUser(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            data: user,
        });
    }
);

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser
};