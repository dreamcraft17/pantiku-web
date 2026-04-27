export default function Head() {
  const title = "Profil Pengguna | Pantiku";
  const description = "Kelola profil kontribusi dan perjalanan dukungan Anda di Pantiku.";
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
