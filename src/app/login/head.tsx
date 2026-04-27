export default function Head() {
  const title = "Masuk | Pantiku";
  const description = "Masuk ke Pantiku untuk mendukung campaign produktif dan melihat dampak nyata.";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
