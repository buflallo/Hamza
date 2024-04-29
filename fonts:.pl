fonts:

helvetica neue, FOR IMPORTANT TEXT
space mono, FOR TEXT AND HEADERS

colors:

#FFFFFF
#1D1B1B
#E1FF00
#2E05D1


360px -> 99%
1000px or plus -> 40%
`12
12
21
`21
`12
12

1%4
2%4
3%4
4%4
5678

const projectData = [
  [["Minishell", "Software Developement"], "project.png"],
  third
  [["Minishell", "Software Developement"], "project.png"],
  third 
  [["Minishell", "Software Developement"], "project.png"],
  first 
  [["Minishell", "Software Developement"], "project.png"],
  first
];

0.4 -> 0.91

50% -> 7.55527%

linear-gradient(to left top, rgb(255 255 0 ) 10%, rgb(29 27 27/ transitionProgress) 30%) 49%, url(background.jpg)


linear-gradient(to left top, rgb(255, 255, 0) 0%, rgba(29, 27, 27, 0.91) 7.55527%) 50%, url("background.jpg")


export default function Header() {
  const [percentage, setPercentage] = React.useState(
    calculatePercentage(window.innerWidth)
  );
  // calculate the percentage based on the device width
  return (
<Container
        maxWidth="lg"
        sx={{
          display: { xs: "flex", sm: "inline-flex" },
          height: "100vh",
        }}
      >
<Box
            sx={{
              border: "4px solid white",
              borderRadius: "50px",
              padding: "10px",
              height: "50px",
            }}
          >
            <Typography color={"white"} variant="h5">
              Ability Front End
            </Typography>
          </Box>

          </Container
  );
}