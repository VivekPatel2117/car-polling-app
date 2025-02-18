import { sendMail } from "./mailer";
import NodeCache from "node-cache";
// Function to generate OTP
const generateOtp = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

const otpCache = new NodeCache({ stdTTL: 1800, checkperiod: 120 }); 
// Example usage in an authentication route
const sendOtpForAuthentication = async (recipientEmail: string) => {
    const otp = generateOtp();
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
  otpCache.set("OTP", otp); // Store OTP in cache
  otpCache.set("EMAIL", recipientEmail); // Store email in cache
  console.log("OTP sent to", recipientEmail);
  console.log("Response",response)
  return response
};

const validateOtp = (otpInput: string): boolean => {
  const storedOtp = otpCache.get("OTP");
  if (storedOtp === otpInput) {
    console.log("OTP validated successfully!");
    return true;
  } else {
    console.log("Invalid OTP!");
    return false;
  }
};
const getOtp = () => {
  return otpCache.get("OTP");
}
const getEmail = () => {  
  return otpCache.get("EMAIL");
}
export default { sendOtpForAuthentication, validateOtp, getOtp, getEmail };
