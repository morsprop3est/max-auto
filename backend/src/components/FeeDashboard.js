import React, { useEffect, useState } from 'react'
import { Box, Button, Input, Select, Tooltip, useNotice } from '@adminjs/design-system'

const feeIcons = {
  carFee: '/dashboardIcons/car.png',
  crossoverFee: '/dashboardIcons/crossover.png',
  suvFee: '/dashboardIcons/suv.png',
  motoFee: '/dashboardIcons/moto.png',
  hybridFee: '/dashboardIcons/danger.png',
}

const feeTips = {
  carFee: 'Легковой автомобиль',
  crossoverFee: 'Кроссовер (паркетник)',
  suvFee: 'Внедорожник',
  motoFee: 'Мото',
  hybridFee: `Значение данного поля автоматически добавляется к фрахту  при перевозке гибридных и электрических автомобилей (так называемый 'опасный груз').`,
}

const portFeeFields = [
  { name: 'carFee', label: 'Авто фі', type: 'number' },
  { name: 'crossoverFee', label: 'Кросовер фі', type: 'number' },
  { name: 'suvFee', label: 'Внедорожник фі', type: 'number' },
  { name: 'motoFee', label: 'Мото фі', type: 'number' },
  { name: 'hybridFee', label: 'Гібрид/електро фі', type: 'number' },
]

const AuctionDeliveryFeeFields = [
  { name: 'carFee', label: 'Авто фі', type: 'number' },
  { name: 'suvFee', label: 'Джип фі', type: 'number' },
  { name: 'motoFee', label: 'Мото фі', type: 'number' },
]

const FeeDashboard = () => {
  const [ports, setPorts] = useState([])
  const [auctions, setAuctions] = useState([])
  const [portFees, setPortFees] = useState({})
  const [AuctionDeliveryFees, setAuctionDeliveryFees] = useState({})
  const [auctionLocationPorts, setAuctionLocationPorts] = useState([])
  const [initialPortFees, setInitialPortFees] = useState({})
  const [initialAuctionDeliveryFees, setInitialAuctionDeliveryFees] = useState({})
  const [initialAuctions, setInitialAuctions] = useState([])
  const [errors, setErrors] = useState({})
  const sendNotice = useNotice ? useNotice() : () => {}
  const [selectedAuctionPorts, setSelectedAuctionPorts] = useState({})
  const [initialAuctionPorts, setInitialAuctionPorts] = useState({})
  const [showPorts, setShowPorts] = useState(false)
  const [showCopart, setShowCopart] = useState(false)
  const [showIAAI, setShowIAAI] = useState(false)

  useEffect(() => {
    fetch('/api/locations/auction-port-all')
      .then(r => r.json())
      .then(({ ports, auctions, auctionLocationPorts }) => {
        setPorts(ports)
        setAuctions(auctions)
        setAuctionLocationPorts(auctionLocationPorts)
        setInitialAuctions(auctions)
        const pf = Object.fromEntries(
          ports.map(p => [p.id, p.fee || {}])
        )
        setPortFees(pf)
        setInitialPortFees(JSON.parse(JSON.stringify(pf)))
        const af = Object.fromEntries(
          auctions.map(a => [a.id, a.fee || {}])
        )
        setAuctionDeliveryFees(af)
        setInitialAuctionDeliveryFees(JSON.parse(JSON.stringify(af)))
        const auctionPorts = Object.fromEntries(
          auctions.map(a => [a.id, auctionLocationPorts.find(l => l.auctionLocationId === a.id)?.portId ?? null])
        )
        setSelectedAuctionPorts(auctionPorts)
        setInitialAuctionPorts(JSON.parse(JSON.stringify(auctionPorts)))
      })
  }, [])

  const handlePortFeeChange = (portId, name, value) => {
    setPortFees({
      ...portFees,
      [portId]: { ...portFees[portId], [name]: value === '' ? '' : Number(value) }
    })
  }

  const handleAuctionDeliveryFeeChange = (auctionId, name, value) => {
    setAuctionDeliveryFees({
      ...AuctionDeliveryFees,
      [auctionId]: { ...AuctionDeliveryFees[auctionId], [name]: value === '' ? '' : Number(value) }
    })
  }

  const handleAuctionPortChange = async (auctionId, portId) => {
    await fetch('/api/locations/auction-location-port', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auctionLocationId: auctionId, portId: portId || null }),
    })
    setAuctionLocationPorts(prev => {
      const filtered = prev.filter(link => link.auctionLocationId !== auctionId)
      return portId ? [...filtered, { auctionLocationId: auctionId, portId }] : filtered
    })
  }

  const getPortIdForAuction = (auctionId) => {
    const link = auctionLocationPorts.find(l => l.auctionLocationId === auctionId)
    return link ? link.portId : null
  }

  const handleSaveAll = async () => {
    await Promise.all(
      ports.map(port =>
        fetch(`/api/locations/port-fees/${port.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(portFees[port.id])
        })
      )
    )
    await Promise.all(
      auctions.map(auction =>
        fetch(`/api/locations/auction-fees/${auction.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(AuctionDeliveryFees[auction.id])
        })
      )
    )
    sendNotice({ message: 'Всі зміни збережено', type: 'success' })
    setInitialPortFees(JSON.parse(JSON.stringify(portFees)))
    setInitialAuctionDeliveryFees(JSON.parse(JSON.stringify(AuctionDeliveryFees)))
    setInitialAuctions(JSON.parse(JSON.stringify(auctions)))
    setInitialAuctionPorts(JSON.parse(JSON.stringify(selectedAuctionPorts)))
  }

  const handleResetAll = () => {
    setPortFees(JSON.parse(JSON.stringify(initialPortFees)))
    setAuctionDeliveryFees(JSON.parse(JSON.stringify(initialAuctionDeliveryFees)))
    setAuctions(JSON.parse(JSON.stringify(initialAuctions)))
    setErrors({})
    sendNotice({ message: 'Зміни скинуто', type: 'info' })
    fetch('/api/locations/auction-port-all')
      .then(r => r.json())
      .then(({ auctionLocationPorts }) => setAuctionLocationPorts(auctionLocationPorts))
    setSelectedAuctionPorts(JSON.parse(JSON.stringify(initialAuctionPorts)))
  }

  const copartAuctions = auctions.filter(a => a.auctionType === 'copart')
  const iaaiAuctions = auctions.filter(a => a.auctionType === 'iaai')

  const portTableHeader = React.createElement(
    Box,
    {
      style: {
        display: 'flex',
        alignItems: 'start',
        gap: 8,
        marginLeft: 200,
        maxWidth: 500,
      }
    },
    React.createElement('div', { style: { width: 0 } }),
    ...portFeeFields.map(f =>
      React.createElement(
        Tooltip,
        {
          title: feeTips[f.name],
          key: f.name,
          style: {
          }
        },
        React.createElement('img', {
          src: feeIcons[f.name],
          alt: f.label,
          style: { width: 40, height: 'auto', display: 'block', margin: '0 auto' }
        })
      )
    ),
    React.createElement('div', { style: { width: 80 } })
  )

  const auctionTableHeader = (fields) => React.createElement(
    Box,
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 8,
      }
    },
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          gap: 25,
          alignItems: 'center',
          marginRight: 225,
        }
      },
      ...fields.map(f =>
        React.createElement(
          Tooltip,
          {
            title: feeTips[f.name],
            key: f.name,
          },
          React.createElement('img', {
            src: feeIcons[f.name],
            alt: f.label,
            style: { width: 40, height: 'auto', display: 'block' }
          })
        )
      )
    )
  )

  const ellipsisStyle = {
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  }

  return React.createElement(
    Box,
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        paddingRight: 0,
      }
    },
    React.createElement(
      Box,
      {
        style: {
          flex: 1,
          overflowY: 'auto',
          paddingRight: 16,
        }
      },
      React.createElement(
        'h3',
        {
          style: { cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 8 },
          onClick: () => setShowPorts(v => !v)
        },
        showPorts ? '▼' : '►',
        'Порти'
      ),
      showPorts && portTableHeader,
      showPorts && ports.map(port =>
        React.createElement(
          Box,
          {
            key: port.id,
            mb: 'sm',
            style: {
              background: '#f7f7f7',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
          React.createElement('div', { style: { fontWeight: 600, ...ellipsisStyle } }, port.name),
          ...portFeeFields.map(f =>
            React.createElement(Input, {
              key: f.name,
              type: 'number',
              value: portFees[port.id]?.[f.name] ?? '',
              onChange: e => handlePortFeeChange(port.id, f.name, e.target.value),
              size: 'sm',
              style: { width: 70, textAlign: 'center' }
            })
          )
        )
      ),
      React.createElement(
        'h3',
        {
          style: { marginTop: 24, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 8 },
          onClick: () => setShowCopart(v => !v)
        },
        showCopart ? '▼' : '►',
        'Copart аукціони'
      ),
      showCopart && auctionTableHeader(AuctionDeliveryFeeFields),
      showCopart && copartAuctions.map(auction => {
        const selectedPortId = getPortIdForAuction(auction.id);
        const selectedPortOption = [{ value: null, label: '—' }, ...ports.map(p => ({ value: p.id, label: p.name }))]
          .find(opt => opt.value === selectedPortId) || null;
        return React.createElement(
          Box,
          {
            key: auction.id,
            mb: 'sm',
            style: {
              background: '#f7f7f7',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
          React.createElement('div', { style: { fontWeight: 600, ...ellipsisStyle } }, auction.name),
          React.createElement(
            Box,
            { style: { width: 200 } },
            React.createElement(
              Select,
              {
                value: selectedPortOption,
                options: [{ value: null, label: '—' }, ...ports.map(p => ({ value: p.id, label: p.name }))],
                onChange: selected => handleAuctionPortChange(auction.id, selected?.value),
                size: 'sm',
                style: {
                  width: '100%',
                  minWidth: '100%',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }
              }
            )
          ),
          ...AuctionDeliveryFeeFields.map(f =>
            React.createElement(Input, {
              key: f.name,
              type: 'number',
              value: AuctionDeliveryFees[auction.id]?.[f.name] ?? '',
              onChange: e => handleAuctionDeliveryFeeChange(auction.id, f.name, e.target.value),
              size: 'sm',
              style: { width: 70, textAlign: 'center' }
            })
          )
        )
      }),
      React.createElement(
        'h3',
        {
          style: { marginTop: 24, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 8 },
          onClick: () => setShowIAAI(v => !v)
        },
        showIAAI ? '▼' : '►',
        'IAAI аукціони'
      ),
      showIAAI && auctionTableHeader(AuctionDeliveryFeeFields),
      showIAAI && iaaiAuctions.map(auction => {
        const selectedPortId = getPortIdForAuction(auction.id);
        const selectedPortOption = [{ value: null, label: '—' }, ...ports.map(p => ({ value: p.id, label: p.name }))]
          .find(opt => opt.value === selectedPortId) || null;
        return React.createElement(
          Box,
          {
            key: auction.id,
            mb: 'sm',
            style: {
              background: '#f7f7f7',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
          React.createElement('div', { style: { fontWeight: 600, ...ellipsisStyle } }, auction.name),
          React.createElement(
            Box,
            { style: { width: 200 } },
            React.createElement(
              Select,
              {
                value: selectedPortOption,
                options: [{ value: null, label: '—' }, ...ports.map(p => ({ value: p.id, label: p.name }))],
                onChange: selected => handleAuctionPortChange(auction.id, selected?.value),
                size: 'sm',
                style: {
                  width: '100%',
                  minWidth: '100%',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }
              }
            )
          ),
          ...AuctionDeliveryFeeFields.map(f =>
            React.createElement(Input, {
              key: f.name,
              type: 'number',
              value: AuctionDeliveryFees[auction.id]?.[f.name] ?? '',
              onChange: e => handleAuctionDeliveryFeeChange(auction.id, f.name, e.target.value),
              size: 'sm',
              style: { width: 70, textAlign: 'center' }
            })
          )
        )
      })
    ),
    React.createElement(
      Box,
      {
        style: {
          display: 'flex',  
          gap: 16,
          justifyContent: 'flex-end',
          padding: 16,
          borderTop: '1px solid #eee',
          background: '#fff',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }
      },
      React.createElement(
        Button,
        { variant: 'danger', type: 'button', onClick: handleResetAll },
        'Відмінити'
      ),
      React.createElement(
        Button,
        { variant: 'primary', type: 'button', onClick: handleSaveAll },
        'Зберегти'
      )
    )
  )
}

export default FeeDashboard