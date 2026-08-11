const nodemailer = require('nodemailer');

async function sendTestEmail() {
  const senderEmail = 'immfaiumy25@gmail.com'; 
  const appPassword = 'nxlt cftn tudi pxpd'; 
  const targetEmail = 'davinipad53@gmail.com'; 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: appPassword,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: targetEmail,
    subject: 'Kode OTP Test',
    text: 'Kode OTP Anda adalah: 123456',
    html: '<p>Kode OTP Anda adalah: <b>123456</b></p>'
  };

  try {
    console.log('Mencoba mengirim email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email berhasil terkirim:', info.response);
  } catch (error) {
    console.error('Gagal mengirim email:', error);
  }
}

sendTestEmail();
