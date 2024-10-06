import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_Tmdb } from "../../constant/Api";
import { debounce } from "lodash";
import IMovie from "../../interfaces/IMovie";
import IPeople from "../../interfaces/IPeople";
import ISeries from "../../interfaces/ISeries";
import logo from "../../assets/logo.png";

interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: "All", value: "multi" },
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
  { label: "People", value: "person" },
];

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchDropdownVisible, setSearchDropdownVisible] =
    useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    (IMovie | IPeople | ISeries)[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const navigate = useNavigate();

  const fetchSearchResults = async (category: string, query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`${API_Tmdb.searchMulti(category)}`, {
        params: { query },
      });

      setSearchResults(response.data.results);
      setSearchDropdownVisible(false);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const debouncedSearch = debounce((query: string) => {
    fetchSearchResults(selectedCategory.value, query);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
    setSearchDropdownVisible(false);
  };

  const handleSearchResultClick = (result: IMovie | IPeople | ISeries) => {
    setSearchDropdownVisible(false);
    setSearchResults([]);
    setSearchQuery("");
  
    let path = "";
    
    if ("first_air_date" in result && result.first_air_date) {
      path = `/series/${result.id}`;
    } else if ("release_date" in result && result.release_date) {
      path = `/movies/${result.id}`;
    } else if ("known_for_department" in result && result.known_for_department) {
      path = `/person/${result.id}`;
    }
  
    if (path) {
      navigate(path);
    }
  };
  

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setSearchResults([]);
    setSearchDropdownVisible(false);
  };

  const getImageUrl = (result: IMovie | IPeople | ISeries): string => {
    if ("poster_path" in result && result.poster_path) {
      return `https://image.tmdb.org/t/p/w200${result.poster_path}`;
    } else if ("profile_path" in result && result.profile_path) {
      return `https://image.tmdb.org/t/p/w200${result.profile_path}`;
    }
    return logo;
  };

  const getDescription = (result: IMovie | IPeople | ISeries): string => {
    return "title" in result ? result.title || "" : result.name || "";
  };

  const getSubDescription = (result: IMovie | IPeople | ISeries): string => {
    if ("first_air_date" in result && result.first_air_date) {
      return "TV Series";
    } else if ("release_date" in result && result.release_date) {
      return "Movie";
    } else if (
      "known_for_department" in result &&
      result.known_for_department
    ) {
      return result.known_for_department === "Acting" ? "Actor" : "Director";
    }

    return "MovieHub";
  };

  const getPlaceholder = () : string => {
    if (selectedCategory.label == "All") {
        return "Search Movies, TV, People ..."
    } else if (selectedCategory.label == "Movies") {
        return "Search Movies ..."
    } else if (selectedCategory.label == "TV Shows") {
        return "Search TV Shows..."
    } else if (selectedCategory.label == "People") {
        return "Search People..."
    }

    return ""
  }

  const handleCategoryToggle = () => {
    setSearchDropdownVisible(true);
  };

  return (
    <div className="flex items-center relative w-full max-w-lg">
      <div className="relative me-2">
        <button
          type="button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 w-max text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          onClick={handleCategoryToggle}
        >
          {selectedCategory.label}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {searchDropdownVisible && (
          <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-1">
            <ul className="py-2 text-sm text-gray-700">
              {categories.map((category) => (
                <li key={category.value}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <input
        type="search"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={getPlaceholder()}
        value={searchQuery}
        onChange={handleSearchChange}
        required
      />

      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-lg mt-[20rem] rounded-lg w-full ml-[5rem] z-20">
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchResultClick(result)}
              >
                <div className="flex items-center space-x-2">
                  {getImageUrl(result) && (
                    <img
                      src={getImageUrl(result)}
                      alt={getDescription(result)}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {getDescription(result)}
                    </span>
                    <span className="text-sm">{getSubDescription(result)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
