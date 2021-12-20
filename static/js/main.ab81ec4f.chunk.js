(this["webpackJsonpreact-pages"]=this["webpackJsonpreact-pages"]||[]).push([[0],{112:function(e,t,n){},114:function(e,t,n){},119:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(14),i=n.n(r),s=(n(112),n(77)),o=n.n(s),l=n(86),j=n(16),u=n(89),d=n(101),h=n(182),b=n(184),x=n(173),p=n(174),O=n(185),f=n(186),m=n(176),g=n(187),v=n(177),y=n(188),k=n(189),C=(n(114),n(181)),w=n(97),S=n.n(w),L=n(98),B=n.n(L),I=n(168),_=n(178),z=n(99),A=n.n(z),E=n(172),D=n(8),M=n(179),T=n(180),F=n(100),J=n(165),N=n(167),U=n(175),P=n(2),W=["expand"],X=Object(F.a)({palette:{primary:{main:"#005288"},secondary:{main:"#A7A9AC"}}}),q=Object(D.a)((function(e){e.expand;var t=Object(d.a)(e,W);return Object(P.jsx)(_.a,Object(u.a)({},t))}))((function(e){var t=e.theme;return{transform:e.expand?"rotate(180deg)":"rotate(0deg)",marginLeft:"auto",transition:t.transitions.create("transform",{duration:t.transitions.duration.shortest})}}));function G(e){var t=c.a.useState(!1),n=Object(j.a)(t,2),a=n[0],r=n[1],i=400,s=1e3*e.date,o=new Date(s).toLocaleString("en-US",{month:"long",day:"numeric",year:"numeric"});return Object(P.jsxs)(O.a,{sx:{maxWidth:i},children:[Object(P.jsx)(f.a,{avatar:e.patch&&Object(P.jsx)(m.a,{sx:{width:i/7,height:i/7},alt:"Launch Patch",src:e.patch}),title:e.title,subheader:o}),e.img&&Object(P.jsx)(g.a,{component:"img",height:200,image:e.img}),Object(P.jsx)(C.a,{m:1,children:Object(P.jsxs)(x.a,{container:!0,justifyContent:"center",children:[e.success&&Object(P.jsx)(v.a,{label:"Successful",color:"success",icon:Object(P.jsx)(S.a,{})}),!e.success&&!e.upcoming&&Object(P.jsx)(v.a,{label:"Failed",color:"error",icon:Object(P.jsx)(B.a,{})}),e.upcoming&&Object(P.jsx)(v.a,{label:"Upcoming",color:"warning"})]})}),Object(P.jsxs)(y.a,{children:[Object(P.jsxs)(b.a,{paragraph:!0,variant:"caption",color:"text.secondary",children:["Launch ID: ",e.id]}),e.desc&&Object(P.jsx)(b.a,{paragraph:!0,variant:"body2",color:"text.primary",align:"left",children:function(e){if(e.length>0)return e.split(" ").slice(0,10).join(" ")+"..."}(e.desc)})]}),Object(P.jsxs)(x.a,{children:[Object(P.jsxs)(k.a,{children:[e.desc&&Object(P.jsx)(q,{expand:a,onClick:function(){r(!a)},"aria-expanded":a,"aria-label":"show more",children:Object(P.jsx)(A.a,{})}),e.link&&Object(P.jsx)(x.a,{container:!0,justifyContent:"flex-end",children:Object(P.jsx)(p.a,{size:"small",target:"_blank",href:e.link,children:"Learn More"})})]}),e.desc&&Object(P.jsx)(E.a,{in:a,timeout:"auto",unmountOnExit:!0,children:Object(P.jsx)(y.a,{children:Object(P.jsx)(b.a,{paragraph:!0,variant:"body2",color:"text.primary",align:"left",children:function(e){if(e.length>0)return"..."+e.split(" ").slice(10,e.length).join(" ")}(e.desc)})})})]})]})}var H=function(){var e,t,n,r=Object(a.useState)(!0),i=Object(j.a)(r,2),s=i[0],u=i[1],d=Object(a.useState)([]),O=Object(j.a)(d,2),f=O[0],m=O[1],g=c.a.useState(1),v=Object(j.a)(g,2),y=v[0],k=v[1],w=c.a.useState(null),S=Object(j.a)(w,2),L=S[0],B=S[1],_=Boolean(L),z=function(){B(null)};return Object(a.useEffect)((function(){var e=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.spacexdata.com/v4/launches");case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,a=n.sort((function(e,t){return e.date_unix>t.date_unix?-1:1})),m(a),u(!1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("error:",e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();e()}),[]),s?Object(P.jsx)(C.a,{sx:{height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"},children:Object(P.jsx)(h.a,{size:"10vh"})}):Object(P.jsx)(J.a,{theme:X,children:Object(P.jsxs)("div",{className:"App",children:[Object(P.jsx)(M.a,{position:"static",style:{backgroundColor:"#005288"},children:Object(P.jsx)(T.a,{children:Object(P.jsx)(b.a,{variant:"h6",style:{color:"#ffffff"},component:"div",children:"SpaceX Launch Tracker"})})}),Object(P.jsx)(x.a,{container:!0,justifyContent:"right",children:Object(P.jsxs)(C.a,{m:1,children:[Object(P.jsx)(p.a,{id:"demo-positioned-button","aria-controls":"demo-positioned-menu","aria-haspopup":"true","aria-expanded":_?"true":void 0,onClick:function(e){B(e.currentTarget)},children:"Sort By"}),Object(P.jsxs)(N.a,{id:"demo-positioned-menu","aria-labelledby":"demo-positioned-button",anchorEl:L,open:_,onClose:z,anchorOrigin:{vertical:"top",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:[Object(P.jsx)(U.a,{onClick:function(){f.sort((function(e,t){var n=e.name.toLowerCase(),a=t.name.toLowerCase();return n.localeCompare(a)})),k(1),z()},children:"Name"}),Object(P.jsx)(U.a,{onClick:function(){f.sort((function(e,t){return e.date_unix>t.name?-1:1})),k(1),z()},children:"Date"}),Object(P.jsx)(U.a,{onClick:function(){f.sort((function(e,t){return e.success===t.success?0:e.success?-1:1})),k(1),z()},children:"Success"})]})]})}),Object(P.jsx)(C.a,{m:3,sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(P.jsx)(x.a,{container:!0,justifyContent:"center",spacing:4,children:(e=f,t=24,n=y,e.slice((n-1)*t,n*t)).map((function(e){return Object(P.jsx)(x.a,{item:!0,xs:3,children:Object(P.jsx)(G,{id:e.id,patch:e.links.patch.large,title:e.name,date:e.date_unix,img:e.links.flickr.original[1],desc:e.details,link:e.links.article,success:e.success,upcoming:e.upcoming})},e.id)}))})}),Object(P.jsx)(C.a,{m:1,sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(P.jsx)(I.a,{count:Math.round(f.length/24),variant:"outlined",color:"primary",page:y,onChange:function(e,t){k(t),window.scrollTo({top:0,behavior:"smooth"})},showFirstButton:!0,showLastButton:!0})})]})})};i.a.render(Object(P.jsx)(c.a.StrictMode,{children:Object(P.jsx)(H,{})}),document.getElementById("root"))}},[[119,1,2]]]);
//# sourceMappingURL=main.ab81ec4f.chunk.js.map