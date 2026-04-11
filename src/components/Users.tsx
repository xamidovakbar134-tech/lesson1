// import { push, ref, set } from "firebase/database";
// import type { User } from "../types";
// import { useState } from "react";
// import { realDB } from "../firebase/firebase";
// const Users = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [isStudent, setIsStudent] = useState(false);
//   const [editingUserId, setEditingUserId] = useState<string | null>(null);

//   const handleSave = async () => {
//     try {
//       const usersRef = ref(realDB, "users/");
//       const newUsersRef = push(messagesRef); // ID yaratadi

//       set(newUsersRef, {
//         name,
//         age:parseInt(age),
//         isStudent,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="vh-100 d-flex justify-content-center align-items-center">
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-3">
//       <div className="d-flex justify-content-end mb-3"></div>
//       <div className="card w-25 mx-auto my-2">
//         <div className="card-header bg-dark text-white text-center">
//           Add User
//         </div>
//         <div className="card-body">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Name..."
//             className="form-control"
//           />
//           <input
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             type="text"
//             placeholder="Age..."
//             className="form-control mt-2"
//           />
//           <div className="form-check mt-2">
//             <input
//               id="isStudent"
//               checked={isStudent}
//               onChange={(e) => setIsStudent(e.target.checked)}
//               type="checkbox"
//               className="form-check-input ms-2"
//             />
//             <label htmlFor="isStudent" className="form-check-label ms-2">
//               isStudent
//             </label>
//           </div>
//         </div>
//         <div className="card-footer">
//           <button onClick={handleSave} className="btn btn-dark w-100">
//             Save
//           </button>
//         </div>
//       </div>
//       <table className="table">
//         <thead className="table-dark">
//           <tr>
//             <th>N</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>isStudent</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.id}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.age}</td>
//               <td>{String(user.isStudent)}</td>
//               <td>
//                 <button className="btn btn-sm btn-danger me-2">Delete</button>
//                 <button className="btn btn-sm btn-warning">Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;
