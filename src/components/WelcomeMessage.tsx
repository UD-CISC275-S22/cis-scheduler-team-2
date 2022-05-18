import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";

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
            <Modal.Header closeButton>
                <ModalTitle>Welcome to the UD scheduling app!</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <h3>Making A Plan:</h3>
                Create a new plan on the right, then add your semesters in the
                plan viewing area on the left. Existing courses can be added to
                semesters from the pool on the left at anytime clicking on the
                name of the course and then clicking [Add to...]
                <h3>Requirement View</h3>
                Compare against a list of degree requirements in the requirement
                view, swap back and forth between the two views with the [Swap
                To...] buttons!
                <h3>Exporting and Importing</h3>
                Export your currently active plan to CSV using the [Export to
                CSV] button, which will download it onto your computer! Import
                it back in with the [Import a Plan] button, which will add it to
                your plans and make it your active plan!
            </Modal.Body>
            <Modal.Footer>
                <h2>Making a Course</h2>A new course can also be created and
                added to any semester using the add course button in the
                semester view
            </Modal.Footer>
        </Modal>
    );
}
