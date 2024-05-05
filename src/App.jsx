import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { faker, fakerDE_CH, fakerEN_US, fakerPL } from '@faker-js/faker';
import { CSVLink } from "react-csv"; // later
import './custom.css'
import Line from './components/line';
import { randomError} from './scripts';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('pl');
  const [selectedRange, setSelectedRange] = useState(0);
  const [seed, setSeed] = useState(faker.seed());
  const [fakeUsers, setFakeUsers] = useState([]);
  
  let selectedPack; 
  switch(selectedCountry){
    case 'ge':
      selectedPack = fakerDE_CH
      break;
    case 'usa':
      selectedPack = fakerEN_US;
      break;
    default: 
        selectedPack = fakerPL;
  }
  
  useEffect(() => {
        selectedPack.seed(seed);
        setFakeUsers(massFake(selectedPack, 20));
  },[seed, selectedCountry, selectedRange]);

  const countryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry );
  };

  const rangeChange = (event) => {
    setSelectedRange(parseFloat(event.target.value));
  };

  const handleInputChange = (event) => {
    setSelectedRange(parseFloat(event.target.value));
  };

  const handleBlur = () => {
    let newValue = selectedRange < 0 ? 0 : selectedRange > 1000 ? 1000 : selectedRange;
    setSelectedRange(newValue);
  };

  function createFake(location) {
    let locationPack;
    !location  ? locationPack = fakerPL : locationPack = location;
    let user = {
        id: locationPack.database.mongodbObjectId(),
        name: randomError(locationPack.person.fullName(), selectedRange),
        address: randomError(locationPack.location.streetAddress(),selectedRange),
        phone: randomError(locationPack.phone.number(),selectedRange),
    }
    return user
  }

  function massFake(location, count) {
    return Array.from({ length: count }, () => createFake(location));
  }


  useEffect(() => {
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            loadMoreRows();
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, [fakeUsers]);
    const loadMoreRows = () => {
        const newFakeUsers = massFake(selectedPack, 20);
        setFakeUsers(prevUsers => [...prevUsers, ...newFakeUsers]);
    };
  
  return (
    <>
    <Container fluid className='basic_container mt-0'>
    <Form>
      <Row className='country_selector_row'>
            <Col md={3} className='top_column'>
              <Form.Select onChange={countryChange} value={selectedCountry}>
              <option value="pl">Poland</option>
              <option value="ge">Germany</option>
              <option value="usa">USA</option>
              </Form.Select>
              <Form.Group controlId="formGridEmail">
                <Form.Control className='my-3' type="number" placeholder="Enter seed" min={0} value={seed} onChange={(e) => setSeed(Number(e.target.value))}/>
              </Form.Group>
              <Button variant="primary" onClick={()=>setSeed(faker.seed())}>
                Random generation
              </Button>
            </Col>
      </Row>
      <Row>
            
      </Row>
      
      <Row className='country_selector_row'>
        <Form.Label>Change misstakes </Form.Label>
        <Col md={3}>
          <Form.Range min={0} max={10} step={0.5} onChange={rangeChange} value={selectedRange} />
        </Col>
        <Col md={1}>
          <Form.Control placeholder="0" type='number' min={0} max={1000} step={0.5} value={selectedRange} onBlur={handleBlur} onChange={handleInputChange} />
        </Col>
      </Row>

      <Table className = 'user_table' bordered hover>
          <thead className='table-secondary '>
            <tr>
              <th>№</th>
              <th>Id</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
           {fakeUsers.map((el, i) => <Line key = {el.id} name={el.name} id= {el.id} number={1 + i} address={el.address} phone={el.phone}/>)}
          </tbody>
        </Table>
      </Form>
    </Container>
    </>
  )
}

export default App
