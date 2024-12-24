

const AccountUpdateMail = ({ _id, name, email, createdAt, updatedAt }) => {

  const htmlString =
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kartify Account Details</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      padding: 24px;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 24px;
      background-color: #ffffff;
    }

    .heading {
      text-align: center;
      font-size: 2.25rem;
      font-weight: bold;
      color: #4f46e5;
    }

    .subheading {
      text-align: center;
      font-size: 1.875rem;
      font-weight: 600;
      text-transform: capitalize;
      color: #4f46e5;
      margin-top: 32px;
    }

    .text {
      text-align: center;
      max-width: 768px;
      margin: 48px auto 24px auto;
      color: #111827;
      font-size: 1rem;
      line-height: 1.5;
    }

    .details-box {
      max-width: 768px;
      margin: 24px auto;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
    }

    .details-list {
      padding: 24px;
    }

    .details-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
    }

    .label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .value {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
    }

    /* Responsive Styles */
    @media screen and (max-width: 640px) {
      .heading {
        font-size: 1.875rem;
      }

      .subheading {
        font-size: 1.5rem;
      }

      .details-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .value {
        margin-top: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="heading">KARTIFY</h1>
    <p class="text">
      Dear ${name}, Congratulations! Your account details have been updated.
    </p>
    <h2 class="subheading">Account Details</h2>
    <div class="details-box">
      <dl class="details-list">
        <div class="details-item">
          <dt class="label">Account ID</dt>
          <dd class="value">${_id}</dd>
        </div>
        <div class="details-item">
          <dt class="label">Name</dt>
          <dd class="value">${name}</dd>
        </div>
        <div class="details-item">
          <dt class="label">Email</dt>
          <dd class="value">${email}</dd>
        </div>
        <div class="details-item">
          <dt class="label">Account Created</dt>
          <dd class="value">
            ${new Date(createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
          </dd>
        </div>
        <div class="details-item">
          <dt class="label">Last Updated</dt>
          <dd class="value">
            ${new Date(updatedAt).toLocaleString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</body>
</html>

`


  return { to: email, subject: 'Kartify Account Details Updated', html: htmlString };
}

export default AccountUpdateMail;