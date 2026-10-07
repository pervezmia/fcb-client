import ContactForm from "@/components/ContactForm";
import { CLUB_INFO } from "@/lib/clubInfo";

export const metadata = {
  title: "Contact | FC Boraitola",
  description: "Get in touch with FC Boraitola for trials, sponsorship, questions or feedback.",
};

const socialLabels = {
  facebook: "Facebook",
  youtube: "YouTube",
  instagram: "Instagram",
  x: "X (Twitter)",
};

export default function ContactPage() {
  const details = [
    { icon: "📍", label: "Find us", value: CLUB_INFO.address },
    {
      icon: "✉️",
      label: "Email",
      value: CLUB_INFO.email,
      href: CLUB_INFO.email ? `mailto:${CLUB_INFO.email}` : null,
    },
    {
      icon: "📞",
      label: "Phone",
      value: CLUB_INFO.phone,
      href: CLUB_INFO.phone ? `tel:${CLUB_INFO.phone.replace(/\s+/g, "")}` : null,
    },
  ].filter((d) => d.value);

  const socials = Object.entries(CLUB_INFO.social || {}).filter(([, url]) => url);

  return (
    <main className="bg-slate-950 text-slate-100 min-h-screen">
      <section className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Get in touch</h1>
          <p className="text-base text-slate-400 max-w-2xl">
            Questions about trials, sponsorship or the website? Send us a message. We read every
            one and reply by email.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          {details.map((d) => (
            <div
              key={d.label}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-4"
            >
              <span className="text-2xl">{d.icon}</span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-slate-500">{d.label}</p>
                {d.href ? (
                  <a
                    href={d.href}
                    className="text-sm font-semibold text-white hover:text-blue-400 transition-colors break-words"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-white">{d.value}</p>
                )}
              </div>
            </div>
          ))}

          {socials.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">Follow us</p>
              <div className="flex flex-wrap gap-2">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:border-blue-500 hover:text-blue-400 transition-colors"
                  >
                    {socialLabels[key] || key}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm text-slate-400 leading-relaxed">
            Want to join the club? Choose{" "}
            <span className="text-slate-200 font-semibold">Join the club / trials</span> as the
            subject and tell us your position and experience.
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1">Send us a message</h2>
          <p className="text-sm text-slate-400 mb-6">All fields are required.</p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}