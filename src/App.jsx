import { useEffect, useMemo, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./Components/Employeetable";
import Pagination from "./components/Pagination";
import SearchSort from "./Components/Searchsort";

const emptyForm = { name: "", email: "", mobile: "", gender: "", department: "", designation: "", salary: "", joiningDate: "", address: "" };

function App() {
  const [employees, setEmployees] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("employees")) || [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required.";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile must contain exactly 10 digits.";

    if (!formData.gender) newErrors.gender = "Please select gender.";
    if (!formData.department) newErrors.department = "Please select department.";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required.";

    if (!formData.salary) newErrors.salary = "Salary is required.";
    else if (Number(formData.salary) <= 0)
      newErrors.salary = "Salary must be greater than 0.";

    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required.";

    if (!formData.address.trim())
      newErrors.address = "Address is required.";
    else if (formData.address.trim().length < 10)
      newErrors.address = "Address must be at least 10 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setErrors({});
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editId !== null) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editId
            ? { ...formData, id: editId }
            : employee
        )
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }

    resetForm();
    setCurrentPage(1);
  };

  const handleEdit = (employee) => {
    setFormData({ name: employee.name, email: employee.email, mobile: employee.mobile, gender: employee.gender, department: employee.department, designation: employee.designation, salary: employee.salary, joiningDate: employee.joiningDate, address: employee.address, });
    setEditId(employee.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    if (editId === id) resetForm();
  };

  const processedEmployees = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    let result = employees.filter((employee) =>
      [employee.name, employee.email, employee.mobile, employee.gender, employee.department, employee.designation, employee.address,].some((value) => String(value).toLowerCase().includes(keyword))
    );

    if (sortBy) {
      result = [...result].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "name") {
          comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "salary") {
          comparison = Number(a.salary) - Number(b.salary);
        } else if (sortBy === "joiningDate") {
          comparison =
            new Date(a.joiningDate).getTime() -
            new Date(b.joiningDate).getTime();
        } else if (sortBy === "department") {
          comparison = a.department.localeCompare(b.department);
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [employees, search, sortBy, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, sortOrder, recordsPerPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedEmployees.length / recordsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentEmployees = processedEmployees.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  return (
    <>
      <div className="app-bg min-vh-100 py-4">
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="fw-bold text-primary mb-1">Employee CRUD</h1>
          </div>

          <EmployeeForm formData={formData} errors={errors} editId={editId} onChange={handleChange} onSubmit={handleSubmit} onReset={resetForm} />

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <SearchSort search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} recordsPerPage={recordsPerPage} setRecordsPerPage={setRecordsPerPage} total={processedEmployees.length} />

              <EmployeeTable employees={currentEmployees} onEdit={handleEdit} onDelete={handleDelete} />

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} startIndex={startIndex} totalRecords={processedEmployees.length} currentCount={currentEmployees.length} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;