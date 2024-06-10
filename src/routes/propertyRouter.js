import express from "express";
import PropertyController from "../controller/Property.js";
import { verifyToken } from "../middleware/auth.js";

const {
  createProperty,
  updateProperty,
  markPropertyAsSold,
  deleteProperty,
  getAllProperty,
  getPropertiesByType,
  specificAdvert,
} = PropertyController;

const propertyRouter = express.Router();

propertyRouter.post("/property", verifyToken, createProperty);
propertyRouter.put("/property/:id", verifyToken, updateProperty);
propertyRouter.patch("/property/:id", markPropertyAsSold);
propertyRouter.delete("/property/:id", verifyToken, deleteProperty);
propertyRouter.get("/property", getAllProperty);
propertyRouter.get("/property/type/:type", getPropertiesByType);
propertyRouter.get("/property/:id", specificAdvert);

export default propertyRouter;
