import IMovie from "../../interfaces/IMovie";
import ISeries from "../../interfaces/ISeries";

interface ICardComponent {
    movie: IMovie | ISeries;
    size?: string;
    upcoming?: boolean;
}

export default ICardComponent