import React from 'react'
import { withRouter } from 'react-router-dom'

const CustomLink = withRouter(props => {
  // to fix "React wrapper: React does not recognize the `staticContext` prop on a DOM element"
  const { staticContext, ...rest } = props;

  return (
    <div
      {...rest}
      onClick={evt => {
        evt.preventDefault();
        rest.onClick && rest.onClick(evt);
        rest.history.push(rest.to);
      }}
      href={rest.to}
    />
  )
})

export default CustomLink;