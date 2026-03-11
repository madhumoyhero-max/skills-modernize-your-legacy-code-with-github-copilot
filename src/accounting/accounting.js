// Business logic for Student Account Management System
const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');

function loadBalance() {
  if (!fs.existsSync(BALANCE_FILE)) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
  }
  const data = fs.readFileSync(BALANCE_FILE);
  return JSON.parse(data).balance;
}

function saveBalance(balance) {
  fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance }));
}

module.exports = {
  loadBalance,
  saveBalance
};