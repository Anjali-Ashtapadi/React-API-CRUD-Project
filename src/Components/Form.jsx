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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && age && email && phone) {
      // API call (optional, for learning)
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formdata)
        .then((res) => console.log("API response:", res.data))
        .catch((err) => console.log(err));

      // Add form data to table
      setData([...data, formdata]);

      // Reset form
      setFormData({ name: "", age: "", email: "", phone: "" });
    }
  };

  // Edit row
  const handleEdit = (index) => {
    setFormData(data[index]);
    handleDelete(index);
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
