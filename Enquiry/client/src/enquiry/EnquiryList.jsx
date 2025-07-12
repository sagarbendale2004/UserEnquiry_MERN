import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EnquiryList({ data, getAllEnquiryList, setFormData }) {
  const deleteRow = async (delId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/web/enquiry/enquiry-delete/${delId}`
      );
      toast.success("Enquiry deleted successfully");
      await getAllEnquiryList();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const editRow = (item) => {
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      message: item.message,
      _id: item._id,
    });
  };

  return (
    <div className="w-[70%] p-6 overflow-auto bg-gray-200 border border-gray-300">
      <h2 className="text-xl mb-4 text-left font-bold">Enquiry List</h2>
      <table className="w-full text-left bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">SR NO</th>
            <th className="px-4 py-2 border">NAME</th>
            <th className="px-4 py-2 border">EMAIL</th>
            <th className="px-4 py-2 border">PHONE</th>
            <th className="px-4 py-2 border">MESSAGE</th>
            <th className="px-4 py-2 border">DELETE</th>
            <th className="px-4 py-2 border">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.phone}</td>
                <td className="px-4 py-2 border">{item.message}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteRow(item._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => editRow(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EnquiryList;
