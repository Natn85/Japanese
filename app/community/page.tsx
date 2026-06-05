const groups = [
  {
    title: "Ask questions & get unstuck",
    jp: "質問する",
    blurb:
      "When a sentence won't parse or a kanji won't stick, these are the places people actually answer.",
    items: [
      {
        label: "r/LearnJapanese",
        href: "https://www.reddit.com/r/LearnJapanese/",
        desc: "The largest English-speaking hub for learners. A daily thread catches every beginner question, judgement-free.",
      },
      {
        label: "WaniKani Community",
        href: "https://community.wanikani.com/",
        desc: "Famously kind forums centred on kanji and reading, with long-running study logs you can join.",
      },
      {
        label: "Japanese Stack Exchange",
        href: "https://japanese.stackexchange.com/",
        desc: "For the nerdy “why is it like this?” questions. Detailed, sourced answers about grammar and usage.",
      },
    ],
  },
  {
    title: "Practice with real people",
    jp: "話す",
    blurb:
      "Reading takes you far, but the language only clicks when you use it with someone. Start small.",
    items: [
      {
        label: "HelloTalk",
        href: "https://www.hellotalk.com/",
        desc: "Text and voice with native speakers who are learning your language too, so the help goes both ways.",
      },
      {
        label: "Tandem",
        href: "https://www.tandem.net/",
        desc: "A language-exchange app for finding a regular partner and turning practice into a habit.",
      },
      {
        label: "italki",
        href: "https://www.italki.com/",
        desc: "Affordable one-on-one lessons with tutors when you want structure and real-time correction.",
      },
    ],
  },
  {
    title: "Study alongside others",
    jp: "一緒に",
    blurb:
      "Momentum is easier to keep when you're not alone. These communities study in the open, every day.",
    items: [
      {
        label: "Tofugu",
        href: "https://www.tofugu.com/",
        desc: "Not a forum, but the warm, opinionated guides here feel like a friend explaining things over coffee.",
      },
      {
        label: "Refold Japanese",
        href: "https://refold.la/",
        desc: "An immersion-first method with an active Discord of learners sharing routines and accountability.",
      },
    ],
  },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-14 px-4 py-12">
      {/* Header */}
      <section>
        <p className="font-jp mb-3 text-sm font-medium text-accent">仲間</p>
        <h1 className="mb-4 text-4xl font-bold text-ink sm:text-5xl">Community</h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Japanara doesn&apos;t run its own forum, and that&apos;s on purpose:
          the best Japanese-learning communities already exist, full of people a
          few steps ahead of you who remember what this part felt like.
          Here&apos;s where to find them.
        </p>
      </section>

      {groups.map((g) => (
        <section key={g.title}>
          <div className="mb-5 flex items-baseline gap-3">
            <h2 className="text-xl font-semibold text-ink">{g.title}</h2>
            <span className="font-jp text-sm text-ink-muted">{g.jp}</span>
          </div>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {g.blurb}
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {g.items.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-1 rounded-xl border border-border bg-surface px-5 py-4 transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-accent hover:bg-surface-2"
                >
                  <span className="text-sm font-semibold text-accent group-hover:text-accent-hover">
                    {it.label}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      {" "}
                      ↗
                    </span>
                    <span className="sr-only"> (opens in new tab)</span>
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">
                    {it.desc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Closing note */}
      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-ink">One honest tip</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          You don&apos;t need to post to belong. Lurk, read other people&apos;s
          questions, and notice how often your own confusion is something a
          hundred learners hit before you. Then, when you&apos;re ready, ask the
          small question. Someone will be glad you did.
        </p>
      </section>
    </div>
  );
}
