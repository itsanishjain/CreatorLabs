import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import astronaut from "../src/images/astronaut.png";

const App = () => (
  <div>
    <Head>
      <title>stakeLabs</title>
      <meta property="og:title" content="stakeLabs" />
      <meta
        property="og:description"
        content="A tool that allows creator to get whitelisting for their upcoming project"
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/stakeLabsNFT.jpg" />
      <meta property="og:url" content="https://www.stakeLabs.live/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.stakeLabs.live/" />
      <meta property="twitter:title" content="stakeLabs" />
      <meta
        property="twitter:description"
        content="A tool that allows creator to get whitelisting for their upcoming project"
      />
      <meta
        property="twitter:image"
        content="https://user-images.githubusercontent.com/43033153/170791310-c476115b-4073-48c5-8240-b31a99894648.jpg"
      />
    </Head>
    <section className="px-2 py-20  md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-7 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">stakeLabs</span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Support you favorite content creators and earn rewards
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link href="/activate-pass" passHref>
                  <a className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-orange-500 rounded-md sm:mb-0 hover:bg-orange-700 sm:w-auto">
                    Buy Our NFT
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </Link>
                <a
                  href="https://youtu.be/QssdpvEeokk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden object-cover">
              {/* <Image src={hero} alt='hero image' /> */}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full  pt-7 pb-7 md:pt-20 md:pb-24">
      <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
          <Image
            src={astronaut}
            className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 "
            width="300px"
            height="300px"
            alt="image"
          />
        </div>

        <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
          <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
            Roadmap
          </h2>
          <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
            We&apos;re going to create a slew of tools to assist
            creators/artists in obtaining the finest possible stakeLabs for
            their projects.
          </p>
          <ul className="p-0 m-0 leading-6 border-0 border-gray-300 space-y-2">
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Using Twitter and Discord to authorize
              <br />
              projects so that users can&apos;t spam their stakeLabs
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Filtering users with multiple accounts automatically
              <br />
              by keeping track of their transaction activities
            </li>
            <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid flex">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-orange-500 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              Adding support for multiple wallets to the login process
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

export default App;
