const PLANS = [
  {
    name: "Personal",
    price: "Free",
    period: "",
    desc: "For individual use on a single device",
    features: [
      "Unlimited notes and vaults",
      "1,700+ community plugins",
      "Custom themes and CSS",
      "Local storage only",
      "Graph view",
      "Canvas",
    ],
    cta: "Download",
    accent: false,
  },
  {
    name: "Sync",
    price: "$4",
    period: "/mo",
    desc: "Sync across all your devices",
    features: [
      "Everything in Personal",
      "End-to-end encryption",
      "Up to 10 GB storage",
      "12-month version history",
      "Selective folder sync",
      "Priority support",
    ],
    cta: "Start syncing",
    accent: true,
  },
  {
    name: "Publish",
    price: "$8",
    period: "/mo",
    desc: "Share your notes as a website",
    features: [
      "Everything in Sync",
      "Custom domain support",
      "Password-protected sites",
      "Graph view on published site",
      "Analytics dashboard",
      "Custom CSS for published sites",
    ],
    cta: "Start publishing",
    accent: false,
  },
];

export function ObsidianPricing() {
  return (
    <section id="pricing" className="px-6 py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Simple pricing
          </h2>
          <p className="text-[18px] md:text-[22px] leading-[1.55] text-[#bababa] max-w-[550px] mx-auto">
            The core app is free — forever. Pay only for the services you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-6 max-w-[960px] mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="min-w-0 border p-8 flex flex-col"
              style={{
                borderRadius: plan.accent ? "30px 3px 30px 3px" : "3px 30px 3px 30px",
                backgroundColor: "#242424",
                borderColor: plan.accent
                  ? "hsl(254, 80%, 72%)"
                  : "#363636",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-[14px] font-semibold text-[#bababa] uppercase tracking-wider">
                  {plan.name}
                </div>
                {plan.accent && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-[48px] font-extrabold text-[#f8f8f8]"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-[16px] text-[#929292]">{plan.period}</span>
                )}
              </div>
              <p className="text-[14px] text-[#bababa] mb-6">{plan.desc}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#bababa]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0"
                    >
                      <path
                        d="M4 8l3 3 5-5"
                        stroke={plan.accent ? "hsl(254, 80%, 72%)" : "#929292"}
                        strokeWidth="1.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {plan.accent && (
                <div className="text-[12px] text-[#929292] mb-4 pb-4 border-b border-[#363636]">
                  14-day free trial &middot; cancel anytime
                </div>
              )}

              <a
                href="#download"
                className="block text-center py-3.5 rounded-md text-[16px] font-semibold transition-colors duration-150"
                style={
                  plan.accent
                    ? {
                        backgroundColor: "hsl(254, 80%, 60%)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "#dadada",
                        border: "1px solid #363636",
                      }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
