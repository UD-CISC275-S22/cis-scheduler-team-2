import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { AddCourseModal } from "./AddCourseModal";

//This handles the buttons to add a course to any given semester of the active course

interface AddButtonProp {
    semester: Semester;
    courseAdder: (newCourse: Course, semID: string) => void;
}

export function AddCourseButton({
    semester,
    courseAdder
}: AddButtonProp): JSX.Element {
    //states for handling the modal window
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleShowAddCourseModal = () => setShowModal(true);
    const handleCloseAddCourseModal = () => setShowModal(false);

    return (
        <div>
            <Button onClick={handleShowAddCourseModal}>Add a New Course</Button>
            <AddCourseModal
                showModal={showModal}
                semester={semester}
                closeModal={handleCloseAddCourseModal}
                courseAdder={courseAdder}
            ></AddCourseModal>
        </div>
    );
}
