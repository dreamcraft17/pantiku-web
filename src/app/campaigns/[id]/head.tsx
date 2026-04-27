import { mockCampaigns } from "@/lib/mock/data";

type Props = { params: Promise<{ id: string }> };

export default async function Head({ params }: Props) {
  const { id } = await params;
  const campaign = mockCampaigns.find((item) => item.id === id);

  const title = campaign ? `${campaign.title} | Pantiku` : "Detail Campaign | Pantiku";
  const description = campaign
    ? `${campaign.summary} Dukung campaign produktif bersama Pantiku.`
    : "Dukung campaign produktif bersama Pantiku.";
  const image = campaign?.image ?? "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";
  const url = `http://localhost:3000/campaigns/${id}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
