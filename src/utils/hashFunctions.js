const crypto = require('crypto');

function getHashIndices(item, size, hashCount) {
  const hash1 = crypto.createHash('sha256').update(item).digest('hex');
  const hash2 = crypto.createHash('md5').update(item).digest('hex');

  const intHash1 = parseInt(hash1.substring(0, 15), 16);
  const intHash2 = parseInt(hash2.substring(0, 15), 16);

  const indices = [];
  for (let i = 0; i < hashCount; i++) {
    const combinedHash = (intHash1 + i * intHash2) % size;
    indices.push(combinedHash);
  }
  return indices;
}

module.exports = { getHashIndices };
