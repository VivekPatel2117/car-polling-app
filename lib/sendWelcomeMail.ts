import { sendMail } from "./mailer";

export const welcomeEmail = async (
    email: string,
    username: string
) => {
    const dashboardUrl = process.env.NEXT_PUBLIC_POOLCAR_DASHBOARD_URL || "https://default-url.com";

    const welcomeBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #007bff; text-align: center;">Welcome to Poolcar, ${username}! 🚗</h2>
            <p>Hey <strong>${username}</strong>,</p>
            <p>We’re thrilled to have you on board! Poolcar is all about making commuting **easier, cheaper, and more eco-friendly**.</p>
            <p>Start exploring now:</p>
            <p style="text-align: center;">
                <a href="${dashboardUrl}" 
                   style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                   Get Started
                </a>
            </p>
            <p>Happy Carpooling!<br><strong>The Poolcar Team</strong></p>
        </div>
    `;

    const subject = `Welcome ${username} to Poolcar! 🚗`;

    await sendMail(email, welcomeBody, subject);
};
