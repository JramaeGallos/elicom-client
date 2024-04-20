import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FolderIcon from '@mui/icons-material/Folder';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';


const Sidebar = (props) => {
    const state= props.state;
    const toggleDrawer= props.toggleDrawer;
    const userType= props.userType;
    const enrollmentStatus= props.enrollmentStatus;
    const transactionStatus = props.transactionStatus;
    const navigate = useNavigate();

    const student_option = ['Dashboard','Enrollment', 'Record']
    const instructor_option = ['Dashboard', 'MyClass']
    const clearance_option = ['Dashboard', 'Student Record']
    const registrar_option = ['Dashboard', 'Student Enrollment', 'Clearance Admin', 'Instructor Record', 'Manage Record']

    const iconList = {
        'dashboard': <HomeIcon/>,
        'enrollment': <SchoolIcon/>,
        'record': <FolderIcon/>,
        'myclass': <FolderIcon/>,
        'student record': <FolderIcon/>,
        'student enrollment': <GroupsIcon/>,
        'clearance admin': <FolderIcon/>,
        'instructor record': <FolderIcon/>,
        'manage record': <SettingsApplicationsIcon/>
    }

    const createLink = (text) => {
        const element = text.split(" ");
        if (element.length === 1){
            return text
        }
        else{
            return `${element[0]}-${element[1]}`
        }
    }

    const setUser = () =>{
        if (userType==='registrar'){
            return registrar_option
        }else if(userType === 'student'){
            return student_option
        }else if(userType === 'clearanceSign'){
            return clearance_option
        }else{
            return instructor_option
        }
    }

    const loadIcon = (key) => {
        return iconList[key]
    }

    const handleClick = (path) =>{
        navigate(
            `/${path}`,
            {
                state:{
                    enrollmentStatus: enrollmentStatus,
                    transactionStatus: transactionStatus
                }
            }
        )
    } 

    const list = (anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={() => toggleDrawer(anchor, false)}
        onKeyDown={() => toggleDrawer(anchor, false)}
        >
        <List>
            {setUser().map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={()=>{handleClick(createLink(text.toLowerCase()))}} >
                    <ListItemIcon > {loadIcon(text.toLowerCase())}</ListItemIcon>
                    <ListItemText> 
                        <Typography color={"#352f36"}>
                            <b> {text} </b>
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                PaperProps={{
                    sx: {
                      backgroundColor: "rgb(93, 138, 168)"
                    }
                }}
            >
                {list('left')}
            </Drawer>
            </React.Fragment>
        </div>
    );
}

export default Sidebar;