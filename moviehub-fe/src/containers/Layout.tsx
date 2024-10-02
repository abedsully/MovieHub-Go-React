import Sidebar from "../component/sidebar/Sidebar";
import PageContent from "./PageContent";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <PageContent />
      </div>
    </div>
  );
};

export default Layout;
