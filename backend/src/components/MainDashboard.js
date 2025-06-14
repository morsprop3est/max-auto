import React from 'react'
import { Box } from '@adminjs/design-system'
import CalculatorDashboard from './CalculatorDashboard'
import FeeDashboard from './FeeDashboard'

const MainDashboard = () => {
  return React.createElement(
    Box,
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '90vh',
        gap: 24,
      }
    },
    React.createElement(
      Box,
      { style: { flex: 1, minWidth: 0, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 } },
      React.createElement(CalculatorDashboard, { asPanel: true })
    ),
    React.createElement(
      Box,
      { style: { flex: 1, minWidth: 0, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 } },
      React.createElement(FeeDashboard, { asPanel: true })
    )
  )
}

export default MainDashboard