import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = debounce(async (input) => {
    if (!input) return setSuggestions([]);
    try {
      const res = await axios.get(`/product/suggest?q=${input}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(query);
    return () => fetchSuggestions.cancel();
  }, [query]);

  const handleSelect = (title) => {
    navigate(`/searchProduct/${title}`);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="search-wrapper">
      <span className="search-icon">
        <SearchIcon fontSize="small" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="search-input-with-icon"
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSelect(item.title)}
              className="suggestion-item"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
