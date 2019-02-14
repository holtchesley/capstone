(function(e){function t(t){for(var a,n,l=t[0],o=t[1],u=t[2],d=0,h=[];d<l.length;d++)n=l[d],r[n]&&h.push(r[n][0]),r[n]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);c&&c(t);while(h.length)h.shift()();return i.push.apply(i,u||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],a=!0,l=1;l<s.length;l++){var o=s[l];0!==r[o]&&(a=!1)}a&&(i.splice(t--,1),e=n(n.s=s[0]))}return e}var a={},r={search:0},i=[];function n(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=a,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/static/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=o;i.push([4,"chunk-vendors"]),s()})({"0629":function(e,t,s){"use strict";var a=s("a93b"),r=s.n(a);t["default"]=r.a},"0838":function(e,t,s){"use strict";var a=s("3d0d"),r=s("856f"),i=s("2877"),n=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n.options.__file="jurisdiction-result.vue",t["default"]=n.exports},"1cd0":function(e,t,s){"use strict";var a=s("8130"),r=s.n(a);t["default"]=r.a},"2f77":function(e,t,s){"use strict";var a=s("bcb7"),r=s("0629"),i=s("2877"),n=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n.options.__file="reporter-result.vue",t["default"]=n.exports},"31b0":function(e,t,s){"use strict";var a=s("94c6"),r=s("1cd0"),i=s("2877"),n=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n.options.__file="court-result.vue",t["default"]=n.exports},"3d0d":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"result"},[s("div",{staticClass:"row"},[s("div",{staticClass:"result-title col-12"},[s("a",{attrs:{target:"_blank",href:e.$parent.metadata_view_url("jurisdiction",e.result.id)},domProps:{textContent:e._s(e.result.name_long)}})])]),s("div",{staticClass:"result-data"},[s("div",{staticClass:"row"},[s("div",{},[s("span",{staticClass:"result-data-label"},[e._v("Abbreviation:")]),e._v("\n        "+e._s(e.result.name)+"\n        "),s("br"),s("span",{staticClass:"result-data-label"},[e._v("Slug:")]),e._v("\n        "+e._s(e.result.slug)+"\n      ")]),s("div",[s("a",{staticClass:"see-cases",on:{click:function(t){e.$parent.$emit("see-cases","jurisdiction",e.result.slug)}}},[e._v("\n          See cases\n        ")])])])])])},r=[];s.d(t,"a",function(){return a}),s.d(t,"b",function(){return r})},4:function(e,t,s){e.exports=s("98d8")},6104:function(e,t,s){"use strict";var a=s("8d23"),r=s("bfd2"),i=s("2877"),n=Object(i["a"])(r["default"],a["a"],a["b"],!1,null,null,null);n.options.__file="case-result.vue",t["default"]=n.exports},8130:function(e,t){e.exports={props:["result"]}},"856f":function(e,t,s){"use strict";var a=s("ff6d"),r=s.n(a);t["default"]=r.a},"8d23":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"result"},[e._l(e.result.citations,function(t){return s("div",{key:t.cite,staticClass:"result-title row"},[s("a",{attrs:{target:"_blank",href:e.$parent.case_view_url(e.result.id)}},[e._v("\n      "+e._s(e.result.name_abbreviation)+"\n    ")]),e._v("\n       \n    "),"official"===t.type?s("span",{staticClass:"result-citation"},[e._v("\n        "+e._s(t.cite)+"\n      ")]):e._e()])}),s("div",{staticClass:"row"},[s("div",{staticClass:"full-name"},[e._v("\n      "+e._s(e.result.name)+"\n    ")]),e.result.court?s("div",{staticClass:"court"},[e._v("\n      "+e._s(e.result.court.name)+"\n    ")]):e._e()]),s("div",{staticClass:"row"},[s("div",{staticClass:"decision-date"},[e._v("\n      "+e._s(e.result.decision_date)+"\n    ")]),s("div",{staticClass:"text-right volume"},[e._v("\n      Volume "+e._s(e.result.jurisdiction.volume_number)+" 567\n    ")])])],2)},r=[];s.d(t,"a",function(){return a}),s.d(t,"b",function(){return r})},"94c6":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"result"},[s("div",{staticClass:"result-title row"},[s("div",{staticClass:"row"},[s("div",{staticClass:"result-title col-12"},[s("a",{attrs:{target:"_blank",href:e.$parent.metadata_view_url("court",e.result.id)},domProps:{textContent:e._s(e.result.name_abbreviation)}})])])]),s("div",{staticClass:"result-data"},[s("div",{staticClass:"row"},[s("div",[s("span",{staticClass:"result-data-label"},[e._v("Abbreviation:")]),e._v(" "+e._s(e.result.name_abbreviation)+"\n        "),s("br"),s("span",{staticClass:"result-data-label"},[e._v("Jurisdiction:")]),e._v(" "+e._s(e.result.jurisdiction)+"\n      ")]),s("div",[s("a",{staticClass:"see-cases",on:{click:function(t){e.$parent.$emit("see-cases","court",e.result.slug)}}},[e._v("See cases")])])])])])},r=[];s.d(t,"a",function(){return a}),s.d(t,"b",function(){return r})},9765:function(e,t){e.exports={props:["result"]}},"98d8":function(e,t,s){"use strict";s.r(t);var a=s("a026"),r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search-page"},[s("search-form",{ref:"searchform",staticClass:"bg-tan",attrs:{field_errors:e.field_errors,search_error:e.search_error,choices:e.choices,docs_url:e.docs_url,scope_url:e.scope_url},on:{"new-search":e.newSearch}}),s("a",{attrs:{id:"results_list"}}),s("result-list",{attrs:{last_page:e.last_page,first_page:e.first_page,page:e.page,results:e.results,endpoint:e.endpoint,hitcount:e.hitcount,metadata_view_url_template:e.metadata_view_url_template,case_view_url_template:e.case_view_url_template},on:{"see-cases":e.seeCases,"next-page":e.nextPage,"prev-page":e.prevPage}})],1)},i=[],n=(s("7f7f"),s("ac6a"),s("cadf"),s("456d"),s("3835")),l=(s("6762"),s("2fdb"),s("28a5"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("form",{on:{submit:function(t){t.preventDefault(),e.$emit("new-search",e.fields,e.endpoint)}}},[s("div",{staticClass:"search-form-container col-centered"},[s("searchroutes",{attrs:{endpoint:e.endpoint}}),s("br"),s("div",{staticClass:"row"},[e.search_error?s("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e._v("\n        "+e._s(e.search_error)+"\n      ")]):e._e(),Object.keys(e.field_errors).length?s("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[s("ul",e._l(e.field_errors,function(t,a){return s("li",{key:"error"+a},[s("strong",[e._v(e._s(e.getFieldEntry(a,e.endpoint).label)+":")]),e._v(" "+e._s(t)+"\n          ")])}))]):e._e(),s("div",{staticClass:"col-12"},[e._l(e.fields,function(t){return s("div",{key:t["name"],staticClass:"row field_row_container",class:{"alert-danger":e.field_errors.hasOwnProperty(t["name"])}},[s("div",{staticClass:"col-4 field_label_container"},[s("label",{staticClass:"querylabel",attrs:{for:t["name"]}},[e._v("\n              "+e._s(t["label"])+"\n            ")])]),s("div",{staticClass:"col-7"},[t["choices"]?[s("select",{directives:[{name:"model",rawName:"v-model",value:t["value"],expression:'field["value"]'}],attrs:{id:t["name"]},on:{change:function(s){var a=Array.prototype.filter.call(s.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(t,"value",s.target.multiple?a:a[0])}}},e._l(e.choices[t["choices"]],function(t,a){return s("option",{key:t,domProps:{value:a}},[e._v("\n                  "+e._s(t)+"\n                ")])}))]:t["format"]?[s("input",{directives:[{name:"model",rawName:"v-model",value:t["value"],expression:'field["value"]'}],staticClass:"queryfield",attrs:{type:"text",id:t["name"],placeholder:t["format"]},domProps:{value:t["value"]},on:{input:function(s){s.target.composing||e.$set(t,"value",s.target.value)}}})]:[s("input",{directives:[{name:"model",rawName:"v-model",value:t["value"],expression:'field["value"]'}],staticClass:"queryfield",attrs:{id:t["name"],type:"text"},domProps:{value:t["value"]},on:{input:function(s){s.target.composing||e.$set(t,"value",s.target.value)}}})]],2),s("div",{staticClass:"col-1"},[s("div",{staticClass:"remfield"},[s("button",{class:[e.fields.length<=1?"disabled":"active","field-button"],attrs:{type:"button",disabled:e.fields.length<=1},on:{click:function(s){e.removeField(t["name"])}}})])])])}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-4"}),s("div",{staticClass:"col-7"},[e.fields.length>0?[s("div",{staticClass:"dropdown addfield"},[s("button",{staticClass:"dropdown-toggle add-field-button btn-white-violet",attrs:{type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n                  Add Field\n                ")]),s("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},e._l(e.currentFields(e.endpoint),function(t){return s("a",{key:t["label"],staticClass:"dropdown-item",on:{click:function(s){e.addField(t)}}},[e._v("\n                    "+e._s(t["label"]))])}))])]:e._e()],2),s("div",{staticClass:"col-1"})]),e._m(0)],2),s("div",{staticClass:"col-12"},[e._v("\n        This page searches the Caselaw Access Project API,\n          containing U.S. case law published through\n          mid-2018. Please read more "),s("a",{attrs:{href:e.scope_url}},[e._v("about the\n          scope")]),e._v(" of the project.  For help using this tool, check\n          out our "),s("a",{attrs:{href:e.docs_url}},[e._v("search documentation")]),e._v(".\n      ")]),e._m(1)])],1)])}),o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-4"}),s("div",{staticClass:"col-7"},[s("input",{staticClass:"btn-default btn-submit",attrs:{type:"submit",value:"Search"}})]),s("div",{staticClass:"col-1"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-12"},[e._v("\n        For help with legal research, please see the "),s("a",{attrs:{href:"https://guides.library.harvard.edu/law"}},[e._v("HLS Research\n          Guides")]),e._v(" or the equivalent at your institution or public\n          law library. If you require legal assistance, please see\n          the links in the answer to "),s("a",{attrs:{href:"https://asklib.law.harvard.edu/faq/115265"}},[e._v("this\n          frequently asked question")]),e._v(".\n      ")])}],u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-1 fancy-for"},[e._v("\n    for\n  ")]),s("div",{staticClass:"col-11"},[s("div",{staticClass:"dropdown dropdown-search-routes"},[s("a",{staticClass:"btn btn-secondary dropdown-toggle dropdown-title",attrs:{role:"button",id:"search-routes-dropdown","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[e._v("\n        "+e._s(e.endpoint)+"\n      ")]),s("div",{staticClass:"dropdown-menu",attrs:{"data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false","aria-labelledby":"search-routes-dropdown"}},[s("ul",e._l(e.endpoints,function(t){return s("li",{key:t,staticClass:"search-tab"},[t===e.endpoint?s("a",{staticClass:"dropdown-item active",on:{click:function(s){e.changeEndpoint(t)}}},[e._v(e._s(t))]):s("a",{staticClass:"dropdown-item",on:{click:function(s){e.changeEndpoint(t)}}},[e._v("\n              "+e._s(t))])])}))])]),s("div",{staticClass:"endpoint-dropdown dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[s("ul",e._l(e.endpoints,function(t){return s("li",{key:t,staticClass:"search-tab"},[t===e.endpoint?s("a",{staticClass:"nav-link active",on:{click:function(s){e.changeEndpoint(t)}}},[e._v(e._s(t))]):s("a",{staticClass:"nav-link",on:{click:function(s){e.changeEndpoint(t)}}},[e._v("\n            "+e._s(t))])])}))])])])},c=[],d={name:"searchroutes",props:["endpoint"],data:function(){return{endpoints:Object.keys(this.$parent.endpoints),fields:[{name:"search",value:"",label:"Full-Text Search",default:!0,format:"e.g. 'insurance' illinois",info:""}]}},methods:{changeEndpoint:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];this.$parent.endpoint=e,this.$parent.fields=t}}},h=d,f=s("2877"),p=Object(f["a"])(h,u,c,!1,null,null,null);p.options.__file="search-routes.vue";var v=p.exports,_={components:{searchroutes:v},data:function(){return{endpoint:"cases",query:[],newfield:null,page_size:10,fields:[{name:"search",value:"",label:"Full-Text Search",default:!0,format:"e.g. insurance illinois",info:""}],endpoints:{cases:[{name:"search",value:"",label:"Full-Text Search",default:!0,format:"e.g. insurance illinois",info:""},{name:"name_abbreviation",label:"Case Name Abbreviation",value:"",format:"e.g. Taylor v. Sprinkle",info:"the abbreviated case name"},{name:"decision_date_min",label:"Decision Date Earliest",format:"YYYY-MM-DD",info:"the earliest date on which your results could have been decided"},{name:"decision_date_max",value:"",label:"Decision Date Latest",format:"YYYY-MM-DD",info:"the latest date on which your results could have been decided"},{name:"docket_number",value:"",label:"Docket Number",format:"e.g. Civ. No. 74-289",info:"the docket number assigned by the court"},{name:"citation",value:"",label:"Citation",format:"e.g. 1 Ill. 17",default:!0,info:"the case citation"},{name:"reporter",value:"",label:"Reporter",choices:"reporter",info:""},{name:"jurisdiction",value:"",label:"Jurisdiction",choices:"jurisdiction",info:""}],courts:[{name:"slug",value:"",label:"Slug",format:"e.g. ill-app-ct",info:"A slug is a unique alphanumeric identifier which is more readable than a numeric ID."},{name:"name",value:"",label:"Name",format:"e.g. 'Illinois Supreme Court'",info:"the official full court name"},{name:"name_abbreviation",value:"",format:"e.g. 'Ill.'",label:"Name Abbreviation",info:"the abbreviated court name"},{name:"jurisdiction",value:"",label:"Jurisdiction",choices:"jurisdiction",default:!0,info:"the court's jurisdiction"}],jurisdictions:[{name:"id",value:"",format:"e.g. 47",label:"Database ID",info:"A slug is a unique string that represents a database entry which is more readable than a numeric ID."},{name:"name",value:"",label:"Name",format:"e.g. 'Ill.'",info:"the short, official name of the jurisdiction"},{name:"name_long",value:"",label:"Long Name",format:"e.g. 'Illinois'",default:!0,info:"the long, official name of the jurisdiction"},{name:"whitelisted",value:"",label:"Whitelisted Jurisdiction",choices:"whitelisted",info:"Whitelisted cases are not subject to the 500 case per day access limitation."}],reporters:[{name:"full_name",value:"",label:"Full Name",format:"e.g. 'Illinois Appellate Court Reports'",info:"the full reporter name"},{name:"short_name",value:"",label:"Short Name",format:"e.g. 'Ill. App.'",info:"the short reporter name"},{name:"start_year",value:"",label:"Start Year",format:"e.g. '1893'",info:"the year in which the reporter began publishing"},{name:"end_year",value:"",label:"End Year",format:"e.g. '1894'",info:"the year in which the reporter stopped publishing"},{name:"jurisdiction",value:"",label:"Jurisdiction",choices:"jurisdiction",default:!0,info:"the reporter's jurisdiction"}]}}},watch:{endpoint:{handler:function(e){this.updateFields(e)}}},props:["choices","search_error","field_errors","docs_url","scope_url"],methods:{updateFields:function(e){this.fields=[];for(var t=this.endpoints[e].length-1;t>=0;t--)this.endpoints[e][t]["default"]&&this.fields.push(this.endpoints[e][t])},replaceFields:function(e){this.fields=e},removeField:function(e){for(var t=this.fields.length-1;t>=0;t--)this.fields[t]["name"]===e&&this.fields.splice(t,1);this.$parent.updateUrlHash()},addField:function(e){for(var t=this.fields.length-1;t>=0;t--)if(this.fields[t]["name"]===e["name"])return!1;this.fields.push(e),this.$parent.updateUrlHash()},getFieldEntry:function(e,t){for(var s=this.endpoints[t].length-1;s>=0;s--)if(this.endpoints[t][s]["name"]===e)return this.endpoints[t][s]},currentFields:function(e){var t=[];for(var s in this.endpoints[e])this.fields.includes(this.endpoints[e][s])||t.push(this.endpoints[e][s]);return t}}},m=_,g=Object(f["a"])(m,l,o,!1,null,null,null);g.options.__file="search-form.vue";var b=g.exports,w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"results-list-container col-centered"},[e.hitcount?s("div",{staticClass:"hitcount"},[e.hitcount>1?s("span",[e._v(e._s(e.hitcount)+" results")]):1===e.hitcount?s("span",[e._v(e._s(e.hitcount)+" result")]):s("span",[e._v("No results")])]):e._e(),s("ul",{staticClass:"results-list"},["cases"===e.endpoint?s("li",e._l(e.results[e.page],function(e){return s("case-result",{key:e.id,attrs:{result:e}})})):e._e(),"courts"===e.endpoint?s("li",e._l(e.results[e.page],function(e){return s("court-result",{key:e.id,attrs:{result:e}})})):e._e(),"jurisdictions"===e.endpoint?s("li",e._l(e.results[e.page],function(e){return s("jurisdiction-result",{key:e.id,attrs:{result:e}})})):e._e(),"reporters"===e.endpoint?s("li",e._l(e.results[e.page],function(e){return s("reporter-result",{key:e.id,attrs:{result:e}})})):e._e()]),0!==this.$parent.results.length?s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[!0!==e.first_page?s("button",{staticClass:"btn btn-sm",on:{click:function(t){e.$emit("prev-page")}}},[e._v("\n        Back\n      ")]):s("button",{staticClass:"btn btn-sm disabled",attrs:{disabled:""}},[e._v("Back")])]),s("div",{staticClass:"col-6 text-right"},[!0!==e.last_page?s("button",{staticClass:"btn btn-sm",on:{click:function(t){e.$emit("next-page")}}},[e._v("Page "+e._s(e.page+2))]):s("button",{staticClass:"btn btn-sm disabled",attrs:{disabled:""}},[e._v("Next")])])]):e._e()])},C=[],y=(s("a481"),s("2f77")),k=s("6104"),j=s("31b0"),$=s("0838"),x={props:["results","endpoint","hitcount","page","first_page","last_page","case_view_url_template","metadata_view_url_template"],components:{"reporter-result":y["default"],"case-result":k["default"],"court-result":j["default"],"jurisdiction-result":$["default"]},methods:{case_view_url:function(e){return this.case_view_url_template.replace("987654321",e)},metadata_view_url:function(e,t){return this.metadata_view_url_template.replace("987654321",t).replace("/court/","/"+e+"/")}}},F=x,P=Object(f["a"])(F,w,C,!1,null,null,null);P.options.__file="result-list.vue";var S=P.exports,O={beforeMount:function(){this.docs_url=docs_url,this.scope_url=scope_url,this.case_view_url_template=case_view_url_template,this.metadata_view_url_template=metadata_view_url_template,this.search_url=search_url,this.choices=choices},mounted:function(){if(window.location.hash){var e=window.location.hash.substr(1),t=this.getHashEndpoint(e),s=this.getHashFilterFields(e),a=this.getHashParams(e);a.hasOwnProperty("page")&&(this.page=a["page"]-1),a.hasOwnProperty("cursor")&&(this.cursors[this.page]=a["cursor"]),a.hasOwnProperty("page_size")&&(this.page_size=a["page_size"]),this.$refs.searchform.endpoint!==t&&(console.log("needing to pass in , fields",s),this.$refs.searchform.endpoint=t),this.newSearch(s,t,!0)}},components:{"search-form":b,"result-list":S},data:function(){return{title:"Search",hitcount:null,page:0,results:[],cursors:[],endpoint:"cases",page_size:10,choices:{},case_view_url_template:null,search_url:null,cursor:null,last_page:!0,first_page:!0,field_errors:{},search_error:null}},methods:{newSearch:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.$refs.searchform.fields!=e&&e.length>0&&this.$refs.searchform.replaceFields(e),this.endpoint=t,s||(this.resetResults(),this.updateUrlHash()),this.nextPage(!0)},nextPage:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e){var t=this,s=this.assembleUrl(this.search_url,this.endpoint,this.cursors[this.page],this.page_size,this.$refs.searchform.fields);this.getResultsPage(s).then(function(){t.lastFirstCheck,t.scrollToResults()})}else if(this.results[this.page+1])this.page++,this.updateUrlHash(),this.lastFirstCheck(),this.scrollToResults();else if(this.cursors[this.page+1]){this.page++;var a=this,r=this.assembleUrl(this.search_url,this.endpoint,this.cursors[this.page],this.page_size,this.$refs.searchform.fields);this.getResultsPage(r).then(function(){a.updateUrlHash(),a.lastFirstCheck(),a.scrollToResults()})}},prevPage:function(){if(this.results[this.page-1])this.page--,this.updateUrlHash(),this.lastFirstCheck();else if(this.cursors[this.page-1]){this.page--;var e=this.assembleUrl(this.search_url,this.endpoint,this.cursors[this.page],this.page_size,this.$refs.searchform.fields),t=this;this.getResultsPage(e).then(function(){t.updateUrlHash(),t.lastFirstCheck()})}this.scrollToResults()},lastFirstCheck:function(){this.last_page=!this.cursors[this.page+1],this.first_page=0===this.page},getResultsPage:function(e){this.search_error="",this.field_errors={};var t=this;return this.startLoading(),fetch(e).then(function(e){if(!e.ok)throw e;return e.json()}).then(function(s){t.hitcount=s.count;var a=s.next,r=s.previous;t.cursors[t.page]||(t.cursors[t.page]=t.getCursorFromUrl(e)),!t.cursors[t.page-1]&&r&&(t.cursors[t.page-1]=t.getCursorFromUrl(r)),!t.cursors[t.page+1]&&a&&(t.cursors[t.page+1]=t.getCursorFromUrl(a)),t.results[t.page]=s.results}).catch(function(s){if(400===s.status&&t.field_errors)return s.json().then(function(e){t.field_errors=e});s.status?t.search_error="Search error: API returned "+s.status+" for the query "+e:t.search_error="Search error: failed to load results from "+e}).then(function(){t.stopLoading()})},updateUrlHash:function(){window.location.hash=this.generateUrlHash(this.endpoint,this.cursors,this.page,this.page_size,this.$refs.searchform.fields)},resetResults:function(){this.title="Search",this.hitcount=null,this.page=0,this.results=[],this.cursors=[],this.last_page=!0,this.first_page=!0},startLoading:function(){document.getElementById("loading-overlay").style.display="block"},stopLoading:function(){document.getElementById("loading-overlay").style.display="none"},seeCases:function(e,t){var s=[{label:e,name:e,value:t}];this.newSearch(s,"cases")},getHashEndpoint:function(e){if(hasOwnProperty.call(this.$refs.searchform.endpoints,e.split("filters")[0].split("/")[0]))return e.split("filters")[0].split("/")[0]},getHashParams:function(e){var t=e.split("filters")[0].split("/");return t.reduce(function(e,t){if(!t.includes(":"))return e;var s=t.split(":"),a=Object(n["a"])(s,2),r=a[0],i=a[1];return e[r]=i,e},{})},getHashFilterFields:function(e){var t=e.split("filters")[1].split("/"),s=this.$refs.searchform;return t.reduce(function(e,t){if(!t.includes(":"))return e;var a=t.split(":"),r=Object(n["a"])(a,2),i=r[0],l=r[1],o=s.getFieldEntry(i,s.endpoint);return o?(o["value"]=l,e.push(o),e):e},[])},generateUrlHash:function(e,t,s,a,r){var i;i=t[s]?{page:s+1,cursor:t[s],page_size:a}:{page:s+1,page_size:a};var n=Object.keys(i).reduce(function(e,t){return e+t+":"+i[t]+"/"},""),l=r.reduce(function(e,t){return e+=encodeURIComponent(t["name"])+":"+encodeURIComponent(t["value"])+"/",e},""),o="#"+e+"/"+n+"filters/"+l;return o},getCursorFromUrl:function(e){if(e&&e.includes("cursor="))return e.split("cursor=")[1].split("&")[0]},scrollToResults:function(){var e=document.getElementById("results_list");e.scrollIntoView()},assembleUrl:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3?arguments[3]:void 0,r=arguments.length>4?arguments[4]:void 0,i=e+t+"/?";if(s&&(i+="cursor="+s+"&"),r.length>0)for(var n=r.length-1;n>=0;n--){var l=r[n]["value"];void 0!=l&&null!=l||(l=""),i+=r[n]["name"]+"="+l+"&"}return i+="page_size="+a,i}}},E=O,U=Object(f["a"])(E,r,i,!1,null,null,null);U.options.__file="main.vue";var I=U.exports;a["a"].config.productionTip=!1,new a["a"]({el:"#app",components:{Main:I},template:"<Main/>"})},a93b:function(e,t){e.exports={props:["result"]}},bcb7:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("li",{staticClass:"result"},[s("div",{staticClass:"result-title row"},[s("a",{attrs:{target:"_blank",href:e.$parent.metadata_view_url("reporter",e.result.id)}},[e._v("\n      "+e._s(e.result.full_name)+"\n    ")])]),s("div",{staticClass:"result-data"},[s("div",{staticClass:"row"},[s("div",[s("span",{staticClass:"result-data-label"},[e._v("Abbreviation:")]),e._v(" "+e._s(e.result.short_name)+"\n      ")]),s("div",[s("a",{staticClass:"see-cases",on:{click:function(t){e.$parent.$emit("see-cases","reporter",e.result.id)}}},[e._v("\n          See cases\n        ")])])])])])},r=[];s.d(t,"a",function(){return a}),s.d(t,"b",function(){return r})},bfd2:function(e,t,s){"use strict";var a=s("9765"),r=s.n(a);t["default"]=r.a},ff6d:function(e,t){e.exports={props:["result"]}}});
//# sourceMappingURL=search.js.map