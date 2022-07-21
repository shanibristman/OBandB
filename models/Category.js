const DB = require('../utils/db');

class Category {
    name_category;

    constructor(name_category="") {
        this.name_category = name_category;
    }

    async GetAllCategory() {
        try {
            return await new DB().FindAll('Category');
        } catch (error) {
            return error;
        }
    }

    async GetCategoryByID(id) {
        try {
            return await new DB().FindByID('Category', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async InsertNewCategory() {
        try {
            return await new DB().Insert('Category', this); 
        } catch (error) {
            return error;
        } 
    }

    async UpdateCategoryById(id) {
        try {
            return await new DB().UpdateDocById('Category', id, this);
        } catch (error) {
            console.log(error);
            return error;
        } 
    }

    async DeleteCategory(id) {
        try {
            return await new DB().DeactivateDocById('Category',id);
        } catch (error) {
            return error;
        }
    }
}

module.exports = Category;