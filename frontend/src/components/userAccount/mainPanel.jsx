import React from "react";
import UserDropdown from "./dropdown";
import JobSearchFilters from "./search";

export default function MainPanel() {
  return (
    <>
      <main className={`flex-1 transition-margin duration-300 md:ml-4`}>
        <div className="flex w-full justify-between p-4">
          <h1 className="text-2xl font-bold text-[#4071ed]/90">Dashboard</h1>
          <UserDropdown />
        </div>
        <div className="px-2">
          {/* Add your main content here */}

          <p className="mt-4 text-gray-600">
            Welcome to your jobseeker dashboard
          </p>
          {/* <JobSearch/> */}

          <JobSearchFilters />
        </div>
      </main>
    </>
  );
}
