/* eslint-disable no-console */
// Node imports
const fs = require('fs');
const path = require('path');

// Third-party imports
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Models
const Employee = require('../../src/models/employeeModel');
const Floor = require('../../src/models/floorModel');
const Room = require('../../src/models/roomModel');
const User = require('../../src/models/userModel');
const Visitor = require('../../src/models/visitorModel');
const Voucher = require('../../src/models/voucherModel');

// Configurations
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Mongoose
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Database connection successfull!');
  })
  .catch((err) => {
    console.log('Error with code:', err);
  });

// Read JSON
const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/employees.json`, 'utf-8')
);
const floors = JSON.parse(fs.readFileSync(`${__dirname}/floors.json`, 'utf-8'));
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const vouchers = JSON.parse(
  fs.readFileSync(`${__dirname}/vouchers.json`, 'utf-8')
);

// Import the data to the database.
// Do imports in order - not following the order might cause the import to fail (foreign key checks).
const importDevData = async () => {
  try {
    await User.create(users);
    await Employee.create(employees);
    await Floor.create(floors);
    await Room.create(rooms);
    await Visitor.create();
    await Voucher.create(vouchers);

    console.log('Data has been successfully inserted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// Delete the data if it ever gets dirty.
const deleteDevData = async () => {
  try {
    await Employee.deleteMany();
    await Floor.deleteMany();
    await Room.deleteMany();
    await User.deleteMany();
    await Visitor.deleteMany();
    await Voucher.deleteMany();

    console.log('Data has been successfully deleted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importDevData();
} else if (process.argv[2] === '--delete') {
  deleteDevData();
} else {
  console.log(
    'Please pass the --import or --delete arguments (e.g. node import-data.js --import) to use this program.'
  );
}
