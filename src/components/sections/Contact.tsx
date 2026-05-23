import { useState } from "react";
import { Section, SectionHeader, Reveal } from "./Section";
import { toast } from "sonner";
import { z } from "zod";
import { SOCIALS, CALENDLY_URL, FORMSPREE_ENDPOINT, CONTACT_REASONS } from "@/lib/portfolio-data";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  reason: z.enum(CONTACT_REASONS, { errorMap: () => ({ message: "Pick a reason" }) }),
  message: z.string().trim().min(5, "Add a short message (5+ characters)").max(2000),
});

type FieldErrors = Partial<Record<"name" | "email" | "reason" | "message", string>>;

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState<string>("");
  const [msg, setMsg] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap
  const [errors, setErrors] = useState<FieldErrors>({});

  const reset = () => {
    setName(""); setEmail(""); setReason(""); setMsg(""); setSent(false); setErrors({});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields — silently drop
    if (honeypot) return;

    const parsed = contactSchema.safeParse({ name, email, reason, message: msg });
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error(parsed.error.errors[0]?.message ?? "Please check the form.");
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          reason: parsed.data.reason,
          message: parsed.data.message,
          _subject: `New Contact Form Submission · ${parsed.data.reason} from ${parsed.data.name}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = Array.isArray(data?.errors)
          ? data.errors.map((x: { message?: string }) => x.message).filter(Boolean).join(", ")
          : data?.error || `Submission failed (${res.status})`;
        console.error("Formspree error:", res.status, data);
        throw new Error(message);
      }

      setName(""); setEmail(""); setReason(""); setMsg("");
      setSent(true);
      toast.success("Message sent. I'll reply within 24 hours.");
    } catch (err) {
      console.error("Contact form submission error:", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (hasError?: string) =>
    `w-full h-11 rounded-md border bg-background-elev px-3 text-sm text-foreground outline-none transition-colors focus:border-primary ${
      hasError ? "border-destructive" : "border-border"
    }`;

  return (
    <Section id="contact">
      <SectionHeader index="09" kicker="Contact" title="Open to collaborations across security, forensics, and tech advocacy." />

      <div className="grid gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-2 space-y-4">
          <p className="text-muted-foreground">
            Whether it is a forensics consult, a speaking invitation, or partnership for Project Code-Hijabi, send a note. Submissions land directly in my inbox and I reply within 24 hours.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b border-border py-2">
              <span className="text-muted-foreground">Response time</span>
              <span className="text-foreground">Within 24 hours</span>
            </li>
            <li className="flex justify-between border-b border-border py-2">
              <span className="text-muted-foreground">Based</span>
              <span className="text-foreground">Remote · Hybrid · Worldwide</span>
            </li>
            <li className="flex justify-between border-b border-border py-2">
              <span className="text-muted-foreground">Availability</span>
              <span className="text-foreground">Open to new opportunities</span>
            </li>
          </ul>
          <div className="pt-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-primary/60 bg-primary/10 px-5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Schedule a call <span aria-hidden>↗</span>
            </a>
            <p className="text-xs text-muted-foreground mt-2">Book a 30-minute slot via Calendly.</p>
          </div>
          <div className="pt-2">
            <p className="eyebrow mb-3">Find me online</p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {s.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-3">
          {sent ? (
            <div className="surface p-8 md:p-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary text-xl">✓</div>
              <h3 className="text-lg">Message sent</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your message has been sent successfully. I will get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-10 items-center rounded-md border border-border bg-card px-4 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="surface p-6 md:p-8 space-y-5" noValidate>
              {/* Honeypot anti-spam field — hidden from real users */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                aria-hidden="true"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block">Name</span>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="Your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={fieldClass(errors.name)}
                    required
                  />
                  {errors.name && <p id="err-name" className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={fieldClass(errors.email)}
                    required
                  />
                  {errors.email && <p id="err-email" className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block">Reason for contact</span>
                <select
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  aria-invalid={!!errors.reason}
                  aria-describedby={errors.reason ? "err-reason" : undefined}
                  className={fieldClass(errors.reason)}
                  required
                >
                  <option value="" disabled>Select a reason…</option>
                  {CONTACT_REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.reason && <p id="err-reason" className="mt-1.5 text-xs text-destructive">{errors.reason}</p>}
              </label>

              <label className="block">
                <span className="eyebrow mb-2 block">Message</span>
                <textarea
                  name="message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell me a bit about what you have in mind…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={`w-full rounded-md border bg-background-elev px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary resize-none ${
                    errors.message ? "border-destructive" : "border-border"
                  }`}
                  required
                />
                {errors.message && <p id="err-message" className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed"
              >
                {loading && (
                  <span
                    aria-hidden
                    className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                  />
                )}
                {loading ? "Sending..." : "Send message"}
              </button>
              <p className="text-xs text-muted-foreground">Your details stay private and are sent straight to my inbox.</p>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
