const {Router} = require('express');
const router = Router();
const { getTypes } = require('../controllers/types.js');

router.get('/types', getTypes);//getalls

module.exports = router;