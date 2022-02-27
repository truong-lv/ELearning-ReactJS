export default function Footer(){
    const style = {
        position: 'absolute',
        width: '100%',
        height: '280px',
        left: '0px',
        bottom: '0px',
        background: '#ffff',
        'border-top': '10px solid #009FE5'   
    }
    return(
        <div className="footer" style={{...style}}>
            footer
        </div>
    )
}