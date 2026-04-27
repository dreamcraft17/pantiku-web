export default function Head() {
  const title = "Jelajahi Campaign Produktif | Pantiku";
  const description = "Temukan campaign produktif untuk mendukung anak bertumbuh dan panti mandiri bersama Pantiku.";
  const url = "http://localhost:3000/campaigns";
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
