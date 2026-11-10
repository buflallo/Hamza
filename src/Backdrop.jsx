import React from "react";

// Fixed layers behind the page. The painting turns to print and then to dark
// as you go down, and comes back at the end for Contact. Their opacity is
// driven by useBackgroundTransition; phones (<600px) get plain dark, and the
// hero and footer carry the painting themselves.
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
      <div className="backdrop-layer backdrop-foot" ref={set("foot")} />
    </div>
  );
});

export default Backdrop;
