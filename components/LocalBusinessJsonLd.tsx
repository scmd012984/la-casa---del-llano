import { restaurantInfo, tascaHours, venueCoordinates } from "@/lib/data";

export default function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: restaurantInfo.name,
    description: restaurantInfo.shortDescription,
    image: restaurantInfo.logo.src,
    telephone: restaurantInfo.phone,
    email: restaurantInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurantInfo.address,
      addressLocality: "La Guaira",
      addressCountry: "VE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: venueCoordinates.lat,
      longitude: venueCoordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "16:00",
        closes: "05:00",
      },
    ],
    servesCuisine: "Tapas y coctelería venezolana",
    priceRange: "$$",
    keywords: restaurantInfo.seoKeywords.join(", "),
    sameAs: ["https://instagram.com/lacasadelllano2014"],
    openingHours: `Tu-Su ${tascaHours}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
