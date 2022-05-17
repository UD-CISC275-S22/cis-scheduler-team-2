import React from "react";

export function DegreeViewer({
    filledRequirements,
    degreeRequirements
}: {
    filledRequirements: string[];
    degreeRequirements: string[];
}): JSX.Element {
    return (
        <div>
            {degreeRequirements.map((degreeReq: string) => (
                <li key={degreeReq}>
                    {degreeReq}{" "}
                    {filledRequirements.findIndex(
                        (filledReq: string) => filledReq === degreeReq
                    ) === -1
                        ? "Unfilled "
                        : "Filled"}
                </li>
            ))}
        </div>
    );
}
