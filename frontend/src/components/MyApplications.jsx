import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../redux/slices/applicationSlice";
import Spinner from "../components/Spinner";
import level1 from "../../src/assets/level1.mp3";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
      speakMessage(error);
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
      speakMessage(message);
    }
  }, [dispatch, error, message]);

  // Function to play an alert sound
  const playAlertSound = () => {
    const alertSound = new Audio(level1);
    alertSound.play();
  };

  const handleDeleteApplication = (id) => {
    playAlertSound(); // Play sound before alert popup
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteApplication(id));
        // toast.success("Application deleted successfully!");
        Swal.fire(
          "Deleted!",
          "Your job application has been deleted.",
          "success"
        );
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
      ) : applications && applications.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not applied for any job.
        </h1>
      ) : (
        <>
          <div className="account_components">
            <h3>My Application For Jobs</h3>
            <div className="applications_container">
              {applications.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p className="sub-sec">
                      <span>Job Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Name</span> {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Email</span> {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Phone: </span> {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Address: </span> {element.jobSeekerInfo.address}
                    </p>
                    <p className="sub-sec">
                      <span>Coverletter: </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                      ></textarea>
                    </p>
                    <div className="btn-wrapper">
                      <button
                        className="outline_btn"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyApplications;
