// Node imports
const fs = require('fs');

// Third-party imports
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Models
const Employee = require('../../models/employeeModel');
const Floor = require('../../models/floorModel');
const Order = require('../../models/orderModel');
const Room = require('../../models/roomModel');
const User = require('../../models/userModel');

// Configurations
dotenv.config({ path: '../../.env' });

// Mongoose
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
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
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, 'utf-8'));
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import the data to the database.
// Do imports in order - not following the order might cause the import to fail (foreign key checks).
const importDevData = async () => {
  try {
    await User.create(users);
    await Employee.create(employees);
    await Floor.create(floors);
    await Room.create(rooms);
    await Order.create(orders);

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
    await Order.deleteMany();

    console.log('Data has been successfully deleted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] == '--import') {
  importDevData();
} else if (process.argv[2] == '--delete') {
  deleteDevData();
} else {
  console.log(
    'Please pass the --import or --delete arguments (e.g. node import-data.js --import) to use this program.'
  );
}
