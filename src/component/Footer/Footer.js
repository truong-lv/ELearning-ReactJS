import logo from '../../assets/image/logoPTIT.png'
import chPlay from '../../assets/image/chPlay.png'
import './footer.css'

export default function Footer(){

    return(
        <div className="footer-container" >
            <div className="footer_location" >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={logo} alt="Logo" style={{borderRight: '3px solid #2980B9',padding:'5px'}} />
                    <h5 style={{color:'#2980B9',padding:'5px',wordBreak:'break-word'}}>HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG CƠ SỞ TP.HCM</h5>
                </div>
                <div>
                    <p>Cơ sở Quận 1: 11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>
                    <p>Cơ sở Quận 9: Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                </div>
            </div>
            <div className="footer_infor" >
                <div >
                    <h2 className="infor_title">THÔNG TIN</h2>
                    <a className="link-infor" href="https://ptithcm.edu.vn/" >Trường học viện công nghệ bưu chính viễn thông HCM</a>
                    <br/>
                    <a className="link-infor" href="https://fit.ptithcm.edu.vn/bai-giang" >Khoa CNTT 2 học viện công nghệ bưu chính viễn thông HCM</a>
                </div>
                <div>
                    <h2 className="infor_title">LIÊN HỆ</h2>
                    <a className="link-infor" href="mailto: hvbcvthcm@ptithcm.edu.vn" >hvbcvthcm@ptithcm.edu.vn</a>
                    <p style={{marginTop:'10px'}}>+ (028) 38.295.258</p>
                    <p style={{marginTop:'10px'}}>+ (028) 39.105.51</p>
                </div>
                <div>
                    <h2 className="infor_title">ỨNG DỤNG</h2>
                    <img src={chPlay} alt="CHPLAY" style={{marginTop:'10px'}}/>
                </div>
            </div>
        </div>
    )
}