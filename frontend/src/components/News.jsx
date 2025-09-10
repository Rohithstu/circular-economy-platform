import React from "react";

export default function News() {
  const newsItems = [
    {
      title: "ReGenHub launches new sustainability initiative",
      date: "April 15, 2024",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      excerpt: "We are excited to announce a new initiative aimed at increasing community engagement.",
    },
    {
      title: "How businesses are saving money with ReGenHub",
      date: "March 30, 2024",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      excerpt: "Discover how companies are reducing waste disposal costs by listing surplus materials.",
    },
  ];

  return (
    <section id="news" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
      <h2 className="text-3xl font-extrabold text-green-900 text-center">Latest News</h2>
      <p className="mt-4 text-center text-green-800 max-w-3xl mx-auto text-lg">
        Stay updated with the latest news and stories from ReGenHub.
      </p>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map(({ title, date, image, excerpt }, i) => (
          <article key={i} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-6 flex flex-col flex-grow">
              <time className="text-sm text-green-600 font-semibold">{date}</time>
              <h3 className="mt-2 text-xl font-semibold text-green-900">{title}</h3>
              <p className="mt-3 text-green-800 flex-grow">{excerpt}</p>
              <a href="#" className="mt-6 inline-flex items-center text-green-700 font-semibold hover:text-green-900">
                Read more <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
