import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostItem = ({ id, title, body, onEdit, onDelete }) => {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <div className='row d-flex align-items-center justify-content-center'>
          <Button className='m-2' variant='warning' onClick={e => onEdit(id)}>
            Editar
          </Button>
          <Button className='m-2' variant='danger' onClick={e => onDelete(id)}>
            Borrar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostItem;
