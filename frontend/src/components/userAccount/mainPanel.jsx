import React from 'react'
import UserDropdown from './dropdown'
import JobSearchFilters from '../search'

export default function MainPanel() {
  return (
    <>
      <main className={`flex-1 transition-margin duration-300 md:ml-4`}>
        <div className="p-6">
          {/* Add your main content here */}
          <h1 className="text-2xl font-bold text-[#1c2229]">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Welcome to your jobseeker dashboard
          </p>
          {/* <JobSearch/> */}
          
          <UserDropdown />
          <JobSearchFilters/>
        </div>
      </main>
    </>
  )
}
