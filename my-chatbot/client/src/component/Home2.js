
import './Home2.css';
import RotatingText from './RotatingText';
import Clientes from './Clientes';
import Contamos from './Contamos';
import Nuestro from './Nuestro';
import Testimonios from './Testimonios';
import Cta from './Cta';
import Equipo from './Equipo';
import StickyScroller from './StickyScroller';


function Home2() {
return (
<div>
<div className="home2-section" datos-aos="fade-up">
  <div>
    <RotatingText />
  </div>
   <StickyScroller />
  <div>
    <Clientes />
  </div>
  <div>
    <Contamos />
  </div>
  <div>
    <Equipo />
  </div>
  <div>
    <Nuestro />
  </div>
  <div>
    <Testimonios />
  </div>
    <div>
    <Cta />
    </div>

</div>

</div>

);
};
export default Home2;