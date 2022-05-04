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
