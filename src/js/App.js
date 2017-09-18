import React from 'react';

import Graph from './components/Graph';
import Search from './components/Search';
import TickerList from './components/TickerList';
import IntrinioAdapter from './adapters/intrinio_adapter'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: {},
      selected: '',
      priceData: {}
    }
  }

  componentDidMount() {
    this.ir = new IntrinioRealtime({
      public_key: "7205d5d9f7a446fc7aa144024a54156e",
      provider: "iex"
    })

    this.ir.onQuote( (quote) => {
      this.handleQuote(quote)
    })

    this.ir.onError( (error) => console.log(error) )

    this.ir.join("AAPL","GE","MSFT")
  }

  componentWillUnount() {
    this.ir.destroy()
  }

  handleQuote(quote) {
    // console.log(quote);
    this.setState({
      quotes: {
        ...this.state.quotes,
        [quote.ticker]: {
          ...this.state.quotes[quote.ticker],
          [quote.type]: quote
        }
      }
    })
  }

  handleSearch(ticker) {
    this.ir.join(ticker.toUpperCase())
  }

  handleSelect = (e) => {
    let ticker = e.currentTarget.id
    this.setState({selected: ticker})
    this.getPriceData(ticker)
  }

  getPriceData = (ticker) => {
    IntrinioAdapter.getPriceData(ticker).then( (resp) => {
      this.setState({
        priceData: {
          ...this.state.priceData,
          [ticker]: resp.data
        }
      })
    })
  }

  render() {
    let { quotes } = this.state

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-sm-4 col-md-3'>
            <Search onSearch={this.handleSearch.bind(this)} />
            <TickerList quotes={this.state.quotes} onSelect={this.handleSelect} selected={this.state.selected}/>
          </div>
          <div className='col-xs-12 col-sm-8 col-md-9'>
            <h1 style={{textAlign: 'center'}}>
              {this.state.selected}
            </h1>
            <Graph data={this.state.priceData[this.state.selected]} selected={this.state.selected}/>
          </div>
        </div>
      </div>
    )
  }
}
