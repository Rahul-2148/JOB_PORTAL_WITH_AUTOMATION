import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../redux/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import notFound from "../../src/assets/notFound.jpg";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [domain, setdomain] = useState("");
  const [selecteddomain, setSelecteddomain] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleDomainChange = (domain) => {
    setdomain(domain);
    setSelecteddomain(domain);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, domain, searchKeyword));
  }, [dispatch, error, city, domain]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, domain, searchKeyword));
  };

  const cities = [
    "All",
    "Koderma",
    "Durgapur",
    "Banglore",
    "New Delhi",
    "Gudgaon",
    "Noida",
    "Mumbai",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Odissa",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Allahabad",
    "Nasik",
    "Nagpur",
    "Bhopal",
  ];

  const domainsArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <>
                    <div key={index}>
                      <input
                        type="radio"
                        id={city}
                        name="city"
                        value={city}
                        checked={selectedCity === city}
                        onChange={() => handleCityChange(city)}
                      />
                      <label htmlFor={city}>{city}</label>
                    </div>
                  </>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By domain</h2>
                {domainsArray.map((domain, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={domain}
                      name="domain"
                      value={domain}
                      checked={selecteddomain === domain}
                      onChange={() => handleDomainChange(domain)}
                    />
                    <label htmlFor={domain}>{domain}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter Job By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={domain}
                  onChange={(e) => setdomain(e.target.value)}
                >
                  <option value="">Filter Job By domain</option>
                  {domainsArray.map((domain, index) => (
                    <option value={domain} key={index}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {
                  jobs && jobs.length > 0 ? (
                    jobs.map((element) => {
                      return (
                        <div className="card" key={element._id}>
                          {element.hiringMultipleCandidates === "Yes" ? (
                            <p className="hiring-multiple">
                              Hiring Multiple Candidates
                            </p>
                          ) : (
                            <p className="hiring">Hiring</p>
                          )}
                          <p className="title">{element.title}</p>
                          <p className="company">{element.companyName}</p>
                          <p className="location">{element.location}</p>
                          <p className="salary">
                            <span>Salary:</span> Rs. {element.salary}
                          </p>
                          <p className="posted">
                            <span>Posted On:</span>{" "}
                            {element.jobPostedOn.substring(0, 10)}
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              className="btn"
                              to={`/post/application/${element._id}`}
                            >
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /************************************************************/
                    /* BUG No.2 */
                    <img
                      src={notFound}
                      alt="job-not-found"
                      style={{ width: "100%" }}
                    />
                  )
                  /************************************************************/
                }
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
