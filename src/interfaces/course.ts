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
}
