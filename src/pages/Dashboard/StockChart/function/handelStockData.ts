import { Material, GroupedSLoc } from "../../../../interface/mainInterface";

// Function to group by sLoc and calculate subtotals
 export  const handelStockData = (data: Record<string, Material>): Record<string, GroupedSLoc>=> {
    const result: Record<string, GroupedSLoc> = {};

    Object.values(data).forEach((item) => {
      const sLoc = item.sLoc;
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const subtotal = quantity * price;

      if (!result[sLoc]) {
        result[sLoc] = {
          sLoc,
          totalQuantity: 0,
          totalPrice: 0,
          materials: [],
        };
      }

      result[sLoc].totalQuantity += quantity;
      result[sLoc].totalPrice += subtotal;
      result[sLoc].materials.push({
        material: item.material,
        description: item.description,
        quantity,
        price,
        subtotal,
        unit: item.unit,
      });
    });

    return result;
  }
