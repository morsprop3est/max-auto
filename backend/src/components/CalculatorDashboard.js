import React, { useEffect, useState } from 'react'
import { Box, Button, Label, Input, Select, CheckBox, MessageBox } from '@adminjs/design-system'
import { ApiClient, useNotice } from 'adminjs'

const fields = [
  { name: 'name', label: 'Назва конфігурації калькулятора', type: 'string' },
  { name: 'mode', label: 'Режим розрахунку', type: 'select', options: [
    { value: 'full', label: 'Повний' },
    { value: 'delivery', label: 'Тільки доставка' }
  ]},
  { name: 'copartFeeTier', label: 'Тип тарифів Copart', type: 'select', options: [
    { value: 'high', label: 'Високий' },
    { value: 'low', label: 'Низький' }
  ]},
  { name: 'iaaiFeeTier', label: 'Тип тарифів IAAI', type: 'select', options: [
    { value: 'high', label: 'Високий' },
    { value: 'low', label: 'Низький' }
  ]},
  { name: 'addCopartFees', label: 'Додаткові фіксовані збори для Copart', type: 'number' },
  { name: 'addIaaiFees', label: 'Додаткові фіксовані збори для IAAI', type: 'number' },
  { name: 'inlandMarkupType', label: 'Тип націнки на доставку всередині США', type: 'select', options: [
    { value: 'fixed', label: 'Фіксована' },
    { value: 'percent', label: 'Відсоткова' }
  ]},
  { name: 'inlandMarkupValue', label: 'Значення націнки на внутрішню доставку', type: 'number' },
  { name: 'serviceFee', label: 'Плата за послуги компанії', type: 'number' },
  { name: 'buttonFee', label: 'Плата за "кнопку"', type: 'number' },
  { name: 'addOneYear', label: 'Додавати +1 рік до віку авто', type: 'boolean' },
  { name: 'insurancePercent', label: 'Відсоток страховки', type: 'number' },
  { name: 'certificationFee', label: 'Вартість сертифікації авто', type: 'number' },
  { name: 'expeditionFee', label: 'Вартість експедиції', type: 'number' },
  { name: 'brokerFee', label: 'Плата брокеру за послуги', type: 'number' },
  { name: 'electricPortExtra', label: 'Додаткова плата для електрокарів у порту', type: 'number' },
  { name: 'extraFees', label: 'Інші додаткові збори', type: 'number' },
  { name: 'deliveryFromPortCar', label: 'Вартість доставки з порту (авто)', type: 'number' },
  { name: 'deliveryFromPortMoto', label: 'Вартість доставки з порту (мото)', type: 'number' },
  { name: 'deliveryFromPortElectric', label: 'Вартість доставки з порту (електро)', type: 'number' },
  { name: 'countSwiftFee', label: 'Враховувати комісію SWIFT', type: 'boolean' },
  { name: 'swiftFixed', label: 'Фіксована частина комісії SWIFT', type: 'number' },
  { name: 'swiftPercent', label: 'Відсоткова частина комісії SWIFT', type: 'number' },
  { name: 'extraFreightElectric', label: 'Додатковий фрахт для електрокарів', type: 'number' },
  { name: 'useBuyNow', label: 'Використовувати Buy Now', type: 'boolean' },
  { name: 'showUSPayments', label: 'Виводити оплату в США', type: 'boolean' },
  { name: 'customsOutput', label: 'Формат виводу митного розрахунку', type: 'select', options: [
    { value: 'short', label: 'Короткий' },
    { value: 'detailed', label: 'Детальний' }
  ]},
  { name: 'inlandCopyFromId', label: 'ID іншого налаштування для inland-доставки', type: 'number', allowNull: true }
]

const api = new ApiClient()

const CalculatorDashboard = () => {
  const [calculator, setCalculator] = useState(null)
  const [initialCalculator, setInitialCalculator] = useState(null)
  const [errors, setErrors] = useState({})
  const sendNotice = useNotice()

  useEffect(() => {
    fetch('/api/calculator')
      .then(res => res.json())
      .then(data => {
        setCalculator(data)
        setInitialCalculator(data)
      })
  }, [])

  const validate = (data) => {
    const errs = {}
    fields.forEach(f => {
      if (f.type === 'number' && data[f.name] !== null && data[f.name] !== undefined && data[f.name] !== '') {
        if (isNaN(Number(data[f.name]))) errs[f.name] = 'Має бути числом'
      }
      if (f.type === 'select' && f.options && !f.options.find(opt => opt.value === data[f.name])) {
        errs[f.name] = 'Оберіть значення зі списку'
      }
      if (f.type === 'boolean' && typeof data[f.name] !== 'boolean') {
        errs[f.name] = 'Оберіть Так/Ні'
      }
    })
    return errs
  }

  const handleChange = (name, value, type) => {
    let val = value
    if (type === 'number') val = value === '' ? '' : Number(value)
    if (type === 'boolean') val = value
    setCalculator({ ...calculator, [name]: val })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const errs = validate(calculator)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    await fetch('/api/calculator', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calculator, null, 2)
    })
    setInitialCalculator(calculator)
    sendNotice({ message: 'Дані збережено', type: 'success' })
  }

  const handleReset = () => {
    setCalculator(initialCalculator)
    setErrors({})
    sendNotice({ message: 'Скинуто зміни', type: 'info' })
  }

  if (!calculator) return React.createElement(Box, null, 'Завантаження...')

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
      'form',
      {
        onSubmit: handleSave,
        style: {
          flex: 1,
          overflowY: 'auto',
          paddingRight: 16,
          marginBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }
      },
      ...fields.map(f =>
        React.createElement(
          Box,
          { key: f.name },
          React.createElement(Label, null, f.label),
          f.type === 'select'
            ? React.createElement(Select, {
                value: f.options.find(opt => opt.value === calculator[f.name]) || null,
                options: f.options,
                onChange: selected => handleChange(f.name, selected?.value, f.type)
              })
            : f.type === 'boolean'
              ? React.createElement(CheckBox, {
                  checked: !!calculator[f.name],
                  onChange: e => handleChange(f.name, e.target.checked, f.type),
                  label: calculator[f.name] ? 'Так' : 'Ні'
                })
              : f.type === 'string'
                ? React.createElement(Input, {
                    type: 'text',
                    value: calculator[f.name] ?? '',
                    onChange: e => handleChange(f.name, e.target.value, f.type)
                  })
                : React.createElement(Input, {
                    type: 'number',
                    value: calculator[f.name] ?? '',
                    onChange: e => handleChange(f.name, e.target.value, f.type),
                    disabled: f.allowNull && calculator[f.name] === null
                  }),
          errors[f.name] && React.createElement(MessageBox, { variant: 'danger', mt: 'xs' }, errors[f.name])
        )
      )
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
        { variant: 'danger', type: 'button', onClick: handleReset },
        'Скинути'
      ),
      React.createElement(
        Button,
        { variant: 'primary', type: 'submit', onClick: handleSave },
        'Зберегти'
      )
    )
  )
}

export default CalculatorDashboard