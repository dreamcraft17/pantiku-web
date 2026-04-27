export default function Head() {
  const title = "Panti Berdaya | Pantiku";
  const description = "Kenali profil panti berdaya dalam ekosistem Pantiku.";
  const url = "http://localhost:3000/orphanages";
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
