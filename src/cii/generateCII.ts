/**
 * Minimal UN/CEFACT CII (Cross Industry Invoice) generator.
 *
 * Current scope: Factur-X MINIMUM profile only — the smallest conformant
 * document. See ROADMAP.md milestone 1 for the path to BASIC → EXTENDED.
 *
 * Deliberately dependency-free: the XML is assembled from escaped strings.
 * A schema-aware builder replaces this once profiles beyond MINIMUM land.
 */

import type { Invoice } from '../model/invoice.js';

const GUIDELINE_MINIMUM = 'urn:factur-x.eu:1p0:minimum';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function amt(n: number): string {
  return n.toFixed(2);
}

/**
 * Generate a Factur-X MINIMUM profile CII document.
 *
 * MINIMUM carries: invoice number (BT-1), type code (BT-3), issue date
 * (BT-2), seller and buyer names (BT-27/BT-44), seller VAT id (BT-31),
 * currency (BT-5), and the totals (BT-109, BT-110, BT-112, BT-115).
 */
export function generateCIIMinimum(invoice: Invoice): string {
  const { number, typeCode, issueDate, currency, seller, buyer, totals } =
    invoice;

  // CII dates use format code 102 = YYYYMMDD.
  const date102 = issueDate.replace(/-/g, '');

  const sellerVat = seller.vatId
    ? `<ram:SpecifiedTaxRegistration><ram:ID schemeID="VA">${esc(seller.vatId)}</ram:ID></ram:SpecifiedTaxRegistration>`
    : '';

  const taxTotal =
    totals.taxTotal !== undefined
      ? `<ram:TaxTotalAmount currencyID="${esc(currency)}">${amt(totals.taxTotal)}</ram:TaxTotalAmount>`
      : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>${GUIDELINE_MINIMUM}</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${esc(number)}</ram:ID>
    <ram:TypeCode>${typeCode}</ram:TypeCode>
    <ram:IssueDateTime><udt:DateTimeString format="102">${date102}</udt:DateTimeString></ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${esc(seller.name)}</ram:Name>
        ${sellerVat}
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${esc(buyer.name)}</ram:Name>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery/>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${esc(currency)}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:TaxBasisTotalAmount>${amt(totals.taxExclusive)}</ram:TaxBasisTotalAmount>
        ${taxTotal}
        <ram:GrandTotalAmount>${amt(totals.taxInclusive)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${amt(totals.payableAmount)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`;
}
