import {
  SAMPLE_ANNUAL_SUMMARY, SAMPLE_DEPOSIT_SETTLEMENT, SAMPLE_INVOICE, SAMPLE_LEASE,
  SAMPLE_PAYMENT_RECEIPT, SAMPLE_QUOTE, SAMPLE_RENT_NOTICE, SAMPLE_RENT_RECEIPT,
  SAMPLE_STATEMENT,
} from './document-samples.mock';

/**
 * The printed figures are the ones the brief and the mockup state. These
 * specs keep a careless edit of the sample data from going unnoticed.
 */
describe('document samples', () => {
  it('bills a company notice at 600 000 + TOM + VAT = 729 600', () => {
    const lines = SAMPLE_RENT_NOTICE.lines.reduce((total, line) => total + line.amount, 0);
    expect(lines + SAMPLE_RENT_NOTICE.previousBalance).toBe(SAMPLE_RENT_NOTICE.total);
    expect(SAMPLE_RENT_NOTICE.total).toBe(729_600);
  });

  it('bills an individual receipt at 450 000 + 25 000 = 475 000', () => {
    const lines = SAMPLE_RENT_RECEIPT.lines.reduce((total, line) => total + line.amount, 0);
    expect(lines).toBe(SAMPLE_RENT_RECEIPT.total);
    expect(SAMPLE_RENT_RECEIPT.total).toBe(475_000);
  });

  it('leaves nothing to pay on a payment receipt that settles the instalment', () => {
    expect(SAMPLE_PAYMENT_RECEIPT.amount).toBe(SAMPLE_RENT_RECEIPT.total);
    expect(SAMPLE_PAYMENT_RECEIPT.remaining).toBe(0);
  });

  it('settles the deposit at 480 000 − 45 000 − 12 600 = 422 400', () => {
    const credit = SAMPLE_DEPOSIT_SETTLEMENT.rows.reduce((total, row) => total + (row.credit ?? 0), 0);
    const debit = SAMPLE_DEPOSIT_SETTLEMENT.rows.reduce((total, row) => total + (row.debit ?? 0), 0);
    expect(credit - debit).toBe(SAMPLE_DEPOSIT_SETTLEMENT.refunded);
    expect(SAMPLE_DEPOSIT_SETTLEMENT.refunded).toBe(422_400);
  });

  it('remits 1 820 000 − 182 000 fees = 1 638 000 to the owner', () => {
    const collected = SAMPLE_STATEMENT.lines.reduce((total, line) => total + line.amount, 0);
    expect(collected).toBe(SAMPLE_STATEMENT.collected);
    expect(SAMPLE_STATEMENT.collected - SAMPLE_STATEMENT.fees - SAMPLE_STATEMENT.works)
      .toBe(SAMPLE_STATEMENT.net);
    expect(SAMPLE_STATEMENT.net).toBe(1_638_000);
  });

  it('sums the annual summary to the net it prints', () => {
    const total = SAMPLE_ANNUAL_SUMMARY.lines.reduce((sum, line) => sum + line.amount, 0);
    expect(total).toBe(SAMPLE_ANNUAL_SUMMARY.net);
  });

  it('quotes 120 000 excluding tax plus 18 % VAT = 141 600', () => {
    const items = SAMPLE_QUOTE.items.reduce((total, item) => total + item.total, 0);
    expect(items).toBe(SAMPLE_QUOTE.totalExclTax);
    expect(SAMPLE_QUOTE.vat).toBe(Math.round(SAMPLE_QUOTE.totalExclTax * 0.18));
    expect(SAMPLE_QUOTE.totalExclTax + SAMPLE_QUOTE.vat).toBe(SAMPLE_QUOTE.totalInclTax);
  });

  it('invoices the Pro plan at 750 000 excluding tax, 885 000 including it', () => {
    expect(SAMPLE_INVOICE.vat).toBe(Math.round(SAMPLE_INVOICE.amountExclTax * 0.18));
    expect(SAMPLE_INVOICE.amountExclTax + SAMPLE_INVOICE.vat).toBe(885_000);
  });

  it('sets the deposit at two months of rent on the sample lease', () => {
    expect(SAMPLE_LEASE.deposit).toBe(SAMPLE_LEASE.rent * SAMPLE_LEASE.depositMonths);
  });
});
