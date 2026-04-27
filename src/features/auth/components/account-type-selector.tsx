"use client";

export type AccountTypeOption = {
  id: "DONOR" | "ORPHANAGE_MANAGER" | "VOLUNTEER";
  label: string;
  description: string;
  icon: string;
};

type Props = {
  value: AccountTypeOption["id"];
  onChange: (value: AccountTypeOption["id"]) => void;
};

const options: AccountTypeOption[] = [
  {
    id: "DONOR",
    label: "Donatur",
    description: "Dukung program dan bantu panti menjadi mandiri",
    icon: "💚",
  },
  {
    id: "ORPHANAGE_MANAGER",
    label: "Pengelola Panti",
    description: "Kelola panti, buat campaign, dan kembangkan kemandirian",
    icon: "🏠",
  },
  {
    id: "VOLUNTEER",
    label: "Relawan",
    description: "Berbagi waktu dan keahlian untuk mendampingi anak",
    icon: "🤝",
  },
];

export function AccountTypeSelector({ value, onChange }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
              selected
                ? "border-emerald-600 bg-emerald-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {option.icon}
              </span>
              <p className={`text-sm font-semibold ${selected ? "text-emerald-800" : "text-slate-800"}`}>{option.label}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">{option.description}</p>
          </button>
        );
      })}
    </div>
  );
}
