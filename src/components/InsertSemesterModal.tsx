import React, { useState } from "react";
import { Semester } from "../interfaces/semester";
import { v4 as uuidv4 } from "uuid";
import { Button, Col, Form, Modal, ModalTitle, Row } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export function InsertSemesterModal({
    showModal,
    closeModal,
    addSemester
}: {
    showModal: boolean;
    closeModal: () => void;
    addSemester: (newSemester: Semester) => void;
}): JSX.Element {
    const [year, setYear] = useState<number>(2022);
    const [season, setSeason] = useState<string>("Fall");

    /**
     * Passes a new semester into the addSemester function and closes the modal view
     */
    function saveChanges() {
        addSemester({
            id: uuidv4(),
            year: year,
            season: season,
            classes: [],
            credits: 0
        });
        closeModal();
    }

    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <ModalHeader closeButton>
                <ModalTitle>Add Semester</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <Form.Group controlId="formYear" as={Row}>
                    <Form.Label column sm={3}>
                        Year:
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={year}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setYear(parseInt(event.target.value) || 0)}
                        ></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formSeason">
                    <Form.Label column sm={3}>
                        Season:
                    </Form.Label>
                    <Col>
                        <Form.Select
                            value={season}
                            onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setSeason(event.target.value)}
                        >
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Winter">Winter</option>
                            <option value="Summer">Summer</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
