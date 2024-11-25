import React from "react";
import NewsTooper from "@/components/NewsTooper";
import Menu from "@/components/Menu";
import { Session } from "next-auth";

interface Props {
  user: Session | null;
}

function PrivacyPolicy({ user }: Props) {
  const pageTitle = "Privacy Policy: Your Data and Charleston Treasure Hunt";
  const effectiveDate = "Effective Date: November 23, 2024";
  const policySections = [
    {
      title: "Introduction",
      paragraphs: [
        "Welcome to www.charlestontreasurehunt.com. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your data while you participate in our interactive treasure hunt experience in Charleston, WV.",
        "By using our site, you agree to the terms outlined here. If you have questions, feel free to contact us at ryan@charlestontreasurehunt.com.",
      ],
    },
    {
      title: "What Data We Collect",
      paragraphs: [
        "To ensure the best experience, we collect the following:",
        "- Login Credentials: A username and password to track your progress and maintain your unique game profile.",
        "- GPS Coordinates: Location data from your phone, essential for verifying your presence at specific locations during the hunt.",
        "- Analytics Data: Information like your interaction patterns, device type, and browser to improve the site.",
      ],
    },
    {
      title: "How We Use Your Data",
      paragraphs: [
        "Your data is used exclusively for the following purposes:",
        "- Enabling and enhancing the treasure hunt game experience.",
        "- Verifying your progress and ensuring fair play.",
        "- Improving the user experience through analytics.",
        "- Showing relevant advertisements for local services and vendors.",
        "- Communicating with you about game updates and features.",
      ],
    },
    {
      title: "What We Don't Do",
      paragraphs: [
        "We respect your privacy and will not:",
        "- Sell your data to third parties.",
        "- Share your personal information outside the scope of this Privacy Policy.",
      ],
    },
    {
      title: "How We Protect Your Data",
      paragraphs: [
        "We take security seriously. Your data is encrypted and stored securely. Access is restricted to authorized personnel only. However, no system is completely foolproof, so we recommend you use a strong password and take steps to protect your own account.",
      ],
    },
    {
      title: "Third-Party Advertisements and Services",
      paragraphs: [
        "We may display ads or promotions from local vendors. These advertisers may have their own privacy policies, so please review their terms if you choose to interact with them.",
      ],
    },
    {
      title: "Your Choices",
      paragraphs: [
        "You have control over your data. You can:",
        "- Update your login credentials in your account settings.",
        "- Opt out of certain communications by contacting us at ryan@charlestontreasurehunt.com.",
        "- Revoke GPS permissions on your device, though this may limit your ability to participate in the game.",
      ],
    },
    {
      title: "Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect improvements or changes in legal requirements. We'll notify you of major updates on the site or via email.",
      ],
    },
  ];

  return (
    <div className="relative w-full h-full bg-parchment pb-24">
      <div className="relative w-full bg-parchment">
        <NewsTooper />
        <Menu user={user} />

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

export default PrivacyPolicy;
