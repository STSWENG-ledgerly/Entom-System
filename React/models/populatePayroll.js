const mongoose = require("mongoose");
require('dotenv').config(); 

const {
  Employee,
  Payment,
  PayrollAppConfig,
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
        { employee_id: "111", status: true, fname: "John", mname: "A", lname: "Doe", phone: "09100000000", email: "jdoe@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "112", status: true, fname: "Iker", mname: "A", lname: "Ventura", phone: "09100000000", email: "iventura@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "113", status: true, fname: "Zora", mname: "A", lname: "Scott", phone: "09100000000", email: "zscott@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "114", status: true, fname: "Alice", mname: "A", lname: "Johnson", phone: "09100000000", email: "ajohnson@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "115", status: true, fname: "Bob", mname: "A", lname: "Smith", phone: "09100000000", email: "bsmith@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "116", status: true, fname: "Charlie", mname: "A", lname: "Brown", phone: "09100000000", email: "cbrown@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "117", status: true, fname: "David", mname: "A", lname: "Wilson", phone: "09100000000", email: "dwilson@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "118", status: true, fname: "Eva", mname: "A", lname: "Martinez", phone: "09100000000", email: "emartinez@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "119", status: true, fname: "Frank", mname: "A", lname: "Garcia", phone: "09100000000", email: "fgarcia@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1110", status: true, fname: "Grace", mname: "A", lname: "Lee", phone: "09100000000", email: "glee@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1111", status: true, fname: "Hannah", mname: "A", lname: "Walker", phone: "09100000000", email: "hwalker@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1112", status: true, fname: "Ian", mname: "A", lname: "Hall", phone: "09100000000", email: "ihall@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1113", status: true, fname: "Jack", mname: "A", lname: "Young", phone: "09100000000", email: "jyoung@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1114", status: true, fname: "Karen", mname: "A", lname: "King", phone: "09100000000", email: "kking@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
        { employee_id: "1115", status: true, fname: "Liam", mname: "A", lname: "Wright", phone: "09100000000", email: "lwright@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 }
      ];

      await Employee.insertMany(employeesData);
      console.log(`Database: Inserted ${employeesData.length} employees.`);

      const paymentsData = [
        { employee_id: "111", payDate: new Date("2024-10-16"), rate: 645, basic: 8385, overtimeDays: 0, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 8385, deductions: 0, total: 8385, isDeleted: false },
        { employee_id: "112", payDate: new Date("2024-11-16"), rate: 645, basic: 8385, overtimeDays: 5, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 11610, deductions: 0, total: 11610, isDeleted: false },
        { employee_id: "113", payDate: new Date("2024-12-16"), rate: 645, basic: 8385, overtimeDays: 5, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 11610, deductions: 0, total: 11610, isDeleted: false },
      ];

      await Payment.insertMany(paymentsData);
      console.log(`Database: Inserted ${paymentsData.length} payment data.`);


      await PayrollAppConfig.create({
      password: "123",
      rate: 645,
      basic: 8385
      });
      console.log("Database: Inserted payroll app config.");


      console.log('Database: Population function completed');
    } catch (error) {
      console.error('Database: Error populating database', error);
    }
}


module.exports = populateDatabase;

// db.once("open", async () => {
//   console.log("Connected to MongoDB");

//   try {
//     await Employee.deleteMany({});
//     await Payment.deleteMany({});
//     await PayrollAppConfig.deleteMany({});

//     // Insert employees
//     const employeesData = [
//         { employee_id: "111", status: true, fname: "John", mname: "A", lname: "Doe", phone: "09100000000", email: "jdoe@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "112", status: true, fname: "Iker", mname: "A", lname: "Ventura", phone: "09100000000", email: "iventura@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "113", status: true, fname: "Zora", mname: "A", lname: "Scott", phone: "09100000000", email: "zscott@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "114", status: true, fname: "Alice", mname: "A", lname: "Johnson", phone: "09100000000", email: "ajohnson@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "115", status: true, fname: "Bob", mname: "A", lname: "Smith", phone: "09100000000", email: "bsmith@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "116", status: true, fname: "Charlie", mname: "A", lname: "Brown", phone: "09100000000", email: "cbrown@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "117", status: true, fname: "David", mname: "A", lname: "Wilson", phone: "09100000000", email: "dwilson@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "118", status: true, fname: "Eva", mname: "A", lname: "Martinez", phone: "09100000000", email: "emartinez@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "119", status: true, fname: "Frank", mname: "A", lname: "Garcia", phone: "09100000000", email: "fgarcia@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1110", status: true, fname: "Grace", mname: "A", lname: "Lee", phone: "09100000000", email: "glee@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1111", status: true, fname: "Hannah", mname: "A", lname: "Walker", phone: "09100000000", email: "hwalker@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1112", status: true, fname: "Ian", mname: "A", lname: "Hall", phone: "09100000000", email: "ihall@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1113", status: true, fname: "Jack", mname: "A", lname: "Young", phone: "09100000000", email: "jyoung@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1114", status: true, fname: "Karen", mname: "A", lname: "King", phone: "09100000000", email: "kking@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 },
//         { employee_id: "1115", status: true, fname: "Liam", mname: "A", lname: "Wright", phone: "09100000000", email: "lwright@gmail.com", designation: "designation", position: "position", date_hired: new Date("2001-10-10"), rbacProfile: 1 }
//       ];

//     await Employee.insertMany(employeesData);
//     console.log(`Inserted ${employeesData.length} employees.`);

//     // Insert payments
//     const paymentsData = [
//       { employee_id: "111", payDate: new Date("2024-10-16"), rate: 645, basic: 8385, overtimeDays: 0, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 8385, deductions: 0, total: 8385, isDeleted: false },
//       { employee_id: "111", payDate: new Date("2024-11-16"), rate: 645, basic: 8385, overtimeDays: 5, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 11610, deductions: 0, total: 11610, isDeleted: false },
//       { employee_id: "111", payDate: new Date("2024-12-16"), rate: 645, basic: 8385, overtimeDays: 5, salaryIncrease: 0, mealAllowance: 0, birthdayBonus: 0, incentive: 0, otherAdditions: 0, sss: 0, philHealth: 0, pagIbig: 0, cashAdvance: 0, healthCard: 0, lateAbsent: 0, otherDeductions: 0, payroll: 11610, deductions: 0, total: 11610, isDeleted: false },
//     ];

//     for (let i = 2; i <= 15; i++) {
//       paymentsData.push({
//         employee_id: `11${i}`,
//         payDate: new Date("2024-11-16"),
//         rate: 645,
//         basic: 8385,
//         overtimeDays: 0,
//         salaryIncrease: 0,
//         mealAllowance: 0,
//         birthdayBonus: 0,
//         incentive: 0,
//         otherAdditions: 0,
//         sss: 0,
//         philHealth: 0,
//         pagIbig: 0,
//         cashAdvance: 0,
//         healthCard: 0,
//         lateAbsent: 0,
//         otherDeductions: 0,
//         payroll: 8385,
//         deductions: 0,
//         total: 8385,
//         isDeleted: false
//       });
//     }

//     await Payment.insertMany(paymentsData);
//     console.log(`Inserted ${paymentsData.length} payments.`);

//     // Insert config
//     await PayrollAppConfig.create({
//       password: "123",
//       rate: 645,
//       basic: 8385
//     });
//     console.log("Inserted payroll app config.");

//   } catch (err) {
//     console.error("Error populating data:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// });
