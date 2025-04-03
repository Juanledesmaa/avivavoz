import React from "react";
import { Parallax } from 'react-parallax';
import background from "../../img/parallax_yellow.jpg";
import { Col, Row } from 'react-bootstrap';
import './Contact.scss';

const Contact = () => (
    <div className="contact formSection" id="formSection">
        <Parallax blur={{ min: -15, max: 15 }} bgImage={background} bgImageAlt="the cat" strength={-500} className="bg-banner">
            <div className="content-contact">

                <Row className="justify-content-center">
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <div className="content-box">
                            <h2><span className="first-word">📬 CONTÁCTANOS para brindarte</span> <span className="last-word"><br></br>estimado de nuestros servicios</span></h2>
                            <div className="flex flex-col items-left space-y-2">
                                <p>
                                    <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                                    <strong>Teléfono:</strong> <a href="tel:7873799456">787-379-9456</a>
                                </p>
                                <p>
                                    <i className="fas fa-envelope text-red-600 mr-2"></i>
                                    <strong>Correo electrónico:</strong>{" "}
                                    {/* <a href="mailto:avivavozcanta@gmail.com">avivavozcanta@gmail.com</a> */}
                                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=avivavozcanta@gmail.com&su=Consulta para servicios&body=Hola, me contactaba por ustedes de este medio para pedir un estimado de sus servicios." target="_blank" rel="noopener noreferrer">avivavozcanta@gmail.com</a>
                                    
                                </p>
                                <p>
                                    <i className="fab fa-facebook text-blue-600 mr-2"></i>
                                    <strong>Facebook:</strong>{" "}
                                    <a href="https://www.facebook.com/avivavozcoaching" target="_blank" rel="noopener noreferrer">
                                        avivavozcoaching
                                    </a>
                                </p>
                                <p>
                                    <i className="fab fa-instagram text-pink-600 mr-2"></i>
                                    <strong>Instagram:</strong>{" "}
                                    <a href="https://www.instagram.com/vivavozelcoaching" target="_blank" rel="noopener noreferrer">
                                        @vivavozelcoaching
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </Parallax>
    </div>
);

export default Contact;
