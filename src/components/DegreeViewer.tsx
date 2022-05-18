import React from "react";
import { Table } from "react-bootstrap";

export function DegreeViewer({
    filledRequirements,
    degreeRequirements
}: {
    filledRequirements: string[];
    degreeRequirements: string[];
}): JSX.Element {
    return (
        <Table
            striped
            bordered
            hover
            style={{
                overflowY: "scroll",
                height: "80vh",
                width: "auto",
                border: "solid",
                borderWidth: "1px",
                borderRadius: "8px",
                borderColor: "gray",
                margin: "auto"
            }}
        >
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Fulfilled?</th>
                </tr>
            </thead>
            <tbody>
                {degreeRequirements.map((degreeReq: string) => (
                    <tr key={degreeReq}>
                        <th>{degreeReq}</th>
                        <th>
                            {filledRequirements.findIndex(
                                (filledReq: string) => filledReq === degreeReq
                            ) === -1
                                ? "❌"
                                : "✅"}
                        </th>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
