import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import CustomLink from './CustomLink'

const Header = ({ goBack, goBackLink, breadcrumbs, activeBreadcrumb }) => {
  return (
    <div className='flex justify-between w-100 py-5 h-7vh'>
        {
          goBack ?
          <CustomLink to={goBackLink} className="block p-2 flex items-center text-gray-500 rounded-md hover:bg-gray-100 hover:cursor-pointer">
            <FaChevronLeft size={22} /><span className="ml-2 text-lg">{ goBack }</span>
          </CustomLink>
          : <div />
        }

      <div className="auto">
        <div className="text-4xl font-medium text-slate-800">
          {
            breadcrumbs ?
            breadcrumbs.map((breadcrumb, idx) => (
              <div key={`header-link-${idx}`} className="inline-block">
                <CustomLink key={`header-link-${idx}`} to={breadcrumb.to} className="inline-block text-secondary underline text-slate-500 hover:cursor-pointer hover:text-slate-700">
                  { breadcrumb.title }
                </CustomLink>
                <div className='inline-block mx-3 select-none text-slate-500' key={`header-slash-${idx}`}>/</div>
              </div>
            ))
            : null
          }

          <div className="inline-block text-slate-700">
            { activeBreadcrumb }
          </div>
        </div>
      </div>

      <div />
    </div>
  )
}

export default Header;