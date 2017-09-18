import React, { Component } from 'react'

class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      change: ''
    }
  }

  componentDidMount() {
    let ticker = document.getElementById(this.props.ticker)
    ticker.addEventListener('webkitAnimationEnd',
      function (e) {
        this.setState({change: ''})
      }.bind(this),
      false
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.quote.hasOwnProperty('last') && nextProps.quote.hasOwnProperty('last')) {
      if (nextProps.quote.last.price > this.props.quote.last.price) {
        this.setState({change: 'ascending'})
      } else if (nextProps.quote.last.price < this.props.quote.last.price) {
        this.setState({change: 'descending'})
      }
    }
  }

  render() {
    let selected = this.props.selected ? 'selected' : ''

    return (
      <div id={this.props.ticker} className={`ticker ${this.state.change} ${selected}`} onClick={this.props.onSelect}>
        <div>
          <strong>{this.props.ticker}</strong>
        </div>
        {
          this.props.quote.hasOwnProperty('last') &&
          this.props.quote.last.price.toFixed(2)
        }
      </div>
    )
  }
}

export default Ticker
