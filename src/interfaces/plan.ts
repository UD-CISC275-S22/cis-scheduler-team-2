import { Semester } from "./semester";

/***
 * A representation of a students' term
 */
export interface Plan {
    /** The user-defined name of the plan */
    name: string;
    /** An array of semesters, representing all the planned semesters */
    semesters: Semester[];
    /** The id of a plan, generated upon creation  */
    id: number;
}
