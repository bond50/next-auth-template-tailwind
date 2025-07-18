'use client';

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Button
        className="w-full justify-start gap-3"
        size="lg"
        variant="outline"
        onClick={() => {
          // TODO: Add Google login logic
        }}
      >
        <FcGoogle className="w-5 h-5" />
        <span>Login with Google</span>
      </Button>

      <Button
        className="w-full justify-start gap-3"
        size="lg"
        variant="outline"
        onClick={() => {
          // TODO: Add GitHub login logic
        }}
      >
        <FaGithub className="w-5 h-5" />
        <span>Login with GitHub</span>
      </Button>

      {/*<Button*/}
      {/*  className="w-full justify-start gap-3"*/}
      {/*  size="lg"*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => {*/}
      {/*    // TODO: Add Facebook login logic*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <FaFacebook className="w-5 h-5 text-blue-600" />*/}
      {/*  <span>Login with Facebook</span>*/}
      {/*</Button>*/}
    </div>
  );
};
