import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { darkTheme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import Navbar from "../components/Navbar";
import { useProvider, useSigner } from "wagmi";

const Home: NextPage = () => {
  const provider = useSigner().data?.provider;

  const jsonRpcUrlMap = {
    1: "https://eth-goerli.g.alchemy.com/v2/3i8jCezRXagBt41owabyHL1nxambxJHr",
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Swap App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <h2 className={styles.title}>Swap your ERC20!</h2>
        <SwapWidget
          width={"50%"}
          theme={darkTheme}
          jsonRpcUrlMap={jsonRpcUrlMap}
        />
      </main>
    </div>
  );
};

export default Home;
