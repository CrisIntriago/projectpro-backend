import nodemailer from "nodemailer";
import emailjs from '@emailjs/nodejs';



export const emailRegistro2 = async (datos) => {
  const { email, nombre, token } = datos;

  let params= {
    nombre : nombre,
    email : email,
    url: `${process.env.FRONTEND_URL}/confirmar/${token}`
  }

  emailjs.send("service_ivqx14o","template_iw67m7n", params, {
    publicKey: '8IQ29ohAkQUmBGJkQ',
    privateKey: 'VT299bZkuVK23ksTafTTD', // optional, highly recommended for security reasons
  })
  .then(
    (response) => {
      console.log('Mail sent!', response.status, response.text);
    },
    (err) => {
      console.log('Mail could not be sent :(', err);
    },
  );

};




export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};
