import { loadProfile } from "@/lib/content/profile";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// About의 Person JSON-LD. 원본은 content/profile.yaml이다.
// worksFor는 넣지 않는다(소개에 현재 회사를 두지 않는 방침, PRD-004 5.6).
export const buildAboutJsonLd = () => {
  const profile = loadProfile();
  const { github, linkedin } = profile.contacts;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      alternateName: profile.handle,
      jobTitle: profile.role,
      url: `${SITE_URL}/about`,
      sameAs: [github, linkedin],
      alumniOf: profile.education.map(({ school }) => ({
        "@type": "CollegeOrUniversity",
        name: school,
      })),
      hasCredential: profile.certifications.map(
        ({ name, issuer, verifyUrl }) => ({
          "@type": "EducationalOccupationalCredential",
          name,
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: issuer },
          ...(verifyUrl ? { url: verifyUrl } : {}),
        }),
      ),
    },
  };
};

export const buildWebSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
});
