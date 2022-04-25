import { Course } from "./course";
import { Plan } from "./plan";
import cisc from "../assets/cisc.json";

const course_keys: string[] = Object.keys(cisc.CISC);
const CISC_COURSES: Course[] = course_keys.map(function (key: string) {
    const currCourse = cisc.CISC[key as keyof typeof cisc.CISC];
    const newCourse: Course = {
        department: currCourse.code.substring(0, 4),
        courseCode: parseInt(currCourse.code.substring(5)),
        title: currCourse.name,
        credits: parseInt(currCourse.credits),
        prereqs: [currCourse.preReq],
        description: currCourse.descr
    };
    return newCourse;
});

const samplePlan: Plan = {
    name: "Sample Plan",
    id: 0,
    semesters: [
        {
            id: "0",
            season: "Fall",
            year: 2020,
            classes: [
                {
                    department: "CISC",
                    courseCode: 275,
                    title: "Introduction to Software Engineering",
                    credits: 3,
                    prereqs: ["CISC181", "CISC210"],
                    description: "Basically web development"
                },
                {
                    department: "CISC",
                    courseCode: 320,
                    title: "Introduction to Algorithms",
                    credits: 3,
                    prereqs: ["CISC181", "CISC210"],
                    description: "Computers go burr"
                }
            ],
            credits: 6
        },
        {
            id: "1",
            season: "Spring",
            year: 2020,
            classes: [
                {
                    department: "CISC",
                    courseCode: 437,
                    title: "Introduction to Database Systems",
                    credits: 3,
                    prereqs: ["CISC181", "CISC210"],
                    description: "SQL go burr"
                },
                {
                    department: "CISC",
                    courseCode: 482,
                    title: "Artificial Intelligence",
                    credits: 3,
                    prereqs: ["CISC181", "CISC210"],
                    description: "Computers be thinkin"
                }
            ],
            credits: 6
        }
    ],
    coursePool: CISC_COURSES.filter(
        (course: Course) =>
            course.courseCode !== 275 &&
            course.courseCode !== 320 &&
            course.courseCode !== 437 &&
            course.courseCode !== 482
    )
};

export { samplePlan };
