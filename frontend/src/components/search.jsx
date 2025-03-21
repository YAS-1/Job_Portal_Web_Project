import { FaSearch, FaMapMarkerAlt, FaUserTie, FaBriefcase, FaMoneyBillAlt } from 'react-icons/fa';

const JobSearchFilters = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 animate-fade-in-up">
      {/* Main Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#4071ed] focus:ring-0 transition-all"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Filter */}
        <div className="relative">
          <select className="modern-dropdown w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 appearance-none focus:border-[#4071ed] focus:ring-0">
            <option>Any Location</option>
            <option>New York</option>
            <option>Remote</option>
          </select>
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Experience Level */}
        <div className="relative">
          <select className="modern-dropdown w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 appearance-none focus:border-[#4071ed] focus:ring-0">
            <option>Experience Level</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
          <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Job Type */}
        <div className="relative">
          <select className="modern-dropdown w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 appearance-none focus:border-[#4071ed] focus:ring-0">
            <option>Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
          <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Salary Range */}
        <div className="relative">
          <div className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#4071ed] focus:ring-0">
            <span className="text-gray-400">Salary Range</span>
          </div>
          <FaMoneyBillAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center md:justify-end">
        <button className="px-8 py-3 bg-[#4071ed] text-white rounded-lg hover:bg-[#3257b8] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          <FaSearch />
          <span>Search Jobs</span>
        </button>
      </div>
    </div>
  );
};

// Add this CSS animation and styles for modern dropdown
const styles = `
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }

  /* Modern Dropdown Styling */
  .modern-dropdown {
    position: relative;
    background-color: #ffffff;
    border: 1px solid #ddd;
    padding-left: 2.5rem;
    padding-right: 1rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    border-radius: 0.625rem;
    font-size: 1rem;
    color: #555;
    appearance: none;
    transition: border-color 0.3s ease;
  }

  .modern-dropdown:focus {
    border-color: #4071ed;
    outline: none;
  }

  .modern-dropdown option {
    padding: 0.625rem;
  }

  .modern-dropdown::-ms-expand {
    display: none;
  }

  /* Custom Arrow Styling */
  .modern-dropdown::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: solid transparent;
    border-width: 0.3rem 0.3rem 0 0;
    border-color: #aaa;
    border-style: solid;
    width: 0.5rem;
    height: 0.5rem;
    transform: rotate(45deg);
  }

  .modern-dropdown:focus::after {
    border-color: #4071ed;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default JobSearchFilters;
