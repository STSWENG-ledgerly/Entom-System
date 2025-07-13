
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
          overtimeRate: 200,
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
          overtimeRate: 200,
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
          basicSalary: 9385,
          overtimeRate: 200,
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
          basicSalary: 11485,
          overtimeRate: 200,
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

  // at the top of your file
  const PAYROLL_TIMEFRAMES = ['Weekly','Bi-Monthly','Monthly'];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // pick a random date in October 2024
  function randomPayDate() {
    // month is zero-based: 9 = October
    const day = randomInt(1, 28);
    return new Date(2024, 9, day);
  }

  // main routine
  async function seedPayroll() {
    const employees = await Employee.find({ company: company._id }).lean();

    const payrollData = employees.map(emp => {
      // 1) pick timeframe & payDate
      const payrollTimeframe = PAYROLL_TIMEFRAMES[randomInt(0, PAYROLL_TIMEFRAMES.length - 1)];
      const payDate = randomPayDate();

      // 2) random allowances
      const allowances = {
        mealAllowance: randomInt(100, 500),
        birthdayBonus: randomInt(0, 1000),
        incentives: randomInt(0, 2000),
        otherAdditions: randomInt(0, 500)
      };

      // 3) compute gross = base + allowances + OT
      const grossSalary = emp.basicSalary + allowances.mealAllowance
        + allowances.birthdayBonus + allowances.incentives
        + allowances.otherAdditions;

      // 4) random deductions
      const deductions = {
        tax: +(grossSalary * (randomInt(10, 20) / 100)).toFixed(2),
        sss: randomInt(200, 800),
        philHealth: randomInt(200, 800),
        pagIbig: randomInt(100, 500),
        healthCard: randomInt(50, 200),
        cashAdvance: randomInt(0, 1000),
        lateAbsent: randomInt(0, 300),
        otherDeductions: randomInt(0, 300)
      };
      const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
      const total = +(grossSalary - totalDeductions).toFixed(2);

      return {
        employee: emp._id,
        payDate,
        payrollTimeframe,
        allowances,
        grossSalary: +grossSalary.toFixed(2),
        deductions,
        totalDeductions,
        total,
        paymentMode: ['Bank Transfer','Cash','Check'][randomInt(0,2)],
        payslipId: `PS${emp.employee_id}-${payDate.toISOString().slice(0,10)}`,
        isApproved: Math.random() < 0.8,  // 80% chance approved
        dateGenerated: payDate,
        isDeleted: false
      };
    });

    try {
      const result = await Payroll.insertMany(payrollData, { ordered: false });
      console.log(`Inserted ${result.length} payroll entries.`);
    } catch (err) {
      console.error("Insert error:", err);
      if (err.writeErrors) {
        err.writeErrors.forEach(e => console.error(e.errmsg));
      }
    }
  }

  // run it
  seedPayroll().catch(console.error);



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
  overtimeRate: 200,
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
