import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import moment from 'moment'

import { Link, withRouter } from 'react-router-dom'

import { logoutRequest, getUserName } from '../actions/auth'

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		width: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'absolute',
		display: 'flex',
	},
	grow: {
		flexGrow: 1
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0, // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar,
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	rightMargin: {
		marginRight: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
});

class Layout extends React.Component {
	state = {
		anchorEl: null
	}
	componentDidMount () {
		const { getUserName, userId } = this.props
		getUserName(userId)
	}
	componentDidUpdate () {
		const { getUserName, userId } = this.props
		getUserName(userId)
	}
	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	}
	handleClose = () => {
		this.setState({ anchorEl: null });
	}
	handleLogout = (history) => {
		this.setState({ anchorEl: null });
		this.props.logoutRequest(history)
	}
	render() {
		const { classes, isAuthenticated, logoutRequest, history, userName } = this.props
		const { anchorEl } = this.state
		const open = Boolean(anchorEl)
		const equipe = ["ALPHA", "ALPHA", "BRAVO", "BRAVO", "CHARLIE", "CHARLIE", "DELTA", "DELTA"]
		return (
			<div className={classes.root}>
				<AppBar position="absolute" className={classes.appBar}>
					<Toolbar>
						<Typography className={classes.grow} variant="h6" color="inherit" noWrap>
							<Link className={classes.link} to="/">GORE Norte</Link>
						</Typography>
						<Typography className={classes.rightMargin} variant="button" color="inherit" noWrap>{equipe[(moment().diff(moment([2019, 2, 1]), 'days') % 8)]}</Typography>
						{isAuthenticated ? (
							<div>
								<Button
									variant="text"
									size="small"
									aria-owns={open ? 'menu-appbar' : undefined}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle className={classes.leftIcon} />
									{userName}
								</Button>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={this.handleClose}
								>
									<MenuItem onClick={() => this.handleLogout(history)}>Logout</MenuItem>
								</Menu>
							</div>
						) : (
								<Button component={Link} to="/login" color="inherit">Login</Button>
							)}
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.toolbar} />
					<List component="nav">
						<ListItem button component={Link} to="/agentes">
							<ListItemText primary="Agentes" />
						</ListItem>
						<ListItem button component={Link} to="/escala">
							<ListItemText primary="Escala" />
						</ListItem>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.props.children}
				</main>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		userId: state.auth.userId,
		userName: state.auth.userName
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logoutRequest: (history) => dispatch(logoutRequest(history)),
		getUserName: (userId) => dispatch(getUserName(userId))
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout)))