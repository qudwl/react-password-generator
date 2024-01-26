export const simplePasswordGen = (
  upper: boolean,
  lower: boolean,
  number: boolean,
  special: boolean,
  length: number
): string => {
  let result: string = "";
  let usableChars: Array<string> = [];

  if (upper) usableChars.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (lower) usableChars.push(..."abcdefghijklmnopqrstuvwxyz");
  if (number) usableChars.push(..."0123456789");
  if (special) usableChars.push(..."!@#$%-?");

  if (usableChars.length === 0) return "Please select at least one option.";
  for (let i = 0; i < length; i++) {
    result += usableChars[Math.floor(Math.random() * usableChars.length)];
  }

  return result;
};
