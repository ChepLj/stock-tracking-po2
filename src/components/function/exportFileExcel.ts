import { utils, writeFileXLSX } from "xlsx";

//TODO: handle export fix
/* get live table and export to XLSX */
const exportFileFix = () => {
  const tableViewStyle = document.getElementById("tableViewStyle");
  const elt = tableViewStyle!.getElementsByTagName("TABLE")[0];
  const wb = utils.table_to_book(elt);
  const date = new Date();
  writeFileXLSX(wb, `ManagerEquipment-${date.toDateString()}.xlsx`);
};

//TODO_END: handle export fix
//TODO: handle export raw
/* get state data and export to XLSX */
const exportFileRaw = ( data: any,keyOfDataRaw: string[] ) => {
    const newData4Sheet = keyOfDataRaw.map((crr, index)=>{
        const dataTemp = data[crr]
        return {
            No: index + 1,
            Id: dataTemp.id,
            Code: dataTemp.code,
            Name: dataTemp.title,
            Author: dataTemp.author,
            Stock: JSON.stringify(dataTemp.store),
            Description: dataTemp.description,
            Note: dataTemp.note,
            Date: dataTemp.dateCreated,
            Logs: JSON.stringify(dataTemp.logs),
            Avatar: JSON.stringify(dataTemp.icon),
            Images: JSON.stringify(dataTemp.images),
            Attachments: JSON.stringify(dataTemp.attachments),
        }
    })

  const ws = utils.json_to_sheet(newData4Sheet);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  const date = new Date();
  writeFileXLSX(wb, `ManagerEquipment-${date.toDateString()}.xlsx`);
};
//TODO_END: handle export raw
//! export
export { exportFileFix, exportFileRaw };

