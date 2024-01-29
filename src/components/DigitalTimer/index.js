// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeInMin: 25,
    timeInSec: 1500,
    isTimerRunning: false,
    isTimerComplted: true,
    isTimerStarted: false,
  }

  onStartOrPause = () => {
    const {isTimerRunning, timeInMin} = this.state
    if (timeInMin < 1) {
      return
    }
    if (!isTimerRunning) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }

    this.setState({isTimerRunning: !isTimerRunning, isTimerStarted: true})
  }

  decrementTimerValue = () => {
    const {isTimerComplted, isTimerStarted, timeInMin} = this.state

    if (!isTimerComplted || isTimerStarted) {
      return
    }
    if (timeInMin !== 0) {
      this.setState(prevState => ({
        timeInMin: prevState.timeInMin - 1,
        timeInSec: (prevState.timeInMin - 1) * 60, // Corrected
      }))
    }
  }

  incrementTimerValue = () => {
    const {isTimerComplted, isTimerStarted, timeInMin} = this.state
    if (!isTimerComplted || isTimerStarted) {
      return
    }
    if (timeInMin !== 60) {
      this.setState(prevState => ({
        timeInMin: prevState.timeInMin + 1,
        timeInSec: (prevState.timeInMin + 1) * 60, // Corrected
      }))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      timeInMin: 25,
      timeInSec: 1500,
      isTimerComplted: true,
      isTimerStarted: false,
    })
  }

  tick = () => {
    const {timeInSec} = this.state
    if (timeInSec === 0) {
      this.onReset()
      clearInterval(this.timerId)
      return
    }
    this.setState(prevState => ({
      timeInSec: prevState.timeInSec - 1,
    }))
  }

  secondsToTimeFormat = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timeInMin,
      timeInSec,
      isTimerComplted,
      isTimerStarted,
    } = this.state
    console.log(
      isTimerRunning,
      timeInMin,
      timeInSec,
      isTimerComplted,
      isTimerStarted,
    )
    const timeFormat = this.secondsToTimeFormat(timeInSec)
    console.log(timeFormat)
    const btnLogoUrl = !isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const alttext = !isTimerRunning ? 'play icon' : 'pause icon'

    const status = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="digitalTimerBackground">
        <h1 className="timerHeading">Digital Timer</h1>
        <div className="TimerSetupContainer">
          <div className="timerContainer">
            <div className="timerCircle">
              <h1 className="clockStyle">{timeFormat}</h1>
              <p className="timerStatus">{status}</p>
            </div>
          </div>
          <div className="timerControlsContainer">
            <div className="play-pauseContainer">
              <button
                className="play-pauseBtn"
                type="button"
                onClick={this.onStartOrPause}
              >
                <img
                  className="play-pauseLogo"
                  src={btnLogoUrl}
                  alt={alttext}
                />
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button className="play-pauseBtn" type="button">
                <img
                  className="play-pauseLogo"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  onClick={this.onReset}
                />
                Reset
              </button>
            </div>
            <p className="setTimerStyle">Set Timer Limit</p>
            <div className="timerLimitControlContainer">
              <button
                className="increment-decrementBtn"
                type="button"
                onClick={this.decrementTimerValue}
              >
                -
              </button>
              <p className="TimerLimitValue">{timeInMin}</p>
              <button
                className="increment-decrementBtn"
                type="button"
                onClick={this.incrementTimerValue}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
