import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Title from "./Title";

const projectData = [
  [["Minishell", "Software Developement"], "minishell.gif"],
  [["Webserv", "Server Developement"], "webserv.gif"],
  [["Cube3d", "Game Developement"], "cub3d.gif"],
  [["Transcendance", "Web Developement"], "trandandan.gif"],
];

const ProjectCard = (props) => {
  return props.el == 1 ? (
    <Grid
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs={12}
      sm={6}
      md={3}
    sx={{display: { xs: "none", sm: "flex" } }}

    >
      <Typography color={"white"} variant="h3" fontSize={{ xs: "60px", md: "5vw" }}>
        {props.title}
      </Typography>
      <Typography textAlign={"center"} width={"max-content"} fontSize={{ xs: "26px", md: "2vw" }} color={"white"} variant="h6">
        {props.desc}
      </Typography>
    </Grid>
  ) : props.el == 2 ? (
    <Grid 
    item xs={12} sm={6} md={4}
    >
      <img
        src={props.img}
        width={"100%"}
        height={"auto"}
        alt={`${props.title} image`}
      />
    </Grid>
  ) : (
    <Grid
      sx={{ display: { xs: "none", md: "block" } }}
      item
      xs={12}
      sm={6}
      md={4}
    ></Grid>
  );
};

export default function Projects() {
  
  let image = 2;

  return (
    <Box
    id="Works"
    sx={{
      pt : "12vh",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "50px",
      // mr: "40px",
      pr: { xs: "3vw", md: "0" },
      pl: { xs: "3vw", md: "40px" },
      // pl: {xs: "30px", md: "12vw" },
    }}
  >
    <Title title="Projects"></Title>
      <Box sx={{ mt: "20px" }}>
        <Grid container spacing={2}>
          {projectData.map((el, index) => {
            // 1st and 4th card will be text
            if ((index + 1) % 4 == 1 || (index + 1) % 4 == 2) {
              return image == 2
                ? (image = 1) && (
                    <>
                      <ProjectCard el={1} title={el[0][0]} desc={el[0][1]} />
                      <ProjectCard el={2} img={el[1]} />
                      <ProjectCard el={3} />
                    </>
                  )
                : (image = 2) && (
                    <>
                      <ProjectCard el={2}  img={el[1]} />
                      <ProjectCard el={1} title={el[0][0]} desc={el[0][1]} />
                      <ProjectCard el={3} />
                    </>
                  );
            } else {
              return image == 2
                ? (image = 1) && (
                    <>
                      <ProjectCard el={3} />
                      <ProjectCard el={2} img={el[1]} />
                      <ProjectCard el={1} title={el[0][0]} desc={el[0][1]} />
                    </>
                  )
                : (image = 2) && (
                    <>
                      <ProjectCard el={3} />
                      <ProjectCard el={1} title={el[0][0]} desc={el[0][1]} />
                      <ProjectCard  el={2} img={el[1]} />
                    </>
                  );
            }
          })}
        </Grid>
      </Box>
    </Box>
  );
}
