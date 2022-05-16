import { Course } from "./course";
import { Semester } from "./semester";

/***
 * A representation of a student's term
 */
export interface Plan {
    /** The user-defined name of the plan */
    name: string;
    /** An array of semesters, representing all the planned semesters */
    semesters: Semester[];
    /** The id of a plan, generated upon creation  */
    id: number;
    /** Pool of courses for this plan */
    coursePool: Course[];
    /** Array of requirements, represented as strings */
    degree: string[];
}
