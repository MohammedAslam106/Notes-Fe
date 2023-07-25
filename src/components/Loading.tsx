// import React, { useState, useEffect } from 'react';

// const Loading = ({children}) => {
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div className="container">
//       {loading ? (
//         <div className="loader-container">
//       	  <div className="spinner"></div>
//         </div>
//       ) : children}
//     </div>
//   );
// };

// export default Loading;