/* eslint-disable react-hooks/immutability */
import Rodal from "rodal";
import { useEffect, useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import type { Barber } from "../types";
// import type { User } from "../types";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [openRodal, setOpenRodal] = useState(false);
  const [rodal, setRodal] = useState(false);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientTime, setClientTime] = useState("");
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
    const [editingBarber, setEditingBarber] = useState<Barber | null>(null);

  const closeModal = () => {
    setOpenRodal(false);
  };
  const API = "http://localhost:3000";
  const navigate = useNavigate();
  useEffect(() => {
    fetchBarbers();
  }, []);
  async function fetchBarbers() {
    try {
      const { data } = await axios.get("http://localhost:3000/barbers");
      setBarbers(data);
    } catch (error) {
      console.error(error);
    }
  }

const handleDelete = async (id: string) => {
    try {
      await axios.delete(API + `/barbers/${id}`);
      getBarbers();
    } catch (error) {
      console.log(error);
    }
  };

const handleEdit = (barber: Barber) => {
    setEditingBarber(barber);
    setName(barber.name);
    setImg(barber.img);
    setExperience(barber.experience.toString());
    setRating(barber.rating.toString());
    setLocation(barber.location);
    setOpenRodal(true);
  };

  const getBarbers = async () => {
    try {
      const { data } = await axios.get(API + "/barbers");
      setBarbers(data);
    } catch (error) {
      console.log(error);
    }
  };

const handleUsers = async () => {
    if (!selectedBarber) {
      return;
    };
    const newUser = {
      barber: selectedBarber.name,
      location: selectedBarber.location,
      name: clientName,
      phone: clientPhone,
      time: clientTime,
      status: "Yuborilgan",
    };
    try {
      await axios.post(API + "/users", newUser);
      setClientName("");
      setClientPhone("");
      setClientTime("");
      setSelectedBarber(null);
      close();
    } catch (error) {
      console.log(error);
    }
  };

const handleAddBarber = async () => {
    const barberObj = { name, img, experience: parseInt(experience), rating: parseInt(rating), location };
  
    try {
      if (editingBarber) {
        await axios.put(API + `/barbers/${editingBarber.id}`, barberObj);
      } else {
        const { data: newData } = await axios.post(API + "/barbers", barberObj);
        setBarbers([...barbers, newData]);
      }
      getBarbers();
      closeModal();
      setEditingBarber(null);
      setName("");
      setImg("");
      setExperience("");
      setLocation("");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <div className="container p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">All Barbers</h3>
          <div className="d-flex gap-2">
            <button onClick={() => setOpenRodal(true)} className="btn btn-dark">
              + Barber
            </button>
            <button onClick={() => navigate("/users")} className="btn btn-dark">
              Users
            </button>
          </div>
        </div>
        <Rodal height={400} visible={openRodal} onClose={closeModal}>
          <div className="p-2">
            <h3 className="mb-3">{}</h3>
            <input
              type="text"
              placeholder="Barber ismi..."
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Img url..."
              className="form-control mt-2"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <div className="d-flex gap-2 justify-content-between align-items-center">
              <input
                type="text"
                placeholder="tajriba"
                className="form-control mt-2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="text"
                placeholder="rating"
                className="form-control mt-2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="location..."
              className="form-control mt-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-light" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  handleAddBarber()
                }
              >
                Save
              </button>
            </div>
          </div>
        </Rodal>
      </div>
      <div className="container p-3 d-flex gap-4 align-items-center">
        {barbers.map((barber) => (
          <div className="max-w bg-white rounded-3xl overflow-hidden shadow-lg ">
            <div className="relative h-64">
              <img
                src={barber.img}
                alt="Barber"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white  px-3 py-1 rounded-2xl flex! items-center! gap-1 ">
                <RiStarSLine className="text-yellow-500!" />
                <span className="text-sm font-bold text-gray-800!">
                  {barber.rating}
                </span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex justify-between items-start mb-4">
                <h2 className=" font-bold text-gray-900!">{barber.name}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(barber)}
                    className="btn btn-primary rounded-xl "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(barber.id)}
                    className="btn btn-danger rounded-xl "
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className=" mb-6 d-flex flex-col gap-2">
                <div className="flex! items-center! gap-2 text-gray-500! bg-gray-200! w-fit px-3 py-1.5! rounded-lg">
                  <span className="text-sm d-flex align-items-center gap-2 font-medium">
                    <LuBriefcaseBusiness size={20} />
                    {barber.experience} yil tajriba
                  </span>
                </div>
                <div className="flex! items-center! gap-2 text-gray-500! bg-gray-200! w-fit px-3 py-1.5! rounded-lg">
                  <span className="text-sm d-flex align-items-center gap-2 font-medium">
                    <CiLocationOn size={20} />
                    {barber.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setRodal(true)}
                className="w-full btn btn-dark"
              >
                Yozilish
              </button>
            </div>
          </div>
        ))}

        <Rodal onClose={() => setRodal(false)} visible={rodal} height={350}>
          <div className="p-2">
            <h3 className="mb-3">{barbers[0]?.name}</h3>
            <p className="text-sm text-gray-500! d-flex align-items-center gap-2">
              <CiLocationOn size={20} />
              Toshkent , Chilonzor
            </p>
            <input
              type="text"
              placeholder="Ismingiz..."
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefon raqamingiz..."
              className="form-control mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="date"
              placeholder="Vaqti..."
              className="form-control mt-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-light" onClick={() => setRodal(false)}>
                Cancel
              </button>
              <button onClick={handleUsers} className="btn btn-dark">
                Yozilish
              </button>
            </div>
          </div>
        </Rodal>
      </div>
    </div>
  );
};

export default Home;

