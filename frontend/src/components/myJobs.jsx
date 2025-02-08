import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../redux/slices/jobSlice";
import Spinner from "../components/Spinner";
// import level1 from "../../src/assets/level1.mp3";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
      speakMessage(error);
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      speakMessage(message);
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "swal2-popup",
      },
      didOpen: () => {
        // const audio = new Audio(level1);
        const audio = new Audio(
          "https://www.myinstants.com/media/sounds/error.mp3"
        );
        audio.play();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteJob(id));
        Swal.fire("Deleted!", "The job has been deleted.", "success");
        speakMessage("The job has been deleted");
      }
    });
  };

  // Function to speak text
  const speakMessage = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-IN"; // Set language
    speech.rate = 1; // Adjust speed
    speech.pitch = 1; // Adjust pitch
    window.speechSynthesis.speak(speech);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        <div className="account_components">
          <h3>My Jobs</h3>
          <div className="applications_container">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <p className="sub-sec">
                  <span>Job Title: </span>
                  {element.title}
                </p>
                <p className="sub-sec">
                  <span>Job Domain:</span> {element.jobDomain}
                </p>
                <p className="sub-sec">
                  <span>Salary: </span> {element.salary}
                </p>
                <p className="sub-sec">
                  <span>Location:</span> {element.location}
                </p>
                <p className="sub-sec">
                  <span>Job Type:</span> {element.jobType}
                </p>
                <p className="sub-sec">
                  <span>Company Name:</span> {element.companyName}
                </p>
                <p className="sub-sec">
                  <span>Introduction:</span> {element.introduction}
                </p>
                <p className="sub-sec">
                  <span>Qualifications:</span> {element.qualifications}
                </p>
                <p className="sub-sec">
                  <span>Responsibilities:</span> {element.responsibilities}
                </p>
                {element.offers && (
                  <p className="sub-sec">
                    <span>What Are We Offering:</span> {element.offers}
                  </p>
                )}
                <button
                  className="btn"
                  onClick={() => handleDeleteJob(element._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
