import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Layout from 'components/Layout'
import { PICSAPI } from 'utils/constants'
import { Row, Col, Button } from 'reactstrap'
import { useLocation } from "react-router-dom";
import { Pagination } from "react-swag-pagination"
import { Link } from 'react-router-dom'
import notFound from 'images/no-found.png'

const clg = (...str) => console.log(...str)

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const countPerPage = 6

export default function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [page, setPage] = useState(1)
  const [steps, setSteps] = useState(countPerPage)
  let query = useQuery();
  const apiUrl = `${PICSAPI}search?q=${query.get("q")}&media_type=image`
  const formatDate = (date) => moment(date).format('ll')
  const onPageChange = (page) => setPage(page)
  const nav = page => setPage(page)
  const next = () => setPage(page + 1)
  const last = () => setPage(steps)
  const first = () => setPage(1)
  const back = () => setPage(page + 1)

  useEffect(() => {
    setLoading(true)
    fetch(apiUrl)
      .then((response) => response.json())
      .then(res => {
        setLoading(false)
        setData(res.collection.items)
      })
  }, [apiUrl])

  const endRange = steps * page
  const startRange = endRange - countPerPage
  return (
    <Layout>
      <dt>Search results for <b>{query.get("q")}</b></dt>
      <Row className="mb10">
        {
          data && data.length ?
            <>
              {
                data.slice(startRange, endRange).map((i, j) =>
                  <Col xs="4" key={i.data[0].nasa_id ? i.data[0].nasa_id : j}>
                    <div className={loading ? 'bp3-skeleton' : 'bp3-card'}>
                      <div className="thumb">
                        <img src={i.links[0].href ? i.links[0].href : notFound} alt="" />
                      </div>
                      <div className="text">
                        <h4 className="bp3-heading">{i.data[0].title ? i.data[0].title : '-'}</h4>
                        <p className=".modifier">
                          {i.data[0].date_created ? formatDate(i.data[0].date_created) : '-'}
                        </p>
                      </div>
                    </div>
                  </Col>
                )
              }
            </> :
            loading ? <h2 className="whiteText tac noData">Loading...</h2> :
              <h2 className="whiteText tac noData">No data found</h2>
        }
      </Row>
      <>
        {
          data && data.length !== 0 &&
          <Pagination
            steps={steps}
            defaultStep={page}
            callbackNav={nav}
            callbackNext={next}
            callbackLast={last}
            callbackFirst={first}
            callbackPrev={back}
            color="#8bc34a"
          />
        }
      </>
      <>
        {
          data && data.length !== 0 &&
          <>
            <dt className="related">Related Searches</dt>
            <div className={`links ${loading && 'bp3-skeleton'}`}>
              {
                data && data[0].data[0].keywords.map(i =>
                  <Button color="color">
                    <Link to={`/search?q=${i}`}>{i}</Link>
                  </Button>
                )
              }
            </div>
          </>
        }
      </>
    </Layout>
  );
}
