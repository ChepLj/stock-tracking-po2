//TODO: Search Stock

export const handleOutboundShowTableSearch = (input: any, header: any, data: any, materialList: any) => {
  // console.log("🚀 ~ handleOutboundShowTableSearch ~ data:", data)
  const material = input[header.material];
  const description = input[header.description];
  const unit = input[header.unit];
  const stock = input[header.sLoc];
  const quantity = (Number(input?.[header.quantity]) || 0) + (Number(input?.[header.quantity2]) || 0);
  const condition1 = Boolean(input[header.unit]);
  const condition2 = Boolean(material?.toString().length == 9);

  const condition3 = Boolean(quantity);
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
      if (data[key].unit && data[key].unit !== input?.[header.unit]) {
        unitWarningMessenger = `Đơn vị " ${input?.[header.unit]} " khác với đơn vị trong Stock. Sẽ lấy đơn vị  trong Stock !`;
        isUnitDiff = true;
      } else {
        unitWarningMessenger = "";
        isUnitDiff = false;
      }
      //! Kiểm tra số lượng
      if (data[key].quantity - quantity < 0) {
        // Số lượng xuất lớn hơn số lượng tồn kho
        return {
          type: "error",
          descriptionRaw: description,
          unitRaw: unit,
          color: "#f89807",
          isOk: false,
        };
      }
      return {
        type: "found in stock", // Thỏa điều kiện xuất
        color: "",
        isOk: true,
        descriptionMessenger: descriptionWarningMessenger,
        unitMessenger: unitWarningMessenger,
        descriptionRaw: data[key].description,
        unitRaw: data[key].unit ? data[key].unit : input?.[header.unit],
        isDescriptionDiff: isDescriptionDiff,
        isUnitDiff: isUnitDiff,
        quantityInStock: data[key].quantity,
      };
    } else { //! Không tìm thấy
      const foundItems = Object.values(data).filter((item:any) => {return item.material == material});

      return {
        type: "error",
        descriptionRaw: description,
        unitRaw: unit,
        color: "violet",
        isOk: false,
        foundItems: foundItems
      };
    }
  } else { //! Thiếu thông tin
    // setError("Mã Vật tư hoặc Kho là không đúng !");
    return {
      type: "error",
      color: "red",
      isOk: false,
      lostInfo: true,
      descriptionRaw: description,
    };
  }
};
//TODO_END: Search Stock
