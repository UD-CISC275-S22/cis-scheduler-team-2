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
});

describe("Adding and removing semester tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("User can add a semester", () => {
        const closeButton = screen.getByRole("button", { name: /close/i });
        closeButton.click();
        const addSemester = screen.getByTestId("add_semester_button");
        expect(screen.getByText("Semester: Fall 2022")).not.toBeInTheDocument();
        addSemester.click();
        const saveSemester = screen.getByTestId("save_semester");
        //const typeSemesterYear = screen.getByTestId("add_semester_year");
        //const semesterSeason = screen.getByTestId("add_semester_season");
        //userEvent.type(typeSemesterYear, "1900");
        saveSemester.click();
        expect(screen.getByText("Semester: Fall 2022")).toBeInTheDocument();
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
