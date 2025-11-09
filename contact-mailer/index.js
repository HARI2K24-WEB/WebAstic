require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors()); // tighten this in production to specific origins
app.use(express.json());

const PORT = process.env.PORT || 3000;

// basic validation helper
function validateForm({ name, email, message }) {
  if (!name || !email || !message) return false;
  // simple email regex
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Nodemailer transporter using Gmail SMTP + App Password
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,        // secure port
  secure: true,
  auth: {
    user: process.env.GMAIL_USER, // your gmail e.g. yourname@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD // 16-char app password
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject = 'New contact form message', message } = req.body;

    if (!validateForm({ name, email, message })) {
      return res.status(400).json({ ok: false, error: 'Invalid input' });
    }

    const mailOptions = {
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER, // where you want to receive it
      subject: `${subject} — from ${name}`,
      text: `You have a new contact form submission.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return res.json({ ok: true, message: 'Email sent' });
  } catch (err) {
    console.error('Send email error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
