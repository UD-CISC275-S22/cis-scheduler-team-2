import React, { useState } from "react";
import "./App.css";
import { Plan } from "./interfaces/plan";
import { samplePlan } from "./interfaces/placeholderPlan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { AppViewer } from "./components/AppViewer";
import { flattenedPool } from "./components/AddNewPlan";
//"Add semester" button test id: add_semester_button

function App(): JSX.Element {
    //this is the state containing the list of plans
    const [planList, updatePlans] = useState<Plan[]>([samplePlan]);
    //state to hold the active plan
    const [activePlan, setActivePlan] = useState<Plan>(planList[0]);

    // State that handles add semester modal
    const [showModal, setShowModal] = useState<boolean>(false);

    // State that handles welcome message modal
    const [showWelcome, setShowWelcome] = useState<boolean>(true);

    function addPlan(newPlan: Plan) {
        //Passed to AddNewPlan, adds the new plan to the end of planList array
        const fixId = {
            ...newPlan,
            id: planList[planList.length - 1].id + 1,
            semesters: [...newPlan.semesters]
        };
        setActivePlan(fixId);
        updatePlans([...planList, fixId]);
    }

    function deletePlan() {
        //Passed to DeletePlanButton, deletes the ACTIVE plan from planList
        const newList = planList.filter(
            (aPlan: Plan): boolean => aPlan.name !== activePlan.name
        );
        updatePlans(newList);
        setActivePlan(newList[0]);
    }

    /**
     * Function that takes all of the courses from a given semester and places them in the course pool.
     *
     * @param semesterId The ID of the semester that contains the courses to be moved
     */
    function clearSemester(semesterId: string) {
        // Getting the semester that will have its courses moved to the pool.
        const currentSemester = activePlan.semesters.filter(
            (semester: Semester) => semester.id === semesterId
        );
        // Getting the courses from the semester that is having its courses moved.
        const semestersCourses: Course[] = currentSemester[0].classes.map(
            (course: Course) => course
        );
        /** Course pool that the semesters courses will get added to */
        let modifiedCoursePool: Course[] = [...activePlan.coursePool];
        // Adding each course to the new course pool
        semestersCourses.map((course: Course) => {
            modifiedCoursePool = [course, ...modifiedCoursePool];
        });
        // Removing all the courses from the semester's classes array
        const updatedSemester: Semester = {
            ...currentSemester[0],
            classes: []
        };
        /** Fixed semester array that replaces the current semester with the updated semester */
        const fixedSemesters = activePlan.semesters.map((semester: Semester) =>
            semester.id === currentSemester[0].id ? updatedSemester : semester
        );
        /** Plan that contains the updated semesters array and the updated course pool */
        const fixedPlan: Plan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: fixedSemesters,
            coursePool: [...modifiedCoursePool],
            originalCoursePool: activePlan.originalCoursePool,
            activeFilters: activePlan.activeFilters,
            currentDeptFilter: activePlan.currentDeptFilter,
            degree: activePlan.degree,
            filledRequirements: []
        };
        fixedPlan.filledRequirements = getAllRequirements(fixedPlan);
        /** Array of plans that replaces the current active plan with the fixed plan */
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        // Setting the state to reflect the changes
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    function addCourse(newCourse: Course, semID: string) {
        //adds a new Course to the active plan, given a specified semester to insert to, and the details of the course
        //passed to AddSourceToSemester component
        const actPlan = activePlan;
        const actSems = actPlan.semesters.filter(
            (aSem: Semester): boolean => aSem.id === semID
        );
        if (actSems.length >= 1) {
            actSems[0].classes = [...actSems[0].classes, newCourse];
            actSems[0].credits += newCourse.credits;
            const replaceSem = actPlan.semesters.map(
                (aSem: Semester): Semester =>
                    aSem.id === semID ? { ...actSems[0] } : { ...aSem }
            );
            actPlan.semesters = replaceSem;
            actPlan.filledRequirements = getAllRequirements(actPlan);
            const fixedList = planList.map(
                (aPlan: Plan): Plan =>
                    aPlan.id === actPlan.id ? { ...actPlan } : { ...aPlan }
            );
            setActivePlan(actPlan);
            updatePlans(fixedList);
            return true;
        }
    }

    function editCourse(courseID: string, newCourse: Course, semID: string) {
        const actPlan = activePlan;
        const getSem = actPlan.semesters.filter(
            (aSem: Semester): boolean => aSem.id === semID
        );
        const fixCourse = getSem[0].classes.map(
            (aCourse: Course): Course =>
                aCourse.courseId === courseID
                    ? { ...newCourse }
                    : { ...aCourse }
        );
        getSem[0] = { ...getSem[0], classes: fixCourse };
        const fixPlan = {
            ...activePlan,
            semesters: activePlan.semesters.map(
                (aSem: Semester): Semester =>
                    aSem.id === semID ? { ...getSem[0] } : { ...aSem }
            )
        };
        fixPlan.filledRequirements = getAllRequirements(fixPlan);
        const fixedList = planList.map(
            (aPlan: Plan): Plan =>
                aPlan.id === fixPlan.id ? { ...fixPlan } : { ...aPlan }
        );
        setActivePlan(fixPlan);
        updatePlans(fixedList);
    }

    // Opens and closes the insertSemester modal view
    const handleShowInsertSemesterModal = () => setShowModal(true);
    const handleCloseInsertSemesterModal = () => setShowModal(false);

    // Opens and closes the welcome message modal view
    const handleShowWelcomeModal = () => setShowWelcome(true);
    const handleCloseWelcomeModal = () => setShowWelcome(false);

    /**
     * Adds a new semester to the currently selected plan
     *
     * @param newSemester The semester that will be added to the plan
     */
    function addSemester(newSemester: Semester): boolean {
        // Checking if the new semester already exists
        const existing = activePlan.semesters.find(
            (semester: Semester): boolean => semester.id === newSemester.id
        );
        const existsByTerm = activePlan.semesters.find(
            (semester: Semester): boolean =>
                semester.year === newSemester.year &&
                semester.season === newSemester.season
        );
        // If the semester doesn't exist, crete a new plan with an updated semesters array
        if (existing === undefined && existsByTerm === undefined) {
            const fixedPlan = {
                id: activePlan.id,
                name: activePlan.name,
                semesters: [...activePlan.semesters, newSemester],
                coursePool: activePlan.coursePool,
                originalCoursePool: activePlan.originalCoursePool,
                activeFilters: activePlan.activeFilters,
                currentDeptFilter: activePlan.currentDeptFilter,
                degree: activePlan.degree,
                filledRequirements: [""]
            };
            fixedPlan.filledRequirements = getAllRequirements(fixedPlan);
            // Creating a list that replaces the active plan with the fixed plan
            const fixedPlanList = planList.map((plan: Plan) =>
                plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
            );
            // Updating the active plan and the plan list to both contain the updated plan that contains the new semester
            setActivePlan(fixedPlan);
            updatePlans(fixedPlanList);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Removes a given semester from the currently active plan.
     *
     * @param semesterId The id of the semester to be deleted
     */
    function deleteSemester(semesterId: string) {
        // Creating a new plan with an updated semesters array that contains every plan besides the one being removed
        const fixedPlan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: activePlan.semesters.filter(
                (semester: Semester): boolean => semester.id !== semesterId
            ),
            coursePool: activePlan.coursePool,
            originalCoursePool: activePlan.originalCoursePool,
            activeFilters: activePlan.activeFilters,
            currentDeptFilter: activePlan.currentDeptFilter,
            degree: activePlan.degree,
            filledRequirements: [""]
        };
        fixedPlan.filledRequirements = getAllRequirements(fixedPlan);
        // Creating a list of plans that replaces the active plan with the updated plan
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        // Updating the active plan and plan list to both contain the updated plan with the semester removed.
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    function deleteCourse(courseID: string, semID: string) {
        //deletes the specific course from the active plan, properly updating Semester credits also
        const toFix = activePlan.semesters.filter(
            (aSem: Semester): boolean => aSem.id === semID
        );
        const getClass = toFix[0].classes.filter(
            (aCourse: Course): boolean => aCourse.courseId === courseID
        );
        const fixCreds =
            toFix[0].credits - getClass[0].credits * getClass.length;
        const fixCourse = toFix[0].classes.filter(
            (aCourse: Course): boolean => !(aCourse.courseId === courseID)
        );
        const fixedPlan = {
            ...activePlan,
            semesters: activePlan.semesters.map(
                (aSem: Semester): Semester =>
                    aSem.id === semID
                        ? { ...aSem, classes: fixCourse, credits: fixCreds }
                        : { ...aSem }
            )
        };
        fixedPlan.filledRequirements = getAllRequirements(fixedPlan);
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    /**
     * Moves a course from one semester to another (as long as they aren't the same semester)
     *
     * @param courseToMove The course object that will be relocated
     * @param fromSemester The semester that currently contains the to-be-relocated course
     * @param toSemester The semester that the course will be relocated to
     */
    function moveCourse(
        courseToMove: Course,
        fromSemester: Semester,
        toSemester: Semester
    ) {
        // As long as the course isn't being moved to the same semester, move it
        if (toSemester !== fromSemester) {
            addCourse(courseToMove, toSemester.id);
            deleteCourse(courseToMove.courseId, fromSemester.id);
        }
    }

    /**
     * Moves a course from the course pool to the selected semester & removes it from the course pool
     *
     * @param courseToMove The course that will be added to the chosen semester
     * @param toSemester The semester that will have the course added
     */
    function moveCourseFromPool(courseToMove: Course, toSemester: Semester) {
        addCourse(courseToMove, toSemester.id);
        deleteCourseFromPool(courseToMove);
    }

    /**
     * Removes a specified course from the course pool
     *
     * @param courseToDelete The course that will be removed from the course pool
     */
    function deleteCourseFromPool(courseToDelete: Course) {
        // Creating a new course pool without the specified course
        const newCoursePool = activePlan.coursePool.filter(
            (course: Course) => course.title !== courseToDelete.title
        );
        // Creating a new plan that contains the updated course pool
        const fixedPlan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: activePlan.semesters,
            coursePool: [...newCoursePool],
            originalCoursePool: activePlan.originalCoursePool,
            activeFilters: activePlan.activeFilters,
            currentDeptFilter: activePlan.currentDeptFilter,
            degree: activePlan.degree,
            filledRequirements: getAllRequirements(activePlan)
        };
        // Creating a new plan list that contains the updated plan
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        // Updating the plan and plan list
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    /**
     * Moves a course from a semester to the course pool
     *
     * @param courseToMove The course that will be moved to the course pool
     * @param fromSemester The semester that currently contains the course being moved
     */
    function moveCourseToPool(courseToMove: Course, fromSemester: Semester) {
        const courseForPool: Course = { ...courseToMove };
        const newCoursePool = [courseForPool, ...activePlan.coursePool];
        const fixedSemester = {
            ...fromSemester,
            classes: fromSemester.classes.filter(
                (course: Course) => courseToMove.title !== course.title
            )
        };
        const fixedSemesters = activePlan.semesters.map((semester: Semester) =>
            semester.id === fromSemester.id ? fixedSemester : semester
        );

        const fixedPlan: Plan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: fixedSemesters,
            coursePool: [...newCoursePool],
            originalCoursePool: activePlan.originalCoursePool,
            activeFilters: activePlan.activeFilters,
            currentDeptFilter: activePlan.currentDeptFilter,
            filledRequirements: activePlan.filledRequirements,
            degree: activePlan.degree
        };
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }

    function filterByCourseNumber(event: React.ChangeEvent<HTMLInputElement>) {
        // Checking which filters have already been applied to the data
        let localFilterCopy: string[];
        if (activePlan.activeFilters.includes(event.target.value)) {
            localFilterCopy = activePlan.activeFilters.filter(
                (currFilter: string) => currFilter !== event.target.value
            );
        } else {
            localFilterCopy = [...activePlan.activeFilters, event.target.value];
        }

        localFilterCopy.sort(
            (a: string, b: string) => parseInt(a) - parseInt(b)
        );

        const minCourseNo = localFilterCopy.at(0);
        const maxCourseNo = localFilterCopy.at(-1);
        console.log(
            `Min course no: ${minCourseNo}, max course no: ${maxCourseNo}`
        );

        // If there are currently filters selected:
        if (localFilterCopy.length > 0) {
            // Getting the unmodified CouresPool & finding courses that meet the current filter condititons
            const originalCoursePool: Course[] = [
                ...activePlan.originalCoursePool
            ];
            const alreadyFilteredCourses: Course[][] = localFilterCopy.map(
                (courseNo: string) =>
                    originalCoursePool.filter(
                        (course: Course) =>
                            course.courseCode >= parseInt(courseNo) &&
                            course.courseCode < parseInt(courseNo) + 100 &&
                            course.department ===
                                activePlan.currentDeptFilter.toLocaleUpperCase()
                    )
            );
            console.log(alreadyFilteredCourses);

            // Merging the filtered results into one long array
            const flattenedCoursePool = alreadyFilteredCourses.flat();
            flattenedCoursePool.sort((a: Course, b: Course) => {
                if (a.department === b.department) {
                    return 0;
                } else if (a.department < b.department) {
                    return -1;
                } else {
                    return 1;
                }
            });
            const updatedCoursePool: Course[] = [...flattenedCoursePool];

            console.log(flattenedCoursePool);

            // Need a check for if there aren't currently filters applied
            // Need to make sure that when a box is unchecked (i.e., no longer in localFilterCopy) then the inverse
            //  of the filter conditions should be met

            const fixedPlan: Plan = {
                id: activePlan.id,
                name: activePlan.name,
                semesters: activePlan.semesters,
                coursePool: updatedCoursePool,
                originalCoursePool: activePlan.originalCoursePool,
                activeFilters: [...localFilterCopy],
                currentDeptFilter: activePlan.currentDeptFilter,
                degree: activePlan.degree,
                filledRequirements: activePlan.filledRequirements
            };
            const fixedPlanList = planList.map((plan: Plan) =>
                plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
            );
            console.log(`Currently applied filters: ${localFilterCopy}`);
            setActivePlan(fixedPlan);
            updatePlans(fixedPlanList);
        } else {
            // If no filters are currently selected:
            const originalCoursePool: Course[] = [
                ...activePlan.originalCoursePool
            ];
            const fixedPlan: Plan = {
                id: activePlan.id,
                name: activePlan.name,
                semesters: activePlan.semesters,
                coursePool: originalCoursePool,
                originalCoursePool: activePlan.originalCoursePool,
                activeFilters: [...localFilterCopy],
                currentDeptFilter: activePlan.currentDeptFilter,
                degree: activePlan.degree,
                filledRequirements: activePlan.filledRequirements
            };
            const fixedPlanList = planList.map((plan: Plan) =>
                plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
            );
            console.log(`Currently APPLIED filters: ${localFilterCopy}`);
            setActivePlan(fixedPlan);
            updatePlans(fixedPlanList);
        }
    }

    function filterByDeptID(event: React.ChangeEvent<HTMLSelectElement>): void {
        const deptId: string = event.target.value;
        // If no filters are currently applied:
        const originalCoursePool: Course[] = [...activePlan.coursePool];

        const updatedCoursePool: Course[] = originalCoursePool.filter(
            (course: Course) => course.department === deptId.toUpperCase()
        );
        console.log(updatedCoursePool);

        const fixedPlan: Plan = {
            id: activePlan.id,
            name: activePlan.name,
            semesters: activePlan.semesters,
            coursePool: updatedCoursePool,
            originalCoursePool: activePlan.originalCoursePool,
            activeFilters: activePlan.activeFilters,
            currentDeptFilter: deptId,
            degree: activePlan.degree,
            filledRequirements: [""]
        };
        fixedPlan.filledRequirements = getAllRequirements(fixedPlan);
        const fixedPlanList = planList.map((plan: Plan) =>
            plan.id === activePlan.id ? { ...fixedPlan } : { ...plan }
        );
        setActivePlan(fixedPlan);
        updatePlans(fixedPlanList);
    }
    function getSemesterReqs(semester: Semester): string[] {
        const basicRequirements = semester.classes.map(
            (course: Course): string =>
                course.department + course.courseCode.toString()
        );
        const specialRequirements = semester.classes.map(
            (course: Course): string => course.degreeReqsFilled.toString()
        );
        const semesterRequirements =
            basicRequirements.concat(specialRequirements);
        return semesterRequirements;
    }
    function getAllRequirements(plan: Plan): string[] {
        let allRequirements: string[] = [];
        plan.semesters.forEach(
            (semester: Semester) =>
                (allRequirements = allRequirements.concat(
                    getSemesterReqs(semester)
                ))
        );
        const filteredRequirements = allRequirements.filter(
            (string: string) => string !== ""
        );
        return filteredRequirements;
    }
    const [requirementsVisible, setRequirementsVisible] =
        useState<boolean>(false);

    function swapVisibility() {
        setRequirementsVisible(!requirementsVisible);
    }
    function importPlan(thePlan: Plan) {
        const fixPol = { ...thePlan, coursePool: flattenedPool };
        addPlan(fixPol);
        setActivePlan(fixPol);
    }
    return (
        <div>
            <AppViewer
                showWelcome={showWelcome}
                setShowWelcome={handleShowWelcomeModal}
                handleCloseWelcomeModal={handleCloseWelcomeModal}
                planList={planList}
                activePlan={activePlan}
                setActivePlan={setActivePlan}
                deletePlan={deletePlan}
                addPlan={addPlan}
                clearSemester={clearSemester}
                deleteSemester={deleteSemester}
                addCourse={addCourse}
                deleteCourse={deleteCourse}
                editCourse={editCourse}
                moveCourse={moveCourse}
                moveCourseToPool={moveCourseToPool}
                handleShowInsertSemesterModal={handleShowInsertSemesterModal}
                updatePlans={updatePlans}
                moveCourseFromPool={moveCourseFromPool}
                showModal={showModal}
                addSemester={addSemester}
                handleCloseInsertSemesterModal={handleCloseInsertSemesterModal}
                requirementsVisible={requirementsVisible}
                swapVisibility={swapVisibility}
                importPlan={importPlan}
                filterByCourseNumber={filterByCourseNumber}
                filterByDeptID={filterByDeptID}
            ></AppViewer>
        </div>
    );
}

export default App;
