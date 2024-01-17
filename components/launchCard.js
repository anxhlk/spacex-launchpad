"use client";
import { useState, useEffect } from "react";

async function getLaunches() {
  const res = await fetch("https://api.spacexdata.com/v3/launches");
  return res.json();
}

export function Card({ launch }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <h1>{launch.mission_name}</h1>
        </div>
        <p className="text-white text-base">{launch.launch_year}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {launch.details ? (
          <button
            onMouseEnter={openModal}
            onMouseLeave={closeModal}
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Hover for Details
          </button>
        ) : (
          <p className="text-white">No Details Available</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-md bg-black rounded-lg shadow-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-medium text-white">
                {launch.mission_name} - Details
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-white bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-white">
                {launch.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LaunchCard = () => {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLaunches = async () => {
      const launchesData = await getLaunches();
      setLaunches(launchesData);
    };

    fetchLaunches();
  }, []);

  const filteredLaunches = launches.filter((launch) => {
    const launchDate = new Date(launch.launch_year);

    if (filter === "all") return true;
    if (filter === "upcoming") return launchDate > new Date();
    if (filter === "past") return launchDate < new Date();
    return false;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <div className="flex justify-center mb-4 bg-black">
        <button
          onClick={() => handleFilterChange("all")}
          className={`p-2 ${filter === "all" ? "active" : ""}`}
        >
          All Launches
        </button>
        <button
          onClick={() => handleFilterChange("upcoming")}
          className={`p-2 ${filter === "upcoming" ? "active" : ""}`}
        >
          Upcoming Launches
        </button>
        <button
          onClick={() => handleFilterChange("past")}
          className={`p-2 ${filter === "past" ? "active" : ""}`}
        >
          Past Launches
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map((launch) => (
            <Card key={launch.flight_number} launch={launch} />
          ))
        ) : (
          <p>No upcoming launches available.</p>
        )}
      </div>
    </div>
  );
};

export default LaunchCard;
