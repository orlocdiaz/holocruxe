import React, { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { useScroll, useTransform, motion } from 'framer-motion';
import { RiMenuLine } from 'react-icons/ri';
import { BiDownArrowAlt } from 'react-icons/bi';

const Main = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.085], [1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.06, 0.085, 0.165],
    [0, 1, 0]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.15, 0.185, 0.23],
    [0, 1, 0]
  );
  const opacity4 = useTransform(scrollYProgress, [0.24, 0.28], [0, 1]);

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
      <div className={styles.imgsContainer}></div>
    </main>
  );
};

export default Main;
