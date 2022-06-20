const Category = require('../models/Category');
const CategoryRouter = require('express').Router();

//CRUD routes

CategoryRouter.get('/', async (req, res) => {
    try {
        let allCategory = await new Category().GetAllCategory();
        res.status(200).json(allCategory);
    } catch (error) {
        res.status(500).json({ error });
    }
});

CategoryRouter.get('/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let category = await new Category().GetCategoryByID(id);
        if (category.name_category == undefined) 
            res.status(404).json({ message: 'Category not found', category });
        else
            res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error });
    }
});

CategoryRouter.post('/add', async (req, res) => {

    let {name_category} = req.body;
    let category = new Category(name_category)
    try {
        let result = await category.InsertNewCategory();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});

CategoryRouter.put('/:id', async (req, res) => {
    let {id} = req.params;
    let {name_category} = req.body;
    try {
        let result = await new Category( name_category).UpdateCategoryById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

CategoryRouter.delete('/:id', async (req, res) => {
    let {id} = req.params;
    try {
        let result = await new Category().DeleteCategory(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});


module.exports = CategoryRouter;