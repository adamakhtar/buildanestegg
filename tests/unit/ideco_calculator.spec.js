import IdecoCalculator from '@/calculators/ideco'

describe('IdecoCalculator', () => {

  it('total() returns correct return on investment starting from pre ideco and below ideco limit', () => {
    // correctly calculates investing up to end of pre stage
    // pre stage 155282
    // during sidepot stage = 0 (not investing in these years)
    // during ideco stage = 0 (not investing in these years)
    // post sidepot = 0 (not investing in these years)
    var calc = new IdecoCalculator(10,
      20,
      0,
      1000,
      5,
      'employee'
    )
    var sidepot = 0;
    expect(calc.total()).toEqual(155282)

    // correctly calculates investing up to end of during stage
    // pre stage 155282
    // during sidepot stage - 1142630 (grows from presidepot 155282)
    // during ideco stage - 1526020
    // combined during stage = 1142630 + 1526020 = 2668650
    // post sidepot = 0 (not investing in these years)
    // total = 2668650
    var calc = new IdecoCalculator(10,
      60,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(2668650)

    // correctly calculates investing up to end of post stage
    // pre stage 155282
    // during sidepot stage - 1142630 (grows from presidepot 155282)
    // during ideco stage - 1526020
    // combined during stage = 1142630 + 1526020 = 2668650
    // post sidepot (combined during stage @ 5% 10yrs with monthly contributions 1000 = 4550574)
    var calc = new IdecoCalculator(10,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(4550574)
  });

  it('total() returns correct return on investment starting from pre ideco and above ideco limit', () => {
    // WITH EXCESS CONTRIBUTION
    //---------------------------------------------------------------------

    // correctly calculates investing up to end of pre stage
    // pre stage 4658468
    // during sidepot stage = 0 (not investing in these years)
    // during ideco stage = 0 (not investing in these years)
    // post sidepot = 0 (not investing in these years)
    var calc = new IdecoCalculator(10,
      20,
      0,
      30000,
      5,
      'employee'
    )
    var sidepot = 0;

    expect(calc.total()).toEqual(4658468)

    // correctly calculates investing up to end of during stage
    // pre stage 4658468
    // during sidepot stage - 44961093 (grows from presidepot 4658468 and excess contrib of 7000 @5% 40 years )
    // during ideco stage - 35098464 (0 principal 23K monthly contrib @5% 40 years)
    // combined during stage = 44961093 + 35098464 = 80059557
    // post sidepot = 0 (not investing in these years)
    // total = 80059557
    var calc = new IdecoCalculator(10,
      60,
      0,
      30000,
      5,
      'employee'
    )

    expect(calc.total()).toEqual(80059557)

    // correctly calculates investing up to end of post stage
    // pre stage 4658468
    // during sidepot stage - 44961093 (grows from presidepot 4658468 and excess contrib of 7000 @5% 40 years )
    // during ideco stage - 35098464 (0 principal 23K monthly contrib @5% 40 years)
    // combined during stage = 44961093 + 35098464 = 80059557
    // post sidepot (combined during stage @ 5% 10yrs with monthly contributions 30000 = 136517319)
    var calc = new IdecoCalculator(10,
      70,
      0,
      30000,
      5,
      'employee'
    )

    expect(calc.total()).toEqual(136517319)
  })

  it('total() returns correct return on investment starting from during ideco stage and below ideco limit', () => {
    // correctly calculates investing up to end of during stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage = 0 (all money invested in ideco)
    // during ideco stage = 1526020 (0¥ principal, 1000¥pm, @5%, 40 years)
    // post sidepot = 0 (not investing in these years)
    // total = 1526020
    var calc = new IdecoCalculator(20,
      60,
      0,
      1000,
      5,
      'employee'
    )
    var sidepot = 0;
    expect(calc.total()).toEqual(1526020)

    // correctly calculates investing up to end of post stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage = 0 (all money invested in ideco)
    // during ideco stage = 1526020 (0¥ principal, 1000¥pm, @5%, 40 years)
    // post sidepot = 2668652 (1526020¥ principal, 1000¥pm, @5%, 10 years)
    var calc = new IdecoCalculator(20,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(2668652)
  });

  it('total() returns correct return on investment starting from during ideco stage and above ideco limit', () => {
    // correctly calculates investing up to end of during stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage = 10682141 (invest excess 0¥ principal, 7000¥pm, @5%, 40 years)
    // during ideco stage = 35098464 (0¥ principal, 23000¥pm, @5%, 40 years)
    // combined during = 10682141 + 35098464 = 45780605
    // post sidepot = 0 (not investing in these years)
    // total = 45780605
    var calc = new IdecoCalculator(20,
      60,
      0,
      30000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(45780605)

    // correctly calculates investing up to end of post stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage - 10682141 (principal 0 and excess contrib of 7000 @5% 40 years )
    // during ideco stage - 35098464 (0 principal 23K monthly contrib @5% 40 years)
    // combined during stage = 10682141 + 35098464 = 45780605
    // post sidepot = 80059560 (45780605¥ principal, 30000¥pm, @5%, 10yrs)
    var calc = new IdecoCalculator(20,
      70,
      0,
      30000,
      5,
      'employee'
    )


    console.log("this.preSidepotTotal", calc.preSidepotTotal())
    console.log("this.duringSidepotTotal", calc.duringSidepotTotal(calc.preSidepotTotal()))
    console.log("this.this.protectedTotal()", calc.protectedTotal())
    console.log("this.postSidepotTotal", calc.postSidepotTotal(calc.duringSidepotTotal(calc.preSidepotTotal()) + calc.protectedTotal())) // cash-out the protected total and combine with running sidepot
    expect(calc.total()).toEqual(80059560)
  })

  it('total() returns correct return on investment starting from post ideco stage and below ideco limit', () => {
    // correctly calculates investing up to end of post stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage = 0 (not investing in these years)
    // during ideco stage = 0 (not investing in these years)
    // post sidepot = 155282 (0¥ principal, 1000¥pm, @5%, 10 years)
    var calc = new IdecoCalculator(60,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(155282)
  });

  it('total() returns correct return on investment starting from post ideco stage and above ideco limit', () => {
    // correctly calculates investing up to end of post stage
    // pre stage 0 (not investing in these years)
    // during sidepot stage = 0 (not investing in these years)
    // during ideco stage = 0 (not investing in these years)
    // post sidepot = 4658468 (0¥ principal, 30000¥pm, @5%, 10 years)
    var calc = new IdecoCalculator(60,
      70,
      0,
      30000,
      5,
      'employee'
    )
    expect(calc.total()).toEqual(4658468)
  });


  it('protectedTotal() returns correct return on investment for eligible years only', () => {

    var calc = new IdecoCalculator(20,
      60,
      0,
      1000,
      5,
      'employee'
    )
    console.log("protected eligible", calc.excessMonthlyContribution());
    expect(calc.protectedTotal()).toEqual(1526020)

    var calc = new IdecoCalculator(10,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.protectedTotal()).toEqual(1526020)

    var calc = new IdecoCalculator(30,
      50,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.protectedTotal()).toEqual(411034)
  });

  it('preSidepotTotal() returns correct return on investment for pre non-eligible years only', () => {
    var expectedPreSidepot = 155282;
    var calc = new IdecoCalculator(10,
      20,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.preSidepotTotal()).toEqual(expectedPreSidepot)

    var calc = new IdecoCalculator(10,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.preSidepotTotal()).toEqual(expectedPreSidepot)
  });


  it('duringSidepotTotal() returns the sidepots correct return on investment for the monthly contribution which exceeds the ideco limit during the ideco investment period', () => {
    var expectedPreSidepot = 1526020;
    // ensure it does not invest any money into the sidepot if there is no
    // excess left over from the ideco monthly contribution
    var belowMaxMonthlyIdecoLimit = 1000;
    var existingSidepot = 0;
    var calc = new IdecoCalculator(20,
      60,
      0,
      belowMaxMonthlyIdecoLimit,
      5,
      'employee'
    )
    expect(calc.duringSidepotTotal(existingSidepot)).toEqual(0)


    // ensure it invests excess money into the sidepot
    var aboveMaxMonthlyIdecoLimit = 24000; //excess is 1000
    var existingSidepot = 0;
    var expectedReturn = 1526020 // ¥1000 per month, 0 principal, 40 years, 5%
    var calc = new IdecoCalculator(20,
      60,
      0,
      aboveMaxMonthlyIdecoLimit,
      5,
      'employee'
    )
    expect(calc.duringSidepotTotal(existingSidepot)).toEqual(expectedReturn)

    // it ignores pre and post years
    var aboveMaxMonthlyIdecoLimit =24000; //excess is 1000
    var existingSidepot = 0;
    var expectedReturn = 1526020 // ¥1000 per month, 0 principal, 40 years, 5%
    var calc = new IdecoCalculator(10,
      90,
      0,
      aboveMaxMonthlyIdecoLimit,
      5,
      'employee'
    )
    expect(calc.duringSidepotTotal(existingSidepot)).toEqual(expectedReturn)

    // it calculates according to number of *eligible* years a person has
    // to invest in ideco.
    var aboveMaxMonthlyIdecoLimit =24000; //excess is 1000
    var existingSidepot = 0;
    var startAge = 40;
    var endAge = 50; // eligible years is 50 - 40 = 10.
    var expectedReturn = 155282 // ¥1000 per month, 0 principal, 10 years, 5%
    var calc = new IdecoCalculator(40,
      50,
      0,
      aboveMaxMonthlyIdecoLimit,
      5,
      'employee'
    )
    expect(calc.duringSidepotTotal(existingSidepot)).toEqual(expectedReturn)

    // it includes the existing sidepot into the calculation
    var aboveMaxMonthlyIdecoLimit =24000; //excess is 1000
    var existingSidepot = 1000;
    var expectedReturn = 1533379 // ¥1000 per month, ¥1000 principal, 40 years, 5%
    var calc = new IdecoCalculator(20,
      60,
      0,
      aboveMaxMonthlyIdecoLimit,
      5,
      'employee'
    )
    expect(calc.duringSidepotTotal(existingSidepot)).toEqual(expectedReturn)
  });

  it('postSidepotTotal() returns correct return on investment for post non-eligible years only', () => {
    var existingSidepot = 1000;
    var expectedPreSidepot = 156929;
    var calc = new IdecoCalculator(60,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.postSidepotTotal(existingSidepot)).toEqual(expectedPreSidepot)

    // only calculates for post ideco years
    var calc = new IdecoCalculator(10,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.postSidepotTotal(existingSidepot)).toEqual(expectedPreSidepot)
  });

  it('eligibleYears() returns correct number of years', () => {
    var calc = new IdecoCalculator(20,
      60,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.eligibleYears()).toEqual(40)

    var calc = new IdecoCalculator(30,
      60,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.eligibleYears()).toEqual(30)

    var calc = new IdecoCalculator(10,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.eligibleYears()).toEqual(40)

    var calc = new IdecoCalculator(30,
      50,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.eligibleYears()).toEqual(20)
  });

  it('preEligibleYears() returns correct number of years', () => {
    var calc = new IdecoCalculator(10,
      60,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.preEligibleYears()).toEqual(10)

    var calc = new IdecoCalculator(10,
      15,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.preEligibleYears()).toEqual(5)
  });

  it('postEligibleYears() returns correct number of years', () => {
    var calc = new IdecoCalculator(20,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.postEligibleYears()).toEqual(10)

    var calc = new IdecoCalculator(65,
      70,
      0,
      1000,
      5,
      'employee'
    )
    expect(calc.postEligibleYears()).toEqual(5)
  });

  it('maxMonthlyContribution() returns correct value', () => {
    var calc = new IdecoCalculator(20, 70, 0, 1000, 5, 'employee')
    expect(calc.maxMonthlyContribution()).toEqual(23000)

    var calc = new IdecoCalculator(20, 70, 0, 1000, 5, 'selfEmployed')
    expect(calc.maxMonthlyContribution()).toEqual(68000)

    var calc = new IdecoCalculator(20, 70, 0, 1000, 5, 'dependant')
    expect(calc.maxMonthlyContribution()).toEqual(23000)

    var calc = new IdecoCalculator(20, 70, 0, 1000, 5, 'publicServant')
    expect(calc.maxMonthlyContribution()).toEqual(12000)
  });

  it('excessMonthlyContribution() returns correct value', () => {
    var calc = new IdecoCalculator(20, 70, 0, 1000, 5, 'employee')
    expect(calc.excessMonthlyContribution()).toEqual(0)

    var calc = new IdecoCalculator(20, 70, 0, 24000, 5, 'employee')
    expect(calc.excessMonthlyContribution()).toEqual(1000)
  });
})
