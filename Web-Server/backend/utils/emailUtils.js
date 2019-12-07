const nodeMailer = require("nodemailer");

async function sendEmail(email, code) {
  let transporter = nodeMailer.createTransport({
    host: "poczta.o2.pl",
    port: 465,
    secure: true,
    auth: {
      user: "bookalike-noreply@tlen.pl",
      pass: "Palec123123"
    }
  });

  let mailOptions = {
    from: '"Bookalike Admin" <bookalike-noreply@tlen.pl>',
    to: email,
    subject: "Potwierdzenie założenia konta",
    html:
      `<div className="div">Podany kod jest bardzo ważny, używasz go do wielu czynności takich jak
        <ul>
            <li>Potwierdzenia założenia konta</li>
            <li>Dezaktywacji konta</li>
            <li>Zmiany hasła, adresu e-mail</li>
            <li>Usunięcia konta</li>
        </ul>
        <h2>Twój kod to: ` +
      code +
      `</h2>
    </div>`
  };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     console.log("Email wysłany");
  //   }
  // });

  let resp = await transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch(err => {
      console.log(err);
      throw err.response;
    });
  return resp;
}

module.exports = { sendEmail };
