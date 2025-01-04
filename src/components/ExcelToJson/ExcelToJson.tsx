import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IonButton, IonContent, IonPage } from "@ionic/react";

// Define the structure of the data you're expecting
interface Item {
  material: string;
  description: string;
  sLoc: string;
  quantity: number;
  unit: string;
  price: number;
  note: string;
  batch: string;
}

// Add more fields as necessary based on your Excel structure

const ExcelToJson = () => {
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
      console.log("🚀 ~ handleExportJson ~ formattedData:", formattedData);
      const jsonBlob = new Blob([JSON.stringify(formattedData, null, 2)], { type: "application/json" });
      saveAs(jsonBlob, "data.json");
    }
  };

  // Custom format function
  const formatData = (data: any) => {
    console.log("🚀 ~ formatData ~ data:", data);
    const object: { [key: string]: Item } = {};
    for (const currentValue of data) {
      const key = `${currentValue.Material}-${currentValue.SLoc}`;
      object[key] = {
        material: currentValue.Material,
        description: currentValue.Description,
        sLoc: currentValue.SLoc,
        quantity: currentValue.PominaQuantity,
        unit: "",
        price: Math.floor(+currentValue.TotalPrice / +currentValue.SAPQuantity) || 1,
        note: currentValue.Note || "",
        batch: currentValue.Batch,
      };
    }

    return object;
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>Excel to JSON Converter</h1>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <div style={{ margin: "30px",  color:'red' }}>
        <IonButton onClick={handleExportJson} disabled={!excelData} expand="block">
          Export to JSON
        </IonButton>
      </div>
    </div>
  );
};

export default ExcelToJson;
