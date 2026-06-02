# Local Web Renewal

Marketing site for Local Web Renewal, a 3-day website renewal service for local service businesses.

## Demo Gallery

The public demo index lives at:

```text
/demo/
```

Each client-specific outreach preview lives under:

```text
/demo/company-slug/
```

Current HVAC outreach demos:

| Company | Demo path | Outreach angle |
| --- | --- | --- |
| P.T. Heating & Air Conditioning Services | `/demo/pt-heating-air-conditioning/` | Staten Island and five-borough HVAC concept with clearer phone, schedule, AC, and heating paths. |
| ALL HVAC INC | `/demo/all-hvac/` | Brooklyn HVAC concept with clearer installation, repair, maintenance, quote, and rebate paths. |
| Systematic Heating & Cooling Corp | `/demo/systematic-heating-cooling/` | Queens and NYC HVAC concept grouping broad system services into faster estimate paths. |
| North Pole Cooling Corp | `/demo/north-pole-cooling/` | Brooklyn AC specialist concept with Friedrich dealer, sales, installation, service, and warranty paths. |
| Panda HVAC Inc | `/demo/panda-hvac/` | Brooklyn HVAC concept with a stronger phone-first estimate flow and verified HomeAdvisor proof. |
| New York Heating & Air Conditioning | `/demo/new-york-heating/` | Staten Island HVAC concept with clearer calls, service paths, and trust signals. |
| Ice Age Mechanical Corp | `/demo/ice-age-mechanical/` | Brooklyn HVAC concept with stronger emergency, Mitsubishi dealer, and contact paths. |
| Coil Techs | `/demo/coil-techs/` | Staten Island HVAC concept with clearer service hierarchy and commercial inquiry paths. |
| Tonnage HVAC-R | `/demo/tonnage-hvac/` | Greater NYC HVAC-R concept with clearer repair, installation, commercial, and air quality paths. |
| Air-Wave Air Conditioning | `/demo/air-wave-ac/` | Bronx room AC specialist concept with clearer sales, service, storage, PTAC, and building paths. |
| Dierks Heating Company | `/demo/dierks-heating/` | Long Island City contractor concept with clearer project, service, and direct inquiry paths. |
| S&L HVAC Systems Corp | `/demo/sl-hvac-systems/` | Queens and NYC HVAC concept with stronger phone-first mobile quote routing. |
| Vega HVAC Contracting Corp | `/demo/vega-hvac/` | Brooklyn HVAC concept showing an independent homepage beyond a hosted business listing. |
| Gemini Thermo HVAC | `/demo/gemini-thermo-hvac/` | Brooklyn HVAC concept turning public contact basics into a clearer service and callback flow. |
| Brownstone Heating & Air Conditioning | `/demo/brownstone-heating-ac/` | Brooklyn HVAC concept focused on sharper local positioning and estimate conversion. |
| 212 HVAC | `/demo/212-hvac/` | A conversion audit page could make emergency repair, replacement, and maintenance choices easier to act on quickly. |
| Vinco Mechanical | `/demo/vinco-mechanical/` | Commercial buyers can choose service, project, maintenance, or direct contact paths even faster from the first screen. |
| Scaran | `/demo/scaran/` | A service hub can help visitors choose HVAC, plumbing, oil, or urgent help without scanning the full business mix. |
| Bob Mims Heating & Air Conditioning | `/demo/bob-mims/` | A focused landing page could still route urgent service, maintenance, and replacement visitors more directly. |
| SC Prime Energy Ltd | `/demo/sc-prime-energy/` | Prospects can see project support and service paths sooner, then choose phone or callback without extra digging. |
| Atlantida HVAC Corp | `/demo/atlantida-hvac/` | Customers and project buyers can get from a broad contractor site into the right HVAC inquiry faster. |
| Mac Air | `/demo/mac-air-hvac/` | Visitors can choose the right HVAC action faster while preserving a more established brand presence. |
| Brooklyn Air Solutions / Levi & Co HVAC | `/demo/brooklyn-air-solutions/` | Residential and commercial customers can quickly understand whether to call for service, repair, or installation. |
| Elite Air Conditioning & Beyond Inc | `/demo/elite-ac-beyond/` | AC and heating visitors can choose repair or replacement help without working through generic contact details first. |
| Cool Tech HVAC Corp | `/demo/cool-tech-hvac/` | More visitors can move from a public profile or homepage into a clear repair, installation, or maintenance action. |
| Forgenie HVAC | `/demo/forgenie-hvac/` | More Brooklyn mobile visitors can call or request HVAC help before searching through a small service site. |

| MR. AIR NYC | `/demo/mr-air-nyc/` | Brooklyn mini-split and heat pump visitors can choose design, install, repair, or maintenance help faster from the first screen. |

| Fresh Cool Air Corp | `/demo/fresh-cool-air/` | Commercial visitors can move from broad service copy into a clear call, service, or estimate path faster. |

| Nu-Way Heating & Cooling Inc. | `/demo/nu-way-hvac/` | Property managers and builders can move from portfolio proof into installation, service, or maintenance inquiries faster. |

| Climate Control HVAC | `/demo/climate-control-hvac/` | Home and business visitors can choose repair, installation, maintenance, or emergency help without scanning multiple sections. |

| Air Rescue NY | `/demo/air-rescue-ny/` | Urgent visitors can call for HVAC help before working through sliders, menus, or lower-page service blocks. |

| Profair Corp. | `/demo/profair-corp/` | Profile visitors can understand the AC installation offer and reach the company without navigating a directory-style page. |

| Lebess Mechanical Corp. | `/demo/lebess-mechanical/` | Commercial and residential visitors can choose HVAC, refrigeration, service, or project help without a bare contact-only experience. |

| AquaTech Mechanical | `/demo/aquatech-mechanical/` | Visitors can quickly choose HVAC, electrical, generator, or service-area help while phone contact remains primary. |

| Temperature Management Corp | `/demo/temperature-management/` | Visitors can call or choose residential, commercial, repair, or installation help without digging through a traditional service layout. |

| R.A.M.S. Mechanical Inc. | `/demo/rams-mechanical/` | Commercial buyers can choose HVAC, sheet metal, ductwork, or project quote help faster from the homepage. |

When adding or removing demos, update both this table and `demo/index.html`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Outreach Assets

Before sending outreach for a demo, verify:

- The live URL works under `https://www.localwebrenewal.com/demo/company-slug/`.
- The page includes `noindex, nofollow`.
- The mobile before/after image exists under `../leads/screenshots/`.
- The lead sheet has the demo URL, outreach status, and source notes updated.

The detailed build and outreach checklist is maintained in `../DEMO_REQUIREMENTS.md`.
