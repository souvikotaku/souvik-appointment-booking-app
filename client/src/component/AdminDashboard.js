import React, { useEffect, useState } from "react";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";


export default function AdminDashboard() {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");

  function logout() {
    if (window.confirm("Would you like to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location = "/AdminLogin";
    }
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
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Dashboard<span class="sr-only">(current)</span>{" "}
            </a>
          </li>
          <li class="nav-item ">
            <Link class="nav-link" to="/allbooking">
              All Bookings
            </Link>
          </li>
         
        </ul>
        <button className="btn btn-danger navbar-btn ml-auto" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>

    {token && role ? (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            src="/videos/space.mp4"
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "auto" }}
          />

          <section
            class="headsect"
            style={{
              marginTop: "10%",
              padding: "5px 15px",
              borderRadius: "30px",
            }}
          >
            <h1 style={{ color: "white", fontSize: "100px" }}>
              Welcome {role}!!
            </h1>
            <br/>
            <div style={{ textAlign: "center",color: "white" }}>
          <h3>Go check out some <Link to="/allbooking">User bookings</Link> mate!!</h3>
          <h3><i>...and come back later for some Pizza</i></h3>

          </div>

          </section>
          
        </div>
        
      </>
    ) : (
      (window.location = "/AdminLogin")
    )}
  </>
  );
}
