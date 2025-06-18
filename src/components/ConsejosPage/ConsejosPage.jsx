import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import './ConsejosPage.scss';
import background from "../../img/parallax_red.jpg";
import consejosPDF from '../../img/Consejos-para-seguimiento-en-casa.pdf';

const ConsejosPage = () => {

  return (
    <div className="consejos-page">
      <Container fluid className="consejos-hero">
        <Row className="justify-content-center text-center">
          <Col xs={12} md={10} lg={8}>
            <h1 className="consejos-title">
              <span className="first-word">Fortaleciendo el taller</span><br />
              <span className="second-word">A Viva VOZ Coaching Kids</span><br />
              <span className="third-word">en CASA</span>
            </h1>
            <div className="pdf-download-section">
              <Button variant="primary" size="lg" className="download-button">
                <a href={consejosPDF} download>Puedes descargar este documento pulsando aqui</a>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Parallax blur={{ min: -5, max: 5 }} bgImage={background} bgImageAlt="background" strength={-100} className="bg-banner">
        <Container className="consejos-content">
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>
              
              <div className="responsive-container-block bigContainer">
                <div className="responsive-container-block Container bottomContainer">
                  <div className="allText bottomText">
                  
                  <div className="col-md-12 section-title">
                    <h2>Características de atención según la edad del niñ@</h2>
                  </div>
                  
                  <h4 className="text-blk description">
                    1. Niñ@s de 7 a 9 años: La atención sostenida se limita a cada (10-15 min), aprenden mejor con juegos, repetición y apoyo visual.
                    <br/><br/>
                    2. Niñ@s de 10 a 12 años: Tienen mayor capacidad de concentración cada (20-30 min), la comprensión es más profunda, pueden seguir instrucciones más complejas y mantener el foco en actividades guiadas.
                  </h4>
                  
                  <h2 className="date-text mb-4">7 a 9 años</h2>
                  
                  <h4 className="text-blk description">
                    1. Postura correcta para cantar y hablar<br/>
                    <span className="bullet-item">Enséñale a pararse como un "signo de exclamación": Espalda recta, hombros relajados un poco hacia atrás.</span>
                    <span className="bullet-item">Cabeza centralizada.</span>
                    <span className="bullet-item">Usa un espejo para practicar la postura frente a él y hazlo divertido.</span>
                    <span className="bullet-item">Juego: "¿Quién canta como un signo de exclamación? ¿Quién canta como un signo de interrogación?" Tipo "Simón dice".</span>
                    <br/>
                    
                    2. Ejercicios de respiración matutina (5 minutos)<br/>
                    <span className="bullet-item">Jugar a inflar un globo con la respiración (real o imaginario).</span>
                    <span className="bullet-item">NO SUBIR HOMBROS MIENTRAS TOMA EL AIRE.</span>
                    <span className="bullet-item">La presión de la fuerza la debe hacer el centro de su cuerpo (cerca del ombligo=diafragma).</span>
                    <span className="bullet-item">Inhalar por la boca contando 4 segundos sin levantar los hombros, mantener el aire 2 segundos, y soltarlo mientras cuenta del 1-4/1-6/1-8/1-10.</span>
                    <span className="bullet-item">Cada vez que añada conteo debe tomar aire creando un patrón.</span>
                    <br/>
                    
                    3. Desarrollo auditivo<br/>
                    <span className="bullet-item">Hacer juegos de identificar sonidos con los ojos cerrados: ¿Es un tambor? ¿un pajarito?</span>
                    <span className="bullet-item">Usar apps o juguetes musicales que tengan sonidos variados para adivinar.</span>
                    <br/>
                    
                    4. Escuchar música instrumental<br/>
                    <span className="bullet-item">Desarrolla el sentido auditivo agudo y la afinación cantada sin necesidad de impulsos fuertes en la voz.</span>
                    <span className="bullet-item">Colocar música clásica o de piano durante la merienda o antes de dormir.</span>
                    <span className="bullet-item">Si colocas música de orquesta… Preguntar: "¿Qué instrumentos escuchas?", "¿Cómo te hace sentir esta música?"</span>
                    <br/>
                    
                    5. Juegos con la voz<br/>
                    <span className="bullet-item">Hacer sonidos suaves como "shhhh".</span>
                    <span className="bullet-item">Inventar cuentos donde usen diferentes tonos de voz (grave, agudo, feliz, triste, asustado, etc.)</span>
                    <br/>
                    
                    6. Uso correcto del micrófono<br/>
                    <span className="bullet-item">Mantener una distancia adecuada: Un puño de distancia desde la boca al micrófono es suficiente.</span>
                    <span className="bullet-item">Mantener el micrófono en ángulo. El micrófono recoge caída de la onda sonora, no debe recoger la salida de la voz.</span>
                    <span className="bullet-item">Practiquen de manera divertida con cualquier objeto que simule un micrófono.</span>
                    <span className="bullet-item">Hablar con claridad y sin gritar: El micrófono amplifica la voz, no es necesario alzarla.</span>
                    <span className="bullet-item">Boca alineada con el micrófono en ángulo: Evitar que esté muy arriba o muy abajo.</span>
                  </h4>
                  
                  <h2 className="date-text mb-4">10 a 12 años</h2>
                  
                  <h4 className="text-blk description">
                    1. Postura corporal consciente<br/>
                    <span className="bullet-item">Enséñale la diferencia entre la postura de interrogación (encorvado) y exclamación (erguido).</span>
                    <span className="bullet-item">Motívales a grabarse en video y luego autoevaluarse para corregir postura al hablar o cantar.</span>
                    <br/>
                    
                    2. Respiración abdominal<br/>
                    <span className="bullet-item">Acostado boca arriba, colocar un libro liviano sobre el abdomen y practicar que suba y baje solo con la respiración.</span>
                    <span className="bullet-item">Repetirlo en las mañanas para activar cuerpo y mente.</span>
                    <br/>
                    
                    3. Entrenamiento auditivo básico<br/>
                    <span className="bullet-item">Tocar dos notas con un teclado o app y preguntar cuál es más alta o baja.</span>
                    <span className="bullet-item">Repetir ritmos con las palmas (patrón rítmico) después de escucharlos una vez.</span>
                    <br/>
                    
                    4. Escuchar y analizar<br/>
                    <span className="bullet-item">Escoger una canción por semana para analizar: ¿Cuál es el mensaje? ¿Cómo la interpreta el cantante?</span>
                    <span className="bullet-item">Fomentar que escojan música instrumental para momentos de concentración.</span>
                    <br/>
                    
                    5. Vocalización simple<br/>
                    <span className="bullet-item">Vocalizar en casa usando sonidos redondos mientras cantan o hablan sobre las silabas: "ma-me-mi-mo-mu", con buena postura.</span>
                    <span className="bullet-item">Utilizar objetos redondos táctiles, mientras entonan las silabas. Esto les hará memorizar el sonido saludable (fuera de la garganta).</span>
                    <span className="bullet-item">Usar sorbeto o pajilla para practicar emitir sonidos sin gritar.</span>
                    <br/>
                    
                    6. Uso correcto del micrófono<br/>
                    <span className="bullet-item">Control del movimiento: Mantener el micrófono fijo, puede cambiar de mano.</span>
                    <span className="bullet-item">Proyección sin esfuerzo: Hablar con energía y buena dicción, sin gritar.</span>
                    <span className="bullet-item">Saber cuándo alejarlo: En notas fuertes, alejarlo ligeramente para evitar saturación.</span>
                    <span className="bullet-item">Practiquen en casa con frases sencillas y grabaciones para reforzar la confianza.</span>
                    <span className="bullet-item">Recordar que el micrófono recoge la caída de la onda sonora, no recoge la salida. Entiéndase que el micrófono debe estar inclinado para lograr este efecto y no se escuche la voz estridente o distorsionada.</span>
                  </h4>
                  
                  <h2 className="date-text mb-4">Lo siguiente es para todos</h2>
                  
                  <div className="col-md-12 section-title">
                    <h2>Marco de Expresión - Presencia Escénica y Manejo de Nervios</h2>
                  </div>
                  
                  <h4 className="text-blk description">
                    Uno de los elementos más importantes en la formación de niños en canto y oratoria es enseñarles a sentirse cómodos y confiados al expresarse frente a otros. Aquí algunos consejos prácticos para desarrollar su marco de expresión: Realizar prácticas frente a un espejo para observar expresiones faciales y lenguaje corporal. El marco de expresión comienza en su rostro se extiende con sus manos y brazos hasta cintura, por encima de la cabeza, final del largo de sus brazos hacia el frente, arriba, lados o en ángulo. NUNCA debe bajar la expresión fuera del marco (bajo cintura). Usar juegos de roles para practicar cómo presentarse en diferentes escenarios (escuela, iglesia, presentaciones familiares). Enseñarles que el "nerviosismo" es natural y puede convertirse en energía positiva para proyectar la voz con más intención. Enséñales a moverse en pasos una vez sientan que los nervios pueden traicionarles. Respirar por boca en dirección al ombligo y dar varios pasos ayudará a canalizar la ansiedad. Fomentar que visualicen una presentación exitosa antes de hablar o cantar, reforzando la confianza en sí mismos. Incluir ejercicios de relajación, como estiramientos suaves y respiraciones profundas antes de hablar o cantar. Celebrar cada intento y participación del niño, enfocándose en su progreso, no en la perfección.
                  </h4>
                  
                  <div className="col-md-12 section-title">
                    <h2>Ejercicios Básicos de Pronunciación</h2>
                  </div>
                  
                  <h4 className="text-blk description">
                    Trabalenguas sencillos / Ejemplo: "Tres tristes tigres tragan trigo en un trigal." Repetir lentamente y luego más rápido, articulando cada palabra. Ejercicio de vocales prolongadas Pronunciar lentamente las vocales A - E - I - O - U, abriendo bien la boca (postura norte-sur) y proyectando la voz. Silabeo con voz clara Leer o repetir sílabas combinando consonantes con vocales (PA-PE-PI-PO-PU/ SA, SE SI, SO SU / TA-TE-TI-TO-TU, etc.). Ejercicio con lápiz Sostener un lápiz entre los dientes (como si fuera una sonrisa) y repetir frases claras. Esto fortalece músculos faciales y mejora articulación. Explosivos suaves Practicar sonidos P, B, T, D, K, G suavemente, pero con intención clara, proyectando cada uno hacia adelante y con impulso de aire en los labios. Inflar mejillas y pasar aire de un lado a otro Mejora el control del aire y ayuda a relajar músculos faciales. Ejercicios con palabras rimadas Jugar con palabras que rimen (pan, can, dan, ran) para reforzar ritmo, dicción y análisis. Lectura con proyección Leer en voz alta cuentos o frases cortas con intención, usando diferentes tonos de voz, expresiones faciales y emociones en la voz.
                  </h4>
                  
                  <div className="col-md-12 section-title">
                    <h2>Ejercicios de Respiración</h2>
                  </div>
                  
                  <h4 className="text-blk description">
                    1. Respiren todos juntos, es divertido y no deben competir sino, uniformar entre sí la manera de respirar. Es terapéutico. 2. Iniciar el día con respiraciones profundas ayuda a oxigenar el cuerpo y relajar el sistema nervioso. 3. Practiquen juntos la respiración diafragmática: mano en el abdomen, inhalar por boca, exhalar lentamente por la boca sobre una consonante- s/m/n/r. 4. Usen juegos con globos o burbujas para hacerlo divertido mientras aprenden a controlar el aire. RECUERDEN NO LEVANTAR HOMBROS. 5. Soplen cornetas de aire (cumpleaños). Coloquen reto de sostener la corneta desde 1 segundo hasta 4-5 segundo en un solo soplo.
                  </h4>
                  
                  <div className="col-md-12 section-title">
                    <h2>CUIDADO DE LA VOZ</h2>
                  </div>
                  
                  <h4 className="text-blk description">
                    1. Las cuerdas vocales de los niños están en desarrollo, por eso es fundamental evitar gritar. 2. Hidratación constante: el agua es el mejor aliado para una voz saludable. 3. Eviten forzar la voz cuando están enfermos o resfriados. Es mejor callar. 4. Permitanles descansos entre prácticas. 5. Praticar la proyección de la voz con buena postura y control de aire, no con esfuerzo ni tensiones de entorno. 6. Evitar gritar: enséñales que su voz es un tesoro. Si quieren llamar a alguien, pueden usar señales o acercarse, o simplemente hablar fuerte en acción de bostezo. 7. Momentos de silencio: fomentar momentos tranquilos ayuda al descanso vocal y a la reflexión. 8. No duermen con flujos de aire de frente. Puede que los flujos de aire se originen desde abanicos o desde acondicionadores de aire. 9. No duerman con cabeza mojada. NUNCA. 10. Luego de ejercicios que les hagan sudar, traten de no tomar nada escarchado. Se pueden deshidratar. NADA FRIO. Es preferible esperar a que el cuerpo baje temperaturas.
                  </h4>

                  </div>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
        
        {/* Final Message - Inside parallax, after white container */}
        <Container className="consejos-content">
          <Row className="justify-content-center">
            <Col xs={12} lg={10}>
              <div className="content-section final-message text-center">
                <div className="celebration-card">
                  <h2>🎉 ¡Celebren sus avances!</h2>
                  <p className="lead">Cada pequeño logro debe ser reconocido con palabras de afirmación</p>
                  <h3 className="highlight-text">
                    <strong>Tener voz es un privilegio</strong>
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Parallax>
    </div>
  );
};

export default ConsejosPage;