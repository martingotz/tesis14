import './Contamos.css';

const Contamos = () => {
  return (
    <div className="achievement-section">
      <div className="achievement-content">
        <h2>Contamos</h2>
        <p>Contamos con carreras y universidades de toda la Argentina</p>
        <div className="stats">
          <div>800 <span>Carreras</span></div>
          <div>500 <span>Universidades</span></div>
          <div>5000 <span>Estudiantes</span></div>
          <div>650 <span>Participantes del Foro</span></div>
        </div>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d152471.75403701185!2d-58.56031062355942!3d-34.49703804060932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1suniversidad!5e0!3m2!1ses!2sar!4v1724072415633!5m2!1ses!2sar"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación de la universidad"
        />
      </div>
    </div>
  );
};

export default Contamos;
