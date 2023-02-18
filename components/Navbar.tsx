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
        NFT Marketplace
      </Link>
      <ConnectButton
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
    </nav>
  );
};

export default Navbar;
