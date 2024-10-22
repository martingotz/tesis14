import React from 'react';
import './Cookies.css';

const Cookies = () => {
  return (
    <div className="cookies-container">
      <h2 className="cookies-title">Política de Cookies</h2>
      <p className="cookies-text">
        Este sitio web utiliza cookies para mejorar tu experiencia de navegación y proporcionar contenido y anuncios personalizados. Al utilizar este sitio web, aceptas el uso de cookies de acuerdo con esta política.
      </p>
      <h3 className="cookies-subtitle">¿Qué son las cookies?</h3>
      <p className="cookies-text">
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, teléfono inteligente, tableta) cuando visitas un sitio web. Se utilizan ampliamente para que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios de sitios web.
      </p>
      <h3 className="cookies-subtitle">Cómo utilizamos las cookies</h3>
      <ul className="cookies-list">
        <li><strong>Cookies esenciales:</strong> Estas cookies son necesarias para que el sitio web funcione correctamente. Permiten funciones básicas como la navegación por las páginas y el acceso a áreas seguras del sitio web. El sitio web no puede funcionar correctamente sin estas cookies.</li>
        <li><strong>Cookies analíticas/de rendimiento:</strong> Estas cookies nos permiten reconocer y contar el número de visitantes a nuestro sitio web y ver cómo se mueven por el sitio. Esto nos ayuda a mejorar la forma en que funciona nuestro sitio web, por ejemplo, asegurando que los usuarios encuentren lo que buscan fácilmente.</li>
        <li><strong>Cookies de funcionalidad:</strong> Estas cookies se utilizan para reconocerte cuando vuelves a nuestro sitio web. Esto nos permite personalizar nuestro contenido para ti, saludarte por tu nombre y recordar tus preferencias (como el idioma o la región).</li>
        <li><strong>Cookies publicitarias/direccionadas:</strong> Estas cookies se utilizan para ofrecerte anuncios más relevantes para ti y tus intereses. También se utilizan para limitar la cantidad de veces que ves un anuncio y ayudar a medir la efectividad de la campaña publicitaria. Por lo general, se colocan por redes publicitarias con el permiso del operador del sitio web.</li>
      </ul>
      <h3 className="cookies-subtitle">Gestión de cookies</h3>
      <p className="cookies-text">
        Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
      </p>
      <h3 className="cookies-subtitle">Contáctanos</h3>
      <p className="cookies-text">Si tienes alguna pregunta sobre nuestro uso de cookies, contáctanos:</p>
      <p className="cookies-contact">Correo electrónico: <a href="mailto:unigpt@gmail.com">unigpt@gmail.com</a></p>
    </div>
  );
};

export default Cookies;
