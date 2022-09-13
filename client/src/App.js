import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./redux/utils/setAuthToken";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Scroll from "./components/layout/Scroll";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Alerts from "./components/layout/Alerts";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import ExperienceDetails from "./components/profile-forms/ExperienceDetails";
import EducationDetails from "./components/profile-forms/EducationDetails";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Projects from "./components/projects/Projects";
import Project from "./components/project/Project";
import AddProject from "./components/project-forms/AddProject";
import Candidates from "./components/project/Candidates";
import { getAllProjects } from "./redux/actions/project";
import { getAllProfiles } from "./redux/actions/profile";
import Contact from "./components/layout/Contact";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllProjects());
    dispatch(getAllProfiles());
  }, [dispatch]);
  return (
    <Router>
      <NavBar />
      <section className="container">
        <Route exact path="/" component={Landing} />
        <Box id="alert">
          <Alerts />
        </Box>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:userId" component={Profile} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/project/:projectId" component={Project} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-education"
            component={EducationDetails}
          />
          <PrivateRoute
            exact
            path="/add-experience"
            component={ExperienceDetails}
          />
          <PrivateRoute exact path="/add-project" component={AddProject} />
          <PrivateRoute
            exact
            path="/project/:projectId/candidates"
            component={Candidates}
          />
        </Switch>
        <Scroll showBelow={50} />
      </section>
    </Router>
  );
};
export default App;
