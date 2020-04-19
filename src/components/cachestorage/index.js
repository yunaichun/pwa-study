import React from 'react';
import PropTypes from 'prop-types';
import './index.less'

class Index extends React.Component {
  static defaultProps = {
    testProps: {}
  }

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
            .register('cachestorage.js')
            .then(registration => console.log(registration))
            .catch(err => console.log(err));
        }
    })
  }

  testMethods() {}

  render () {
    const { testProps } = this.props;
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
