(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{489:function(e,t,a){e.exports=a.p+"static/media/antd.b29324c4.svg"},628:function(e,t,a){},704:function(e,t,a){"use strict";a.r(t);var n=a(19),r=a.n(n),o=a(35),l=a(51),c=a(52),i=a(55),s=a(53),u=a(54),p=(a(428),a(462)),m=a.n(p),h=a(0),d=a.n(h),g=(a(429),a(401)),f=a.n(g),y=(a(400),a(73)),b=a.n(y),v=a(86),E=Object(v.a)(Promise.all([a.e(0),a.e(6),a.e(11)]).then(a.bind(null,702)),!0),k=[{name:"\u7559\u8a00\u677f",icon:"message",key:"MessageBoard"}],C={MessageBoard:d.a.createElement(E,null)},j=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).renderMenu=function(e){if(Array.isArray(e))return e.map(function(e){return e.children&&e.children.length?d.a.createElement(f.a.SubMenu,{key:e.key,title:d.a.createElement("span",null,e.icon&&d.a.createElement(b.a,{type:e.icon}),d.a.createElement("span",null,e.name))},a.renderMenu(e.children)):d.a.createElement(f.a.Item,{key:e.key||e.name},d.a.createElement("div",{onClick:function(){return a.addPane(e)}},e.icon&&d.a.createElement(b.a,{type:e.icon}),d.a.createElement("span",null,e.name)))})},a.addPane=function(e){var t=a.props.panes.slice(),n=e.key;t.find(function(e){return e.key===n})||t.push({name:e.name,key:e.key,content:C[e.key]||e.name}),a.props.onChangeState({panes:t,activeMenu:n})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.activeMenu,n=e.theme;return d.a.createElement("div",{className:"my-sider ".concat(n)},d.a.createElement("div",{className:"sider-menu-logo ".concat(n)},d.a.createElement("a",{href:"https://ant.design/docs/react/introduce-cn",target:"_blank",rel:"noopener noreferrer"},d.a.createElement("img",{src:a(489),alt:""}),d.a.createElement("h1",null,"Ant Design"))),d.a.createElement(f.a,{theme:n,mode:"inline",selectedKeys:[t],style:{paddingTop:16}},this.renderMenu(k)))}}]),t}(d.a.Component),O=(a(490),a(624)),S=a.n(O),x=(a(173),a(41)),w=a.n(x),I=a(492),M=a.n(I),F=a(493),A=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={displayColorPicker:!1,color:""},a.handleClick=function(){a.setState({displayColorPicker:!a.state.displayColorPicker})},a.handleClose=function(){a.setState({displayColorPicker:!1})},a.handleChange=function(e){a.props.onChange(e.hex),a.setState({color:e.hex})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e={color:{width:"36px",height:"14px",borderRadius:"2px",background:this.state.color},swatch:{padding:"5px",background:"#fff",borderRadius:"1px",boxShadow:"0 0 0 1px rgba(0,0,0,.1)",display:"inline-block",cursor:"pointer"},popover:{position:"absolute",zIndex:"2"},cover:{position:"fixed",top:"0",right:"0",bottom:"0",left:"0"}};return d.a.createElement("div",{style:{lineHeight:"15px"}},d.a.createElement("div",{style:e.swatch,onClick:this.handleClick},d.a.createElement("div",{style:e.color})),this.state.displayColorPicker?d.a.createElement("div",{style:e.popover},d.a.createElement("div",{style:e.cover,onClick:this.handleClose}),d.a.createElement(F.SketchPicker,Object.assign({},this.props,{color:this.state.color,onChange:this.handleChange}))):null)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.color&&e.color!==t.color?{color:e.color}:null}}]),t}(d.a.Component);A.defaultProps={color:"",onChange:function(){},presetColors:["#F5222D","#FA541C","#FA8C16","#FAAD14","#FADB14","#A0D911","#52C41A","#13C2C2","#1890FF","#2F54EB","#722ED1","#EB2F96"],disableAlpha:!0};var P,D,N=A,B=a(22),_=a(387),z=a(110),R=b.a.createFromIconfontCN({scriptUrl:"//at.alicdn.com/t/font_731989_0s6wteco74wa.js"}),J=f.a.SubMenu,L=f.a.ItemGroup,T=Object(z.b)(function(e){return{user:e.user}}),U=Object(_.e)(P=T(P=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(i.a)(this,Object(s.a)(t).call(this,e))).toggleCollapsed=function(){a.props.onChangeState({collapsed:!a.props.collapsed})},a.toggleFullscreen=function(){M.a.enabled&&M.a.toggle().then(function(){a.setState({isFullscreen:M.a.isFullscreen})})},a.changeColor=function(e){window.less.modifyVars({"@primary-color":e}).then(function(){localStorage.setItem("user-theme",JSON.stringify({"@primary-color":e})),a.setState({color:e}),w.a.success("\u66f4\u6362\u4e3b\u9898\u989c\u8272\u6210\u529f")})},a.resetColor=function(){a.changeColor("#13C2C2")},a.onLogout=function(){Object(B.c)(),a.props.history.push("/login")},a.onLogin=function(){a.props.history.push("/login")},a.changeTheme=function(){var e="dark"===a.props.theme?"light":"dark";localStorage.setItem("theme",e),a.props.onChangeState({theme:e})};var n=JSON.parse(localStorage.getItem("user-theme")),r="#13C2C2";return n&&(window.less.modifyVars(n),r=n["@primary-color"]),a.state={isFullscreen:!1,color:r},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t=this.state,a=t.isFullscreen,n=t.color,r=this.props,o=r.user,l=r.theme,c=Object(B.b)(),i=null===c||void 0===c||""===c;return e=i?d.a.createElement(L,{title:"\u6e38\u5ba2\u4e2d\u5fc3"},d.a.createElement(f.a.Item,{key:2,onClick:this.onLogin},d.a.createElement(b.a,{type:"logout"}),"\u767b\u5f55")):d.a.createElement(L,{title:"\u7528\u6237\u4e2d\u5fc3"},d.a.createElement(f.a.Item,{key:2,onClick:this.onLogout},d.a.createElement(b.a,{type:"logout"}),"\u9000\u51fa\u767b\u5f55")),d.a.createElement("div",{style:{background:"#fff",padding:"0 16px"}},d.a.createElement(b.a,{style:{fontSize:18},type:this.props.collapsed?"menu-unfold":"menu-fold",onClick:this.toggleCollapsed}),d.a.createElement("div",{style:H.headerRight},d.a.createElement("div",{style:H.headerItem},d.a.createElement(N,{color:n,onChange:this.changeColor})),d.a.createElement("div",{style:H.headerItem},d.a.createElement(R,{type:"dark"===l?"icon-yueliang1":"icon-taiyang",style:{fontSize:24},onClick:this.changeTheme})),d.a.createElement("div",{style:H.headerItem},d.a.createElement(f.a,{mode:"horizontal",selectable:!1},d.a.createElement(J,{title:d.a.createElement("div",{style:H.avatarBox},d.a.createElement(S.a,{size:"square",src:"http://localhost:8080/images/default.png"}),"\xa0",d.a.createElement("span",null,i?"\u6e38\u5ba2":o.uid+" & "," ",!i&&o.email))},e,d.a.createElement(L,{title:"\u8bbe\u7f6e\u4e2d\u5fc3"},d.a.createElement(f.a.Item,{key:3,onClick:this.toggleFullscreen},d.a.createElement(b.a,{type:a?"fullscreen-exit":"fullscreen"}),"\u5207\u6362\u5168\u5c4f"),d.a.createElement(f.a.Item,{key:4,onClick:this.resetColor},d.a.createElement(b.a,{type:"ant-design"}),"\u6062\u590d\u9ed8\u8ba4\u4e3b\u9898")))))))}}]),t}(d.a.Component))||P)||P,H={headerRight:{float:"right",display:"flex",height:64,marginRight:50},headerItem:{display:"flex",alignItems:"center",padding:"0 20px"},avatarBox:{display:"flex",alignItems:"center"}},K=U,V=(a(625),a(641)),q=a.n(V),G=(a(461),a(463)),W=a.n(G),Y=(a(628),m.a.Footer),Q=W.a.TabPane,X=["".concat("http://localhost:8080","/public/images/bg1.jpg"),"".concat("http://localhost:8080","/public/images/bg2.jpg"),"".concat("http://localhost:8080","/public/images/bg3.jpg")],Z=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).onChange=function(e){a.props.onChangeState({activeMenu:e})},a.onEdit=function(e,t){"remove"===t&&a.remove(e)},a.remove=function(e){var t=a.props.activeMenu,n=a.props.panes.slice(),r=n.findIndex(function(t){return t.key===e})-1;r=Math.max(r,0),n=n.filter(function(t){return t.key!==e}),e===t&&(t=n[r]?n[r].key:""),a.props.onChangeState({activeMenu:t,panes:n})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.panes,a=e.activeMenu;return d.a.createElement("div",{className:"content-container"},t.length?d.a.createElement(W.a,{style:{height:"100%"},tabBarStyle:{background:"#f0f2f5",marginBottom:0},onEdit:this.onEdit,onChange:this.onChange,activeKey:a,type:"editable-card",hideAdd:!0},t.map(function(e){return d.a.createElement(Q,{key:e.key,tab:e.name},d.a.createElement("div",{className:"tabpane-box"},e.content),d.a.createElement(Y,{style:{textAlign:"center",background:"#fff"}},"React-Admin \xa9",(new Date).getFullYear()," Created by syt0438@163.com ",d.a.createElement("a",{target:"_blank",href:"https://github.com/syt0438",rel:"noopener noreferrer"},d.a.createElement(b.a,{type:"github"}))))})):d.a.createElement("div",{className:"bg-box"},d.a.createElement(q.a,{className:"bg-size",autoplay:!0,autoplaySpeed:5e3},X.map(function(e){return d.a.createElement("div",{className:"bg-size",key:e},d.a.createElement("img",{src:e,alt:"",style:{width:"100%",height:"100%"}}))}))))}}]),t}(d.a.Component),$=a(117),ee=a(33),te=m.a.Header,ae=m.a.Sider,ne=m.a.Content,re=Object(z.b)(function(e){return{user:e.user}},function(e){return Object(ee.b)({getUser:$.b},e)})(D=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,c=new Array(n),u=0;u<n;u++)c[u]=arguments[u];return(a=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(c)))).state={collapsed:!1,panes:[],activeMenu:"",theme:localStorage.getItem("theme")||"light"},a.init=Object(o.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(t=localStorage.getItem("uid"))){e.next=4;break}return e.next=4,a.props.getUser({uid:t});case 4:case"end":return e.stop()}},e)})),a._setState=function(e){a.setState(e)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.init()}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this.state,t=e.collapsed,a=e.panes,n=e.activeMenu,r=e.theme;return d.a.createElement(m.a,{style:{height:"100vh"}},d.a.createElement(ae,{trigger:null,collapsible:!0,collapsed:t,theme:r},d.a.createElement(j,{theme:r,panes:a,activeMenu:n,onChangeState:this._setState})),d.a.createElement(m.a,null,d.a.createElement(te,{style:{padding:0}},d.a.createElement(K,{theme:r,collapsed:t,onChangeState:this._setState})),d.a.createElement(ne,null,d.a.createElement(Z,{panes:a,activeMenu:n,onChangeState:this._setState}))))}}]),t}(d.a.Component))||D;t.default=re}}]);