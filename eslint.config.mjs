import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

// Import boundaries between public site, admin and shared code.
// Keeps admin code (shadcn/ui, Redux, client-heavy) out of the public bundle.
const ADMIN_ONLY = {
  group: [
    "@/components/admin",
    "@/components/admin/**",
    "@/store",
    "@/store/**",
    "@reduxjs/*",
    "react-redux",
  ],
  message: "Admin-only code: do not import it outside the admin portal.",
};
const SITE_ONLY = {
  group: ["@/components/site", "@/components/site/**"],
  message: "Public-site components: do not import them outside the site.",
};
const SITE_NAVIGATION = [
  {
    name: "next/link",
    message: "Public site: use Link from @/i18n/navigation.",
  },
  {
    name: "next/navigation",
    importNames: ["redirect", "permanentRedirect", "useRouter", "usePathname"],
    message: "Public site: use the locale-aware APIs from @/i18n/navigation.",
  },
];

const boundaries = [
  {
    // Public site: no admin code, locale-aware navigation only.
    files: ["src/app/\\[locale\\]/**", "src/components/site/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [ADMIN_ONLY], paths: SITE_NAVIGATION },
      ],
    },
  },
  {
    // Admin portal: no public-site components.
    files: ["src/app/(admin)/**", "src/components/admin/**", "src/store/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [SITE_ONLY] }],
    },
  },
  {
    // Shared code: must not depend on either side.
    files: [
      "src/components/shared/**",
      "src/features/**",
      "src/lib/**",
      "src/i18n/**",
    ],
    rules: {
      "no-restricted-imports": ["error", { patterns: [ADMIN_ONLY, SITE_ONLY] }],
    },
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...boundaries,
  // Must stay last: turns off rules that conflict with Prettier.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Test artifacts
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
