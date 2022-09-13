import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import PhoneEnabledOutlinedIcon from '@material-ui/icons/PhoneEnabledOutlined';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import TabPanel from '@material-ui/lab/TabPanel';

const useStyles = makeStyles((theme) => ({
   root: {
    textAlign:"center",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
    text:{
textAlign:"center",
color: "white",
fontSize:"30px"
    },
    box:{
      textAlign:"center",
      paddingTop:"70px"
    },
    tab:{
color:"white"
    }
}));

const Contact = () => {
      const classes = useStyles();
      const [value, setValue] = React.useState('1');
      const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
<Box className={classes.box} >
   <Typography  className={classes.text}>
    Feel free to contact me 
   </Typography>
   <Box className={classes.box} >
    {/* <Tabs
    // value={value}
    // onChange={handleChange}
    color="white"
    variant="fullWidth"
    indicatorColor="primary"
    textColor="primary"
    aria-label="icon tabs example">
    </Tabs> */}
     <div className={classes.root}>
    <TabContext value={value} >
  <AppBar position="static" >
    <TabList onChange={handleChange} aria-label="simple tabs example">
      <Tab icon={<PhoneEnabledOutlinedIcon />} label="phone" className={classes.tab} value="1"/>
  <Tab icon={<AlternateEmailIcon />} label="email" className={classes.tab} value="2"/>
      <Tab icon={<LinkedInIcon />} label="linkedin" className={classes.tab} value="3" />
      <Tab icon={<TwitterIcon />} label="twitter" className={classes.tab} value="4" />
    </TabList>
  </AppBar>
  <TabPanel value="1">+21622196330</TabPanel>
  <TabPanel value="2">sakouhi.wafaa@gmail.com</TabPanel>
  <TabPanel value="3">https://www.linkedin.com/in/wafa-sakouhi</TabPanel>
  <TabPanel value="4">@wafaa_sakouhi</TabPanel>
</TabContext>
</div>
   </Box> 
</Box>
    );
};
export default Contact;