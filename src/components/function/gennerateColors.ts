const backgroundColor = [
  "#FF6F61", // Candy Apple Red
  "#FFB400", // Caramel Yellow
  "#FFA07A", // Peach Candy
  "#FF69B4", // Bubblegum Pink
  "#FF4500", // Orange Candy
  "#FFD700", // Lemon Drop Yellow
  "#ADFF2F", // Lime Candy
  "#32CD32", // Green Apple
  "#00FA9A", // Mint Candy
  "#7FFFD4", // Aquamarine
  "#40E0D0", // Turquoise
  "#1E90FF", // Blue Raspberry
  "#4169E1", // Royal Candy Blue
  "#8A2BE2", // Grape Candy
  "#9932CC", // Plum Candy
  "#FF00FF", // Cotton Candy
  "#FF1493", // Hot Pink Candy
  "#DC143C", // Cherry Candy
  "#800000", // Dark Chocolate Candy
  "#808000"  // Olive Candy
];

const borderCandyColors = [
  "#CC584D", // Darker Candy Apple Red
  "#CC8E00", // Darker Caramel Yellow
  "#CC805F", // Darker Peach Candy
  "#CC5591", // Darker Bubblegum Pink
  "#CC3700", // Darker Orange Candy
  "#CCAC00", // Darker Lemon Drop Yellow
  "#8EBF26", // Darker Lime Candy
  "#289828", // Darker Green Apple
  "#00C483", // Darker Mint Candy
  "#66CCB8", // Darker Aquamarine
  "#33B0A3", // Darker Turquoise
  "#1973CC", // Darker Blue Raspberry
  "#3358B5", // Darker Royal Candy Blue
  "#6C2391", // Darker Grape Candy
  "#7A28A3", // Darker Plum Candy
  "#CC00CC", // Darker Cotton Candy
  "#CC0F7A", // Darker Hot Pink Candy
  "#B01030", // Darker Cherry Candy
  "#660000", // Darker Dark Chocolate Candy
  "#666600"  // Darker Olive Candy
];




export default function generateColors(count: number) {
    // const backgroundColor: string[] = [];
    // const borderColor: string[] = [];
    
    // for (let i = 0; i < count; i++) {
    //     const hue = (i * (360 / count)) % 360; // Spread hues evenly around the color wheel
    //     const isLight = i % 2 === 0;          // Alternate between light and dark
    //     const lightness = isLight ? 70 : 40;  // Light and dark contrast
    //     const background = `hsla(${hue}, 80%, ${lightness}%, 0.8)`; // Background with transparency
    //     const border = `hsla(${hue}, 80%, ${lightness}%, 1)`;       // Border with no transparency
    //   backgroundColor.push(background);
    //   borderColor.push(border);
    // }
  
    return { backgroundColor, borderCandyColors };
  }
  
  // const { candyColors, borderCandyColors } = generateColors(30);
  
  // console.log("Background Colors:", backgroundColor);
  // console.log("Border Colors:", borderColor);
  

