import { Button } from '@material-tailwind/react'
import ImageCarousel from './ImageCarousel'
import { Tooltip } from 'react-tooltip'

const Interactivators = ({ data }) => {

  return (
    <div>
      <ImageCarousel images={data.images}/>
      <div className="btns flex gap-5">
        {
          data.link.map((item)=>(
            <a href={item} target="_blank" rel="noopener noreferrer">
              <Button color='white' id="link-tooltip" className={`${!item?"hidden":"block"}`}>
                Redirect
                <Tooltip anchorSelect="#link-tooltip">
                  <p>{`visit ${item}?`}</p>
                </Tooltip>
              </Button>
            </a>
          ))
        }
        <a href={`tel:${data.phone}`} target="_blank" rel="noopener noreferrer">
          <Button color='white' id="phone-tooltip" className={`${!data.phone?"hidden":"block"}`}>
            Call
            <Tooltip anchorSelect="#phone-tooltip">
              <p>{`Call to ${data.phone}?`}</p>
            </Tooltip>
          </Button>
        </a>
        <a href={`mailto:${data.mail}`}  target="_blank" rel="noopener noreferrer">
          <Button color='white' id="mail-tooltip" className={`${!data.mail?"hidden":"block"}`}>
            Mail
            <Tooltip anchorSelect="#mail-tooltip">
              <p>{`Mail to ${data.mail}?`}</p>
            </Tooltip>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Interactivators