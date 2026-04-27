"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/features/auth/api/use-auth";
import { useToast } from "@/components/common/toast-provider";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { RegisterPayload } from "@/lib/api/auth";
import { AccountTypeSelector } from "@/features/auth/components/account-type-selector";
import { Button } from "@/components/ui/button";

type AccountType = RegisterPayload["accountType"];

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const analytics = useAnalytics();
  const registerMutation = useRegister();
  const [accountType, setAccountType] = useState<AccountType>("DONOR");
  const [name, setName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [city, setCity] = useState("");
  const [orphanageName, setOrphanageName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [estimatedChildrenCount, setEstimatedChildrenCount] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setFormError("Format email tidak valid.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password minimal 8 karakter.");
      return;
    }
    if (accountType === "DONOR" || accountType === "VOLUNTEER") {
      if (name.trim().length < 2) {
        setFormError("Nama minimal 2 karakter.");
        return;
      }
    }
    if (accountType === "ORPHANAGE_MANAGER") {
      if (managerName.trim().length < 2) return setFormError("Nama pengelola wajib diisi.");
      if (phone.trim().length < 6) return setFormError("Nomor telepon wajib diisi.");
      if (orphanageName.trim().length < 2) return setFormError("Nama panti wajib diisi.");
      if (address.trim().length < 5) return setFormError("Alamat panti wajib diisi.");
      if (city.trim().length < 2) return setFormError("Kota wajib diisi.");
      if (province.trim().length < 2) return setFormError("Provinsi wajib diisi.");
      if (contactPhone.trim().length < 6) return setFormError("Kontak panti wajib diisi.");
      if (!estimatedChildrenCount || Number(estimatedChildrenCount) <= 0) return setFormError("Estimasi jumlah anak wajib diisi.");
    }

    setFormError(null);
    const payload: RegisterPayload = {
      accountType,
      email,
      password,
      fullName: accountType !== "ORPHANAGE_MANAGER" ? name : undefined,
      managerName: accountType === "ORPHANAGE_MANAGER" ? managerName : undefined,
      phone: phone || undefined,
      skills: accountType === "VOLUNTEER" ? skills || undefined : undefined,
      city: city || undefined,
      orphanageName: accountType === "ORPHANAGE_MANAGER" ? orphanageName : undefined,
      address: accountType === "ORPHANAGE_MANAGER" ? address : undefined,
      province: accountType === "ORPHANAGE_MANAGER" ? province : undefined,
      contactPhone: accountType === "ORPHANAGE_MANAGER" ? contactPhone : undefined,
      estimatedChildrenCount: accountType === "ORPHANAGE_MANAGER" ? Number(estimatedChildrenCount) : undefined
    };
    registerMutation.mutate(
      payload,
      {
        onSuccess: (response) => {
          analytics.track("register", { email, accountType });
          if (accountType === "ORPHANAGE_MANAGER") {
            showToast(
              response.message ??
                "Pendaftaran panti berhasil dikirim. Tim Pantiku akan melakukan verifikasi sebelum campaign dapat dibuat."
            );
          } else if (accountType === "DONOR") {
            showToast("Selamat datang di Pantiku. Mulai dukung campaign sekarang.");
          } else {
            showToast("Registrasi relawan berhasil. Terima kasih sudah siap berbagi kebaikan.");
          }
          router.push("/profile");
        },
        onError: () => showToast("Registrasi gagal. Silakan coba lagi.", "error"),
      }
    );
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl bg-[#FFFCF6] p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Mulai Bangun Dampak Bersama Pantiku</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
        Pilih peranmu untuk berkontribusi dalam membangun panti yang lebih mandiri dan anak yang lebih percaya diri.
      </p>

      <form className="mt-7 space-y-5" onSubmit={onSubmit}>
        <AccountTypeSelector value={accountType} onChange={setAccountType} />

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2">
            {accountType !== "ORPHANAGE_MANAGER" ? (
              <input className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <>
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Nama Pengelola" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="No Telepon Pengelola" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Nama Panti" value={orphanageName} onChange={(e) => setOrphanageName(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Kota" value={city} onChange={(e) => setCity(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Provinsi" value={province} onChange={(e) => setProvince(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="No Telepon Panti" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  placeholder="Jumlah Anak (Estimasi)"
                  type="number"
                  value={estimatedChildrenCount}
                  onChange={(e) => setEstimatedChildrenCount(e.target.value)}
                />
              </>
            )}
            {accountType === "VOLUNTEER" ? (
              <>
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Keahlian (Opsional)" value={skills} onChange={(e) => setSkills(e.target.value)} />
                <input className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Kota (Opsional)" value={city} onChange={(e) => setCity(e.target.value)} />
              </>
            ) : null}
            {accountType === "DONOR" ? (
              <input className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="No Telepon (Opsional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : null}
            <input className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              className="w-full rounded-md border border-slate-300 px-3 py-2 md:col-span-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
        {registerMutation.isError ? <p className="text-sm text-red-600">Registrasi gagal. Coba lagi.</p> : null}
        <Button
          type="submit"
          disabled={registerMutation.isPending}
          size="lg"
          className="w-full rounded-xl shadow-sm hover:shadow-md"
        >
          {registerMutation.isPending ? "Memproses..." : "Daftar Sekarang"}
        </Button>
        <p className="mt-4 text-center text-xs text-gray-500">
          Pantiku saat ini sedang membuka program pilot bersama panti mitra. Kami membangun sistem yang transparan,
          terverifikasi, dan berkelanjutan.
        </p>
      </form>
    </section>
  );
}
