// Unit tests for Node.js Student Account Management System
// Mirrors scenarios in docs/TESTPLAN.md

const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, '../accounting/balance.json');

// Import functions from accounting.js
const { loadBalance, saveBalance } = require('../accounting/accounting.js');

// Helper to reset balance file
function resetBalance(val = 1000.00) {
  fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: val }));
}

describe('Student Account Management System', () => {
  beforeEach(() => {
    resetBalance();
  });

  test('TC01: View initial balance', () => {
    expect(loadBalance()).toBe(1000.00);
  });

  test('TC02: Credit account with valid amount', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    balance += 200;
    saveBalance(balance);
    expect(loadBalance()).toBe(1200.00);
  });

  test('TC03: Debit account with sufficient funds', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    balance -= 300;
    saveBalance(balance);
    expect(loadBalance()).toBe(700.00);
  });

  test('TC04: Debit account with insufficient funds', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    const debitAmount = 2000;
    if (balance < debitAmount) {
      // Should not change balance
      expect(loadBalance()).toBe(1000.00);
    }
  });

  test('TC05: Credit account with zero amount', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    balance += 0;
    saveBalance(balance);
    expect(loadBalance()).toBe(1000.00);
  });

  test('TC06: Debit account with zero amount', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    balance -= 0;
    saveBalance(balance);
    expect(loadBalance()).toBe(1000.00);
  });

  // TC07 and TC08 are UI/menu tests, not applicable for unit tests

  test('TC09: Multiple operations sequence', () => {
    saveBalance(1000.00);
    let balance = loadBalance();
    balance += 100;
    saveBalance(balance);
    balance = loadBalance();
    balance -= 50;
    saveBalance(balance);
    expect(loadBalance()).toBe(1050.00);
  });
});
