import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout'
import { Row, Col } from 'reactstrap'
import { API_KEY, APOD } from 'utils/constants'
import { useHistory, Link } from 'react-router-dom'

const clg = (...str) => console.log(...str)

const testImg = 'https://api.nasa.gov/assets/img/general/apod.jpg'

export default function HomePage() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [val, setVal] = useState('')
  const apiUrl = `${APOD}?api_key=${API_KEY}`
  let history = useHistory()
  
  useEffect(()=>{
    setLoading(true)
    fetch(apiUrl)
      .then((response) => response.json())
      .then(res => {
        setLoading(false)
        setData(res)
      })
  }, [])

  const date = data && data.date
  const explanation = data && data.explanation
  const media_type = data && data.media_type
  const title = data && data.title
  const url = data && data.url

  const search = () => {
    history.push('/search')
  }

  return (
    <Layout>
      {
        loading ? 
          <h2 className="whiteText tac">Loading...</h2> :
          <>
            <Row>
              <Col>{title}</Col>
              <Col className="tar">
                <input type="text" value={val} onChange={e => setVal(e.target.value)} />
                <Link to={`/search?q=${val}`}>
                  <button onClick={search}>Search</button>
                </Link>
              </Col>
            </Row>
            <br />
            <Row>
              {
                media_type === 'video' ?
                  <iframe src={url}
                    className="fullWidthImg"
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                  /> :
                  <img src={url ? url : testImg} alt="media" className="fullWidth" />
              }
            </Row>
            <br />
            <div className="tac">{explanation}</div>
            <br />
            <div className="tac">Image date: {date}</div>
            <br />
            <div className="tac">
              <small>@ Copyright Info</small>
            </div>
          </>
      }
    </Layout>
  );
}
