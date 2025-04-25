import transporter from "#config/nodemailer.config.js";
import {
  WelcomeEmail,
  OrderEmail,
  AccountDeactivateMail,
  AccountReactivateMail,
  AccountUpdateMail,
  AccountDeleteMail,
  OrderDeliveredMail,
  OtpEmail,
} from "#data/EmailTemplates/index.js";

const mailSend = async (type, data) => {
  let options = {
    to: "",
    subject: "",
    html: "",
  };

  if (type === "otp") {
    const config = OtpEmail(data);
    options = {
      ...config,
    };
  }

  if (type === "welcome") {
    const config = WelcomeEmail(data);
    options = {
      ...config,
    };
  }

  if (type === "order") {
    const config = OrderEmail(data);
    options = {
      ...config,
    };
  }

  if (type === "delivered") {
    const config = OrderDeliveredMail(data);
    options = {
      ...config,
    };
  }

  if (type === "deactivate") {
    const config = AccountDeactivateMail(data);
    options = {
      ...config,
    };
  }

  if (type === "reactivate") {
    const config = AccountReactivateMail(data);
    options = {
      ...config,
    };
  }

  if (type === "update") {
    const config = AccountUpdateMail(data);
    options = {
      ...config,
    };
  }

  if (type === "delete") {
    const config = AccountDeleteMail(data);
    options = {
      ...config,
    };
  }

  try {
    const id = await transporter.sendMail({
      from: "Kartify",
      ...options,
    });
  } catch (err) {
    console.log("Mail Sending Error:");
    console.log(err);
  }
};

export default mailSend;
