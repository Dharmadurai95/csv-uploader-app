(this["webpackJsonpupload-app"]=this["webpackJsonpupload-app"]||[]).push([[0],{108:function(e,t,a){e.exports=a(200)},113:function(e,t,a){},114:function(e,t,a){},117:function(e,t){},119:function(e,t){},129:function(e,t,a){},152:function(e,t,a){},153:function(e,t,a){},200:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(13),c=a.n(r),l=(a(113),a(114),a(58)),i=a(82),s=a(83),u=a(107),d=a(106),m=a(85),p=(a(129),a(50)),f=a.n(p),h=a(36),v=a(60),g=a.n(v);a(152),a(153);var b=function(){return o.a.createElement("div",{className:"spinner"})};g.a.setAppElement("#root");var E={overlay:{backgroundColor:"gray",zIndex:100},content:{top:"10%",left:"40px",right:"40px",bottom:"50px",border:"1px solid rgb(204, 204, 204)",background:"rgb(255, 255, 255)",overflow:"hidden",borderadius:"4px",outline:"none",padding:"20px"}},y=function(e){var t=Object(n.useState)(!0),a=Object(h.a)(t,2),r=a[0],c=a[1],l=Object(n.useState)(!1),i=Object(h.a)(l,2),s=i[0],u=i[1],d=Object(n.useState)(""),m=Object(h.a)(d,2),p=m[0],f=m[1],v=Object(n.useState)(!0),y=Object(h.a)(v,2),O=y[0],S=y[1],C=null;return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,{style:E,isOpen:r,shouldCloseOnOverlayClick:!0,onRequestClose:function(){c(!1),e.close()}},o.a.createElement("div",{className:"childContent"},o.a.createElement("iframe",{ref:function(e){return C=e},src:function(){if(e.children&&e.children.href){var t=e.children.href;return s||(u(!0),f("results/Zip.html"===t?"map":"html")),t}var a=e.children.src;if(e.children&&a)return s||(u(!0),f("img")),a}(),title:"Detailed View",className:p,allowFullScreen:!0,allowpaymentrequest:"true",style:{transform:"scale(1)"},onLoad:function(){C.contentWindow.document.querySelector("body").className="body",S(!1)}}," "),O?o.a.createElement(b,null):""),o.a.createElement("button",{className:"buttonClose",onClick:function(){c(!1),e.close()}},"x")))},O=a(203),S=a(204),C=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={csvCollection:"",loading:!1,singleImageSource:"",filesPerPage:25,currentPageNo:1,topList:""},e.handleOnDrop=function(t){e.setState({csvCollection:t,loading:""})},e.renderTableBodyData=function(){var t,a=Object(l.a)(e.state.csvCollection).slice(0);t=a.slice(3),e.state.topList&&(t=a.slice(2));var n,r,c=e.state,i=c.filesPerPage;return n=(r=i*c.currentPageNo)-i,t.slice(n,r).map((function(e,t){return o.a.createElement("tr",{key:"outerBody".concat(t)},e.data.map((function(e,t){return o.a.createElement("td",{key:"innerBody".concat(t)}," ",f()(e)," ")})))}))},e.renderTableHeadData=function(){var t=Object(l.a)(e.state.csvCollection).slice(0),a=t.slice(0,3);return a&&a[2]&&a[2].data&&(a[2].data.every((function(e){return/<\/?[a-z][\s\S]*>/i.test(e)}))||(a=t.slice(0,2),e.setState({topList:!0}))),a.map((function(t,a){return o.a.createElement("tr",{key:"outerHead".concat(a)},t.data.map((function(t,a){return/<\/?[a-z][\s\S]*>/i.test(t)?o.a.createElement("td",{key:Object(S.a)(),onClick:function(a){a.preventDefault();var n=Object.assign({},f()(t)).props;e.openModal(n)}},f()(t)):o.a.createElement("td",{key:Object(S.a)()},t)})))}))},e.handleOnError=function(e,t,a,n){console.log(e)},e.handleOnRemoveFile=function(t){console.log(t,"removed"),e.setState({csvCollection:"",topList:!1})},e.openModal=function(t){(t&&t.src||t&&t.href)&&e.setState({singleImageSource:t})},e.closeModal=function(){e.setState({singleImageSource:""})},e.paginationHanlder=function(t,a){e.setState({filesPerPage:a,currentPageNo:t})},e}return Object(s.a)(a,[{key:"componentDidUpdate",value:function(e,t){t.top!==this.state.topList&&this.renderTableHeadData()}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"uploader"},o.a.createElement("div",{className:"uploaderCard"},o.a.createElement(m.a,{onDrop:this.handleOnDrop,onError:this.handleOnError,addRemoveButton:!0,onRemoveFile:this.handleOnRemoveFile},o.a.createElement("span",null,"Click (Drop) Upload  Your  file"))),this.state.csvCollection&&o.a.createElement("div",{className:"pagination"},o.a.createElement(O.a,{total:this.state.csvCollection.length,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," of ").concat(e," items")},defaultPageSize:25,defaultCurrent:1,pageSizeOptions:["25","50","100","500"],onChange:function(t,a){return e.paginationHanlder(t,a)}})),o.a.createElement("div",{className:"tableData",key:"table"},this.state.csvCollection&&o.a.createElement("table",{className:"table"},o.a.createElement("thead",{key:"theadHead"},this.renderTableHeadData()),o.a.createElement("tbody",{key:"theadBody"},this.renderTableBodyData()))),this.state.singleImageSource?o.a.createElement(y,{close:this.closeModal},this.state.singleImageSource):"")}}]),a}(n.PureComponent);var k=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(C,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(199);c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[108,1,2]]]);
//# sourceMappingURL=main.e4f6221e.chunk.js.map