import React, { Component } from 'react'

class Search extends Component {
  state = {
    ticker: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.onSearch(this.state.ticker)
    this.setState({ticker: ''})
  }

  render() {
    return (
      <form className='input-group search-bar' onSubmit={this.handleFormSubmit}>
        <input
          type='text'
          name='ticker'
          className='form-control'
          value={this.state.ticker}
          onChange={this.handleChange}
          placeholder='Enter ticker symbol...'
        />
        <span className="input-group-btn">
          <button type='submit' className='btn btn-default'>
            Add
          </button>
        </span>
      </form>
    )
  }
}

export default Search
