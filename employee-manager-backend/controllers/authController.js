import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
// export const registerUser = async (req, res) => {
//     try {
//         const {
//             firstname,
//             lastname,
//             email,
//             password,
//             contactnumber,
//             name,
//             description,
//             OrganizationURL,
//             OrganizationMail,
//         } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Create new user
//         const user = await User.create({
//             firstname,
//             lastname,
//             email,
//             password, // hashed automatically via pre-save hook
//             contactnumber,
//             organization: {
//                 name,
//                 description,
//                 url: OrganizationURL,
//                 mail: OrganizationMail,
//             },
//         });

//         if (user) {
//             res.status(201).json({
//                 _id: user._id,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 email: user.email,
//                 contactnumber: user.contactnumber,
//                 organization: user.organization,
//                 token: generateToken(user._id), // 🔑 issue JWT token
//                 createdAt: user.createdAt,
//             });
//         } else {
//             res.status(400).json({ message: "Invalid user data" });
//         }
//     } catch (error) {
//         console.error("Error in registerUser:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
export const registerUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            contactnumber,
            name,
            description,
            OrganizationURL,
            OrganizationMail,
            role, // ✅ new
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            firstname,
            lastname,
            email,
            password, // hashed automatically via pre-save hook
            contactnumber,
            role: role || "Employee", // ✅ default fallback role
            organization: {
                name,
                description,
                url: OrganizationURL,
                mail: OrganizationMail,
            },
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                contactnumber: user.contactnumber,
                role: user.role, // ✅ include in response
                organization: user.organization,
                token: generateToken(user._id), // 🔑 issue JWT token
                createdAt: user.createdAt,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check for user
//         const user = await User.findOne({ email });

//         if (user && (await user.matchPassword(password))) {
//             res.json({
//                 _id: user._id,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 email: user.email,
//                 contactnumber: user.contactnumber,
//                 organization: user.organization,
//                 token: generateToken(user._id), // issue JWT
//             });
//         } else {
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.error("Error in loginUser:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                contactnumber: user.contactnumber,
                organization: user.organization,
                role: user.role, // ✅ include role
                token: generateToken(user._id, user.role), // ✅ role inside token
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

