/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Qabul ro`yxati</h3>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Asosiy sahifa
        </button>
      </div>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Manzil</th>
              <th>Ism</th>
              <th>Telefon</th>
              <th>Vaqti</th>
              <th>Holati</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.location}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.date}</td>
                <td>Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
