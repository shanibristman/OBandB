const DB = require('../utils/db');

class Business {
    name;
    city;
    adress;
    email;
    phone_number;
    password;
    img;
    description;
    categories;
    sells_history;
    items;//atrctions
    isActive;

    constructor( name="", city="", adress="", email="",phone_number="" ,password="",
        img="",description="",categories="",sells_history="", items="") {
        this.name = name;
        this.city=city;
        this.adress = adress;
        this.email=email;
        this.phone_number=phone_number;
        this.password=password;
        this.img=img;
        this.description=description;
        this.categories=categories;
        this.sells_history=sells_history;
        this.items=items;
        this.isActive = true;
    }

    async GetAllActiveBusiness() {
        try {
            return await new DB().FindAll('Business', { isActive: true });

        } catch (error) {
            return error;
        }
    }

    async GetAllBusiness() {
        try {
            return await new DB().FindAll('Business');
        } catch (error) {
            return error;
        }
    }

    async GetBusinessByID(id) {
        try {
            return await new DB().FindByID('Business', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async InsertNewBusiness() {
        try {
            return await new DB().Insert('Business', this); 
        } catch (error) {
            return error;
        } 
    }

    async UpdateBusinessById(id) {
        try {
            return await new DB().UpdateDocById('Business', id, this);
        } catch (error) {
            console.log(error);
            return error;
        } 
    }

    async DeleteBusiness(id) {
        try {
            return await new DB().DeactivateDocById('Business',id);
        } catch (error) {
            return error;
        }
    }
}

module.exports = Business;