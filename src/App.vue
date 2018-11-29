<template>
  <div id="app-container" class="container mx-auto mt-16">
    <div class="flex px-4">
      <div class="_sidebar flex-none w-80 p-4 border border-grey-light rounded shadow bg-white">
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How old are you?</label>
          <input class="border border-grey-light p-2" type="text" v-model.number='currentAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">What age do you want to retire?</label>
          <input class="border border-grey-light p-2" type="text" v-model.number='retirementAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How much can you save a month?</label>
          <input class="border border-grey-light p-2" type="text" v-model.number='monthlyAddition'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">How much have you saved so far?</label>
          <input class="border border-grey-light p-2" type="text" v-model.number='principal'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base">What do you think the average rate of return will be?</label>
          <input class="border border-grey-light p-2" type="text" v-model.number='rate'>
        </p>
      </div>
      <div class="_main flex-grow ml-8">



        <div class="border border-grey-light rounded mb-4 shadow bg-white">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <div class="_body p-4">
            <h3 class="text-black font-medium text-xl text-center mb-4">Your Estimated Return</h3>
            <p class="mb-4 font-semibold font-sans text-6xl text-center">¥{{preTaxTotal | currency}}</p>
            <p class="leading-normal text-lg max-w-lg mx-auto text-left">
              This is how much your nest egg is estimated to be worth before tax is deducted after {{years}} years. It assumes you'll invest ¥{{principal}} from the start and supplement it with ¥{{monthlyAddition}} monthly additions in something which grows at an average of {{rate}}% per year.
            </p>
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
          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 mr-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Ditch the coffee</h3>
            <p>and have ¥{{coffeeSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxTotalWithCoffee / preTaxTotal)}}% to ¥{{preTaxTotalWithCoffee | currency}}</p>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 mx-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Skip work lunches</h3>
            <p>and have ¥{{lunchSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxGrowthWithLunch)}}% to ¥{{preTaxTotalWithLunch | currency}}</p>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white p-4 w-1/3 ml-2 leading-normal">
            <h3 class="font-semibold text-2xl mb-2 leading-tight">Stay in a night</h3>
            <p>and have ¥25000 more per month to invest. Your total investment grows by 10% to ¥{{preTaxTotal | currency}}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ciwa } from './calculators/ciwa'
import LineChart from './components/LineChart.vue'
import IdecoCalculator from './calculators/ideco'
var _ = require('lodash');

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
    monthlyContributionWithCoffee () {
      return this.monthlyAddition + this.coffeeSavingPerMonth;
    },
    monthlyContributionWithLunch () {
      return this.monthlyAddition + this.lunchSavingPerMonth;
    },

    preTaxGrowthWithCoffee () {
      return (this.preTaxTotalWithCoffee - this.preTaxTotal) / this.preTaxTotal * 100
    },

    preTaxGrowthWithLunch () {
      console.log("preTaxGrowthWithLunch - pretaxtotal", this.preTaxTotal)
      console.log("preTaxGrowthWithLunch - this.preTaxTotalWithCoffee", this.preTaxTotalWithLunch)
      return (this.preTaxTotalWithLunch - this.preTaxTotal) / this.preTaxTotal * 100
    },

    preTaxTotalWithCoffee () {
      return ciwa(
        this.principal,
        this.monthlyContributionWithCoffee,
        this.rate / 100,
        12,
        this.years
      )
    },

    preTaxTotalWithLunch () {
      return ciwa(
        this.principal,
        this.monthlyContributionWithLunch,
        this.rate / 100,
        12,
        this.years
      )
    },


    idecoCalculator () {
      return new IdecoCalculator(this.currentAge, this.retirementAge, this.principal, this.monthlyAddition, this.rate, this.profession)
    },
    idecoProtectedTotal () {
      return this.idecoCalculator.protectedTotal()
      // // to keep things simple the principal will *not* be invested via
      // // iDeco. It will be invested as a lump sum in the sidepot
      // if (this.availableIdecoYears == 0) {
      //   return 0
      // }

      // return ciwa(
      //   0,
      //   this.idecoMonthlyContribution,
      //   this.rate / 100,
      //   12,
      //   this.availableIdecoYears
      // )
    },
    preEligibleYears () {
      return (this.currentAge < this.idecoAgeMin ? this.idecoAgeMin - this.currentAge : 0);
    },
    postEligibleYears () {
      return (this.retirementAge > this.idecoAgeMax ? this.retirementAge - this.idecoAgeMax : 0);
    },
    availableIdecoYears () {
      return this.idecoCalculator.eligibleYears()
      // var startAge = this.idecoAgeMin;
      // var finishAge = null;
      // if ( this.currentAge > this.idecoAgeMin ) {
      //   startAge = this.currentAge;
      // } else {
      //   startAge = this.idecoAgeMin;
      // }

      // if ( this.retirementAge < this.idecoAgeMax ) {
      //   finishAge = this.retirementAge;
      // } else {
      //   finishAge = this.idecoAgeMax;
      // }

      // return finishAge - startAge;
    },
    idecoProtectedPercent () {
      return this.idecoCalculator.protectedPercentage();
      // return Math.round(this.idecoProtectedTotal / this.preTaxTotal * 100);
    },
    old_idecoUnprotectedTotal () {
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
    old_monthlyMaxIdecoContribution () {
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
      return this.idecoCalculator.protectedMonthlyContribution();
      // if (this.monthlyAddition > this.monthlyMaxIdecoContribution) {
      //   return this.monthlyMaxIdecoContribution;
      // } else {
      //   return this.monthlyAddition;
      // }
    },
    idecoExcessContribution () {
      return this.idecoCalculator.excessMonthlyContribution();
      // return (this.monthlyAddition >= this.monthlyMaxIdecoContribution ? this.monthlyAddition - this.monthlyMaxIdecoContribution : 0);
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
