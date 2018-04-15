var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./footwearController');
var auth = require('../../auth/auth');
var multer = require('multer');

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

var storage = multer.diskStorage({
  
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' ){
     cb(null, new Date().getTime()+'.jpg');      
    }else{
      console.log('These files are not allowed');
    }
  }
});  
var upload = multer({ storage: storage });

// setup boilerplate route just to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(checkUser ,controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

router.route('/uploads')
  .post(upload.array("uploads[]", 12),controller.upload)


module.exports = router;
