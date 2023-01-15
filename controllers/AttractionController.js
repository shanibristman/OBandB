const Attrction = require('../models/Attrction');
const AttrctionRouter = require('express').Router();

//CRUD routes

AttrctionRouter.get('/', async (req, res) => {
    try {
        let allAttrction = await new Attrction().GetAllActiveAttrction();
        res.status(200).json(allAttrction);
    } catch (error) {
        res.status(500).json({ error });
    }
});

AttrctionRouter.get('/all', async (req, res) => {
    try {
        let allAttrction = await new Attrction().GetAllAttrction();
        res.status(200).json(allAttrction);
    } catch (error) {
        res.status(500).json({ error });
    }
});


AttrctionRouter.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let attrction = await new Attrction().GetAttrctionByID(id);
        if (attrction.attrction_name == undefined) 
            res.status(404).json({ message: 'attrcrion not found', attrction });
        else
            res.status(200).json(attrction);
    } catch (error) {
        res.status(500).json({ error });
    }
});

AttrctionRouter.post('/add', async (req, res) => {

    let {owner_id, attrction_name,catagory,rate, city, address,
    people_amount, age,description,start_time,price,img, duration,home_screen_img ,privateOwner,isActive,isApproved} = req.body;
    let attrction = new Attrction(owner_id, attrction_name,catagory,rate, city, address,
        people_amount, age,description,start_time,price,img, duration,home_screen_img ,privateOwner,isActive,isApproved)
    try {
        let result = await attrction.InsertNewAttrction();
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
});

AttrctionRouter.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {owner_id, attrction_name,catagory,rate, city, address,
        people_amount, age,description,start_time,price,img, duration,home_screen_img ,privateOwner,isActive,isApproved} = req.body;
    try {
        let result = await new Attrction(owner_id, attrction_name,catagory,rate, city, address,
            people_amount, age,description,start_time,price,img, duration,home_screen_img ,privateOwner,isActive,isApproved).UpdateAttrctionById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

AttrctionRouter.put('/beActive/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new Attrction().activeAttrction(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});

AttrctionRouter.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new Attrction().DeleteAttrction(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});


module.exports = AttrctionRouter;