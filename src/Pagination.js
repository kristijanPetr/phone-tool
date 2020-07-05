import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur: 1,
      total: props.totalPages
    };
  }

  render() {
    let { cur, total } = this.state;
    console.log(cur, total);
    return (
      <div>
        <button
          onClick={() => {
            if (cur === 1) return;
            this.setState({ cur: cur - 1 }, () =>
              this.props.onPageChange(this.state.cur)
            );
          }}
        >
          Prev
        </button>
        <button>1</button>
        {cur <= 2 ? null : <span>...</span>}
        {cur === 1 || cur === total ? null : <button>{cur}</button>}
        {cur >= 99 ? null : <span>...</span>}
        <button>{total}</button>
        <button
          onClick={() => {
            if (cur === total) return;
            cur++;
            console.log(cur);
            this.setState({ cur }, () =>
              this.props.onPageChange(this.state.cur)
            );
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Pagination;
