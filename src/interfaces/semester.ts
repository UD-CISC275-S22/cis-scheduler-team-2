import { Course } from "./course";

/***
 * A representation of a student's semester
 */
export interface Semester {
    // Unique id representing the semester, generated upon creation of semester
    id: string;
    //the year of the semester
    year: number;
    //the season of the semester
    season: string;
    //an array of courses listed for this semester
    classes: Course[];
    //sum total of the credits in `classes`
    credits: number;
}
