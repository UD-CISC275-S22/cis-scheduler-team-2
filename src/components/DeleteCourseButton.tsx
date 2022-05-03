import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

interface DelCourseProp {
    semester: Semester;
    course: Course;
    delFunct: (courseID: string, semID: string) => void;
}

export function DeleteCourseButton({
    semester,
    course,
    delFunct
}: DelCourseProp): JSX.Element {
    //button to delete the selected course from the plan
    return (
        <div>
            <Button
                variant="danger"
                onClick={() => delFunct(course.courseId, semester.id)}
            >
                Delete
            </Button>
        </div>
    );
}
