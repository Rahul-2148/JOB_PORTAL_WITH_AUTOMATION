import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../redux/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import level1 from "../../src/assets/level1.mp3";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
      speakMessage(error);
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      speakMessage(message);
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    const deleteSound = new Audio(level1);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "animated fadeInDown",
      },
      willOpen: () => deleteSound.play(), // Play sound when alert opens
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteApplication(id));
        // toast.success("Application deleted successfully!");
        Swal.fire("Deleted!", "The application has been removed.", "success");
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
        <h1>You have no applications from job seekers.</h1>
      ) : (
        <div className="account_components">
          <h3>Applications For Your Posted Jobs</h3>
          <div className="applications_container">
            {applications.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title: </span> {element.jobInfo.jobTitle}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Name: </span> {element.jobSeekerInfo.name}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Email:</span>{" "}
                    {element.jobSeekerInfo.email}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Phone: </span>{" "}
                    {element.jobSeekerInfo.phone}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Address: </span>{" "}
                    {element.jobSeekerInfo.address}
                  </p>
                  <p className="sub-sec">
                    <span>Applicant's Cover Letter: </span>
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
                      to={element.jobSeekerInfo?.resume?.url}
                      className="btn"
                      target="_blank"
                    >
                      View Resume
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
