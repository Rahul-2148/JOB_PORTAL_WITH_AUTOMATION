import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstDomain, setFirstDomain] = useState("");
  const [secondDomain, setSecondDomain] = useState("");
  const [thirdDomain, setThirdDomain] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const DomainsArray = [
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

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRegsiter = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstDomain", firstDomain);
      formData.append("secondDomain", secondDomain);
      formData.append("thirdDomain", thirdDomain);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
      speakMessage(error);
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  const [showPassword, setShowPassword] = useState(false);

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
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleRegsiter}>
            <div className="wrapper">
              <div className="inputTag">
                <label>Register As</label>
                <div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Register as an Employer</option>
                    <option value="Job Seeker">Register as a Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>
              <div className="inputTag">
                <label>Name</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FaPencilAlt />
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Phone Number</label>
                <div>
                  <input
                    type="number"
                    placeholder="111-222-333"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <FaPhoneFlip />
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="inputTag">
                <label>Address</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FaAddressBook />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      style={{ color: "black" }}
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      style={{ color: "black" }}
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                  <RiLock2Fill style={{ marginLeft: "3px" }} />
                </div>
              </div>
            </div>
            {role === "Job Seeker" && (
              <>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Your First Domain</label>
                    <div>
                      <select
                        value={firstDomain}
                        onChange={(e) => setFirstDomain(e.target.value)}
                      >
                        <option value="">Your Domain</option>
                        {DomainsArray.map((Domain, index) => {
                          return (
                            <option key={index} value={Domain}>
                              {Domain}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Second Domain</label>
                    <div>
                      <select
                        value={secondDomain}
                        onChange={(e) => setSecondDomain(e.target.value)}
                      >
                        <option value="">Your Domain</option>
                        {DomainsArray.map((Domain, index) => {
                          return (
                            <option key={index} value={Domain}>
                              {Domain}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Third Domain</label>
                    <div>
                      <select
                        value={thirdDomain}
                        onChange={(e) => setThirdDomain(e.target.value)}
                      >
                        <option value="">Your Domain</option>
                        {DomainsArray.map((Domain, index) => {
                          return (
                            <option key={index} value={Domain}>
                              {Domain}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Coverletter</label>
                    <div>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={10}
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Resume</label>
                    <div>
                      <input
                        type="file"
                        onChange={resumeHandler}
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <button type="submit" disabled={loading}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
