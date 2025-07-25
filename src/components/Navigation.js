import React from 'react';
import { Navbar, Nav, Container, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaRobot, FaChartLine, FaUpload, FaStream, FaServer, FaHome } from 'react-icons/fa';

const Navigation = ({ isConnected = false, agentsStatus = {} }) => {
  const getAgentCount = (status) => {
    if (!agentsStatus || !agentsStatus.agents) return 0;
    return Object.values(agentsStatus.agents).filter(agent => agent.status === status).length;
  };

  const activeAgents = getAgentCount('active');
  const totalAgents = Object.keys(agentsStatus.agents || {}).length;

  const renderTooltip = (text) => (
    <Tooltip id="tooltip">{text}</Tooltip>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaRobot className="me-2" />
            LogBERT AI
            <Badge 
              bg={isConnected ? "success" : "danger"} 
              className="ms-2"
            >
              {isConnected ? "Online" : "Offline"}
            </Badge>
            {totalAgents > 0 && (
              <Badge 
                bg={activeAgents === totalAgents ? "success" : activeAgents > 0 ? "warning" : "danger"} 
                className="ms-1"
              >
                {activeAgents}/{totalAgents} Agents
              </Badge>
            )}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <OverlayTrigger placement="bottom" overlay={renderTooltip("RCA Results - View latest root cause analysis results")}> 
              <LinkContainer to="/rca-results"> 
                <Nav.Link> 
                  <FaChartLine className="me-1" /> 
                  RCA Results
                </Nav.Link> 
              </LinkContainer> 
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={renderTooltip("Upload Log File - Drag & drop or browse to upload logs")}> 
              <LinkContainer to="/upload"> 
                <Nav.Link> 
                  <FaUpload className="me-1" /> 
                  Upload Log File
                </Nav.Link> 
              </LinkContainer> 
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={renderTooltip("System Health - Monitor system status")}>
              <LinkContainer to="/health">
                <Nav.Link>
                  <FaServer className="me-1" />
                  System Health
                </Nav.Link>
              </LinkContainer>
            </OverlayTrigger>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
