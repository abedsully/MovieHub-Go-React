import { Route, Routes } from "react-router-dom";
import PageRoutes from "../config/Route";

const PageContent = () => {
  const isHMaxNeeded = false;

  const defaultClass = isHMaxNeeded ? "h-max" : "h-100";

  return (
    <div
      className={`drawer-content flex flex-col justify-center items-center ${defaultClass}`}
    >
      <Routes>
        {PageRoutes.map((route, key) => (
          <Route key={key} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
};

export default PageContent;