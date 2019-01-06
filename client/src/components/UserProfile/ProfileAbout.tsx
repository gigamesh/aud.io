import React from "react";
import styled from "styled-components";
import MyTextHeading from "../mui/MyTextHeading";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import withWidth from "@material-ui/core/withWidth";

const ProfileAbout = (props: any) => {
  const ParagraphWrap = styled.div`
    text-indent: 2em;
    /* padding: 0 10px; */
  `;

  return (
    <Grid
      container
      spacing={props.width === "xs" ? 0 : 24}
      justify="center"
      style={{ width: "calc(100% - 20px)", margin: "10px auto" }}
    >
      <Grid item md={9}>
        <MyTextHeading variant="headline" align="center">
          Biography
        </MyTextHeading>
        <ParagraphWrap>
          <Typography paragraph gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            quasi est ipsa. Molestiae architecto nemo illum rem a nisi tenetur
            magnam dolorem eos ullam ipsam velit vitae qui atque sint suscipit
            praesentium, id, harum quibusdam iure consequatur error facilis
            assumenda. Tempore tempora dignissimos id praesentium iste quae!
            Dolorem, reiciendis voluptatibus?
          </Typography>
          <Typography paragraph gutterBottom>
            Quidem distinctio exercitationem eligendi perferendis repellat.
            Accusantium labore officia error culpa, dolores vel cupiditate alias
            dolore rem cum nihil numquam voluptatibus inventore iusto, suscipit
            eum saepe odio. Dolores modi earum rerum enim quam, in eveniet
            dolore esse unde nesciunt, reprehenderit architecto, cupiditate
            consequuntur labore at vitae impedit itaque aperiam! Illo.
          </Typography>
          <Typography paragraph gutterBottom>
            Similique veritatis facilis, odio recusandae in aspernatur?
            Accusantium aperiam, tempore neque minima suscipit qui expedita
            eveniet a esse possimus aspernatur explicabo fugit magnam id maxime.
            Dignissimos tempora distinctio corporis molestias asperiores
            consequatur excepturi et. Omnis, debitis? Consequuntur itaque
            voluptates unde facilis, blanditiis est distinctio ducimus. Libero
            placeat vitae voluptate laboriosam?
          </Typography>
        </ParagraphWrap>
      </Grid>
      <Grid item xs={12} md={3}>
        <MyTextHeading variant="headline" align="center">
          Expertise
        </MyTextHeading>
        <List component="nav" style={{ border: "1px solid #bbb" }}>
          <ListItem button disableGutters>
            <ListItemText
              primary="Producer"
              style={{ textAlign: "center", padding: 0 }}
            />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemText
              primary="Writer"
              style={{ textAlign: "center", padding: 0 }}
            />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemText
              primary="DJ"
              style={{ textAlign: "center", padding: 0 }}
            />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemText
              primary="Vocalist"
              style={{ textAlign: "center", padding: 0 }}
            />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemText
              primary="Engineer"
              style={{ textAlign: "center", padding: 0 }}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default withWidth()(ProfileAbout);
