var userService = require('../services/userService');
const path = require('path');
const jwt = require('jsonwebtoken');
const secretKey = 'abc@123';

var login = async (req, res) => {
    try {
        const user = await userService.login(req.body);

        const token = await generateToken(user);
        console.log(token);
        console.log(user.role);

        res.set('authorization', `Bearer ${token}`);

        // Redirect based on user role
        if (user.role === 'admin') {
            res.status(200).json({ status: true, message: 'admin', token, user });
        } else if (user.role === 'teacher') {
            res.status(200).json({ status: true, message: 'teacher', token, user });
        } else if (user.role === 'pStudent') {
            res.status(200).json({ status: true, message: 'pStudent', token, user });
        } else if (user.role === 'lsStudent') {
            res.status(200).json({ status: true, message: 'lsStudent', token, user });
        } else if (user.role === 'usStudent') {
            res.status(200).json({ status: true, message: 'usStudent', token, user });
        } else {
            res.status(200).json({ status: false, message: 'Invalid role', token });
        }
    } catch (error) {
        res.send({ status: false, message: error.message });
    }
};



async function generateToken(user) {
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  
    // Check if the user role is 'pStudent', 'lsStudent', or 'usStudent'
    if (['pStudent', 'lsStudent', 'usStudent'].includes(user.role)) {
      payload.class = user.class1;
    }
  
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  }
  

var getStudentUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const filteredUsers = users.filter(user => ['lsStudent', 'pStudent', 'usStudent'].includes(user.role));

        res.status(200).json({ status: true, data: filteredUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, data: [] });
    }
}

var getAdminUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      const filteredUsers = users.filter(user => user.role === 'admin');
      
      res.status(200).json({ status: true, data: filteredUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, data: [] });
    }
  };
  

var getTeacherUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      const filteredUsers = users.filter(user => user.role === 'teacher');
      
      res.status(200).json({ status: true, data: filteredUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, data: [] });
    }
  };
  

const createUser = async (req, res) => {
    try {
        const status = await userService.createUser(req.body);
        if (status) {
            res.status(200).json({ status: true, message: 'User created successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error creating user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'An error occurred while creating the user' });
    }
};



var updateUser = async (req, res) => {
    const email = req.params.email;
    try {
        const status = await userService.updateUser(email, req.body);
        if (status) {
            res.send({ status: true, message: "User updated successfully" });
        } else {
            res.send({ status: false, message: "Error updating user" });
        }
    } catch (error) {
        res.send({ status: false, message: "Error updating user", error });
    }
};

var deleteUser = async (req, res) => {
    var email = req.params.email;
    var status = await userService.deleteUser(email);
    if (status) {
        res.send({ "status": true, "message": "User deleted successfully" });
    } else {
        res.send({ "status": false, "message": "Error deleting user" });
    }
};



var getAllClasses = async (req, res) => {
    var email = req.params.email;
    var classes = await userService.getAllClasses(email);
    if (classes) {
        res.send({ "status": true, "message": "Classes found", classes });
    }
    else {
        res.send({ "status": false, "message": "Error finding Classes" });
    }
    

}


module.exports = { login, getStudentUsers, getAdminUsers, getTeacherUsers, createUser, updateUser, deleteUser, getAllClasses };
