import BigNumber from "bignumber.js";

import * as charmap from "./charmap.json"; // charmap.json is a file that contains a mapping of numbers to characters

const reverseCharMap: { [key: string]: string } = {};

// reverse the charmap
for (const key in charmap) {
  let value = charmap[key];
  reverseCharMap[value] = key;
}

BigNumber.set({
  ALPHABET: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_",
});

// this function is not done yet and is not used in the code
function instaIdToUrl(instaId: BigNumber): string {
  const id = instaId.toString(10);
  const idLength = id.length;
  const idChars = id.split("");
  const urlChars = idChars.map((char) => charmap[char]);
  const url = urlChars.join("");
  return url;
}

// this may be functional
function urlToInstaId(url: string): string {
  let id = "";
  for (let i = 0; i < url.length; i++) {
    id += reverseCharMap[url[i]];
  }
  const instaId = new BigNumber(id, 64);
  return instaId.toString(10);
}

export { instaIdToUrl, urlToInstaId };
