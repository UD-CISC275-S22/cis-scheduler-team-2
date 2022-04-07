import { Course } from "./course";

/***
 * A representation of a student's semester
 */
export interface Semester {
    //the id of the plan, generated upon creation
    id: number;
    //the year of the semester
    year: number;
    //the season of the semester
    season: number;
    //an array of courses listed for this semester
    classes: Course[];
    //sum total of the credits in `classes`
    credits: number;
}
