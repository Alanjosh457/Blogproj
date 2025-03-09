import React from 'react';
import { useNavigate } from 'react-router-dom';


import styles from './header.module.css';
import frombot from './images/formbot.png'
import blue1 from './images/bluerib.png'
import svg from './images/svg.png'
import ol1 from './images/ob.png'

import bl1 from './images/bb.png'


const Header = () => {
  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");


const cnr='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1734692898/bubetmaysupekhyemy1c.png'
const ft='http://res.cloudinary.com/dgkcgjcw5/image/upload/v1734694036/o56b16cctlti2wthmqor.png'
 const navigate=useNavigate()

 const logger=()=>{
  navigate('/login')
 }
  return (
    <>
      <div className={styles.navbar}>
        <ul className={styles.navbarList}>
   
    <li className={styles.from}><img src={frombot}></img></li>
        <li className={styles.lg1}><button onClick={logger} className={styles.Sign}>Sign in</button></li>
       <li className={styles.lg2}><button  onClick={logger} className={styles.former}>Create a Blogpost</button> </li>
        </ul>
        
      </div>

      <div className={styles.hdr}>
        <div>Blogi</div>
        <div className={styles.vis}>build blogs visually</div>
      </div>
      <div><img src={blue1} className={styles.br1}></img></div>
      <div><img src={svg} className={styles.br2}></img></div>

       <div className={styles.hdr2}>
      <div>
      Blogi enables user to build their own blog posts</div>
      <div>anywhere on your web/mobile apps and start collecting results like magic.</div>
      </div>
 <center><div><button className={styles.formbot}>Create a BlogPost for free</button></div></center>
 <div className={styles.cir}>
 <div className={styles.ol}><img src={ol1} className={styles.or}></img></div>
 <div className={styles.bl}><img src={bl1} className={styles.blu}></img></div>
</div>

<center><div><img src={cnr} className={styles.br3}></img></div></center>




 

     

     
    </>
  );
}

export default Header;