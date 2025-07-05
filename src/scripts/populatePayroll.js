const mongoose = require("mongoose");
require('dotenv').config(); 
const {
  Employee,
  Attendance,
  Payroll,
  Account,
  Company,
  Config
} = require("../../models/payrollSchema.js");
const sampleCompanies = require("./sampleData/sampleCompany.js");
const { getSampleEmployees } = require('./sampleData/sampleEmployee.js');
const { getSamplePayroll } = require("./sampleData/samplePayroll.js");


async function dropDatabase() {
    try {
        await mongoose.connection.dropDatabase();
        console.log('Database: Old database dropped successfully.');
    } catch (error) {
        console.error('Database: Error, database not dropped.', error);
    } 
}

async function populateDatabase() {
  try {
    await dropDatabase();

    for (const sampleCompany of sampleCompanies) {
      const companyData = new Company(sampleCompany);
      await companyData.save();
    }

    console.log(`Database: Inserted ${sampleCompanies.length} companies.`);

    const employees = await getSampleEmployees();
    const sampleEmployees = await Employee.insertMany(employees);

    console.log(`Database: Inserted ${sampleEmployees.length} employees.`);

    const sample = await getSamplePayroll();
    const samplePayroll = await Payroll.insertMany(sample);
    console.log(`Database: Inserted ${samplePayroll.length} payroll data.`);

    await Config.create({
      standardRate: 645,
      holidayRate: 800,
      weekendRate: 700
    });

    console.log("Database: Inserted payroll config.");

    // await Account.create({
    //   username: "admin",
    //   passwordHash: "123", // Ideally, this should be hashed
    //   role: "Administrator",
    //    company: company._id,
    //   isDeleted: false
    // });
    // console.log(`Database: Inserted 1 admin account.`);

    // console.log('Database: Population function completed');
  } catch (error) {
    console.error('Database: Error populating database', error);
  }

    // --- Create second company ---
    // const secondCompany = await Company.create({
    //   name: "OpenAI",
    //   address: "Silicon Valley",
    //   industry: "Technology"
    // });
    // console.log("Database: Inserted company TechNova Solutions.");


    // // --- Create employee for second company ---
    // const newEmployee = await Employee.create({
    //   employee_id: "210",
    //   company: secondCompany._id,
    //   status: "Active",
    //   fname: "Alice",
    //   middleName: "B",
    //   lname: "Tan",
    //   department: "Engineering",
    //   position: "QA Analyst",
    //   designation: "Software QA",
    //   basicSalary: 70000,
    //   bankAccount: {
    //     bankName: "BPI",
    //     accountNumber: "0000000210",
    //     branch: "Makati"
    //   },
    //   dateHired: new Date("2022-06-15"),
    //   phone: "09181234567",
    //   email: "alice.tan@technova.com",
    //   rbacProfile: 1
    // });
    // console.log("Database: Inserted employee Alice Tan.");


    //   // --- Create admin account for second company ---
    //   await Account.create({
    //     username: "admin2",
    //     passwordHash: "123", // Hashing recommended in production
    //     role: "Administrator",
    //     company: secondCompany._id,
    //     isDeleted: false
    //   });
    //   console.log("Database: Inserted 1 admin account for OpenAI.");
  }

module.exports = populateDatabase;