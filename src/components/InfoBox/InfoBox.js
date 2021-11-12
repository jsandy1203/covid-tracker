import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import './InfoBox.css';

function InfoBox({ title, cases, total, active, ...props }) {
  return (
    <Card onClick={props.onClick} className={`infobox ${active && 'infobox_selected'}`}>
      <CardContent>
        <Typography color="textSecondary" className="infobox_title">
            {title}
        </Typography>
        <h2 className="infobox_cases">{cases}</h2>
        <Typography color="textSecondary" className="infobox_total">
            {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
