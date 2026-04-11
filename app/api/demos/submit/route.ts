import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  artist: z.string().min(1).max(80),
  email: z.string().email(),
  social: z.string().max(200).optional().or(z.literal("")),
  note: z.string().max(280).optional().or(z.literal("")),
  fileUrl: z.string().url(),
  fileName: z.string().max(256),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.DEMOS_NOTIFY_EMAIL ?? "office@theentbureau.com";
    const from = process.env.DEMOS_FROM_EMAIL ?? "demos@goldchermusic.com";

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `Goldcher Demos <${from}>`,
        to,
        replyTo: data.email,
        subject: `New demo from ${data.artist}`,
        text: [
          `Artist: ${data.artist}`,
          `Email: ${data.email}`,
          data.social ? `Social: ${data.social}` : null,
          data.note ? `Note: ${data.note}` : null,
          `File: ${data.fileName}`,
          `URL: ${data.fileUrl}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } else {
      console.log("[demos/submit] RESEND_API_KEY missing — logging only", data);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[demos/submit] error", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
