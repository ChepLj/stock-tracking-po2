interface DataItem {
  description: string;
  material: string;
  quantity: string;
  price: string;
  year: string;
  month: string;
  sLoc: number | string;
}

interface GroupedData {
  [year: string]: {
    [month: string]: {
      totalQuantity: number;
      totalPrice: number;
      sLocData: {
        [sLoc: string]: {
          totalQuantity: number;
          totalPrice: number;
        };
      };
    };
  };
}

export const handelOutboundData = (data: Record<string, DataItem>, keyOfDataShow: string[]): GroupedData => {
  const groupedData: GroupedData = {};

  keyOfDataShow.forEach((crr) => {
    const item = data[crr];
    const { year, month, quantity, price, sLoc } = item;
    const totalQuantity = parseInt(quantity);
    const totalPrice = parseInt(price) * totalQuantity;

    if (!groupedData[year]) {
      groupedData[year] = {};
    }

    if (!groupedData[year][month]) {
      groupedData[year][month] = { totalQuantity: 0, totalPrice: 0, sLocData: {} };
    }

    groupedData[year][month].totalQuantity += totalQuantity;
    groupedData[year][month].totalPrice += totalPrice;

    if (!groupedData[year][month].sLocData[sLoc]) {
      groupedData[year][month].sLocData[sLoc] = {
        totalQuantity: 0,
        totalPrice: 0,
      };
    }

    groupedData[year][month].sLocData[sLoc].totalQuantity += totalQuantity;
    groupedData[year][month].sLocData[sLoc].totalPrice += totalPrice;
  });

  return groupedData;
};
