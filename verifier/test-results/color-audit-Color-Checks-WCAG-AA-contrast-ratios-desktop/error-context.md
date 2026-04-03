# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: color-audit.spec.ts >> Color Checks >> WCAG AA contrast ratios
- Location: checks/color-audit.spec.ts:171:7

# Error details

```
Error: Contrast failures:
p.text-xs: 4.35:1 (fg: rgb(76, 76, 76), bg: rgba(0, 0, 0, 0))
p.text-[#4c4c4c]: 4.35:1 (fg: rgb(76, 76, 76), bg: rgba(0, 0, 0, 0))
p.text-[#4c4c4c]: 4.21:1 (fg: rgb(76, 76, 76), bg: rgba(0, 0, 0, 0))
p.text-[#4c4c4c]: 4.21:1 (fg: rgb(76, 76, 76), bg: rgba(0, 0, 0, 0))
h2.font-[family-name:var(--font-cormorant)]: 1.04:1 (fg: rgb(255, 255, 255), bg: rgba(0, 0, 0, 0))

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 5
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e5]:
        - link "Kova" [ref=e6] [cursor=pointer]:
          - /url: "#"
        - generic [ref=e7]:
          - link "Home" [ref=e8] [cursor=pointer]:
            - /url: "#"
          - link "About" [ref=e9] [cursor=pointer]:
            - /url: "#about"
          - link "Pricing" [ref=e10] [cursor=pointer]:
            - /url: "#pricing"
          - link "Contact" [ref=e11] [cursor=pointer]:
            - /url: "#contact"
        - link "Get Started" [ref=e13] [cursor=pointer]:
          - /url: "#pricing"
    - generic [ref=e14]:
      - img [ref=e15]
      - img [ref=e17]
      - generic [ref=e19]:
        - generic [ref=e20]:
          - generic [ref=e21]:
            - img [ref=e22]
            - paragraph [ref=e24]: From Insight to Outcome
          - heading "Build and Growth with Scalable Tools" [level=1] [ref=e26]:
            - text: Build and
            - emphasis [ref=e27]: Growth
            - text: with
            - text: Scalable Tools
          - paragraph [ref=e29]: Adapt to market shifts and scale operations with flexible infrastructure, designed to support your team's growth.
          - generic [ref=e30]:
            - link "Get Started" [ref=e31] [cursor=pointer]:
              - /url: "#pricing"
            - link "Learn More" [ref=e32] [cursor=pointer]:
              - /url: "#about"
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]:
              - generic [ref=e36]: Transactions
              - generic [ref=e37]: +12%
            - paragraph [ref=e38]: 87%
          - generic [ref=e50]:
            - generic [ref=e51]:
              - generic [ref=e52]: Card user
              - generic [ref=e53]: Monthly
            - img [ref=e55]:
              - generic [ref=e58]: 80%
            - paragraph [ref=e59]: Responses this month
          - generic [ref=e60]:
            - generic [ref=e61]:
              - img [ref=e63]
              - generic [ref=e65]: Verified
            - paragraph [ref=e66]: $4,218.50
            - paragraph [ref=e67]: processed today
    - generic [ref=e69]:
      - generic [ref=e70]:
        - img [ref=e71]
        - paragraph [ref=e73]: about us
        - heading "We help teams turn raw financial data into decisions that move the needle and drive measurable outcomes." [level=2] [ref=e74]
      - generic [ref=e76]:
        - img "Financial analyst reviewing data" [ref=e78]
        - generic [ref=e81]: 85%
      - generic [ref=e88]:
        - generic [ref=e90]:
          - paragraph [ref=e91]: 82%
          - paragraph [ref=e92]: Reduction in reporting time
        - generic [ref=e94]:
          - paragraph [ref=e95]: $73k
          - paragraph [ref=e96]: Savings per month (avg)
        - generic [ref=e98]:
          - paragraph [ref=e99]: "99.7"
          - paragraph [ref=e100]: Increase in billing accuracy
    - generic [ref=e102]:
      - generic [ref=e103]:
        - img [ref=e104]
        - heading "Make payment easy, simplify your finance" [level=2] [ref=e106]:
          - text: Make payment easy, simplify
          - text: your finance
        - paragraph [ref=e107]: Adapt to market shifts and scale operations with flexible tooling built around your workflow — not the other way around.
      - generic [ref=e108]:
        - generic [ref=e110]:
          - img [ref=e112]
          - heading "Budgeting & expense tracking" [level=3] [ref=e117]
          - paragraph [ref=e118]: Categorize transactions automatically and set dynamic budgets that adjust to spending patterns across departments.
        - generic [ref=e120]:
          - img [ref=e122]
          - heading "Portfolio management" [level=3] [ref=e125]
          - paragraph [ref=e126]: Track returns against benchmarks, monitor allocation, and rebalance with one-click execution.
        - generic [ref=e128]:
          - img [ref=e130]
          - heading "Real-time reconciliation" [level=3] [ref=e133]
          - paragraph [ref=e134]: Match incoming payments to invoices within seconds, flagging discrepancies before they cascade.
        - generic [ref=e136]:
          - img [ref=e138]
          - heading "Growth playbook" [level=3] [ref=e142]
          - paragraph [ref=e143]: Run scenario models for hiring and expansion — see how each decision impacts runway and margin.
      - link "Get Started" [ref=e145] [cursor=pointer]:
        - /url: "#pricing"
    - generic [ref=e147]:
      - generic [ref=e148]:
        - img [ref=e149]
        - heading "Tools that strengthen your financial clarity" [level=2] [ref=e151]:
          - text: Tools that
          - emphasis [ref=e152]: strengthen
          - text: your
          - text: financial clarity
        - paragraph [ref=e153]: Advanced instruments and live feeds to help you track, grow, and protect every dollar.
      - generic [ref=e154]:
        - generic [ref=e156]:
          - generic [ref=e157]: Clean Interface
          - heading "Intuitive user interface" [level=3] [ref=e158]
          - generic [ref=e160]:
            - generic [ref=e161]:
              - generic [ref=e162]: Expenses
              - generic [ref=e163]: Monthly
            - paragraph [ref=e164]: 87%
          - paragraph [ref=e171]: User-friendly design for effortless navigation and usability
        - generic [ref=e173]:
          - generic [ref=e174]: Faster
          - heading "Automated processes" [level=3] [ref=e175]
          - generic [ref=e177]:
            - generic [ref=e178]:
              - generic [ref=e179]: Card user
              - generic [ref=e180]: Monthly
            - img [ref=e182]:
              - generic [ref=e185]: 80%
          - paragraph [ref=e186]: Streamlined workflows to increase efficiency and reduce manual tasks
        - generic [ref=e188]:
          - generic [ref=e189]: Secure
          - heading "Secure transactions" [level=3] [ref=e190]
          - generic [ref=e192]:
            - paragraph [ref=e193]: Unify your data,
            - paragraph [ref=e194]: Unlock your potential
            - generic [ref=e195]:
              - paragraph [ref=e196]: Total balance
              - paragraph [ref=e197]: $1,247.83
          - paragraph [ref=e198]: AES-256 encryption at rest and in transit with SOC 2 Type II certification
        - generic [ref=e200]:
          - generic [ref=e201]: Trusted Features
          - heading "Advanced security features" [level=3] [ref=e202]
          - generic [ref=e204]:
            - generic [ref=e205]:
              - generic [ref=e206]: Transactions
              - generic [ref=e207]: +12%
            - paragraph [ref=e208]: 87%
          - paragraph [ref=e217]: Full traceability and audit-ready logs built into every action
    - generic [ref=e219]:
      - generic [ref=e220]:
        - generic [ref=e221]:
          - img [ref=e222]
          - img [ref=e224]
        - heading "Core features that set us apart from the competition" [level=2] [ref=e226]:
          - text: Core features that set us apart
          - text: from the
          - emphasis [ref=e227]: competition
        - paragraph [ref=e228]: Three capabilities designed to deliver exceptional performance and value, distinguishing us from the competition.
      - generic [ref=e229]:
        - generic [ref=e231]:
          - img [ref=e233]
          - heading "Real-time analytics" [level=3] [ref=e238]
          - paragraph [ref=e239]: Gain actionable insights with our real-time analytics feature
          - link "Learn More" [ref=e240] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e242]:
          - img [ref=e244]
          - heading "Mobile accessibility" [level=3] [ref=e246]
          - paragraph [ref=e247]: Manage your finances on the go with our mobile-friendly platform
          - link "Learn More" [ref=e248] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e250]:
          - img [ref=e252]
          - heading "Customizable reports" [level=3] [ref=e255]
          - paragraph [ref=e256]: Streamline your financial processes with automated workflows
          - link "Learn More" [ref=e257] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e259]:
      - generic [ref=e260]:
        - img [ref=e261]
        - heading "Simple, transparent pricing" [level=2] [ref=e263]:
          - text: Simple, transparent
          - emphasis [ref=e264]: pricing
        - paragraph [ref=e265]: Choose a plan that fits your business needs and budget.
      - generic [ref=e266]:
        - generic [ref=e268]:
          - generic [ref=e269]:
            - generic [ref=e270]:
              - img [ref=e271]
              - paragraph [ref=e273]: Starter Plan
            - generic [ref=e274]:
              - generic [ref=e275]: $49
              - generic [ref=e276]: /month
          - generic [ref=e277]:
            - paragraph [ref=e278]: "Features:"
            - list [ref=e279]:
              - listitem [ref=e280]:
                - img [ref=e281]
                - generic [ref=e284]: Basic financial analytics tools
              - listitem [ref=e285]:
                - img [ref=e286]
                - generic [ref=e289]: Up to 3 user accounts
              - listitem [ref=e290]:
                - img [ref=e291]
                - generic [ref=e294]: Real-time exchange rate monitoring
              - listitem [ref=e295]:
                - img [ref=e296]
                - generic [ref=e299]: Monthly financial reports
              - listitem [ref=e300]:
                - img [ref=e301]
                - generic [ref=e304]: Email support
          - link "Get Started" [ref=e305] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e307]:
          - generic [ref=e308]:
            - generic [ref=e309]:
              - img [ref=e310]
              - paragraph [ref=e312]: Growth Plan
            - generic [ref=e313]:
              - generic [ref=e314]: $89
              - generic [ref=e315]: /month
          - generic [ref=e316]:
            - paragraph [ref=e317]: "Features:"
            - list [ref=e318]:
              - listitem [ref=e319]:
                - img [ref=e320]
                - generic [ref=e323]: Advanced financial analytics tools
              - listitem [ref=e324]:
                - img [ref=e325]
                - generic [ref=e328]: Up to 10 user accounts
              - listitem [ref=e329]:
                - img [ref=e330]
                - generic [ref=e333]: Real-time exchange rate monitoring
              - listitem [ref=e334]:
                - img [ref=e335]
                - generic [ref=e338]: Custom monthly financial reports
              - listitem [ref=e339]:
                - img [ref=e340]
                - generic [ref=e343]: Priority email support
          - link "Get Started" [ref=e344] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e346]:
          - generic [ref=e347]:
            - generic [ref=e348]:
              - img [ref=e349]
              - paragraph [ref=e351]: Scale Plan
            - generic [ref=e352]:
              - generic [ref=e353]: $149
              - generic [ref=e354]: /month
          - generic [ref=e355]:
            - paragraph [ref=e356]: "Features:"
            - list [ref=e357]:
              - listitem [ref=e358]:
                - img [ref=e359]
                - generic [ref=e362]: Advanced analytics with forecasting tools
              - listitem [ref=e363]:
                - img [ref=e364]
                - generic [ref=e367]: Unlimited user accounts
              - listitem [ref=e368]:
                - img [ref=e369]
                - generic [ref=e372]: Real-time exchange rate monitoring with alerts
              - listitem [ref=e373]:
                - img [ref=e374]
                - generic [ref=e377]: Custom and exportable financial reports
              - listitem [ref=e378]:
                - img [ref=e379]
                - generic [ref=e382]: Dedicated support via email and chat
          - link "Get Started" [ref=e383] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e384]:
      - generic [ref=e386]:
        - generic [ref=e387]:
          - img [ref=e388]
          - img [ref=e390]
        - heading "What our clients are saying" [level=2] [ref=e392]:
          - text: What our
          - emphasis [ref=e393]: clients
          - text: are saying
        - paragraph [ref=e394]: Teams across industries rely on Kova to make faster, more confident financial decisions.
      - generic [ref=e396]:
        - generic [ref=e397]:
          - img "Raquel Mota" [ref=e399]
          - generic [ref=e400]:
            - img [ref=e401]
            - paragraph [ref=e403]: Kova cut our month-end close from nine days to three. The automated reconciliation alone saved our team 40 hours a week — hours we now spend on analysis instead of data entry.
            - generic [ref=e404]:
              - paragraph [ref=e405]: Raquel Mota
              - paragraph [ref=e406]: CFO at Clearpath
        - generic [ref=e407]:
          - img "Tariq Osman" [ref=e409]
          - generic [ref=e410]:
            - img [ref=e411]
            - paragraph [ref=e413]: We evaluated four platforms before choosing Kova. The real-time dashboards and granular permissions meant we could roll it out to department leads without worrying about data exposure.
            - generic [ref=e414]:
              - paragraph [ref=e415]: Tariq Osman
              - paragraph [ref=e416]: Head of Finance at Openframe
        - generic [ref=e417]:
          - img "Lena Marchetti" [ref=e419]
          - generic [ref=e420]:
            - img [ref=e421]
            - paragraph [ref=e423]: The scenario modeling tool changed how we plan headcount. We can model three hiring paths side-by-side and see exactly how each affects runway. No more spreadsheet gymnastics.
            - generic [ref=e424]:
              - paragraph [ref=e425]: Lena Marchetti
              - paragraph [ref=e426]: VP Operations at Dovetail
        - generic [ref=e427]:
          - img "Daniel Voss" [ref=e429]
          - generic [ref=e430]:
            - img [ref=e431]
            - paragraph [ref=e433]: Our auditors used to dread the documentation phase. With Kova's audit log exports, what took two weeks now takes an afternoon. That alone justified the subscription.
            - generic [ref=e434]:
              - paragraph [ref=e435]: Daniel Voss
              - paragraph [ref=e436]: Controller at Meridian Labs
        - generic [ref=e437]:
          - img "Amara Singh" [ref=e439]
          - generic [ref=e440]:
            - img [ref=e441]
            - paragraph [ref=e443]: I check Kova on my phone every morning before standup. Cash position, outstanding receivables, burn rate — all in one glance. It's the first tool that actually reduced my financial anxiety.
            - generic [ref=e444]:
              - paragraph [ref=e445]: Amara Singh
              - paragraph [ref=e446]: Founder at Ridgeline
        - generic [ref=e447]:
          - img "Marcus Hale" [ref=e449]
          - generic [ref=e450]:
            - img [ref=e451]
            - paragraph [ref=e453]: We consolidated three separate finance tools into Kova. The integration was smoother than expected, and the support team stayed on calls until every edge case was resolved.
            - generic [ref=e454]:
              - paragraph [ref=e455]: Marcus Hale
              - paragraph [ref=e456]: Director of Strategy at Waypoint
        - generic [ref=e457]:
          - img "Raquel Mota" [ref=e459]
          - generic [ref=e460]:
            - img [ref=e461]
            - paragraph [ref=e463]: Kova cut our month-end close from nine days to three. The automated reconciliation alone saved our team 40 hours a week — hours we now spend on analysis instead of data entry.
            - generic [ref=e464]:
              - paragraph [ref=e465]: Raquel Mota
              - paragraph [ref=e466]: CFO at Clearpath
        - generic [ref=e467]:
          - img "Tariq Osman" [ref=e469]
          - generic [ref=e470]:
            - img [ref=e471]
            - paragraph [ref=e473]: We evaluated four platforms before choosing Kova. The real-time dashboards and granular permissions meant we could roll it out to department leads without worrying about data exposure.
            - generic [ref=e474]:
              - paragraph [ref=e475]: Tariq Osman
              - paragraph [ref=e476]: Head of Finance at Openframe
        - generic [ref=e477]:
          - img "Lena Marchetti" [ref=e479]
          - generic [ref=e480]:
            - img [ref=e481]
            - paragraph [ref=e483]: The scenario modeling tool changed how we plan headcount. We can model three hiring paths side-by-side and see exactly how each affects runway. No more spreadsheet gymnastics.
            - generic [ref=e484]:
              - paragraph [ref=e485]: Lena Marchetti
              - paragraph [ref=e486]: VP Operations at Dovetail
        - generic [ref=e487]:
          - img "Daniel Voss" [ref=e489]
          - generic [ref=e490]:
            - img [ref=e491]
            - paragraph [ref=e493]: Our auditors used to dread the documentation phase. With Kova's audit log exports, what took two weeks now takes an afternoon. That alone justified the subscription.
            - generic [ref=e494]:
              - paragraph [ref=e495]: Daniel Voss
              - paragraph [ref=e496]: Controller at Meridian Labs
        - generic [ref=e497]:
          - img "Amara Singh" [ref=e499]
          - generic [ref=e500]:
            - img [ref=e501]
            - paragraph [ref=e503]: I check Kova on my phone every morning before standup. Cash position, outstanding receivables, burn rate — all in one glance. It's the first tool that actually reduced my financial anxiety.
            - generic [ref=e504]:
              - paragraph [ref=e505]: Amara Singh
              - paragraph [ref=e506]: Founder at Ridgeline
        - generic [ref=e507]:
          - img "Marcus Hale" [ref=e509]
          - generic [ref=e510]:
            - img [ref=e511]
            - paragraph [ref=e513]: We consolidated three separate finance tools into Kova. The integration was smoother than expected, and the support team stayed on calls until every edge case was resolved.
            - generic [ref=e514]:
              - paragraph [ref=e515]: Marcus Hale
              - paragraph [ref=e516]: Director of Strategy at Waypoint
    - generic [ref=e518]:
      - generic [ref=e519]:
        - generic [ref=e520]:
          - img [ref=e521]
          - generic [ref=e523]: Blog and articles
        - heading "Discover the latest blogs" [level=2] [ref=e524]:
          - text: Discover the latest
          - emphasis [ref=e525]: blogs
        - paragraph [ref=e526]: Practical perspectives on finance operations, analytics strategy, and scaling infrastructure.
      - generic [ref=e527]:
        - link "The CFO's Guide to Real-Time Financial Reporting The CFO's Guide to Real-Time Financial Reporting How leading finance teams are shifting to live dashboards — and what it means for month-end close. Read more →" [ref=e529] [cursor=pointer]:
          - /url: "#"
          - img "The CFO's Guide to Real-Time Financial Reporting" [ref=e531]
          - generic [ref=e532]:
            - heading "The CFO's Guide to Real-Time Financial Reporting" [level=3] [ref=e533]
            - paragraph [ref=e534]: How leading finance teams are shifting to live dashboards — and what it means for month-end close.
            - generic [ref=e535]: Read more →
        - link "How to Build a Cash Reserve Without Starving Growth How to Build a Cash Reserve Without Starving Growth Three frameworks that help fast-growing teams balance liquidity with investment. Read more →" [ref=e537] [cursor=pointer]:
          - /url: "#"
          - img "How to Build a Cash Reserve Without Starving Growth" [ref=e539]
          - generic [ref=e540]:
            - heading "How to Build a Cash Reserve Without Starving Growth" [level=3] [ref=e541]
            - paragraph [ref=e542]: Three frameworks that help fast-growing teams balance liquidity with investment.
            - generic [ref=e543]: Read more →
        - link "Five Reconciliation Mistakes That Cost Thousands Five Reconciliation Mistakes That Cost Thousands Manual matching and siloed data create errors that compound across your ledger. Read more →" [ref=e545] [cursor=pointer]:
          - /url: "#"
          - img "Five Reconciliation Mistakes That Cost Thousands" [ref=e547]
          - generic [ref=e548]:
            - heading "Five Reconciliation Mistakes That Cost Thousands" [level=3] [ref=e549]
            - paragraph [ref=e550]: Manual matching and siloed data create errors that compound across your ledger.
            - generic [ref=e551]: Read more →
    - generic [ref=e554]:
      - img [ref=e555]
      - img [ref=e557]
      - img [ref=e560]
      - generic [ref=e564]:
        - img [ref=e565]
        - heading "Join us" [level=2] [ref=e567]
        - paragraph [ref=e568]:
          - text: Achieve operational clarity with
          - emphasis [ref=e569]: Kova
        - paragraph [ref=e570]: Founded by data engineers and former CFOs, we build analytics tools for finance teams of every size — from seed-stage to public.
        - link "Get Started" [ref=e571] [cursor=pointer]:
          - /url: "#pricing"
    - contentinfo [ref=e572]:
      - generic [ref=e573]:
        - generic [ref=e574]:
          - generic [ref=e575]:
            - link "Kova" [ref=e576] [cursor=pointer]:
              - /url: "#"
            - paragraph [ref=e577]: Financial analytics built for teams that move fast and need clarity at every turn.
            - generic [ref=e578]:
              - paragraph [ref=e579]: Subscribe to our newsletter
              - generic [ref=e580]:
                - textbox "you@company.com" [ref=e581]
                - button "Join" [ref=e582]
          - generic [ref=e583]:
            - paragraph [ref=e584]: Product
            - list [ref=e585]:
              - listitem [ref=e586]:
                - link "Features" [ref=e587] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e588]:
                - link "Pricing" [ref=e589] [cursor=pointer]:
                  - /url: "#pricing"
              - listitem [ref=e590]:
                - link "Integrations" [ref=e591] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e592]:
                - link "Changelog" [ref=e593] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e594]:
            - paragraph [ref=e595]: Company
            - list [ref=e596]:
              - listitem [ref=e597]:
                - link "About" [ref=e598] [cursor=pointer]:
                  - /url: "#about"
              - listitem [ref=e599]:
                - link "Blog" [ref=e600] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e601]:
                - link "Careers" [ref=e602] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e603]:
                - link "Contact" [ref=e604] [cursor=pointer]:
                  - /url: "#contact"
          - generic [ref=e605]:
            - paragraph [ref=e606]: Resources
            - list [ref=e607]:
              - listitem [ref=e608]:
                - link "Documentation" [ref=e609] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e610]:
                - link "API Reference" [ref=e611] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e612]:
                - link "Status" [ref=e613] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e614]:
                - link "Security" [ref=e615] [cursor=pointer]:
                  - /url: "#"
        - generic [ref=e616]:
          - paragraph [ref=e617]: © 2025 Kova. All rights reserved.
          - generic [ref=e618]:
            - link "Privacy Policy" [ref=e619] [cursor=pointer]:
              - /url: "#"
            - link "Terms of Service" [ref=e620] [cursor=pointer]:
              - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e626] [cursor=pointer]:
    - img [ref=e627]
  - alert [ref=e630]
```

# Test source

```ts
  76  |       if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
  77  |         bgColors.add(bgColor);
  78  |         allColors.add(bgColor);
  79  |         if (bgColor === 'rgb(0, 0, 0)') hasPureBlack = true;
  80  |       }
  81  | 
  82  |       if (text && text.length > 0) {
  83  |         textColors.add(fgColor);
  84  |         allColors.add(fgColor);
  85  |         if (fgColor === 'rgb(255, 255, 255)') hasPureWhite = true;
  86  | 
  87  |         // Calculate contrast with effective background
  88  |         // Walk up the DOM to find the nearest opaque background
  89  |         let effectiveBg = bgColor;
  90  |         function isTransparent(color: string): boolean {
  91  |           if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') return true;
  92  |           const alphaMatch = color.match(/rgba\([^)]*,\s*([\d.]+)\s*\)/);
  93  |           return alphaMatch ? parseFloat(alphaMatch[1]) < 0.9 : false;
  94  |         }
  95  |         if (isTransparent(bgColor)) {
  96  |           let parent = el.parentElement;
  97  |           while (parent) {
  98  |             const parentBg = getComputedStyle(parent).backgroundColor;
  99  |             if (parentBg && !isTransparent(parentBg)) {
  100 |               effectiveBg = parentBg;
  101 |               break;
  102 |             }
  103 |             parent = parent.parentElement;
  104 |           }
  105 |           // If we reach the top without finding opaque bg, assume page background
  106 |           if (isTransparent(effectiveBg)) effectiveBg = 'rgb(14, 16, 17)';
  107 |         }
  108 |         const fgParsed = parseColor(fgColor);
  109 |         const bgParsed = parseColor(effectiveBg);
  110 |         if (fgParsed && bgParsed) {
  111 |           const fgLum = lum(...fgParsed);
  112 |           const bgLum = lum(...bgParsed);
  113 |           const ratio = cr(fgLum, bgLum);
  114 |           const fontSize = parseFloat(style.fontSize);
  115 |           const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight) >= 700);
  116 | 
  117 |           if ((!isLargeText && ratio < 4.5) || (isLargeText && ratio < 3)) {
  118 |             // Build a simple selector
  119 |             const selector = el.tagName.toLowerCase() +
  120 |               (el.id ? `#${el.id}` : '') +
  121 |               (el.className && typeof el.className === 'string' ? `.${el.className.split(' ')[0]}` : '');
  122 |             contrasts.push({ selector, fg: fgColor, bg: bgColor, ratio: Math.round(ratio * 100) / 100 });
  123 |           }
  124 |         }
  125 |       }
  126 | 
  127 |       // Check for neon shadows
  128 |       const shadow = style.boxShadow;
  129 |       if (shadow && shadow !== 'none') {
  130 |         const colorMatch = shadow.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
  131 |         if (colorMatch) {
  132 |           const [, r, g, b, a] = colorMatch;
  133 |           const isNeutral = parseInt(r) === parseInt(g) && parseInt(g) === parseInt(b);
  134 |           const alpha = parseFloat(a || '1');
  135 |           if (!isNeutral && alpha > 0.3) {
  136 |             hasNeonShadow = true;
  137 |           }
  138 |         }
  139 |       }
  140 |     });
  141 | 
  142 |     return {
  143 |       textColors: [...textColors],
  144 |       bgColors: [...bgColors],
  145 |       allColors: [...allColors],
  146 |       contrasts,
  147 |       hasPureBlack,
  148 |       hasPureWhite,
  149 |       hasNeonShadow,
  150 |     };
  151 |   });
  152 | }
  153 | 
  154 | test.describe('Color Checks', () => {
  155 |   let data: ColorData;
  156 | 
  157 |   test.beforeEach(async ({ page }) => {
  158 |     await page.goto('');
  159 |     await page.waitForTimeout(500);
  160 |     data = await extractColors(page);
  161 |   });
  162 | 
  163 |   test('no pure #000000 background', async () => {
  164 |     expect(data.hasPureBlack, 'Pure black (#000) background detected. Use #0e1011 or similar.').toBe(false);
  165 |   });
  166 | 
  167 |   test('no neon glow box-shadows', async () => {
  168 |     expect(data.hasNeonShadow, 'Neon glow shadow detected. Use subtle neutral shadows.').toBe(false);
  169 |   });
  170 | 
  171 |   test('WCAG AA contrast ratios', async () => {
  172 |     if (data.contrasts.length > 0) {
  173 |       const failures = data.contrasts.map(
  174 |         (c) => `${c.selector}: ${c.ratio}:1 (fg: ${c.fg}, bg: ${c.bg})`
  175 |       );
> 176 |       expect(data.contrasts.length, `Contrast failures:\n${failures.join('\n')}`).toBe(0);
      |                                                                                   ^ Error: Contrast failures:
  177 |     }
  178 |   });
  179 | 
  180 |   test('palette size <= 8 unique hue families', async () => {
  181 |     // Group colors by hue (within 30° on color wheel)
  182 |     function parseRgb(color: string): [number, number, number] | null {
  183 |       const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  184 |       if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  185 |       return null;
  186 |     }
  187 | 
  188 |     function rgbToHue(r: number, g: number, b: number): number {
  189 |       r /= 255; g /= 255; b /= 255;
  190 |       const max = Math.max(r, g, b), min = Math.min(r, g, b);
  191 |       if (max === min) return -1; // achromatic
  192 |       let h = 0;
  193 |       const d = max - min;
  194 |       if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  195 |       else if (max === g) h = ((b - r) / d + 2) / 6;
  196 |       else h = ((r - g) / d + 4) / 6;
  197 |       return h * 360;
  198 |     }
  199 | 
  200 |     const hues: number[] = [];
  201 |     for (const color of data.allColors) {
  202 |       const rgb = parseRgb(color);
  203 |       if (rgb) {
  204 |         const hue = rgbToHue(...rgb);
  205 |         if (hue >= 0) hues.push(hue);
  206 |       }
  207 |     }
  208 | 
  209 |     // Cluster hues within 30°
  210 |     const clusters: number[] = [];
  211 |     for (const h of hues) {
  212 |       if (!clusters.some((c) => Math.abs(c - h) < 30 || Math.abs(c - h) > 330)) {
  213 |         clusters.push(h);
  214 |       }
  215 |     }
  216 | 
  217 |     expect(clusters.length, `${clusters.length} hue families — aim for <= 8`).toBeLessThanOrEqual(8);
  218 |   });
  219 | });
  220 | 
```