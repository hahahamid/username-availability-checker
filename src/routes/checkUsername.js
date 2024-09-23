const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const BloomFilter = require("../filters/BloomFilter");
const redisClient = require("../utils/redisClient");

const initializeBloomFilter = () => {
  const usernamesPath = path.join(__dirname, "../data/usernames_large.json");
  const usernames = JSON.parse(fs.readFileSync(usernamesPath, "utf8"));

  const numberOfItems = usernames.length;
  const falsePositiveRate = 0.01;

  const size = Math.ceil(
    -(numberOfItems * Math.log(falsePositiveRate)) / Math.pow(Math.log(2), 2)
  );
  const hashCount = Math.ceil((size / numberOfItems) * Math.log(2));

  console.log(
    `Initializing Bloom Filter with size: ${size}, hashCount: ${hashCount}`
  );

  const bloom = new BloomFilter(size, hashCount);

  usernames.forEach((username) => bloom.add(username));

  return bloom;
};

const bloomFilter = initializeBloomFilter();

const isUsernameInDatabase = (username) => {
  const usernamesPath = path.join(__dirname, "../data/usernames_large.json");
  const usernames = JSON.parse(fs.readFileSync(usernamesPath, "utf8"));
  return usernames.includes(username);
};

router.get("/check-username", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username query parameter is required." });
  }

  const cacheKey = `username:${username.toLowerCase()}`;

  try {
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult !== null) {
      const parsedResult = JSON.parse(cachedResult);
      console.log(`Cache hit for username: ${username}`);
      return res.json(parsedResult);
    }

    console.log(
      `Cache miss for username: ${username}. Checking Bloom Filter...`
    );

    if (bloomFilter.has(username)) {
      const exists = isUsernameInDatabase(username);
      if (exists) {
        const response = { available: false, message: "Username is taken." };
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
        return res.json(response);
      } else {
        const response = { available: true, message: "Username is available." };
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
        return res.json(response);
      }
    } else {
      const response = { available: true, message: "Username is available." };
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
      return res.json(response);
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
