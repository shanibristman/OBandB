const DB = require('../utils/db');

class Attrction {
    owner_id;
    attrction_name;
    catagory;
    rate;
    city;
    address;
    people_amount;
    age;
    description;
    start_time;
    price;
    duration;
    img;
    isActive;
    privateOwner;
    home_screen_img;

    constructor( owner_id="", attrction_name="",catagory="",rate="", city="", address="",
        people_amount="", age="",description="",start_time="",price="",img="", duration="", privateOwner="",home_screen_img="") {
        this.owner_id = owner_id;
        this.attrction_name = attrction_name;
        this.catagory=catagory;
        this.rate=rate;
        this.city=city;
        this.address=address;
        this.people_amount=people_amount;
        this.age=age;
        this.description=description;
        this.start_time = start_time;
        this.price=price;
        this.duration=duration;
        this.privateOwner=privateOwner;
        this.isActive=true;
        this.img=img;
        this.home_screen_img=home_screen_img;

    }

    async GetAllActiveAttrction() {
        try {
            return await new DB().FindAll('Attrction', { isActive: true });

        } catch (error) {
            return error;
        }
    }

    async GetAllAttrction() {
        try {
            return await new DB().FindAll('Attrction');
        } catch (error) {
            return error;
        }
    }

    async GetAttrctionByID(id) {
        try {
            return await new DB().FindByID('Attrction', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async InsertNewAttrction() {
        try {
            return await new DB().Insert('Attrction', this); 
        } catch (error) {
            return error;
        } 
    }

    async UpdateAttrctionById(id) {
        try {
            return await new DB().UpdateDocById('Attrction', id, this);
        } catch (error) {
            console.log(error);
            return error;
        } 
    }

    async DeleteAttrction(id) {
        try {
            return await new DB().DeactivateDocById('Attrction',id);
        } catch (error) {
            return error;
        }
    }

    async activeAttrction(id) {
        try {
            return await new DB().activateDocById('Attrction',id);
        } catch (error) {
            return error;
        }
    }
}

module.exports = Attrction;