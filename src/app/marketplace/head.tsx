export default function Head() {
  const title = "Produk Karya Panti | Pantiku";
  const description = "Jelajahi produk karya panti berkualitas yang mendorong kemandirian ekonomi panti.";
  const url = "http://localhost:3000/marketplace";
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
