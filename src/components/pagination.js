const Pagination = ({ totalPages, paginate }) => {
  // Hold page numbers within array
  const pageNumbers = [];
  // Populate the page with the total pages we have.
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleClick = (number, e) => {
    // Prevent the default anchor link behavior
    e.preventDefault();
    paginate(number);
  };

  return (
    <nav className="recipe-pagination-container">
      <ul className="recipe-pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              href="!#"
              onClick={(e) => handleClick(number, e)}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
