import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { APP_URL } from '../config';
import axios from 'axios';

const Leave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const navigate=useNavigate()
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      return <Navigate to="/error" />;
    }

    // Check if employee is registered by looking for employeeId in localStorage
    const employeeId = localStorage.getItem('employeeId');
    if (!employeeId) {
      setIsRegistered(false);
      toast.error('You need to register first!');
    } else {
      setIsRegistered(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leaveDetails.startDate || !leaveDetails.endDate || !leaveDetails.reason) {
      toast.error('Please fill all fields!');
      return;
    }

    if (!isRegistered) {
      toast.error('You are not registered. Please complete the registration first.');
      return;
    }
    const employeeId=localStorage.getItem('employeeId')
    if(!employeeId){
      toast.error('you must be logged in to submit a leave request')
    }
    try {
     
      const leaveRequestData={...leaveDetails,employeeId}
      console.log(leaveDetails)
      console.log(employeeId)
      const response = await axios.post(`${APP_URL}/leaverequest`, leaveRequestData,{
        headers: {
          'Content-Type': 'application/json'
        },
      })

      // Handle the success response
      toast.success(response.data.msg || 'Leave request submitted successfully!');
      setLeaveDetails({ startDate: '', endDate: '', reason: '' });
      setTimeout(() => navigate('/user/dashboard'), 2000)
    } catch (error) {
      // Handle error response
      console.log("error",error)
      const errorMsg = error.response?.data?.msg || 'Error submitting leave request.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Leave Request</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="form-row">
          {/* Start Date */}
          <div className="form-group col-md-6">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={leaveDetails.startDate}
              onChange={(e) => setLeaveDetails({ ...leaveDetails, startDate: e.target.value })}
              required
            />
          </div>

          {/* End Date */}
          <div className="form-group col-md-6">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={leaveDetails.endDate}
              onChange={(e) => setLeaveDetails({ ...leaveDetails, endDate: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Reason */}
        <div className="form-group mb-2">
          <label htmlFor="reason">Reason</label>
          <textarea
            className="form-control"
            id="reason"
            rows="4"
            value={leaveDetails.reason}
            onChange={(e) => setLeaveDetails({ ...leaveDetails, reason: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary px-5 py-2" disabled={!isRegistered}>
            Submit Request
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Leave;

























// import React, { useEffect, useState } from 'react';
// import { isLoggedIn } from '../auth';
// import { Navigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { APP_URL } from '../config';
// import axios from 'axios';

// const Leave = () => {
//   const [leaveDetails, setLeaveDetails] = useState({
//     startDate: '',
//     endDate: '',
//     reason: '',
//   });

//   useEffect(() => {
//     if (!isLoggedIn()) {
//       return <Navigate to="/error" />;
//     }
//   }, []);

//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     if (!leaveDetails.startDate || !leaveDetails.endDate || !leaveDetails.reason) {
//       toast.error("Please fill all fields!");
//       return;
//     }

//     try {
//       // Send leave request data to the backend
//       const response = await axios.post(`${APP_URL}/leaverequest`, leaveDetails);

//       // Handle the success response
//       toast.success(response.data.msg || 'Leave request submitted successfully!');
//       setLeaveDetails({ startDate: '', endDate: '', reason: '' });
//     } catch (error) {
//       // Handle error response
//       const errorMsg = error.response?.data?.msg || 'Error submitting leave request.';
//       toast.error(errorMsg);
//     }

//     // You can send this leave data to the backend
//     // console.log('Leave request submitted:', leaveDetails);
//     // toast.success('Leave request submitted successfully!');
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="text-center mb-4">Leave Request</h2>
      
//       <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
//         <div className="form-row">
//           {/* Start Date */}
//           <div className="form-group col-md-6">
//             <label htmlFor="startDate">Start Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="startDate"
//               value={leaveDetails.startDate}
//               onChange={(e) => setLeaveDetails({ ...leaveDetails, startDate: e.target.value })}
//               required
//             />
//           </div>

//           {/* End Date */}
//           <div className="form-group col-md-6">
//             <label htmlFor="endDate">End Date</label>
//             <input
//               type="date"
//               className="form-control"
//               id="endDate"
//               value={leaveDetails.endDate}
//               onChange={(e) => setLeaveDetails({ ...leaveDetails, endDate: e.target.value })}
//               required
//             />
//           </div>
//         </div>

//         {/* Reason */}
//         <div className="form-group mb-2">
//           <label htmlFor="reason">Reason</label>
//           <textarea
//             className="form-control"
//             id="reason"
//             rows="4"
//             value={leaveDetails.reason}
//             onChange={(e) => setLeaveDetails({ ...leaveDetails, reason: e.target.value })}
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className="d-flex justify-content-center">
//           <button type="submit" className="btn btn-primary px-5 py-2">
//             Submit Request
//           </button>
//         </div>
//       </form>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Leave;
