import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

//holds the modal and brings up the welcome message in a pop-up window

export function WelcomeMessage({
    showModal,
    closeModal
}: {
    showModal: boolean;
    closeModal: () => void;
}): JSX.Element {
    return (
        <Modal show={showModal} onHide={closeModal} animation={false} size="lg">
            <ModalHeader closeButton>
                <ModalTitle>Welcome to the UD scheduling app!</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                Create a new plan on the right, then add your semesters in the
                plan viewing area on the left. Existing courses can be added to
                added to added to added to added to semesters from the pool on
                the left at anytime clicking on the name of the course and then
                clicking [Add to...]
            </Modal.Body>
            <Modal.Footer>
                A new course can also be created and added to any semester using
                the add course button in the semester view
            </Modal.Footer>
        </Modal>
    );
}
