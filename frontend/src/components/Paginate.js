import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, _page, keyword='', isAdmin=false}) => {
  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map(page => (
        <LinkContainer
          key={page + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${page+1}`
                : `/page/${page+1}`
              : `/admin/productlist/${page+1}`}>
          <Pagination.Item active={page+1 === _page}>{page+1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate
