const Employe = require("../models/Employe.js");

const path = require("path");
const cloudinary = require("cloudinary").v2;

require("dotenv").config(); // To read environment variables

const AllEmpolye = async (req, res) => {
  try {
    const Empl = await Employe.find({});
    res.status(200).json({ Empl, massage: "All Employe!!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

const { Readable } = require("stream"); // Import stream module

const addEmploye = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const img = req.file; // The uploaded file

    console.log("Form Data:", {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });
    console.log("Uploaded File:", img);

    // If no file is uploaded, return an error
    if (!img) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Convert buffer to readable stream
    const bufferToStream = (buffer) => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      return stream;
    };

    // Upload to Cloudinary using a promise
    const uploadImageToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            timeout: 60000, // 60 seconds timeout
          },
          (error, result) => {
            if (error) {
              reject(error); // Reject if error occurs
            } else {
              resolve(result); // Resolve with the result on success
            }
          }
        );

        // Create a stream from the buffer and pipe it to the uploadStream
        const readableStream = bufferToStream(img.buffer);
        readableStream.pipe(uploadStream);
      });
    };

    // Wait for Cloudinary upload to finish
    const cloudinaryResult = await uploadImageToCloudinary();

    // Successfully uploaded image to Cloudinary
    const imgUrl = cloudinaryResult.secure_url;

    // Parse course field if it was sent as a JSON string
    // const courses = JSON.parse(course);

    const newEmployee = await Employe.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      img: imgUrl,
    });

    // Respond with success
    res.json({
      message: "Employee data received successfully!",
      data: {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        imgUrl, // Cloudinary image URL
      },
    });
  } catch (error) {
    console.error("Error processing the form:", error);
    res.status(500).json({
      message: "Error processing the form data",
      error: error.message,
    });
  }
};

const getEmploye = async (req, res) => {
  try {
    const Empl2 = await Employe.findById(req.params.id);
    // console.log(Empl2);
    // console.log(req.params.id);
    // res.send(Prod);
    res.status(200).json({ Empl2, massage: "Get Particular Employe!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};

// const editEmploye = async (req, res) => {
//   try {
//     const Empl3 = await Employe.findByIdAndUpdate(req.params.id, req.body);
//     // res.send(Prod);
//     res.status(200).json({ Empl3, massage: "Edit Employe!!!" });
//   } catch (err) {
//     res.status(400).json({ error: err.massage });
//   }
// };

const deleteEmploye = async (req, res) => {
  try {
    const Empl4 = await Employe.findByIdAndDelete(req.params.id);
    // res.send(Prod);
    res.status(200).json({ Empl4, massage: "Delete Employe!!!" });
  } catch (err) {
    res.status(400).json({ error: err.massage });
  }
};
const editEmploye = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    const file = req.file; // Uploaded file

    let isUpload = true;

    if (file === undefined) {
      isUpload = req.body.isUpload;
    }

    console.log("Form Data:", {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });
    console.log("Uploaded File:", file);

    console.log(isUpload);
    console.log(typeof isUpload);
    // Check if the employee exists
    const existingEmployee = await Employe.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (isUpload === "false") {
      console.log("here");
      // Update employee fields
      existingEmployee.set({
        name: name || existingEmployee.name,
        email: email || existingEmployee.email,
        mobile: mobile || existingEmployee.mobile,
        designation: designation || existingEmployee.designation,
        gender: gender || existingEmployee.gender,
        course: course || existingEmployee.course,
        img: existingEmployee.img, // Updated or existing image URL
      });

      const updatedEmployee = await existingEmployee.save();

      res.status(200).json({
        message: "Employee updated successfully!",
        data: updatedEmployee,
      });
      return;
    }

    // Convert buffer to readable stream
    const bufferToStream = (buffer) => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      return stream;
    };

    // Upload to Cloudinary using a promise
    const uploadImageToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            timeout: 60000, // 60 seconds timeout
          },
          (error, result) => {
            if (error) {
              reject(error); // Reject if error occurs
            } else {
              resolve(result); // Resolve with the result on success
            }
          }
        );

        // Create a stream from the buffer and pipe it to the uploadStream
        const readableStream = bufferToStream(file.buffer);
        readableStream.pipe(uploadStream);
      });
    };

    // Wait for Cloudinary upload to finish
    const cloudinaryResult = await uploadImageToCloudinary();

    // Successfully uploaded image to Cloudinary
    const imgUrl = cloudinaryResult.secure_url;

    // Parse course field if it was sent as a JSON string
    // const courses = JSON.parse(course);

    // Update employee fields
    existingEmployee.set({
      name: name || existingEmployee.name,
      email: email || existingEmployee.email,
      mobile: mobile || existingEmployee.mobile,
      designation: designation || existingEmployee.designation,
      gender: gender || existingEmployee.gender,
      course: course || existingEmployee.course,
      img: imgUrl, // Updated or existing image URL
    });

    const updatedEmployee = await existingEmployee.save();

    res.status(200).json({
      message: "Employee updated successfully!",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "Error updating employee",
      error: error.message,
    });
  }
};

module.exports = {
  AllEmpolye,
  addEmploye,
  getEmploye,
  editEmploye,
  deleteEmploye,
};
