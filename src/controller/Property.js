import moment from "moment";
import db from "../config/index.js";
import {
  deletePropQuery,
  findOneQuery,
  markAsSold,
  queryAllProperty,
  queryProperty,
  queryPropertyByType,
  updateProperty,
} from "../database/sql";
import { uuid } from "uuidv4";

const PropertyController = {
  //create a property

  async createProperty(req, res) {
    const {
      user_id,
      title,
      status,
      type,
      price,
      city,
      state,
      bedrooms,
      description,
      image_url,
    } = req.body;

    const value = [
      uuid(),
      title,
      status,
      type,
      price,
      city,
      state,
      bedrooms,
      description,
      image_url,
    ];

    try {
      const { rows } = await db.query(queryProperty, value);

      if (!rows || rows.length === 0) {
        return res.status(500).json({
          message: "Failed to add property. No rows returned.",
        });
      }

      const newProperty = rows[0];

      return res.status(201).json({
        message: "Property added successfully!",
        newProperty,
      });
    } catch (error) {
      console.error("Error creating property:", error.message);
      return res.status(500).json({
        status: 500,
        error: "Internal Server Error",
        message: error.message,
      });
    }
  },

  //update uploaded property advert
  async updateProperty(req, res) {
    try {
      const { rows } = await db.query(findOneQuery, [
        req.params.id,
        req.params.user_id,
      ]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Property not found",
        });
      }
      const value = [
        req.body.title,
        req.body.price,
        req.body.city,
        req.body.state,
        req.body.bedrooms,
        req.body.description,
        moment(new Date()),
        req.body.imageUrl,
        req.params.id,
        req.params.user_id,
      ];
      const result = await db.query(updateProperty, value);
      const propUpdate = result.rows[0];
      return res
        .state(201)
        .json({ message: "Property update succesfull", propUpdate });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "unable to update property",
      });
    }
  },

  //mark property as sold

  async markPropertyAsSold(req, res) {
    try {
      const result = await db.query(markAsSold, [req.params.id]);
      return res
        .status(200)
        .json({ message: "Property advert is marked as sold", result });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: "Error marking the property as sold",
      });
    }
  },

  //Delete an advert
  async deleteProperty(req, res) {
    try {
      const { rowCount } = await db.query(deletePropQuery, [req.params.id]);
      if (rowCount > 0) {
        res.status(201).json({
          status: 404,
          error: "Property deleted successfully",
        });
      }
      return res.status(404).json({ message: "Product does not exist" });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: "Error deleting the property",
      });
    }
  },

  //get all property
  async getAllProperty(req, res) {
    try {
      const { rows } = await db.query(queryAllProperty);
      res.status(201).json({
        status: 201,
        message: "Properties fetched succesfully",
        rows,
      });
    } catch (error) {
      const { meesage } = error;
      res.status(500).json({
        status: 500,
        error: meesage,
      });
    }
  },

  // get properties by types

  async getPropertiesByType(req, res) {
    const { type } = req.params;

    try {
      const { rows } = await db.query(queryPropertyByType, [type]);
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          message: `No properties found for ${type}`,
        });
      }

      return res.status(201).json({
        status: 404,
        message: "Property found succesfully",
        properties: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error fetching properties by type",
      });
    }
  },
};

export default PropertyController;
