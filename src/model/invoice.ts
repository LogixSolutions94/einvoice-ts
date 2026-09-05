/**
 * EN 16931 semantic model — core invoice types.
 *
 * Field names carry their EN 16931 Business Term (BT) or Business Group (BG)
 * reference in comments, so every mapping decision can be traced back to the
 * standard. This model is syntax-neutral: the CII and UBL modules both
 * generate from (and parse into) these types.
 */

/** BG-4 / BG-7 — a party (seller or buyer). */
export interface Party {
  /** BT-27 / BT-44 — party name (legal name). */
  name: string;
  /** BT-30 / BT-47 — legal registration identifier (e.g. SIREN). */
  legalId?: string;
  /** BT-31 / BT-48 — VAT identifier (e.g. FR12345678901). */
  vatId?: string;
  /** BG-5 / BG-8 — postal address. */
  address: PostalAddress;
  /** BT-34 / BT-49 — electronic address (e.g. Peppol participant ID). */
  electronicAddress?: ElectronicAddress;
}

/** BG-5 / BG-8 — postal address. */
export interface PostalAddress {
  /** BT-35 / BT-50 — address line 1. */
  line1?: string;
  /** BT-36 / BT-51 — address line 2. */
  line2?: string;
  /** BT-37 / BT-52 — city. */
  city?: string;
  /** BT-38 / BT-53 — post code. */
  postCode?: string;
  /** BT-40 / BT-55 — country code, ISO 3166-1 alpha-2. Mandatory. */
  countryCode: string;
}

/** BT-34/BT-49 with its scheme (EAS code list). */
export interface ElectronicAddress {
  value: string;
  /** EAS scheme identifier, e.g. "0009" (SIRET), "9957" (French VAT). */
  scheme: string;
}

/** BG-25 — invoice line. */
export interface InvoiceLine {
  /** BT-126 — line identifier. */
  id: string;
  /** BT-153 — item name. */
  itemName: string;
  /** BT-129 — invoiced quantity. */
  quantity: number;
  /** BT-130 — unit of measure code (UN/ECE Recommendation 20). */
  unitCode: string;
  /** BT-146 — item net price. */
  netPrice: number;
  /** BT-131 — line net amount (quantity × net price, minus line allowances). */
  netAmount: number;
  /** BG-30 — line VAT information. */
  vat: VatCategory;
}

/** BG-30 / BG-23 — VAT category. */
export interface VatCategory {
  /** BT-151/BT-118 — category code (UNCL5305): S, Z, E, AE, K, G, O, L, M. */
  categoryCode: 'S' | 'Z' | 'E' | 'AE' | 'K' | 'G' | 'O' | 'L' | 'M';
  /** BT-152/BT-119 — category rate, percent. Absent for category O. */
  rate?: number;
}

/** BG-23 — VAT breakdown, one entry per category/rate pair. */
export interface VatBreakdown {
  /** BT-116 — taxable amount for this category. */
  taxableAmount: number;
  /** BT-117 — tax amount for this category. */
  taxAmount: number;
  category: VatCategory;
}

/** BG-22 — document totals. */
export interface DocumentTotals {
  /** BT-106 — sum of invoice line net amounts. */
  lineTotal: number;
  /** BT-109 — total amount without VAT. */
  taxExclusive: number;
  /** BT-110 — total VAT amount. */
  taxTotal?: number;
  /** BT-112 — total amount with VAT. */
  taxInclusive: number;
  /** BT-115 — amount due for payment. */
  payableAmount: number;
}

/** UNCL1001 subset — invoice type code (BT-3). */
export type InvoiceTypeCode = 380 | 381 | 384 | 389 | 751;

/** The EN 16931 core invoice (BG-1 … BG-25, non-exhaustive at this stage). */
export interface Invoice {
  /** BT-1 — invoice number. Mandatory. */
  number: string;
  /** BT-2 — issue date, ISO 8601 (YYYY-MM-DD). Mandatory. */
  issueDate: string;
  /** BT-3 — invoice type code. Mandatory. */
  typeCode: InvoiceTypeCode;
  /** BT-5 — invoice currency code, ISO 4217. Mandatory. */
  currency: string;
  /** BT-9 — payment due date. */
  dueDate?: string;
  /** BG-4 — seller. Mandatory. */
  seller: Party;
  /** BG-7 — buyer. Mandatory. */
  buyer: Party;
  /** BG-25 — invoice lines (at least one). */
  lines: InvoiceLine[];
  /** BG-23 — VAT breakdown. */
  vatBreakdown: VatBreakdown[];
  /** BG-22 — document totals. Mandatory. */
  totals: DocumentTotals;
  /** BT-20 — payment terms, free text. */
  paymentTerms?: string;
  /** BT-83 — remittance information (payment reference). */
  paymentReference?: string;
}

/** Factur-X / ZUGFeRD conformance profiles. */
export type FacturXProfile =
  | 'MINIMUM'
  | 'BASIC-WL'
  | 'BASIC'
  | 'EN16931'
  | 'EXTENDED';
