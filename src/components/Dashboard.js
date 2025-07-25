import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { FaRobot, FaChartLine, FaExclamationTriangle, FaServer, FaClock } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '../services/apiService';
import UploadLogFile from './UploadLogFile';
import RCALatestCard from './RCALatestCard';

const Dashboard = ({ apiHealth, isConnected }) => {
  const [systemStats, setSystemStats] = useState({
    totalAnalyzed: 0,
    anomaliesDetected: 0,
    rcaPerformed: 0,
    uptime: '0:00:00',
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use correct backend endpoints
        const statsRes = await apiService.get('/metrics/summary');
        const activityRes = await apiService.get('/activity/recent');
        // Map backend fields to frontend state
        const stats = statsRes.data || {};
        setSystemStats({
          totalAnalyzed: stats.totalAnalyses || 0,
          anomaliesDetected: stats.totalAnomalies || 0,
          rcaPerformed: stats.totalRootCauses || 0,
          uptime: stats.timestamp || '',
        });
        // Map activity to expected format for UI
        setRecentActivity((activityRes.data || []).map(item => ({
          action: item.description || item.type,
          time: item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : '',
          status: 'completed',
          duration: '',
        })));
        // No performance endpoint; optionally use stats/systemHealth as a placeholder
        setPerformanceData([]);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
    // Optionally, poll every 30s
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, icon, color = "primary", subtitle }) => (
    <Card className="card-hover h-100">
      <Card.Body className="text-center">
        <div className={`text-${color} mb-3`} style={{ fontSize: '2rem' }}>
          {icon}
        </div>
        <h3 className="mb-1">{value}</h3>
        <h6 className="text-muted">{title}</h6>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </Card.Body>
    </Card>
  );

  return (
    <div>
      {loading ? (
        <Alert variant="info" className="mb-4">Loading dashboard data...</Alert>
      ) : error ? (
        <Alert variant="danger" className="mb-4">{error}</Alert>
      ) : (
        <>
          {/* Status Alert */}
          {isConnected ? (
            <Alert variant="success" className="mb-4">
              <div className="d-flex align-items-center">
                <div className="status-indicator status-online"></div>
                <strong>System Operational</strong> - All AI agents are running normally
              </div>
            </Alert>
          ) : (
            <Alert variant="danger" className="mb-4">
              <div className="d-flex align-items-center">
                <div className="status-indicator status-offline"></div>
                <strong>System Offline</strong> - Unable to connect to the API backend
              </div>
            </Alert>
          )}

          {/* Main Metrics */}
          <Row className="mb-4">
            <Col md={3}>
              <MetricCard
                title="Logs Analyzed"
                value={systemStats.totalAnalyzed?.toLocaleString?.() || 0}
                icon={<FaChartLine />}
                color="success"
                subtitle="Total processed"
              />
            </Col>
            <Col md={3}>
              <MetricCard
                title="Anomalies Detected"
                value={systemStats.anomaliesDetected?.toLocaleString?.() || 0}
                icon={<FaExclamationTriangle />}
                color="warning"
                subtitle="Potential issues found"
              />
            </Col>
            <Col md={3}>
              <MetricCard
                title="RCA Performed"
                value={systemStats.rcaPerformed?.toLocaleString?.() || 0}
                icon={<FaRobot />}
                color="info"
                subtitle="Root cause analyses"
              />
            </Col>
            <Col md={3}>
              <MetricCard
                title="System Uptime"
                value={apiHealth?.uptime || systemStats.uptime || "N/A"}
                icon={<FaClock />}
                color="primary"
                subtitle="Current session"
              />
            </Col>
          </Row>

          {/* Charts and Activity */}
          <Row className="mb-4">
            <Col lg={8}>
              <Card className="h-100">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaChartLine className="me-2" />
                    System Performance
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="responses" 
                        stroke="#28a745" 
                        strokeWidth={2}
                        name="Successful Responses"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="errors" 
                        stroke="#dc3545" 
                        strokeWidth={2}
                        name="Errors"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="h-100">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaClock className="me-2" />
                    Recent Activity
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {recentActivity.length === 0 ? (
                      <div className="text-muted">No recent activity.</div>
                    ) : (
                      recentActivity.map((activity, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                          <div>
                            <div className="fw-semibold">{activity.action}</div>
                            <small className="text-muted">{activity.time}</small>
                          </div>
                          <div className="text-end">
                            <Badge bg={activity.status === 'completed' ? 'success' : 'warning'}>
                              {activity.status}
                            </Badge>
                            <div>
                              <small className="text-muted">{activity.duration}</small>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Log File Upload & RCA Table */}
          <Row className="mb-4">
            <Col md={6}>
              <UploadLogFile />
            </Col>
            <Col md={6}>
              <RCALatestCard />
            </Col>
          </Row>

          {/* API Health Details */}
          {apiHealth && (
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">
                      <FaServer className="me-2" />
                      API Health Status
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <h6>System Information</h6>
                        <ul className="list-unstyled">
                          <li><strong>Version:</strong> {apiHealth.version || 'N/A'}</li>
                          <li><strong>Status:</strong> <Badge bg="success">{apiHealth.status || 'Unknown'}</Badge></li>
                          <li><strong>Database:</strong> <Badge bg={apiHealth.database ? 'success' : 'warning'}>
                            {apiHealth.database ? 'Connected' : 'Not Available'}
                          </Badge></li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <h6>API Status</h6>
                        <ul className="list-unstyled">
                          <li>
                            <FaRobot className="me-2" />
                            <strong>LogBERT Model:</strong> 
                            <Badge bg="success" className="ms-2">Active</Badge>
                          </li>
                          <li>
                            <FaExclamationTriangle className="me-2" />
                            <strong>Anomaly Detector:</strong> 
                            <Badge bg="success" className="ms-2">Active</Badge>
                          </li>
                          <li>
                            <FaChartLine className="me-2" />
                            <strong>RCA Agent:</strong> 
                            <Badge bg="success" className="ms-2">Active</Badge>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
