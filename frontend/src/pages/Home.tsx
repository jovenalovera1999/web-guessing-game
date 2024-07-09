import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "Guessing Game | Home";
  });

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card col-sm-5 mt-3">
            <div className="card-body">
              <h5 className="card-title">Welcome to Guessing Game!</h5>
              <div className="d-flex justify-content-center">
                <Link to={"/entry"} className="btn btn-primary">
                  Press here to continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
