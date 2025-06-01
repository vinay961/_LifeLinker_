import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../CreateEmployee/CreateEmployee.css'; 

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
    previewImage: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employee/getEmployee/${id}`, {
          withCredentials: true
        });
        const emp = res.data.employee;

        setFormData({
          name: emp.name,
          email: emp.email,
          mobile: emp.mobile,
          designation: emp.designation,
          gender: emp.gender,
          courses: emp.courses || [],
          image: null,
          previewImage: emp.image || ''
        });
      } catch (err) {
        console.error("Error fetching employee:", err);
        alert("Failed to load employee data.");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((c) => c !== value),
      }));
    } else if (type === 'radio') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        previewImage: URL.createObjectURL(files[0])
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.mobile || isNaN(formData.mobile)) newErrors.mobile = "Valid mobile number required";
    if (!formData.designation) newErrors.designation = "Select a designation";
    if (!formData.gender) newErrors.gender = "Select gender";
    if (formData.courses.length === 0) newErrors.courses = "Select at least one course";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'courses') {
        data.append(key, JSON.stringify(value));
      } else if (key !== 'previewImage') {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.put(
        `http://localhost:5000/api/employee/editEmployee/${id}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      if (res.status === 200) {
        alert("Employee updated successfully!");
        navigate('/employees');
      } else {
        alert("Failed to update employee.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="simple-form">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Mobile:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        {errors.mobile && <span className="error">{errors.mobile}</span>}

        <label>Designation:</label>
        <select name="designation" value={formData.designation} onChange={handleChange}>
          <option value="">-- Select --</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        {errors.designation && <span className="error">{errors.designation}</span>}

        <label>Gender:</label>
        <div>
          <label>
            <input type="radio" name="gender" value="M" checked={formData.gender === "M"} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="F" checked={formData.gender === "F"} onChange={handleChange} /> Female
          </label>
        </div>
        {errors.gender && <span className="error">{errors.gender}</span>}

        <label>Courses:</label>
        <div>
          <label><input type="checkbox" value="MCA" checked={formData.courses.includes("MCA")} onChange={handleChange} /> MCA</label>
          <label><input type="checkbox" value="BCA" checked={formData.courses.includes("BCA")} onChange={handleChange} /> BCA</label>
          <label><input type="checkbox" value="BSC" checked={formData.courses.includes("BSC")} onChange={handleChange} /> BSC</label>
        </div>
        {errors.courses && <span className="error">{errors.courses}</span>}

        <label>Image:</label>
        {formData.previewImage && <img src={formData.previewImage} alt="preview" width="80" style={{ marginBottom: "10px", borderRadius: "50%" }} />}
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {errors.image && <span className="error">{errors.image}</span>}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
