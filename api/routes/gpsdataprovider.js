const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/authentication.js');

//models import
import Data from '../models/gpsdata.js';



router.get('/get-small-charts-gpsdata', checkAuth, async (req, res) => {

  try {

    
    /* const chartTimeAgo = req.query.chartTimeAgo; */
    const userId = req.userData._id;
    const dId = req.query.dId;
    const variable = req.query.variable;


    /* const timeAgoMs = Date.now() - (chartTimeAgo * 60 * 1000 ); */

    console.log(userId)
    console.log(variable)
    console.log(dId)

   /*  const data =  await Data.find({userId: userId, dId:dId, variable: variable, "time": {$gt: timeAgoMs}}).sort({"time":1}); */
    const data =  await Data.find({userId: userId, dId:dId, variable: variable}).sort({"time":1});
    console.log(data);

    const response = {
      status: "success",
      data: data
    }

    return res.json(response)

  } catch (error) {

    console.log(error)

    const response = {
      status: "error",
      error: error
    } 

    return res.json(response);

  }

});

module.exports = router