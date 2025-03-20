export const handleOutboundExcelExtract = () => {
  const tableElm = document.getElementById("outboundExcelImportShowTable");

  // Create the object
  const result: any = {};

  if (tableElm) {
    const trElmList = tableElm.querySelectorAll("tr");
    trElmList &&
      trElmList.forEach((trElm, indexTrList) => {
        // console.log("🚀 ~ trElmList.forEach ~ trElm:", trElm)
        const object: any = {};
        const checkedTempElm = trElm.querySelector(".checkInput") as HTMLInputElement;
        if (checkedTempElm.checked) {
          trElm.querySelectorAll("td").forEach((tdElm, indexTd) => {
            // console.log("🚀 ~ trElm.querySelectorAll ~ tdElm:", tdElm)
            let key = ""; // Key is the class name
            let value: any = ""; // Value is the text content
            if (tdElm.className == "forceOutboundTd") {
              const ionSelect = tdElm.querySelector("ion-select");
    
              if (ionSelect) {
                  key = 'action';
                  value = ionSelect.value;
                  //! ghi chu
                  const temp = value? value.split("-") : 'false';
                  object.quantityInStockForce = temp[1] 
                  //!
              }
        
            } else if (tdElm.className == "description") {
              const descriptionElm = tdElm.querySelector(".description");
              if (descriptionElm) {
                key = descriptionElm.className;
                value = descriptionElm!.textContent?.trim();
              }
            } else {
              key = tdElm.className;
              value = tdElm!.textContent?.replace("VNĐ", "").trim();
            }

            object[key] = value || null; // Handle empty cells
          });
          result[indexTrList + 1] = object;
        }
      });
  }

  console.log("🚀 ~ handleIOutboundExcelExtract ~ result:", result);
  return result;
};
