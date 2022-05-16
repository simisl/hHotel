import { hotelctrl } from '../controllers/hotelController.js';
import express from 'express';
import bodyparser from 'body-parser';
const router = express.Router()
router.use(bodyparser.json())

router.get('/hotelDetails',hotelctrl.hotelDetails)
router.put('/updateVisitors/:id',hotelctrl.updatevisitors)
router.post('/saveDraft', hotelctrl.savedraft)
router.get('/filterHotel/:data', hotelctrl.filterhotel)
router.put('/hotelBooking', hotelctrl.hotelbooking)
router.post('/loginUser/', hotelctrl.loginuser)
router.get('/viewBooking/:id/:status', hotelctrl.viewbooking)
export const route = {router}
