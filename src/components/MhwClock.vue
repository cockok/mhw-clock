<template>
  <div class="row">
    <div class="card col-6 col-md-3" :class="scene == 'morning' ? 'bg-info' : ''">
      <img class="card-img-top" src="morning_eve.jpeg" alt="morning">
      <div class="card-body" :class="scene == 'morning' ? 'text-white' : ''">
        <h5 class="card-title">朝</h5>
        <p class="card-text" :class="scene == 'night' ? 'text-danger' : ''">{{ morning | countDown }}</p>
      </div>
    </div>
    <div class="card col-6 col-md-3" :class="scene == 'daytime' ? 'bg-info' : ''">
      <img class="card-img-top" src="daytime.jpeg" alt="daytime">
      <div class="card-body" :class="scene == 'daytime' ? 'text-white' : ''">
        <h5 class="card-title">昼</h5>
        <p class="card-text" :class="scene == 'morning' ? 'text-danger' : ''">{{ daytime | countDown }}  </p>
      </div>
    </div>
    <div class="card col-6 col-md-3" :class="scene == 'evening' ? 'bg-info' : ''">
      <img class="card-img-top" src="morning_eve.jpeg" alt="evening">
      <div class="card-body" :class="scene == 'evening' ? 'text-white' : ''">
        <h5 class="card-title">夕</h5>
        <p class="card-text" :class="scene == 'daytime' ? 'text-danger' : ''">{{ evening | countDown }}</p>
      </div>
    </div>
    <div class="card col-6 col-md-3" :class="scene == 'night' ? 'bg-info' : ''">
      <img class="card-img-top" src="night.jpeg" alt="night">
      <div class="card-body" :class="scene == 'night' ? 'text-white' : ''">
        <h5 class="card-title">夜</h5>
        <p class="card-text" :class="scene == 'evening' ? 'text-danger' : ''">{{ night | countDown }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const morningSec = 250
const daytimeSec = 1500
const eveningSec = 250
const nightSec = 1000
const referenceUnixtime = 1569515905 // 2019-09-26 18:38:25Z
import moment from 'moment'
import 'moment-duration-format'
export default {
  data () {
    return {
      now: new Date(),
      mhwTime: this.calcMhwTime(this.now),
      intervalId: undefined
    }
  },
  filters: {
    countDown (sec) {
      return moment.duration(Math.abs(sec * 1000)).format('mm:ss', { trim: false })
    }
  },
  methods: {
    setTime () {
      this.intervalId = setInterval(() => {
        this.now = new Date()
        this.mhwTime = this.calcMhwTime(this.now)
      }, 1000)
    },
    calcMhwTime (datetime) {
      return (moment(datetime).unix() - referenceUnixtime) % (morningSec + daytimeSec + eveningSec + nightSec)
    }
  },
  created () {
    this.setTime()
  },
  computed: {
    morning () {
      return (this.mhwTime < morningSec) ? this.mhwTime : morningSec + daytimeSec + eveningSec + nightSec - this.mhwTime
    },
    daytime () {
      return (this.mhwTime < morningSec + daytimeSec) ? morningSec - this.mhwTime : this.morning + morningSec
    },
    evening () {
      return (this.mhwTime < morningSec + daytimeSec + eveningSec) ? morningSec + daytimeSec - this.mhwTime : this.daytime + daytimeSec
    },
    night () {
      return morningSec + daytimeSec + eveningSec - this.mhwTime
    },
    scene () {
      if (this.mhwTime - morningSec < 0) {
        return 'morning'
      } else if (this.mhwTime - morningSec - daytimeSec < 0) {
        return 'daytime'
      } else if (this.mhwTime - morningSec - daytimeSec - eveningSec < 0) {
        return 'evening'
      } else {
        return 'night'
      }
    }
  }
}
</script>