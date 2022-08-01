const User = require('../models/User');
const UserRouter = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')

cloudinary.config({
    secure: true
  });
//   console.log(cloudinary.config());

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    },
})
const upload = multer({ storage: fileStorageEngine });
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

UserRouter.post('/logIn', async (req, res) => {
    let { email, password} = req.body;
    try {
        let user = await new User().GetUserByEmail(email);
        if (user.length !== 0 && user[0].password === password) {
            res.status(200).json(user[0]);
        }
        else{
            res.status(404).json({ message: 'user not found', user });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

UserRouter.post('/add', async (req, res) => {

    let { first_name, last_name, email, phone_number, city, birth_date
        , categories,img, password } = req.body;
    let user = new User(first_name, last_name, email, phone_number, city, birth_date
        , categories, img, password)
    try {
        let result = await user.InsertNewUser();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error })
    }
});

UserRouter.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { first_name, last_name, email, phone_number, city, birth_date
        , categories, img, password } = req.body;
    try {
        let result = await new User(first_name, last_name, email, phone_number, city, birth_date
            , categories, img, password).UpdateUserById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error });
    }
});

UserRouter.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let result = await new User().DeleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        es.status(500).json({ error });
    }
});

UserRouter.post('/uploadImg', upload.single('image'), async (req, res) => {
    try {
        let image = req.file.path;

        let resultImg = await cloudinary.uploader.upload(image, {
            resource_type: 'image',
            folder: "Users"

        })

        res.status(200).json({url:resultImg.secure_url});

        // let user = await new User().GetUserByEmail(req.body.email);
        // user = user[0];
        // user.img = resultImg.secure_url;
        // let result = await new User(user.first_name, user.last_name, user.email, user.phone_number, user.city, user.birth_date
        //     , user.categories, user.img, user.password).UpdateUserById(user._id);
        // if (result.acknowledged){
        //     res.status(200).json(user);
        // }
        // res.status(500).json(result);
        
    }
    catch (err) {
        res.status(500).json(err);
    }
});




module.exports = UserRouter;