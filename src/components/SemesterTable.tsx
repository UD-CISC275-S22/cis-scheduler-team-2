import React from "react";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { ClearSemesterButton } from "./ClearSemester";
import { CourseTable } from "./CourseTable";

/** Takes in a Plan and maps the semesters in the plan to a list of semesters. Each semester gets passed
 * into a CourseTable
 */
export function SemesterTable({
    plan,
    clearSem
}: {
    plan: Plan;
    clearSem: (planID: number, semYear: number, semSeas: string) => void;
}): JSX.Element {
    return (
        <div>
            <h4>{`${plan.name}'s Semesters`}</h4>

            <ul style={{ paddingLeft: "0", listStyle: "none" }}>
                {plan.semesters.map((semester: Semester) => (
                    <li key={semester.id}>
                        <CourseTable semester={semester}></CourseTable>
                        <ClearSemesterButton
                            PlanID={plan.id}
                            thisSem={semester}
                            clearFunct={clearSem}
                        ></ClearSemesterButton>
                    </li>
                ))}
            </ul>
        </div>
    );
}
