const crypto = require("crypto");
const algorithm = "aes-256-ctr";
require("dotenv").config();
const secretKey = process.env.SECRET;

const encrypt = (text, iv) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString("hex");
};

const hexToCrypto = (iv) => {
  return Buffer.from(iv, "hex");
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final()
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
  hexToCrypto
};
