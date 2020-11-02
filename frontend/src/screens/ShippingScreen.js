import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const data = useSelector(state => state.cart)

  const shippingAddress = data.shippingAddress

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setAddress(shippingAddress.address ? shippingAddress.address : '')
    setCity(shippingAddress.city ? shippingAddress.city : '')
    setPostalCode(shippingAddress.postalCode ? shippingAddress.postalCode : '')
    setCountry(shippingAddress.country ? shippingAddress.country : '')
  }, [dispatch, shippingAddress])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return <FormContainer>
    <h1>Shipping</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter Address'
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter City'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='postalcode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Postal Code'
          value={postalCode}
          required
          onChange={(e) => setPostalCode(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)} />
      </Form.Group>
      <Button type='submit' variant='primary'>
        Countinue
      </Button>
    </Form>
  </FormContainer>
}

export default ShippingScreen
