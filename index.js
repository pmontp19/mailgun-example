
const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const pug = require('pug');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: 'myapikey', url: 'https://api.eu.mailgun.net', timeout: 60000 });

const domain = 'preprod.com';
const fromEmail = 'Info <info@preprod.com>';
const toEmails = ['myemail@mail.com'];

const mailgunLogo = fs.createReadStream(`${__dirname}/mailgun.png`);
const rackspaceLogo = fs.createReadStream(`${__dirname}/rackspace.png`);

const computed = pug.compileFile(`${__dirname}/account_password_reset.pug`, {})
const html = computed({name:'Pere', lastname:'Montpeo', urlfront:'https://google.com', token:'123456789'});


mg.messages.create(domain, {
  from: fromEmail,
  to: toEmails,
  subject: 'Hello',
  html: html,
  text: 'Testing some Mailgun awesomness!',
  file: 'mytemplatecrashes.pug',  // this property crashes mailgun.js
  inline: [mailgunLogo],
  attachment: [rackspaceLogo]
})
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));