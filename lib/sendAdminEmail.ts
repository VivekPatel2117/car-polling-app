import { sendMail } from "./mailer"

export const sendAdminContact = async(
    email:string,
    message:string,
    name: string
) =>{
    const body = `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>

        <div class="footer">
            <p>This email was generated automatically. Please do not reply.</p>
        </div>
    </div>
</body>
</html>

    `
    try {
        const adminEmail = process.env.ADMIN!;
       await sendMail(adminEmail,body,"Support Request Notification")
    } catch (error) {
        console.log(error)
    }
}