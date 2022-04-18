import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { AddCourseToSemester } from "./AddCourseToSemester";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

//holds the modal and brings up the AddCourseToSemester UI in a pop-up window

export function AddCourseModal({
    showModal,
    semester,
    closeModal,
    courseAdder
}: {
    showModal: boolean;
    semester: Semester;
    closeModal: () => void;
    courseAdder: (newCourse: Course, semID: string) => void;
}): JSX.Element {
    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Add Course to {semester.season} {semester.year}
                </ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <AddCourseToSemester
                    semID={semester.id}
                    courseAdder={courseAdder}
                    closeModal={closeModal}
                ></AddCourseToSemester>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}
