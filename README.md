# einvoice-ts

**A complete EN 16931 e-invoicing implementation for the JavaScript/TypeScript ecosystem.**

EN 16931 is the European standard for electronic invoicing. National mandates built on it are rolling out across the EU: France (reception mandatory since September 2026, emission for SMEs in September 2027), Belgium (since January 2026), Germany, Spain, Poland and others before 2030.

Mature free implementations exist in **Java** ([Mustang](https://www.mustangproject.org/)) and **Python** ([factur-x](https://github.com/akretion/factur-x)). The JavaScript/TypeScript ecosystem — the language of most web back-offices, modern ERPs and management SaaS — has only partial, work-in-progress libraries. In practice, a small European software vendor working in Node today must either pay a proprietary API or improvise.

**einvoice-ts closes that gap:**

- Generation **and** parsing of both EN 16931 syntaxes: UN/CEFACT **CII** and **UBL 2.1**
- **Schematron validation** against the official EN 16931 rules, runnable in Node and in the browser
- **PDF/A-3** embedding and extraction (Factur-X / ZUGFeRD), conformance verified with veraPDF
- A **public conformance test suite** reusable by other implementations

Released in full under the Apache-2.0 licence, with no dependency on any online service. Your invoices never leave your process.

## Status

**Early scaffolding.** This repository currently contains the EN 16931 semantic model (typed, with BT/BG references) and a minimal CII generator. The full milestone plan is in [ROADMAP.md](ROADMAP.md). A funding application to support this work has been submitted to the [NLnet Foundation](https://nlnet.nl/) (Restack fund, November 2026 call).

The author previously designed and shipped a production invoicing system implementing EN 16931 (CII generation in PDF/A-3, parsing, business-rule validation, ~1,300 automated tests); this library is a from-scratch, dependency-light reimplementation of that experience as a public commons.

## Why not contribute to an existing library?

Fair question — see the comparison and the outreach to existing JS maintainers documented in the roadmap. Short version: [node-zugferd](https://github.com/jslno/node-zugferd) covers generation only, [@stafyniaksacha/facturx](https://github.com/stafyniaksacha/facturx) is a partial port of the Python library, [e-invoice-eu](https://github.com/gflohr/e-invoice-eu) covers part of the chain. None offers both syntaxes, both directions, validation and the PDF layer with a conformance harness. Redundancy of independent implementations is part of what makes an open standard trustworthy; so is joining forces — both options are on the table with the maintainers concerned.

## Use of generative AI

In line with the [NLnet GenAI policy](https://nlnet.nl/foundation/policies/generativeAI/), this project is transparent about AI assistance:

- The initial scaffold in this repository (semantic model types, minimal CII builder, documentation) was drafted **with AI assistance** (Claude, Anthropic) under human direction, and reviewed by the author.
- Going forward, commits containing generated code are marked as such in the commit message, including the model used.
- The author remains accountable for correctness, and every design decision can be explained on request.
- Test vectors, Schematron rules and conformance corpora are official published artefacts, never AI-generated.

## License

[Apache-2.0](LICENSE)
