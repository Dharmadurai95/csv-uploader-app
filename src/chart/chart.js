import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import './chart.css'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = (props) => {
    console.log(props.data, 'props data')
    return (
        <div  className='chart'>
            <ResponsiveBar
                data={props.data}
                keys={Object.keys(props.data[0])}
                indexBy="Row"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'dark2' }}
                innerPadding={7}
                borderRadius={7}
                maxValue={999999191}
                minValue={-1}

                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 80,
                    tickRotation: -30,

                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Csv File Values',
                    legendPosition: 'middle',
                    legendOffset: -70,
                }}
                labelSkipWidth={4}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 118,
                        translateY: 21,
                        itemWidth: 79,
                        itemHeight: 43,
                        itemsSpacing: 3,
                        symbolSize: 23,
                        itemDirection: 'left-to-right'
                    }
                ]}
                animate={true}
                motionStiffness={100}
                motionDamping={17}
            />
        </div>
    )
}
export default MyResponsiveBar;