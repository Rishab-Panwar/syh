import Navbar from "@/components/navbar";
import Footer from "@/components/site-footer";

export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalContent = {
  title: string;
  updated?: string;
  intro?: string;
  sections: LegalSection[];
};

export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <>
      <Navbar />
      <main className="bg-[#07051d]" style={{ paddingTop: 72 }}>
        {/* Header */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(at 80% 0%, rgba(0, 63, 153, 0.4) 0%, rgb(7, 5, 29) 60%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-20">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {content.title}
            </h1>
            <div className="mt-4 h-[3px] w-16 bg-[#0cf9ce]" />
            {content.updated && (
              <p className="mt-4 text-sm text-white/40">Last updated: {content.updated}</p>
            )}
            {content.intro && (
              <p className="mt-5 text-[15px] leading-relaxed text-white/65">{content.intro}</p>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-4">
          <div className="space-y-8">
            {content.sections.map((sec, si) => (
              <div key={sec.heading ?? si}>
                {sec.heading && (
                  <h2 className="text-lg font-bold text-white">{sec.heading}</h2>
                )}
                {sec.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-[15px] leading-relaxed text-white/65">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-3 space-y-2">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0167f7]" />
                        <span className="text-[15px] leading-relaxed text-white/65">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
