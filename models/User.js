const DB = require('../utils/db');

class User {
    first_name;
    last_name;
    email;
    phone_number;
    city;
    birth_date;
    categories;
    img;
    password;
    isActive;

    constructor( first_name = "", last_name = "",email="",phone_number="",
    city="",birth_date="",categories="",img="", password="") {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email=email;
        this.phone_number=phone_number;
        this.city=city;
        this.birth_date=birth_date;
        this.categories=categories;
        this.img=img;
        this.password=password;
        this.isActive = true;
    }

    async GetAllActiveUsers() {
        try {
            return await new DB().FindAll('Users', { isActive: true });

        } catch (error) {
            return error;
        }
    }

    async GetAllUsers() {
        try {
            return await new DB().FindAll('Users');
        } catch (error) {
            return error;
        }
    }

    async GetUserByID(id) {
        try {
            return await new DB().FindByID('Users', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async InsertNewUser() {
        try {
            return await new DB().Insert('Users', this); 
        } catch (error) {
            return error;
        } 
    }

    async UpdateUserById(id) {
        try {
            return await new DB().UpdateDocById('Users', id, this);
        } catch (error) {
            console.log(error);
            return error;
        } 
    }

    async DeleteUser(id) {
        try {
            return await new DB().DeactivateDocById('Users',id);
        } catch (error) {
            return error;
        }
    }
}

module.exports = User;