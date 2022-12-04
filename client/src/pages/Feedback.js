/** @format */

import React, { useState } from "react";
import "../styles/feedback.css";
import Axios from "../axios";
import NavBar from "../components/Navbar";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const sentFeedback = () => {
    Axios.post("/feedback", { name, email, subject, message });
  };

  return (
    <div className="feedback-container">
      <NavBar />
      <h3 className="feedback-title">FeedBack</h3>
      <from className="feedback-from">
        <label>Name</label>
        <div className="feedback-name">
          <input
            className="feedback-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <label>Email</label>
        <div>
          <input
            className="feedback-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label>Subject</label>
        <div>
          <input
            className="feedback-input"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <label>Message</label>
        <div>
          <textarea
            className="feedback-message"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button onClick={() => sentFeedback()}>Send Feedback</button>
      </from>
    </div>
  );
}

export default Feedback;
