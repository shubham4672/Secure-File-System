const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailResend = async (
  receiverEmail,
  fileID,
  senderName = "Encrypt Share"
) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiverEmail,
      subject: `Here is your File ID from ${senderName}!`,
      text: `Your file is ready to download. Use the link: http://localhost:4000/download/${fileID}`,
      html: `
        <h3>Dear user,</h3><br/>
        Download page: <a href='http://localhost:5173/download'>download page link</a><br/>
        Here is your File ID: <strong>${fileID}</strong><br/><br/>
        <b>Because of our security policy we don't share passwords. You need to ask the sender for it.</b>
      `,
    });
    console.log("📨 Preparing to send email to:", receiverEmail);
    console.log("📧 Resend API response:", JSON.stringify(response, null, 2));

    console.log("📂 File uploaded. Receiver email:", receiverEmail);

    if (response?.id) {
      return { success: true, data: response };
    } else {
      return {
        success: false,
        error: "Email sending failed without specific error.",
      };
    }
  } catch (error) {
    console.error(
      "❌ Email sending failed with error:",
      error?.response || error
    );
    return { success: false, error: err.message };
  }
};

module.exports = sendEmailResend;
