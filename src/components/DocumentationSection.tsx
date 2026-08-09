import Image from "next/image";
import FadeUp from "./FadeUp";

export default function DocumentationSection() {
  return (
    <section className="py-[var(--spacing-section-gap)] bg-surface">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
        <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
              Lens IMM
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Jejak Langkah Kami
            </h2>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm">
              Semua
            </button>
            <button className="bg-surface-container-high px-6 py-2 rounded-full text-sm hover:bg-primary/10">
              Pengkaderan
            </button>
            <button className="bg-surface-container-high px-6 py-2 rounded-full text-sm hover:bg-primary/10">
              Kajian
            </button>
            <button className="bg-surface-container-high px-6 py-2 rounded-full text-sm hover:bg-primary/10">
              Seminar
            </button>
          </div>
        </FadeUp>
        <FadeUp className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 rounded-[var(--radius-glass)] overflow-hidden relative group">
            <Image
              alt="Seminar Nasional Kebangsaan"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjjYaHUmgwwN9ZaQy9LqmFkVW5nEvtlsPSdvvlumJrfSvzIqDyIqdn8-2Zc9e715BJrc2W4XBCYdOwZtpVSp-uk8uG7mPvVAQEVTSatpB-MOOdYo2tu2ROyKk0CfjvY4Q1i489Ed11MuAFpX76yjRnsXwUCKz1cQn19X0OZbVMLAXIAkIbVlIxBVL6vuI9DCaFvHWurULkvLDR7S5fcCsVPGRpuOOmdECjX1CG0zBrRtwv3VO92bGr"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-bold">Seminar Nasional Kebangsaan</p>
            </div>
          </div>
          <div className="rounded-[var(--radius-glass)] overflow-hidden h-64 relative group">
            <Image
              alt="Kajian"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBekRX3pKKUclwdcqw3VrzXGCa0yZ823sQpf0OzpG6zRbeM6Y24YfacRvtn-70w17zsMquhXWxsE75ekz8HCN_XeWHdH6_HqDx4YPJhdItMI-awkfW7GbEYtvG-K-9we0JQg8jSmhr9iUM-72iOqiouvntNTz6UTSNsN_DG11q3oESbjngJG2H73b1vrkNKrMa1PrL_t5B4qrdprw1f7aKDy9PDa0nEsRXIKt9alt_67HzyLoO34lfT"
              fill
            />
          </div>
          <div className="rounded-[var(--radius-glass)] overflow-hidden h-64 relative group">
            <Image
              alt="Leadership training"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOx_OYWTnbVeLgq0evX4ef69T1o6mmdKNwH2J9Z7TdLtp_euGpcKtCdFQ_o40IZgWBb6qu5qUq1LG5E9TAUL_LLhPeDjY-b2k_FLQ0L1GmQf5auj3fI4CatZRhP3alwL1TfyEmZQY-lZStAilhDzsbldF1cN2JTCKsLtiJ4jjH-7epcvmh3qefwFr-CUDKXIxDvFRV8vg1eZ9h8rmu_1eYjA8HuS4aDDYDTF_UHy3F4RwtRvkdHwyE"
              fill
            />
          </div>
          <div className="rounded-[var(--radius-glass)] overflow-hidden h-64 relative group">
            <Image
              alt="Community service"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXd830NxwB2XJFGqM2B01S6rlObBlS0PJBFmoX5R9mGdkBphYtp0IW5Xq2SG93VEU-a0siSwjjWiwVF0cOaQD7eb4dQDHgY_7jDQrNw-UfAdeSPjIY-X3Fx_7feurOFZiN58nCHZBVKlQcPI8ZPlo021kfE8VLQXv9R1E0sw_5PPaR774je6KIKRCSVs0QEvhbRLz7RrjEW8ZCqsXONBPLoxGAEysUUyoUm2Wf1Wzr4mhpiKMYn4-h"
              fill
            />
          </div>
          <div className="rounded-[var(--radius-glass)] overflow-hidden h-64 relative group">
            <Image
              alt="Calligraphy workshop"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMBZE7XMulRkP2ZLP1_5_XVoZJmN78tWl0hB7G8B6-0hu_Uv-CqGF7y78U2Eo12IGwm4v1f96Kw4VC5LLFA4jin5l8UANuthdqNSobtgCSO-t0DXwiiJ9mvDIkfusDCRkpP2XE6Xw5UtNVm8Ma5Ux4xyKbW-6Ve2KvJoT7qZ1OQCe-vgPkEakpKiUfgcpiJdYUNBcRTE_9ApuE5UhCtiQyapz0FXJJkgN0XTBDksd_2EtWxJSDM0kn"
              fill
            />
          </div>
        </FadeUp>
        <FadeUp className="text-center mt-12">
          <button className="bg-secondary text-white px-10 py-4 rounded-full font-label-md hover:shadow-lg transition-all">
            Lihat Semua Dokumentasi
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
