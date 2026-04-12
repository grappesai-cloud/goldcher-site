"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { upload } from "@vercel/blob/client";
import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

const schema = z.object({
  artist: z.string().min(1, "Required").max(80),
  email: z.string().email("Invalid email"),
  social: z.string().max(200).optional().or(z.literal("")),
  note: z.string().max(280).optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function Demos() {
  const { t } = useLocale();
  const [state, setState] = useState<"idle" | "uploading" | "success" | "error">(
    "idle"
  );
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setFileError(null);
    if (!file) {
      setFileError("Audio file is required");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setFileError("Max file size is 50MB");
      return;
    }

    setState("uploading");
    try {
      const blob = await upload(
        `demos/${Date.now()}-${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/demos/sign",
        }
      );

      const res = await fetch("/api/demos/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fileUrl: blob.url, fileName: file.name }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setState("success");
      reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      setState("error");
    }
  };

  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>10 — Send Demos</span>
          <span>Open submissions</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-5 md:sticky md:top-32 h-fit">
          <Reveal>
            <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.03em] uppercase mb-6">
              {t("demos.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg opacity-80 mb-8">
              {t("demos.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="border-t border-current/20 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 space-y-2">
              <div>// no filters</div>
              <div>// no gatekeepers</div>
              <div>// every track heard once</div>
              <div>// we reply if it fits</div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 max-w-xl">

        {state === "success" ? (
          <Reveal>
            <div className="border border-current/30 p-8 md:p-12 text-center">
              <div className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight mb-4">
                {t("demos.success")}
              </div>
              <button
                onClick={() => setState("idle")}
                className="mt-8 font-mono text-xs uppercase tracking-widest underline underline-offset-4"
              >
                {t("demos.submit")} ↺
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <Field
                label={t("demos.artist")}
                error={errors.artist?.message}
                input={
                  <input
                    {...register("artist")}
                    type="text"
                    autoComplete="off"
                    className="w-full bg-transparent border-b border-current/30 py-3 focus:outline-none focus:border-current transition-colors"
                  />
                }
              />
              <Field
                label={t("demos.email")}
                error={errors.email?.message}
                input={
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    className="w-full bg-transparent border-b border-current/30 py-3 focus:outline-none focus:border-current transition-colors"
                  />
                }
              />
              <Field
                label={t("demos.social")}
                error={errors.social?.message}
                input={
                  <input
                    {...register("social")}
                    type="text"
                    autoComplete="off"
                    className="w-full bg-transparent border-b border-current/30 py-3 focus:outline-none focus:border-current transition-colors"
                  />
                }
              />
              <Field
                label={t("demos.file")}
                hint={t("demos.fileHint")}
                error={fileError ?? undefined}
                input={
                  <input
                    type="file"
                    accept="audio/mpeg,audio/wav,audio/x-wav,audio/mp4,audio/m4a,audio/x-m4a,.mp3,.wav,.m4a"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:border file:border-current/30 file:bg-transparent file:text-inherit file:font-mono file:text-[10px] file:uppercase file:tracking-widest py-3"
                  />
                }
              />
              <Field
                label={t("demos.note")}
                error={errors.note?.message}
                input={
                  <textarea
                    {...register("note")}
                    rows={3}
                    className="w-full bg-transparent border-b border-current/30 py-3 focus:outline-none focus:border-current transition-colors resize-none"
                  />
                }
              />

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={state === "uploading"}
                  className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight border-b-2 border-current pb-2 hover:opacity-60 transition-opacity disabled:opacity-40"
                  data-cursor-hover
                >
                  {state === "uploading" ? `${t("demos.submitting")}...` : `${t("demos.submit")} →`}
                </button>
              </div>

              {state === "error" && (
                <div className="font-mono text-xs uppercase tracking-widest text-eklps-red">
                  {t("demos.error")}
                </div>
              )}
            </form>
          </Reveal>
        )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  input,
}: {
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
          {label}
        </span>
        {hint && !error && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">
            {hint}
          </span>
        )}
        {error && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-eklps-red">
            {error}
          </span>
        )}
      </div>
      <div className="mt-1">{input}</div>
    </label>
  );
}
