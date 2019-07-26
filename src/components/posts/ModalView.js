import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalView = ({
  title,
  body,
  modal,
  toggleModal,
  saveChange,
  onChangeText
}) => {
  return (
    <>
      <Modal show={modal} onHide={toggleModal}>
        <Form>
          <Modal.Header closeButton>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese título'
                value={title}
                name='title'
                onChange={onChangeText}
              />
            </Form.Group>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='textarea'
                placeholder='Ingrese contenido'
                rows='3'
                value={body}
                name='body'
                onChange={onChangeText}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={toggleModal}>
              Cerrar
            </Button>
            <Button variant='primary' onClick={saveChange}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalView;
