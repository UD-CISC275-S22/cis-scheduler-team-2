import React from "react";
import { Plan } from "../interfaces/plan";
import { Button } from "react-bootstrap";

export function ExportCSVFile({ thePlan }: { thePlan: Plan }): JSX.Element {
    function exportFile(thePlan: Plan) {
        const toExport = { ...thePlan, coursePool: [] };
        const exportString = JSON.stringify(toExport);
        downloadBlob(
            exportString,
            `${thePlan.name}.csv`,
            "text/csv;charset=utf-8;"
        );
    }

    function downloadBlob(
        content: string,
        filename: string,
        contentType: string
    ) {
        // Create a blob
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        // Create a link to download it
        const pom = document.createElement("a");
        pom.href = url;
        pom.setAttribute("download", filename);
        pom.click();
    }

    return (
        <div>
            <Button onClick={() => exportFile(thePlan)}>Export to CSV</Button>
        </div>
    );
}
