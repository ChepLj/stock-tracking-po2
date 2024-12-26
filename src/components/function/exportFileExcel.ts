import { utils, writeFileXLSX } from "xlsx";
import timestampToTime from "./timestampToTime";

//TODO: handle export object to excel

const exportObjectToExcel = (data: any) => {

  // Convert the object to a worksheet
  try {
    if (data) {
      const result = [];
      for (const key in data) {
        const objectRaw = data[key];
        const objectFix = {
          material: objectRaw.material,
          sLoc: objectRaw.sLoc,
          description: objectRaw.description,
          quantity: objectRaw.quantity,
          unit: objectRaw.unit,
          price: objectRaw.price,
          totalPrice: (Number(objectRaw.price) || 1) * Number(objectRaw.quantity),
          note: objectRaw.note,
          batch: objectRaw.batch,
          lastUpdate: timestampToTime(objectRaw.lastUpdate, "date only"),
          month: objectRaw.month,
          year: objectRaw.year,
        };
        result.push(objectFix);
      }
      const ws = utils.json_to_sheet(result);


      // // Create a workbook
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Sheet1");
      const date = new Date();
      // Write the workbook to a file
      writeFileXLSX(wb, `Pomina3 Stock Tracking-${date.toDateString()}.xlsx`);
    }
  } catch (error) {}
};

//TODO_end: handle export object to excel

//! export
export { exportObjectToExcel };
