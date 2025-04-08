"use server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data } = await resend.emails.send({
      from: "helloposterio@nicolasmelda.com",
      to: to,
      subject: subject,
      text: text,
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error sending email:", error);
    NextResponse.json({
      error: "Failed to send email. Please try again later.",
    });
  }
}
