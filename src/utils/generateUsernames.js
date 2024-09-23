const fs = require("fs");
const path = require("path");
const { adjectives, names } = require("./words");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function generateRealisticUsername() {
  let username = getRandomElement(adjectives) + "_" + getRandomElement(names);

  if (Math.random() < 0.7) {
    const number = getRandomInt(1, 9999);
    username += number;
  }

  return username;
}

function generateUsernames(count) {
  const usernames = new Set();
  while (usernames.size < count) {
    usernames.add(generateRealisticUsername());
  }
  return Array.from(usernames);
}

const NUMBER_OF_USERNAMES = 10000000;
const OUTPUT_FILE = path.join(__dirname, "../data/usernames_large.json");

const usernames = generateUsernames(NUMBER_OF_USERNAMES);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(usernames, null, 2), "utf8");

console.log(
  `Generated ${NUMBER_OF_USERNAMES} realistic usernames and saved to ${OUTPUT_FILE}`
);
