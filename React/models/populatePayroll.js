const mongoose = require("mongoose");
require('dotenv').config(); 

const {
  Employee,
  Attendance,
  Payroll,
  Account,
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

      const employeesData = [
        {
          employeeId: "admin01",
          status: "Active",
          firstName: "Admin",
          middleName: "A",
          lastName: "User",
          department: "HR",
          position: "System Administrator",
          designation: "Administrator",
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
          employeeId: "111",
          status: "Active",
          firstName: "John",
          middleName: "A",
          lastName: "Doe",
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
          employeeId: "112",
          status: "Active",
          firstName: "Iker",
          middleName: "A",
          lastName: "Ventura",
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
          employeeId: "113",
          status: "Active",
          firstName: "Zora",
          middleName: "A",
          lastName: "Scott",
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

      const employees = await Employee.find({ employeeId: { $in: ["111"] } });
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
        isDeleted: false
      });
      console.log(`Database: Inserted 1 admin account.`);

      console.log('Database: Population function completed');
    } catch (error) {
      console.error('Database: Error populating database', error);
    }
}

module.exports = populateDatabase;


if (require.main === module) {
  const connectToMongo = require('../src/scripts/conn');
  connectToMongo().then(() => populateDatabase());
}
