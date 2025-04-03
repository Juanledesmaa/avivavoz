import React from "react";
import { Parallax } from 'react-parallax';
//include images into your bundle
import './IntroductionV2.scss';
import background from "../../img/parallax_red.jpg";

//create your first component
const IntroductionV2 = () => (
    <div className="introductionv2">
        <Parallax blur={{ min: -15, max: 20 }} bgImage={background} bgImageAlt="the cat" strength={-500} className="bg-banner">
            <section className="d-flex align-items-center mb-0 position-relative">
                <div class="responsive-container-block bigContainer">
                    <div class="responsive-container-block Container bottomContainer">
                        <div class="allText bottomText">
                        <div className='col-md-12 section-title'>
                                <h2>Sesiones grupales</h2>
                            </div>

                            <h4 class="text-blk description">Nuestros talleres vocales abordan integralmente el desarrollo del intérprete, incluyendo la postura corporal y facial, el uso y control del diafragma, la pronunciación al hablar y cantar, así como la interpretación vocal. Trabajamos desde el entrenamiento auditivo en distintos niveles hasta la aplicación de armonías, unísonos y resonancias. Enseñamos técnicas de vocalización y respiración tanto para el canto como para el habla, manejo del micrófono en diferentes contextos, proyección vocal y escénica, y ensayos grupales e individuales. También se exploran aspectos como la clasificación de voces, estabilidad rítmica, cuidado de la voz, apreciación musical y el equilibrio sonoro entre músicos y cantantes. Todo esto con un enfoque práctico, dinámico y adaptado a las necesidades de cada participante.
                            </h4>
                            <div className='col-md-12 section-title'>
                                <h2>Sesiones Individuales:</h2>
                            </div>
                            <h4 class="text-blk description">Coaching: entrenamiento individual durante montaje de repertorio. Este tipo de servicio suele solicitarse con el propósito de una meta específica para una presentación musical o compromiso en audiciones vocales.
Duración mínima 1 hora por sesión
Sesiones presenciales/Sesiones online a disponibilidad
                            </h4>


                            <h2 className="date-text mb-4">Técnica vocal</h2>
                            <h4 class="text-blk description">Para el desarrollo del arte del canto. Este tipo de servicio suele solicitarse con el interés de aprender a cantar y a dirigirse en público.
Duración 30 minutos o 1 hora. Esto dependerá de edad y nivel del estudiante.
Sesiones presenciales/Sesiones online a disponibilidad
                            </h4>

                        </div>
                    </div>
                </div>
            </section>

        </Parallax>

    </div>
);

export default IntroductionV2;
