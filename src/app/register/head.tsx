export default function Head() {
  const title = "Daftar Donatur | Pantiku";
  const description = "Gabung sebagai donatur di Pantiku dan ikut membangun kemandirian panti.";
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
