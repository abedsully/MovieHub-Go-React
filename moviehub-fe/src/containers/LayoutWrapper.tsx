import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "./Layout";
const noLayoutPaths = ["/register", "/login"];
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({children,}) => {
  const location = useLocation();
  const shouldUseLayout = !noLayoutPaths.includes(location.pathname);
  return shouldUseLayout ? <Layout /> : <>{children}</>;
};
export default LayoutWrapper;