import React, { useEffect, useState } from 'react';
import { Card, Table, Form, Row, Col, Badge } from 'react-bootstrap';
import { fetchLatestRCA } from '../api/rca';

const highlightText = (text, highlight) => {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? <span key={i} className="bg-warning px-1">{part}</span> : part
  );
};

const RCALatestCard = () => {
  const [results, setResults] = useState([]);
  const [appIdFilter, setAppIdFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchLatestRCA().then(setResults).catch(() => setResults([]));
  }, []);

  const filteredResults = results.filter(r =>
    (!appIdFilter || r.app_id?.toLowerCase().includes(appIdFilter.toLowerCase())) &&
    (!dateFilter || (r.date?.startsWith(dateFilter) || r.logdate?.startsWith(dateFilter)))
  );

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Latest RCA Results</Card.Title>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Filter by App ID"
              value={appIdFilter}
              onChange={e => setAppIdFilter(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
            />
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Exploration</th>
              <th>Explanation</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length === 0 ? (
              <tr><td colSpan={3} className="text-center">No results found</td></tr>
            ) : (
              filteredResults.map((r, idx) => (
                <tr key={idx}>
                  <td>
                    <div><strong>Filename:</strong> {r.filename}</div>
                    <div><strong>App ID:</strong> {highlightText(r.app_id, appIdFilter)}</div>
                    <div><strong>Date:</strong> {r.date || r.logdate}</div>
                  </td>
                  <td>{r.explanation}</td>
                  <td>{Array.isArray(r.events)
                    ? r.events.map((e, i) => <Badge key={i} bg="info" className="me-1">{e.message || e}</Badge>)
                    : r.events}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default RCALatestCard;
