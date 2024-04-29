import React from "react";

const useColorTransition = () => {
  const [percentageTop, setPercentageTop] = React.useState(0);

  // Memoize the calculatePercentageScrolled function
  const calculatePercentageScrolled = React.useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    return Math.min(
      1,
      Math.max(0, scrollTop / (documentHeight - windowHeight))
    );
  }, []);

  // Memoize the changeColor function
  const changeColor = React.useCallback((percentageScroll) => {
    percentageScroll *= 10;
    if (percentageScroll > 1 && percentageScroll < 9)
      return "rgba(255, 255, 255, 1)";
    else if (percentageScroll >= 9 && percentageScroll <= 10)
      percentageScroll = 1 - (percentageScroll - 9);
    const targetColor = [255, 255, 255]; // White
    const initialColor = [29, 27, 27]; // Dark blue
    const interpolatedColor = initialColor.map(
      (c, i) => c * (1 - percentageScroll) + targetColor[i] * percentageScroll
    );
    return `rgba(${interpolatedColor.join(",")}, 1)`;
  }, []);

  // Memoize the scroll event handler
  const handleScroll = React.useCallback(() => {
    const top = calculatePercentageScrolled();
    setPercentageTop(top);
  }, [calculatePercentageScrolled]);

  // Register scroll event listener on mount
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
    const color = changeColor(percentageTop);

    return color;
};

export default useColorTransition;
