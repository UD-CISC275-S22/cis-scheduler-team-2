import { Plan } from "./plan";

const samplePlan: Plan = {
    name: "Sample Plan",
    id: 0,
    semesters: [
        {
            id: 0,
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
            id: 1,
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
    ]
};

export { samplePlan };
