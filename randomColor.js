export function getRandomHexColor() {
  // Generate a random hex value for each color component
  let red = Math.floor(Math.random() * 256).toString(16);
  let green = Math.floor(Math.random() * 256).toString(16);
  let blue = Math.floor(Math.random() * 256).toString(16);

  // Ensure that each component is two digits
  red = padZero(red);
  green = padZero(green);
  blue = padZero(blue);

  // Construct the hex color code
  let hexColor = '#' + red + green + blue;

  return hexColor;
}

function padZero(str) {
  // Ensure that the string has two digits by padding with zero if needed
  return str.length === 1 ? '0' + str : str;
}
