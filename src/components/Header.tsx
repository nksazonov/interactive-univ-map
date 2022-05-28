import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import CustomLink from './CustomLink'
import { IBreadcrumb } from './IBreadcrumb'

interface IHeaderProps {
  activeBreadcrumbText: string,
  goBackText?: string,
  goBackLink?: string,
  breadcrumbs?: IBreadcrumb[],
}

const Header = ({ goBackText, goBackLink, breadcrumbs, activeBreadcrumbText }: IHeaderProps) => {
  return (
    <div className='flex justify-between w-100 py-5 h-7vh'>
        {
          goBackText ?
          // @ts-ignore
          <CustomLink to={goBackLink} className="block p-2 relative flex-1 flex items-center text-gray-500 rounded-md hover:bg-gray-100 hover:cursor-pointer">
            <FaChevronLeft size={22} /><span className="ml-2 text-lg">{ goBackText }</span>
          </CustomLink>
          : <div />
        }

      <div className="auto">
        <div className="text-4xl font-medium text-slate-800">
          {
            breadcrumbs ?
            breadcrumbs.map((breadcrumb, idx) => (
              <div key={`header-link-${idx}`} className="inline-block">
                 {/* @ts-ignore */}
                <CustomLink key={`header-link-${idx}`} to={breadcrumb.to} className="inline-block text-secondary underline text-slate-500 hover:cursor-pointer hover:text-slate-700">
                  { breadcrumb.text }
                </CustomLink>
                <div className='inline-block mx-3 select-none text-slate-500' key={`header-slash-${idx}`}>/</div>
              </div>
            ))
            : null
          }

          <div className="inline-block text-slate-700">
            { activeBreadcrumbText }
          </div>
        </div>
      </div>

      <div className='flex-1' />
    </div>
  )
}

export default Header;