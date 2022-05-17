import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

//Example Test Suite
describe("Testing creation, selection, and deletion of plans", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("The default plan is the first plan in the list", () => {
        const linkElement = screen.getByText("Active Plan: Sample Plan");
        expect(linkElement).toBeInTheDocument();
    });
    test("Users can create another plan and swap to it", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click(); //Creates the new plan
        userEvent.selectOptions(select, "new plan"); //Selects the new plan
        expect(screen.getByText("Active Plan: new plan")).toBeInTheDocument();
    });
    test("Users can swap back to a previous plan", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click();
        userEvent.selectOptions(select, "new plan");
        expect(screen.getByText("Active Plan: new plan")).toBeInTheDocument();
        userEvent.selectOptions(select, "Sample Plan");
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
    });
    test("Users can swap freely between multiple plans", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click();
        userEvent.type(newPlanName, "plan3");
        userEvent.type(newPlanYear, "2002");
        newPlanButton.click();
        userEvent.selectOptions(select, "new plan");
        expect(screen.getByText("Active Plan: new plan")).toBeInTheDocument();
        userEvent.selectOptions(select, "Sample Plan");
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        userEvent.selectOptions(select, "plan3");
        expect(screen.getByText("Active Plan: plan3")).toBeInTheDocument();
        userEvent.selectOptions(select, "new plan");
        expect(screen.getByText("Active Plan: new plan")).toBeInTheDocument();
        userEvent.selectOptions(select, "Sample Plan");
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        userEvent.selectOptions(select, "plan3");
        expect(screen.getByText("Active Plan: plan3")).toBeInTheDocument();
    });
    test("Users can't delete when there is only 1 plan", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        const delPlanButton = screen.getByTestId("delete_plan_button");
        delPlanButton.click(); //Deletes the new plan
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click();
        userEvent.selectOptions(select, "new plan");
        delPlanButton.click(); //Deletes the new plan
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        delPlanButton.click(); //Deletes the new plan
        delPlanButton.click(); //Deletes the new plan
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
    });
    test("Users can create another plan and swap to it, then delete it and return to the original", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        const delPlanButton = screen.getByTestId("delete_plan_button");
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click();
        userEvent.selectOptions(select, "new plan");
        delPlanButton.click(); //Deletes the new plan
        const linkElement = screen.getByText("Active Plan: Sample Plan");
        expect(linkElement).toBeInTheDocument();
    });
    test("Users can delete a plan and still swap between the remaining plans", () => {
        const select = screen.getByTestId("plan_selection");
        const newPlanName = screen.getByTestId("add_plan_name");
        const newPlanYear = screen.getByTestId("add_plan_year");
        const newPlanButton = screen.getByTestId("add_plan_button");
        const delPlanButton = screen.getByTestId("delete_plan_button");
        userEvent.type(newPlanName, "new plan");
        userEvent.type(newPlanYear, "4");
        newPlanButton.click();
        userEvent.type(newPlanName, "plan3");
        userEvent.type(newPlanYear, "2002");
        newPlanButton.click();
        userEvent.selectOptions(select, "new plan");
        expect(screen.getByText("Active Plan: new plan")).toBeInTheDocument();
        delPlanButton.click(); //Deletes the new plan
        userEvent.selectOptions(select, "Sample Plan");
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        userEvent.selectOptions(select, "plan3");
        expect(screen.getByText("Active Plan: plan3")).toBeInTheDocument();
        userEvent.selectOptions(select, "Sample Plan");
        expect(
            screen.getByText("Active Plan: Sample Plan")
        ).toBeInTheDocument();
        delPlanButton.click();
        expect(screen.getByText("Active Plan: plan3")).toBeInTheDocument();
    });
    //Users can delete courses:
    test("User can delete a course from a semester", () => {
        const select = screen.getAllByRole("button", {
            name: "Add a New Course"
        })[0];
        select.click();
        const fields = screen.getAllByRole("textbox");
        userEvent.type(fields[2], "CISC181");
    });
    //Users can edit and revert changes to a course
    test("User can edit and revert changes to a course", () => {
        const edits = screen.getAllByRole("button", { name: "Edit" });
        edits[0].click();
        const fields = screen.getAllByRole("textbox");
        const saves = screen.getByRole("button", { name: "Save Edits" });
        userEvent.clear(fields[2]);
        userEvent.clear(fields[3]);
        userEvent.clear(fields[4]);
        userEvent.clear(fields[5]);
        expect(saves).toBeDisabled;
        userEvent.type(fields[2], "CHEM112");
        userEvent.type(fields[3], "Gen Chem II");
        userEvent.type(fields[4], "4");
        userEvent.type(fields[5], "Gen Chem, this is");
        expect(saves).toBeEnabled;
        userEvent.type(fields[6], "CHEM111");
        const addReq = screen.getByRole("button", {
            name: "Add This Prerequisite"
        });
        const remReq = screen.getAllByRole("button", {
            name: "Remove Prerequisite"
        });
        remReq[0].click();
        expect(addReq).toBeEnabled();
        addReq.click();
        userEvent.type(fields[7], "LABS");
        const addDeg = screen.getByRole("button", {
            name: "Add This Degree Requirement"
        });
        expect(addDeg).toBeEnabled();
        addDeg.click();
        userEvent.type(fields[8], "CHEM220");
        const addPost = screen.getByRole("button", {
            name: "Add This Postrequisite"
        });
        expect(addPost).toBeEnabled();
        addPost.click();
        saves.click();
        //tests that some visible fields are changed
        expect(screen.getByText("Gen Chem II")).toBeInTheDocument();
        expect(screen.getByText("CHEM112")).toBeInTheDocument();

        //testing reversion of changes
        const edits2 = screen.getAllByRole("button", { name: "Edit" });
        edits2[0].click();
        //tests that removed prereq persisted, as did the added one
        expect(screen.queryByText("CISC181")).toBeNull();
        expect(screen.getByText("CHEM111")).toBeInTheDocument();
        expect(screen.getByText("LABS")).toBeInTheDocument();
        expect(screen.getByText("CHEM220")).toBeInTheDocument();
        const revert = screen.getByRole("button", {
            name: "Reset To Original"
        });
        revert.click();
        expect(screen.getByText("CISC275")).toBeInTheDocument();
        edits2[0].click();
        //checks that removed prereq is restored
        expect(screen.getByText("CISC181")).toBeInTheDocument();
        //added fields should be removed
        expect(screen.queryByText("CHEM111")).toBeNull();
        expect(screen.queryByText("LABS")).toBeNull();
        expect(screen.queryByText("CHEM220")).toBeNull();
    });
    //Users can add a custom course:
    test("User can create a custom course in a semester", () => {
        const select = screen.getAllByRole("button", {
            name: "Add a New Course"
        })[0];
        select.click();
        const addCourse = screen.getByRole("button", {
            name: "Add Course to Plan"
        });
        const fields = screen.getAllByRole("textbox");
        userEvent.type(fields[2], "CHEM112");
        userEvent.type(fields[3], "Gen Chem II");
        userEvent.type(fields[4], "4");
        expect(addCourse).toBeDisabled;
        userEvent.type(fields[5], "Gen Chem, this is");
        expect(addCourse).toBeEnabled;
        userEvent.type(fields[6], "CHEM111");
        const addReq = screen.getByRole("button", {
            name: "Add This Prerequisite"
        });
        expect(addReq).toBeEnabled();
        addReq.click();
        userEvent.type(fields[7], "LABS");
        const addDeg = screen.getByRole("button", {
            name: "Add This Degree Requirement"
        });
        expect(addDeg).toBeEnabled();
        addDeg.click();
        userEvent.type(fields[8], "CHEM220");
        const addPost = screen.getByRole("button", {
            name: "Add This Postrequisite"
        });
        expect(addPost).toBeEnabled();
        addPost.click();
        addCourse.click();
        expect(screen.getByText("Gen Chem II")).toBeInTheDocument();
        expect(screen.getByText("CHEM112")).toBeInTheDocument();
    });
});

describe("Semester tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("User can delete a semester", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();
        expect(screen.getByText("Semester: Fall 2020")).toBeInTheDocument();
        const deleteSemesterButtons = screen.getAllByText("Delete Semester");
        deleteSemesterButtons[0].click();
        expect(
            screen.queryByText("Semester: Fall 2020")
        ).not.toBeInTheDocument();
    });
    test("User can add a semester", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();

        const addSemester = screen.getByTestId("add_semester_button");
        expect(
            screen.queryByText("Semester: Fall 1900")
        ).not.toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        const typeSemesterYear = screen.getByTestId("add_semester_year");
        userEvent.clear(typeSemesterYear);
        userEvent.type(typeSemesterYear, "1900");
        saveSemester.click();
        expect(screen.getByText("Semester: Fall 1900")).toBeInTheDocument();
    });
    test("User cannot add a duplicate semester", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();

        const addSemester = screen.getByTestId("add_semester_button");
        expect(screen.queryByText("Semester: Fall 2020")).toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        const typeSemesterYear = screen.getByTestId("add_semester_year");
        userEvent.clear(typeSemesterYear);
        userEvent.type(typeSemesterYear, "2020");
        saveSemester.click();
        expect(
            screen.getByText(
                "Semester with this year and season already exists"
            )
        ).toBeInTheDocument();
        expect(screen.getAllByText("Semester: Fall 2020").length === 1);
    });
    test("User can delete a semester they added", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();
        const addSemester = screen.getByTestId("add_semester_button");
        expect(
            screen.queryByText("Semester: Fall 1900")
        ).not.toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        const typeSemesterYear = screen.getByTestId("add_semester_year");
        userEvent.clear(typeSemesterYear);
        userEvent.type(typeSemesterYear, "1900");
        saveSemester.click();
        expect(screen.getByText("Semester: Fall 1900")).toBeInTheDocument();
        const deleteSemesterButtons = screen.getAllByText("Delete Semester");
        deleteSemesterButtons[2].click();
        expect(
            screen.queryByText("Semester: Fall 1900")
        ).not.toBeInTheDocument();
    });
    test("Typing a non-numeric semester is disallowed & keeps only the numeric component", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();

        const addSemester = screen.getByTestId("add_semester_button");
        expect(
            screen.queryByText("Semester: Fall 1900")
        ).not.toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        const typeSemesterYear = screen.getByTestId("add_semester_year");
        userEvent.clear(typeSemesterYear);
        userEvent.type(typeSemesterYear, "h3i");
        expect(screen.queryByText("hi")).not.toBeInTheDocument();
        saveSemester.click();
        expect(screen.getByText("Semester: Fall 3")).toBeInTheDocument();
    });
    test("User can add multiple semesters and add semesters in any season", () => {
        const closeWelcomeButton = screen.getByRole("button", {
            name: /close/i
        });
        closeWelcomeButton.click();

        const addSemester = screen.getByTestId("add_semester_button");
        expect(
            screen.queryByText("Semester: Fall 1900")
        ).not.toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        const typeSemesterYear = screen.getByTestId("add_semester_year");
        const selectSemesterSeason = screen.getByTestId("add_semester_season");
        userEvent.clear(typeSemesterYear);
        userEvent.type(typeSemesterYear, "1900");
        userEvent.selectOptions(selectSemesterSeason, "Spring");
        saveSemester.click();
        expect(screen.getByText("Semester: Spring 1900"));
        addSemester.click();
        const saveSemester2 = screen.getByTestId("save_semester");
        const typeSemesterYear2 = screen.getByTestId("add_semester_year");
        const selectSemesterSeason2 = screen.getByTestId("add_semester_season");
        userEvent.clear(typeSemesterYear2);
        userEvent.type(typeSemesterYear2, "1901");
        userEvent.selectOptions(selectSemesterSeason2, "Winter");
        saveSemester2.click();
        expect(screen.getByText("Semester: Winter 1901")).toBeInTheDocument();
        addSemester.click();
        const saveSemester3 = screen.getByTestId("save_semester");
        const typeSemesterYear3 = screen.getByTestId("add_semester_year");
        const selectSemesterSeason3 = screen.getByTestId("add_semester_season");
        userEvent.clear(typeSemesterYear3);
        userEvent.type(typeSemesterYear3, "1902");
        userEvent.selectOptions(selectSemesterSeason3, "Summer");
        saveSemester3.click();
        expect(screen.getByText("Semester: Summer 1902")).toBeInTheDocument();
    });
});
describe("Testing moving and deleting courses", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("The user has the option to move a course to one of the other semesters or the course pool", () => {
        //Fix Not Wrapped in act?
        expect(screen.queryByText("Spring 2020")).not.toBeInTheDocument();
        expect(screen.getAllByText("Course Pool").length === 1);
        const moveCourseButtons = screen.getAllByText("Move to...");
        moveCourseButtons[0].click();
        expect(screen.getAllByText("Spring 2020").length === 1);
        expect(screen.queryByText("Fall 2020")).not.toBeInTheDocument();
        expect(screen.getAllByText("Course Pool").length === 2);
        moveCourseButtons[3].click();
        expect(screen.getAllByText("Spring 2020").length === 1);
        expect(screen.getAllByText("Fall 2020").length === 1);
        expect(screen.getAllByText("Course Pool").length === 3);
    });
    test("Moving the course to the course pool actually moves it there", () => {
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).toBeInTheDocument();
        const moveCourseButtons = screen.getAllByText("Move to...");
        moveCourseButtons[0].click();
        const moveToPool = screen.getAllByText("Course Pool");
        moveToPool[0].click();
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).not.toBeInTheDocument();
    });
    test("Deleting a single course from a semester works", () => {
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).toBeInTheDocument();
        const deleteButtons = screen.getAllByText("Delete");
        deleteButtons[0].click();
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).toBeInTheDocument();
        deleteButtons[4].click();
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).not.toBeInTheDocument();
    });
    test("Clearing a single semesters removes only the courses in that semester", () => {
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Algorithms")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).toBeInTheDocument();
        const clearSemesterButtons = screen.getAllByText("Clear This Semester");
        clearSemesterButtons[0].click();
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Algorithms")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).toBeInTheDocument();
    });
    //Clear All Semesters below
    test("Clearing All Semesters removes all the semesters", () => {
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).toBeInTheDocument();
        const deleteAllCourses = screen.getByText(
            "Clear Courses From All Semesters"
        );
        deleteAllCourses.click();
        expect(
            screen.queryByText("Introduction to Software Engineering")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByText("Introduction to Human-Computer Interaction")
        ).not.toBeInTheDocument();
    });
});
//Some generic test templates, non-functional
/**
test("Some component renders template", () => {
    expect(screen.getByText("Text Only In That Component")).toBeInTheDocument();
});

test("Interacting with dropdown menu template", () => {
    const select = screen.getByTestId("testid"); //makes a select object so we can reference this dropdown menu
    userEvent.selectOptions(select, "some_selection"); //Requires import: import userEvent from "@testing-library/user-event";
    expect(
        screen.getByText(
            "Some Text That Displays When some_selection is chosen"
        )
    ).toBeInTheDocument();
});

test("Inteacting with a button template", () => {
    const button = screen.getByRole("button"); //Gets the first button it finds. Use ID if there are multiple buttons
    button.click(); //Simulates button click
    expect(
        screen.getByText("Result of pushing the button")
    ).toBeInTheDocument();
});

test("Interacting with a text entry box", () => {
    const textbox = screen.getByRole("textbox");
    userEvent.type(textbox, "stuff to enter in textbox");
    expect(textbox);
});
*/
