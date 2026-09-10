function SearchSort({ search, setSearch, sortBy, setSortBy, sortOrder, setSortOrder, recordsPerPage, setRecordsPerPage, total, }) {

    return (
        <>
            <div className="row g-3 align-items-end mb-4">
                <div className="col-lg-5">
                    <label className="form-label fw-semibold">Search Employee</label>
                    <input type="search" className="form-control" placeholder="Search name, email, department..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="col-md-3 col-lg-2">
                    <label className="form-label fw-semibold">Sort By</label>
                    <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Default</option>
                        <option value="name">Name</option>
                        <option value="salary">Salary</option>
                        <option value="joiningDate">Joining Date</option>
                        <option value="department">Department</option>
                    </select>
                </div>

                <div className="col-md-3 col-lg-2">
                    <label className="form-label fw-semibold">Order</label>
                    <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div className="col-md-3 col-lg-2">
                    <label className="form-label fw-semibold">Records/Page</label>
                    <select className="form-select" value={recordsPerPage} onChange={(e) => setRecordsPerPage(Number(e.target.value))} >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

                <div className="col-md-3 col-lg-1">
                    <div className="text-muted small">{total} records</div>
                </div>
            </div>
        </>
    );
}

export default SearchSort;