// compound interest with monthly additions calculator
export function ciwa (p, pmt, r, n, t) {
  // See https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php?page=2
  // p = the principal investment amount (the initial deposit or loan amount)
  // pmt = the monthly payment
  // r = the annual interest rate (decimal)
  // n = the number of compounds per period (months, years, etc)
  // t = the number of periods (months, years, etc) the money is invested or borrowed
    var compoundInterestForPrincipal = p * Math.pow( (1+r/n), (n*t) );
    var futureValueOfSeries = pmt * ( ( Math.pow( (1 + r/n), ( n*t ) ) - 1 ) / (r/n) );
    var total = compoundInterestForPrincipal + futureValueOfSeries;
    return Math.round(total);
}