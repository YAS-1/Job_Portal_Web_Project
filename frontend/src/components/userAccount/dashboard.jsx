import React from 'react'
import { FaChevronRight } from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
    <div className="space-y-6 p-4 bg-gray-900 min-h-screen">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-[#4071ed] font-semibold mb-2">Applications Sent</h3>
          <p className="text-3xl text-gray-100">12</p>
          <div className="mt-2 flex items-center text-sm">
<<<<<<< HEAD
            {/* <span className="text-green-400">↑ 2%</span> */}
=======
            <span className="text-green-400">↑ 2%</span>
>>>>>>> 317081a (dashboard improvement)
            <span className="text-gray-400 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-[#4071ed] font-semibold mb-2">Interview Rate</h3>
          <p className="text-3xl text-gray-100">25%</p>
          <div className="mt-3 relative pt-1">
            <div className="overflow-hidden h-2 bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-[#4071ed] rounded-full transition-all duration-500" 
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700">
          <h3 className="text-[#4071ed] font-semibold mb-2">Profile Strength</h3>
          <div className="flex items-center">
            <div className="radial-progress text-[#4071ed]" 
              style={{ "--value": 78, "--size": "3rem" }} 
              role="progressbar"
            >
              <span className="text-gray-100 text-sm">78%</span>
            </div>
            <div className="ml-4 text-sm text-gray-300">
              Complete your <br/>
              <a href="#profile" className="text-[#4071ed] hover:underline">
                profile details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-[#4071ed] font-semibold mb-4">Application Timeline</h3>
        <div className="flex flex-col space-y-4">
          {[
            { company: 'Tech Corp', status: 'Interview', date: '2023-08-15' },
            { company: 'Design Studio', status: 'Applied', date: '2023-08-12' },
            { company: 'StartUpX', status: 'Offer', date: '2023-08-10' },
          ].map((app, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-100">{app.company}</div>
                <div className="text-sm text-gray-400">{app.status}</div>
              </div>
              <div className="text-sm text-gray-300">{app.date}</div>
              <button className="ml-4 p-1 text-[#4071ed] hover:text-[#305ab3]">
                <FaChevronRight />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Match Analysis */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-[#4071ed] font-semibold mb-4">Skill Match Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">React.js</span>
              <span className="text-[#4071ed]">85%</span>
            </div>
            <div className="h-2 bg-gray-600 rounded-full">
              <div className="h-2 bg-[#4071ed] rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="p-3 bg-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Node.js</span>
              <span className="text-[#4071ed]">72%</span>
            </div>
            <div className="h-2 bg-gray-600 rounded-full">
              <div className="h-2 bg-[#4071ed] rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    </>
  )
}
