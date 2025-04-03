import React from "react";
import { Parallax } from 'react-parallax';
import { Row, Col, Button } from 'react-bootstrap';
import samplePDF from '../../img/Politicas_A_Viva_Voz_Coaching.pdf';

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
                            <h2 className="date-text mb-4">Educación Vocal Integral</h2>
                            <h4 class="text-blk description">Nuestros talleres grupales y sesiones individuales están diseñados para todo tipo de estudiante: desde quienes dan sus primeros pasos hasta artistas profesionales. La duración es flexible según las necesidades del cliente, desde sesiones cortas hasta programas de meses en la comodidad del lugar que el cliente coordine para realizar la enseñanza.
                            </h4>

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
                            <h4 class="text-blk description">Nuestros talleres grupales y sesiones individuales están diseñados para todo tipo de estudiante: desde quienes dan sus primeros pasos hasta artistas profesionales. La duración es flexible según las necesidades del cliente, desde sesiones cortas hasta programas de meses en la comodidad del lugar que el cliente coordine para realizar la enseñanza.</h4>
                            <h2 className="date-text mb-4">¿Quieres conocer nuestras políticas de servicio? Presiona el botón de descarga a continuación.</h2>

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
