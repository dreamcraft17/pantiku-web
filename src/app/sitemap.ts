import { MetadataRoute } from "next";
import { mockCampaigns, mockOrphanages, mockProducts } from "@/lib/mock/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  const staticRoutes = ["", "/login", "/register", "/campaigns", "/marketplace", "/impact", "/orphanages", "/profile"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const campaignRoutes = mockCampaigns.map((campaign) => ({
    url: `${baseUrl}/campaigns/${campaign.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productRoutes = mockProducts.map((product) => ({
    url: `${baseUrl}/marketplace/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const orphanageRoutes = mockOrphanages.map((orphanage) => ({
    url: `${baseUrl}/orphanages/${orphanage.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...campaignRoutes, ...productRoutes, ...orphanageRoutes];
}
