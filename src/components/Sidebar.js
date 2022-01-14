import React from 'react';
import styled from 'styled-components';
import { FiberManualRecord, Create, InsertComment, Drafts, Inbox, BookmarkBorder, PeopleAlt, FileCopy, ExpandLess, Apps, ExpandMore, Add} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import { db, auth } from '../firebase';
import { query, collection } from '@firebase/firestore';
import { useCollection} from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
function Sidebar() {
    const [user] = useAuthState(auth);
    const q = query(collection(db,'rooms'))
    const [ channels ] = useCollection(q);
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>{ user.displayName.split(' ')[0]} </h2>
                    <h3>
                        <FiberManualRecord />
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>
            <SidebarOption Icon={InsertComment} title='Threads' />
            <SidebarOption Icon={Inbox} title='Mentions & reactions'/>
            <SidebarOption Icon={Drafts} title='Saved Items'/>
            <SidebarOption Icon={BookmarkBorder} title='Channel Browser'/>
            <SidebarOption Icon={PeopleAlt} title='People & user groups'/>
            <SidebarOption Icon={Apps} title='Apps'/>
            <SidebarOption Icon={FileCopy} title='file browser'/>
            <SidebarOption Icon={ExpandLess} title='Show less'/>
            <hr />
            <SidebarOption Icon={ExpandMore} title='show more' />
            <hr />
            <SidebarOption Icon={Add} title='Add Channel' addChannelOption />

            {channels?.docs.map(doc=> (
                <SidebarOption title={doc.data().name} key={doc.id} id={doc.id} />
            ))}
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    background:var(--slack-color);
    color:white;
    flex:0.3;
    max-width:260px;
    margin-top:60px;
    border-top:1px solid #49274b;
    overflow-y : scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    > hr {
        margin-top:10px;
        margin-bottom:10px;
        border:1px solid #49274b;
    }
    @media (max-width: 740px) {
        flex : 0.2;
    }
`
const SidebarHeader = styled.div`
    display:flex;
    border-bottom:1px solid #49274b;
    padding:13px;

    > .MuiSvgIcon-root {
        padding:8px;
        color:#49274b;
        font-size:18px;
        background:white;
        border-radius:999px;
    }
    @media (max-width: 740px) {
        display : none;
    }

`
const SidebarInfo = styled.div`
    flex:1;

    > h2 {
        font-size:15px;
        font-weight:900;
        margin-bottom:5px;
    }
    > h3 {
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items: center;
    }
    > h3 > .MuiSvgIcon-root {
        font-size:13px;
        color:green;
        margin-top:1px;
        margin-right:2px;
    }
`
