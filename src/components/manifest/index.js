import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Index extends React.Component {
  static defaultProps = {
    testProps: {}
  }

  constructor (props) {
    super(props);
    this.state = {
      testState: {}
    };
  }

  componentDidMount() {}

  testMethods() {}

  render () {
    const { testProps } = this.props;
    const { testState } = this.state;
    return (
      <div>
        111
      </div>
    );
  }
}

Index.propTypes = {
  testProps: PropTypes.object
};

export default Index;
