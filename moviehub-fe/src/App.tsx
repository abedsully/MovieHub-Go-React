import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWrapper from "./containers/LayoutWrapper";
import routes from "./config/Route";

const App = (): JSX.Element => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LayoutWrapper>
          <Routes>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </LayoutWrapper>
      </React.Suspense>
    </Router>
  );
};

export default App;