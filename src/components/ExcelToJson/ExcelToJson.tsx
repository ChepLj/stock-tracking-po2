import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Define the structure of the data you're expecting
interface Item {

  description: string;

  unit: string;

}

  // Add more fields as necessary based on your Excel structure


const ExcelToJson  = () => {
  const [excelData, setExcelData] = useState<Item[] | null>(null);


  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });


        // You can adjust this part to work with your specific format
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData: Item[] = XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Export data as JSON file
  const handleExportJson = () => {
    if (excelData) {
      const formattedData = formatData(excelData); // Your custom formatting logic
      const jsonBlob = new Blob([JSON.stringify(formattedData, null, 2)], { type: "application/json" });
      saveAs(jsonBlob, "data.json");
    }
  };

  // Custom format function
  const formatData = (data:any) => {
  
    const object: { [key: string]: Item } = {}
    for(const currentValue of data){
      const key = `${currentValue.Material}` 
      object[key] = {
        
        description: currentValue.Description,
        unit: currentValue.Unit,
       
      }
    }
   

    return object
    };


  return (
    <div>
      <h1>Excel to JSON Converter</h1>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button onClick={handleExportJson} disabled={!excelData}>
        Export to JSON
      </button>
    </div>
  );
};

export default ExcelToJson;
