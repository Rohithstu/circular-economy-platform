// components/HomePage.js - Fixed buttons
import React from "react";

const HomePage = ({ setCurrentPage, user, setAuthMode }) => {
  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setCurrentPage("authform");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Transform Waste into Resources
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto">
              Join the circular economy movement. Connect businesses to exchange
              materials, reduce waste, and create sustainable value.
            </p>
            <div className="mt-10">
              <button
                className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                onClick={() => setCurrentPage("marketplace")}
              >
                Explore Marketplace
              </button>
              {!user && (
                <button
                  className="ml-4 bg-transparent border border-white text-white px-8 py-3 rounded-md text-base font-medium hover:bg-white hover:text-green-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm("register")}
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ... rest of the HomePage component remains the same ... */}

      {/* CTA Section */}
      <section className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Join the Circular Economy?
          </h2>
          <p className="mt-4 text-xl text-green-100">
            Start reducing waste and creating value from your by-products today.
          </p>
          <div className="mt-8">
            {user ? (
              <button
                className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                onClick={() => setCurrentPage("marketplace")}
              >
                Browse Marketplace
              </button>
            ) : (
              <div className="space-x-4">
                <button
                  className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm("register")}
                >
                  Sign Up Free
                </button>
                <button
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-md text-base font-medium hover:bg-white hover:text-green-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm("login")}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;