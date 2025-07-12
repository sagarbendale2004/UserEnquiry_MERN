import express from "express";
import {
  enquiryInsert,
  getEnquiryList,
  deleteEnquiry,
  updateEnquiry,
} from "../../controllers/web/userEnquiryController.js";

let enquiryRoutes = express.Router();

enquiryRoutes.post("/enquiry-insert", enquiryInsert);

enquiryRoutes.get("/enquiry-list", getEnquiryList);

enquiryRoutes.delete("/enquiry-delete/:id", deleteEnquiry);

enquiryRoutes.put("/enquiry-update/:id", updateEnquiry);

export default enquiryRoutes;
