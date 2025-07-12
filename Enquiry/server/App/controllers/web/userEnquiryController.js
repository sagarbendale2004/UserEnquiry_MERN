import enquiryModel from "../../models/enquiryModel.js";

export let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({ status: "201", msg: "Data saved Successfully" });
    })
    .catch((err) => {
      res.send({ status: "404", msg: "Data inserting error", error: err });
    });
};

export let getEnquiryList = async (req, res) => {
  let enquiryList = await enquiryModel.find();
  res.send({
    status: 201,
    msg: "data fetched",
    enquiryList,
  });
};

export let deleteEnquiry = async (req, res) => {
  let enquiryId = req.params.id;
  let deleteEnquiry = await enquiryModel.deleteOne({ _id: enquiryId });
  res.send({
    status: 201,
    msg: "enquiry data deleted",
    id: enquiryId,
    delRes: deleteEnquiry,
  });
};

export let updateEnquiry = async (req, res) => {
  let enquiryId = req.params.id;
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let updateObj = {
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  };

  let updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);

  res.send({
    status: 201,
    msg: "enquiry data updated",
    id: enquiryId,
    updateRes,
  });
};
