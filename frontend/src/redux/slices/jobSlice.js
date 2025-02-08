import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    // all jobs reducers
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // single job reducers

    requestForSingleJob(state) {   // ✅ Add this
      state.loading = true;
      state.error = null;
    },
    successForSingleJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.singleJob = action.payload;
      state.error = null;
    },
    failureForSingleJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.error = action.payload;
    },

    // post job reducers
    requestForPostJob(state) {  // ✅ Add this
      state.loading = true;
      state.error = null;
    },
    successForPostJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForPostJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.error = action.payload;
    },

    // my jobs reducers
    requestForMyJobs(state) {  // ✅ Add this
      state.loading = true;
      state.error = null;
    },
    successForMyJobs(state, action) {  // ✅ Add this
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action) {  // ✅ Add this
      state.loading = false;
      state.error = action.payload;
    },

    // delete job reducers
    requestForDeleteJob(state) {  // ✅ Add this
      state.loading = true;
      state.error = null;
    },
    successForDeleteJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    failureForDeleteJob(state, action) {  // ✅ Add this
      state.loading = false;
      state.error = action.payload;
    },

    // clear all errors reducer
    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    
    // reset job slice reducer
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.singleJob = {};
    },
  },
});

// fetch all jobs api response
export const fetchJobs =
  (city, domain, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = "http://localhost:4000/api/v1/job/getalljobs?";
    //   let link = "https://job-portal-backend-sifx.onrender.com/api/v1/job/getall?";
      let queryParams = [];
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city && city !== "All") {
        queryParams.push(`city=${city}`);
      }

      /***************************************************/
      /* BUG No.3 */
      if (city && city === "All") {
        queryParams = [];
        if (searchKeyword) {
          queryParams.push(`searchKeyword=${searchKeyword}`);
        }
      }
      /***************************************************/

      if (domain) {
        queryParams.push(`domain=${domain}`);
      }

      /***************************************************/
      /* BUG No.4 */
      if (domain && domain === "All") {
        queryParams = [];
        if (searchKeyword) {
          queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (city && city !== "All") {
          queryParams.push(`city=${city}`);
        }
      }
      /***************************************************/

      link += queryParams.join("&");
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
    }
  };

  // fetch single job data api response
export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
    //   `https://job-portal-backend-sifx.onrender.com/api/v1/job/get/${jobId}`,
        `http://localhost:4000/api/v1/job/get/${jobId}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));
  }
};

// post job data api response
export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
    //   `https://job-portal-backend-sifx.onrender.com/api/v1/job/post`,
        `http://localhost:4000/api/v1/job/post`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
  }
};

// get my jobs data api response
export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
    //   `https://job-portal-backend-sifx.onrender.com/api/v1/job/getmyjobs`,
    'http://localhost:4000/api/v1/job/getmyjobs',
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));
  }
};

// delete job data api response
export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
    //   `https://job-portal-backend-sifx.onrender.com/api/v1/job/delete/${id}`,
    'http://localhost:4000/api/v1/job/delete/${id}',
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
  }
};

// clear all errors action 
export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

// reset job slice action
export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;