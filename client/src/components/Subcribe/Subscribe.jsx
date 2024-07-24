import React, { useState, useEffect } from "react";
import "./style.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setIsRegistered(true);
    }
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    setIsRegistered(true);
  };

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    setEmail("");
    setIsRegistered(false);
  };

  return (
    <div
      className="subscribe-form-container"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>
        {isRegistered ? "Already Subscribed" : "Subscribe for Daily Alert"}
      </h2>
      <form
        onSubmit={isRegistered ? handleUnsubscribe : handleSubscribe}
        className="subscribe-form"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isRegistered}
          className="subscribe-input"
        />
        <button type="submit" className="subscribe-button">
          {isRegistered ? "Unsubscribe" : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
