<Form>
      <Row className='country_selector_row'>
            <Col md={3} className='top_column'>
              <Form.Select value={region}>
                <option value="pl">Poland</option>
                <option value="ge">Germany</option>
                <option value="usa">USA</option>
              </Form.Select>
            </Col>
            <Col md={3} className='top_column'>
              <Form.Group controlId="formGridEmail">
                <Form.Control/>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button variant="primary">
                Random
              </Button>
            </Col>
      </Row>

      <Row>
            <Col md={3}>
                <Form.Range min={0}  step={0.25} />
            </Col>
            <Col md={1}>
              <Form.Control  placeholder="0" type='number' min={0} max={1000} step={0.25}/>
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
           
          </tbody>
        </Table>
      </Form>