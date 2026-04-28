import Link from "next/link";
import { Campaign } from "@/lib/mock/data";
import { CampaignProgressBar } from "./campaign-progress-bar";
import { formatRupiah } from "@/lib/utils/format";
import { PrimaryButton } from "@/components/common/primary-button";
import { VerificationStatus } from "@/features/orphanages/store/orphanage-store";

type CampaignCardData = Campaign & {
  orphanageVerificationStatus?: VerificationStatus;
};

export function CampaignCard({ campaign }: { campaign: CampaignCardData }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-300">
      <p className="text-xs font-semibold text-emerald-700">Campaign Produktif</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{campaign.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{campaign.summary}</p>
      <p className="mt-2 text-sm text-slate-700">{campaign.orphanageName}</p>
      {campaign.orphanageVerificationStatus === "VERIFIED" ? (
        <p className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</p>
      ) : null}
      <p className="text-sm text-slate-500">{campaign.location}</p>
      <div className="mt-4">
        <CampaignProgressBar collected={campaign.collected} goal={campaign.goal} />
      </div>
      <p className="mt-2 text-sm text-slate-700">Terkumpul: {formatRupiah(campaign.collected)}</p>
      <p className="text-sm text-slate-700">Target: {formatRupiah(campaign.goal)}</p>
      <div className="mt-4 flex gap-2">
        <PrimaryButton href={`/campaigns/${campaign.id}`} label="Dukung Campaign" />
        <Link
          href={`/campaigns/${campaign.id}`}
          className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
