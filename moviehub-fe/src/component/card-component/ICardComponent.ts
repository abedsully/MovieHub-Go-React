import IMovie from "../../interfaces/IMovie";
import ISeries from "../../interfaces/ISeries";

interface ICardComponent {
    movie: IMovie | ISeries;
}

export default ICardComponent