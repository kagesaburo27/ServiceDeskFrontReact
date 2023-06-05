// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import XlsxPopulate from "xlsx-populate";

// const exportToExcel = async (data, filename) => {
//   // Create a new workbook using exceljs
//   const workbook = new ExcelJS.Workbook();

//   // Add a worksheet
//   const worksheet = workbook.addWorksheet("Sheet 1");

//   // Add the rows to the worksheet
//   worksheet.addRows(data.rows);

//   // Generate the Excel file without the chart using exceljs
//   const excelBuffer = await workbook.xlsx.writeBuffer();

//   // Load the Excel file using xlsx-populate
//   const workbookPopulated = await XlsxPopulate.fromDataAsync(excelBuffer);

//   // Get the populated worksheet
//   const worksheetPopulated = workbookPopulated.sheet("Sheet 1");

//   // Add a chart to the worksheet using xlsx-populate
//   const chart = worksheetPopulated
//     .chart("A1:F10", "bar", {
//       title: "Sample Chart",
//       showLegend: false,
//     })
//     .setPosition(10, 0, 10, 0)
//     .setTo("F15");

//   // Modify the chart as needed, e.g., set data series, axis labels, etc.
//   chart.plotarea("A1:F10").bar();

//   // Generate the final Excel file buffer using xlsx-populate
//   const excelBufferPopulated = await workbookPopulated.outputAsync();

//   // Convert the Excel buffer to a Blob
//   const blob = new Blob([excelBufferPopulated], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });

//   // Save the Excel file using FileSaver.js
//   saveAs(blob, filename);
// };

// export default exportToExcel;
