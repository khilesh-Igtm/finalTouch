import React, { useState } from "react";

const FinalForm = () => {
  const [formData, setFormData] = useState({
    contactname: "",
    emailaddress: "",
    pcontact: "",
    scontact: "",
    pcalltime: "",
    postcode: "",
    uniform_number: "",
    date_uniform: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.contactname) formErrors.contactname = "Contact Name is required.";
    if (!formData.emailaddress) {
      formErrors.emailaddress = "Email Address is required.";
    } else if (!emailPattern.test(formData.emailaddress)) {
      formErrors.emailaddress = "Invalid Email Address format.";
    }
    if (!formData.pcontact) formErrors.pcontact = "Primary Contact Number is required.";
    if (!formData.pcalltime) formErrors.pcalltime = "Preferred time to call is required.";
    if (!formData.postcode) formErrors.postcode = "Postcode is required.";
    if (!formData.uniform_number) formErrors.uniform_number = "Number of uniforms required is required.";
    if (!formData.date_uniform) formErrors.date_uniform = "Date by which uniforms are required is required.";
    if (!formData.comments) formErrors.comments = "Comments are required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      document.getElementById("leadForm").submit();
    }
  };

  return (
    <div className="customize-form">
      <div className="header-sec">
        <h3>Contact Information</h3>
      </div>
      <div className="customize-form-layout">
        <form id="leadForm" onSubmit={handleSubmit}>
          <input type="hidden" name="action" value="ub_save_lead" />
          <textarea
            id="wgz_front_src"
            name="front"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_back_src"
            name="back"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_left_src"
            name="left"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_right_src"
            name="right"
            style={{ display: "none" }}
          ></textarea>
          <div className="custom-form">
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="text"
                    name="contactname"
                    id="contactname"
                    placeholder="Contact Name*"
                    value={formData.contactname}
                    onChange={handleChange}
                  />
                  {errors.contactname && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.contactname}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="email"
                    name="emailaddress"
                    id="emailaddress"
                    placeholder="Email Address*"
                    value={formData.emailaddress}
                    onChange={handleChange}
                  />
                  {errors.emailaddress && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.emailaddress}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="tel"
                    name="pcontact"
                    id="pcontact"
                    placeholder="Primary Contact Number*"
                    value={formData.pcontact}
                    onChange={handleChange}
                  />
                  {errors.pcontact && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.pcontact}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="tel"
                    name="scontact"
                    id="scontact"
                    placeholder="Secondary Contact Number"
                    value={formData.scontact}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="pcalltime"
                    id="pcalltime"
                    placeholder="Preferred time to call"
                    value={formData.pcalltime}
                    onChange={handleChange}
                  />
                  {errors.pcalltime && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.pcalltime}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="text"
                    name="postcode"
                    id="postcode"
                    placeholder="Postcode*"
                    value={formData.postcode}
                    onChange={handleChange}
                  />
                  {errors.postcode && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.postcode}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="number"
                    name="uniform_number"
                    id="uniform_number"
                    placeholder="Number of uniforms required"
                    autoComplete="true"
                    value={formData.uniform_number}
                    onChange={handleChange}
                  />
                  {errors.uniform_number && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.uniform_number}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="date_uniform"
                    id="date_uniform"
                    placeholder="Date by which uniforms are required"
                    autoComplete="true"
                    value={formData.date_uniform}
                    onChange={handleChange}
                  />
                  {errors.date_uniform && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.date_uniform}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                <div className="form-group">
                  <textarea
                    name="comments"
                    id="comments"
                    cols="40"
                    rows="6"
                    placeholder="Other Comments*"
                    value={formData.comments}
                    onChange={handleChange}
                  ></textarea>
                  {errors.comments && (
                    <span className="error" style={{ float: 'left', fontSize: '14px', padding: '10px 0px 10px 0px' }}>
                      {errors.comments}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn-design"
              value="Send"
              name="saveImage"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinalForm;
