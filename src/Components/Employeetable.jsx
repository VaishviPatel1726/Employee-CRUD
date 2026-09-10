function Employeetable({ employees, onEdit, onDelete }) {
    return (

        <>
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Joining Date</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="11" className="text-center py-5 text-muted"> No employee records found.</td>
                            </tr>) : (employees.map((employee, index) => (<tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td className="fw-semibold">{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.gender}</td>
                                <td> <span className="badge text-bg-info">{employee.department}</span> </td>
                                <td>{employee.designation}</td>
                                <td>₹{Number(employee.salary).toLocaleString("en-IN")}</td>
                                <td>{employee.joiningDate}</td>
                                <td className="address-cell">{employee.address}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-warning" onClick={() => onEdit(employee)}> Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => onDelete(employee.id)}> Delete </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Employeetable;