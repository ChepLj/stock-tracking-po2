export default function generateColors(count: number): { backgroundColor: string[], borderColor: string[] } {
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    
    for (let i = 0; i < count; i++) {
        const hue = (i * (360 / count)) % 360; // Spread hues evenly around the color wheel
        const isLight = i % 2 === 0;          // Alternate between light and dark
        const lightness = isLight ? 70 : 40;  // Light and dark contrast
        const background = `hsla(${hue}, 80%, ${lightness}%, 0.8)`; // Background with transparency
        const border = `hsla(${hue}, 80%, ${lightness}%, 1)`;       // Border with no transparency
      backgroundColor.push(background);
      borderColor.push(border);
    }
  
    return { backgroundColor, borderColor };
  }
  
  const { backgroundColor, borderColor } = generateColors(30);
  
  // console.log("Background Colors:", backgroundColor);
  // console.log("Border Colors:", borderColor);
  

