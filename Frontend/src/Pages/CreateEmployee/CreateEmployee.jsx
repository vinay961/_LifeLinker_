import React, { useState } from 'react';
import './CreateEmployee.css';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter(c => c !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.mobile || isNaN(formData.mobile)) newErrors.mobile = "Valid mobile number required";
    if (!formData.designation) newErrors.designation = "Select designation";
    if (!formData.gender) newErrors.gender = "Select gender";
    if (formData.course.length === 0) newErrors.course = "Select at least one course";
    if (!formData.image) newErrors.image = "Upload image";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log(formData);
      // Reset
      setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null
      });
    }
  };

  return (
    <div className="simple-form">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Mobile No:</label>
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
          <label><input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} /> Female</label>
        </div>
        {errors.gender && <span className="error">{errors.gender}</span>}

        <label>Course:</label>
        <div>
          <label><input type="checkbox" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} /> MCA</label>
          <label><input type="checkbox" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} /> BCA</label>
          <label><input type="checkbox" value="BSC" checked={formData.course.includes('BSC')} onChange={handleChange} /> BSC</label>
        </div>
        {errors.course && <span className="error">{errors.course}</span>}

        <label>Image Upload:</label>
        <input type="file" name="image" onChange={handleChange} />
        {errors.image && <span className="error">{errors.image}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
