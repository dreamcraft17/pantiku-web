import { mockProducts } from "@/lib/mock/data";

type Props = { params: Promise<{ id: string }> };

export default async function Head({ params }: Props) {
  const { id } = await params;
  const product = mockProducts.find((item) => item.id === id);
  const title = product ? `${product.name} | Produk Karya Panti` : "Detail Produk | Pantiku";
  const description = product?.shortStory ?? "Temukan produk karya panti yang berkualitas dan berdampak.";
  const image = product?.images?.[0] ?? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80";
  const url = `http://localhost:3000/marketplace/${id}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
