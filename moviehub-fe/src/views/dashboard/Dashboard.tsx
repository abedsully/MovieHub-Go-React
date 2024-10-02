import Navbar from "../../component/navbar/Navbar";
import logo from "../../assets/logo.png";

const Dashboard = () => {
  return (
    <>
      <div className="mt-16 z-0">
        <div className="pt-4">
          <Navbar image={logo} />
          <h1>Welcome to the Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
