import React, { useEffect, useState } from "react";

import "./newStyle2.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyBooking() {
  const { register, handleSubmit, errors, watch } = useForm();
  const [bookings, setBookings] = useState([]);
  const [name3, setName] = useState("");
  const [email3, setEmail] = useState("");

  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  let name = localStorage.getItem("name");
  let name2 = localStorage.getItem("name2");
  let email = localStorage.getItem("email");
  let email2 = localStorage.getItem("email2");

  function logout() {
    if (window.confirm("Would you like to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("name2");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("email2");

      window.location = "/login";
    }
  }

  useEffect(() => {
    axios
      .get("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/search/" + email)
      .then((res) => {
        if (res.data == 0) {
          console.log("no data");
        } else {
          console.log(res.data);
          setBookings(res.data);
        }
      });
  }, []);

  function clickDelete(id) {
    if (window.confirm("are you sure you want to delete the booking?")) {
      axios.delete("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/" + id).then((res) => {
        // console.log(res.data);
        window.location.reload();
      });
    }
  }

  function testSubmit() {
    let testdata = {
      name: name3,
      email: email3,
    };

    console.log(testdata);

    axios.post("https://souvik-appointment-bookingapp.herokuapp.com/usertests/add", testdata).then((res) => {
      alert("testdata submitted");
    });
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
        BookIt!

        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link" to="/dashboard">
                Dashboard{" "}
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/newbooking">
                New Booking
              </Link>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                My Bookings<span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <button
            className="btn btn-danger navbar-btn ml-auto"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      {!token && !role ? (
        (window.location = "/login")
      ) : (
        <div>
           <img
            class="fillpic"
            src="/pokemon2.png"
           
            style={{ width: "100%", height: "auto" }}
          />
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Booking ID</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {bookings.map((booking, index) => (
            <>
              <tbody style={{backgroundColor:' rgba(0, 0, 0, 0.637)'}}>
                <tr style={{color:'white'}}>
                  <th scope="row">{index + 1}</th>
                  <td>{booking._id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        clickDelete(booking._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
        </div>
      )}

      <div style={{ display: "none" }}>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button onClick={testSubmit}>submit data</button>
      </div>
    </>
  );
}
