import React from "react";

const Ping = () => {
  return (
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
    </span>
  );
};

export default Ping;
