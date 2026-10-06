export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

/**
 * Company data shown in the footer (and reused by structured data).
 * TODO: placeholders until the real data is provided. VAT number is required
 * on the site by law (art. 35 DPR 633/72); license and insurance are the
 * travel agency details, shown only when set.
 */
export const company = {
  name: "Ragione sociale",
  vatNumber: "00000000000",
  address: "Indirizzo da definire",
  email: "info@example.com",
  phone: "+39 000 0000000",
  license: null as string | null,
  insurance: null as string | null,
  social: {
    // TODO: real profile URLs.
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
};
