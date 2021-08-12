module.exports = function toReadable(number) {
  // Exception guards
  if (!Number.isInteger(number)) {
    return "Passed argument should be integer";
  }

  if (number < 0) {
    return "Passed argument should be positive";
  }

  if (number === 0) {
    return "zero";
  }

  let textChunk = "";
  let textResult = "";
  let lastThreeDigits = 0;
  let lastTwoDigits = 0;
  let thousandsCount = 0;
  let hundredsCount = 0;
  let tensCount = 0;
  let unitsCount = 0;

  const padStart = (text) => (text.length > 0 ? " " : "") + text;

  const basicMapping = {
    00: "",
    01: "one",
    02: "two",
    03: "three",
    04: "four",
    05: "five",
    06: "six",
    07: "seven",
    08: "eight",
    09: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
  };

  const tensMapping = {
    2: "twenty",
    3: "thirty",
    4: "forty",
    5: "fifty",
    6: "sixty",
    7: "seventy",
    8: "eighty",
    9: "ninety"
  };

  const thousandsMapping = {
    1: "thousand",
    2: "million",
    3: "billion",
    4: "trillion"
  };

  while (number) {
    lastThreeDigits = number % 1000;
    hundredsCount = Math.floor(lastThreeDigits / 100);

    lastTwoDigits = lastThreeDigits % 100;
    tensCount = Math.floor(lastTwoDigits / 10);
    unitsCount = lastTwoDigits % 10;

    if (lastTwoDigits < 20) {
      textChunk = basicMapping[lastTwoDigits];
    } else {
      textChunk = tensMapping[tensCount] + padStart(basicMapping[unitsCount]);
    }

    if (hundredsCount > 0) {
      textChunk = `${basicMapping[hundredsCount]} hundred` + padStart(textChunk);
    }

    if (thousandsCount > 0) {
      textChunk = `${textChunk} ${thousandsMapping[thousandsCount]}`;
    }

    textResult = textChunk + padStart(textResult);
    number = Math.floor(number / 1000);
    thousandsCount++;
  }

  return textResult;
}