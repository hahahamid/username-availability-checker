const crypto = require("crypto");
const { getHashIndices } = require("../utils/hashFunctions");

class BloomFilter {
  constructor(size = 1000, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = Buffer.alloc(Math.ceil(size / 8), 0);
  }

  add(item) {
    const indices = getHashIndices(item, this.size, this.hashCount);
    indices.forEach((index) => {
      const byte = Math.floor(index / 8);
      const bit = index % 8;
      this.bitArray[byte] |= 1 << bit;
    });
  }

  has(item) {
    const indices = getHashIndices(item, this.size, this.hashCount);
    return indices.every((index) => {
      const byte = Math.floor(index / 8);
      const bit = index % 8;
      return (this.bitArray[byte] & (1 << bit)) !== 0;
    });
  }

  toJSON() {
    return {
      size: this.size,
      hashCount: this.hashCount,
      bitArray: this.bitArray.toString("hex"),
    };
  }

  static fromJSON(json) {
    const bloom = new BloomFilter(json.size, json.hashCount);
    bloom.bitArray = Buffer.from(json.bitArray, "hex");
    return bloom;
  }
}

module.exports = BloomFilter;
