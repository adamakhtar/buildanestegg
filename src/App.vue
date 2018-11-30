<template>
  <div id="app-container" class="container mx-auto mt-16 px-4">
    <div class="lg:flex">
      <div class="_sidebar lg:flex-none w-full mb-4 lg:w-80 lg:mb-0 p-4 border border-grey-light rounded shadow bg-white">
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base text-grey-darker">How old are you?</label>
          </br>
          <input class="border border-grey-light p-3 h-12 rounded w-full text-3xl" type="text" v-model.number='currentAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base text-grey-darker">What age do you want to retire?</label>
          </br>
          <input class="border border-grey-light p-3 h-12 rounded w-full text-3xl" type="text" v-model.number='retirementAge'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base text-grey-darker">How much can you save a month?</label>
          </br>
          <input class="border border-grey-light p-3 h-12 rounded w-full text-3xl" type="text" v-model.number='monthlyAddition'>
        </p>
        <p class="mb-6">
          <label class="font-semibold inline-block mb-1 text-base text-grey-darker">How much have you saved so far?</label>
          </br>
          <input class="border border-grey-light p-3 h-12 rounded w-full text-3xl" type="text" v-model.number='principal'>
        </p>
        <div class="mb-6 w-full">
          <label class="font-semibold inline-block mb-1 text-base text-grey-darker">What do you think the average anual interest rate will be?</label>
          <div class="relative">
            <input class="border border-grey-light pl-3 pr-10 py-3 h-12 rounded w-full text-3xl" type="text" v-model.number='rate'>
            <span class="absolute pin-r pin-b pr-3 leading-none text-3xl font-semibold text-grey-dark" style="padding-bottom: 0.55rem;">%</span>
          </div>


          <span class="text-sm text-grey-dark">
            The American S&P 500 stock index returned on average 7% between 1950 and 2010. Remember past performance is no indication of future results.
            <a class="text-grey-dark hover:text-grey-dark" href="https://www.thesimpledollar.com/where-does-7-come-from-when-it-comes-to-long-term-stock-returns/">Read more here</a></span>
        </div>
      </div>
      <div class="_main lg:flex-grow lg:ml-8">



        <div class="border border-grey-light rounded mb-4 shadow bg-white">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <div class="_body p-4">
            <h3 class="text-black font-medium text-xl text-center mb-4">Your Estimated Return</h3>
            <p class="mb-4 font-semibold font-sans text-2xl sm:text-4xl md:text-6xl lg:text-6xl text-center">¥{{preTaxTotal | currency}}</p>
            <p class="leading-normal text-lg max-w-lg mx-auto text-left">
              This is how much your nest egg is estimated to be worth before tax is deducted after {{years}} years. It assumes you'll invest ¥{{principal}} from the start and supplement it with ¥{{monthlyAddition}} monthly additions in something which grows at an average of {{rate}}% per year.
            </p>
          </div>
        </div>

        <div class="border border-grey-light rounded shadow bg-white mb-4">
          <div class="_header border-t-4 border-blue-dark rounded-t"></div>
          <h3 class="text-black font-medium text-xl text-center my-4">Time Is Your Best Friend</h3>
          <div class="_alert p-4 mb-4 mx-4 bg-blue-lightest text-blue-darker flex flex-col items-center lg:flex-row lg:items-center">
              <i class="fas fa-piggy-bank text-3xl text-blue-darkest opacity-25 mr-4 mb-3"></i>
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

        <div class="flex flex-col lg:flex-row">
          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white lg:w-1/3 mr-2 leading-normal">
            <div class="_header border-t-4 border-blue-dark rounded-t"></div>
            <div class="p-4">
              <h3 class="font-semibold text-2xl mb-2 leading-tight">Ditch the coffee</h3>
              <p>and have ¥{{coffeeSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxGrowthWithCoffee)}}% to ¥{{preTaxTotalWithCoffee | currency}}</p>
            </div>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white lg:w-1/3 mx-2 leading-normal">
            <div class="_header border-t-4 border-blue-dark rounded-t"></div>
            <div class="p-4">
              <h3 class="font-semibold text-2xl mb-2 leading-tight">Skip work lunches</h3>
              <p>and have ¥{{lunchSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxGrowthWithLunch)}}% to ¥{{preTaxTotalWithLunch | currency}}</p>
            </div>
          </div>

          <div class="text-center border border-grey-light rounded mb-4 shadow bg-white lg:w-1/3 ml-2 leading-normal">
            <div class="_header border-t-4 border-blue-dark rounded-t"></div>
            <div class="p-4">
              <h3 class="font-semibold text-2xl mb-2 leading-tight">Skip a night out</h3>
              <p>and have ¥{{nightOutSavingPerMonth | currency}} more per month to invest. Your total investment grows by {{Math.round(preTaxGrowthWithNightOut)}}% to ¥{{preTaxTotalWithNightOut | currency}}</p>
            </div>
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
      currentAge: 21,
      retirementAge: 67,
      rate: 7,
      monthlyAddition: 25000,
      principal: 0,
      profession: "employee",
      idecoAgeMin: 20,
      idecoAgeMax: 60,
      coffeeSavingPerMonth: 8000,
      lunchSavingPerMonth: 16000,
      nightOutSavingPerMonth: 20000,
    }
  },
  mounted () {
  },
  computed: {
    // a computed getter
    data () {
      return {
        labels: _.range(this.currentAge, (this.currentAge + this.years + 1)),
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
    monthlyContributionWithNightOut () {
      return this.monthlyAddition + this.nightOutSavingPerMonth;
    },

    differenceWithCoffee () {
      return this.preTaxTotalWithCoffee - this.preTaxTotal;
    },

    differenceWithLunch () {
      return this.preTaxTotalWithLunch - this.preTaxTotal;
    },

    differenceWithNightOut () {
      return this.preTaxTotalWithNightOut - this.preTaxTotal;
    },

    preTaxGrowthWithCoffee () {
      return (this.preTaxTotalWithCoffee - this.preTaxTotal) / this.preTaxTotal * 100
    },

    preTaxGrowthWithLunch () {
      return (this.preTaxTotalWithLunch - this.preTaxTotal) / this.preTaxTotal * 100
    },

    preTaxGrowthWithNightOut () {
      return (this.preTaxTotalWithNightOut - this.preTaxTotal) / this.preTaxTotal * 100
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

    preTaxTotalWithNightOut () {
      return ciwa(
        this.principal,
        this.monthlyContributionWithNightOut,
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
    },
    idecoProtectedPercent () {
      return this.idecoCalculator.protectedPercentage();
    },
    idecoMonthlyContribution () {
      return this.idecoCalculator.protectedMonthlyContribution();
    },
    idecoExcessContribution () {
      return this.idecoCalculator.excessMonthlyContribution();
    },
    years () {
      return this.retirementAge - this.currentAge;
    }
  },
  methods: {
    calculateYearlyGains () {
      var yearlyGains = [];
      for(var i=0; i <= this.years; i++){
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
