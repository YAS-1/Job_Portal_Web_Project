import { react, useEffect } from "react";

const JobList = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll(".hidden-card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
      <>
        <div className="p-6">
          <p className="text-[#4071ed] my-2">Top Picks</p>
          <p className="text-[30px] font-bold text-[#1c2229]/80">Featured Jobs</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

        {[1, 2, 3].map((job) => (
          <div
            key={job}
            className="hidden-card bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Software Engineer
            </h3>
            <p className="text-gray-600 mt-2">Full-time | Remote</p>
            <p className="mt-4 text-gray-700">
              We are looking for a skilled software engineer to join our team.
            </p>
            <button className="mt-4 bg-[#4071ed] text-white px-4 py-2 rounded-lg hover:bg-[#4071ed]/80 transition-all duration-300">
              Apply Now
            </button>
          </div>
          ))}
        </div>
      </>     
  );
};

export default JobList;