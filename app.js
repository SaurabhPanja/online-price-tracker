require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nightmare = require("nightmare")();

const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

checkPrice(url, minPrice);

async function checkPrice(url, minPrice) {
  try {
    const priceStr = await nightmare
      .goto(url)
      .wait("._1vC4OE")
      .evaluate(() => document.querySelector("._1vC4OE").innerText)
      .end();

    const price = parseInt(priceStr.replace(/\D/g, ""));
    if (price < minPrice) {
      console.log("Buy It");
      sendEmail(`Buy it`, `The price on ${url} is less than ${minPrice}`);
    }
  } catch (error) {
    await sendEmail("Online price tracker failed", error.message);
    throw error;
  }
}

const sendEmail = (subject, body) => {
  const email = {
    to: "panjasaurabh@gmail.com",
    from: "random@gmail.com",
    subject: subject,
    text: body,
    html: body
  };
  return sgMail.send(email);
};
