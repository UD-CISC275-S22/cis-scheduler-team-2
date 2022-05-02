/**
 * Represents a single course
 */
export interface Course {
    /** The department the course belongs to */
    department: string;
    /** The code for the course */
    courseCode: number;
    /** The name of the course */
    title: string;
    /** The amount of credits the course is worth */
    credits: number;
    /** An Array containing DeptName-CourseCode that are prereqs of this course */
    prereqs: string[];
    /** A text description of the course */
    description: string;
    /**An Array containing DeptName-CourseCode that are the prereqs this cours fulfills */
    prereqsFilled: string[];
    /**An Array containing the College-Category that are the degree requirement(s) this course fulfills */
    degreeReqsFilled: string[];
    /**OPTIONAL: A clone of the original course data.*/
    originalData?: Course;
}
