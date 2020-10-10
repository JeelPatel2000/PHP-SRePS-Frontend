import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditProductForm from "./editProductForm";

const EditProductModal = (props) => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const { show, handleClose, product } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProductForm product={product} onModalClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModal;
