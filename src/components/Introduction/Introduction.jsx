import React from "react";
import { Parallax } from 'react-parallax';
import { Row, Col, Button } from 'react-bootstrap';
import samplePDF from '../../img/politicas_a_viva_voz_final_compressed.pdf';

//include images into your bundle
import './Introduction.scss';
import background from "../../img/parallax_red.jpg";

//create your first component
const Introduction = () => (
    <div className="introduction">
        <Parallax blur={{ min: -15, max: 20 }} bgImage={background} bgImageAlt="the cat" strength={-500} className="bg-banner">
            <section className="d-flex align-items-center mb-0 position-relative">
                <div class="responsive-container-block bigContainer">
                    <div class="responsive-container-block Container bottomContainer">
                        <div class="allText bottomText">
                            <div className='col-md-12 section-title'>
                                <h2>SERVICIOS</h2>
                            </div>

                            <div className='col-md-12 section-title'>
                                <h2><span className="last-word smaller">Modalidades presenciales o virtuales:</span></h2>
                            </div>
                            <Row>
                                {/* Column 1 */}
                                <Col xs={12} md={12} lg={6} xl={4}>
                                    <h4 className="sub-title">Sesiones individuales</h4>
                                </Col>

                                {/* Column 2 */}
                                <Col xs={12} md={12} lg={6} xl={4}>
                                    <h4 className="sub-title">Talleres grupales</h4>
                                </Col>

                                {/* Column 3 */}
                                <Col xs={12} md={12} lg={6} xl={4}>
                                    <h4 className="sub-title">Técnicas de Oratoria</h4>
                                </Col>

                                {/* Column 4 */}
                                <Col xs={12} md={12} lg={6} xl={12}>
                                    <h4 className="sub-title">Preparación para audiciones</h4>
                                </Col>
                                {/* Column 5 */}
                                <Col xs={12} md={12} lg={6} xl={12}>
                                    <h4 className="sub-title">Preparación para presentaciones musicales.</h4>
                                </Col>
                                {/* Column 6 */}
                                <Col xs={12} md={12} lg={6} xl={12}>
                                    <h4 className="sub-title">Preparación para conferencistas.</h4>
                                </Col>
                            </Row>
                            <div className='col-md-12 section-title'>
                                <h2>COACHING KIDS</h2>
                            </div>
                            <h2 className="date-text gold mb-4">Entrenando Voces desde la Niñez</h2>
                            <h4 class="text-blk description">Nuestro programa <strong>A Viva Voz Coaching Kids</strong> es una experiencia grupal clasificada como taller educativo de 5 horas diseñado para niños de 8 a 11 años. Se producen espacios con información y practica en un ambiente divertido, seguro e interactivo. Los niños aprenden a usar su voz de manera saludable mientras desarrollan habilidades escénicas, mediante las destrezas del canto y la oratoria.</h4>

                            <h3 className="date-text mb-4">Eventos A Viva Voz Coaching Kids pueden incluir:
                            </h3>
                            <div className="includes">

                                <Row className="align-items-left">
                                    {/* Column 1 */}
                                    <Col xs={{ span: 10, offset: 1 }}
                                        md={{ span: 10, offset: 1 }}
                                        lg={{ span: 10, offset: 1 }}
                                        xl={{ span: 10, offset: 1 }}>
                                        <h4 class="text-blk description">Merienda</h4>
                                        <h4 class="text-blk description">Almuerzo</h4>
                                        <h4 class="text-blk description">Materiales educativos</h4>
                                        <h4 class="text-blk description">Presencia y Participación indirecta de padre/ madre o tutor</h4>
                                        <h4 class="text-blk description">Desarrollo y practica en temas dirigido a niños como:</h4>
                                        <ul>
                                            <li>• Manejo del instrumento / postura para cantar</li>
                                            <li>• Ejercicios de afinación</li>
                                            <li>• Técnicas para voz hablada y cantada</li>
                                            <li>• Manejo del micrófono</li>
                                            <li>• Presencia escénica</li>
                                            <li>• Cuidados de la voz</li>
                                            <li>• Comprendiendo los cambios en la voz según la edad</li>
                                        </ul>
                                        <h4 class="text-blk description">Desarrollo y practica en temas dirigido a niños como:</h4>
                                        <ul className="text-align-left">
                                            <li>• Enseñar a los niños a cómo cuidar y manejar su voz desde la infancia para no lastimarse a modo preventivo.</li>
                                            <li>• Promover autoestima y autoconfianza.</li>
                                            <li>• Fortalecer la comunicación y el nivel de atención desde edad temprana.</li>
                                            <li>• Promover el explorar la voz, descubriendo el potencial en cada niño.</li>
                                        </ul>
                                        <h4 class="text-blk description">¿Te interesa asistir a nuestro evento <strong>Coaching Kids</strong>?:</h4>
                                        <div className="mb-4"></div>
                                        <a href="https://buytickets.at/avivavozcoaching" target="_blank" rel="noopener noreferrer">
                                            Haz clic aquí para adquirir tus entradas.
                                        </a>


                                    </Col>

                                </Row>

                            </div>

                            <h2 className="date-text mb-2 mt-4">Descarga nuestras políticas de servicio.</h2>

                            <div className="pdf-container">
                                <div className="button-container">
                                    <Row className="justify-content-center">
                                        <Col xs={10} sm={12} lg={12} xl={12} className="text-center">
                                            <Button variant="primary" size="sm" block className="d-flex align-items-center justify-content-center">
                                                <a href={samplePDF} download>Descargar PDF</a>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </Parallax>

    </div>
);

export default Introduction;
