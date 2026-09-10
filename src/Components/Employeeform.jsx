function Employeeform({ formData, errors, editId, onChange, onSubmit, onReset, }) {

  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : ""}`;

  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white py-3">
          <h4 className="mb-0"> {editId !== null ? "Edit Employee" : "Add Employee"} </h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={onSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Employee Name *</label>
                <input type="text" name="name" className={inputClass("name")} value={formData.name} onChange={onChange} placeholder="Enter employee name" />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email *</label>
                <input type="email" name="email" className={inputClass("email")} value={formData.email} onChange={onChange} placeholder="example@gmail.com" />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Mobile *</label>
                <input type="tel" name="mobile" className={inputClass("mobile")} value={formData.mobile} onChange={onChange} maxLength="10" placeholder="10 digit mobile number" />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Gender *</label>
                <div className="d-flex gap-4 pt-2">
                  {["Male", "Female", "Other"].map((gender) => (
                    <div className="form-check" key={gender}>
                      <input className="form-check-input" type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={onChange} id={gender} />
                      <label className="form-check-label" htmlFor={gender}>
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Department *</label>
                <select name="department" className={inputClass("department")} value={formData.department} onChange={onChange}>
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Designation *</label>
                <input type="text" name="designation" className={inputClass("designation")} value={formData.designation} onChange={onChange} placeholder="e.g. Frontend Developer" />
                {errors.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Salary *</label>
                <input type="number" name="salary" className={inputClass("salary")} value={formData.salary} onChange={onChange} min="1" placeholder="Enter salary" />
                {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Joining Date *</label>
                <input type="date" name="joiningDate" className={inputClass("joiningDate")} value={formData.joiningDate} onChange={onChange} />
                {errors.joiningDate && (
                  <div className="invalid-feedback">{errors.joiningDate}</div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Address *</label>
                <textarea name="address" className={inputClass("address")} value={formData.address} onChange={onChange} rows="3" placeholder="Enter employee address" />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary px-4">
                  {editId !== null ? "Update Employee" : "Add Employee"}
                </button>
                <button type="button" className="btn btn-secondary px-4" onClick={onReset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default Employeeform;