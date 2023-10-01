const express = require('express');
const authentication = require('../middleware/auth');
const msgController = require('../controllers/message');
const multer = require('multer');

const router = express.Router();

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null,'./send-image');
     },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({storage}); */

let upload = multer({
    limits:1024 * 1024 * 1024 * 5,
    fileFilter: function(req, file, done){
        if(file.mimetype === 'image/jpeg' || 'image/png' || 'image/jpg'){
            done(null, true)
        }
        else{
            done('multer error - file type is not supported',false)
        }
    }
}); 
router.post('/msg-send',authentication.authentication,msgController.PostMessage);
router.get('/get-msg', authentication.authentication,msgController.getMsg);
router.post('/send-image', upload.single('image'),msgController.sendImage);

module.exports = router;