var express = require('express');
var router = express.Router();
var path = require('path');

var changeFormatController = require('../controllers/changeFormatController');


router.get('/',function(req,res)
{
    res.render('index.ejs');
});

router.post('/', changeFormatController.changeFormat);

module.exports = router;