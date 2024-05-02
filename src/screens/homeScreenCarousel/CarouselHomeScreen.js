import Carousel from 'react-bootstrap/Carousel'
import property from './property.jpeg'
import property1 from './property1.png'
import property2 from './property2.jpeg'

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div
          className='carousel-image-container'
          style={{ width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}
        >
          <img
            src={property}
            alt='First slide'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className='carousel-image-container'
          style={{
            width: '100%',
            overflow: 'hidden',
            paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
          }}
        >
          <img
            src={property1}
            alt='First slide'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className='carousel-image-container'
          style={{
            width: '100%',
            overflow: 'hidden',
            paddingTop: '56.25%' /* 16:9 Aspect Ratio */,
          }}
        >
          <img
            src={property2}
            alt='First slide'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselFadeExample
