import React, { useState } from 'react';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { uploadLogFile } from '../api/upload';

const UploadLogFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFeedback(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const result = await uploadLogFile(selectedFile);
    setFeedback(result);
    setUploading(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Upload Log File</Card.Title>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select .log or .txt file</Form.Label>
            <Form.Control type="file" accept=".log,.txt" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleUpload} disabled={!selectedFile || uploading}>
            {uploading ? <Spinner animation="border" size="sm" /> : 'Upload'}
          </Button>
        </Form>
        {feedback && (
          <Alert variant={feedback.success ? 'success' : 'danger'} className="mt-3">
            {feedback.message}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default UploadLogFile;
