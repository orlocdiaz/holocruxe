import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { useScroll, useTransform, motion } from 'framer-motion';
import { RiMenuLine } from 'react-icons/ri';
import { BiDownArrowAlt } from 'react-icons/bi';
import {
  BsInstagram,
  BsYoutube,
  BsLinkedin,
  BsArrowRightShort,
} from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

const Main = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.12, 0.15, 0.3], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.28, 0.3, 0.45], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.47, 0.5], [0, 1]);

  return (
    <main className={styles.container}>
      <div className={styles.menuContainer}>
        <div className={styles.menuBtn}>
          <RiMenuLine />
        </div>
      </div>
      <h1 className={styles.hero}>
        <div> YOUR </div>
        <motion.div style={{ opacity }}>LIFE</motion.div>
        <motion.div style={{ opacity: opacity2 }}>STORY</motion.div>
        <motion.div style={{ opacity: opacity3 }}>CHOICE</motion.div>
        <motion.div style={{ opacity: opacity4 }}>LEGACY</motion.div>
      </h1>
      <div className={styles.scrollContainer}>
        <motion.div className={styles.scrollIcon} style={{ opacity }}>
          <BiDownArrowAlt className={styles.iconSVG} size={130} />
          <span>Scroll Down</span>
        </motion.div>
      </div>
      <div className={styles.descContainer}>
        <h3 className={styles.descTitle}>
          HOLOCRUXE IS THE AI <br /> DESIGNED TO KNOW YOU
        </h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
          reprehenderit, voluptate mollitia, culpa facilis suscipit eaque in
          similique autem dignissimos saepe! Consequatur doloribus autem nemo
          quisquam, labore molestias nostrum dicta?
        </p>
      </div>
      <div className={styles.imgsContainer}>
        <Image src={'/hand.jpeg'} width={1000} height={415.6} />
      </div>
      <footer className={styles.footerContainer}>
        <div className={styles.contactContainer}>
          <h4 className={styles.footerTitle}>FIND US</h4>
          <Link
            href="https://www.linkedin.com/company/holocruxe/"
            target="blank"
            className={styles.links}
          >
            <BsLinkedin size={30} />
          </Link>
          <Link
            href="https://www.instagram.com/holocruxe/"
            target="blank"
            className={styles.links}
          >
            <BsInstagram size={30} />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCn64eGqeSqtSlQNrfiPH9eA"
            target="blank"
            className={styles.links}
          >
            <BsYoutube size={30} />
          </Link>
        </div>
        <div className={styles.messageContainer}>
          <h4 className={styles.footerTitle}>CONTACT US</h4>
          <input
            type="email"
            name="contact"
            placeholder="example@email.com"
            className={styles.emailInput}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="7"
            placeholder="Please leave us a message."
            className={styles.textInput}
          ></textarea>
          <input type="submit" value="Send" className={styles.submitBtn} />
        </div>
        <div className={styles.aboutContainer}>
          <h4 className={styles.footerTitle}>
            MORE ABOUT US
            <BsArrowRightShort />
          </h4>
          <h4 className={styles.footerTitle}>
            FAQ
            <BsArrowRightShort />
          </h4>
        </div>
        <div className={styles.legalContainer}>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <strong>Copyright © 2023 Holocruxe, Inc. All rights reserved.</strong>
        </div>
      </footer>
    </main>
  );
};

export default Main;
