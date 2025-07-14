import { clerkClient } from '@clerk/express';

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = await req.auth(); // chú ý dùng () vì req.auth là function

        const user = await clerkClient.users.getUser(userId);

        // Kiểm tra trong user.metadata.private
        const role = user.privateMetadata?.role || user.publicMetadata?.role;

        console.log('User Role:', role);

        if (role !== 'admin') {
            return res.json({ success: false, message: "not authorized" });
        }

        next();
    } catch (error) {
        console.error('protectAdmin error:', error);
        return res.json({ success: false, message: "not authorized" });
    }
};
