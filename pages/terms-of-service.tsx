import React from "react";
import NewsTooper from "@/components/NewsTooper";
import Menu from "@/components/Menu";
import { Session } from "next-auth";

interface Props {
  user: Session | null;
}

function TermsOfService({ user }: Props) {
  const pageTitle = "Terms of Service: Charleston Treasure Hunt";
  const effectiveDate = "Effective Date: November 23, 2024";
  const termsSections = [
    {
      title: "Introduction",
      paragraphs: [
        "Welcome to www.charlestontreasurehunt.com! By accessing or using our site, you agree to these Terms of Service. If you don’t agree, you may not use the site or participate in the treasure hunt.",
        "If you have questions or concerns about these terms, please contact us at ryan@charlestontreasurehunt.com.",
      ],
    },
    {
      title: "Eligibility",
      paragraphs: [
        "You must be at least 13 years old to use this site. If you’re under 18, you may only use the site with the permission of a parent or legal guardian.",
        "By creating an account, you confirm that all information you provide is accurate and up-to-date.",
      ],
    },
    {
      title: "Account Responsibilities",
      paragraphs: [
        "To participate in the Charleston Treasure Hunt, you’ll need to create an account. You are responsible for safeguarding your login credentials. Don’t share your password with others.",
        "If you suspect unauthorized access to your account, notify us immediately at ryan@charlestontreasurehunt.com.",
      ],
    },
    {
      title: "Game Participation",
      paragraphs: [
        "Participation in the Charleston Treasure Hunt requires GPS permissions on your device. You are solely responsible for your safety while navigating locations as part of the game.",
        "Do not trespass, break local laws, or put yourself in harm’s way during gameplay. Charleston Treasure Hunt is not liable for injuries or damages incurred while participating in the game.",
      ],
    },
    {
      title: "Prohibited Activities",
      paragraphs: [
        "When using this site, you agree not to:",
        "- Cheat, manipulate, or exploit the treasure hunt game.",
        "- Use the site for illegal activities.",
        "- Upload malicious software or harm the site’s functionality.",
        "- Harass or harm other participants.",
        "Violations may result in account suspension or termination.",
      ],
    },
    {
      title: "Content Ownership",
      paragraphs: [
        "All content on www.charlestontreasurehunt.com, including text, graphics, and code, is the property of Charleston Treasure Hunt. You may not copy, distribute, or modify this content without written permission.",
        "By submitting content (e.g., reviews, feedback), you grant us a non-exclusive license to use it for improving and promoting the game.",
      ],
    },
    {
      title: "Third-Party Links and Ads",
      paragraphs: [
        "The site may feature advertisements or links to third-party services. These services have their own terms and policies. Charleston Treasure Hunt is not responsible for their content or practices.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "Charleston Treasure Hunt is provided 'as is' without warranties of any kind. We are not responsible for:",
        "- Technical issues, errors, or interruptions.",
        "- Losses arising from your participation in the treasure hunt.",
        "- Injuries, accidents, or damages incurred during gameplay.",
      ],
    },
    {
      title: "Termination",
      paragraphs: [
        "We reserve the right to suspend or terminate your account for violations of these Terms of Service or for any behavior we deem harmful to the game or other users.",
      ],
    },
    {
      title: "Changes to Terms",
      paragraphs: [
        "We may update these Terms of Service as needed. Any changes will be posted on the site. Your continued use of the site after changes means you accept the revised terms.",
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
            {termsSections.map((section, index) => (
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

export default TermsOfService;
