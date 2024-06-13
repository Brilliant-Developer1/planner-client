import { Navbar } from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import Sidebar from "../components/Sidebar/Sidebar";



export const metadata = {
    title: "Planner Dashboard",
    description: "Planner - Plan your goal",
  };
  
  export default function DashboardLayout({ children }) {
    return (
      <div className="flex flex-col sm:flex-row ">
      <PrivateRoute>
        <Sidebar />
        <div className="flex-1 ">
          <Navbar/>
          <div>
          {children}
          </div>
        </div>
      </PrivateRoute>
    </div>
    );
  }
  