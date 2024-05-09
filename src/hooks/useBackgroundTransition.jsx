import { useEffect } from 'react';



const useBackgroundTransition = () => {
  useEffect(() => {
    const setBackground = () => {
      if (!window) return;
      else
        console.log(window.outerWidth);
      const scrollPosition = window.scrollY;
      const scrollBottom = document.body.scrollHeight - window.innerHeight;
      const transitionBottom = (scrollBottom - scrollPosition) / window.innerHeight;
      
      let transitionProgress = Math.min(Math.max(0, scrollPosition / window.innerHeight), 1);
      
      let direction = "to right bottom";
      if (transitionBottom <= 1)
      {
        direction = "to top";
        transitionProgress = transitionBottom;
      }

      // const colorOpacity = 0.4 + transitionProgress * 0.6;
      // const colorStop = `${30 - transitionProgress * 30}%`;
      // let clor2Stop = `${10 - transitionProgress * 10}%`;
      // const pageHeight = document.body.scrollHeight;
      let colorStop = 0;
      let clor2Stop = 0;
      if (scrollPosition && transitionBottom <= 1)
        {
          colorStop = `${(1 - transitionBottom) * (transitionBottom <= 1 ? 50 : 12)}%`;
          clor2Stop = `${(1 - transitionBottom) * (transitionBottom <= 1 ? 30 : 12) }%`;
        }
      // Set background color with dynamic opacity
      const gradientColor = `rgba(29, 27, 27, ${transitionProgress}) ${colorStop}`;
      const gradient = `linear-gradient(${direction}, rgb(255, 255, 0) ${clor2Stop}, ${gradientColor})`;

      // Set background imagecontain
      // the background image will only be visible when the user scrolls to the top or the bottom of the page

      // const backgroundImage = scrollBottom <= 0 ? 'url("background.jpg")' : 'none';
      const backgroundImage = 'url("background2.jpg")';

      console.log(gradient, backgroundImage);
      // Combine gradient and background image
      let background = `${gradient}, ${backgroundImage}`;
      if (window.outerWidth < 600)
        background = `${gradient}`;
      document.body.style.background = background;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPositionX = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.transition = 'background 0.5s ease';

    };

    const handleScroll = () => {
      setBackground();
    };

    setBackground(); // Set initial background
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useBackgroundTransition;
