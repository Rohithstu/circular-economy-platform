import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "List your surplus materials",
      description:
        "Easily upload details and photos of your surplus materials to make them available for reuse.",
      icon: "fas fa-upload",
    },
    {
      title: "Connect with buyers",
      description:
        "Reach a wide network of businesses and organizations looking for sustainable materials.",
      icon: "fas fa-handshake",
    },
    {
      title: "Reduce waste & save money",
      description:
        "Give your materials a second life, reduce landfill waste, and save on disposal costs.",
      icon: "fas fa-recycle",
    },
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
      <h2 className="text-3xl font-extrabold text-green-900 text-center">How it works</h2>
      <p className="mt-4 text-center text-green-800 max-w-3xl mx-auto text-lg">
        ReGenHub makes it simple to give your surplus materials a new life.
      </p>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ title, description, icon }, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-4 px-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-700 text-3xl">
              <i className={icon}></i>
            </div>
            <h3 className="text-xl font-semibold text-green-900">{title}</h3>
            <p className="text-green-800">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
