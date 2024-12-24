

const OrderDeliveredMail = ({ _id, user: { name, email }, deliveredAt }) => {

  const htmlString =
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kartify</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      text-align: center;
    }
    .heading {
      font-size: 2.25rem; /* 4xl */
      font-weight: bold;
      color: #4f46e5; /* Indigo-700 */
    }
    .paragraph {
      margin-top: 48px;
      font-size: 1rem;
      line-height: 1.5;
    }
    .highlight {
      font-weight: 600;
      color: #22c55e; /* Green-500 */
    }
    @media (min-width: 640px) {
      .container {
        padding: 48px;
      }
      .heading {
        font-size: 3rem; /* 5xl */
      }
    }
    @media (min-width: 768px) {
      .heading {
        font-size: 3.75rem; /* 6xl */
      }
    }
    @media (min-width: 1024px) {
      .paragraph {
        max-width: 768px; /* lg:max-w-3xl */
        margin: 0 auto;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">KARTIFY</h1>
    <p class="paragraph">
      Dear <span>${name}</span>, Congratulations! Your Order (${_id}) is  
      <span class="highlight">DELIVERED 😀</span> at 
      ${new Date(deliveredAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
    </p>
  </div>
</body>
</html>

`


  return { to: email, subject: 'Kartify Order Delivered', html: htmlString };
}

export default OrderDeliveredMail;