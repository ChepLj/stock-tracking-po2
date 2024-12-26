//TODO: Search Stock

export const handleInboundShowTableSearch = (input: any, header: any, data: any, materialList: any) => {
  const material = input[header.material];
  const stock = input[header.sLoc];
  const condition1 = Boolean(input[header.unit]);
  const condition2 = Boolean(material?.toString().length == 9);
  const condition3 = Boolean((Number(input?.[header.quantity]) || 0) + (Number(input?.[header.quantity2]) || 0));
  const condition4 = Boolean(input[header.date]);
  let descriptionWarningMessenger = "";
  let unitWarningMessenger = "";
  let isDescriptionDiff = false;
  let isUnitDiff = false;
  if (material && stock && condition1 && condition2 && condition3 && condition4) {
    const key = `${material}-${stock}`;

    if (data[key]) {
      if (data[key].description !== input?.[header.description]) {
        descriptionWarningMessenger = `Tên Vật tư " ${input?.[header.description]} " khác với tên trong Stock. Sẽ lấy tên trong Stock !`;
        isDescriptionDiff = true;
      } else {
        descriptionWarningMessenger = "";
        isDescriptionDiff = false;
      }
      if ( data[key].unit && data[key].unit !== input?.[header.unit]  ) {
        
        unitWarningMessenger = `Đơn vị " ${input?.[header.unit]} " khác với đơn vị trong Stock. Sẽ lấy đơn vị  trong Stock !`;
        isUnitDiff = true;
      } else {
        unitWarningMessenger = "";
        isUnitDiff = false;
      }
      return {
        type: "found in stock",
        color: "",
        isOk: true,
        descriptionMessenger: descriptionWarningMessenger,
        unitMessenger: unitWarningMessenger,
        descriptionRaw: data[key].description,
        unitRaw: data[key].unit ? data[key].unit :  input?.[header.unit],
        isDescriptionDiff: isDescriptionDiff,
        isUnitDiff: isUnitDiff,
        quantityInStock: data[key].quantity
      };
    } else if (materialList[material]) {
      if (materialList[material].description !== input?.[header.description]) {
        descriptionWarningMessenger = `Tên Vật tư " ${input?.[header.description]} " khác với tên trong Database. Sẽ lấy tên trong Database !`;
        isDescriptionDiff = true;
      } else {
        descriptionWarningMessenger = "";
        isDescriptionDiff = false;
      }
      if (materialList[material].unit !== input?.[header.unit]) {
        unitWarningMessenger = `Đơn vị " ${input?.[header.unit]} " khác với đơn vị trong Database. Sẽ lấy đơn vị  trong Database !`;
        isUnitDiff = true;
      } else {
        unitWarningMessenger = "";
        isUnitDiff = false;
      }
      return {
        type: "found in database",
        color: "green",
        isOk: true,
        descriptionMessenger: descriptionWarningMessenger,
        unitMessenger: unitWarningMessenger,
        descriptionRaw: materialList[material].description,
        unitRaw: materialList[material].unit,
        isDescriptionDiff: isDescriptionDiff,
        isUnitDiff: isUnitDiff,
      };
    } else {
      return {
        type: "not found",
        color: "violet",
        isOk: true,
      };
    }
  } else {
    // setError("Mã Vật tư hoặc Kho là không đúng !");
    return {
      type: "error",
      color: "red",
      isOk: false,
    };
  }
};
//TODO_END: Search Stock
