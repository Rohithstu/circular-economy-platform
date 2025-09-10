import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-32 flex flex-col-reverse lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 leading-tight">
            Unlock the power of circular economy
          </h1>
          <p className="mt-6 text-lg text-green-800 max-w-xl mx-auto lg:mx-0">
            Join ReGenHub to give your surplus materials a new life and help build a sustainable future.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
            <button className="px-8 py-3 rounded-md bg-green-700 text-white font-semibold hover:bg-green-800">
              Get started
            </button>
            <button className="px-8 py-3 rounded-md border border-green-700 text-green-700 font-semibold hover:bg-green-700 hover:text-white">
              Learn more
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80"
            alt="Circular economy exchange"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
