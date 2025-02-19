import { sendMail } from "./mailer";
import { prisma } from "@/prisma/primsa";
const generateOtp = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

try {
  await prisma.$connect();
  console.log("✅ Prisma successfully connected to MongoDB!");
} catch (error) {
  console.log("❌ Failed to connect to MongoDB:", error);
}

const storeOtp = async (email: string, otp: string) => {
  return await prisma.otp.upsert({
    where: { email },
    update: { otp, createdAt: new Date() },
    create: { email, otp, createdAt: new Date() },
  });
};
// Example usage in an authentication route
const sendOtpForAuthentication = async (recipientEmail: string) => {
    const otp = generateOtp();
    await storeOtp(recipientEmail,otp)
    const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Email</title>
      <style>
        /* General Reset */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .email-header {
          background-color: #4caf50;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }
        .email-body {
          padding: 20px;
          text-align: center;
          color: #333333;
        }
        .email-body p {
          font-size: 16px;
          line-height: 1.5;
          margin: 0 0 20px;
        }
        .otp-code {
          display: inline-block;
          background-color: #f1f1f1;
          padding: 15px 25px;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 3px;
          color: #333333;
        }
        .email-footer {
          background-color: #f9f9f9;
          text-align: center;
          padding: 10px;
          font-size: 14px;
          color: #777777;
        }
        .email-footer a {
          color: #4caf50;
          text-decoration: none;
        }
        /* Responsive Design */
        @media (max-width: 600px) {
          .email-container {
            width: 90%;
          }
          .otp-code {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Verify Your Email</h1>
        </div>
        <div class="email-body">
          <p>Hi User,</p>
          <p>We received a request to verify your email address. Please use the OTP below to complete the verification process:</p>
          <div class="otp-code">${otp}</div>
          <p>This OTP is only valid for next 30 minutes</p> <br>
          <p>If you did not request this, please ignore this email or contact support.</p>
        </div>
        <div class="email-footer">
          <p>If you have any questions, contact us at <a href="mailto:vivekpatel1374@gmail.com">vivekpatel1374@gmail.com</a></p>
          <p>&copy; 2025 Poolcar. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  const response = await sendMail(recipientEmail,body, "OTP Authentication");
  
  return response
};

const validateOtp = async (otp: string) =>{
  try {
    const existingOtp = await prisma.otp.findFirst({
      where: { otp }, // Search by OTP
    });
    
    if (!existingOtp) {
      return { success: false, message: "OTP not found or expired" };
    }
    
    return { success: true, email: existingOtp.email, createdAt: existingOtp.createdAt };
    
  } catch (error) {
    console.log("ERROR",error)
  }
}
export default { sendOtpForAuthentication, validateOtp };
