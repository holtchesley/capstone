(function(e){function t(t){for(var s,i,o=t[0],l=t[1],c=t[2],d=0,h=[];d<o.length;d++)i=o[d],r[i]&&h.push(r[i][0]),r[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(h.length)h.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={trends:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/static/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;n.push([5,"chunk-vendors"]),a()})({"0fd5":function(e,t,a){var s={"./af":"8206","./af.js":"8206","./ar":"cdac","./ar-dz":"7f26","./ar-dz.js":"7f26","./ar-kw":"8e88","./ar-kw.js":"8e88","./ar-ly":"cd65","./ar-ly.js":"cd65","./ar-ma":"e8d6","./ar-ma.js":"e8d6","./ar-sa":"a284","./ar-sa.js":"a284","./ar-tn":"64f7","./ar-tn.js":"64f7","./ar.js":"cdac","./az":"b139","./az.js":"b139","./be":"98e2","./be.js":"98e2","./bg":"a1a5","./bg.js":"a1a5","./bm":"4d0d","./bm.js":"4d0d","./bn":"e8ae","./bn.js":"e8ae","./bo":"bcf2","./bo.js":"bcf2","./br":"69f1","./br.js":"69f1","./bs":"24d1","./bs.js":"24d1","./ca":"3507","./ca.js":"3507","./cs":"d15f","./cs.js":"d15f","./cv":"7bfe","./cv.js":"7bfe","./cy":"1d35","./cy.js":"1d35","./da":"a019","./da.js":"a019","./de":"0cfa","./de-at":"edea","./de-at.js":"edea","./de-ch":"9aae","./de-ch.js":"9aae","./de.js":"0cfa","./dv":"1722","./dv.js":"1722","./el":"5390","./el.js":"5390","./en-SG":"2088","./en-SG.js":"2088","./en-au":"dad9","./en-au.js":"dad9","./en-ca":"6f13","./en-ca.js":"6f13","./en-gb":"6267","./en-gb.js":"6267","./en-ie":"80b1","./en-ie.js":"80b1","./en-il":"ad38","./en-il.js":"ad38","./en-nz":"39db","./en-nz.js":"39db","./eo":"1a30","./eo.js":"1a30","./es":"48a3","./es-do":"f306","./es-do.js":"f306","./es-us":"60bf","./es-us.js":"60bf","./es.js":"48a3","./et":"f891","./et.js":"f891","./eu":"a403","./eu.js":"a403","./fa":"ce14","./fa.js":"ce14","./fi":"fc14","./fi.js":"fc14","./fo":"2bf2","./fo.js":"2bf2","./fr":"c1e8","./fr-ca":"50a2","./fr-ca.js":"50a2","./fr-ch":"b087","./fr-ch.js":"b087","./fr.js":"c1e8","./fy":"4665","./fy.js":"4665","./ga":"b396","./ga.js":"b396","./gd":"056c","./gd.js":"056c","./gl":"efde","./gl.js":"efde","./gom-latn":"8e2c","./gom-latn.js":"8e2c","./gu":"533d","./gu.js":"533d","./he":"7520","./he.js":"7520","./hi":"d2f3","./hi.js":"d2f3","./hr":"7e79","./hr.js":"7e79","./hu":"148f","./hu.js":"148f","./hy-am":"6711","./hy-am.js":"6711","./id":"2b10","./id.js":"2b10","./is":"1feb","./is.js":"1feb","./it":"1b21","./it-ch":"8d2c","./it-ch.js":"8d2c","./it.js":"1b21","./ja":"926e","./ja.js":"926e","./jv":"5a78","./jv.js":"5a78","./ka":"5975","./ka.js":"5975","./kk":"cc93","./kk.js":"cc93","./km":"66e1","./km.js":"66e1","./kn":"5421","./kn.js":"5421","./ko":"1297","./ko.js":"1297","./ku":"16f8","./ku.js":"16f8","./ky":"3df9","./ky.js":"3df9","./lb":"c124","./lb.js":"c124","./lo":"20a5","./lo.js":"20a5","./lt":"c14a","./lt.js":"c14a","./lv":"c553","./lv.js":"c553","./me":"ae25","./me.js":"ae25","./mi":"6f56","./mi.js":"6f56","./mk":"c8fc","./mk.js":"c8fc","./ml":"752d","./ml.js":"752d","./mn":"f09e","./mn.js":"f09e","./mr":"0a56","./mr.js":"0a56","./ms":"55b6","./ms-my":"a9e9","./ms-my.js":"a9e9","./ms.js":"55b6","./mt":"624b","./mt.js":"624b","./my":"e256","./my.js":"e256","./nb":"e1d5","./nb.js":"e1d5","./ne":"761a","./ne.js":"761a","./nl":"a0f2","./nl-be":"5cb2","./nl-be.js":"5cb2","./nl.js":"a0f2","./nn":"4fda","./nn.js":"4fda","./pa-in":"2f2f","./pa-in.js":"2f2f","./pl":"317f","./pl.js":"317f","./pt":"5553","./pt-br":"a9ab","./pt-br.js":"a9ab","./pt.js":"5553","./ro":"db12","./ro.js":"db12","./ru":"7aa4","./ru.js":"7aa4","./sd":"e87b","./sd.js":"e87b","./se":"a296","./se.js":"a296","./si":"51ec","./si.js":"51ec","./sk":"608b","./sk.js":"608b","./sl":"b367","./sl.js":"b367","./sq":"f68f","./sq.js":"f68f","./sr":"0991","./sr-cyrl":"c577","./sr-cyrl.js":"c577","./sr.js":"0991","./ss":"cf76","./ss.js":"cf76","./sv":"0153","./sv.js":"0153","./sw":"cb6f","./sw.js":"cb6f","./ta":"8bfa","./ta.js":"8bfa","./te":"668b","./te.js":"668b","./tet":"eae7","./tet.js":"eae7","./tg":"70b1","./tg.js":"70b1","./th":"7180","./th.js":"7180","./tl-ph":"f8bb","./tl-ph.js":"f8bb","./tlh":"b026","./tlh.js":"b026","./tr":"371d","./tr.js":"371d","./tzl":"c744","./tzl.js":"c744","./tzm":"787a","./tzm-latn":"71e0","./tzm-latn.js":"71e0","./tzm.js":"787a","./ug-cn":"6b5c","./ug-cn.js":"6b5c","./uk":"8c0c","./uk.js":"8c0c","./ur":"519e","./ur.js":"519e","./uz":"7982","./uz-latn":"3137","./uz-latn.js":"3137","./uz.js":"7982","./vi":"ae22","./vi.js":"ae22","./x-pseudo":"1129","./x-pseudo.js":"1129","./yo":"b4bf","./yo.js":"b4bf","./zh-cn":"fdc4","./zh-cn.js":"fdc4","./zh-hk":"747d","./zh-hk.js":"747d","./zh-tw":"d3e0","./zh-tw.js":"d3e0"};function r(e){var t=n(e);return a(t)}function n(e){var t=s[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}r.keys=function(){return Object.keys(s)},r.resolve=n,e.exports=r,r.id="0fd5"},"2b98":function(e,t,a){"use strict";a.r(t);var s,r,n,i,o=a("a4b5"),l=a("4af9"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm(t)}}},[a("div",{staticClass:"form-row query-row"},[a("div",{staticClass:"col pr-0"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.textToGraph,expression:"textToGraph"}],ref:"textToGraph",staticClass:"text-to-graph",attrs:{"aria-label":"terms to graph"},domProps:{value:e.textToGraph},on:{input:function(t){t.target.composing||(e.textToGraph=t.target.value)}}})]),a("loading-button",{staticClass:"col-auto pl-0",attrs:{showLoading:e.showLoading}},[e._v("Graph")]),a("div",{staticClass:"col-auto"},[a("button",{ref:"helpButton",staticClass:"btn-secondary ",attrs:{type:"button","data-toggle":"collapse","data-target":"#helpPanel","aria-expanded":"false","aria-controls":"helpPanel"}},[e._v("\n          ADVANCED\n        ")])])],1),a("div",{staticClass:"collapse card",attrs:{id:"helpPanel",tabindex:"-1"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.$refs.helpButton.click()}}},[a("div",{staticClass:"card-body"},[e._m(1),a("h5",[e._v("Search tips")]),a("p",[e._v("\n          Search for phrases of one to three words. Multiple phrases can be separated by commas. Do not use quotes.\n          All searches are case-insensitive. Examples:\n        ")]),a("ul",{staticClass:"bullets"},[a("li",[a("example-link",{attrs:{query:"piracy"}}),e._v(' (history of the term "piracy")')],1),a("li",[a("example-link",{attrs:{query:"his or her"}}),e._v(' (history of the term "his or her")')],1),a("li",[a("example-link",{attrs:{query:"apple, banana, orange, pear"}}),e._v(' (compare "apple" to "banana" to "orange" to "pear")')],1),a("li",[a("example-link",{attrs:{query:"he said, she said"}}),e._v(' (compare "he said" to "she said")')],1)]),a("h5",{staticClass:"card-title"},[e._v("Wildcard search")]),a("p",[e._v('\n          Replace the final word of a phrase with "*" to perform a wildcard search. This will return the top ten\n          phrases beginning with your first one or two words. Wildcards are currently allowed only as the final\n          word in a phrase. Examples:\n        ')]),a("ul",{staticClass:"bullets"},[a("li",[a("example-link",{attrs:{query:"constitutional *"}}),e._v(' (top ten two-word phrases beginning with "constitutional")')],1),a("li",[a("example-link",{attrs:{query:"ride a *"}}),e._v(' (top ten three-word phrases beginning with "ride a")')],1),a("li",[e._v("* amendment (not currently supported)")])]),a("h5",{staticClass:"card-title"},[e._v("Jurisdiction search")]),a("p",[e._v("\n          Limit a term to a particular jurisdiction (US state or state-level political division) by starting the term with\n          that jurisdiction's code. Available jurisdiction codes are listed below. Examples:\n        ")]),a("ul",{staticClass:"bullets"},[a("li",[a("example-link",{attrs:{query:"cal: gold mine"}}),e._v(' (history of the term "gold mine" in California)')],1),a("li",[a("example-link",{attrs:{query:"me: lobster, cal: gold, tex: cowboy"}}),e._v(' (compare "lobster" in Maine, "gold" in California, and "cowboy" in Texas)')],1)]),a("p",[e._v('\n          Show all jurisdictions separately by using the special jurisdiction code "*". Examples:\n        ')]),a("ul",{staticClass:"bullets"},[a("li",[a("example-link",{attrs:{query:"*: gold"}}),e._v(' (compare "gold" in all jurisdictions separately)')],1)]),a("h5",{staticClass:"card-title"},[e._v("Jurisdiction codes")]),a("div",{staticClass:"row"},e._l(e.jurisdictions,function(t){return a("div",{key:t[0],staticClass:"col-4"},[a("p",[e._v("\n              "+e._s(t[1])+': "'),a("a",{attrs:{href:"?q="+t[0]+"}: "},on:{click:function(a){return a.preventDefault(),e.appendJurisdictionCode(t[0])}}},[e._v(e._s(t[0])+":")]),e._v('"\n            ')])])}),0)])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 description small"},[e._v("\n        Example searches:\n        "),a("example-link",{attrs:{query:"piracy"}}),e._v(" /\n        "),a("example-link",{attrs:{query:"he said, she said"}}),e._v(" /\n        "),a("example-link",{attrs:{query:"ride a *"}}),e._v(" /\n        "),a("example-link",{attrs:{query:"me: lobster, cal: gold, tex: cowboy"}}),e._v(" /\n        "),a("example-link",{attrs:{query:"*: gold"}}),e._v(" /\n        "),a("a",{attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.$refs.helpButton.click()}}},[e._v("more ...")])],1)])]),e.errors.length?a("div",{staticClass:"row"},[a("ul",{staticClass:"small alert-danger"},e._l(e.errors,function(t){return a("li",[e._v(e._s(t))])}),0)]):e._e(),e.chartData.datasets.length>0?a("div",{staticClass:"row graph-menu"},[a("div",{staticClass:"col-auto ml-auto"},[a("panelset-button",{attrs:{"panel-id":"options","current-panel":e.currentPanel,"aria-label":"Customize graph display",title:"Customize"}},[a("img",{attrs:{src:e.urls.static+"img/icons/settings.svg"}})]),a("panelset-button",{attrs:{"panel-id":"table","current-panel":e.currentPanel,"aria-label":"View as table",title:"Table view"}},[a("img",{attrs:{src:e.urls.static+"img/icons/view_list.svg"}})]),a("panelset-button",{attrs:{"panel-id":"cite","current-panel":e.currentPanel,"aria-label":"Cite graph",title:"Cite"}},[a("img",{attrs:{src:e.urls.static+"img/icons/school.svg"}})]),a("panelset-button",{attrs:{"panel-id":"download","current-panel":e.currentPanel,"aria-label":"Download graph",title:"Download"}},[a("img",{attrs:{src:e.urls.static+"img/icons/download.svg"}})])],1)]):e._e(),a("div",{attrs:{id:"collapsePanels"}},[a("panelset-panel",{attrs:{"panel-id":"options","current-panel":e.currentPanel}},[a("h5",[e._v("Customize graph display")]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"min-year"}},[e._v("Year range: from")]),a("input",{directives:[{name:"model",rawName:"v-model.lazy.number",value:e.minYear,expression:"minYear",modifiers:{lazy:!0,number:!0}}],attrs:{id:"min-year",type:"number",min:"1640",max:"2018"},domProps:{value:e.minYear},on:{change:function(t){e.minYear=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}}),a("label",{attrs:{for:"max-year"}},[e._v(" To")]),a("input",{directives:[{name:"model",rawName:"v-model.lazy.number",value:e.maxYear,expression:"maxYear",modifiers:{lazy:!0,number:!0}}],attrs:{id:"max-year",type:"number",min:"1640",max:"2018"},domProps:{value:e.maxYear},on:{change:function(t){e.maxYear=e._n(t.target.value)},blur:function(t){return e.$forceUpdate()}}})]),a("fieldset",{staticClass:"form-group",attrs:{"aria-describedby":"percentOrAbsHelpText"}},[a("p",{staticClass:"form-text",attrs:{id:"percentOrAbsHelpText"}},[e._v("\n          Show count as a percentage of all grams for the year, or an absolute number?\n        ")]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.percentOrAbs,expression:"percentOrAbs"}],staticClass:"form-check-input",attrs:{type:"radio",name:"percentOrAbs",id:"percentOrAbs1",value:"percent"},domProps:{checked:e._q(e.percentOrAbs,"percent")},on:{change:function(t){e.percentOrAbs="percent"}}}),a("label",{staticClass:"form-check-label",attrs:{for:"percentOrAbs1"}},[e._v("Percentage")])]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.percentOrAbs,expression:"percentOrAbs"}],staticClass:"form-check-input",attrs:{type:"radio",name:"percentOrAbs",id:"percentOrAbs2",value:"absolute"},domProps:{checked:e._q(e.percentOrAbs,"absolute")},on:{change:function(t){e.percentOrAbs="absolute"}}}),a("label",{staticClass:"form-check-label",attrs:{for:"percentOrAbs2"}},[e._v("Absolute number")])])]),a("fieldset",{staticClass:"form-group",attrs:{"aria-describedby":"countTypeHelpText"}},[a("p",{staticClass:"form-text",attrs:{id:"countTypeHelpText"}},[e._v("\n          Show count of cases containing your term, or count of individual instances of your term?\n        ")]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.countType,expression:"countType"}],staticClass:"form-check-input",attrs:{type:"radio",name:"countType",id:"countType1",value:"doc_count"},domProps:{checked:e._q(e.countType,"doc_count")},on:{change:function(t){e.countType="doc_count"}}}),a("label",{staticClass:"form-check-label",attrs:{for:"countType1"}},[e._v("Case count")])]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.countType,expression:"countType"}],staticClass:"form-check-input",attrs:{type:"radio",name:"countType",id:"countType2",value:"count"},domProps:{checked:e._q(e.countType,"count")},on:{change:function(t){e.countType="count"}}}),a("label",{staticClass:"form-check-label",attrs:{for:"countType2"}},[e._v("Instance count")])])]),a("fieldset",{staticClass:"form-group",attrs:{"aria-describedby":"sameYAxisHelpText"}},[a("p",{staticClass:"form-text",attrs:{id:"sameYAxisHelpText"}},[e._v("\n          Show all terms on the same Y axis (for comparing frequency) or scale each term to fill the Y axis (for\n          comparing correlation)?\n        ")]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sameYAxis,expression:"sameYAxis"}],staticClass:"form-check-input",attrs:{type:"radio",name:"sameYAxis",id:"sameYAxis1"},domProps:{value:!0,checked:e._q(e.sameYAxis,!0)},on:{change:function(t){e.sameYAxis=!0}}}),a("label",{staticClass:"form-check-label",attrs:{for:"sameYAxis1"}},[e._v("Terms on the same Y axis")])]),a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sameYAxis,expression:"sameYAxis"}],staticClass:"form-check-input",attrs:{type:"radio",name:"sameYAxis",id:"sameYAxis2"},domProps:{value:!1,checked:e._q(e.sameYAxis,!1)},on:{change:function(t){e.sameYAxis=!1}}}),a("label",{staticClass:"form-check-label",attrs:{for:"sameYAxis2"}},[e._v("Terms scaled to fill Y axis")])])]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"formControlRange"}},[e._v("Smoothing")]),a("p",{staticClass:"form-text",attrs:{id:"smoothingFactorHelpText"}},[e.smoothingFactor>0?a("span",[e._v("\n            Data points will be averaged with the nearest "+e._s(e.smoothingFactor)+"% of other points.\n          ")]):a("span",[e._v("\n            No smoothing will be applied.\n          ")])]),a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.smoothingFactor,expression:"smoothingFactor",modifiers:{lazy:!0}}],staticClass:"form-control-range",attrs:{type:"range",min:"0",max:"10",id:"formControlRange"},domProps:{value:e.smoothingFactor},on:{change:function(t){e.smoothingFactor=t.target.value}}})])]),a("panelset-panel",{attrs:{"panel-id":"table","current-panel":e.currentPanel}},[a("h5",[e._v("Table View")]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-sm"},[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[e._v("Year")]),e._l(e.chartData.datasets,function(t){return a("th",{attrs:{scope:"col"}},[e._v(e._s(t.label))])})],2)]),a("tbody",e._l(e.chartData.labels,function(t,s){return a("tr",[a("th",{attrs:{scope:"row"}},[e._v(e._s(t))]),e._l(e.chartData.datasets,function(t){return a("td",[e._v(e._s(e.formatValue(t.data[s])))])})],2)}),0)])])]),a("panelset-panel",{attrs:{"panel-id":"cite","current-panel":e.currentPanel}},[a("h5",[e._v("Scholarly Citation and Reuse")]),a("p",[e._v("\n        Version: Historical Trends dataset version "+e._s(e.datasetVersion)+", published "+e._s(e.datasetDate)+".\n      ")]),a("p",[e._v("Graphs on this page may be freely reproduced with credit. Suggested citation formats:")]),a("dl",{staticClass:"row"},[a("dt",{staticClass:"col-sm-3"},[e._v("APA")]),a("dd",{staticClass:"col-sm-9"},[e._v("\n          \"Graph of '"+e._s(e.textToGraph)+",'\"\n          by "+e._s(e.author)+", "+e._s(e.datasetYear)+", "+e._s(e.publication)+" v."+e._s(e.datasetVersion)+".\n          Retrieved [date], from "+e._s(e.currentUrl)+".\n        ")]),a("dt",{staticClass:"col-sm-3"},[e._v("MLA")]),a("dd",{staticClass:"col-sm-9"},[e._v("\"Graph of '"+e._s(e.textToGraph)+".'\"\n          "),a("i",[e._v(e._s(e.publication)+" v."+e._s(e.datasetVersion))]),e._v(",\n          "),e._v(e._s(e.author)+".\n          "),e._v(e._s(e.datasetDate)+",\n          "),e._v(e._s(e.currentUrl)+".\n          "),e._v("Accessed [date].\n        ")]),a("dt",{staticClass:"col-sm-3"},[e._v("Chicago / Turabian")]),a("dd",{staticClass:"col-sm-9"},[e._v('\n          Graph of "'+e._s(e.textToGraph)+'."\n          '+e._s(e.datasetYear)+". "+e._s(e.publication)+" v."+e._s(e.datasetVersion)+", "+e._s(e.author)+", Cambridge, MA.\n          "+e._s(e.currentUrl)+".\n        ")]),a("dt",{staticClass:"col-sm-3"},[e._v("Bluebook")]),a("dd",{staticClass:"col-sm-9"},[e._v(e._s(e.author)+", "),a("i",[e._v(e._s(e.publication)+" v."+e._s(e.datasetVersion))]),e._v(', Graph of "'+e._s(e.textToGraph)+'," '+e._s(e.currentUrl)+" (last visited [date]).")])])]),a("panelset-panel",{attrs:{"panel-id":"download","current-panel":e.currentPanel}},[a("h5",[e._v("Download")]),a("a",{attrs:{href:"#",download:"image.png"},on:{mousedown:e.setDownloadUrl,touchstart:e.setDownloadUrl}},[e._v("Download as an image")])])],1),a("div",{staticClass:"graph"},[a("div",{staticClass:"container graph-container"},[a("line-example",{ref:"chart",attrs:{chartData:e.chartData,options:e.chartOptions,styles:e.chartStyles}})],1)])])},u=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-title"},[a("h1",[e._v("Historical Trends")]),a("p",[e._v("\n      The "),a("a",{attrs:{href:"/"}},[e._v("Caselaw Access Project")]),e._v(" collects 360 years of United States caselaw from the Harvard Law\n      School Library — about 12 billion words in all. Our Historical Trends tool graphs the frequency\n      of words and phrases through time, similar to the Google Ngram Viewer.\n    ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"close h40.7em",attrs:{type:"button","data-toggle":"collapse","data-target":"#helpPanel","aria-controls":"helpPanel","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])}],d=(a("67c8"),a("baa4"),a("e1a2"),a("e612"),a("ef92"),a("043c"),a("62a9")),h=(a("0dbc"),a("2bf3"),a("950c"),a("6ac6"),a("20a4"),a("7b62"),a("8430")),p=(a("fa38"),a("0012"),a("5b54"),a("92ea")),m={extends:p["a"],mixins:[p["b"].reactiveProp],props:["options"],methods:{fullRerender:function(e,t){this.$data._chart&&this.$data._chart.destroy(),this.renderChart(e,t)}}},f=m,b=a("a6c2"),v=Object(b["a"])(f,s,r,!1,null,null,null),g=v.exports,y=a("52d6"),j={components:{PanelsetButton:o["a"].component("panelset-button",{props:["panelId","currentPanel"],template:'\n        <button class="btn-secondary"\n                type="button"\n                @click="$parent.currentPanel = (currentPanel === panelId?null:panelId)"\n                :aria-expanded="currentPanel === panelId"\n                :aria-controls="`${panelId}Panel`">\n          <slot></slot>\n        </button>\n      '}),PanelsetPanel:o["a"].component("panelset-panel",{props:["panelId","currentPanel"],template:'\n        <div class="card"\n             :id="`${panelId}Panel`"\n             v-if="currentPanel === panelId">\n          <div class="card-body">\n            <button type="button"\n                    @click="$parent.currentPanel = null"\n                    class="close h40.7em "\n                    :aria-controls="`${panelId}Panel`"\n                    aria-label="Close">\n              <span aria-hidden="true">&times;</span>\n            </button>\n            <slot></slot>\n          </div>\n        </div>\n      '})},data:function(){return{currentPanel:null}}},x=j,_=Object(b["a"])(x,n,i,!1,null,null,null),w=_.exports,k=a("8df7"),C=a.n(k),Y=a("4b68"),A=a.n(Y),T={name:"Main",mixins:[w],components:{LineExample:g,LoadingButton:y["a"],ExampleLink:o["a"].component("example-link",{template:'<router-link class="example-link" :to="`?q=${query}`">{{query}}</router-link>',props:["query"]})},beforeMount:function(){this.jurisdictions=[["*","Wildcard"]].concat(snippets.jurisdictions);var e=!0,t=!1,a=void 0;try{for(var s,r=this.jurisdictions[Symbol.iterator]();!(e=(s=r.next()).done);e=!0){var n=Object(h["a"])(s.value,2),i=n[0],o=n[1];this.jurisdictionLookup[i]=o}}catch(l){t=!0,a=l}finally{try{e||null==r.return||r.return()}finally{if(t)throw a}}this.urls=urls,A.a.pluginService.register({beforeDraw:this.beforeDraw,afterLayout:this.afterLayout})},mounted:function(){this.handleRouteUpdate(this.$route)},watch:{$route:function(e,t){this.handleRouteUpdate(e,t)},percentOrAbs:function(e){this.setNewQueries("percentOrAbs",e)},countType:function(e){this.setNewQueries("countType",e)},sameYAxis:function(e){this.setNewQueries("sameYAxis",e)},minYear:function(e){this.setNewQueries("minYear",e)},maxYear:function(e){this.setNewQueries("maxYear",e)},smoothingFactor:function(e){this.setNewQueries("smoothingFactor",e)}},data:function(){var e=this,t=400;return{baseUrl:window.location.origin+this.$router.options.base,currentYear:(new Date).getFullYear(),datasetVersion:"1.0",datasetDate:"June 6, 2019",datasetYear:"2019",author:"Harvard University",publication:"Caselaw Access Project Historical Trends",currentTab:null,chartHeight:t,chartData:{datasets:[]},chartNeedsRerender:!1,rawData:null,textToGraph:"apple pie, baseball",minYear:1800,maxYear:2018,minPossible:1640,maxPossible:2018,smoothingFactor:2,smoothingWindow:0,countType:"doc_count",percentOrAbs:"percent",sameYAxis:!0,previousSameYAxis:!0,jurisdictions:[],jurisdictionLookup:{},urls:{},selectedJurs:[],colors:["rgb(0,0,0)","rgb(73,0,146)","rgb(146,0,0)","rgb(0,73,73)","rgb(0,109,219)","rgb(146,73,0)","rgb(0,146,146)","rgb(182,109,255)","rgb(219,109,0)"],pointStyles:["circle","cross","crossRot","rect","rectRounded","rectRot","star","triangle"],errors:[],showLoading:!1,chartOptions:{responsive:!0,maintainAspectRatio:!1,legend:{labels:{boxWidth:20,usePointStyle:!0}},layout:{padding:{bottom:10}},scales:{yAxes:[{id:"0",type:"linear",gridLines:{color:"rgba(0, 0, 0, 0)"},ticks:{beginAtZero:!0}}],xAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}]},tooltips:{callbacks:{title:function(t,a){var s=t[0].label;if(!e.smoothingWindow)return s;var r=Math.max(a.labels[0],Number(s)-e.smoothingWindow),n=Math.min(a.labels[a.labels.length-1],Number(s)+e.smoothingWindow);return"".concat(r,"-").concat(n)},label:function(t,a){return a.datasets[t.datasetIndex].label+": "+e.formatValue(t.yLabel)}}}},chartStyles:{height:"".concat(t,"px")}}},computed:{currentUrl:function(){return this.baseUrl.slice(0,-1)+this.$route.fullPath}},methods:{formatValue:function(e){var t="count"===this.countType?"instances":"cases";return"percent"===this.percentOrAbs?"".concat(e.toPrecision(3),"% of ").concat(t):this.smoothingWindow?"about ".concat(e<10?e.toPrecision(2):Math.round(e)," ").concat(t," per year"):"".concat(e," ").concat(t)},isValidYear:function(e){return""===e||this.minPossible<=e&&e<=this.maxPossible},clampYears:function(){if(this.isValidYear(this.minYear)||(this.minYear=this.minPossible),this.isValidYear(this.maxYear)||(this.maxYear=this.maxPossible),this.maxYear&&this.minYear&&this.minYear>this.maxYear){var e=[this.maxYear,this.minYear];this.minYear=e[0],this.maxYear=e[1]}},range:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return e=Number(e),t=Number(t),Array(Math.ceil((t-e)/a)).fill(e).map(function(e,t){return e+t*a})},getTerms:function(e){var t=e.split(",");return t.map(function(e){return e.trim()})},submitForm:function(){var e={q:this.textToGraph,percentOrAbs:this.percentOrAbs,countType:this.countType,minYear:this.minYear,maxYear:this.maxYear,smoothingFactor:this.smoothingFactor};this.selectedJurs.length&&(e["jurs"]=this.selectedJurs),this.$router.push({path:"/",query:e})},handleRouteUpdate:function(e,t){var a=this,s=e.query;s.q&&(this.showLoading=this.$route.query.q!==this.textToGraph,this.textToGraph=this.$route.query.q),s.percentOrAbs&&(this.percentOrAbs=this.$route.query.percentOrAbs),s.countType&&(this.countType=this.$route.query.countType),s.sameYAxis&&(this.sameYAxis="true"===this.$route.query.sameYAxis),s.minYear&&(this.minYear=Number(this.$route.query.minYear)),s.maxYear&&(this.maxYear=Number(this.$route.query.maxYear)),s.smoothingFactor&&(this.smoothingFactor=Number(this.$route.query.smoothingFactor)),this.errors=[];var r=s.q;if(void 0!==r)if(r.trim()){var n=this.getTerms(r);Promise.all(n.map(function(e){var t=e.split(/\s/),s=Object(d["a"])(t),r=s[0],n=s.slice(1),i="";if(r.endsWith(":")){var o=r.slice(0,-1);if(!a.jurisdictionLookup[o])return a.errors.push('Unknown jurisdiction "'.concat(o,'". Options are: ').concat(Object.keys(a.jurisdictionLookup))),null;i="&jurisdiction="+encodeURIComponent(o),e=n.join(" ")}var l=a.urls.api_root+"ngrams/?q="+encodeURIComponent(e)+i;return fetch(l).then(function(e){if(!e.ok)throw e;return e.json()}).then(function(t){return 0===Object.keys(t.results).length?(a.errors.push('"'.concat(e,'" appears fewer than 100 times in our corpus.')),null):t.results})})).then(function(e){a.showLoading=!1;var t=a.parseResponse(e);0!==Object.keys(t.results).length&&(a.rawData=t,a.graphResults())}).catch(function(e){a.showLoading=!1,a.errors.push("Connection error: failed to load results"),console.log("Connection error:",e)})}else this.errors.push("Please enter text")},graphResults:C()(function(){var e=this;if(this.clampYears(),this.rawData){for(var t=[],a=this.rawData.minYear,s=this.rawData.maxYear,r=Math.max(a,this.minYear),n=Math.min(s,this.maxYear),i=this.rawData.colorOffset,o=!1,l=0,c=Object.entries(this.rawData.results);l<c.length;l++){var u=Object(h["a"])(c[l],2),d=u[0],p=u[1],m=p.map(function(t){return null===t?0:"absolute"===e.percentOrAbs?t[e.countType][0]:t[e.countType][0]/t[e.countType][1]*100});m=m.slice(r-a,n-a+1),m=this.movingAverage(m,n-r);var f=this.colors[i++%this.colors.length],b=n-r<50?3:0;t.push({label:d,borderColor:f,backgroundColor:"rgba(0, 0, 0, 0)",borderWidth:2,borderRadius:100,data:m,pointStyle:this.pointStyles[i%this.pointStyles.length],pointRadius:b,pointHitRadius:5,yAxisID:this.sameYAxis?"0":t.length.toString()})}var v=this.chartOptions.scales.yAxes;if(this.sameYAxis)v[0].display=!0;else if(v[0].display=!1,v.length<t.length){o=!0;for(var g=v.length;g<t.length;g++)v.push(Object.assign({},v[0],{id:g.toString()}))}this.sameYAxis!==this.previousSameYAxis&&(this.previousSameYAxis=this.sameYAxis,o=!0),this.chartData={labels:this.range(r,n+1),datasets:t},o&&this.$refs.chart.fullRerender(this.chartData,this.chartOptions)}},200),parseResponse:function(e){var t={},a=null,s=null,r=!0,n=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var c=o.value;if(null!==c)for(var u=0,d=Object.entries(c);u<d.length;u++)for(var p=Object(h["a"])(d[u],2),m=p[0],f=p[1],b=0,v=Object.entries(f);b<v.length;b++){var g=Object(h["a"])(v[b],2),y=g[0],j=g[1],x=new Array(this.maxPossible+1).fill(null),_=!0,w=!1,k=void 0;try{for(var C,Y=j[Symbol.iterator]();!(_=(C=Y.next()).done);_=!0){var A=C.value,T=A["year"];"total"!==T&&(T=parseInt(T,10),(null===a||a>T)&&(a=T),(null===s||s<T)&&(s=T),x[T]=A)}}catch(S){w=!0,k=S}finally{try{_||null==Y.return||Y.return()}finally{if(w)throw k}}t[("total"===y?"":this.jurisdictionLookup[y]+": ")+m]=x}}}catch(S){n=!0,i=S}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}for(var O=0,P=Object.keys(t);O<P.length;O++){var q=P[O];t[q]=t[q].slice(a,s+1)}var D=Math.floor(Math.random()*this.colors.length);return{colorOffset:D,minYear:a,maxYear:s,results:t}},movingAverage:function(e,t){var a=this,s=Math.floor(t*(this.smoothingFactor/100));return this.smoothingWindow=s,s<1?e:e.map(function(t,r){return a.average(e.slice(Math.max(r-s,0),Math.min(r+s,e.length)))})},average:function(e){return e.reduce(function(e,t){return e+t})/e.length},setNewQueries:function(e,t){var a=this.$route.query,s={};for(var r in a)s[r]=a[r];s[e]=t,this.$router.replace({path:"/",query:s})},appendJurisdictionCode:function(e){this.textToGraph&&(this.textToGraph+=", "),this.textToGraph+=e+": ",this.$refs.textToGraph.focus()},setDownloadUrl:function(e){var t=this.$refs.chart.$refs.canvas.toDataURL("image/png"),a=e.currentTarget;a.href=t},beforeDraw:function(e){var t=e.chart.ctx,a=t.canvas,s=a.clientWidth,r=a.clientHeight;t.save(),t.fillStyle="#FFF",t.fillRect(0,0,s,r),t.fillStyle="#888",t.font="10px Arial",t.textAlign="right",t.fillText("Caselaw Access Project".concat(s>400?" at Harvard Law School":"",". ").concat(this.baseUrl),s-5,r-11),t.restore()},afterLayout:function(e){var t="".concat(this.chartHeight-32+e.legend.height,"px");t!==this.chartStyles.height&&(this.chartStyles.height=t)}}},O=T,P=Object(b["a"])(O,c,u,!1,null,null,null),q=P.exports;o["a"].config.devtools=!0,o["a"].config.productionTip=!1,o["a"].use(l["a"]);var D=new l["a"]({mode:"history",base:"/trends/",routes:[{path:"/",component:q,name:"main"},{path:"*",redirect:"/"}]});new o["a"]({el:"#app",components:{Main:q},template:"<Main/>",router:D})},5:function(e,t,a){e.exports=a("2b98")},"52d6":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("button",{staticClass:"btn-create btn-primary"},[e._t("default"),e.showLoading?a("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):e._e()],2),e.showLoading?a("span",{staticClass:"sr-only",attrs:{id:"loading-focus",tabindex:"-1"}},[e._v("Loading")]):e._e()])},r=[],n={props:["showLoading"],watch:{showLoading:function(e,t){e&&setTimeout(function(){var e=document.querySelector("#loading-focus");e&&e.focus()})}}},i=n,o=a("a6c2"),l=Object(o["a"])(i,s,r,!1,null,null,null);t["a"]=l.exports}});
//# sourceMappingURL=trends.4f162f8e.js.map