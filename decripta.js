const fs = require('fs');
const bigInt = require('big-integer');

function decripta(privateKeyFile, inputFile, outputFile) {
  const privateKey = JSON.parse(fs.readFileSync(privateKeyFile, 'utf8'));

  const encryptedData = fs.readFileSync(inputFile, 'utf8');
  const { d, n } = privateKey;

  const encryptedBlocks = encryptedData.split(' ');
  const decryptedBlocks = encryptedBlocks.map(encryptedBlock => {
    const encryptedBlockValue = bigInt(encryptedBlock);
    const decryptedBlockValue = encryptedBlockValue.modPow(d, n);
    return String.fromCharCode(decryptedBlockValue);
  });

  const decryptedText = decryptedBlocks.join('');
  fs.writeFileSync(outputFile, decryptedText);
}

decripta(process.argv[2], process.argv[3], process.argv[4]);
