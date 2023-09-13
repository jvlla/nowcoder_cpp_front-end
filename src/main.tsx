import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.compact.css'
import zhCN from 'antd/lib/locale/zh_CN'
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>
);