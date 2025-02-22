import './Cta.css'
const Cta = () => {
return (
<div className="cta-section" >
     <div className="cta-background">
          <h2>¿Estás listo para empezar a definir tu futuro?</h2>
          <p>Súmate a la creciente cantidad de personas que aprovechan nuestra página web para aclarar su futuro de manera simple, rápida y en un mismo lugar.</p>
          <button className="cta-button" onClick={() => window.location.href='/chatbot2'}>Chatear</button>
    </div>
</div>
    


);
};
export default Cta;