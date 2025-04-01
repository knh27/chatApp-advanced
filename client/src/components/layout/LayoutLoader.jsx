import React from "react";

function LayoutLoader() {
  return (
    <div
      className="grid h-screen gap-4 p-4 grid-cols-1 
             md:[grid-template-columns:30%_70%] 
             lg:[grid-template-columns:30%_45%_25%]"
    >
      {/* Chat List (visible from medium screens up) */}
      <div className="hidden md:block bg-blue-100 p-4">Chat List</div>

      {/* Chat Window (always visible) */}
      <div className="bg-white p-4 border flex items-center justify-center">
        
      </div>

      {/* Profile (visible only on large screens) */}
      <div className="hidden lg:block bg-green-100 p-4">Profile</div>
    </div>
  );
}

export default LayoutLoader;
