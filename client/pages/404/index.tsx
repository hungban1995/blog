import Link from "next/link";
import React from "react";

function Index() {
  return (
    <div>
      <h1>404</h1>
      <p>
        Page not found return to <Link href="/">Home</Link>
      </p>
    </div>
  );
}

export default Index;
