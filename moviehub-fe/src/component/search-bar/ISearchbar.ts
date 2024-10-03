import IMovie from "../../interfaces/IMovie";
import IPeople from "../../interfaces/IPeople";
import ISeries from "../../interfaces/ISeries";

type SearchResult = IMovie | IPeople | ISeries;

interface ISearchbar {
    selectedCategory: string;
    selectedCategoryLabel: string;
    onCategoryChange: (category: string) => void;
    onSearchResults: (results: SearchResult[]) => void;
}

export default ISearchbar