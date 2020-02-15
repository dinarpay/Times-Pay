import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Header from './Header';
import globalStyle from '../styles/globalStyle';
import router from '../utils/router';
import { Card, CardContent, CardHeader, Drawer, Button, StylesProvider, createGenerateClassName, createStyles, withStyles } from '@material-ui/core';

const generateClassName = createGenerateClassName();
const styles = createStyles({
  ...globalStyle,
  colorPrimary: {
    color: "rgba(255, 255, 255, 1)"
  },
  root: {
    background: "rgba(0, 0, 0, 1)",
    color: "rgba(255, 255, 255, 1)"
  },
  modal: {
    background: "rgba(255, 255, 255, 0.4)"
  },
  paper: {
    background: "rgba(0, 0, 0, 1)",
    width: "25%"
  },
  fullWidthChildren: {
    width: "100%"
  },
  halfWidthChildren: {
    width: "75%",
    marginLeft: "25%"
  }
})
interface BasicLayoutProps {
  key: string;
  children: any;
  classes: any
}
interface BasicLayoutState {
  loading: boolean;
  sideMenuVisible: boolean
}
class BasicLayout extends React.Component<BasicLayoutProps, BasicLayoutState> {
  constructor(props: BasicLayoutProps) {
    super(props);
    this.state = {
      loading: false,
      sideMenuVisible: false
    }
  }
  componentDidMount() {
    this.setState({
      sideMenuVisible: false
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <StylesProvider
        generateClassName={generateClassName}
      >
        <Header
          sideMenuVisible={this.state.sideMenuVisible}
          openSideMenu={() => this.setState({ sideMenuVisible: !this.state.sideMenuVisible })}
        />
        <Drawer
          open={this.state.sideMenuVisible}
          classes={classes}
        >
          <List
            component={Card}
            classes={classes}
          >
            <Button
              onClick={() => this.setState({ sideMenuVisible: !this.state.sideMenuVisible })}
            >
              <CardHeader
                title="menu"
                avatar={<ArrowBackIosIcon color="primary" classes={classes} />}
                classes={classes}
              />
            </Button>
            {["home", "list", "create"].map((value: string) => (
              <ListItem>
                <CardContent classes={classes}>
                  <Link
                    href={router[value].url}
                    underline="none"
                  >
                    <ListItemText primary={router[value].name} classes={classes} />
                  </Link>
                </CardContent>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={this.state.sideMenuVisible ? classes.halfWidthChildren : classes.fullWidthChildren}>
          {this.props.children}
        </div>
      </StylesProvider>
    )
  }
}
export default withStyles(styles)(BasicLayout);