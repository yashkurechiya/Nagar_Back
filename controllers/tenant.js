import { Tenant } from "../models/Tenant.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerTenant = async (req, res) => {
    try {
        const { fullName, email, phone, address, landlordEmail, wardNumber } = req.body;

        const tenant = await Tenant.create({
            fullName,
            email,
            phone,
            address,
            landlordEmail,
            wardNumber
        });

        // 📧 Notify Landlord
        await sendEmail(
            landlordEmail,
            "Tenant Registration Notification - E-Nagarseva",
            `Dear Landlord,

Your tenant ${fullName} has registered on the E-Nagarseva portal.

Tenant Details:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Ward: ${wardNumber}

Regards,
E-Nagarseva Portal`
        );

        res.status(201).json({
            success: true,
            message: "Tenant registered & landlord notified",
            data: tenant
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTanant = async (req, res) => {

    try {
        const tenants = await Tenant.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: tenants
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}