'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';

export default function HeroSection() {
  return (
    <div className="relative" id="home">
      <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-blue-500 to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 text-balance dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              AI for <span className="text-blue-600 dark:text-blue-400">O-RAN Networks</span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg">
              Advancing Open Radio Access Networks through intelligent AI systems, 
              digital-physical simulation, and cutting-edge research in collaboration with Ericsson.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <Link
                href="/documentation"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-blue-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">Explore Research</span>
              </Link>
              <Link
                href="#features"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-blue-600/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-blue-600 dark:text-white">Learn More</span>
              </Link>
            </div>
            <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">AI-Powered</h6>
                <p className="mt-2 text-gray-500">Intelligent network optimization</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Simulation-Driven</h6>
                <p className="mt-2 text-gray-500">Digital-physical testbeds</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">Industry Partnership</h6>
                <p className="mt-2 text-gray-500">Collaboration with Ericsson</p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center gap-12 flex-wrap">
            <div className="p-4 grayscale dark:grayscale-0 dark:brightness-0 dark:invert transition duration-200 hover:grayscale-0 flex items-center justify-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Lule%C3%A5_tekniska_universitet_Logo.svg"
                alt="Luleå University of Technology Logo"
                width={200}
                height={100}
                className="h-16 md:h-20 w-auto object-contain opacity-70 dark:opacity-100 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </div>
            <div className="p-4 grayscale dark:grayscale-0 dark:brightness-0 dark:invert transition duration-200 hover:grayscale-0 flex items-center justify-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Ericsson_logo.svg"
                alt="Ericsson Logo"
                width={200}
                height={100}
                className="h-16 md:h-20 w-auto object-contain opacity-70 dark:opacity-100 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
