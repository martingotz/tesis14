import React, { useEffect, useRef } from "react";
import "./StickyScroller.css";
import Usuario from "./usuario";

const StickyScroller = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    class StickySections {
      constructor(containerElement) {
        this.container = {
          el: containerElement,
          height: 0,
          top: 0,
          bottom: 0,
        };
        this.sections = Array.from(this.container.el.querySelectorAll(".scroller-section"));
        this.viewportTop = 0;
        this.activeIndex = 0;
        this.scrollValue = 0;
        this.onScroll = this.onScroll.bind(this);
        this.initContainer = this.initContainer.bind(this);
        this.handleSections = this.handleSections.bind(this);
        this.remapValue = this.remapValue.bind(this);
        this.init();
      }

      onScroll() {
        this.handleSections();
      }

      initContainer() {
        this.container.el.style.setProperty("--stick-items", `${this.sections.length + 1}00vh`);
        this.container.el.classList.add("[&_*]:!transition-none");
        setTimeout(() => {
          this.container.el.classList.remove("[&_*]:!transition-none");
        }, 1);
      }

      handleSections() {
        this.viewportTop = window.scrollY;
        this.container.height = this.container.el.clientHeight;
        this.container.top = this.container.el.offsetTop;
        this.container.bottom = this.container.top + this.container.height;

        if (this.container.bottom <= this.viewportTop) {
          this.scrollValue = this.sections.length + 1;
        } else if (this.container.top >= this.viewportTop) {
          this.scrollValue = 0;
        } else {
          this.scrollValue = this.remapValue(
            this.viewportTop,
            this.container.top,
            this.container.bottom,
            0,
            this.sections.length + 1
          );
        }
        this.activeIndex = Math.floor(this.scrollValue) >= this.sections.length
          ? this.sections.length - 1
          : Math.floor(this.scrollValue);

        this.sections.forEach((section, i) => {
          if (i === this.activeIndex) {
            section.style.setProperty("--stick-visibility", "1");
            section.style.setProperty("--stick-scale", "1");
          } else {
            section.style.setProperty("--stick-visibility", "0");
            section.style.setProperty("--stick-scale", ".8");
          }
        });
      }

      remapValue(value, start1, end1, start2, end2) {
        const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
      }

      init() {
        this.initContainer();
        this.handleSections();
        window.addEventListener("scroll", this.onScroll);
      }
    }

    if (containerRef.current) {
      new StickySections(containerRef.current);
    }
  }, []);

  return (
    <div className="scroller-container" ref={containerRef}>
      <div className="scroller-sections">
        {[
          { id: "login", title: "Inicia Sesión", text: "Regístrate o inicia sesión para interactuar con el chatbot.", image: <Usuario /> },
          { id: "chat", title: "Chatea", text: "Conversa con el chatbot y elige la mejor opción para tu futuro.",image: <img src="./chatbot.png" alt="chatbots" className="scroller-image" /> },
          { id: "info", title: "Sección 3", text: "Más información relevante aquí.", image: <img src="./robot.jpg" alt="Info" className="scroller-image" /> },
          { id: "final", title: "Última Sección", text: "Información final aquí.", image: <img src="./hor.png" alt="Final" className="scroller-image" /> }
        ].map((item, index) => (
          <section key={item.id} className={`scroller-section ${item.id}`}>
            <div className="scroller-content">
              <div className="scroller-text">
                <h2 className="scroller-title">
                  <span>Paso #{index + 1}</span> {item.title}
                </h2>
                <p>{item.text}</p>
              </div>
              <div className="scroller-image-container">{item.image}</div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StickyScroller;
