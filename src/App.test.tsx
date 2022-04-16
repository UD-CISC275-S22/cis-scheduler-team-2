import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/CISC275/i);
    expect(linkElement).toBeInTheDocument();
});

//Example Test Suite
describe("App Testing Examples", () => {
    beforeEach(() => {
        render(<App />);
    });
    //Specific Example:
    test("User can add new plan view it delete it and return back to original starter plan", () => {
        const select = screen.getByRole("combobox");
        const newPlanEntryArr = screen.getAllByRole("textbox"); //Gets the 2 textboxes
        const newPlanButton = screen.getByTestId("new_plan_button");
        const delPlanButton = screen.getByTestId("delete_plan_button");
        userEvent.type(newPlanEntryArr[0], "new plan");
        userEvent.type(newPlanEntryArr[1], "4");
        newPlanButton.click(); //Creates the new plan
        userEvent.selectOptions(select, "new plan"); //Selects the new plan
        delPlanButton.click(); //Deletes the new plan
        expect(screen.getByText("Fall 2022")).toBeInTheDocument(); //Expects original plan's text to be in the document
    });
});

//Generic test templates, non-functional
test("The component renders template", () => {
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
