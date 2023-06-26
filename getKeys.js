const fs = require('fs');
const bigInt = require('big-integer');

function getKeys() {
  const primes = fs.readFileSync('primekeys.txt', 'utf8').split('\n');

  const getPrime = (primes) => {
    const randomIndex = Math.floor(Math.random() * primes.length);
    const primeStr = primes[randomIndex];
    return bigInt(primeStr);
  };

  const calculateTotient = (p, q) => {
    const pMinusOne = p.minus(1);
    const qMinusOne = q.minus(1);
    return pMinusOne.multiply(qMinusOne);
  };

  const calculateE = (totient) => {
    let e = bigInt(2);
    while (e.compare(totient) < 0) {
      if (bigInt.gcd(totient, e).equals(1)) {
        break;
      }
      e = e.plus(1);
    }
    return e;
  };

  const calculateD = (e, totient) => {
    return e.modInv(totient);
  };

  const saveKeyToFile = (key, fileName) => {
    const keyString = JSON.stringify(key);
    fs.writeFileSync(fileName, keyString);
  };

  const p = getPrime(primes);
  const q = getPrime(primes);
  const n = p.multiply(q);
  const totient = calculateTotient(p, q);
  const e = calculateE(totient);
  const d = calculateD(e, totient);

  const publicKey = { e: e, n: n };
  const privateKey = { d: d, n: n };

  saveKeyToFile(publicKey, 'public_key.txt');
  saveKeyToFile(privateKey, 'private_key.txt');
}

getKeys();
