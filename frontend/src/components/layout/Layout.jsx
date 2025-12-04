import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return(
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar Fixed on Left */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
    )
}
export default Layout;
