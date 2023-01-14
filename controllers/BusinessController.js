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

BusinessRouter.get('/all', async (req, res) => {
    try {
        let allB = await new Business().GetAllBusiness();
        res.status(200).json(allB);
    } catch (error) {
        res.status(500).json({ error });
    }
});

BusinessRouter.post('/logIn', async (req, res) => {
    let { email, password} = req.body;
    try {
        let user = await new Business().GetBusinessByEmail(email);
        if (user.length !== 0 && user[0].password === password) {
            res.status(200).json(user[0]);
        }
        else{
            res.status(404).json(null);
        }
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
        res.status(500).json({ error });
    }
});

BusinessRouter.put('/beActive/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new User().activeUser(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});

BusinessRouter.put('/sales/:id', async (req, res) => {
    let {id} = req.params;
    let {item} = req.body;
    console.log(id);
    console.log(item);
    try{
        let result = await new Business().AddSale(id, item);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(JSON.stringify(error));
    }
})


module.exports = BusinessRouter;