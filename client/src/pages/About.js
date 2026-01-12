import React from 'react';

function About() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 text-primary mb-3">About ShalomBay</h1>
            <p className="lead text-muted">
              Dedicated to helping humanity solve health challenges with unique, result-oriented solutions.
            </p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <h3 className="h4 text-primary border-bottom pb-2 mb-3">Our Mission</h3>
                <p>
                  At ShalomBay, our aim is to list products that are unique, result-oriented, and efficacious. 
                  We are driven by a passion to help humanity overcome health challenges through carefully 
                  selected solutions that deliver real results.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="h4 text-primary border-bottom pb-2 mb-3">Our Research</h3>
                <p>
                  We only research and list what we have at our disposal to the best of our knowledge. 
                  Our team is committed to finding products that stand out for their quality and effectiveness, 
                  ensuring you have access to the best possible options for your well-being.
                </p>
              </div>

              <div className="bg-light p-4 rounded">
                <h3 className="h5 text-dark mb-3">Transparency & Manufacturers</h3>
                <p className="mb-0 text-muted">
                  Please note that our listed products belong to their respective manufacturers. 
                  ShalomBay acts as a curator and facilitator, bringing these unique health solutions 
                  closer to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;