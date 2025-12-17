import React, { useState } from "react";
import "../assets/Form.css";
import axios from "axios";

function Form() {
  const [formdata, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: ""
  });

  const [data, setData] = useState([]);

  const { name, age, email, phone } = formdata;

  const [editIndex, setEditIndex] = useState(null);

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ VALIDATION FIRST
  if (!name || !age || !email || !phone) {
    setError("All fields are required");
    return;
  }

  // ✅ Clear error if valid
  setError("");

  // API call (optional)
  axios
    .post("https://jsonplaceholder.typicode.com/posts", formdata)
    .then((res) => console.log("API response:", res.data))
    .catch((err) => console.log(err));

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    setError("Name should contain alphabets only");
    return;
  }

  setError("");

  if (editIndex !== null) {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === editIndex ? formdata : item
      )
    );
    setEditIndex(null);
  }
  // ✅ ADD MODE
  else {
    setData((prevData) => [...prevData, formdata]);
  }

  // ✅ RESET FORM
  setFormData({ name: "", age: "", email: "", phone: "" });
};


  // Edit row
  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditIndex(index);
  };

  // Delete row
  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="form">
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <h2>Student Registration Form</h2>
        {error && <p className="error">{error}</p>}
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter Age"
          name="age"
          value={age}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email Address"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="number"
          placeholder="Enter Contact Number"
          name="phone"
          value={phone}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      

      {/* TABLE */}
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Form;
