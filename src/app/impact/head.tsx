export default function Head() {
  const title = "Lihat Dampak Nyata | Pantiku";
  const description = "Lihat dampak nyata dukungan komunitas untuk anak bertumbuh dan panti yang semakin mandiri.";
  const url = "http://localhost:3000/impact";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
