const mongoose = require('mongoose');
const { Company } = require("../../../models/payrollSchema.js");

const rawSample = [
  {
    employee_id: '110',
    company: "De La Salle University",
    status: 'Active',
    fname: 'John', middleName: 'A.', lname: 'Doe',
    department: 'Engineering',
    position: 'Software Engineer',
    designation: 'Developer',
    basicSalary: 75000,
    bankAccount: {
      bankName: 'Bank of America',
      accountNumber: '123456789',
      branch: 'Downtown'
    },
    dateHired: new Date('2021-06-15'),
    phone: '555-0100',
    email: 'john.doe@example.com',
    rbacProfile: 1
  },
  {
    employee_id: '111',
    company: "De La Salle University",
    status: 'Active',
    fname: 'Jane', middleName: 'B.', lname: 'Smith',
    department: 'Human Resources',
    position: 'HR Manager',
    designation: 'Manager',
    basicSalary: 65000,
    bankAccount: {
      bankName: 'Wells Fargo',
      accountNumber: '987654321',
      branch: 'Uptown'
    },
    dateHired: new Date('2020-03-01'),
    phone: '555-0200',
    email: 'jane.smith@example.com',
    rbacProfile: 2
  },
  {
    employee_id: '112',
    company: "De La Salle University",
    status: 'Inactive',
    fname: 'Alice', middleName: 'C.', lname: 'Johnson',
    department: 'Sales',
    position: 'Sales Representative',
    designation: 'Associate',
    basicSalary: 55000,
    bankAccount: {
      bankName: 'Citibank',
      accountNumber: '456789123',
      branch: 'City Center'
    },
    dateHired: new Date('2019-11-20'),
    phone: '555-0300',
    email: 'alice.johnson@example.com',
    rbacProfile: 3
  },
  {
    employee_id: '113',
    company: "De La Salle University",
    status: 'Active',
    fname: 'Bob', middleName: '', lname: 'Brown',
    department: 'Finance',
    position: 'Accountant',
    designation: 'Senior Accountant',
    basicSalary: 70000,
    bankAccount: {
      bankName: 'Chase',
      accountNumber: '321654987',
      branch: 'Main Branch'
    },
    dateHired: new Date('2022-09-10'),
    phone: '555-0400',
    email: 'bob.brown@example.com',
    rbacProfile: 2
  },
  {
    employee_id: '114',
    company: "De La Salle University",
    status: 'Active',
    fname: 'Eve', middleName: 'D.', lname: 'Davis',
    department: 'Marketing',
    position: 'Marketing Coordinator',
    designation: 'Coordinator',
    basicSalary: 60000,
    bankAccount: {
      bankName: 'PNC Bank',
      accountNumber: '789123456',
      branch: '5th Ave'
    },
    dateHired: new Date('2023-01-05'),
    phone: '555-0500',
    email: 'eve.davis@example.com',
    rbacProfile: 4
  },

  // 5 for GreenLeaf Industries
  {
    employee_id: 'GL001',
    company: "GreenLeaf Industries",
    status: 'Active',
    fname: 'Liam', middleName: 'E.', lname: 'Green',
    department: 'R&D',
    position: 'Biochemist',
    designation: 'Senior Scientist',
    basicSalary: 80000,
    bankAccount: {
      bankName: 'Green Bank',
      accountNumber: '111222333',
      branch: 'Eco Park'
    },
    dateHired: new Date('2022-02-10'),
    phone: '555-1001',
    email: 'liam.green@greenleaf.com',
    rbacProfile: 1
  },
  {
    employee_id: 'GL002',
    company: "GreenLeaf Industries",
    status: 'Active',
    fname: 'Olivia', middleName: 'F.', lname: 'Leaf',
    department: 'Operations',
    position: 'Plant Manager',
    designation: 'Manager',
    basicSalary: 72000,
    bankAccount: {
      bankName: 'Eco Savings',
      accountNumber: '444555666',
      branch: 'Green Town'
    },
    dateHired: new Date('2021-08-15'),
    phone: '555-1002',
    email: 'olivia.leaf@greenleaf.com',
    rbacProfile: 2
  },
  {
    employee_id: 'GL003',
    company: "GreenLeaf Industries",
    status: 'Inactive',
    fname: 'Noah', middleName: 'G.', lname: 'Forest',
    department: 'Sales',
    position: 'Sales Executive',
    designation: 'Associate',
    basicSalary: 58000,
    bankAccount: {
      bankName: 'Forest Bank',
      accountNumber: '777888999',
      branch: 'Woodland'
    },
    dateHired: new Date('2019-05-20'),
    phone: '555-1003',
    email: 'noah.forest@greenleaf.com',
    rbacProfile: 3
  },
  {
    employee_id: 'GL004',
    company: "GreenLeaf Industries",
    status: 'Active',
    fname: 'Emma', middleName: 'H.', lname: 'Sprout',
    department: 'Marketing',
    position: 'Brand Manager',
    designation: 'Manager',
    basicSalary: 65000,
    bankAccount: {
      bankName: 'Nature Bank',
      accountNumber: '222333444',
      branch: 'Garden City'
    },
    dateHired: new Date('2020-11-01'),
    phone: '555-1004',
    email: 'emma.sprout@greenleaf.com',
    rbacProfile: 2
  },
  {
    employee_id: 'GL005',
    company: "GreenLeaf Industries",
    status: 'Active',
    fname: 'William', middleName: 'I.', lname: 'Bloom',
    department: 'Finance',
    position: 'Accountant',
    designation: 'Senior Accountant',
    basicSalary: 69000,
    bankAccount: {
      bankName: 'Flora Bank',
      accountNumber: '555666777',
      branch: 'Greenbank'
    },
    dateHired: new Date('2023-03-12'),
    phone: '555-1005',
    email: 'william.bloom@greenleaf.com',
    rbacProfile: 1
  },

  // 5 for Urban Eats LLC
  {
    employee_id: 'UE001',
    company: "Urban Eats LLC",
    status: 'Active',
    fname: 'Sophia', middleName: 'J.', lname: 'Urban',
    department: 'Kitchen',
    position: 'Head Chef',
    designation: 'Chef',
    basicSalary: 72000,
    bankAccount: {
      bankName: 'City Bank',
      accountNumber: '123123123',
      branch: 'Downtown'
    },
    dateHired: new Date('2021-07-22'),
    phone: '555-2001',
    email: 'sophia.urban@urbaneats.com',
    rbacProfile: 2
  },
  {
    employee_id: 'UE002',
    company: "Urban Eats LLC",
    status: 'Active',
    fname: 'Mason', middleName: 'K.', lname: 'Feast',
    department: 'Service',
    position: 'Restaurant Manager',
    designation: 'Manager',
    basicSalary: 68000,
    bankAccount: {
      bankName: 'Metro Bank',
      accountNumber: '321321321',
      branch: 'Central'
    },
    dateHired: new Date('2020-02-14'),
    phone: '555-2002',
    email: 'mason.feast@urbaneats.com',
    rbacProfile: 2
  },
  {
    employee_id: 'UE003',
    company: "Urban Eats LLC",
    status: 'Inactive',
    fname: 'Isabella', middleName: 'L.', lname: 'Bite',
    department: 'Delivery',
    position: 'Driver',
    designation: 'Associate',
    basicSalary: 45000,
    bankAccount: {
      bankName: 'Transit Bank',
      accountNumber: '456456456',
      branch: 'City Garage'
    },
    dateHired: new Date('2019-10-30'),
    phone: '555-2003',
    email: 'isabella.bite@urbaneats.com',
    rbacProfile: 3
  },
  {
    employee_id: 'UE004',
    company: "Urban Eats LLC",
    status: 'Active',
    fname: 'Ethan', middleName: 'M.', lname: 'Serve',
    department: 'Service',
    position: 'Waiter',
    designation: 'Associate',
    basicSalary: 40000,
    bankAccount: {
      bankName: 'Urban Bank',
      accountNumber: '789789789',
      branch: 'Main St'
    },
    dateHired: new Date('2022-04-18'),
    phone: '555-2004',
    email: 'ethan.serve@urbaneats.com',
    rbacProfile: 3
  },
  {
    employee_id: 'UE005',
    company: "Urban Eats LLC",
    status: 'Active',
    fname: 'Ava', middleName: 'N.', lname: 'Dish',
    department: 'Marketing',
    position: 'Social Media Coordinator',
    designation: 'Coordinator',
    basicSalary: 50000,
    bankAccount: {
      bankName: 'Digital Bank',
      accountNumber: '987987987',
      branch: 'Online'
    },
    dateHired: new Date('2023-06-05'),
    phone: '555-2005',
    email: 'ava.dish@urbaneats.com',
    rbacProfile: 1
  },

  // 5 for NextGen Energy
  {
    employee_id: 'NG001',
    company: "NextGen Energy",
    status: 'Active',
    fname: 'Michael', middleName: 'O.', lname: 'Volt',
    department: 'R&D',
    position: 'Electrical Engineer',
    designation: 'Engineer',
    basicSalary: 82000,
    bankAccount: {
      bankName: 'Power Bank',
      accountNumber: '159159159',
      branch: 'Tech Park'
    },
    dateHired: new Date('2021-09-01'),
    phone: '555-3001',
    email: 'michael.volt@nextgen.com',
    rbacProfile: 1
  },
  {
    employee_id: 'NG002',
    company: "NextGen Energy",
    status: 'Active',
    fname: 'Emily', middleName: 'P.', lname: 'Current',
    department: 'Production',
    position: 'Plant Supervisor',
    designation: 'Supervisor',
    basicSalary: 76000,
    bankAccount: {
      bankName: 'Energy Bank',
      accountNumber: '753753753',
      branch: 'Factory'
    },
    dateHired: new Date('2020-12-12'),
    phone: '555-3002',
    email: 'emily.current@nextgen.com',
    rbacProfile: 2
  },
  {
    employee_id: 'NG003',
    company: "NextGen Energy",
    status: 'Inactive',
    fname: 'Alexander', middleName: 'Q.', lname: 'Watt',
    department: 'Sales',
    position: 'Sales Engineer',
    designation: 'Associate',
    basicSalary: 60000,
    bankAccount: {
      bankName: 'High Voltage Bank',
      accountNumber: '852852852',
      branch: 'Outlet'
    },
    dateHired: new Date('2019-07-25'),
    phone: '555-3003',
    email: 'alexander.watt@nextgen.com',
    rbacProfile: 3
  },
  {
    employee_id: 'NG004',
    company: "NextGen Energy",
    status: 'Active',
    fname: 'Charlotte', middleName: 'R.', lname: 'Spark',
    department: 'Marketing',
    position: 'Marketing Manager',
    designation: 'Manager',
    basicSalary: 70000,
    bankAccount: {
      bankName: 'Spark Bank',
      accountNumber: '147147147',
      branch: 'Downtown'
    },
    dateHired: new Date('2022-05-14'),
    phone: '555-3004',
    email: 'charlotte.spark@nextgen.com',
    rbacProfile: 2
  },
  {
    employee_id: 'NG005',
    company: "NextGen Energy",
    status: 'Active',
    fname: 'Benjamin', middleName: 'S.', lname: 'Charge',
    department: 'Engineering',
    position: 'Battery Engineer',
    designation: 'Engineer',
    basicSalary: 78000,
    bankAccount: {
      bankName: 'Battery Bank',
      accountNumber: '369369369',
      branch: 'Lab'
    },
    dateHired: new Date('2023-02-20'),
    phone: '555-3005',
    email: 'benjamin.charge@nextgen.com',
    rbacProfile: 1
  },

  // 5 for BlueWave Tech
  {
    employee_id: 'BW001',
    company: "BlueWave Tech",
    status: 'Active',
    fname: 'Daniel', middleName: 'T.', lname: 'Wave',
    department: 'Research',
    position: 'Marine Biologist',
    designation: 'Scientist',
    basicSalary: 84000,
    bankAccount: {
      bankName: 'Ocean Bank',
      accountNumber: '963963963',
      branch: 'Harbor'
    },
    dateHired: new Date('2021-03-18'),
    phone: '555-4001',
    email: 'daniel.wave@bluewave.com',
    rbacProfile: 1
  },
  {
    employee_id: 'BW002',
    company: "BlueWave Tech",
    status: 'Active',
    fname: 'Grace', middleName: 'U.', lname: 'Coral',
    department: 'Engineering',
    position: 'Software Engineer',
    designation: 'Developer',
    basicSalary: 77000,
    bankAccount: {
      bankName: 'Coral Bank',
      accountNumber: '741741741',
      branch: 'Reef'
    },
    dateHired: new Date('2020-01-10'),
    phone: '555-4002',
    email: 'grace.coral@bluewave.com',
    rbacProfile: 2
  },
  {
    employee_id: 'BW003',
    company: "BlueWave Tech",
    status: 'Inactive',
    fname: 'Henry', middleName: 'V.', lname: 'Tide',
    department: 'Production',
    position: 'Technician',
    designation: 'Associate',
    basicSalary: 56000,
    bankAccount: {
      bankName: 'Tide Bank',
      accountNumber: '258258258',
      branch: 'Dock'
    },
    dateHired: new Date('2019-08-05'),
    phone: '555-4003',
    email: 'henry.tide@bluewave.com',
    rbacProfile: 3
  },
  {
    employee_id: 'BW004',
    company: "BlueWave Tech",
    status: 'Active',
    fname: 'Amelia', middleName: 'W.', lname: 'Sail',
    department: 'Operations',
    position: 'Operations Manager',
    designation: 'Manager',
    basicSalary: 73000,
    bankAccount: {
      bankName: 'Sail Bank',
      accountNumber: '369258147',
      branch: 'Marina'
    },
    dateHired: new Date('2022-11-22'),
    phone: '555-4004',
    email: 'amelia.sail@bluewave.com',
    rbacProfile: 2
  },
  {
    employee_id: 'BW005',
    company: "BlueWave Tech",
    status: 'Active',
    fname: 'Oliver', middleName: 'X.', lname: 'Hull',
    department: 'Design',
    position: 'UX Designer',
    designation: 'Designer',
    basicSalary: 69000,
    bankAccount: {
      bankName: 'Hull Bank',
      accountNumber: '147258369',
      branch: 'Design Center'
    },
    dateHired: new Date('2023-04-30'),
    phone: '555-4005',
    email: 'oliver.hull@bluewave.com',
    rbacProfile: 1
  }
];

async function getSampleEmployees() {
  const names = rawSample.map(e => e.company);
  const companies = await Company
    .find({ name: { $in: names } }, '_id name')
    .lean();

  const nameToId = companies.reduce((map, c) => {
    map[c.name] = c._id;
    return map;
  }, {});

  return rawSample.map(e => {
    const companyId = nameToId[e.company];
    if (!companyId) {
      throw new Error(`No company found matching "${e.company}"`);
    }
    return {
      employee_id: e.employee_id,
      company: companyId,
      status: e.status,
      fname: e.fname,
      middleName: e.middleName,
      lname: e.lname,
      department: e.department,
      position: e.position,
      designation: e.designation,
      basicSalary: e.basicSalary,
      bankAccount: e.bankAccount,
      dateHired: e.dateHired,
      phone: e.phone,
      email: e.email,
      rbacProfile: e.rbacProfile
    };
  });
}


module.exports = {rawSample, getSampleEmployees};