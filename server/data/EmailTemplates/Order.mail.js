
const OrderEmail = ({ user: { name, email }, createdAt: orderDate, _id: orderId, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }) => {

  const htmlString =
    `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>

  <body>
    <!-- Container -->
    <div
      style="
        margin: 0 auto;
        max-width: 1280px;
        padding: 24px 16px;
      "
    >
      <!-- Heading -->
      <h1
        style="
          text-align: center;
          font-size: 2.25rem;
          font-weight: bold;
          color: #4f46e5;
          margin: 0;
        "
      >
        KARTIFY
      </h1>

      <h2
        style="
          margin-top: 32px;
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #4f46e5;
        "
      >
        Order Confirmation
      </h2>

      <!-- Message -->
      <p
        style="
          margin: 24px auto 0 auto;
          text-align: center;
          max-width: 768px;
          line-height: 1.5;
        "
      >
        <span style="text-transform: capitalize">${name}</span>, thank
        you for your order!<br />
        We've received your order and will contact you as soon as your package
        is shipped. You can find your purchase information below.
      </p>

      <!-- Order & Billing Summary -->
      <h2
        style="
          margin-top: 32px;
          text-align: center;
          font-size: 1.3rem;
          font-weight: 600;
          text-transform: capitalize;
          color: #4f46e5;
        "
      >
        Order & Billing summary
      </h2>

      <!-- Summary Details -->
      <div
        style="
          margin: 24px auto;
          max-width: 768px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        "
      >
        <dl style="border-color: #e5e7eb; margin:0;">
          <!-- Order Date -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Order Date</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ${new Date(orderDate).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}
            </dd>
          </div>

          <!-- Order ID -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Order ID</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ${orderId.toLocaleString()}
            </dd>
          </div>

          <!-- Payment Method -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Payment Method</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ${paymentMethod.toLocaleString()}
            </dd>
          </div>

          <!-- Payment Status -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Payment Status</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #10b981">
              Success
            </dd>
          </div>

          <!-- Items Price -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Items Price</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ₹${itemsPrice.toLocaleString()}/-
            </dd>
          </div>

          <!-- Shipping -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Shipping</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ₹${shippingPrice.toLocaleString()}/-
            </dd>
          </div>

          <!-- Taxes -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
            "
          >
            <dt style="font-size: 14px; color: #6b7280">Taxes</dt>
            <dd style="font-size: 14px; font-weight: 500; color: #111827">
              ₹${taxPrice.toLocaleString()}/-
            </dd>
          </div>

          <!-- Total -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 16px;
              background-color: #4f46e5;
              color: #ffffff;
            "
          >
            <dt style="font-size: 16px; font-weight: 600">Total</dt>
            <dd style="font-size: 16px; font-weight: 600">₹${totalPrice.toLocaleString()}/-</dd>
          </div>
        </dl>
      </div>
    </div>
  </body>
</html>

`


  return { to: email, subject: 'Your Order Is Confirmed', html: htmlString };
}

export default OrderEmail;