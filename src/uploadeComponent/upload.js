import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse';
import './uploader.css';
import parse from 'html-react-parser';
import Modal from './modalComponent/modal';
import { Pagination } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import MyResponsiveBar from '../chart/chart';
import _ from 'lodash'


let dd;



export default class Uploader extends Component {
    state = {
        csvCollection: '',
        singleImageSource: '',
        filesPerPage: 25,
        currentPageNo: 1,
        topList: '',
        currentPost: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.top !== this.state.topList && this.state.cs) {
            this.renderTableHeadData();
        }
        // if(prevState.chart !== this.state.chart) {
        //     this.renderTableBodyData();
        // }

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.chart
    // }

    handleOnDrop = (data) => {
        this.setState({
            csvCollection: data,
            loading: ''
        })

    }
    //pagenumber and  post per page functionality 

    pageNumberHandler = () => {
        let [...data] = this.state.csvCollection;
        console.log(data, 'data')
        let remainData;
        remainData = data.slice(3)
        if (this.state.topList) {
            remainData = data.slice(2)

        }
        let { filesPerPage, currentPageNo } = this.state;


        let indexOfFirstFile, indexOfLastFile, currentPost;
        indexOfLastFile = filesPerPage * currentPageNo;
        indexOfFirstFile = indexOfLastFile - filesPerPage;
        currentPost = remainData.slice(indexOfFirstFile, indexOfLastFile)
        return currentPost
    }

    renderTableBodyData = () => {

        let currentPost = this.pageNumberHandler()
        // let chart = this.chardHanler(currentPost);
        // if (chart) {
        //     console.log('hello world')
        //     return <MyResponsiveBar data={chart} />
        // } 

        //loop through the all incoming data and render the table formats 
        return currentPost.map((data, index) => {

            return (
                <tr key={`outerBody${index}`}>
                    {data.data.map((bodyValues, index) => {
                        return <td key={`innerBody${index}`} > {parse(bodyValues)} </td>
                    })}
                </tr>
            )
        })
    }
    // table head data
    renderTableHeadData = () => {
        let [...head] = this.state.csvCollection;
        let topRows = head.slice(0, 3);
        let determineRows
        if (topRows && topRows[2] && topRows[2]['data']) {
            determineRows = topRows[2]['data'];
            if (!determineRows.every((dat) => (/<\/?[a-z][\s\S]*>/i.test(dat)))) {
                topRows = head.slice(0, 2)
                this.setState({ topList: true })
            }
        }
        return topRows.map((data, index) => {
            return (
                <tr key={`outerHead${index}`}>
                    {data.data.map((innerData, indes) => {
                        if (/<\/?[a-z][\s\S]*>/i.test(innerData)) {
                            return (
                                <td
                                    key={uuidv4()}
                                    onClick={e => {
                                        e.preventDefault();
                                        let { props } = Object.assign({}, parse(innerData));
                                        this.openModal(props);
                                    }}
                                >
                                    {parse(innerData)}
                                </td>
                            );
                        }
                        return <td key={uuidv4()}>{innerData}</td>
                    })}
                </tr>
            )
        })

    }

    //csv file error hadler
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    // csv file remove 
    handleOnRemoveFile = (data) => {
        console.log(data, 'removed')
        this.setState({
            csvCollection: '',
            topList: false

        })
    }

    //modal open handler functionality
    openModal = (openModal) => {
        if ((openModal && openModal.src) || (openModal && openModal.href)) {
            this.setState({
                singleImageSource: openModal
            })
        }

    }
    //modal close fucntionality
    closeModal = () => {
        this.setState({
            singleImageSource: ''
        })
    }

    //pagination handler 
    paginationHanlder = (page, pageSize) => {
        this.setState({
            filesPerPage: pageSize,
            currentPageNo: page
        })
    }

    //chart data functionality
    chartDataFunctionality = () => {
        let currentPost = this.pageNumberHandler()
        let chart = this.chardHanler(currentPost);
        if (chart) {
           let addIndex = chart.map((value,index)=> {
                 return {...value,Row :`Row${index + 1}`}
            })
             console.log(chart,'chartARR')
             return <MyResponsiveBar data={addIndex} />
        } 

    }

    //table chart handler
    chardHanler = (data) => {
        const title = this.state.csvCollection
                    // let chartData = {};
                    // let chartArr = []
                    // Object.keys(data).map((val, ind) =>
                    //     data[val].data.map((value, index) => {
                    //         if (!isNaN(value)) {
                    //            
                    // if(index == )
                    // console.log(dataTitle,'lwnth')
                    //             if (chartData[dataTitle]) {
                    //                chartData[dataTitle]["data"].push(value)      
                    //             } else {
                    //                 chartData[dataTitle] = {data:[value]}
                    //             }

                    //         }
                    //chartArr.push(chartData)
                    //     })

                    // )
                    // console.log(chartData,chartArr, 'what are titles are there')
        return data.map((val, index) => {
            let Title = []
            let object = Object.assign({}, val.data);
            let finalValue = Object.values(object).filter((v, index) => {
                if (!isNaN(v)) {
                    let dataTitle = title[0]['data'][index];
                    if (!Title.includes(dataTitle)) {
                        Title.push(dataTitle)
                       console.log(typeof(v))
                        return parseInt(v);
                    }
                }
            });
            let ChartData = _.zipObject(Title, finalValue);
            return ChartData
        })
    }
    render() {
        // let arrOrNot = Array.isArray(dd) ? <div>{<MyResponsiveBar data={dd} /> }</div>: ;
        console.log()
        return (<div className='uploader'>
          
            <div className='uploaderCard' >
                <CSVReader
                    onDrop={this.handleOnDrop}
                    onError={this.handleOnError}
                    addRemoveButton
                    onRemoveFile={this.handleOnRemoveFile}
                >
                    <span>Click (Drop) Upload  Your  file</span>
                </CSVReader>
            </div>
           {this.state.csvCollection && <div class='chartDiv'>
                {this.chartDataFunctionality()}
            </div>}
            {this.state.csvCollection && <div className='pagination'>
                <Pagination
                    total={this.state.csvCollection.length}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={25}
                    defaultCurrent={1}
                    pageSizeOptions={["25", "50", "1.00", "500"]}
                    onChange={(page, pageSize) => this.paginationHanlder(page, pageSize)}
                />
            </div>}
            <div className='tableData' key={"table"}>
                {this.state.csvCollection && (
                    <table className='table'>
                        <thead key={'theadHead'}>
                            {this.renderTableHeadData()}
                        </thead>
                        <tbody key={"theadBody"}>
                            {this.renderTableBodyData()}
                        </tbody>
                    </table>
                )}
            </div>
            {this.state.singleImageSource ? <Modal close={this.closeModal}>{(this.state.singleImageSource)}</Modal> : ''}
        </div>
        )
    }
}