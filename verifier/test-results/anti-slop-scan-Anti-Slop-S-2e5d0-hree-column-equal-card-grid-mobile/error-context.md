# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: anti-slop-scan.spec.ts >> Anti-Slop Scan >> no three-column equal card grid
- Location: checks/anti-slop-scan.spec.ts:178:7

# Error details

```
Error: 3 equal-width cards with identical structure detected. Use bento grid, varied sizes, or list format.

expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e5]:
        - link "Kova" [ref=e6] [cursor=pointer]:
          - /url: "#"
        - button "Toggle menu" [ref=e7]
    - generic [ref=e11]:
      - img [ref=e12]
      - img [ref=e14]
      - generic [ref=e16]:
        - generic [ref=e17]:
          - generic [ref=e18]:
            - img [ref=e19]
            - paragraph [ref=e21]: From Insight to Outcome
          - heading "Build and Growth with Scalable Tools" [level=1] [ref=e23]:
            - text: Build and
            - emphasis [ref=e24]: Growth
            - text: with
            - text: Scalable Tools
          - paragraph [ref=e26]: Adapt to market shifts and scale operations with flexible infrastructure, designed to support your team's growth.
          - generic [ref=e27]:
            - link "Get Started" [ref=e28] [cursor=pointer]:
              - /url: "#pricing"
            - link "Learn More" [ref=e29] [cursor=pointer]:
              - /url: "#about"
        - generic [ref=e31]:
          - generic [ref=e32]:
            - generic [ref=e33]: Card user
            - generic [ref=e34]: Monthly
          - img [ref=e36]:
            - generic [ref=e39]: 80%
          - paragraph [ref=e40]: Responses this month
    - generic [ref=e42]:
      - generic [ref=e43]:
        - img [ref=e44]
        - paragraph [ref=e46]: about us
        - heading "We help teams turn raw financial data into decisions that move the needle and drive measurable outcomes." [level=2] [ref=e47]
      - generic [ref=e49]:
        - img "Financial analyst reviewing data" [ref=e51]
        - generic [ref=e54]: 85%
      - generic [ref=e61]:
        - generic [ref=e63]:
          - paragraph [ref=e64]: 82%
          - paragraph [ref=e65]: Reduction in reporting time
        - generic [ref=e67]:
          - paragraph [ref=e68]: $73k
          - paragraph [ref=e69]: Savings per month (avg)
        - generic [ref=e71]:
          - paragraph [ref=e72]: "99.7"
          - paragraph [ref=e73]: Increase in billing accuracy
    - generic [ref=e75]:
      - generic [ref=e76]:
        - img [ref=e77]
        - heading "Make payment easy, simplify your finance" [level=2] [ref=e79]:
          - text: Make payment easy, simplify
          - text: your finance
        - paragraph [ref=e80]: Adapt to market shifts and scale operations with flexible tooling built around your workflow — not the other way around.
      - generic [ref=e81]:
        - generic [ref=e83]:
          - img [ref=e85]
          - heading "Budgeting & expense tracking" [level=3] [ref=e90]
          - paragraph [ref=e91]: Categorize transactions automatically and set dynamic budgets that adjust to spending patterns across departments.
        - generic [ref=e93]:
          - img [ref=e95]
          - heading "Portfolio management" [level=3] [ref=e98]
          - paragraph [ref=e99]: Track returns against benchmarks, monitor allocation, and rebalance with one-click execution.
        - generic [ref=e101]:
          - img [ref=e103]
          - heading "Real-time reconciliation" [level=3] [ref=e106]
          - paragraph [ref=e107]: Match incoming payments to invoices within seconds, flagging discrepancies before they cascade.
        - generic [ref=e109]:
          - img [ref=e111]
          - heading "Growth playbook" [level=3] [ref=e115]
          - paragraph [ref=e116]: Run scenario models for hiring and expansion — see how each decision impacts runway and margin.
      - link "Get Started" [ref=e118] [cursor=pointer]:
        - /url: "#pricing"
    - generic [ref=e120]:
      - generic [ref=e121]:
        - img [ref=e122]
        - heading "Tools that strengthen your financial clarity" [level=2] [ref=e124]:
          - text: Tools that
          - emphasis [ref=e125]: strengthen
          - text: your
          - text: financial clarity
        - paragraph [ref=e126]: Advanced instruments and live feeds to help you track, grow, and protect every dollar.
      - generic [ref=e127]:
        - generic [ref=e129]:
          - generic [ref=e130]: Clean Interface
          - heading "Intuitive user interface" [level=3] [ref=e131]
          - generic [ref=e133]:
            - generic [ref=e134]:
              - generic [ref=e135]: Expenses
              - generic [ref=e136]: Monthly
            - paragraph [ref=e137]: 87%
          - paragraph [ref=e144]: User-friendly design for effortless navigation and usability
        - generic [ref=e146]:
          - generic [ref=e147]: Faster
          - heading "Automated processes" [level=3] [ref=e148]
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]: Card user
              - generic [ref=e153]: Monthly
            - img [ref=e155]:
              - generic [ref=e158]: 80%
          - paragraph [ref=e159]: Streamlined workflows to increase efficiency and reduce manual tasks
        - generic [ref=e161]:
          - generic [ref=e162]: Secure
          - heading "Secure transactions" [level=3] [ref=e163]
          - generic [ref=e165]:
            - paragraph [ref=e166]: Unify your data,
            - paragraph [ref=e167]: Unlock your potential
            - generic [ref=e168]:
              - paragraph [ref=e169]: Total balance
              - paragraph [ref=e170]: $1,247.83
          - paragraph [ref=e171]: AES-256 encryption at rest and in transit with SOC 2 Type II certification
        - generic [ref=e173]:
          - generic [ref=e174]: Trusted Features
          - heading "Advanced security features" [level=3] [ref=e175]
          - generic [ref=e177]:
            - generic [ref=e178]:
              - generic [ref=e179]: Transactions
              - generic [ref=e180]: +12%
            - paragraph [ref=e181]: 87%
          - paragraph [ref=e190]: Full traceability and audit-ready logs built into every action
    - generic [ref=e192]:
      - generic [ref=e193]:
        - generic [ref=e194]:
          - img [ref=e195]
          - img [ref=e197]
        - heading "Core features that set us apart from the competition" [level=2] [ref=e199]:
          - text: Core features that set us apart
          - text: from the
          - emphasis [ref=e200]: competition
        - paragraph [ref=e201]: Three capabilities designed to deliver exceptional performance and value, distinguishing us from the competition.
      - generic [ref=e202]:
        - generic [ref=e204]:
          - img [ref=e206]
          - heading "Real-time analytics" [level=3] [ref=e211]
          - paragraph [ref=e212]: Gain actionable insights with our real-time analytics feature
          - link "Learn More" [ref=e213] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e215]:
          - img [ref=e217]
          - heading "Mobile accessibility" [level=3] [ref=e219]
          - paragraph [ref=e220]: Manage your finances on the go with our mobile-friendly platform
          - link "Learn More" [ref=e221] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e223]:
          - img [ref=e225]
          - heading "Customizable reports" [level=3] [ref=e228]
          - paragraph [ref=e229]: Streamline your financial processes with automated workflows
          - link "Learn More" [ref=e230] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e232]:
      - generic [ref=e233]:
        - img [ref=e234]
        - heading "Simple, transparent pricing" [level=2] [ref=e236]:
          - text: Simple, transparent
          - emphasis [ref=e237]: pricing
        - paragraph [ref=e238]: Choose a plan that fits your business needs and budget.
      - generic [ref=e239]:
        - generic [ref=e241]:
          - generic [ref=e242]:
            - generic [ref=e243]:
              - img [ref=e244]
              - paragraph [ref=e246]: Starter Plan
            - generic [ref=e247]:
              - generic [ref=e248]: $49
              - generic [ref=e249]: /month
          - generic [ref=e250]:
            - paragraph [ref=e251]: "Features:"
            - list [ref=e252]:
              - listitem [ref=e253]:
                - img [ref=e254]
                - generic [ref=e257]: Basic financial analytics tools
              - listitem [ref=e258]:
                - img [ref=e259]
                - generic [ref=e262]: Up to 3 user accounts
              - listitem [ref=e263]:
                - img [ref=e264]
                - generic [ref=e267]: Real-time exchange rate monitoring
              - listitem [ref=e268]:
                - img [ref=e269]
                - generic [ref=e272]: Monthly financial reports
              - listitem [ref=e273]:
                - img [ref=e274]
                - generic [ref=e277]: Email support
          - link "Get Started" [ref=e278] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e280]:
          - generic [ref=e281]:
            - generic [ref=e282]:
              - img [ref=e283]
              - paragraph [ref=e285]: Growth Plan
            - generic [ref=e286]:
              - generic [ref=e287]: $89
              - generic [ref=e288]: /month
          - generic [ref=e289]:
            - paragraph [ref=e290]: "Features:"
            - list [ref=e291]:
              - listitem [ref=e292]:
                - img [ref=e293]
                - generic [ref=e296]: Advanced financial analytics tools
              - listitem [ref=e297]:
                - img [ref=e298]
                - generic [ref=e301]: Up to 10 user accounts
              - listitem [ref=e302]:
                - img [ref=e303]
                - generic [ref=e306]: Real-time exchange rate monitoring
              - listitem [ref=e307]:
                - img [ref=e308]
                - generic [ref=e311]: Custom monthly financial reports
              - listitem [ref=e312]:
                - img [ref=e313]
                - generic [ref=e316]: Priority email support
          - link "Get Started" [ref=e317] [cursor=pointer]:
            - /url: "#"
        - generic [ref=e319]:
          - generic [ref=e320]:
            - generic [ref=e321]:
              - img [ref=e322]
              - paragraph [ref=e324]: Scale Plan
            - generic [ref=e325]:
              - generic [ref=e326]: $149
              - generic [ref=e327]: /month
          - generic [ref=e328]:
            - paragraph [ref=e329]: "Features:"
            - list [ref=e330]:
              - listitem [ref=e331]:
                - img [ref=e332]
                - generic [ref=e335]: Advanced analytics with forecasting tools
              - listitem [ref=e336]:
                - img [ref=e337]
                - generic [ref=e340]: Unlimited user accounts
              - listitem [ref=e341]:
                - img [ref=e342]
                - generic [ref=e345]: Real-time exchange rate monitoring with alerts
              - listitem [ref=e346]:
                - img [ref=e347]
                - generic [ref=e350]: Custom and exportable financial reports
              - listitem [ref=e351]:
                - img [ref=e352]
                - generic [ref=e355]: Dedicated support via email and chat
          - link "Get Started" [ref=e356] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e357]:
      - generic [ref=e359]:
        - generic [ref=e360]:
          - img [ref=e361]
          - img [ref=e363]
        - heading "What our clients are saying" [level=2] [ref=e365]:
          - text: What our
          - emphasis [ref=e366]: clients
          - text: are saying
        - paragraph [ref=e367]: Teams across industries rely on Kova to make faster, more confident financial decisions.
      - generic [ref=e369]:
        - generic [ref=e370]:
          - img "Raquel Mota" [ref=e372]
          - generic [ref=e373]:
            - img [ref=e374]
            - paragraph [ref=e376]: Kova cut our month-end close from nine days to three. The automated reconciliation alone saved our team 40 hours a week — hours we now spend on analysis instead of data entry.
            - generic [ref=e377]:
              - paragraph [ref=e378]: Raquel Mota
              - paragraph [ref=e379]: CFO at Clearpath
        - generic [ref=e380]:
          - img "Tariq Osman" [ref=e382]
          - generic [ref=e383]:
            - img [ref=e384]
            - paragraph [ref=e386]: We evaluated four platforms before choosing Kova. The real-time dashboards and granular permissions meant we could roll it out to department leads without worrying about data exposure.
            - generic [ref=e387]:
              - paragraph [ref=e388]: Tariq Osman
              - paragraph [ref=e389]: Head of Finance at Openframe
        - generic [ref=e390]:
          - img "Lena Marchetti" [ref=e392]
          - generic [ref=e393]:
            - img [ref=e394]
            - paragraph [ref=e396]: The scenario modeling tool changed how we plan headcount. We can model three hiring paths side-by-side and see exactly how each affects runway. No more spreadsheet gymnastics.
            - generic [ref=e397]:
              - paragraph [ref=e398]: Lena Marchetti
              - paragraph [ref=e399]: VP Operations at Dovetail
        - generic [ref=e400]:
          - img "Daniel Voss" [ref=e402]
          - generic [ref=e403]:
            - img [ref=e404]
            - paragraph [ref=e406]: Our auditors used to dread the documentation phase. With Kova's audit log exports, what took two weeks now takes an afternoon. That alone justified the subscription.
            - generic [ref=e407]:
              - paragraph [ref=e408]: Daniel Voss
              - paragraph [ref=e409]: Controller at Meridian Labs
        - generic [ref=e410]:
          - img "Amara Singh" [ref=e412]
          - generic [ref=e413]:
            - img [ref=e414]
            - paragraph [ref=e416]: I check Kova on my phone every morning before standup. Cash position, outstanding receivables, burn rate — all in one glance. It's the first tool that actually reduced my financial anxiety.
            - generic [ref=e417]:
              - paragraph [ref=e418]: Amara Singh
              - paragraph [ref=e419]: Founder at Ridgeline
        - generic [ref=e420]:
          - img "Marcus Hale" [ref=e422]
          - generic [ref=e423]:
            - img [ref=e424]
            - paragraph [ref=e426]: We consolidated three separate finance tools into Kova. The integration was smoother than expected, and the support team stayed on calls until every edge case was resolved.
            - generic [ref=e427]:
              - paragraph [ref=e428]: Marcus Hale
              - paragraph [ref=e429]: Director of Strategy at Waypoint
        - generic [ref=e430]:
          - img "Raquel Mota" [ref=e432]
          - generic [ref=e433]:
            - img [ref=e434]
            - paragraph [ref=e436]: Kova cut our month-end close from nine days to three. The automated reconciliation alone saved our team 40 hours a week — hours we now spend on analysis instead of data entry.
            - generic [ref=e437]:
              - paragraph [ref=e438]: Raquel Mota
              - paragraph [ref=e439]: CFO at Clearpath
        - generic [ref=e440]:
          - img "Tariq Osman" [ref=e442]
          - generic [ref=e443]:
            - img [ref=e444]
            - paragraph [ref=e446]: We evaluated four platforms before choosing Kova. The real-time dashboards and granular permissions meant we could roll it out to department leads without worrying about data exposure.
            - generic [ref=e447]:
              - paragraph [ref=e448]: Tariq Osman
              - paragraph [ref=e449]: Head of Finance at Openframe
        - generic [ref=e450]:
          - img "Lena Marchetti" [ref=e452]
          - generic [ref=e453]:
            - img [ref=e454]
            - paragraph [ref=e456]: The scenario modeling tool changed how we plan headcount. We can model three hiring paths side-by-side and see exactly how each affects runway. No more spreadsheet gymnastics.
            - generic [ref=e457]:
              - paragraph [ref=e458]: Lena Marchetti
              - paragraph [ref=e459]: VP Operations at Dovetail
        - generic [ref=e460]:
          - img "Daniel Voss" [ref=e462]
          - generic [ref=e463]:
            - img [ref=e464]
            - paragraph [ref=e466]: Our auditors used to dread the documentation phase. With Kova's audit log exports, what took two weeks now takes an afternoon. That alone justified the subscription.
            - generic [ref=e467]:
              - paragraph [ref=e468]: Daniel Voss
              - paragraph [ref=e469]: Controller at Meridian Labs
        - generic [ref=e470]:
          - img "Amara Singh" [ref=e472]
          - generic [ref=e473]:
            - img [ref=e474]
            - paragraph [ref=e476]: I check Kova on my phone every morning before standup. Cash position, outstanding receivables, burn rate — all in one glance. It's the first tool that actually reduced my financial anxiety.
            - generic [ref=e477]:
              - paragraph [ref=e478]: Amara Singh
              - paragraph [ref=e479]: Founder at Ridgeline
        - generic [ref=e480]:
          - img "Marcus Hale" [ref=e482]
          - generic [ref=e483]:
            - img [ref=e484]
            - paragraph [ref=e486]: We consolidated three separate finance tools into Kova. The integration was smoother than expected, and the support team stayed on calls until every edge case was resolved.
            - generic [ref=e487]:
              - paragraph [ref=e488]: Marcus Hale
              - paragraph [ref=e489]: Director of Strategy at Waypoint
    - generic [ref=e491]:
      - generic [ref=e492]:
        - generic [ref=e493]:
          - img [ref=e494]
          - generic [ref=e496]: Blog and articles
        - heading "Discover the latest blogs" [level=2] [ref=e497]:
          - text: Discover the latest
          - emphasis [ref=e498]: blogs
        - paragraph [ref=e499]: Practical perspectives on finance operations, analytics strategy, and scaling infrastructure.
      - generic [ref=e500]:
        - link "The CFO's Guide to Real-Time Financial Reporting The CFO's Guide to Real-Time Financial Reporting How leading finance teams are shifting to live dashboards — and what it means for month-end close. Read more →" [ref=e502] [cursor=pointer]:
          - /url: "#"
          - img "The CFO's Guide to Real-Time Financial Reporting" [ref=e504]
          - generic [ref=e505]:
            - heading "The CFO's Guide to Real-Time Financial Reporting" [level=3] [ref=e506]
            - paragraph [ref=e507]: How leading finance teams are shifting to live dashboards — and what it means for month-end close.
            - generic [ref=e508]: Read more →
        - link "How to Build a Cash Reserve Without Starving Growth How to Build a Cash Reserve Without Starving Growth Three frameworks that help fast-growing teams balance liquidity with investment. Read more →" [ref=e510] [cursor=pointer]:
          - /url: "#"
          - img "How to Build a Cash Reserve Without Starving Growth" [ref=e512]
          - generic [ref=e513]:
            - heading "How to Build a Cash Reserve Without Starving Growth" [level=3] [ref=e514]
            - paragraph [ref=e515]: Three frameworks that help fast-growing teams balance liquidity with investment.
            - generic [ref=e516]: Read more →
        - link "Five Reconciliation Mistakes That Cost Thousands Five Reconciliation Mistakes That Cost Thousands Manual matching and siloed data create errors that compound across your ledger. Read more →" [ref=e518] [cursor=pointer]:
          - /url: "#"
          - img "Five Reconciliation Mistakes That Cost Thousands" [ref=e520]
          - generic [ref=e521]:
            - heading "Five Reconciliation Mistakes That Cost Thousands" [level=3] [ref=e522]
            - paragraph [ref=e523]: Manual matching and siloed data create errors that compound across your ledger.
            - generic [ref=e524]: Read more →
    - generic [ref=e527]:
      - img [ref=e528]
      - img [ref=e530]
      - img [ref=e533]
      - generic [ref=e537]:
        - img [ref=e538]
        - heading "Join us" [level=2] [ref=e540]
        - paragraph [ref=e541]:
          - text: Achieve operational clarity with
          - emphasis [ref=e542]: Kova
        - paragraph [ref=e543]: Founded by data engineers and former CFOs, we build analytics tools for finance teams of every size — from seed-stage to public.
        - link "Get Started" [ref=e544] [cursor=pointer]:
          - /url: "#pricing"
    - contentinfo [ref=e545]:
      - generic [ref=e546]:
        - generic [ref=e547]:
          - generic [ref=e548]:
            - link "Kova" [ref=e549] [cursor=pointer]:
              - /url: "#"
            - paragraph [ref=e550]: Financial analytics built for teams that move fast and need clarity at every turn.
            - generic [ref=e551]:
              - paragraph [ref=e552]: Subscribe to our newsletter
              - generic [ref=e553]:
                - textbox "you@company.com" [ref=e554]
                - button "Join" [ref=e555]
          - generic [ref=e556]:
            - paragraph [ref=e557]: Product
            - list [ref=e558]:
              - listitem [ref=e559]:
                - link "Features" [ref=e560] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e561]:
                - link "Pricing" [ref=e562] [cursor=pointer]:
                  - /url: "#pricing"
              - listitem [ref=e563]:
                - link "Integrations" [ref=e564] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e565]:
                - link "Changelog" [ref=e566] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e567]:
            - paragraph [ref=e568]: Company
            - list [ref=e569]:
              - listitem [ref=e570]:
                - link "About" [ref=e571] [cursor=pointer]:
                  - /url: "#about"
              - listitem [ref=e572]:
                - link "Blog" [ref=e573] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e574]:
                - link "Careers" [ref=e575] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e576]:
                - link "Contact" [ref=e577] [cursor=pointer]:
                  - /url: "#contact"
          - generic [ref=e578]:
            - paragraph [ref=e579]: Resources
            - list [ref=e580]:
              - listitem [ref=e581]:
                - link "Documentation" [ref=e582] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e583]:
                - link "API Reference" [ref=e584] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e585]:
                - link "Status" [ref=e586] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e587]:
                - link "Security" [ref=e588] [cursor=pointer]:
                  - /url: "#"
        - generic [ref=e589]:
          - paragraph [ref=e590]: © 2025 Kova. All rights reserved.
          - generic [ref=e591]:
            - link "Privacy Policy" [ref=e592] [cursor=pointer]:
              - /url: "#"
            - link "Terms of Service" [ref=e593] [cursor=pointer]:
              - /url: "#"
  - button "Open Next.js Dev Tools" [ref=e599] [cursor=pointer]:
    - img [ref=e600]
  - alert [ref=e603]
```

# Test source

```ts
  82  |     }
  83  | 
  84  |     document.querySelectorAll('*').forEach((el) => {
  85  |       if (threeEqualCards) return; // already found
  86  |       const children = [...el.children];
  87  | 
  88  |       // Method 1: exactly 3 direct children
  89  |       if (children.length === 3 && hasIdenticalStructure(children)) {
  90  |         threeEqualCards = true;
  91  |         return;
  92  |       }
  93  | 
  94  |       // Method 2: CSS Grid with 3+ items on the same visual row
  95  |       const style = getComputedStyle(el);
  96  |       if (style.display === 'grid' && children.length >= 3) {
  97  |         // Group children by their visual row (top position)
  98  |         const byRow = new Map<number, Element[]>();
  99  |         children.forEach((child) => {
  100 |           const rect = child.getBoundingClientRect();
  101 |           if (rect.width < 10 || rect.height < 10) return;
  102 |           // Round top to nearest 5px to group items on the same row
  103 |           const rowKey = Math.round(rect.top / 5) * 5;
  104 |           if (!byRow.has(rowKey)) byRow.set(rowKey, []);
  105 |           byRow.get(rowKey)!.push(child);
  106 |         });
  107 | 
  108 |         for (const rowItems of byRow.values()) {
  109 |           if (rowItems.length >= 3 && hasIdenticalStructure(rowItems)) {
  110 |             threeEqualCards = true;
  111 |             return;
  112 |           }
  113 |         }
  114 |       }
  115 |     });
  116 | 
  117 |     // ── Placeholder Names ──
  118 |     const namePatterns = ['John Doe', 'Jane Smith', 'Jane Doe', 'John Smith', 'Alex Johnson',
  119 |       'user@example.com', 'admin@example.com'];
  120 |     const placeholderNames = namePatterns.filter((n) => textContent.includes(n));
  121 | 
  122 |     // ── Round Numbers ──
  123 |     const roundNumberRegex = /\$\d{1,3}(,000)+(?:\.\d{2})?|\$\d{2,3}\.00\b|\b100%\b|\b99%\b/g;
  124 |     const roundMatches = textContent.match(roundNumberRegex) || [];
  125 |     const roundNumbers = [...new Set(roundMatches)];
  126 | 
  127 |     // ── Lorem Ipsum ──
  128 |     const loremIpsum = /lorem\s+ipsum/i.test(textContent);
  129 | 
  130 |     // ── Marketing Fluff ──
  131 |     const fluffWords = ['Elevate', 'Seamless', 'Unleash', 'Empower', 'Supercharge',
  132 |       'Revolutionary', 'Next-generation', 'Cutting-edge', 'World-class', 'Best-in-class'];
  133 |     const marketingFluff = fluffWords.filter((w) => {
  134 |       const regex = new RegExp(`\\b${w}\\b`, 'i');
  135 |       return regex.test(textContent);
  136 |     });
  137 | 
  138 |     // ── External Placeholder Images ──
  139 |     const images = document.querySelectorAll('img');
  140 |     const externalImages: string[] = [];
  141 |     images.forEach((img) => {
  142 |       const src = img.getAttribute('src') || '';
  143 |       if (src.includes('unsplash.com') || src.includes('picsum.photos') ||
  144 |           src.includes('placeholder.com') || src.includes('placehold.co') ||
  145 |           src.includes('via.placeholder')) {
  146 |         externalImages.push(src.slice(0, 80));
  147 |       }
  148 |     });
  149 | 
  150 |     return {
  151 |       centeredHero,
  152 |       threeEqualCards,
  153 |       placeholderNames,
  154 |       roundNumbers,
  155 |       loremIpsum,
  156 |       marketingFluff,
  157 |       externalImages,
  158 |     };
  159 |   });
  160 | }
  161 | 
  162 | test.describe('Anti-Slop Scan', () => {
  163 |   let report: SlopReport;
  164 | 
  165 |   test.beforeEach(async ({ page }) => {
  166 |     await page.goto('');
  167 |     await page.waitForTimeout(500);
  168 |     report = await scanForSlop(page);
  169 |   });
  170 | 
  171 |   test('no generic centered hero pattern', async () => {
  172 |     expect(
  173 |       report.centeredHero,
  174 |       'Centered hero (H1 + P + CTA) detected. Use asymmetric, split-screen, or editorial layout.'
  175 |     ).toBe(false);
  176 |   });
  177 | 
  178 |   test('no three-column equal card grid', async () => {
  179 |     expect(
  180 |       report.threeEqualCards,
  181 |       '3 equal-width cards with identical structure detected. Use bento grid, varied sizes, or list format.'
> 182 |     ).toBe(false);
      |       ^ Error: 3 equal-width cards with identical structure detected. Use bento grid, varied sizes, or list format.
  183 |   });
  184 | 
  185 |   test('no placeholder names', async () => {
  186 |     expect(
  187 |       report.placeholderNames.length,
  188 |       `Placeholder names found: ${report.placeholderNames.join(', ')}. Use realistic, diverse names.`
  189 |     ).toBe(0);
  190 |   });
  191 | 
  192 |   test('no lorem ipsum', async () => {
  193 |     expect(report.loremIpsum, 'Lorem ipsum detected. Write real copy.').toBe(false);
  194 |   });
  195 | 
  196 |   test('no marketing fluff words', async () => {
  197 |     if (report.marketingFluff.length > 0) {
  198 |       expect(
  199 |         report.marketingFluff.length,
  200 |         `Marketing fluff: ${report.marketingFluff.join(', ')}. Use specific, concrete language.`
  201 |       ).toBe(0);
  202 |     }
  203 |   });
  204 | 
  205 |   test('no external placeholder images', async () => {
  206 |     expect(
  207 |       report.externalImages.length,
  208 |       `External placeholder images: ${report.externalImages.join(', ')}. Use CSS gradients or local SVG.`
  209 |     ).toBe(0);
  210 |   });
  211 | 
  212 |   test('minimal round numbers in data', async () => {
  213 |     // Warning only — some round numbers are legitimate
  214 |     if (report.roundNumbers.length > 2) {
  215 |       expect(
  216 |         report.roundNumbers.length,
  217 |         `${report.roundNumbers.length} round numbers: ${report.roundNumbers.join(', ')}. Use specific, odd numbers.`
  218 |       ).toBeLessThanOrEqual(2);
  219 |     }
  220 |   });
  221 | });
  222 | 
```