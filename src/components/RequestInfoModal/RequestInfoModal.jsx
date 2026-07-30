import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './RequestInfoModal.scss';

// Must match the hidden static form in public/index.html. Netlify detects forms by
// parsing the built HTML, so both the field names and this value have to stay in sync.
const FORM_NAME = 'vocal-journey-2027';

const VOCAL_RANGES = ['Soprano', 'Alto', 'Tenor', 'Barítono', 'Bajo'];

const EMPTY_FORM = {
  nombre: '',
  edades: '',
  email: '',
  telefono: '',
  experiencia: '',
  'conoce-registro': '',
  registro: '',
  expectativas: '',
};

const validate = (values) => {
  const errors = {};

  if (!values.nombre.trim()) {
    errors.nombre = 'Escribe tu nombre completo.';
  }

  if (!values.edades.trim()) {
    errors.edades = 'Indica la edad o las edades de los viajeros.';
  }

  if (!values.email.trim()) {
    errors.email = 'Escribe tu dirección electrónica.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Esa dirección electrónica no parece válida.';
  }

  if (!values.telefono.trim()) {
    errors.telefono = 'Escribe un teléfono de contacto.';
  } else if (values.telefono.replace(/\D/g, '').length < 10) {
    errors.telefono = 'Incluye el código de área (10 dígitos como mínimo).';
  }

  if (!values.experiencia) {
    errors.experiencia = 'Selecciona Sí o No.';
  }

  if (!values['conoce-registro']) {
    errors['conoce-registro'] = 'Selecciona Sí o No.';
  }

  // Only required when the person says they know their range.
  if (values['conoce-registro'] === 'Sí' && !values.registro) {
    errors.registro = 'Selecciona tu registro vocal.';
  }

  if (!values.expectativas.trim()) {
    errors.expectativas = 'Cuéntanos qué deseas obtener de esta experiencia.';
  }

  return errors;
};

const RequestInfoModal = ({ show, onHide }) => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');

  const knowsRange = values['conoce-registro'] === 'Sí';

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the person starts correcting it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleChange = (event) => setField(event.target.name, event.target.value);

  const handleKnowsRangeChange = (event) => {
    const value = event.target.value;
    setValues((prev) => ({
      ...prev,
      'conoce-registro': value,
      // Drop a previously picked range if they switch to "No".
      registro: value === 'Sí' ? prev.registro : '',
    }));
    setErrors((prev) => ({ ...prev, 'conoce-registro': undefined, registro: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      // Move focus to the first field with a problem.
      const firstInvalid = Object.keys(nextErrors)[0];
      const node = event.target.elements.namedItem(firstInvalid);
      if (node && typeof node.focus === 'function') {
        node.focus();
      } else if (node && node.length) {
        node[0].focus();
      }
      return;
    }

    setStatus('sending');

    const body = new URLSearchParams();
    body.append('form-name', FORM_NAME);
    Object.entries(values).forEach(([key, value]) => body.append(key, value));

    try {
      // Netlify accepts urlencoded bodies only — it does not parse JSON.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Netlify respondió ${response.status}`);
      }

      setStatus('sent');
    } catch (error) {
      // Values are intentionally kept so nobody has to retype the form.
      setStatus('error');
    }
  };

  const handleHide = () => {
    onHide();
    // Reset only after a successful send, so a failed attempt survives a reopen.
    if (status === 'sent') {
      setValues(EMPTY_FORM);
      setErrors({});
      setStatus('idle');
    }
  };

  const fieldProps = (name) => ({
    id: `vj-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    className: `vj-input${errors[name] ? ' is-invalid' : ''}`,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `vj-${name}-error` : undefined,
  });

  const fieldError = (name) =>
    errors[name] ? (
      <p className="vj-error" id={`vj-${name}-error`} role="alert">
        {errors[name]}
      </p>
    ) : null;

  // aria-invalid belongs on the group, not on each radio, so the whole set is
  // announced as invalid once rather than five times.
  const radioGroupProps = (name) => ({
    role: 'radiogroup',
    'aria-labelledby': `vj-${name}-legend`,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `vj-${name}-error` : undefined,
    className: `vj-pill-group${errors[name] ? ' is-invalid' : ''}`,
  });

  const renderRadioPills = (name, options, onChange) => (
    <div {...radioGroupProps(name)}>
      {options.map((option) => (
        <label className="vj-pill" key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={values[name] === option}
            onChange={onChange || handleChange}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  const renderYesNo = (name, onChange) => renderRadioPills(name, ['Sí', 'No'], onChange);

  return (
    <Modal
      show={show}
      onHide={handleHide}
      centered
      scrollable
      size="lg"
      backdrop="static"
      className="RequestInfoModal"
      aria-labelledby="vj-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="vj-modal-title">
          <h2>
            <span className="first-word">Solicitar</span>{' '}
            <span className="last-word">información</span>
          </h2>
          <p className="vj-subtitle">The Vocal Journey · 8 al 14 de octubre de 2027</p>
        </Modal.Title>
      </Modal.Header>

      {status === 'sent' ? (
        <>
          <Modal.Body>
            <div className="vj-success">
              <h3>🎉 ¡Solicitud enviada!</h3>
              <p>
                Gracias por tu interés en <strong>The Vocal Journey</strong>. Recibimos tu
                información y nos comunicaremos contigo pronto con todos los detalles del viaje.
              </p>
              <p className="vj-success-note">
                Si necesitas hablar con nosotros antes, llámanos al{' '}
                <a href="tel:7873799456">787-379-9456</a>.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="vj-submit" onClick={handleHide}>
              Cerrar
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Netlify needs these two to attribute the submission correctly. */}
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <p className="vj-honeypot">
            <label>
              No llenes este campo
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <Modal.Body>
            <div className="vj-field">
              <label className="vj-label" htmlFor="vj-nombre">
                Nombre completo <span className="vj-req">*</span>
              </label>
              <input type="text" autoComplete="name" {...fieldProps('nombre')} />
              {fieldError('nombre')}
            </div>

            <div className="vj-field">
              <label className="vj-label" htmlFor="vj-edades">
                Edad del viajero o edades <span className="vj-req">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej. 14 · o 9, 12 y 41"
                {...fieldProps('edades')}
              />
              {fieldError('edades')}
            </div>

            <div className="vj-field">
              <label className="vj-label" htmlFor="vj-email">
                Dirección electrónica <span className="vj-req">*</span>
              </label>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="nombre@correo.com"
                {...fieldProps('email')}
              />
              {fieldError('email')}
            </div>

            <div className="vj-field">
              <label className="vj-label" htmlFor="vj-telefono">
                Tel. contacto <span className="vj-req">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="787-000-0000"
                {...fieldProps('telefono')}
              />
              {fieldError('telefono')}
            </div>

            <p className="vj-note">
              <strong>Nota:</strong> para participar no es requisito tener experiencia musical.
              Pero nos gustaría saber lo siguiente:
            </p>

            <fieldset className="vj-field">
              <legend className="vj-label" id="vj-experiencia-legend">
                ¿Tienes experiencia musical? <span className="vj-req">*</span>
              </legend>
              {renderYesNo('experiencia')}
              {fieldError('experiencia')}
            </fieldset>

            <fieldset className="vj-field">
              <legend className="vj-label" id="vj-conoce-registro-legend">
                Si cantas, ¿conoces tu registro vocal? <span className="vj-req">*</span>
              </legend>
              {renderYesNo('conoce-registro', handleKnowsRangeChange)}
              {fieldError('conoce-registro')}
            </fieldset>

            {knowsRange && (
              <fieldset className="vj-field vj-field-reveal">
                <legend className="vj-label" id="vj-registro-legend">
                  Selecciona tu registro <span className="vj-req">*</span>
                </legend>
                {renderRadioPills('registro', VOCAL_RANGES)}
                {fieldError('registro')}
              </fieldset>
            )}

            <div className="vj-field">
              <label className="vj-label" htmlFor="vj-expectativas">
                ¿Qué deseas obtener de esta experiencia educativa y de entretenimiento?{' '}
                <span className="vj-req">*</span>
              </label>
              <textarea rows={4} {...fieldProps('expectativas')} />
              {fieldError('expectativas')}
            </div>

            {status === 'error' && (
              <div className="vj-alert" role="alert">
                No pudimos enviar tu solicitud. Verifica tu conexión e inténtalo de nuevo, o
                escríbenos a{' '}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=avivavozcanta@gmail.com&su=The Vocal Journey 2027 - Solicitud de información"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  avivavozcanta@gmail.com
                </a>
                . Tu información no se ha perdido.
              </div>
            )}

            <p className="vj-required-note">
              <span className="vj-req">*</span> Todos los campos son requeridos.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleHide} disabled={status === 'sending'}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="vj-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Enviando…</span>
                </>
              ) : (
                'Enviar solicitud'
              )}
            </Button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};

export default RequestInfoModal;
