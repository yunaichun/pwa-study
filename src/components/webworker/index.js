import React from 'react';
import PropTypes from 'prop-types';

class Index extends React.Component {
  static defaultProps = {
    testProps: {}
  }

  constructor (props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    let worker = new Worker('webworker.js');
    worker.addEventListener('message', e => {
      this.setState({ total: e.data.total })
    });
  }

  testMethods() {}

  render () {
    const { testProps } = this.props;
    const { total } = this.state;
    return (
      <div>
        1-100万累加的和为: {total}
      </div>
    );
  }
}

Index.propTypes = {
  testProps: PropTypes.object
};

export default Index;
