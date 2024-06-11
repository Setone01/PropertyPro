import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import db from "../config/index.js";
import {
  deletePropQuery,
  findOneQuery,
  queryAdvert,
  queryAllProperty,
  queryProperty,
  queryPropertyByType,
  updateProperty,
  updateStatus,
} from "../database/sql";
// import { Stats } from "fs-extra";

const PropertyController = {
  //create a property

  async createProperty(req, res) {
    console.log("property", req.authData.payload.id);
    const {
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
      uuidv4(),
      req.authData.payload.id,
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
    const propId = req.params.id;
    const { id } = req.authData.payload;
    const {
      title,
      status,
      price,
      type,
      state,
      city,
      bedrooms,
      description,
      image_url,
    } = req.body;

    const modified_date = moment().format("YYYY-MM-DD HH:mm:ss");
    const created_date = moment()
      .subtract(1, "year")
      .format("YYYY-MM-DD HH:mm:ss");

    try {
      const checkPropertyParams = [propId, id];
      console.log("params", checkPropertyParams);
      const { rows } = await db.query(findOneQuery, checkPropertyParams);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "Property not found",
        });
      }
      const value = [
        title,
        status,
        price,
        type,
        state,
        city,
        bedrooms,
        description,
        image_url,
        created_date,
        modified_date,
        propId,
        id,
      ];
      const result = await db.query(updateProperty, value);
      const propUpdate = result.rows[0];
      return res
        .status(201)
        .json({ message: "Property update succesfully", propUpdate });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "unable to update property",
      });
    }
  },

  //mark property as sold

  async markPropertyAsSold(req, res) {
    const { markProp } = req.body;
    const { userId } = req.authData.payload;

    if (markProp.status === "available") {
      try {
        const { rows, rowCount } = await db.query(
          updateStatus[("sold", markProp.id, userId)]
        );
        if (rowCount !== 0) {
          return res.status(200).json({
            message: "Property advert is marked as sold",
            data: rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          error: "This property does not exist",
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          error: "Error marking the property as sold",
        });
      }
    }
    return res.status(422).json({
      status: 422,
      error: "This property has already been marked sold",
    });
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

  //view property of specific advert

  async specificAdvert(req, res) {
    const { id } = req.body;

    try {
      const { rows } = await db.query(queryAdvert, [id]);
      if (rows.length === 0) {
        res.status(404).json({
          status: 404,
          message: "No property found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Internal server error",
        message: error.meesage,
      });
    }
  },
};

export default PropertyController;
