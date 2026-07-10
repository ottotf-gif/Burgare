import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT = "Otto.tf@hotmail.com";

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

    const formData = new URLSearchParams();
    formData.append("name", "Ödsmålsburgaren hemsida");
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", text);
    formData.append("_template", "table");

    const mailRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formData.toString(),
      },
    );

    if (!mailRes.ok) {
      const errText = await mailRes.text().catch("");
      console.error("Mail send failed:", mailRes.status, errText);
      return new Response(
        JSON.stringify({ error: "Kunde inte skicka e-post." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

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
