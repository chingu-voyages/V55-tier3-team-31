import React, { useState } from 'react';
import githubLogo from "../assets/github-logo.png"

export default function Footer() {
    return (
        <footer className="full-width h-20 pl-20 pr-20 flex justify-between pt-6 bg-white">
            <div className="w-1/2 flex">
            <img className="size-8" src={githubLogo} />
            <p className="ml-3 mt-1">GitHub Repository</p>
            </div>
        </footer>
    )
}