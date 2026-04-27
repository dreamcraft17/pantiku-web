type Props = { params: Promise<{ id: string }> };

export default async function Head({ params }: Props) {
  const { id } = await params;
  const title = "Profil Panti | Pantiku";
  const description = "Lihat profil panti berdaya dan dukung program produktifnya.";
  const url = `http://localhost:3000/orphanages/${id}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
