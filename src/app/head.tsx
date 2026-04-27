export default function Head() {
  const title = "Pantiku | Bangun Kemandirian Panti, Bukan Sekadar Donasi";
  const description =
    "Pantiku menghubungkan panti asuhan, donatur, relawan, dan pasar untuk membangun anak yang percaya diri dan panti yang mandiri.";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
