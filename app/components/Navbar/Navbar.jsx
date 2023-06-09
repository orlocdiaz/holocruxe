'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useScroll } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { scrollYProgress } = useScroll();

  // window.addEventListener('scroll', () => console.log(scrollYProgress.get()));

  return (
    <header className={`${styles.container} ${active && styles.active}`}>
      <span className={styles.slogan}>
        THE AI FOR <br /> PRESERVING <br /> YOUR LEGACY
      </span>
      <Image
        src="/logo.png"
        width={275}
        height={70}
        alt="Logo"
        className={styles.title}
      />
      <nav className={styles.navMenu}>
        <button className={styles.SUBtn}>Sign Up</button>
      </nav>
    </header>
  );
};

export default Navbar;
