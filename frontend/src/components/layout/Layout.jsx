import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar";

const Layout = () => {
    return(
    // 1. Use a Flex container to put things side-by-side
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* 2. Sidebar Wrapper 
          We wrap the Sidebar in a div with a specific width (w-64).
          This forces the layout to reserve space for it. 
      */}
      <div className="w-64 flex-shrink-0 h-full">
        <Sidebar />
      </div>

      {/* 3. Main Content Area 
          flex-1 means "take up all remaining space".
          overflow-y-auto means "scroll this part if content is long".
      */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet /> 
      </main>
      
    </div>
    )
}
export default Layout;