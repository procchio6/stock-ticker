import React, { Component } from 'react'

import Ticker from './Ticker'

class TickerList extends Component {

  handleSelect(e) {
    debugger
  }

  render() {
    let { quotes } = this.props

    return (
      <div className='ticker-list'>
        {Object.keys(quotes).sort().map( (ticker) => (
          <Ticker
            key={ticker}
            ticker={ticker}
            quote={quotes[ticker]}
            onSelect={this.props.onSelect}
            onRemove={this.props.onRemove}
            selected={this.props.selected === ticker}
          />
        ))}
      </div>
    )
  }
}

export default TickerList
