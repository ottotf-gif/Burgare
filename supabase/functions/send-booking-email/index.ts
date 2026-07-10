import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import nodemailer from "npm:nodemailer@6.9.16";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GMAIL_USER = "kontakt.togethr@gmail.com";
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD") ?? "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const eventDate = String(body.event_date ?? "").trim();
    const guests = body.guests != null ? String(body.guests) : "—";
    const location = String(body.location ?? "").trim() || "—";
    const company = String(body.company ?? "").trim() || "—";
    const message = String(body.message ?? "").trim() || "—";

    if (!name || !email || !phone || !eventDate) {
      return new Response(
        JSON.stringify({ error: "Obligatoriska fält saknas." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!GMAIL_APP_PASSWORD) {
      console.error("GMAIL_APP_PASSWORD secret is not set");
      return new Response(
        JSON.stringify({ error: "E-post inte konfigurerad." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const subject = `Ny bokningsförfrågan från ${name}`;
    const text = [
      `Ny bokningsförfrågan har kommit in via hemsidan.`,
      ``,
      `Namn: ${name}`,
      `Företag: ${company}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Datum: ${eventDate}`,
      `Antal gäster: ${guests}`,
      `Plats: ${location}`,
      ``,
      `Meddelande:`,
      `${message}`,
    ].join("\n");

    const html = `
      <h2>Ny bokningsförfrågan</h2>
      <p>En ny förfrågan har kommit in via hemsidan.</p>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Namn:</td><td>${name}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Företag:</td><td>${company}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">E-post:</td><td>${email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Telefon:</td><td>${phone}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Datum:</td><td>${eventDate}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Antal gäster:</td><td>${guests}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Plats:</td><td>${location}</td></tr>
      </table>
      <h3 style="font-family:sans-serif;">Meddelande</h3>
      <p style="font-family:sans-serif;white-space:pre-wrap;">${message}</p>
    `;

    await transporter.sendMail({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: email,
      subject,
      text,
      html,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internt fel." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
