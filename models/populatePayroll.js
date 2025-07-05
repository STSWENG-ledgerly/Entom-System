const mongoose = require("mongoose");
require('dotenv').config(); 

const {
  Employee,
  Attendance,
  Payroll,
  Account,
  Company,
  Config
} = require("../models/payrollSchema");


async function dropDatabase() {
    try {
        await mongoose.connection.dropDatabase();
        console.log('Database: Old DB Dropped successfully');
    } catch (error) {
        console.error('Database: Error dropping database', error);
    }
}

async function populateDatabase() {
    try {
      await dropDatabase();

      const company = await Company.create({
        name: "DLSU",
        address: "2401 Taft",   
        industry: "School"            
      });

      console.log("Database: Inserted company DLSU.");


      const employeesData = [
        {
          employee_id: "110",
          company: company._id,
          status: "Active",
          fname: "Admin",
          middleName: "A",
          lname: "User",
          department: "HR",
          position: "Professor",
          designation: "CCS",
          basicSalary: 100000,
          bankAccount: {
            bankName: "BDO",
            accountNumber: "0000000001",
            branch: "Main"
          },
          dateHired: new Date("2020-01-01"),
          phone: "09100000000",
          email: "admin@example.com",
          rbacProfile: 0
        },
        {
          employee_id: "111",
          company: company._id,
          status: "Active",
          fname: "John",
          middleName: "A",
          lname: "Doe",
          department: "IT",
          position: "Developer",
          designation: "Software Engineer",
          basicSalary: 8385,
          bankAccount: {
            bankName: "BDO",
            accountNumber: "0000000111",
            branch: "Quezon City"
          },
          dateHired: new Date("2001-10-10"),
          phone: "09100000000",
          email: "jdoe@gmail.com",
          rbacProfile: 1
        },
        {
          employee_id: "112",
          company: company._id,
          status: "Active",
          fname: "Iker",
          middleName: "A",
          lname: "Ventura",
          department: "Marketing",
          position: "Assistant",
          designation: "Marketing Assistant",
          basicSalary: 8385,
          bankAccount: {
            bankName: "BPI",
            accountNumber: "0000000112",
            branch: "Manila"
          },
          dateHired: new Date("2001-10-10"),
          phone: "09100000000",
          email: "iventura@gmail.com",
          rbacProfile: 1
        },
        {
          employee_id: "113",
          company: company._id,
          status: "Active",
          fname: "Zora",
          middleName: "A",
          lname: "Scott",
          department: "Finance",
          position: "Clerk",
          designation: "Finance Staff",
          basicSalary: 8385,
          bankAccount: {
            bankName: "Landbank",
            accountNumber: "0000000113",
            branch: "Cebu"
          },
          dateHired: new Date("2001-10-10"),
          phone: "09100000000",
          email: "zscott@gmail.com",
          rbacProfile: 1
        }
      ];

      await Employee.insertMany(employeesData);
      console.log(`Database: Inserted ${employeesData.length} employees.`);

      const payrollData = [
        {
          employee: null, // to be updated after insertion
          payDate: new Date("2024-10-16"),
          payrollTimeframe: "Monthly",
          allowances: {
            mealAllowance: 0,
            birthdayBonus: 0,
            incentives: 0,
            otherAdditions: 0
          },
          overtimeDetails: [],
          grossSalary: 8385,
          deductions: {
            tax: 0,
            sss: 0,
            philHealth: 0,
            pagIbig: 0,
            healthCard: 0,
            cashAdvance: 0,
            lateAbsent: 0,
            otherDeductions: 0
          },
          totalDeductions: 0,
          netPay: 8385,
          paymentMode: "Bank Transfer",
          payslipId: "PS111-20241016",
          isApproved: true,
          dateGenerated: new Date("2024-10-16")
        }
      ];

      const employees = await Employee.find({ employee_id: { $in: ["111"] } });
      payrollData[0].employee = employees[0]._id;
      await Payroll.insertMany(payrollData);
      console.log(`Database: Inserted ${payrollData.length} payroll entries.`);


      await Config.create({
        standardRate: 645,
        holidayRate: 800,
        weekendRate: 700
      });
      console.log("Database: Inserted payroll config.");

      await Account.create({
        username: "admin",
        passwordHash: "123", // Ideally, this should be hashed
        role: "Administrator",
         company: company._id,
        isDeleted: false
      });
      console.log(`Database: Inserted 1 admin account.`);

      console.log('Database: Population function completed');
    } catch (error) {
      console.error('Database: Error populating database', error);
    }

    // --- Create second company ---
const secondCompany = await Company.create({
  name: "OpenAI",
  address: "Silicon Valley",
  industry: "Technology"
});
console.log("Database: Inserted company TechNova Solutions.");


// --- Create employee for second company ---
const newEmployee = await Employee.create({
  employee_id: "210",
  company: secondCompany._id,
  status: "Active",
  fname: "Alice",
  middleName: "B",
  lname: "Tan",
  department: "Engineering",
  position: "QA Analyst",
  designation: "Software QA",
  basicSalary: 70000,
  bankAccount: {
    bankName: "BPI",
    accountNumber: "0000000210",
    branch: "Makati"
  },
  dateHired: new Date("2022-06-15"),
  phone: "09181234567",
  email: "alice.tan@technova.com",
  rbacProfile: 1
});
console.log("Database: Inserted employee Alice Tan.");


  // --- Create admin account for second company ---
  await Account.create({
    username: "admin2",
    passwordHash: "123", // Hashing recommended in production
    role: "Administrator",
    company: secondCompany._id,
    isDeleted: false
  });
  console.log("Database: Inserted 1 admin account for OpenAI.");
  }

module.exports = populateDatabase;


  if (require.main === module) {
    const connectToMongo = require('../src/scripts/conn');
    connectToMongo().then(() => populateDatabase());
  }
