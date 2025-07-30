import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, subject, message, inquiryType } = body;

  try {
    const { error } = await resend.emails.send({
      from: "Buddha Basha Inquiry <contact@buddhabashajewelry.com>",
      to: ["buddhabashajewelry@gmail.com"],
      subject: `${inquiryType.toUpperCase()} — ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
