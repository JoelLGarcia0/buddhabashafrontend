"use client";

import { useState } from "react";

export default function ProductDetailsTabs({
  description,
}: {
  description: string;
}) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { key: "description", label: "Description" },
    { key: "care", label: "Care" },
    { key: "shipping", label: "Shipping" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return <p className="text-gray-700">{description}</p>;
      case "care":
        return (
          <p className="text-gray-700">
            Avoid direct contact with water, perfumes, or harsh chemicals. Clean
            gently with a soft cloth and store in a dry place.
          </p>
        );
      case "shipping":
        return (
          <p className="text-gray-700">
            All orders are processed within 2–3 business days. Shipping times
            vary by location.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-2">
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="text-sm leading-relaxed">{renderContent()}</div>
    </div>
  );
}
