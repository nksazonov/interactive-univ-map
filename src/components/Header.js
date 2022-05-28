import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestion, FaChevronLeft } from 'react-icons/fa'

const Header = ({ goBack, goBackLink, tooltip, breadcrumbs, activeBreadcrumb }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        {
          goBack ?
          <button as={Link} variant="outline-light" to={goBackLink} className="border-0 text-secondary text-decoration-none h-100 d-block p-2 d-flex align-items-center">
            <FaChevronLeft size={22} /><span className="ms-2 fi-text text-middle">{ goBack }</span>
          </button>
          : null
        }
      </div>

      <div xs="auto">
        <div bsPrefix="breadcrumb header-text bg-transparent mb-0">
          {
            breadcrumbs ?
            breadcrumbs.map((breadcrumb, idx) => (
              <div key={idx} linkAs={Link} linkProps={{ to: breadcrumb.to, className: "text-secondary text-underline" }}>
                { breadcrumb.title }
              </div>
            ))
            : null
          }

          <div active className="text-dark">
            { activeBreadcrumb }
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-end">
        {
          tooltip ?
          <div
            key="info"
            placement="bottom"
            overlay={
              <div id="tooltip-info">
                { tooltip }
              </div>
            }
          >
            <div pill className="p-1 text-secondary"><FaQuestion size={22} /></div>
          </div>
          : null
        }      
      </div>
    </div>
  )
}

export default Header;