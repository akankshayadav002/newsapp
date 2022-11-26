var _=require('lodash')
const nodemailer=require('nodemailer')

var config={
    host: 'akanshayadav002@gmail.com',
    port:587,
    auth:{
        user:'akanshayadav002@gmail.com',
        pass:'Lappy@89'
    }
};

var transporter=nodemailer.createTransport(config)

var defaultMail={
    from:'akanshayadav002@gmail.com',
    text: 'test test'
}

const send=(to,subject,html)=>{
    mail= _.merge({html}, defaultMail,to)

    transporter.sendMail(mail,function(error,info){
        if(error) return console.log(error);
        console.log('mail sent', info.response);
    })
}

module.exports={
    send
}

