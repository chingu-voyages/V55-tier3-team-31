import React, { useState } from 'react';
import githubLogo from '../assets/github-logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-primary/5 full-width h-20 pl-20 pr-20 flex justify-between pt-6'>
      <div className='w-1/2 flex'>
        <img className='size-8 filter brightness-0 invert' src={githubLogo} />
        <Link to='https://github.com/chingu-voyages/V55-tier3-team-31'>
          <p className='ml-3 mt-1'>GitHub Repository</p>
        </Link>
      </div>
      <div className='flex flex-col'>
        <p className='text-sm'>
          Created by Team Members: jericho1050, Rangarajsam, prakshh,
          dhemmyhardy
        </p>
      </div>
    </footer>
  );
}
