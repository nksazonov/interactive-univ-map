import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestion, FaChevronLeft } from 'react-icons/fa'

const Header = ({ goBack, goBackLink, tooltip, breadcrumbs, activeBreadcrumb }) => {
  return (
    <div className='flex justify-between w-100 py-5'>
      <div className="flex items-center">
        {
          goBack ?
          <button as={Link} variant="outline-light" to={goBackLink} className="border-0 text-secondary text-decoration-none h-100 d-block p-2 d-flex align-items-center">
            <FaChevronLeft size={22} /><span className="ms-2 fi-text text-middle">{ goBack }</span>
          </button>
          : null
        }
      </div>

      <div className="auto">
        <div className="text-4xl font-medium text-slate-800">
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

      <div />
    </div>
  )
}

export default Header;