import React from "react";
import { loginUsingGoogle, loginUsingGithub } from "../services/authService";

export default function Login() {
    return (
        <div className="flex flex-col items-center w-[50%] justify-center h-100 rounded-[20px] bg-black/10 p-20 mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Welcome to Recurso</h1>
          <div className="space-y-4">
            <button
              onClick={loginUsingGoogle}
              className="flex items-center px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                alt="Google Icon"
                className="w-6 h-6 mr-2"
              />
              Login with Google
            </button>
            <button
              onClick={loginUsingGithub}
              className="flex items-center px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Icon"
                className="w-6 h-6 mr-2"
              />
              Login with GitHub
            </button>
          </div>
        </div>
      );
}