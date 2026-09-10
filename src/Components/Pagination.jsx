function Pagination({ currentPage, totalPages, onPageChange, startIndex, totalRecords, currentCount, }) {

  if (totalRecords === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
        <div className="text-muted small">
          Showing {startIndex + 1} to {startIndex + currentCount} of {totalRecords} records
        </div>

        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous </button>
            </li>

            {pages.map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(page)}> {page} </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}> Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </>

  );
}

export default Pagination;