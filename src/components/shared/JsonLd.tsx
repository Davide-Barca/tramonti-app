type JsonLdProps = {
  /** schema.org object (with @context and @type). */
  data: Record<string, unknown>;
};

/** Structured data script. "<" is escaped so the JSON cannot close the tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
