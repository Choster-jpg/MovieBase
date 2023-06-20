import React from 'react';
import classes from "./CustomTabs.module.scss";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import FilledInput from "../FilledInput/FilledInput.jsx";
import ToggleFilterButton from "../ToggleFilterButton/ToggleFilterButton.jsx";
import BrowseItem from "../../items/BrowseItem/BrowseItem.jsx";
import ForYouItem from "../../items/ForYouItem/ForYouItem.jsx";

const CustomTabs = ({tabHeaders, tabPanels, setOpenedTab}) => {
    return (
        <Tabs className={classes.tabs} selectedTabClassName={classes.selectedTab}>
            <TabList className={classes.tabList}>
                {tabHeaders.map(element =>
                    <Tab className={classes.tab} onClick={() => {setOpenedTab(element)}}>
                        {element}
                    </Tab>
                )}
            </TabList>
            {tabPanels.map(element => <TabPanel>{element}</TabPanel>)}
        </Tabs>
    );
};

export default CustomTabs;