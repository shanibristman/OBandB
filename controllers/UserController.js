const User = require('../models/User');
const UserRouter = require('express').Router();

//CRUD routes

UserRouter.get('/', async (req, res) => {
    try {
        let allUser = await new User().GetAllActiveUsers();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UserRouter.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let user = await new User().GetUserByID(id);
        if (user.first_name == undefined) 
            res.status(404).json({ message: 'user not found', user });
        else
            res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UserRouter.post('/add', async (req, res) => {

    let {first_name,last_name,email,phone_number,city,birth_date
        ,categories,img, password} = req.body;
    let user = new User( first_name,last_name,email,phone_number,city,birth_date
        ,categories,img, password)
    try {
        let result = await user.InsertNewUser();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});

UserRouter.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {first_name,last_name,email,phone_number,city,birth_date
        ,categories,img, password} = req.body;
    try {
        let result = await new User( first_name,last_name,email,phone_number,city,birth_date
            ,categories,img, password).UpdateUserById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UserRouter.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new User().DeleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});


module.exports = UserRouter;