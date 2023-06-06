const express = require('express');
const { fileUploader, upload } = require('../middlewares/multer');
const router = express.Router();
const userController = require('../controllers').userController;
//get
router.post('/v1', userController.login); //login
router.post('/v2', userController.loginV2); //login

router.post('/', userController.register); //register
router.get('/companies', userController.getCompanies); //register
router.get('/token', userController.getByToken);
// router.get('/token2', userController.getByTokenV2);
router.get('/v3', userController.getByTokenV2, userController.getUserByToken);
//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user
router.patch('/v4', userController.getByTokenV2, userController.changePassword);

router.get('/generate-token/email', userController.generateTokenByEmail);

router.post(
 '/image/v1/:id',
 fileUploader({
  destinationFolder: 'avatar'
 }).single('avatar'),
 userController.uploadAvatar
);

router.post(
 '/image/v2/:id',
 upload.single('avatar'),
 userController.uploadAvatarV2
);

router.get('/image/render/:id', userController.renderAvatar);

module.exports = router;
