import React, { PureComponent } from 'react'
import { CSVReader } from 'react-papaparse';
import './uploader.css';
import parse from 'html-react-parser';
import Modal from './modalComponent/modal';
import { Pagination } from 'antd';
import { v4 as uuidv4 } from 'uuid';



export default class Uploader extends PureComponent {
    state = {
        csvCollection: '',
        loading: false,
        singleImageSource: '',
        filesPerPage: 25,
        currentPageNo: 1,
        topList: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.top !== this.state.topList) {
            this.renderTableHeadData();
        }
    }
    handleOnDrop = (data) => {
        this.setState({
            csvCollection: data,
            loading: ''
        })

    }

    renderTableBodyData = () => {
        let [...data] = this.state.csvCollection;
        let remainData;
        remainData = data.slice(3)
        if (this.state.topList) {
            remainData = data.slice(2)
            //  console.log(remainData,'hello remain data')
        } 

        
        let { filesPerPage, currentPageNo } = this.state;

        let indexOfFirstFile, indexOfLastFile, currentPost;
        indexOfLastFile = filesPerPage * currentPageNo;
        indexOfFirstFile = indexOfLastFile - filesPerPage;
        currentPost = remainData.slice(indexOfFirstFile, indexOfLastFile)

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
                this.setState({ topList:true})
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


    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    // csv file remove 
    handleOnRemoveFile = (data) => {
        console.log(data, 'removed')
        this.setState({
            csvCollection: '',
            topList:false

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
    render() {
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
            {this.state.csvCollection && <div className='pagination'>
                <Pagination
                    total={this.state.csvCollection.length}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={25}
                    defaultCurrent={1}
                    pageSizeOptions={["25", "50", "100", "500"]}
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