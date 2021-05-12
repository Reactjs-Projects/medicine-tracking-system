
function SearchBar(props) {
  const filterText = props.filterText;
  return (
    <div>
      <form>
        <input
          type="search"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => props.onFilterTextChange(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
