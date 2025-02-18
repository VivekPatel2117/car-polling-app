import { sendMail } from "./mailer";

export const bookingRequest = async (
    email: string,
    username: string,
    start_date: string,
    end_date: string,
    car_name: string,
    car_model: string,
    days: number,
    price: number,
    total_bill: number
) => {
    const subject = `Booking Request Received - ${car_name} (${car_model})`;
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #007bff; text-align: center;">Booking Request Received 🚗</h2>
            <p>Hi <strong>${username}</strong>,</p>
            <p>We've received your booking request for <strong>${car_name} (${car_model})</strong>.</p>
            <p><strong>Booking Details:</strong></p>
            <ul>
                <li><strong>Start Date:</strong> ${start_date}</li>
                <li><strong>End Date:</strong> ${end_date}</li>
                <li><strong>Total Days:</strong> ${days}</li>
                <li><strong>Price per Day:</strong> ₹${price}</li>
                <li><strong>Total Bill:</strong> ₹${total_bill}</li>
            </ul>
            <p>We will notify you once your booking is confirmed.</p>
            <p>Thank you for choosing Poolcar! 🚘</p>
        </div>
    `;

    await sendMail(email, body, subject);
};

export const bookingAccepted = async (
    email: string,
    username: string,
    start_date: string,
    end_date: string,
    car_name: string,
    car_model: string,
    days: number,
    price: number,
    total_bill: number
) => {
    const subject = `Booking Confirmed - ${car_name} (${car_model})`;
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: green; text-align: center;">Booking Confirmed ✅</h2>
            <p>Hi <strong>${username}</strong>,</p>
            <p>Your booking for <strong>${car_name} (${car_model})</strong> has been confirmed! 🎉</p>
            <p><strong>Booking Details:</strong></p>
            <ul>
                <li><strong>Start Date:</strong> ${start_date}</li>
                <li><strong>End Date:</strong> ${end_date}</li>
                <li><strong>Total Days:</strong> ${days}</li>
                <li><strong>Price per Day:</strong> ₹${price}</li>
                <li><strong>Total Bill:</strong> ₹${total_bill}</li>
            </ul>
            <p>We hope you have a great ride. 🚗</p>
            <p>For any queries, feel free to contact us.</p>
            <p>Happy Riding!<br><strong>The Poolcar Team</strong></p>
        </div>
    `;

    await sendMail(email, body, subject);
};

export const bookingRejected = async (
    email: string,
    username: string,
    start_date: string,
    end_date: string,
    car_name: string,
    car_model: string,
    days: number,
    price: number,
    total_bill: number
) => {
    const subject = `Booking Request Rejected - ${car_name} (${car_model})`;
    const body = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: red; text-align: center;">Booking Request Rejected ❌</h2>
            <p>Hi <strong>${username}</strong>,</p>
            <p>Unfortunately, your booking request for <strong>${car_name} (${car_model})</strong> has been rejected.</p>
            <p><strong>Booking Details:</strong></p>
            <ul>
                <li><strong>Start Date:</strong> ${start_date}</li>
                <li><strong>End Date:</strong> ${end_date}</li>
                <li><strong>Total Days:</strong> ${days}</li>
                <li><strong>Price per Day:</strong> ₹${price}</li>
                <li><strong>Total Bill:</strong> ₹${total_bill}</li>
            </ul>
            <p>Possible reasons:</p>
            <ul>
                <li>Car is not available for the selected dates</li>
                <li>Incomplete booking information</li>
                <li>Other unforeseen circumstances</li>
            </ul>
            <p>We apologize for the inconvenience. Feel free to try another car on Poolcar.</p>
            <p>Best Regards,<br><strong>The Poolcar Team</strong></p>
        </div>
    `;

    await sendMail(email, body, subject);
};
