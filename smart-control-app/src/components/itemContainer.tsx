import React from "react";
import { PropsWithChildren } from "react"
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({ name: 'items-container' })(() => ({
    root: {
        display:'flex',
        gap:'20px',
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    item: {
        minWidth: 300,
        flexGrow: 1,
        flexBasis: 0
    }
}))

export const ItemContainer = (props: PropsWithChildren) => {
    const { children } = props;
    const { classes } = useStyles();
    
    const childrenStyled = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...child.props, className: classes.item });
        }
        return child;
    });
      
    return (
        <div className={classes.root}>
            {childrenStyled}
            <div className={classes.item}/>
            <div className={classes.item}/>
            <div className={classes.item}/>
        </div>
    );
}