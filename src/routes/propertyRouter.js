import express from "express";
import PropertyController from "../controller/Property.js";

const {
  createProperty,
  updateProperty,
  markPropertyAsSold,
  deleteProperty,
  getAllProperty,
  getPropertiesByType,
} = PropertyController;

const propertyRouter = express.Router();

propertyRouter.post("/property", createProperty);
propertyRouter.put("/property/:id/:user_id", updateProperty);
propertyRouter.patch("/property/:id", markPropertyAsSold);
propertyRouter.delete("/property/:id", deleteProperty);
propertyRouter.get("/property", getAllProperty);
propertyRouter.get("/property/type/:type", getPropertiesByType);

export default propertyRouter;