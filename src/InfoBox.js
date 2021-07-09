import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
export default function InfoBox({title, cases, total}) {
    return (
        <Card>
                <CardContent>
                   <Typography className="InfoBox_title" color="textSecondary"> 
                   {title}
                   <h4 className="Infobox_cases">{cases}</h4>
                   </Typography>

                   <Typography className="infoBox_total"  color="textSecondary">
                   {total}   Total
                   </Typography>
                   
                </CardContent>
        </Card>
    )
}
