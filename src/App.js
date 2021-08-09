import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { boxArray } from './config/config';
import { useSelector, useDispatch } from "react-redux";
import { setLoader, getInitialData } from "./actions";
import './App.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor: 'pink'
  },
  media: {
    height: 140,
  },
  paper: {
    textAlign: 'center',
  },
});

export default function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState([]);
  const [totalLike, setTotalLike] = useState('');
  const [totalDisLike, setTotalDisLike] = useState('');

  const handleLike = (key) => {
    boxArray.filter(name => name.key == key).map(filteredName => (
      filteredName.isLike = true
    ))
    dispatch(getInitialData(boxArray)).then(res => {
      setTempData(res.payload);
      const countLike = res.payload.filter(data => data.isLike === true);
      const countDisLike = res.payload.filter(data => data.isLike === false);
      setTotalLike(countLike.length);
      setTotalDisLike(countDisLike.length);
    })
  }


  const handleDisLike = (key) => {
    boxArray.filter(name => name.key == key).map(filteredName => (
      filteredName.isLike = false
    ))
    dispatch(getInitialData(boxArray)).then(res => {
      setTempData(res.payload);
      const countLike = res.payload.filter(data => data.isLike === true);
      const countDisLike = res.payload.filter(data => data.isLike === false);
      setTotalLike(countLike.length);
      setTotalDisLike(countDisLike.length);
    })
  }

  function FormRow() {
    return (
      <React.Fragment>
        {boxArray.map((data, i) => (
          <Grid item xs={4} key={i}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {data.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="like-container">
                <Button size="small" color="primary" onClick={() => handleLike(data.key)}>
                  <img src="like.png" />
                </Button>
                <Button size="small" color="primary" onClick={() => handleDisLike(data.key)}>
                  <img src="dislike.png" />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </React.Fragment>
    );
  }



  return (
    <div  className="App">
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>

      <footer className="footer">Total Likes <b>{totalLike}</b> | Total Dislike <b>{totalDisLike}</b></footer>
    </div>
  );
}
