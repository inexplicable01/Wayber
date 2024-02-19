// OpenAIResponse.js
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const OpenAIResponse = ({ isOpen, toggle, title, content,setUploadDocument  }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={()=>{toggle(); setUploadDocument(false)}}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default OpenAIResponse;
