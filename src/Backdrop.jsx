import React from "react";

// Fixed layers behind the page. The painting turns into the two-ink print, then
// a cobalt ghost, then fades out to plain yellow at the bottom. Their opacity is
// driven by useBackgroundTransition; phones (<600px) get the gradient only.
const Backdrop = React.forwardRef(function Backdrop(_, layers) {
  const set = (name) => (node) => {
    if (!layers.current) layers.current = {};
    layers.current[name] = node;
  };
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-layer backdrop-full" ref={set("full")} />
      <div className="backdrop-layer backdrop-print" ref={set("print")} />
      <div className="backdrop-layer backdrop-veil" ref={set("veil")} />
      <div className="backdrop-layer backdrop-ghost" ref={set("ghost")} />
      <div className="backdrop-layer backdrop-foot" ref={set("foot")} />
    </div>
  );
});

export default Backdrop;
