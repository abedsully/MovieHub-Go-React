import Avatar from "../avatar/Avatar";
import ICastList from "./ICastList";

const CastList = ({ cast }: ICastList) => {
    return (
        <>
            <ul role="list" className="divide-y divide-gray-500 text-white">
                {cast.map((cast) => (
                    <li key={cast.name} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4 items-center">
                            <Avatar image={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-white">
                                    {cast.name}
                                </p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:items-center">
                            <p className="text-sm leading-6 text-end text-white w-[12rem]">{cast.character}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CastList;