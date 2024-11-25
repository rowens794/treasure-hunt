import React from "react";
import NewsTooper from "@/components/NewsTooper";

export default function DataDeletionPolicy() {
  const pageTitle = "Data Deletion Policy: Charleston Treasure Hunt";
  const effectiveDate = "Effective Date: November 23, 2024";
  const policySections = [
    {
      title: "Introduction",
      paragraphs: [
        "At www.charlestontreasurehunt.com, we respect your privacy and your right to control your data. This page explains how you can request the deletion of your data and what happens when you make such a request.",
        "If you wish to delete your data, please email us at ryan@charlestontreasurehunt.com with the subject line 'Data Deletion Request.'",
      ],
    },
    {
      title: "What Happens When You Request Data Deletion",
      paragraphs: [
        "When you request the deletion of your data:",
        "- Your account and all associated data will be permanently deleted from our servers.",
        "- Any progress in the Charleston Treasure Hunt will be lost and cannot be recovered.",
        "- Your credentials and activity logs will be erased from our system.",
        "Please note that some non-personal, aggregated data used for analytics may remain, as it cannot be linked back to your account.",
      ],
    },
    {
      title: "How to Request Data Deletion",
      paragraphs: [
        "To request data deletion, email us at ryan@charlestontreasurehunt.com with the following information:",
        "- Your full name.",
        "- The email address associated with your account.",
        "- A brief statement confirming that you wish to delete your data.",
        "We will process your request within 14 business days and confirm once the deletion is complete.",
      ],
    },
    {
      title: "Important Considerations",
      paragraphs: [
        "Before requesting data deletion, please keep the following in mind:",
        "- Deleting your data is permanent and cannot be undone.",
        "- You will no longer be able to access your account or participate in the treasure hunt using the deleted credentials.",
        "- If you wish to participate again, you will need to create a new account.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        "If you have questions about this policy or the deletion process, feel free to contact us at ryan@charlestontreasurehunt.com. We’re here to help!",
      ],
    },
  ];

  return (
    <div className="relative w-full h-full bg-parchment pb-24">
      <div className="relative w-full bg-parchment">
        <NewsTooper />

        <div className="w-full px-8">
          <h1 className="text-3xl font-bold mt-4 mb-2">{pageTitle}</h1>
          <p className="text-sm text-gray-600 mb-4">{effectiveDate}</p>
          <div className="text-base leading-7 text-gray-900 text-justify">
            {policySections.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-5">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
