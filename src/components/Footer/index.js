import React from 'react';
import style from './Footer.module.css';
import whatsappIcon from '../../assets/whatsapp.svg';
import instagramIcon from '../../assets/instagram.svg'; 

const Footer = () => {
  return (
    <footer className={style.footer}>
        <h1>Contact</h1>
        <div className={style.contacts}>
            <div className={style.cards}>
                <p>Phone</p>
                <span>+7 (499) 350-66-04</span>
            </div>
            <div className={style.cards}>
                <p>Socials</p>
                <ul className={style.cards_list}>
                    <li className={style.cards_item}>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                            <img src={whatsappIcon} alt="Whatsapp" className={style.socialIcon}/>
                        </a>
                    </li>
                    <li>
                        <a href="https://instagramm.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagramm" className={style.socialIcon}/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={style.cards}>
                <p>Address</p>
                <span>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</span>
            </div>
            <div className={style.cards}>
                <p>Working Hours</p>
                <span>24 hours a day</span>
            </div>
        </div>
        <div style={{width: '100%', padding: '20px 0'}}>
            <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=350&amp;hl=en&amp;q=Dubininskaya%20Ulitsa,%2096,%20Moscow,%20Russia,%20115093+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps tracker sport</a>
            </iframe>
        </div>
    </footer>
  );
};

export default Footer;
