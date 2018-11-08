<template>
  <div id="app" class="container mx-auto mt-16">
    <div class="flex px-4">
      <div class="_sidebar flex-none w-64 p-4 border border-grey-light rounded shadow bg-white">
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How old are you?</label>
          <input class="border border-grey-light p-2" type="text" v-model='currentAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">What age do you want to retire?</label>
          <input class="border border-grey-light p-2" type="text" v-model='retirementAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How much can you save a month?</label>
          <input class="border border-grey-light p-2" type="text" v-model='monthlyAddition'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How much have you saved so far?</label>
          <input class="border border-grey-light p-2" type="text" v-model='principal'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">Annual Interest Rate</label>
          <input class="border border-grey-light p-2" type="text" v-model='rate'>
        </p>

        <div class="mb-6">
          <div class="mb-2">
            <input type="radio" id="one" value="employee" v-model="profession" name="profession">
            <label class="ml-2" for="one">Employee</label>
          </div>
          <div class="mb-2">
            <input type="radio" id="two" value="selfemployed" v-model="profession" name="profession">
            <label class="ml-2" for="two">Self-employed or un-employed</label>
          </div>
          <div class="mb-2">
            <input type="radio" id="three" value="publicservant" v-model="profession" name="profession">
            <label class="ml-2" for="three">Public servant</label>
          </div>
          <div class="mb-2">
            <input type="radio" id="four" value="dependant" v-model="profession" name="profession">
            <label class="ml-2" for="four">dependant</label>
          </div>
        </div>
      </div>
      <div class="_main flex-grow ml-8">



        <div class="border border-grey-light rounded mb-4 shadow bg-white">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <div class="_body p-4">
            <h3 class="text-black font-medium text-xl text-center mb-4">Your Estimated Return</h3>
            <p class="mb-4 font-semibold font-sans text-6xl text-center">¥{{preTaxTotal | currency}}</p>
            <p class="leading-normal text-lg max-w-lg mx-auto text-center">
              This is how much your investments are estimated to grow over {{years}} years at a constant rate of {{rate}}%.
            </p>
            <p class="leading-normal text-lg max-w-lg mx-auto text-center">
              <strong>Note</strong> this figure is before tax. How much tax you will need to pay depends on your invidual circumstances however, 20% is a good rough estimate. There are government backed schemes which allow you to pay much less tax. See below for more details.</p>
          </div>
        </div>

        <div class="border border-grey-light rounded shadow bg-white mb-4">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <h3 class="text-black font-medium text-xl text-center my-4">Time Is Your Best Friend</h3>
          <div class="_alert p-4 mb-4 mx-4 bg-blue-lightest text-blue-darker flex items-center">
              <i class="fas fa-piggy-bank text-3xl text-blue-darkest opacity-25 mr-4"></i>
              <p class="max-w-lg leading-normal">
                Compound interest creates a snowball like effect with your investments; the gains you make in one year from interest are then subject to interest in the following year. The biggest multiplier is time. It's better to start earlier with smaller monthly contributions than to start later with bigger ones.
              </p>
          </div>
          <div class="p-4">
            <line-chart :chart-data="data"
                        :options="{responsive: true, maintainAspectRatio: false}"
                        /></line-chart>
          </div>
        </div>

        <div class="flex">
          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-6 w-1/2 mr-2 leading-normal">
            <h3 class="font-semibold text-4xl leading-tight">Invest via iDeco and ...</h3>
            <h5 class="text-8xl leading-none font-normal">{{idecoProtectedPercent}}%</h5>
            <p>of your nest egg could be tax free (approx ¥{{Math.round(idecoProtectedTotal)}}).</p>
            <p><a href="#">Learn more about iDeco</a></p>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-6 w-1/2 ml-2 leading-normal">
            <h3 class="font-semibold text-4xl leading-tight">Invest via NISA and ...</h3>
            <h5 class="text-8xl leading-none font-normal">15%</h5>
            <p>of your nest egg could be tax free (approx ¥{{Math.round(idecoProtectedTotal)}}).</p>
            <p><a href="#">Learn more about NISA</a></p>
          </div>
        </div>

        <div class="flex">
          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 mr-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Ditch the coffee</h3>
            <p>and have ¥{{coffeeSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxTotalWithCoffee / preTaxTotal)}}% to ¥{{preTaxTotalWithCoffee | currency}}</p>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 mx-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Skip work lunches</h3>
            <p>and have ¥{{lunchSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxGrowthWithLunch)}}% to ¥{{preTaxTotalWithlunch | currency}}</p>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 ml-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Stay in a night</h3>
            <p>and have ¥25000 more per month to invest. Your total investment grows by 10% to ¥{{preTaxTotal | currency}}</p>
          </div>
        </div>



        <div class="border border-grey-light rounded mb-4 shadow bg-white">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <div class="_body p-4">
            <h3 class="text-black font-medium text-xl text-center mb-4">How to protect yourself from tax</h3>
            <div class="_alert p-4 mb-4 bg-blue-lightest text-blue-darker flex items-center">
              <i class="fas fa-piggy-bank text-3xl text-blue-darkest opacity-25 mr-4"></i>
              <p class="max-w-lg leading-normal">
                You can reduce the amount of tax you would have to pay on your investment of ¥{{preTaxTotal | currency}} by investing through a government backed tax relief scheme such as the iDeco or NISA.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
var _ = require('lodash');

// compound interest with additions
var ciwa = function(p, pmt, r, n, t) {
// See https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php?page=2
// p = the principal investment amount (the initial deposit or loan amount)
// pmt = the monthly payment
// r = the annual interest rate (decimal)
// n = the number of compounds per period (months, years, etc)
// t = the number of periods (months, years, etc) the money is invested or borrowed
  var compoundInterestForPrincipal = p * Math.pow( (1+r/n), (n*t) );
  var futureValueOfSeries = pmt * ( ( Math.pow( (1 + r/n), ( n*t ) ) - 1 ) / (r/n) ) * (1+r/n);
  var total = compoundInterestForPrincipal + futureValueOfSeries;
  return total;
}

var result = ciwa(1000, 100, 0.07, 12, 20)
var result = console.log("Result", result)

export default {
  name: 'app',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      currentAge: 10,
      retirementAge: 70,
      rate: 5,
      monthlyAddition: 10000,
      principal: 0,
      profession: "employee",
      idecoAgeMin: 20,
      idecoAgeMax: 60,
      coffeeSavingPerMonth: 8000,
      lunchSavingPerMonth: 16000
    }
  },
  mounted () {
  },
  computed: {
    // a computed getter
    data () {
      return {
        labels: _.range(this.currentAge, (this.currentAge + this.years)),
        datasets: [
          {
            label: 'Investment Growth',
            data: this.calculateYearlyGains(),
            borderColor: '#88bfed',
          }
        ]
      }
    },
    preTaxTotal () {
      return ciwa(
        this.principal,
        this.monthlyAddition,
        this.rate / 100,
        12,
        this.years
      )
    },
    preTaxTotalWithCoffee () {
      var combinedContribution = (this.monthlyAddition + this.coffeeSavingPerMonth)
      console.log("combinedContribution", combinedContribution);
      return ciwa(
        this.principal,
        combinedContribution,
        this.rate / 100,
        12,
        this.years
      )
    },
    preTaxGrowthWithCoffee () {
      return (this.preTaxTotalWithCoffee - this.preTaxTotal) / this.preTaxTotal * 100
    },
    preTaxTotalWithLunch () {
      var combinedContribution = (this.monthlyAddition + this.lunchSavingPerMonth)
      console.log("combinedContribution", combinedContribution);
      return ciwa(
        this.principal,
        combinedContribution,
        this.rate / 100,
        12,
        this.years
      )
    },
    preTaxGrowthWithLunch () {
      return (this.preTaxTotalWithLunch - this.preTaxTotal) / this.preTaxTotal * 100
    },
    idecoProtectedTotal () {
      // to keep things simple the principal will *not* be invested via
      // iDeco. It will be invested as a lump sum in the sidepot
      if (this.availableIdecoYears == 0) {
        return 0
      }

      return ciwa(
        0,
        this.idecoMonthlyContribution,
        this.rate / 100,
        12,
        this.availableIdecoYears
      )
    },
    preEligibleYears () {
      return (this.currentAge < this.idecoAgeMin ? this.idecoAgeMin - this.currentAge : 0);
    },
    postEligibleYears () {
      return (this.retirementAge > this.idecoAgeMax ? this.retirementAge - this.idecoAgeMax : 0);
    },
    availableIdecoYears () {
      var startAge = this.idecoAgeMin;
      var finishAge = null;
      if ( this.currentAge > this.idecoAgeMin ) {
        startAge = this.currentAge;
      } else {
        startAge = this.idecoAgeMin;
      }

      if ( this.retirementAge < this.idecoAgeMax ) {
        finishAge = this.retirementAge;
      } else {
        finishAge = this.idecoAgeMax;
      }

      return finishAge - startAge;
    },
    idecoProtectedPercent () {
      return Math.round(this.idecoProtectedTotal / this.preTaxTotal * 100);
    },
    idecoUnprotectedTotal () {
      var sidepot = 0;

      // preelligible years we have to ordinarily invest all of our monthly contribution
      // we also invest our principal here.
      sidepot = ciwa(
        this.principal,
        this.monthlyAddition,
        this.rate / 100,
        12,
        this.preEligibleYears
      );

      // during ideco years we invest our monnthly addition upto the full ideco allowance
      // if there is money left over then we ordinarily invest the excess in a sidepot
      sidepot = ciwa(
        sidepot,
        this.idecoExcessContribution,
        this.rate / 100,
        12,
        this.idecoAgeMax - this.idecoAgeMin
      );

      // for post elligible years we revert back to investing all of the monthly
      // allowance in. We also assume we cashout the entire ideco and will then
      // be ordinarily invested in this sidepot
      sidepot = ciwa(
        sidepot + this.idecoProtectedTotal,
        this.monthlyAddition,
        this.rate / 100,
        12,
        this.postEligibleYears
      );

      return sidepot;
    },
    monthlyMaxIdecoContribution () {
      switch(this.profession) {
        case 'employee':
        return 23000;
        case 'selfemployed':
        return 68000;
        case 'publicservant':
        return 12000;
        case 'dependant':
        return 23000;
      }
    },
    idecoMonthlyContribution () {
      if (this.monthlyAddition > this.monthlyMaxIdecoContribution) {
        return this.monthlyMaxIdecoContribution;
      } else {
        return this.monthlyAddition;
      }
    },
    idecoExcessContribution () {
      return (this.monthlyAddition >= this.monthlyMaxIdecoContribution ? this.monthlyAddition - this.monthlyMaxIdecoContribution : 0);
    },
    years () {
      return this.retirementAge - this.currentAge;
    }
  },
  methods: {
    calculateYearlyGains () {
      var yearlyGains = [];
      for(var i=0; i < this.years; i++){
        yearlyGains.push(ciwa(this.principal, this.monthlyAddition, this.rate / 100, 12, i))
      }
      return yearlyGains;
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },

  filters: {
    currency(amount) {
      try {
        var decimal = ".",
            thousands = ",",
            decimalCount = 0
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
