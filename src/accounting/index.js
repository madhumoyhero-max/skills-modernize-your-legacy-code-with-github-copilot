// Node.js implementation of the COBOL Student Account Management System
// Preserves business logic, data integrity, and menu options

const { loadBalance, saveBalance } = require('./accounting.js');
const readline = require('readline');

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function promptMenu() {
    displayMenu();
    rl.question('Enter your choice (1-4): ', (choice) => {
      switch (choice.trim()) {
        case '1':
          viewBalance();
          break;
        case '2':
          creditAccount();
          break;
        case '3':
          debitAccount();
          break;
        case '4':
          console.log('Exiting the program. Goodbye!');
          rl.close();
          break;
        default:
          console.log('Invalid choice, please select 1-4.');
          promptMenu();
      }
    });
  }

  function viewBalance() {
    const balance = loadBalance();
    console.log(`Current balance: ${balance.toFixed(2)}`);
    promptMenu();
  }

  function creditAccount() {
    rl.question('Enter credit amount: ', (amt) => {
      const amount = parseFloat(amt);
      if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        promptMenu();
        return;
      }
      let balance = loadBalance();
      balance += amount;
      saveBalance(balance);
      console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
      promptMenu();
    });
  }

  function debitAccount() {
    rl.question('Enter debit amount: ', (amt) => {
      const amount = parseFloat(amt);
      if (isNaN(amount) || amount < 0) {
        console.log('Invalid amount.');
        promptMenu();
        return;
      }
      let balance = loadBalance();
      if (balance >= amount) {
        balance -= amount;
        saveBalance(balance);
        console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
      } else {
        console.log('Insufficient funds for this debit.');
      }
      promptMenu();
    });
  }

  promptMenu();
}

if (require.main === module) {
  main();
}
