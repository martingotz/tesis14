import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h2 className="privacy-title">Política de Privacidad</h2>
      <p className="privacy-text">
        UniGPT se compromete a proteger tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal cuando visitas nuestro sitio web o utilizas nuestros servicios.
      </p>
      <h3 className="privacy-subtitle">Información que recopilamos</h3>
      <p className="privacy-text">
        Podemos recopilar información personal, como tu nombre, apellido, dirección de correo electrónico, cuando nos la proporcionas voluntariamente. Además, podemos recopilar cierta información no personal automáticamente, incluida tu dirección IP, tipo de navegador, sistema operativo y datos de uso del sitio web mediante cookies y otras tecnologías de seguimiento.
      </p>
      <h3 className="privacy-subtitle">Cómo utilizamos tu información</h3>
      <ul className="privacy-list">
        <li>Proporcionar y personalizar nuestros servicios</li>
        <li>Comunicarnos contigo, incluida la respuesta a tus consultas y la prestación de soporte al cliente</li>
        <li>Analizar y mejorar nuestro sitio web y servicios</li>
        <li>Enviarte materiales promocionales y actualizaciones sobre nuestros productos y servicios, con tu consentimiento</li>
        <li>Cumplir con obligaciones legales y hacer cumplir nuestros términos de servicio</li>
      </ul>
      <h3 className="privacy-subtitle">Compartir información</h3>
      <p className="privacy-text">
        Podemos compartir tu información personal con proveedores de servicios de terceros que nos ayudan a operar nuestro sitio web, llevar a cabo nuestro negocio o atenderte. También podemos compartir tu información cuando la ley lo requiera o para proteger nuestros derechos, propiedad o seguridad, o la de otros.
      </p>
      <h3 className="privacy-subtitle">Seguridad de los datos</h3>
      <p className="privacy-text">
        Tomamos medidas razonables para proteger la seguridad de tu información personal y prevenir el acceso, uso o divulgación no autorizados. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es completamente seguro, y no podemos garantizar una seguridad absoluta.
      </p>
      <h3 className="privacy-subtitle">Tus opciones</h3>
      <p className="privacy-text">
        Tienes derecho a acceder, actualizar o eliminar tu información personal. También puedes optar por no recibir comunicaciones promocionales de nuestra parte en cualquier momento siguiendo las instrucciones proporcionadas en dichas comunicaciones o contactándonos directamente.
      </p>
      <h3 className="privacy-subtitle">Cambios en esta Política de Privacidad</h3>
      <p className="privacy-text">
        Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o requisitos legales. Te animamos a revisar esta página periódicamente para obtener la información más reciente sobre nuestras prácticas de privacidad.
      </p>
      <h3 className="privacy-subtitle">Contáctanos</h3>
      <p className="privacy-text">
        Si tienes alguna pregunta o inquietud sobre nuestra Política de Privacidad o sobre cómo manejamos tu información personal, por favor contáctanos:
      </p>
      <p className="privacy-contact">Correo electrónico: <a href="mailto:unigpt@gmail.com">unigpt@gmail.com</a></p>
    </div>
  );
};

export default Privacy;
