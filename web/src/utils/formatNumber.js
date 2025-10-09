
export const toInt = (input, min = 0) => {
  const output = parseInt(input.toString());
  if (isNaN(output) || output <= min) {
    return min;
  } else {
    return output;
  }
}