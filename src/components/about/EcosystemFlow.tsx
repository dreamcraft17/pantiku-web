import { ArrowDown } from "lucide-react";

const steps = [
  "Donatur mendukung campaign produktif",
  "Panti menerima dukungan dan pendampingan",
  "Anak mengikuti pelatihan dan pengembangan keterampilan",
  "Panti menghasilkan produk atau kegiatan produktif",
  "Produk dipasarkan melalui Pantiku",
  "Pendapatan membantu panti menjadi lebih mandiri",
];

export function EcosystemFlow() {
  return (
    <section className="py-20">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:p-10">
        <h2 className="text-3xl font-bold text-slate-900">Ekosistem Pantiku</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Ekosistem ini dirancang agar dukungan dapat bergerak dari niat baik menjadi dampak berkelanjutan.
        </p>
        <div className="mt-8 grid gap-3">
          {steps.map((step, idx) => (
            <div key={step}>
              <article className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                <p className="text-sm font-medium text-slate-800">{step}</p>
              </article>
              {idx < steps.length - 1 ? (
                <div className="flex justify-center py-2 text-emerald-500">
                  <ArrowDown className="h-4 w-4" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
