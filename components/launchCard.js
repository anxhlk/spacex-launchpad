"use client";
import { useState, useEffect } from "react";

async function getLaunches() {
  const res = await fetch("https://api.spacexdata.com/v3/launches");
  return res.json();
}

export function Card({ launch }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <h1>{launch.mission_name}</h1>
        </div>
        <p className="text-white text-base">{launch.details}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-black rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">
          {launch.launch_year}
        </span>
      </div>
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
