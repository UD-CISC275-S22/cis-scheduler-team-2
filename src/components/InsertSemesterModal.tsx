import React, { useRef, useState } from "react";
import { Semester } from "../interfaces/semester";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
    Col,
    Form,
    Modal,
    ModalTitle,
    Overlay,
    Row,
    Tooltip
} from "react-bootstrap";

export function InsertSemesterModal({
    showModal,
    closeModal,
    addSemester
}: {
    showModal: boolean;
    closeModal: () => void;
    addSemester: (newSemester: Semester) => boolean;
}): JSX.Element {
    const [year, setYear] = useState<number>(2022);
    const [season, setSeason] = useState<string>("Fall");

    const [warningMessage, setWarningMessage] = useState<boolean>(false);

    const target = useRef(null);

    /**
     * Passes a new semester into the addSemester function and closes the modal view
     */
    function saveChanges() {
        if (
            addSemester({
                id: uuidv4(),
                year: year,
                season: season,
                classes: [],
                credits: 0
            })
        ) {
            closeModal();
        } else {
            setWarningMessage(!warningMessage);
        }
    }

    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <Modal.Header closeButton>
                <ModalTitle>Add Semester</ModalTitle>
            </Modal.Header>
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
                            data-testid="add_semester_year"
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
                            data-testid="add_semester_season"
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
                <Button
                    ref={target}
                    variant="primary"
                    onClick={saveChanges}
                    data-testid="save_semester"
                >
                    Save Changes
                </Button>
                <Overlay
                    placement="right"
                    target={target.current}
                    show={warningMessage}
                >
                    <Tooltip show={warningMessage}>
                        Semester with this year and season already exists
                    </Tooltip>
                </Overlay>
            </Modal.Footer>
        </Modal>
    );
}
