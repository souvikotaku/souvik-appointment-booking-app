import React, { useEffect, useState } from "react";

import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

import "./newStyle2.css";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewBooking() {
  const [newdate, setDate] = useState("");
  const [newtime, setTime] = useState("");
  // const [isBooked, setBooked] = useState("");
  const [isBooked2, setBooked2] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();

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
    axios.get("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/search/"+email).then((res) => {
      if (res.data == 0) {
        console.log("no data");
      } else {
        console.log(res.data);
        setBooked2(res.data[0].isBooked);
      }
    });
  }, []);

  const onSubmit = () => {
    const newOne = new Date(newdate).toLocaleDateString("en-fr", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    console.log(newOne);
    console.log(newtime);

    let booking_data = {
      name: name2,
      email: email2,
      time: newtime,
      date: newOne,
      isBooked: true,
    };

    console.log(booking_data);

    // setBooked(booking_data.isBooked);

    axios
      .post("https://souvik-appointment-bookingapp.herokuapp.com/userbookings/add", booking_data)
      .then((res) => {
        alert("booking done");

        window.location.reload();
        //   localStorage.removeItem("name2");
        //   localStorage.removeItem("email2");
      });
  };

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
            <li class="nav-item active">
              <a class="nav-link" href="#">
                New Booking<span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/mybooking">
                My Bookings
              </Link>
            </li>
          </ul>
          <button className="btn btn-danger navbar-btn ml-auto" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

     

      {!token && !role ? (
        (window.location = "/login")
      ) 
      : isBooked2 ? (
        <>
          <div>
            <video
              src="/videos/colors.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto" }}
            />

            <div className="register " class="registerback">
              <div
                className="register_container shadow"
                class="colorbox"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
                  <h3 class="section-header">Book Appointment</h3>
                  <br />
                  <div class=" indv">
                    <div
                      class="input-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <span class="input-group-addon">
                        <i class="fa fa-user fa" aria-hidden="true"></i>
                      </span>

                      <DatePicker
                        disabled
                        onChange={setDate}
                        required
                        value={newdate}
                      />
                    </div>
                  </div>

                  <div class="indv">
                    <div
                      class="input-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <span class="input-group-addon">
                        <i class="fa fa-lock fa" aria-hidden="true"></i>
                      </span>
                      <TimePicker disabled onChange={setTime} value={newtime} />
                    </div>
                  </div>

                  <br></br>

                  <div class="coolone">
                    <button
                      disabled
                      className="btn btn-success btn-md"
                      type="submit"
                    >
                      Book
                    </button>
                  </div>

                  <span>
                    Booking is already done. To make a new booking, delete the
                    previous one at <Link to="/mybooking">My Bookings Page</Link>
                  </span>
                  <br />

                  <p style={{ color: "lightgray" }}>
                    Made by Souvik Das in 2021
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      ) 
      : (
        <>
          <div>
            <video
              src="/videos/eduvid2.mp4"
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "auto" }}
            />

            <div className="register " class="registerback">
              <div
                className="register_container shadow"
                class="colorbox"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
                  <h3 class="section-header">Book Appointment</h3>
                  <br />
                  <div class=" indv">
                    <div
                      class="input-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <span class="input-group-addon">
                        <i class="fa fa-user fa" aria-hidden="true"></i>
                      </span>

                      <DatePicker onChange={setDate} required value={newdate} />
                    </div>
                  </div>

                  <div class="indv">
                    <div
                      class="input-group"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <span class="input-group-addon">
                        <i class="fa fa-lock fa" aria-hidden="true"></i>
                      </span>
                      <TimePicker onChange={setTime} value={newtime} />
                    </div>
                  </div>

                  <br></br>

                  <div class="coolone">
                    <button className="btn btn-success btn-md" type="submit">
                      Book
                    </button>
                  </div>

                  <p style={{ color: "lightgray" }}>
                    Made by Souvik Das in 2021
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
