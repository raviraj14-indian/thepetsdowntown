import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigateTo = useNavigate();
  return (
    <>
      <div class="h-full w-full  flex items-center">
        <div class="container  bg-base-300 p-10 rounded-xl m-4 flex flex-col md:flex-row items-center justify-center px-5 ">
          <div class="max-w-md">
            <div class="text-9xl   text-primary font-bold">404</div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              Sorry we couldn't find this page.{" "}
            </p>
            <p class="mb-8">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <button
              className="btn btn-primary btn-lg btn-outline mr-4"
              onClick={() => {
                navigateTo(-1);
              }}
            >
              Back
            </button>
            <button
              className="btn btn-primary btn-lg btn-outline"
              onClick={() => {
                navigateTo("/");
              }}
            >
              Home
            </button>
          </div>
          <div class="max-w-lg">
            <img src="/ohh.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
