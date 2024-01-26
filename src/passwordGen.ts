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

  for (let i = 0; i < length; i++) {
    result += usableChars[Math.floor(Math.random() * usableChars.length)];
    console.log(result);
  }

  return result;
};
