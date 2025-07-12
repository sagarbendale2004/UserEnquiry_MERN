import React, { useEffect, useState } from "react";
import axios from "axios";
import EnquiryList from "./enquiry/EnquiryList.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function UserEnquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAllEnquiryList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/web/enquiry/enquiry-list"
      );
      if (res.data.status) {
        setEnquiryList(res.data.enquiryList);
      }
    } catch (error) {
      toast.error("Failed to fetch enquiry list");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData._id) {
        // 1. Perform the update
        const res = await axios.put(
          `http://localhost:8000/api/web/enquiry/enquiry-update/${formData._id}`,
          formData
        );

        toast.success("Enquiry updated successfully");

        // 2. Refresh the list (make sure it's awaited)
        await getAllEnquiryList();

        // 3. Then reset the form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "",
        });
      } else {
        const res = await axios.post(
          "http://localhost:8000/api/web/enquiry/enquiry-insert",
          formData
        );

        toast.success("Enquiry saved successfully");

        await getAllEnquiryList();

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "",
        });
      }
    } catch (error) {
      toast.error("Submission failed");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEnquiryList();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <ToastContainer />
      <div className="py-8 bg-white text-center text-3xl font-bold">
        User Enquiry
      </div>

      <div className="flex flex-1 overflow-hidden gap-4">
        {/* Left - Form */}
        <div className="w-[30%] p-6 bg-gray-200 overflow-auto">
          <h2 className="text-xl mb-4 text-left font-bold">Enquiry Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-left">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-left">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-left">
                Your Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Your Phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-left">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
            >
              {formData._id ? "Update" : "Save"}
            </button>
          </form>
        </div>

        {/* Right - List */}
        <EnquiryList
          data={enquiryList}
          getAllEnquiryList={getAllEnquiryList}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
