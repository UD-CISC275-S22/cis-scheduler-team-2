import React from "react";
import { Button } from "react-bootstrap";

export function DeleteSemesterButton({
    planId,
    semesterId,
    deleteSemester
}: {
    planId: number;
    semesterId: string;
    deleteSemester: (planId: number, semesterId: string) => void;
}): JSX.Element {
    return (
        <div>
            <Button
                variant="danger"
                onClick={() => deleteSemester(planId, semesterId)}
            >
                Delete Semester
            </Button>
        </div>
    );
}
