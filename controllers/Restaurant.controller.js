const router = require('express').Router();
const RestaurantModel = require('../models/Restauraunt.model')

router.use('/', async function(req,res,next){
    RestaurantModel.find()
    .select(
      "_id name category city state address pincode cuisine foodType isOpen"
    )
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({
          message: "Restaurant fetched successfully",
          data: response,
        });
      } else {
        return res.status(200).json({
          message: "No restaurants found",
          data: response,
        });
      }
    })
    .catch((error) => {
      return res.status(201).json({
        error: error,
      });
    });
});

router.get("/:id", (req, res, next) => {
    const { id = "" } = req.params;
    RestaurantModel.findById({
      _id: id,
    })
      .select(
        "_id name category city state address pincode cuisine foodType isOpen"
      )
      .then((response) => {
        if (response._id) {
          return res.status(200).json({
            message: "Restaurant fetched successfully",
            data: response,
          });
        } else {
          return res.status(200).json({
            message: "No restaurants found",
            data: response,
          });
        }
      })
      .catch((error) => {
        return res.status(201).json({
          error: error,
        });
      });
  });

  router.post("/addRestaurant", (req, res, next) => {
    const {
      name = "",
      category = "",
      city = "",
      state = "",
      address = "",
      pincode = "",
      cuisine = [],
      foodType = [],
    } = req.body;
    console.log(req);
    const Restaurant = new RestaurantModel({
      name: name,
      category: category,
      city: city,
      state: state,
      address: address,
      pincode: pincode,
      cuisine: cuisine,
      foodType: foodType,
    });
    Restaurant.save()
    .then((response) => {
      if (response._id) {
        return res.status(200).json({
          data: response,
          message: "Restaurant added successfully!",
        });
      } else {
        return res.status(500).json({
          message: "Error Occured!",
        });
      }
    })
    .catch((e) =>
      res.status(400).json({
        error: e.message,
      })
    );
});

router.put("/:id", (req, res, next) => {
    const { id = "" } = req.params;
    /**
     * findByIdAndUpdate - Will update the restaurant data in DB
     */
    RestaurantModel.findByIdAndUpdate(id, req.body)
      .then((response) => {
        if (response) {
          return res.status(200).json({
            data: response,
            message: "Restaurant added successfully!",
          });
        } else {
          return res.status(500).json({
            message: "Error Occured!",
          });
        }
      })
      .catch((e) =>
        res.status(400).json({
          error: e.message,
        })
      );
  });

module.exports = router;