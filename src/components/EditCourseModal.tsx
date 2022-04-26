import React from "react";
import { Modal, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { EditCourseInSemester } from "./EditCourseInSemester";

//holds the modal and brings up the AddCourseToSemester UI in a pop-up window

export function EditCourseModal({
    showModal,
    semester,
    course,
    closeModal,
    courseEditor
}: {
    showModal: boolean;
    semester: Semester;
    course: Course;
    closeModal: () => void;
    courseEditor: (oldCourse: Course, newCourse: Course, semID: string) => void;
}): JSX.Element {
    return (
        <Modal show={showModal} onHide={closeModal} animation={false}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Add Course to {semester.season} {semester.year}
                </ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <EditCourseInSemester
                    semID={semester.id}
                    course={course}
                    courseEditor={courseEditor}
                    closeModal={closeModal}
                ></EditCourseInSemester>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}
