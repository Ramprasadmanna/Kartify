

const WelcomeEmail = ({ name, email }) => {

  const htmlString =
    `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KARTIFY</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; text-align: center;">
    <h1 style="color: #4F46E5; font-size: 32px; font-weight: bold; margin: 0 0 20px 0;">Welcome To KARTIFY!</h1>
    <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 0 auto 20px auto;">
      Dear ${name}, <br />
      Your account is ready to go. Explore a wide range of products, enjoy exclusive deals, and shop with ease. 🛒 Start your shopping journey now at <strong>KARTIFY</strong>. <br />
      Need help? We're here for you! Happy Shopping! 😊
    </p>
    <div>
      <a href="https://kartify.com" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4F46E5; border-radius: 4px; text-decoration: none; font-weight: bold;">
        Shop Now
      </a>
    </div>
  </div>

</body>
</html>
  `


  return { to: email, subject: 'Welcome To Kartify', html: htmlString };
}

export default WelcomeEmail;