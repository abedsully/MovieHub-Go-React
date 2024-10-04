import { Route, Routes } from "react-router-dom";
import PageRoutes from "../config/Route";

const PageContent = () => {


  return (
    <div
      className={`drawer-content flex flex-col justify-center items-center`}
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