const range = require('lodash.range');
const fs = require('fs');

const PASSWORD_LENGTH = 15;
const randomizedNums = (nums, length) => nums.map(num => Math.floor(Math.random()*length));
const generatePassword = n => {
    const nums = range(n);

    return new Promise((resolve, reject) => fs.readFile('./diceware.wordlist.asc', 'utf8', (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }))
    .then(data => {
        const lines = data.split('\n');
        const randomNums = randomizedNums(nums, lines.length);
        return randomNums.map(num => lines[num].split('\t')[1]);
    })
    .catch(err => console.log('ERR', err));
};



generatePassword(parseInt(process.env.PASSWORD_LENGTH) || PASSWORD_LENGTH)
    .then(data => {
        console.log("Your new password is: " + data.join(' '));
    });

