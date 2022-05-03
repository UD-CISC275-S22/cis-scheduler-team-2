export function parsePrereq(reqs: string): string[] {
    const rExp = /[A-Z][A-Z][A-Z][A-Z] [0-9][0-9][0-9]/g;
    //const optional = /[0-9][0-9][0-9] or/g;
    const reqsLocation = reqs.match(rExp);
    if (reqsLocation !== null) {
        const remSpace = reqsLocation.map((aReq: string): string =>
            aReq.replace(" ", "")
        );
        return remSpace;
        /*
        const hasOpt = reqs.match(optional);
        if (optional !== null) {
        } else {
            return remSpace;
        }
        */
    }
    return [];
}
