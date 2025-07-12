import mongoose from "mongoose";

let userEnquirySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  message: {
    type: String,
    required: true,
  },
});

let enquiryModel = mongoose.model("enquiry", userEnquirySchema); // enquiry is collection name, while userEnquirySchema is fields in collection.

export default enquiryModel;
