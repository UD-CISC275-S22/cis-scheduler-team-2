import { Course } from "./course";
import { Plan } from "./plan";
import cisc from "../assets/cisc.json";
import { v4 as uuidv4 } from "uuid";

const course_keys: string[] = Object.keys(cisc.CISC);
const CISC_COURSES: Course[] = course_keys.map(function (key: string) {
    const currCourse = cisc.CISC[key as keyof typeof cisc.CISC];
    const newBackupCourse: Course = {
        department: currCourse.code.substring(0, 4),
        courseCode: parseInt(currCourse.code.substring(5)),
        title: currCourse.name,
        credits: parseInt(currCourse.credits),
        prereqs: [currCourse.preReq],
        description: currCourse.descr,
        prereqsFilled: [],
        degreeReqsFilled: [],
        courseId: uuidv4()
    };
    const newCourse: Course = {
        department: currCourse.code.substring(0, 4),
        courseCode: parseInt(currCourse.code.substring(5)),
        title: currCourse.name,
        credits: parseInt(currCourse.credits),
        prereqs: [currCourse.preReq],
        description: currCourse.descr,
        prereqsFilled: [],
        degreeReqsFilled: [],
        originalData: newBackupCourse,
        courseId: newBackupCourse.courseId
    };
    return newCourse;
});

/** Array for pre-added courses */
const defaultCourses: Course[] = CISC_COURSES.filter(
    (course: Course) =>
        course.courseCode === 275 ||
        course.courseCode === 320 ||
        course.courseCode === 437 ||
        course.courseCode === 482
);

const samplePlan: Plan = {
    name: "Sample Plan",
    id: 0,
    semesters: [
        {
            id: "0",
            season: "Fall",
            year: 2020,
            classes: [defaultCourses[0], defaultCourses[1]],
            credits: 6
        },
        {
            id: "1",
            season: "Spring",
            year: 2020,
            classes: [defaultCourses[2], defaultCourses[3]],
            credits: 6
        }
    ],
    // Filtering out the courses that come in the template plan out of the course pool.
    coursePool: CISC_COURSES.filter(
        (course: Course) =>
            course.courseCode !== 275 &&
            course.courseCode !== 320 &&
            course.courseCode !== 437 &&
            course.courseCode !== 482
    )
};

export { samplePlan };
