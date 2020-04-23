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
          // 由于 127.0.0.1:8000 是所有测试 Demo 的 host
          // 为了防止作用域污染，将安装前注销所有已生效的 Service Worker
          navigator.serviceWorker.getRegistrations()
          .then(regs => {
            for (let reg of regs) {
              reg.unregister()
            }
            navigator.serviceWorker
            .register('cachestorage.js')
            .then(registration => console.log(registration))
            .catch(err => console.log(err));
          })
        }
    });

    // == 添加推送
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    if (!navigator.onLine) {
      new Notification('提示', { 
        body: '您当前已经断网, 访问的是缓存资源'
      });
    }
    window.addEventListener('online', () => {
      new Notification('提示', {
        body: '您已经联网, 请刷新访问最新数据'
      });
    });
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
