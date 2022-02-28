import banner from './banner.png'

export default function Banner(){
    return(
        <img
        src={banner}
        alt="ptit"
        loading="lazy"
        style={{width: '100%', height: '120px',border: '1px solid #009FE5'}}
      />
    )
}