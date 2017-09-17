import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: {}
    }
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    this.ir = new IntrinioRealtime({
      public_key: "7205d5d9f7a446fc7aa144024a54156e",
      provider: "iex"
    })

    this.ir.onQuote(function(quote) {
      this.handleQuote(quote)
    }.bind(this))

    this.ir.join("AAPL","GE","MSFT")

    this.setState({
      quotes: {
        "AAPL": {},
        "GE": {},
        "MSFT": {}
      }
    })
  }

  handleQuote(quote) {
    console.log(quote);
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

  render() {
    let quotes = this.state.quotes
    return (
      <div>
        {
          Object.keys(quotes).map( (ticker) => {
            if (quotes[ticker].hasOwnProperty('last')) {
              return <div key={ticker}>{quotes[ticker].last.price}</div>
            }
          })
        }
      </div>
    )
  }
}
