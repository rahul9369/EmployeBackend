const mongoose = require("mongoose");
const Employe = require("./models/Employe");
const Employes = [
  {
    img: "https://example.com/image1.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: 9876543210,
    designation: "Software Engineer",
    gender: "Male",
    course: "Computer Science",
    createDate: "2024-11-24T10:50:00Z",
  },
  {
    img: "https://example.com/image2.jpg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: 8765432109,
    designation: "Project Manager",
    gender: "Female",
    course: "Information Technology",
    createDate: "2024-11-23T14:30:00Z",
  },
  {
    img: "https://example.com/image3.jpg",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    mobile: 7654321098,
    designation: "Data Analyst",
    gender: "Female",
    course: "Data Science",
    createDate: "2024-11-22T09:15:00Z",
  },
  {
    img: "https://example.com/image4.jpg",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    mobile: 6543210987,
    designation: "DevOps Engineer",
    gender: "Male",
    course: "Cloud Computing",
    createDate: "2024-11-21T11:45:00Z",
  },
  {
    img: "https://example.com/image5.jpg",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    mobile: 5432109876,
    designation: "Product Designer",
    gender: "Female",
    course: "UX Design",
    createDate: "2024-11-20T16:20:00Z",
  },
  {
    img: "https://example.com/image6.jpg",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    mobile: 4321098765,
    designation: "Technical Lead",
    gender: "Male",
    course: "Software Architecture",
    createDate: "2024-11-19T12:00:00Z",
  },
];

const seedDB = async () => {
  await Employe.insertMany(Employes);
  console.log("DB is seeded!!!");
};

module.exports = seedDB;
