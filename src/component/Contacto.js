import React, { useState } from 'react';
import './Contacto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Contacto = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div>
      <div className="contact-section">
        <div className="contact-content">
          <h2>Contactanos</h2>
          <p>
            Mandanos un mail, si tenes algún problema con la página web. También contactanos si tenes comentarios o recomendaciones para hacer. Estamos a tu disposición para arreglar cualquier problema.
          </p>
        </div>
        <div className="contact-form">
          <form>
            <input type="text" name="name" placeholder="Nombre" />
            <input type="email" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Mensaje"></textarea>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
      <div className="additional-contact-section">
        <div className="additional-contact-content">
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
            <h3>Email</h3>
            <p>Mandanos un mail, si tenes algún problema con la página web. Estamos a tu disposición para arreglar cualquier problema.</p>
            <br /><p>unigpt@gmail.com</p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            <h3>Chateanos</h3>
            <p>Contactanos por Whatsapp para obtener mayor información o solucionar problemas.</p>
            <br /><br /><p>+54 911 7777 2222</p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
            <h3>Telefono</h3>
            <p>Contactanos por telefono, si tenes algún problema con la página web. Estamos a tu disposición para arreglar cualquier problema.</p>
            <br /><p>Av. 9 de Julio s/n, C1043 Cdad. Autónoma de Buenos Aires</p>
          </div>
        </div>
      </div>
      <div className="faq-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(0)}>
            <h3>¿Para que sirve el chatbot?</h3>
            <FontAwesomeIcon icon={openFAQ === 0 ? faMinus : faPlus} />
          </div>
          {openFAQ === 0 && (
            <div className="faq-answer">
              <p>El chatbot sirve para resolver cualquiera de tus dudas sobre la oferta academica. Puedes iniciar una conversacion con el chatbot y recibir recomendaciones para que puedas elegir la mejor carrera universitaria  en base a tus gustos y preferencias.</p>
            </div>
          )}
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(1)}>
            <h3>¿Para usar UniGPT tengo que saber que estudiar primero?</h3>
            <FontAwesomeIcon icon={openFAQ === 1 ? faMinus : faPlus} />
          </div>
          {openFAQ === 1 && (
            <div className="faq-answer">
              <p>No es necesario! La idea de UniGPT es poder ayudar a todos los estudiantes a poder elegir la carrera universitaria ideal o el lugar donde poder hacerla.</p>
            </div>
          )}
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(2)}>
            <h3>¿Cómo me ayuda el chat para elegir mi carrera?</h3>
            <FontAwesomeIcon icon={openFAQ === 2 ? faMinus : faPlus} />
          </div>
          {openFAQ === 2 && (
            <div className="faq-answer">
              <p>El chatbot va a realizarte algunas preguntas para poder saber tus gustos y preferencias, y en base a la informacion que le brindes te va a recomendar la mejor opción para vos.</p>
            </div>
          )}
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(3)}>
            <h3>¿Que le puedo preguntar al Chat?</h3>
            <FontAwesomeIcon icon={openFAQ === 3 ? faMinus : faPlus} />
          </div>
          {openFAQ === 3 && (
            <div className="faq-answer">
              <p>Aqui tienes preguntas tipo para comenzar a encaminarte a elegir tu carrera ideal. Preguntas: ...</p>
            </div>
          )}
        </div>
        <div className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(4)}>
            <h3>¿Puedo confiar en que la IA me diga la verdad?</h3>
            <FontAwesomeIcon icon={openFAQ === 4 ? faMinus : faPlus} />
          </div>
          {openFAQ === 4 && (
            <div className="faq-answer">
              <p>UniGPT puede proporcionar respuestas incorrectas 
                ocasionalmente. Su conocimiento del mundo se limita las universidades subidas a la página oficial del Estado argentino ocurridos hasta 2023, y en ocasiones podría ofrecer instrucciones perjudiciales o contenidos sesgados. Siempre se recomienda verificar la exactitud de las respuestas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacto;


/*function Contacto() { 
  return (
    <div className="form-card1">
      <div className="form-card2">
        <form className="form">
          <p className="form-heading">Contactanos</p>

          <div className="form-field">
            <input required="" placeholder="Nombre" className="input-field" type="text" />
          </div>

          <div className="form-field">
            <input
              required=""
              placeholder="Email"
              className="input-field"
              type="email"
            />
          </div>

          <div className="form-field">
            <input
              required=""
              placeholder="Asunto"
              className="input-field"
              type="text"
            />
          </div>

          <div className="form-field">
            <textarea
              required=""
              placeholder="Mensaje"
              cols="30"
              rows="3"
              className="input-field"
            ></textarea>
          </div>

          <button className="sendMessage-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
}
*/
