import React, { useState } from 'react';
import Modal from 'react-modal';
import './modal.css';
import Spinner from '../../spinner/spinner'
Modal.setAppElement("#root");

const customStyle = {
    overlay: {
        backgroundColor: 'gray',
        zIndex: 100,

    },
    content: {
        top: "10%",
        left: "40px",
        right: "40px",
        bottom: "50px",
        border: "1px solid rgb(204, 204, 204)",
        background: "rgb(255, 255, 255)",
        overflow: "hidden",
        borderadius: "4px",
        outline: "none",
        padding: "20px",
    }

}

const UploadModal = (props) => {
    const [stateModal, setstateModal] = useState(true);
    const [htmlFind, sethtmlFind] = useState(false)
    const [iframeClass, setiframeClass] = useState('');
    const [loading, setloading] = useState(true)

    let iframeRef = null;


    const render = () => {
        if (props.children && props.children['href']) {
            let { href } = props.children;
            if (!htmlFind) {
                sethtmlFind(true)
                if (href === 'results/Zip.html') {
                    setiframeClass('map')
                } else {
                    setiframeClass('html');
                }
            }
            return href;
        }
        let imgSrc = props.children.src;
        if (props.children && imgSrc) {
            if (!htmlFind) {
                sethtmlFind(true);
                setiframeClass('img');
            }
            return imgSrc;

        }
    }
    let styleFunction = () => {
        let iframeBody = iframeRef.contentWindow.document.querySelector('body');
        iframeBody.className = 'body';
        setloading(false)
    }

    return (
        <>
            <Modal style={customStyle} isOpen={stateModal} shouldCloseOnOverlayClick onRequestClose={() => { setstateModal(false); props.close() }}>
                <div className='childContent'>
                    <iframe
                        ref={(iframe) => iframeRef = iframe}
                        src={render()}
                        title="Detailed View"
                        className={iframeClass}
                        allowFullScreen={true}
                        allowpaymentrequest={"true"}
                        style={{ transform: "scale(1)" }}
                        onLoad={styleFunction}
                    > </iframe>
                    {loading ? <Spinner /> : ''}

                </div>
                <button className={"buttonClose"} onClick={() => { setstateModal(false); props.close() }}>x</button>
            </Modal>
        </>
    )
};
export default UploadModal;


