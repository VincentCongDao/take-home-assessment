// Tag.js
const Tag = ({ text, onRemove }) => {
  return (
    <div className="tag">
      {text}
      <button onClick={() => onRemove(text)} className="remove-tag-button">
        x
      </button>
    </div>
  );
};

export default Tag;
