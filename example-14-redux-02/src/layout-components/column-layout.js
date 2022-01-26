import React from 'react';

/**
 * Renders a column layout. A column layout is grid-based, where each column can be
 * sized as the user wishes.
 * 
 * @param columns The column definitions, or the number of equal-sized columns to have.
 * @param children The columns themselves
 * @param style Any additional styles to apply to this layout
 */
export function ColumnLayout({ columns, children, style }) {

    let colDefs = "1fr";
    if (columns) {
        if (isNaN(columns)) {
            colDefs = columns;
        }
        else {
            colDefs = new Array(columns).fill("1fr").join(" ");
        }
    }

    const divStyle = {
        display: "grid",
        gridAutoRows: "auto",
        gridTemplateColumns: colDefs,
        columnGap: "var(--std-spacing)",
        ...style
    }

    return <div style={divStyle}>{children}</div>;
}

/**
 * A single column within the column layout. Will automaticlly be set to lay out its own
 * children in a column which stretches its full allowed width. You may override these
 * default styles by supplying your own in the style property.
 * 
 * @param style Any additional styles to apply to this column
 * @param children The components to render inside this column
 */
export function Column({ style, children }) {
    const divStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        ...style
    }
    return <div style={divStyle}>{children}</div>
}