export default function excelDateToMonthYear(excelDate: number) {
    // Convert Excel date to JavaScript date
    const excelEpoch = new Date(1900, 0, 1);
    const jsDate = new Date(excelEpoch.getTime() + (+excelDate -1) * 24 * 60 * 60 * 1000);

    // Extract numeric month and year
    const month = jsDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const year = jsDate.getFullYear();
    const date = jsDate.getDate()

    return [month, year]; // Return as an array
}


