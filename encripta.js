const fs = require('fs');
const bigInt = require('big-integer');

function encripta(publicKeyFile, inputFile, outputFile) {
  const publicKey = JSON.parse(fs.readFileSync(publicKeyFile, 'utf8'));

  const plaintext = fs.readFileSync(inputFile, 'utf8');
  const { e, n } = publicKey;

  const encryptedBlocks = Array.from(plaintext, char => {
    const charCode = char.charCodeAt(0);
    const encryptedBlock = bigInt(charCode).modPow(e, n);
    return encryptedBlock.toString();
  });

  const encryptedText = encryptedBlocks.join(' ');
  fs.writeFileSync(outputFile, encryptedText);
}

encripta(process.argv[2], process.argv[3], process.argv[4]);
