import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Breadcrumb, OverlayTrigger, Tooltip, Badge, Button } from 'react-bootstrap'
import { FaQuestion, FaChevronLeft } from 'react-icons/fa'

const Header = ({ goBack, goBackLink, tooltip, breadcrumbs, activeBreadcrumb }) => {
  return (
    <Row>
      <Col className="d-flex align-items-center">
        {
          goBack ?
          <Button as={Link} variant="outline-light" to={goBackLink} className="border-0 text-secondary text-decoration-none h-100 d-block p-2 d-flex align-items-center">
            <FaChevronLeft size={22} /><span className="ms-2 fi-text text-middle">{ goBack }</span>
          </Button>
          : null
        }
      </Col>

      <Col xs="auto">
        <Breadcrumb bsPrefix="breadcrumb header-text bg-transparent mb-0">
          {
            breadcrumbs ?
            breadcrumbs.map((breadcrumb, idx) => (
              <Breadcrumb.Item key={idx} linkAs={Link} linkProps={{ to: breadcrumb.to, className: "text-secondary text-underline" }}>
                { breadcrumb.title }
              </Breadcrumb.Item>
            ))
            : null
          }

          <Breadcrumb.Item active className="text-dark">
            { activeBreadcrumb }
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>

      <Col className="d-flex align-items-center justify-content-end">
        {
          tooltip ?
          <OverlayTrigger
            key="info"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-info">
                { tooltip }
              </Tooltip>
            }
          >
            <Badge pill className="p-1 text-secondary"><FaQuestion size={22} /></Badge>
          </OverlayTrigger>
          : null
        }      
      </Col>
    </Row>
  )
}

export default Header;