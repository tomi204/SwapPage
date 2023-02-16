import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.linkNav}>
        HOME
      </Link>
      <Link href="/about" className={styles.linkNav}>
        NFT
      </Link>
      <ConnectButton showBalance={true} />
    </nav>
  );
};

export default Navbar;
