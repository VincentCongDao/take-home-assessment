const Pagination = ({ totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleClick = (number, e) => {
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
