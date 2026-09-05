# Roadmap

Seven milestones, each independently verifiable. Effort estimates assume one experienced developer.

| # | Milestone | Deliverable | Est. effort |
|---|---|---|---|
| 1 | **Core CII** (Factur-X / ZUGFeRD): generation and parsing, profiles MINIMUM → EXTENDED | `generateCII()` / `parseCII()` with round-trip tests | 12 days |
| 2 | **UBL 2.1**: generation and parsing (Invoice and CreditNote) | `generateUBL()` / `parseUBL()` | 8 days |
| 3 | **Validation**: EN 16931 Schematron for both syntaxes + profile rules, runnable in Node and in the browser | `validate()` returning rule-level reports | 10 days |
| 4 | **PDF/A-3**: embedding and extraction, conformance verified with veraPDF | `embedInPdf()` / `extractFromPdf()` | 8 days |
| 5 | **Conformance suite** against the official EN 16931 corpus, CI, public report | `conformance/` + published results | 8 days |
| 6 | **Docs, packaging, reproducible build**, preparation for external security review | npm package, pinned toolchain | 6 days |
| 7 | **Cross-interoperability** with Mustang (Java) and factur-x (Python) | interop report | 4 days |

## Non-goals (for now)

- National profile extensions beyond Factur-X/ZUGFeRD/XRechnung basics (Peppol PINT national customisations are tracked separately)
- Transmission (Peppol AS4, PDP/PA connectivity) — this library stops at producing and validating conformant documents
- Anything requiring a network call at runtime

## Maintainer outreach log

- `node-zugferd` — contacted September 2026 (joining forces vs. complementary implementation). Outcome: pending.
- `@stafyniaksacha/facturx` — contacted September 2026. Outcome: pending.
