const Business = require('../models/Business');
const BusinessRouter = require('express').Router();

//CRUD routes

BusinessRouter.get('/', async (req, res) => {
    try {
        let allB = await new Business().GetAllActiveBusiness();
        res.status(200).json(allB);
    } catch (error) {
        res.status(500).json({ error });
    }
});

BusinessRouter.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let business = await new Business().GetBusinessByID(id);
        if (business.name == undefined) 
            res.status(404).json({ message: 'Business not found', business });
        else
            res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ error });
    }
});

BusinessRouter.post('/add', async (req, res) => {

    let {name,city,adress,email,phone_number,password,img,logoImg, description,categories,
        sells_history,items} = req.body;
    let business = new Business( name,city,adress,email,phone_number,password,img,logoImg,description,categories,
        sells_history,items)
    try {
        let result = await business.InsertNewBusiness();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});

BusinessRouter.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {name,city,adress,email,phone_number,password,img,logoImg, description,categories,
        sells_history,items} = req.body;
    try {
        let result = await new Business(name,city,adress,email,phone_number,password,img,logoImg, description,categories,
            sells_history,items).UpdateBuById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

BusinessRouter.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new Business().DeleteBusiness(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});


module.exports = BusinessRouter;