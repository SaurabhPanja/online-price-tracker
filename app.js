const nightmare = require("nightmare")();
const nodemailer = require("nodemailer");


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
         sendEmail(`Hot infinix is now available`, `The price on ${url} is less than ${minPrice}`);
    }
  } catch (error) {
    await sendEmail("Online price tracker failed", error.message);
    throw error;
  }
}

const sendEmail = async (subject, text) => {
    try {
        let transporter = await nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'maheshbhaibc@gmail.com',
              pass: password
            }
          });
      
          // send mail with defined transport object
          await transporter.sendMail({
            from: '<maheshbhaibc@gmail.com>', // sender address
            to: "panjasaurabh@gmail.com", // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
          });
      
    } catch (error) {
        throw error
    }
    
}
