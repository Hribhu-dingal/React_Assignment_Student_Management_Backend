const fs = require("fs");
const path = require("path");
const Student = require("../model/student");

class StudentController {
  async getStudentList(req, res) {
    try {
      const students = await Student.find();
      res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  async getStudent(req, res) {
    try {
      const student = await Student.findById(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
      res.status(200).json({
        success: true,
        data: student,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  async addStudent(req, res) {
    try {
      const student = await Student.create(req.body);

      res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: student,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
}

module.exports = new StudentController();
