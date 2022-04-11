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
                }
            ],
            credits: 3
        }
    ]
};

export { samplePlan };
