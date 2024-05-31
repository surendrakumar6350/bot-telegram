const email = async (message)=> {


    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "papa.kaa.dinosaur@gmail.com",
            pass: process.env.GMAILPASSWORD,
        },
    });
    
    
    async function main() {
        const info = await transporter.sendMail({
            from: "papa.kaa.dinosaur@gmail.com",
            to: "kamleshksks456@gmail.com",
            subject: "Le lo pudina",
            text: "",
            html: `${message}`,
        });
    
        console.log("Message sent: %s", info.messageId);
    }
    
    await new Promise((resolve, reject) => {
        main().then(() => resolve())
            .catch(() => resolve());
        setTimeout(() => {
            resolve()
        }, 9000)
    })
    

}

module.exports = {email};