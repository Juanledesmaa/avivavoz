import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';

import './Modal.scss';
import donativo from '../../img/donativo_done.png';

const CustomModal = ({ modalShow, setModalShow }) => {
    return (
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        className='CustomModal'
      >
        <Modal.Header closeButton>
          <Modal.Title><h2>¡Solicitud enviada!</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            <h2>Las taquillas serán reservadas por un día. Si no se recibe el pago a través de ATH Móvil en ese período, la solicitud será cancelada. <br></br>

            <Image className='mb-5 mt-5 mr-2 ml-2' src={donativo} fluid />

¡Tu reserva ha sido enviada exitosamente! Si tienes alguna consulta adicional, puedes llamarnos al 939-484-9396</h2>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

export default CustomModal

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);