import React from 'react';
import Button from 'react-bootstrap/Button';
import videoDesktop from '../../img/viva_voz_desktop.mp4';
import videoMobile from '../../img/viva_voz_mobile.mp4';
import './ProgramPDF.scss';

export default function ProgramPDF({ onRequestInfo }) {
  return (

    <div className="program-pdf">
      <div id="features" className='text-center'>
        <div className='container'>
          {/* The banner CTA moves here on tablet and mobile, where overlaying it on the
              art would cover the tagline and contact pill. Hidden from 768px up, where
              the banner shows its own overlaid button. */}
          <div className="request-info-cta">
            <Button variant="primary" className="request-info-button" onClick={onRequestInfo}>
              Solicitar información
            </Button>
          </div>

          <div className='col-md-8 section-title text-center mx-auto'>
            <h2>SOBRE NOSOTROS</h2>
          </div>

          {/* Approved design "Tarjeta" (design-shotgun variant A) with feedback applied:
              autoplaying old-banner video, white rounded card on desktop; on mobile the
              card disappears and the video runs edge to edge. Same dual-source pattern
              the old hero used — landscape file from 768px up, portrait file below.
              Outside the col-md-8 column on purpose, so it can be wider than the text. */}
          <div className="video-card">
            <video
              src={videoMobile}
              className="video-mobile"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Video promocional de A Viva Voz Coaching"
            />
            <video
              src={videoDesktop}
              className="video-desktop"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Video promocional de A Viva Voz Coaching"
            />
          </div>

          <div className='col-md-8 section-title text-center mx-auto'>
            <h3>
            A Viva Voz Coaching es una corporación registrada para educar en el uso y manejo de la voz, ya sea para el canto, el habla o la oratoria. Es un método de enseñanza ofrecido a través de talleres especializados, diseñados por la profesora de canto Omayra Martínez, con el propósito de brindar herramientas y desarrollar destrezas dentro de este arte.<br/><br/>
            Nuestra empresa combina la excelencia artística con una metodología inclusiva, pedagógica y adaptada a cada etapa del desarrollo vocal.
            Nuestros talleres grupales y sesiones individuales están diseñados para todo tipo de estudiante: desde quienes dan sus primeros pasos hasta artistas profesionales.<br/><br/>

La duración es flexible según las necesidades del cliente, desde sesiones cortas hasta programas de varios meses, en la comodidad del lugar que el cliente coordine para realizar la enseñanza.<br/><br/></h3>

            <h2>Nuestra Experiencia</h2>
            <h3>Con vasta experiencia formando voces en Puerto Rico y el extranjero, ofrecemos:
Clases de canto individuales y personalizadas.
Talleres vocales intensivos para niños, jóvenes y adultos.
Entrenamiento vocal para profesionales que utilizan su voz como herramienta de trabajo.
Eventos educativos y artísticos para escuelas, iglesias y organizaciones.
</h3>
          </div>
          <div className='row'>
            <div className="pdf-container">
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}