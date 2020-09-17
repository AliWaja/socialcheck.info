import React, { Component } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Chip, CircularProgress} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; 

 

class BackgroundCheck extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      status: 100,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      username: '',
      spin: false
    }

  }
  // Fetch the list on first mount
  componentDidMount() {
    this.getbackgroundCheck();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      this.getbackgroundCheck();
    }
  }
  // Retrieves the list of items from the Express app
  
  getbackgroundCheck = () => {
    this.setState({spin: true});
    fetch('/api/getbackgroundCheck?username=' + this.props.username)
    .then(res => res.json())
    .then(res => this.setState({ 
                                  status: res.status,  
                                  list1: res.list1,
                                  list2: res.list2,
                                  list3: res.list3,
                                  list4: res.list4,
                                  list5: res.list5
                                }))
  }

  render() {
    const { status, list1, list2, list3, list4, list5 } = this.state;

    return (
      <div className="App">
        <div></div>
        <h1>   </h1>
        <div>{(status === 100)? <CircularProgress />: <h2></h2>}</div>
        <div>{(status === 400)? <Chip label="This user does not exist." color="secondary"/>: <h2></h2>}</div>
        {/* Check to ee if any items are found*/}
        {(status === 200) ? (

<div  style={{ justifyContent:'center', alignItems:'center'}}>
<Accordion>
  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"      >
        <Typography>Views on Politics</Typography>
  </AccordionSummary>

  <AccordionDetails style={{overflow:'auto'}}>
    {list1.map((item) => {
      return(
        <TwitterTweetEmbed
             tweetId={item}
        />
       );
    })}
</AccordionDetails>
</Accordion>

<Accordion>
  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"      >
        <Typography>Views on Sexual Orientation</Typography>
  </AccordionSummary>

  <AccordionDetails style={{overflow:'auto'}}>
    {list2.map((item) => {
      return(
        <TwitterTweetEmbed
             tweetId={item}
        />
       );
    })}
</AccordionDetails>

</Accordion>

<Accordion>
  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"      >
        <Typography>Views on Race and Gender</Typography>
  </AccordionSummary>

  <AccordionDetails style={{overflow:'auto'}}>
    {list3.map((item) => {
      return(
        <TwitterTweetEmbed
             tweetId={item}
        />
       );
    })}
</AccordionDetails>

</Accordion>

<Accordion>
  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"      >
        <Typography>Drug and Alcohol use</Typography>
  </AccordionSummary>

  <AccordionDetails style={{overflow:'auto'}}>
    {list4.map((item) => {
      return(
        <TwitterTweetEmbed
             tweetId={item}
        />
       );
    })}
</AccordionDetails>

</Accordion>

<Accordion>
  <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"      >
        <Typography>Violence/Firearms</Typography>
  </AccordionSummary>

  <AccordionDetails style={{overflow:'auto'}}>
    {list5.map((item) => {
      return(
        <TwitterTweetEmbed
             tweetId={item}
        />
       );
    })}
    {this.setState({spin: false})}
</AccordionDetails>

</Accordion>
          </div>
        ) : (
          <div>
          </div>
        )
      }
      </div>
    );
  }
}

export default BackgroundCheck;