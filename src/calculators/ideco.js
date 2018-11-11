import { ciwa } from './ciwa'

export default class IdecoCalculator {
  constructor(startAge, retirementAge, principal, monthlyContribution, interestRate, workStatus) {
    this.startAge = startAge;
    this.retirementAge = retirementAge;
    this.principal = principal;
    this.monthlyContribution = monthlyContribution;
    this.interestRate = interestRate;
    this.workStatus = workStatus;

    this.minAge = 20;
    this.maxAge = 60;
  }


  // Returns the actual number eligible years someone has to invest in an
  // Ideco according to their personal start and end ages and the Ideco's
  // min and max age range.
  eligibleYears () {
    var actualStart = this.minAge;
    var actualFinish = null;
    if ( this.startAge > this.minAge ) {
      actualStart = this.startAge;
    } else {
      actualStart = this.minAge;
    }

    if ( this.retirementAge < this.maxAge ) {
      actualFinish = this.retirementAge;
    } else {
      actualFinish = this.maxAge;
    }

    return actualFinish - actualStart;
  }

  total () {
    var sidepot = 0;
    sidepot = this.preSidepotTotal()
    sidepot = this.duringSidepotTotal(sidepot)
    sidepot = this.postSidepotTotal(sidepot + this.protectedTotal()) // cash-out the protected total and combine with running sidepot
    return sidepot;
  }

  protectedTotal () {
    // to keep things simple the principal will *not* be invested via
    // iDeco. It will be invested as a lump sum in the sidepot
    return ciwa(
      0,
      this.protectedMonthlyContribution(),
      this.interestRate / 100,
      12,
      this.eligibleYears()
    )
  }

  preSidepotTotal () {
    var sidepot = 0;

    // pre-eligible years we have to ordinarily invest all of our monthly contribution
    // we also invest our principal here.
    return ciwa(
      this.principal,
      this.monthlyContribution,
      this.interestRate / 100,
      12,
      this.preEligibleYears()
    );
  }

  duringSidepotTotal (currentSidepot) {
    // during ideco years we invest our monthly addition upto the full Ideco allowance
    // if there is money left over then we ordinarily invest the excess in the sidepot.
    // If starting age was before the Ideco's minimum age then a sidepot was setup
    // for investing in that period. We use that pre-sidepot i.e. currentSidepot
    // as the principal here
    return ciwa(
      currentSidepot,
      this.excessMonthlyContribution(),
      this.interestRate / 100,
      12,
      this.eligibleYears()
    );
  }

  postSidepotTotal (currentSidepot) {
    // for post eligible years we revert back to investing all of the monthly
    // allowance in. We also assume we cashout the entire ideco and mix it with
    // the existing sidepot and will be henceforth ordinarily invested
    return ciwa(
      currentSidepot,
      this.monthlyContribution,
      this.interestRate / 100,
      12,
      this.postEligibleYears()
    );
  }

  protectedPercentage () {
    return Math.round(this.protectedTotal() / this.total() * 100)
  }

  preEligibleYears () {
    if (this.startAge < this.minAge) {
      if (this.retirementAge < this.minAge) {
        return this.totalYears();
      } else {
        return this.minAge - this.startAge;
      }
    } else {
      return 0;
    }
  }

  postEligibleYears () {
    if (this.retirementAge > this.maxAge) {
      if (this.startAge > this.maxAge) {
        return this.totalYears();
      } else {
        return this.retirementAge - this.maxAge;
      }
    } else {
      return 0;
    }
  }

  totalYears () {
    return this.retirementAge - this.startAge;
  }

  maxMonthlyContribution () {
    switch(this.workStatus) {
      case 'employee':
      return 23000;
      case 'selfEmployed':
      return 68000;
      case 'publicServant':
      return 12000;
      case 'dependant':
      return 23000;
      default:
      throw "Error" + this.workStatus;
    }
  }

  protectedMonthlyContribution () {
    if (this.monthlyContribution >= this.maxMonthlyContribution()) {
      return this.maxMonthlyContribution();
    } else {
      return this.monthlyContribution;
    }
  }

  excessMonthlyContribution () {
    if (this.monthlyContribution > this.maxMonthlyContribution()) {
      return (this.monthlyContribution - this.maxMonthlyContribution());
    } else {
      return 0;
    }
  }
}
