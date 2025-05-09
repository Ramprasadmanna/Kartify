

const OtpEmail = ({ email, otp }) => {

  const htmlString =
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Validation</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
      padding: 24px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px;
      text-align: center;
    }

    .heading {
      font-size: 2.25rem;
      font-weight: bold;
      color: #4f46e5;
    }

    .message {
      margin-top: 48px;
      font-size: 1rem;
      line-height: 1.5;
      text-transform: capitalize;
      color: #111827;
    }

    .otp {
      margin-top: 24px;
      font-size: 2.25rem;
      font-weight: 600;
      text-transform: capitalize;
      letter-spacing: 0.15em;
      color: #111827;
    }

    .note {
      margin-top: 24px;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: capitalize;
      color: #f87171;
    }

    /* Responsive Styles */
    @media screen and (max-width: 640px) {
      .heading {
        font-size: 1.875rem;
      }

      .otp {
        font-size: 1.875rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">KARTIFY</h1>
    <p class="message">
      Here is your one-time password to validate your email address<br />
    </p>
    <p class="otp">${otp}</p>
    <p class="note">Valid for 10 minutes only</p>
  </div>
</body>
</html>


`

  return { to: email, subject: 'Kartify Email Verification', html: htmlString };
}

export default OtpEmail;