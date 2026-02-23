import React from 'react'
import './about.css'
import Quote from '../../components/Quote';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our personalized planner. We are dedicated to helping you
          organize your life and achieve your goals.
        </p>
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a user-friendly platform that helps individuals
            manage their tasks, schedules, and personal goals effectively.
          </p>
        </div>
        <Quote />
      </div>
    </section>
  )
}

export default About
