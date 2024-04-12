import { Link } from "react-router-dom";
import "../styles/landingPage.css"

function LandingPage() {
  return (
    <div className="landing">
      <h1 className="landing-header-h1">Keep track of your Vehicles & Repairs !!!</h1>
      <div className="landing-container">
        <img src="https://hips.hearstapps.com/hmg-prod/images/2023-porsche-911-gt3-rs-102-1660522723.jpg?crop=1xw:0.8433382137628112xh;center,top&resize=1200:*"
         alt="A img of a luxury car"
         className="landing-img"
          />
      <main className="landing-main">
          <section className="landing-section-hero">
            <h3 className="landing-section-hero-header" style={{fontStyle:"italic"}}>"Change the way you keep track of the repairs, made from the track"</h3>
            <p className="landing-section-hero-text">Experience the ultimate tool for tracking and optimizing your 
              ownership and usage. Efficient, reliable, and user-friendly.
              Discover a smarter way to keep your luxury vehicles organized."</p>
          </section>
          <div>
           <Link to="/dashboard" className="landing-signup-link"><h4>Click here to login, Or if you don't already have an account with us sign up!</h4></Link> 
          </div>
          <article>
           <div>
            <h3>What is our purpose ?</h3>
            <p>Our Service and Ownership app revolutionizes the way you manage your vehicles and their maintenance.
               Designed to simplify the complexities of vehicle ownership, our app provides a user-friendly platform
                to track and record all aspects of your vehicle's service history and performance data.
                 Whether you're a car enthusiast or manage a fleet, this app helps you stay organized
              and proactive with maintenance schedules and repair logs. Ensuring your vehicles are always in peak condition.
             Experience peace of mind with all your vehicle information at your fingertips, optimized to save time and enhance operational efficiency.
            </p>
           </div>
           <div>
            <h3>Features Coming Soon ...</h3>
            <section>
              
            </section>
           </div>
          </article>
       </main>
      </div>
    </div>
  );
}

export default LandingPage;
