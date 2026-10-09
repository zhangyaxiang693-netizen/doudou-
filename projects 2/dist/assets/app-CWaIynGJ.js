const Hd="S级-中秋头图",Dd="S级-中秋头图",Ld="S级-中秋头图",Gd="atom",Od="原子组件",Vd="S级中秋活动头图，展示主标题、副标题和活动时间。",Ud="S级-中秋头图",Kd={width:750,height:682},qd={autoExposeProps:!0,matchKeywords:["S级-中秋头图","中秋头图","头图","活动头图"],textProps:["mainTitle","highlightText","subtitle","dateText"]},Wd=[{key:"mainTitle",name:"mainTitle",label:"主标题",type:"string",default:"任务通关赢X元流量",description:"头图主标题文案。"},{key:"highlightText",name:"highlightText",label:"高亮文案",type:"string",default:"X元流量",description:"主标题中需要使用高亮色展示的文案。"},{key:"subtitle",name:"subtitle",label:"副标题",type:"string",default:"为爱加投",description:"时间条左侧副标题文案。"},{key:"dateText",name:"dateText",label:"时间",type:"string",default:"6月10日-6月21日",description:"时间条右侧活动时间文案。"}],NT={id:Hd,name:Dd,title:Ld,type:Gd,category:Od,description:Vd,reactComponent:Ud,dimensions:Kd,blueprint:qd,props:Wd},ET=Object.freeze(Object.defineProperty({__proto__:null,blueprint:qd,category:Od,default:NT,description:Vd,dimensions:Kd,id:Hd,name:Dd,props:Wd,reactComponent:Ud,title:Ld,type:Gd},Symbol.toStringTag,{value:"Module"})),Xd="任务条-样式1-点击后",Yd="任务条-样式1-点击后",Jd="任务条-样式1-点击后",Zd="atom",Qd="原子组件",ep="任务条组件样式1点击后状态，展示任务标题、副标题、抽奖加成和完成次数。",np="任务条-样式1-点击后",tp={width:702,height:161},ip=[{text:"投一单DOU+",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"normal",usage:"任务标题",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}},{text:"抽奖",family:"Douyin Sans",weight:400,size:"20px",lineHeight:"24px",usage:"抽奖标签",source:{status:"missing",required:"Douyin Sans / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"+1",family:"Douyin Number ABC",weight:500,size:"28px",lineHeight:"24px",usage:"抽奖加成",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"投内容加热、粉丝经营目标且消耗达成30元",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"任务副标题",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"已完成",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"每日可完成1次",family:"Source Han Sans CN",weight:400,size:"20px",lineHeight:"30px",usage:"完成次数文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],ap={autoExposeProps:!0,matchKeywords:["任务条-样式1-点击后","点击后任务条","任务条","任务","任务标题","任务副标题","NEW标签","抽奖加成","每日可完成"],textProps:["taskTitle","showNewTag","taskSubtitle","rewardCountText","completionText"]},op=[{id:"default",name:"点击前",schemaId:"任务条-样式1",preserveProps:!0,lockedPropKeys:["buttonGradientStart","buttonGradientEnd"],props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"clicked",name:"点击后",schemaId:"任务条-样式1-点击后",preserveProps:!0,lockedPropKeys:["buttonGradientStart","buttonGradientEnd"],props:{buttonGradientStart:"#FF81BA",buttonGradientEnd:"#FF81BA"}}],rp=[{key:"taskTitle",name:"taskTitle",label:"任务标题",type:"string",default:"投一单DOU+",description:"任务条左上方标题。"},{key:"showNewTag",name:"showNewTag",label:"NEW标签",type:"boolean",default:!1,description:"开启后在任务标题前显示 NEW 标签。"},{key:"taskSubtitle",name:"taskSubtitle",label:"任务副标题",type:"string",default:"投内容加热、粉丝经营目标且消耗达成30元",description:"任务条左下方说明文案。"},{key:"rewardCountText",name:"rewardCountText",label:"抽奖加成",type:"string",default:"+1",description:"抽奖标签右侧加成文字。"},{key:"completionText",name:"completionText",label:"完成次数文案",type:"string",default:"每日可完成1次",description:"按钮下方完成次数文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF81BA"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF81BA"},{key:"lotteryTagGradientStart",name:"lotteryTagGradientStart",label:"抽奖标签颜色开始",type:"color",default:"#FF1473"},{key:"lotteryTagGradientEnd",name:"lotteryTagGradientEnd",label:"抽奖标签颜色结束",type:"color",default:"#FF229F"},{key:"rewardCountTextColor",name:"rewardCountTextColor",label:"加成文字",type:"color",default:"#FF62A0"}],sp=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF81BA",buttonGradientEnd:"#FF81BA",lotteryTagGradientStart:"#FF1473",lotteryTagGradientEnd:"#FF229F",rewardCountTextColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF6265",buttonGradientEnd:"#FF6265",lotteryTagGradientStart:"#FF190E",lotteryTagGradientEnd:"#FF166E",rewardCountTextColor:"#FF6265"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF8F4A",buttonGradientEnd:"#FF8F4A",lotteryTagGradientStart:"#FF4501",lotteryTagGradientEnd:"#FF7C02",rewardCountTextColor:"#FF8F4A"}}],_T={id:Xd,name:Yd,title:Jd,type:Zd,category:Qd,description:ep,reactComponent:np,dimensions:tp,fonts:ip,blueprint:ap,states:op,props:rp,variants:sp},BT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:ap,category:Qd,default:_T,description:ep,dimensions:tp,fonts:ip,id:Xd,name:Yd,props:rp,reactComponent:np,states:op,title:Jd,type:Zd,variants:sp},Symbol.toStringTag,{value:"Module"})),lp="任务条-样式1",dp="任务条-样式1",pp="任务条-样式1",cp="atom",up="原子组件",gp="任务条组件样式1，展示任务标题、副标题、抽奖加成和完成次数。",mp="任务条-样式1",fp={width:702,height:161},xp=[{text:"投一单DOU+",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"normal",usage:"任务标题",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}},{text:"抽奖",family:"Douyin Sans",weight:400,size:"20px",lineHeight:"24px",usage:"抽奖标签",source:{status:"missing",required:"Douyin Sans / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"+1",family:"Douyin Number ABC",weight:500,size:"28px",lineHeight:"24px",usage:"抽奖加成",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"投内容加热、粉丝经营目标且消耗达成30元",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"任务副标题",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"去完成",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"每日可完成1次",family:"Source Han Sans CN",weight:400,size:"20px",lineHeight:"30px",usage:"完成次数文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],hp={autoExposeProps:!0,matchKeywords:["任务条-样式1","任务条","任务","任务标题","任务副标题","NEW标签","抽奖加成","每日可完成"],textProps:["taskTitle","showNewTag","taskSubtitle","rewardCountText","completionText"]},bp=[{id:"default",name:"点击前",schemaId:"任务条-样式1",preserveProps:!0,lockedPropKeys:["buttonGradientStart","buttonGradientEnd"],props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"clicked",name:"点击后",schemaId:"任务条-样式1-点击后",preserveProps:!0,lockedPropKeys:["buttonGradientStart","buttonGradientEnd"],props:{buttonGradientStart:"#FF81BA",buttonGradientEnd:"#FF81BA"}}],yp=[{key:"taskTitle",name:"taskTitle",label:"任务标题",type:"string",default:"投一单DOU+",description:"任务条左上方标题。"},{key:"showNewTag",name:"showNewTag",label:"NEW标签",type:"boolean",default:!1,description:"开启后在任务标题前显示 NEW 标签。"},{key:"taskSubtitle",name:"taskSubtitle",label:"任务副标题",type:"string",default:"投内容加热、粉丝经营目标且消耗达成30元",description:"任务条左下方说明文案。"},{key:"rewardCountText",name:"rewardCountText",label:"抽奖加成",type:"string",default:"+1",description:"抽奖标签右侧加成文字。"},{key:"completionText",name:"completionText",label:"完成次数文案",type:"string",default:"每日可完成1次",description:"按钮下方完成次数文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"},{key:"lotteryTagGradientStart",name:"lotteryTagGradientStart",label:"抽奖标签颜色开始",type:"color",default:"#FF1473"},{key:"lotteryTagGradientEnd",name:"lotteryTagGradientEnd",label:"抽奖标签颜色结束",type:"color",default:"#FF229F"},{key:"rewardCountTextColor",name:"rewardCountTextColor",label:"加成文字",type:"color",default:"#FF62A0"}],wp=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F",lotteryTagGradientStart:"#FF1473",lotteryTagGradientEnd:"#FF229F",rewardCountTextColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF190E",buttonGradientEnd:"#FF166E",lotteryTagGradientStart:"#FF190E",lotteryTagGradientEnd:"#FF166E",rewardCountTextColor:"#FF6265"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",lotteryTagGradientStart:"#FF4501",lotteryTagGradientEnd:"#FF7C02",rewardCountTextColor:"#FF8F4A"}}],AT={id:lp,name:dp,title:pp,type:cp,category:up,description:gp,reactComponent:mp,dimensions:fp,fonts:xp,blueprint:hp,states:bp,props:yp,variants:wp},MT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:hp,category:up,default:AT,description:gp,dimensions:fp,fonts:xp,id:lp,name:dp,props:yp,reactComponent:mp,states:bp,title:pp,type:cp,variants:wp},Symbol.toStringTag,{value:"Module"})),vp="任务条-样式2",Sp="任务条-样式2",Tp="任务条-样式2",$p="atom",Cp="原子组件",Ip="任务条组件样式2，展示任务标签、任务标题、副标题、抽奖加成和完成次数。",kp="任务条-样式2",Pp={width:702,height:161},zp=[{text:"任务1",family:"Source Han Sans CN",weight:700,size:"20px",lineHeight:"30px",usage:"任务标签",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"投放DOU+现金消耗≥30元",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"normal",usage:"任务标题",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}},{text:"抽奖",family:"Douyin Sans",weight:400,size:"20px",lineHeight:"24px",usage:"抽奖标签",source:{status:"missing",required:"Douyin Sans / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"+1",family:"Douyin Number ABC",weight:500,size:"28px",lineHeight:"24px",usage:"抽奖加成",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"投粉丝经营、内容加热目标且消耗达标",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"任务副标题",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"去完成",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"12次/天",family:"Source Han Sans CN",weight:400,size:"20px",lineHeight:"30px",usage:"完成次数文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Fp={autoExposeProps:!0,matchKeywords:["任务条-样式2","任务条","任务","任务1","任务2","任务标题","任务副标题","抽奖加成","每日可完成"],textProps:["taskType","taskTitle","taskSubtitle","rewardCountText","completionText"]},Np=[{key:"taskType",name:"taskType",label:"任务标签",type:"string",default:"任务1",description:"左上角任务标签。输入任务1时标签颜色为 #FFC544；输入任务2时标签颜色为 #5AB7FF。"},{key:"taskTitle",name:"taskTitle",label:"任务标题",type:"string",default:"投放DOU+现金消耗≥30元",description:"任务条左上方标题。"},{key:"taskSubtitle",name:"taskSubtitle",label:"任务副标题",type:"string",default:"投粉丝经营、内容加热目标且消耗达标",description:"任务条左下方说明文案。"},{key:"rewardCountText",name:"rewardCountText",label:"抽奖加成",type:"string",default:"+1",description:"抽奖标签右侧加成文字。"},{key:"completionText",name:"completionText",label:"完成次数文案",type:"string",default:"12次/天",description:"按钮下方完成次数文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"},{key:"lotteryTagGradientStart",name:"lotteryTagGradientStart",label:"抽奖标签颜色开始",type:"color",default:"#FF1473"},{key:"lotteryTagGradientEnd",name:"lotteryTagGradientEnd",label:"抽奖标签颜色结束",type:"color",default:"#FF229F"},{key:"rewardCountTextColor",name:"rewardCountTextColor",label:"加成文字",type:"color",default:"#FF62A0"}],Ep=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F",lotteryTagGradientStart:"#FF1473",lotteryTagGradientEnd:"#FF229F",rewardCountTextColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF190E",buttonGradientEnd:"#FF166E",lotteryTagGradientStart:"#FF190E",lotteryTagGradientEnd:"#FF166E",rewardCountTextColor:"#FF6265"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",lotteryTagGradientStart:"#FF4501",lotteryTagGradientEnd:"#FF7C02",rewardCountTextColor:"#FF8F4A"}}],jT={id:vp,name:Sp,title:Tp,type:$p,category:Cp,description:Ip,reactComponent:kp,dimensions:Pp,fonts:zp,blueprint:Fp,props:Np,variants:Ep},RT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Fp,category:Cp,default:jT,description:Ip,dimensions:Pp,fonts:zp,id:vp,name:Sp,props:Np,reactComponent:kp,title:Tp,type:$p,variants:Ep},Symbol.toStringTag,{value:"Module"})),_p="内容按钮",Bp="内容按钮",Ap="内容按钮",Mp="atom",jp="原子组件",Rp="内容区域主按钮组件。",Hp="内容按钮",Dp={width:368,height:83},Lp=[{text:"一键上热门",family:"Source Han Sans CN",weight:700,size:"32px",lineHeight:"40px",usage:"文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],Gp={autoExposeProps:!0,matchKeywords:["内容按钮","一键上热门","按钮","主按钮"],textProps:["buttonText"]},Op=[{key:"buttonText",name:"buttonText",label:"文案",type:"string",default:"一键上热门",description:"按钮展示文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"}],Vp=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7B02"}}],HT={id:_p,name:Bp,title:Ap,type:Mp,category:jp,description:Rp,reactComponent:Hp,dimensions:Dp,fonts:Lp,blueprint:Gp,props:Op,variants:Vp},DT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Gp,category:jp,default:HT,description:Rp,dimensions:Dp,fonts:Lp,id:_p,name:Bp,props:Op,reactComponent:Hp,title:Ap,type:Mp,variants:Vp},Symbol.toStringTag,{value:"Module"})),Up="内容案例-样式1",Kp="内容案例-样式1",qp="内容案例-样式1",Wp="atom",Xp="原子组件",Yp="内容案例组件，展示三组投放案例、策略说明和效果数据。",Jp="内容案例-样式1",Zp={width:590,height:1327},Qp={autoExposeProps:!1,matchKeywords:["内容案例-样式1","内容案例","用户教育案例","投放案例","投放策略","投放效果"],textProps:[]},ec=[],LT={id:Up,name:Kp,title:qp,type:Wp,category:Xp,description:Yp,reactComponent:Jp,dimensions:Zp,blueprint:Qp,props:ec},GT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Qp,category:Xp,default:LT,description:Yp,dimensions:Zp,id:Up,name:Kp,props:ec,reactComponent:Jp,title:qp,type:Wp},Symbol.toStringTag,{value:"Module"})),nc="内容案例-样式2",tc="内容案例-样式2",ic="内容案例-样式2",ac="atom",oc="原子组件",rc="内容案例组件，展示三组投放案例、策略说明和投放效果数据。",sc="内容案例-样式2",lc={width:1121,height:1027},dc={autoExposeProps:!1,matchKeywords:["内容案例-样式2","内容案例","投放案例","投放策略","投放效果"],textProps:[]},pc=[],OT={id:nc,name:tc,title:ic,type:ac,category:oc,description:rc,reactComponent:sc,dimensions:lc,blueprint:dc,props:pc},VT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:dc,category:oc,default:OT,description:rc,dimensions:lc,id:nc,name:tc,props:pc,reactComponent:sc,title:ic,type:ac},Symbol.toStringTag,{value:"Module"})),cc="内容诊断-样式1-点击前",uc="内容诊断-样式1-点击前",gc="内容诊断-样式1-点击前",mc="atom",fc="原子组件",xc="内容诊断入口组件，展示潜力视频提示和生成报告按钮。",hc="内容诊断-样式1-点击前",bc={width:702,height:105.2},yc=[{text:"发现你有一条潜力视频！",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"内容",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"立即生成报告",family:"Source Han Sans CN",weight:700,size:"22px",lineHeight:"normal",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],wc={autoExposeProps:!0,matchKeywords:["内容诊断","内容诊断样式1","内容诊断-样式-点击后","潜力视频","生成报告","立即生成报告"],textProps:["contentText","buttonText"]},vc=[{id:"default",name:"点击前",schemaId:"内容诊断-样式1-点击前",preserveProps:!0},{id:"clicked",name:"点击后",schemaId:"内容诊断-样式-点击后",preserveProps:!0}],Sc=[{key:"contentText",name:"contentText",label:"内容",type:"string",default:"发现你有一条潜力视频！",description:"左侧内容提示文案。"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即生成报告",description:"右侧按钮展示文案。"},{key:"buttonBorderColor",name:"buttonBorderColor",label:"按钮边缘色",type:"color",default:"#FF62A0"},{key:"buttonTextColor",name:"buttonTextColor",label:"按钮字体颜色",type:"color",default:"#FF1B77"}],Tc=[{id:"default_pink",name:"默认粉色套",props:{buttonBorderColor:"#FF62A0",buttonTextColor:"#FF1B77"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonBorderColor:"#FF1914",buttonTextColor:"#FF1914"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonBorderColor:"#FF4A01",buttonTextColor:"#FF4A01"}}],UT={id:cc,name:uc,title:gc,type:mc,category:fc,description:xc,reactComponent:hc,dimensions:bc,fonts:yc,blueprint:wc,states:vc,props:Sc,variants:Tc},KT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:wc,category:fc,default:UT,description:xc,dimensions:bc,fonts:yc,id:cc,name:uc,props:Sc,reactComponent:hc,states:vc,title:gc,type:mc,variants:Tc},Symbol.toStringTag,{value:"Module"})),$c="内容诊断-账号诊断",Cc="内容诊断-账号诊断",Ic="内容诊断-账号诊断",kc="atom",Pc="原子组件",zc="账号诊断组件，展示账号增长诊断提示和投放按钮。",Fc="内容诊断-账号诊断",Nc={width:702,height:191.25},Ec=[{text:"一键上热门",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"近一周的涨粉速度对比上周下降40%",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"建议投放「粉丝量」, 提升涨粉速度。",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"说明文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],_c={autoExposeProps:!0,matchKeywords:["内容诊断-账号诊断","内容诊断账号诊断","账号诊断","涨粉速度","粉丝量"],textProps:["buttonText","titleText","descriptionText"]},Bc=[{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"一键上热门",description:"按钮展示文案。"},{key:"titleText",name:"titleText",label:"标题",type:"string",default:"近一周的涨粉速度对比上周下降40%",description:"账号诊断标题文案。"},{key:"descriptionText",name:"descriptionText",label:"说明文",type:"string",default:"建议投放「粉丝量」, 提升涨粉速度。",description:"账号诊断说明文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"}],Ac=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7B02"}}],qT={id:$c,name:Cc,title:Ic,type:kc,category:Pc,description:zc,reactComponent:Fc,dimensions:Nc,fonts:Ec,blueprint:_c,props:Bc,variants:Ac},WT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:_c,category:Pc,default:qT,description:zc,dimensions:Nc,fonts:Ec,id:$c,name:Cc,props:Bc,reactComponent:Fc,title:Ic,type:kc,variants:Ac},Symbol.toStringTag,{value:"Module"})),Mc="发券-样式1",jc="发券-样式1",Rc="发券-样式1",Hc="atom",Dc="原子组件",Lc="发券卡片样式，展示券名称、金额、条件和中按钮。",Gc="发券-样式1",Oc={width:702.36,height:198.1},Vc=[{text:"周年庆惊喜流量补贴券",family:"MFBenHeiNoncommercial",weight:400,size:"36px",lineHeight:"40px",usage:"券名称",source:{status:"exact",file:"造字工房本黑体.ttf"}},{text:"￥",family:"Source Han Sans CN",weight:700,size:"30px",lineHeight:"40px",usage:"金额符号",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"800",family:"Douyin Number ABC",weight:800,size:"76px",lineHeight:"84px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"限量5000张",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"立即抢",family:"Source Han Sans CN",weight:600,size:"32px",lineHeight:"40px",usage:"中按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}}],Uc={autoExposeProps:!0,matchKeywords:["发券-样式1","发券","优惠券","流量补贴券","周年庆惊喜流量补贴券","立即领取"],textProps:["couponName","amountText","conditionText","actionText"]},Kc=[{key:"couponName",name:"couponName",label:"券名称",type:"string",default:"周年庆惊喜流量补贴券",description:"卡片左上方券名称。"},{key:"amountText",name:"amountText",label:"金额",type:"string",default:"800",description:"券金额数字，组件固定显示人民币符号。"},{key:"conditionText",name:"conditionText",label:"条件",type:"string",default:"限量5000张",description:"金额右侧条件文案。"},{key:"actionText",name:"actionText",label:"中按钮文案",type:"string",default:"立即抢",description:"右侧中按钮文案。"},{key:"middleButtonGradientStart",name:"middleButtonGradientStart",label:"中按钮渐变开始",type:"color",default:"#FF1473"},{key:"middleButtonGradientEnd",name:"middleButtonGradientEnd",label:"中按钮渐变结束",type:"color",default:"#FF229F"},{key:"amountTextColor",name:"amountTextColor",label:"金额文字色",type:"color",default:"#FF1B77"}],qc=[{id:"default_pink",name:"默认粉色套",props:{middleButtonGradientStart:"#FF1473",middleButtonGradientEnd:"#FF229F",amountTextColor:"#FF1B77"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{middleButtonGradientStart:"#FF180C",middleButtonGradientEnd:"#FF166F",amountTextColor:"#FF134E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{middleButtonGradientStart:"#FF4400",middleButtonGradientEnd:"#FF7C02",amountTextColor:"#FF1A1D"}}],XT={id:Mc,name:jc,title:Rc,type:Hc,category:Dc,description:Lc,reactComponent:Gc,dimensions:Oc,fonts:Vc,blueprint:Uc,props:Kc,variants:qc},YT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Uc,category:Dc,default:XT,description:Lc,dimensions:Oc,fonts:Vc,id:Mc,name:jc,props:Kc,reactComponent:Gc,title:Rc,type:Hc,variants:qc},Symbol.toStringTag,{value:"Module"})),Wc="发券-样式2",Xc="发券-样式2",Yc="发券-样式2",Jc="atom",Zc="原子组件",Qc="发券卡片样式2，展示金额和剩余使用条件。",eu="发券-样式2",nu={width:608,height:201.71},tu=[{text:"仅剩 1 天使用",family:"Source Han Sans CN",weight:400,size:"26px",lineHeight:"30px",usage:"条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"DOU+",family:"Douyin Sans",weight:400,size:"42px",lineHeight:"normal",usage:"标题英文",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"优惠券",family:"Source Han Sans CN",weight:700,size:"40px",lineHeight:"56px",usage:"标题中文",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"880",family:"Douyin Number ABC",weight:700,size:"76px",lineHeight:"84px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-Bold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"38px",usage:"金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],iu={autoExposeProps:!0,matchKeywords:["发券-样式2","发券","优惠券","仅剩1天使用","仅剩 1 天使用"],textProps:["amountText","conditionText"]},au=[{key:"amountText",name:"amountText",label:"金额",type:"string",default:"880",description:"券金额数字，组件固定显示“元”单位。"},{key:"conditionText",name:"conditionText",label:"条件",type:"string",default:"仅剩 1 天使用",description:"右侧条件文案。"},{key:"subtractGradientStart",name:"subtractGradientStart",label:"Subtract 渐变开始",type:"color",default:"#FF1473"},{key:"subtractGradientEnd",name:"subtractGradientEnd",label:"Subtract 渐变结束",type:"color",default:"#FF229F"},{key:"rectangleColor",name:"rectangleColor",label:"Rectangle 2131355592",type:"color",default:""},{key:"iconGradientStart",name:"iconGradientStart",label:"icon 渐变开始",type:"color",default:"#FF44A9"},{key:"iconGradientEnd",name:"iconGradientEnd",label:"icon 渐变结束",type:"color",default:"#FF2B8A"}],ou=[{id:"default_pink",name:"默认粉色套",props:{subtractGradientStart:"#FF1473",subtractGradientEnd:"#FF229F",rectangleColor:"",iconGradientStart:"#FF44A9",iconGradientEnd:"#FF2B8A"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{subtractGradientStart:"#FF180C",subtractGradientEnd:"#FF166F",rectangleColor:"#FFA6BD",iconGradientStart:"#F60052",iconGradientEnd:"#FF0D3F"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{subtractGradientStart:"#FF4F01",subtractGradientEnd:"#FF7C02",rectangleColor:"#FF9597",iconGradientStart:"#FF6B02",iconGradientEnd:"#FF5B1A"}}],JT={id:Wc,name:Xc,title:Yc,type:Jc,category:Zc,description:Qc,reactComponent:eu,dimensions:nu,fonts:tu,blueprint:iu,props:au,variants:ou},ZT=Object.freeze(Object.defineProperty({__proto__:null,blueprint:iu,category:Zc,default:JT,description:Qc,dimensions:nu,fonts:tu,id:Wc,name:Xc,props:au,reactComponent:eu,title:Yc,type:Jc,variants:ou},Symbol.toStringTag,{value:"Module"})),ru="发券-样式3",su="发券-样式3",lu="发券-样式3",du="atom",pu="原子组件",cu="发券卡片样式3，展示金额和限量条件。",uu="发券-样式3",gu={width:607,height:198},mu=[{text:"限量20张",family:"Source Han Sans CN",weight:400,size:"26px",lineHeight:"30px",usage:"条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"DOU+",family:"Douyin Sans",weight:400,size:"42px",lineHeight:"normal",usage:"标题英文",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"优惠券",family:"Source Han Sans CN",weight:700,size:"40px",lineHeight:"56px",usage:"标题中文",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"满100元赠",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"42px",usage:"条件说明",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}},{text:"七夕专项",family:"Douyin Sans",weight:300,size:"24px",lineHeight:"1",usage:"专项标签",source:{status:"missing",required:"Douyin Sans Light / 300",note:"当前字体包只有 DouyinSansBold.ttf，组件按原始 font-family 和 300 字重声明渲染。"}},{text:"520",family:"Douyin Number ABC",weight:600,size:"76px",lineHeight:"84px",usage:"金额",source:{status:"missing",required:"Douyin Number ABC / 600",note:"组件按原始 font-weight: 600 声明渲染，当前字体包未提供 600 字重文件。"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"149.24%",usage:"金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],fu={autoExposeProps:!0,matchKeywords:["发券-样式3","发券","优惠券","限量20张","限量","满100元赠"],textProps:["amountText","conditionText","giftConditionText","specialText"]},xu=[{key:"amountText",name:"amountText",label:"金额",type:"string",default:"520",description:"券金额数字，组件固定显示“元”单位。"},{key:"conditionText",name:"conditionText",label:"条件",type:"string",default:"限量20张",description:"右侧条件文案。"},{key:"giftConditionText",name:"giftConditionText",label:"赠送条件",type:"string",default:"满100元赠",description:"左侧金额上方条件文案。"},{key:"specialText",name:"specialText",label:"专项标签",type:"string",default:"七夕专项",description:"右上角专项标签文案。"},{key:"subtractGradientStart",name:"subtractGradientStart",label:"Subtract 渐变开始",type:"color",default:"#FF1473"},{key:"subtractGradientEnd",name:"subtractGradientEnd",label:"Subtract 渐变结束",type:"color",default:"#FF229F"},{key:"rectangleColor",name:"rectangleColor",label:"Rectangle 2131355592",type:"color",default:""},{key:"iconGradientStart",name:"iconGradientStart",label:"icon 渐变开始",type:"color",default:"#FF44A9"},{key:"iconGradientEnd",name:"iconGradientEnd",label:"icon 渐变结束",type:"color",default:"#FF2B8A"}],hu=[{id:"default_pink",name:"默认粉色套",props:{subtractGradientStart:"#FF1473",subtractGradientEnd:"#FF229F",rectangleColor:"",iconGradientStart:"#FF44A9",iconGradientEnd:"#FF2B8A"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{subtractGradientStart:"#FF180C",subtractGradientEnd:"#FF166F",rectangleColor:"#FFA6BD",iconGradientStart:"#F60052",iconGradientEnd:"#FF0D3F"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{subtractGradientStart:"#FF4F01",subtractGradientEnd:"#FF7C02",rectangleColor:"#FF9597",iconGradientStart:"#FF6B02",iconGradientEnd:"#FF5B1A"}}],QT={id:ru,name:su,title:lu,type:du,category:pu,description:cu,reactComponent:uu,dimensions:gu,fonts:mu,blueprint:fu,props:xu,variants:hu},e4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:fu,category:pu,default:QT,description:cu,dimensions:gu,fonts:mu,id:ru,name:su,props:xu,reactComponent:uu,title:lu,type:du,variants:hu},Symbol.toStringTag,{value:"Module"})),bu="发券-样式4-已结束",yu="发券-样式4-已结束",wu="发券-样式4-已结束",vu="atom",Su="原子组件",Tu="三列优惠券发放组件（已结束态），展示数量、金额、使用条件和按钮。按钮文案默认「已结束」，按钮颜色三色系父级绑定：粉色父级#FF9ECA、蓝色父级#FF8290、橘色父级#FF8571。",$u="发券-样式4-已结束",Cu={width:618,height:333},Iu=[{text:"限量10个",family:"Douyin Sans",weight:400,size:"24px",lineHeight:"40px",usage:"数量文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"880",family:"Douyin Number ABC",weight:500,size:"62px",lineHeight:"62px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"满100元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"已结束",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],ku={autoExposeProps:!0,matchKeywords:["发券-样式4-已结束","发券-样式4","发券","优惠券","DOU+福利券","已结束","结束态","数量文案","金额","使用条件","按钮文字"],textProps:["firstQuantityText","firstAmountText","firstConditionText","firstButtonText","secondQuantityText","secondAmountText","secondConditionText","secondButtonText","thirdQuantityText","thirdAmountText","thirdConditionText","thirdButtonText"]},Pu=[{key:"firstQuantityText",name:"firstQuantityText",label:"第一张数量文案",type:"string",default:"限量10个"},{key:"firstAmountText",name:"firstAmountText",label:"第一张金额",type:"string",default:"880"},{key:"firstConditionText",name:"firstConditionText",label:"第一张使用条件",type:"string",default:"满100元可用"},{key:"firstButtonText",name:"firstButtonText",label:"第一张按钮文字",type:"string",default:"已结束"},{key:"secondQuantityText",name:"secondQuantityText",label:"第二张数量文案",type:"string",default:"限量30个"},{key:"secondAmountText",name:"secondAmountText",label:"第二张金额",type:"string",default:"88"},{key:"secondConditionText",name:"secondConditionText",label:"第二张使用条件",type:"string",default:"满100元可用"},{key:"secondButtonText",name:"secondButtonText",label:"第二张按钮文字",type:"string",default:"已结束"},{key:"thirdQuantityText",name:"thirdQuantityText",label:"第三张数量文案",type:"string",default:"限量50个"},{key:"thirdAmountText",name:"thirdAmountText",label:"第三张金额",type:"string",default:"8"},{key:"thirdConditionText",name:"thirdConditionText",label:"第三张使用条件",type:"string",default:"满100元可用"},{key:"thirdButtonText",name:"thirdButtonText",label:"第三张按钮文字",type:"string",default:"已结束"},{key:"titleBackgroundColor",name:"titleBackgroundColor",label:"标题底色",type:"color",default:"#FF62A0"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF9ECA"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF9ECA"}],zu=[{id:"default_pink",name:"默认粉色套",props:{titleBackgroundColor:"#FF62A0",buttonGradientStart:"#FF9ECA",buttonGradientEnd:"#FF9ECA"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{titleBackgroundColor:"#FF6265",buttonGradientStart:"#FF8290",buttonGradientEnd:"#FF8290"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{titleBackgroundColor:"#FF8F4A",buttonGradientStart:"#FF8571",buttonGradientEnd:"#FF8571"}}],n4={id:bu,name:yu,title:wu,type:vu,category:Su,description:Tu,reactComponent:$u,dimensions:Cu,fonts:Iu,blueprint:ku,props:Pu,variants:zu},t4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:ku,category:Su,default:n4,description:Tu,dimensions:Cu,fonts:Iu,id:bu,name:yu,props:Pu,reactComponent:$u,title:wu,type:vu,variants:zu},Symbol.toStringTag,{value:"Module"})),Fu="发券-样式4-已预约",Nu="发券-样式4-已预约",Eu="发券-样式4-已预约",_u="atom",Bu="原子组件",Au="三列优惠券发放组件（已预约态），展示数量、金额、使用条件和按钮。按钮文案默认「已预约」。",Mu="发券-样式4-已预约",ju={width:618,height:333},Ru=[{text:"限量10个",family:"Douyin Sans",weight:400,size:"24px",lineHeight:"40px",usage:"数量文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"880",family:"Douyin Number ABC",weight:500,size:"62px",lineHeight:"62px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"满100元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"已预约",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],Hu={autoExposeProps:!0,matchKeywords:["发券-样式4-已预约","发券-样式4","发券","优惠券","DOU+福利券","已预约","预约后","数量文案","金额","使用条件","按钮文字"],textProps:["firstQuantityText","firstAmountText","firstConditionText","firstButtonText","secondQuantityText","secondAmountText","secondConditionText","secondButtonText","thirdQuantityText","thirdAmountText","thirdConditionText","thirdButtonText"]},Du=[{key:"firstQuantityText",name:"firstQuantityText",label:"第一张数量文案",type:"string",default:"限量10个"},{key:"firstAmountText",name:"firstAmountText",label:"第一张金额",type:"string",default:"880"},{key:"firstConditionText",name:"firstConditionText",label:"第一张使用条件",type:"string",default:"满100元可用"},{key:"firstButtonText",name:"firstButtonText",label:"第一张按钮文字",type:"string",default:"已预约"},{key:"secondQuantityText",name:"secondQuantityText",label:"第二张数量文案",type:"string",default:"限量30个"},{key:"secondAmountText",name:"secondAmountText",label:"第二张金额",type:"string",default:"88"},{key:"secondConditionText",name:"secondConditionText",label:"第二张使用条件",type:"string",default:"满100元可用"},{key:"secondButtonText",name:"secondButtonText",label:"第二张按钮文字",type:"string",default:"已预约"},{key:"thirdQuantityText",name:"thirdQuantityText",label:"第三张数量文案",type:"string",default:"限量50个"},{key:"thirdAmountText",name:"thirdAmountText",label:"第三张金额",type:"string",default:"8"},{key:"thirdConditionText",name:"thirdConditionText",label:"第三张使用条件",type:"string",default:"满100元可用"},{key:"thirdButtonText",name:"thirdButtonText",label:"第三张按钮文字",type:"string",default:"已预约"},{key:"titleBackgroundColor",name:"titleBackgroundColor",label:"标题底色",type:"color",default:"#FF62A0"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"}],Lu=[{id:"default_pink",name:"默认粉色套",props:{titleBackgroundColor:"#FF62A0",buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{titleBackgroundColor:"#FF6265",buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{titleBackgroundColor:"#FF8F4A",buttonGradientStart:"#FF4500",buttonGradientEnd:"#FF7C03"}}],i4={id:Fu,name:Nu,title:Eu,type:_u,category:Bu,description:Au,reactComponent:Mu,dimensions:ju,fonts:Ru,blueprint:Hu,props:Du,variants:Lu},a4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Hu,category:Bu,default:i4,description:Au,dimensions:ju,fonts:Ru,id:Fu,name:Nu,props:Du,reactComponent:Mu,title:Eu,type:_u,variants:Lu},Symbol.toStringTag,{value:"Module"})),Gu="发券-样式4-立即抢",Ou="发券-样式4-立即抢",Vu="发券-样式4-立即抢",Uu="atom",Ku="原子组件",qu="三列优惠券发放组件（立即抢态），展示数量、金额、使用条件和按钮。按钮文案默认「立即抢」。",Wu="发券-样式4-立即抢",Xu={width:618,height:333},Yu=[{text:"限量10个",family:"Douyin Sans",weight:400,size:"24px",lineHeight:"40px",usage:"数量文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"880",family:"Douyin Number ABC",weight:500,size:"62px",lineHeight:"62px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"满100元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"立即抢",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],Ju={autoExposeProps:!0,matchKeywords:["发券-样式4-立即抢","发券-样式4","发券","优惠券","DOU+福利券","立即抢","抢购","数量文案","金额","使用条件","按钮文字"],textProps:["firstQuantityText","firstAmountText","firstConditionText","firstButtonText","secondQuantityText","secondAmountText","secondConditionText","secondButtonText","thirdQuantityText","thirdAmountText","thirdConditionText","thirdButtonText"]},Zu=[{key:"firstQuantityText",name:"firstQuantityText",label:"第一张数量文案",type:"string",default:"限量10个"},{key:"firstAmountText",name:"firstAmountText",label:"第一张金额",type:"string",default:"880"},{key:"firstConditionText",name:"firstConditionText",label:"第一张使用条件",type:"string",default:"满100元可用"},{key:"firstButtonText",name:"firstButtonText",label:"第一张按钮文字",type:"string",default:"立即抢"},{key:"secondQuantityText",name:"secondQuantityText",label:"第二张数量文案",type:"string",default:"限量30个"},{key:"secondAmountText",name:"secondAmountText",label:"第二张金额",type:"string",default:"88"},{key:"secondConditionText",name:"secondConditionText",label:"第二张使用条件",type:"string",default:"满100元可用"},{key:"secondButtonText",name:"secondButtonText",label:"第二张按钮文字",type:"string",default:"立即抢"},{key:"thirdQuantityText",name:"thirdQuantityText",label:"第三张数量文案",type:"string",default:"限量50个"},{key:"thirdAmountText",name:"thirdAmountText",label:"第三张金额",type:"string",default:"8"},{key:"thirdConditionText",name:"thirdConditionText",label:"第三张使用条件",type:"string",default:"满100元可用"},{key:"thirdButtonText",name:"thirdButtonText",label:"第三张按钮文字",type:"string",default:"立即抢"},{key:"titleBackgroundColor",name:"titleBackgroundColor",label:"标题底色",type:"color",default:"#FF62A0"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"}],Qu=[{id:"default_pink",name:"默认粉色套",props:{titleBackgroundColor:"#FF62A0",buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{titleBackgroundColor:"#FF6265",buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{titleBackgroundColor:"#FF8F4A",buttonGradientStart:"#FF4500",buttonGradientEnd:"#FF7C03"}}],o4={id:Gu,name:Ou,title:Vu,type:Uu,category:Ku,description:qu,reactComponent:Wu,dimensions:Xu,fonts:Yu,blueprint:Ju,props:Zu,variants:Qu},r4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Ju,category:Ku,default:o4,description:qu,dimensions:Xu,fonts:Yu,id:Gu,name:Ou,props:Zu,reactComponent:Wu,title:Vu,type:Uu,variants:Qu},Symbol.toStringTag,{value:"Module"})),eg="发券-样式4",ng="发券-样式4",tg="发券-样式4",ig="atom",ag="原子组件",og="三列优惠券发放组件，展示数量、金额、使用条件和按钮。",rg="发券-样式4",sg={width:618,height:333},lg=[{text:"限量10个",family:"Douyin Sans",weight:400,size:"24px",lineHeight:"40px",usage:"数量文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，组件仍按原始 font-family 和 font-weight 声明渲染。"}},{text:"880",family:"Douyin Number ABC",weight:500,size:"62px",lineHeight:"62px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"满100元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"预约抢",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],dg={autoExposeProps:!0,matchKeywords:["发券-样式4","发券","优惠券","DOU+福利券","预约抢","数量文案","金额","使用条件","按钮文字"],textProps:["firstQuantityText","firstAmountText","firstConditionText","firstButtonText","secondQuantityText","secondAmountText","secondConditionText","secondButtonText","thirdQuantityText","thirdAmountText","thirdConditionText","thirdButtonText"]},pg=[{key:"firstQuantityText",name:"firstQuantityText",label:"第一张数量文案",type:"string",default:"限量10个"},{key:"firstAmountText",name:"firstAmountText",label:"第一张金额",type:"string",default:"880"},{key:"firstConditionText",name:"firstConditionText",label:"第一张使用条件",type:"string",default:"满100元可用"},{key:"firstButtonText",name:"firstButtonText",label:"第一张按钮文字",type:"string",default:"预约抢"},{key:"secondQuantityText",name:"secondQuantityText",label:"第二张数量文案",type:"string",default:"限量30个"},{key:"secondAmountText",name:"secondAmountText",label:"第二张金额",type:"string",default:"88"},{key:"secondConditionText",name:"secondConditionText",label:"第二张使用条件",type:"string",default:"满100元可用"},{key:"secondButtonText",name:"secondButtonText",label:"第二张按钮文字",type:"string",default:"预约抢"},{key:"thirdQuantityText",name:"thirdQuantityText",label:"第三张数量文案",type:"string",default:"限量50个"},{key:"thirdAmountText",name:"thirdAmountText",label:"第三张金额",type:"string",default:"8"},{key:"thirdConditionText",name:"thirdConditionText",label:"第三张使用条件",type:"string",default:"满100元可用"},{key:"thirdButtonText",name:"thirdButtonText",label:"第三张按钮文字",type:"string",default:"预约抢"},{key:"titleBackgroundColor",name:"titleBackgroundColor",label:"标题底色",type:"color",default:"#FF62A0"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"}],cg=[{id:"default_pink",name:"默认粉色套",props:{titleBackgroundColor:"#FF62A0",buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{titleBackgroundColor:"#FF6265",buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{titleBackgroundColor:"#FF8F4A",buttonGradientStart:"#FF4500",buttonGradientEnd:"#FF7C03"}}],s4={id:eg,name:ng,title:tg,type:ig,category:ag,description:og,reactComponent:rg,dimensions:sg,fonts:lg,blueprint:dg,props:pg,variants:cg},l4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:dg,category:ag,default:s4,description:og,dimensions:sg,fonts:lg,id:eg,name:ng,props:pg,reactComponent:rg,title:tg,type:ig,variants:cg},Symbol.toStringTag,{value:"Module"})),ug="大按钮",gg="大按钮",mg="大按钮",fg="atom",xg="原子组件",hg="大按钮组件，展示一个主操作按钮。",bg="大按钮",yg={width:350,height:110},wg=[{text:"去投放",family:"Source Han Sans CN",weight:700,size:"40px",lineHeight:"60px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],vg={autoExposeProps:!0,matchKeywords:["大按钮","按钮","去投放","按钮文案"],textProps:["buttonText"]},Sg=[{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"去投放",description:"按钮展示文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF229F"}],Tg=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166F"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4401",buttonGradientEnd:"#FF7C02"}}],d4={id:ug,name:gg,title:mg,type:fg,category:xg,description:hg,reactComponent:bg,dimensions:yg,fonts:wg,blueprint:vg,props:Sg,variants:Tg},p4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:vg,category:xg,default:d4,description:hg,dimensions:yg,fonts:wg,id:ug,name:gg,props:Sg,reactComponent:bg,title:mg,type:fg,variants:Tg},Symbol.toStringTag,{value:"Module"})),$g="头图",Cg="头图",Ig="头图",kg="atom",Pg="原子组件",zg="头图组件，展示活动主文案和时间按钮。",Fg="头图",Ng={width:750,height:400},Eg=[{text:"抽666元流量大奖",family:"MFBenHeiNoncommercial",weight:400,size:"74px",lineHeight:"96px",usage:"文案",source:{status:"exact",file:"造字工房本黑体.ttf"}},{text:"6月10日-6月21日",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"42px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}}],_g={autoExposeProps:!0,matchKeywords:["头图","头图模块","活动头图","流量大奖","文案"],textProps:["text","dateText"]},Bg=[{key:"text",name:"text",label:"文案",type:"string",default:"抽666元流量大奖",description:"头图主文案，超出宽度后自动折行。"},{key:"dateText",name:"dateText",label:"日期文案",type:"string",default:"6月10日-6月21日",description:"按钮中的日期展示文案。"},{key:"burstColor",name:"burstColor",label:"爆炸图形颜色",type:"color",default:"#FF88C1",description:"爆炸 1 图形的填充颜色，跟随父级背景渐变的第一个颜色。"},{key:"burstOpacity",name:"burstOpacity",label:"爆炸图形透明度",type:"number",default:.5,description:"爆炸 1 图形透明度，部分浅色父级主题会自动提升。"},{key:"mainVisualImage",name:"mainVisualImage",label:"主体图片",type:"image",default:"",description:"头图右侧主体图片，可在预览页替换主体面板中选择。"},{key:"ribbonColor",name:"ribbonColor",label:"彩带颜色",type:"color",default:"#FF62B8",description:"头图左上角彩带颜色，跟随父级色系自动变化。"},{key:"glowOpacity",name:"glowOpacity",label:"氛围光透明度",type:"number",default:.6,description:"头图白色氛围光透明度，部分节点色系会自动降低。"},{key:"textColor",name:"textColor",label:"文案颜色",type:"color",default:"#2C0113"},{key:"buttonBackgroundColor",name:"buttonBackgroundColor",label:"按钮颜色",type:"color",default:"#FF62B8"},{key:"headlineGradientTop",name:"headlineGradientTop",label:"抽奖金额顶部渐变",type:"color",default:"#FF5F5F"},{key:"headlineGradientBottom",name:"headlineGradientBottom",label:"抽奖金额底部渐变",type:"color",default:"#2C0113"}],Ag=[{id:"default_pink",name:"默认粉色套",props:{burstColor:"#FF88C1",buttonBackgroundColor:"#FF62B8",headlineGradientTop:"#FF5F5F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{burstColor:"#88BEFF",buttonBackgroundColor:"#FF6265",headlineGradientTop:"#FF7D65"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{burstColor:"#FFBE88",buttonBackgroundColor:"#FF8F4A",headlineGradientTop:"#FFB047"}}],c4={id:$g,name:Cg,title:Ig,type:kg,category:Pg,description:zg,reactComponent:Fg,dimensions:Ng,fonts:Eg,blueprint:_g,props:Bg,variants:Ag},u4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:_g,category:Pg,default:c4,description:zg,dimensions:Ng,fonts:Eg,id:$g,name:Cg,props:Bg,reactComponent:Fg,title:Ig,type:kg,variants:Ag},Symbol.toStringTag,{value:"Module"})),Mg="奖品-流量券",jg="奖品-流量券",Rg="奖品｜流量券",Hg="atom",Dg="奖品组件",Lg="券面数字可配置的流量券奖品视觉。",Gg="奖品-流量券",Og={width:303.12,height:224},Vg={autoExposeProps:!0,textProps:["amount"]},Ug=[{key:"amount",name:"amount",label:"券面数字",type:"text",default:"10"}],g4={id:Mg,name:jg,title:Rg,type:Hg,category:Dg,description:Lg,reactComponent:Gg,dimensions:Og,blueprint:Vg,props:Ug},m4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Vg,category:Dg,default:g4,description:Lg,dimensions:Og,id:Mg,name:jg,props:Ug,reactComponent:Gg,title:Rg,type:Hg},Symbol.toStringTag,{value:"Module"})),Kg="官方小助手",qg="官方小助手",Wg="官方小助手",Xg="atom",Yg="原子组件",Jg="官方小助手引导组件，包含头像、标题、说明和联系按钮。",Zg="官方小助手",Qg={width:702,height:193},em={autoExposeProps:!0,matchKeywords:["官方小助手","专属管家","专业指导","DOU+认证","立即联系"],textProps:["titleText","contentText","buttonText"]},nm=[{key:"titleText",name:"titleText",label:"标题",type:"string",default:"专属管家专业指导投放"},{key:"contentText",name:"contentText",label:"内容",type:"string",default:"DOU+认证用户专享"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即联系"}],f4={id:Kg,name:qg,title:Wg,type:Xg,category:Yg,description:Jg,reactComponent:Zg,dimensions:Qg,blueprint:em,props:nm},x4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:em,category:Yg,default:f4,description:Jg,dimensions:Qg,id:Kg,name:qg,props:nm,reactComponent:Zg,title:Wg,type:Xg},Symbol.toStringTag,{value:"Module"})),tm="弹窗-中奖",im="弹窗-中奖",am="弹窗-中奖",om="atom",rm="原子组件",sm=!0,lm="中奖弹窗组件，展示中奖标题、金额和奖品文案。",dm="弹窗-中奖",pm={width:576,height:613},cm="auto",um=[{text:"恭喜抽中",family:"MFBenHeiNoncommercial",weight:400,size:"46px",lineHeight:"40px",usage:"标题文案"},{text:"1000",family:"Popup Number ExtraBold",weight:800,size:"95px",lineHeight:"100%",usage:"金额文案"},{text:"元心动券包",family:"MF BenHei(Noncommercial)",weight:400,size:"46px",lineHeight:"40px",usage:"奖品文案"},{text:"满30元赠价值5元流量",family:"Source Han Sans CN",weight:400,size:"30px",lineHeight:"38px",usage:"奖品补充文案",source:{file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"去查看",family:"Source Han Sans CN",weight:700,size:"40px",lineHeight:"60px",usage:"按钮文案",source:{file:"SOURCEHANSANSCN-BOLD.ttf"}}],gm={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["弹窗-中奖","中奖","恭喜抽中","心动券包","弹窗"],textProps:["titleText","amountText","prizeText","prizeSubText","buttonText","selectedPrizeIndex","prize1Text","prize2Text","prize3Text","prize4Text","prize5Text","prize6Text","prize7Text","prize8Text"]},mm=[{id:"win",name:"中奖",schemaId:"弹窗-中奖",preserveProps:!0},{id:"lose",name:"未中奖",schemaId:"弹窗-未中奖"}],fm=[{key:"titleText",name:"titleText",label:"标题文案",type:"string",default:"恭喜抽中",description:"弹窗主标题文案。"},{key:"amountText",name:"amountText",label:"金额文案",type:"string",default:"1000",description:"中奖金额或数字文案。"},{key:"prizeText",name:"prizeText",label:"奖品文案",type:"string",default:"元心动券包",description:"中奖奖品文案。"},{key:"prizeSubText",name:"prizeSubText",label:"奖品补充文案",type:"string",default:"满30元赠价值5元流量",description:"随奖品库同步的中奖奖品补充文案。"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"去查看",description:"中奖弹窗底部按钮文案。"},{key:"selectedPrizeIndex",name:"selectedPrizeIndex",label:"中奖奖品序号",type:"number",default:1,description:"当前中奖弹窗展示第几个九宫格奖品。"},{key:"prizeCount",name:"prizeCount",label:"奖品数量",type:"number",default:8,description:"与当前九宫格中的奖品数量同步。"},{key:"prize1",name:"prize1",label:"奖品1",type:"prize",default:"",description:"同步九宫格奖品1的名称和图片。"},{key:"prize2",name:"prize2",label:"奖品2",type:"prize",default:"",description:"同步九宫格奖品2的名称和图片。"},{key:"prize3",name:"prize3",label:"奖品3",type:"prize",default:"",description:"同步九宫格奖品3的名称和图片。"},{key:"prize4",name:"prize4",label:"奖品4",type:"prize",default:"",description:"同步九宫格奖品4的名称和图片。"},{key:"prize5",name:"prize5",label:"奖品5",type:"prize",default:"",description:"同步九宫格奖品5的名称和图片。"},{key:"prize6",name:"prize6",label:"奖品6",type:"prize",default:"",description:"同步九宫格奖品6的名称和图片。"},{key:"prize7",name:"prize7",label:"奖品7",type:"prize",default:"",description:"同步九宫格奖品7的名称和图片。"},{key:"prize8",name:"prize8",label:"奖品8",type:"prize",default:"",description:"同步九宫格奖品8的名称和图片。"},{key:"prize1Text",name:"prize1Text",label:"奖品1文案",type:"string",default:"1000元心动券包",description:"同步九宫格奖品1文案。"},{key:"prize2Text",name:"prize2Text",label:"奖品2文案",type:"string",default:"6元流量券",description:"同步九宫格奖品2文案。"},{key:"prize3Text",name:"prize3Text",label:"奖品3文案",type:"string",default:"10元流量券",description:"同步九宫格奖品3文案。"},{key:"prize4Text",name:"prize4Text",label:"奖品4文案",type:"string",default:"DOU仔周边",description:"同步九宫格奖品4文案。"},{key:"prize5Text",name:"prize5Text",label:"奖品5文案",type:"string",default:"DOU仔周边",description:"同步九宫格奖品5文案。"},{key:"prize6Text",name:"prize6Text",label:"奖品6文案",type:"string",default:"5元流量券",description:"同步九宫格奖品6文案。"},{key:"prize7Text",name:"prize7Text",label:"奖品7文案",type:"string",default:"DOU+官方推荐机会",description:"同步九宫格奖品7文案。"},{key:"prize8Text",name:"prize8Text",label:"奖品8文案",type:"string",default:"内容诊断积分",description:"同步九宫格奖品8文案。"},{key:"cardGradientStart",name:"cardGradientStart",label:"卡片渐变开始",type:"color",default:"#FFB2C3"},{key:"cardGradientEnd",name:"cardGradientEnd",label:"卡片渐变结束",type:"color",default:"#FF89A3"},{key:"amountColor",name:"amountColor",label:"数字颜色",type:"color",default:"#FF1372"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF229F"}],xm=[{id:"default_pink",name:"默认粉色套",props:{cardGradientStart:"#FFB2C3",cardGradientEnd:"#FF89A3",amountColor:"#FF1372",buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{cardGradientStart:"#FFB2B3",cardGradientEnd:"#FF898C",amountColor:"#FF134E",buttonGradientStart:"#FF180E",buttonGradientEnd:"#FF166F"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{cardGradientStart:"#FFD4B2",cardGradientEnd:"#FFAA78",amountColor:"#FF1A1D",buttonGradientStart:"#FF4401",buttonGradientEnd:"#FF7C02"}}],h4={id:tm,name:im,title:am,type:om,category:rm,canvasOnly:sm,description:lm,reactComponent:dm,dimensions:pm,heightMode:cm,fonts:um,blueprint:gm,states:mm,props:fm,variants:xm},b4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:gm,canvasOnly:sm,category:rm,default:h4,description:lm,dimensions:pm,fonts:um,heightMode:cm,id:tm,name:im,props:fm,reactComponent:dm,states:mm,title:am,type:om,variants:xm},Symbol.toStringTag,{value:"Module"})),hm="弹窗-未中奖",bm="弹窗-未中奖",ym="弹窗-未中奖",wm="atom",vm="原子组件",Sm=!0,Tm="未中奖弹窗组件，展示未中奖标题和引导文案。",$m="弹窗-未中奖",Cm={width:576,height:634},Im=[{text:"很遗憾没有中奖",family:"MFBenHeiNoncommercial",weight:400,size:"46px",lineHeight:"40px",usage:"标题文案"},{text:"先去看看DOU+其他活动吧~",family:"OPPOSans",weight:300,size:"30px",lineHeight:"34px",usage:"引导文案"}],km={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["弹窗-未中奖","未中奖","很遗憾没有中奖","弹窗"],textProps:["titleText","contentText"]},Pm=[{key:"titleText",name:"titleText",label:"标题文案",type:"string",default:"很遗憾没有中奖",description:"弹窗主标题文案。"},{key:"contentText",name:"contentText",label:"引导文案",type:"string",default:"先去看看DOU+其他活动吧~",description:"弹窗副文案。"}],y4={id:hm,name:bm,title:ym,type:wm,category:vm,canvasOnly:Sm,description:Tm,reactComponent:$m,dimensions:Cm,fonts:Im,blueprint:km,props:Pm},w4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:km,canvasOnly:Sm,category:vm,default:y4,description:Tm,dimensions:Cm,fonts:Im,id:hm,name:bm,props:Pm,reactComponent:$m,title:ym,type:wm},Symbol.toStringTag,{value:"Module"})),zm="投稿赢流量-样式2",Fm="投稿赢流量-样式2",Nm="投稿赢流量-样式2",Em="atom",_m="原子组件",Bm="投稿赢流量样式2组件，展示 DOU+ 优惠券奖励信息。",Am="投稿赢流量-样式2",Mm={width:554,height:205},jm=[{text:"200",family:"Douyin Number ABC",weight:600,size:"76px",lineHeight:"84px",usage:"金额",source:{status:"missing",required:"Douyin Number ABC / 600",note:"组件按原始 font-family 和 font-weight 声明渲染，当前字体包未提供 600 字重文件。"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"32px",lineHeight:"normal",usage:"金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"满30元赠",family:"Source Han Sans CN",weight:700,size:"32px",lineHeight:"normal",usage:"赠送条件",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"DOU+",family:"Douyin Sans",weight:400,size:"42px",lineHeight:"normal",usage:"券类型英文",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"优惠券",family:"Source Han Sans CN",weight:700,size:"40px",lineHeight:"56px",usage:"券类型中文",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"共计20名",family:"Source Han Sans CN",weight:400,size:"26px",lineHeight:"30px",usage:"名额说明",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Rm={autoExposeProps:!0,matchKeywords:["投稿赢流量-样式2","投稿赢流量","流量","DOU+","优惠券","满30元赠","共计20名"],textProps:["amountText","giftConditionText","quotaText"]},Hm=[{key:"amountText",name:"amountText",label:"金额",type:"string",default:"200",description:"左侧金额数字文案。"},{key:"giftConditionText",name:"giftConditionText",label:"赠送条件",type:"string",default:"满30元赠",description:"左侧赠送条件文案。"},{key:"quotaText",name:"quotaText",label:"名额说明",type:"string",default:"共计20名",description:"右侧名额说明文案。"}],v4={id:zm,name:Fm,title:Nm,type:Em,category:_m,description:Bm,reactComponent:Am,dimensions:Mm,fonts:jm,blueprint:Rm,props:Hm},S4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Rm,category:_m,default:v4,description:Bm,dimensions:Mm,fonts:jm,id:zm,name:Fm,props:Hm,reactComponent:Am,title:Nm,type:Em},Symbol.toStringTag,{value:"Module"})),Dm="抽奖+消耗返3-3个券",Lm="抽奖+消耗返3-3个券",Gm="抽奖+消耗返3-3个券",Om="atom",Vm="原子组件",Um="抽奖消耗返券组件，展示三档消耗金额，每档可在抽奖任务和消耗返之间切换。",Km="抽奖+消耗返3-3个券",qm={width:600,height:233},Wm=[{text:"30",family:"Douyin Number ABC",weight:800,size:"42px",lineHeight:"35.92px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"24px",lineHeight:"36px",usage:"金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"满赠券",family:"Douyin Sans",weight:400,size:"22px",lineHeight:"normal",usage:"满赠券文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"消耗  30  元",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"30px",usage:"消耗金额",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Xm={autoExposeProps:!0,matchKeywords:["抽奖+消耗返3-3个券","抽奖","消耗返","消耗返券","满赠券","3个券"],textProps:["rewardType1","amountText1","rewardType2","amountText2","rewardType3","amountText3","consumeAmountText1","consumeAmountText2","consumeAmountText3"]},Ym=[{key:"rewardType1",name:"rewardType1",label:"第1档类型",type:"select",default:"抽奖任务",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第一档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText1",name:"amountText1",label:"金额1",type:"string",default:"30",description:"第一张券金额数字，组件固定显示“元”单位。"},{key:"rewardType2",name:"rewardType2",label:"第2档类型",type:"select",default:"消耗返",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第二档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText2",name:"amountText2",label:"金额2",type:"string",default:"30",description:"第二张券金额数字，组件固定显示“元”单位。"},{key:"rewardType3",name:"rewardType3",label:"第3档类型",type:"select",default:"消耗返",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第三档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText3",name:"amountText3",label:"金额3",type:"string",default:"30",description:"第三张券金额数字，组件固定显示“元”单位。"},{key:"consumeAmountText1",name:"consumeAmountText1",label:"消耗金额1",type:"string",default:"30",description:"第一个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"consumeAmountText2",name:"consumeAmountText2",label:"消耗金额2",type:"string",default:"30",description:"第二个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"consumeAmountText3",name:"consumeAmountText3",label:"消耗金额3",type:"string",default:"30",description:"第三个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"frameUnionGradientStart",name:"frameUnionGradientStart",label:"Frame 2147239858 的 Union 渐变开始",type:"color",default:"#FF237B"},{key:"frameUnionGradientEnd",name:"frameUnionGradientEnd",label:"Frame 2147239858 的 Union 渐变结束",type:"color",default:"#FF5EAE"},{key:"iconGradientStart",name:"iconGradientStart",label:"icon 渐变开始",type:"color",default:"#FF1478"},{key:"iconGradientEnd",name:"iconGradientEnd",label:"icon 渐变结束",type:"color",default:"#FF5DAA"},{key:"redPacketUnionGradientStart",name:"redPacketUnionGradientStart",label:"红包主体的 Union 渐变开始",type:"color",default:"#FF237B"},{key:"redPacketUnionGradientEnd",name:"redPacketUnionGradientEnd",label:"红包主体的 Union 渐变结束",type:"color",default:"#FF5EAE"},{key:"redPacketEllipseColor",name:"redPacketEllipseColor",label:"红包主体半圆 Ellipse 44511919 和 Ellipse 44511920",type:"color",default:"#FFC4E5"},{key:"backgroundPanelColor",name:"backgroundPanelColor",label:"背景板",type:"color",default:"#FFC5E5"},{key:"couponLabelColor",name:"couponLabelColor",label:"满赠券文案",type:"color",default:"#FF62A0"},{key:"amountTextColor",name:"amountTextColor",label:"30元文案",type:"color",default:"#FF1372"}],Jm=[{id:"default_pink",name:"默认粉色套",props:{frameUnionGradientStart:"#FF237B",frameUnionGradientEnd:"#FF5EAE",iconGradientStart:"#FF1478",iconGradientEnd:"#FF5DAA",redPacketUnionGradientStart:"#FF237B",redPacketUnionGradientEnd:"#FF5EAE",redPacketEllipseColor:"#FFC4E5",backgroundPanelColor:"#FFC5E5",couponLabelColor:"#FF62A0",amountTextColor:"#FF1372"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{frameUnionGradientStart:"#FF180C",frameUnionGradientEnd:"#FF166F",iconGradientStart:"#FF224F",iconGradientEnd:"#FF3D58",redPacketUnionGradientStart:"#FF4070",redPacketUnionGradientEnd:"#FF4B5E",redPacketEllipseColor:"#FFA6BD",backgroundPanelColor:"#FFA6BD",couponLabelColor:"#FF6265",amountTextColor:"#FF134E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{frameUnionGradientStart:"#FF4641",frameUnionGradientEnd:"#FF6737",iconGradientStart:"#FF3E25",iconGradientEnd:"#FF5E33",redPacketUnionGradientStart:"#FF4343",redPacketUnionGradientEnd:"#FF6A36",redPacketEllipseColor:"#FF9597",backgroundPanelColor:"#FF9597",couponLabelColor:"#FF8F4A",amountTextColor:"#FF1A1D"}}],T4={id:Dm,name:Lm,title:Gm,type:Om,category:Vm,description:Um,reactComponent:Km,dimensions:qm,fonts:Wm,blueprint:Xm,props:Ym,variants:Jm},$4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Xm,category:Vm,default:T4,description:Um,dimensions:qm,fonts:Wm,id:Dm,name:Lm,props:Ym,reactComponent:Km,title:Gm,type:Om,variants:Jm},Symbol.toStringTag,{value:"Module"})),Zm="抽奖九宫格-报名前",Qm="抽奖九宫格-报名前",ef="抽奖九宫格-报名前",nf="atom",tf="原子组件",af="报名前状态的抽奖九宫格组件，奖品位由蓝图奖品变量填入。",of="抽奖九宫格-报名前",rf={width:615.08,height:403},sf=[{text:"DOU仔周边",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"奖品名称",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"50",family:"Douyin Number ABC",weight:600,size:"22.33px",lineHeight:"100%",usage:"积分数量",source:{status:"missing",required:"Douyin Number ABC / 600",note:"当前字体包未确认 600 权重文件，组件仍按原始 font-family 和 font-weight 声明渲染。"}}],lf={autoExposeProps:!0,matchKeywords:["抽奖九宫格-报名前","抽奖九宫格","九宫格","报名","奖品","奖品库"],textProps:["prize1","prize2","prize3","prize4","prize5","prize1ButtonText","prize2ButtonText","prize3ButtonText","prize4ButtonText","prize5ButtonText"],prizeProps:[{prop:"prize1"},{prop:"prize2"},{prop:"prize3"},{prop:"prize4"},{prop:"prize5"}]},df=[{key:"prize1",name:"prize1",label:"奖品1",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize2",name:"prize2",label:"奖品2",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize3",name:"prize3",label:"奖品3",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize4",name:"prize4",label:"奖品4",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize5",name:"prize5",label:"奖品5",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize1ButtonText",name:"prize1ButtonText",label:"奖品1 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品1时，中奖弹窗底部按钮显示的文案。"},{key:"prize2ButtonText",name:"prize2ButtonText",label:"奖品2 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品2时，中奖弹窗底部按钮显示的文案。"},{key:"prize3ButtonText",name:"prize3ButtonText",label:"奖品3 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品3时，中奖弹窗底部按钮显示的文案。"},{key:"prize4ButtonText",name:"prize4ButtonText",label:"奖品4 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品4时，中奖弹窗底部按钮显示的文案。"},{key:"prize5ButtonText",name:"prize5ButtonText",label:"奖品5 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品5时，中奖弹窗底部按钮显示的文案。"}],C4={id:Zm,name:Qm,title:ef,type:nf,category:tf,description:af,reactComponent:of,dimensions:rf,fonts:sf,blueprint:lf,props:df},I4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:lf,category:tf,default:C4,description:af,dimensions:rf,fonts:sf,id:Zm,name:Qm,props:df,reactComponent:of,title:ef,type:nf},Symbol.toStringTag,{value:"Module"})),pf="抽奖九宫格-报名后",cf="抽奖九宫格-报名后",uf="抽奖九宫格-报名后",gf="atom",mf="原子组件",ff="报名后状态的抽奖九宫格组件，8 个奖品位由蓝图奖品库变量填入。",xf="抽奖九宫格-报名后",hf={width:615.08,height:613},bf=[{text:"1000元心动券包",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"奖品名称",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"抽",family:"MFYuanHeiNoncommercial",weight:400,size:"102px",lineHeight:"normal",usage:"抽奖按钮",source:{status:"exact",file:"MFYUANHEI_NONCOMMERCIAL-REGULAR.TTF"}}],yf={autoExposeProps:!0,matchKeywords:["抽奖九宫格-报名后","抽奖九宫格","九宫格","报名后","奖品","奖品库"],textProps:["prize1","prize2","prize3","prize4","prize5","prize6","prize7","prize8","prize1ButtonText","prize2ButtonText","prize3ButtonText","prize4ButtonText","prize5ButtonText","prize6ButtonText","prize7ButtonText","prize8ButtonText"],prizeProps:[{prop:"prize1"},{prop:"prize2"},{prop:"prize3"},{prop:"prize4"},{prop:"prize5"},{prop:"prize6"},{prop:"prize7"},{prop:"prize8"}]},wf=[{key:"prize1",name:"prize1",label:"奖品1",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize2",name:"prize2",label:"奖品2",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize3",name:"prize3",label:"奖品3",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize4",name:"prize4",label:"奖品4",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize5",name:"prize5",label:"奖品5",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize6",name:"prize6",label:"奖品6",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize7",name:"prize7",label:"奖品7",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize8",name:"prize8",label:"奖品8",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize1ButtonText",name:"prize1ButtonText",label:"奖品1 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品1时，中奖弹窗底部按钮显示的文案。"},{key:"prize2ButtonText",name:"prize2ButtonText",label:"奖品2 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品2时，中奖弹窗底部按钮显示的文案。"},{key:"prize3ButtonText",name:"prize3ButtonText",label:"奖品3 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品3时，中奖弹窗底部按钮显示的文案。"},{key:"prize4ButtonText",name:"prize4ButtonText",label:"奖品4 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品4时，中奖弹窗底部按钮显示的文案。"},{key:"prize5ButtonText",name:"prize5ButtonText",label:"奖品5 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品5时，中奖弹窗底部按钮显示的文案。"},{key:"prize6ButtonText",name:"prize6ButtonText",label:"奖品6 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品6时，中奖弹窗底部按钮显示的文案。"},{key:"prize7ButtonText",name:"prize7ButtonText",label:"奖品7 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品7时，中奖弹窗底部按钮显示的文案。"},{key:"prize8ButtonText",name:"prize8ButtonText",label:"奖品8 · 弹窗按钮文案",type:"string",default:"开心收下",description:"抽中奖品8时，中奖弹窗底部按钮显示的文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮底色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮底色结束",type:"color",default:"#FF229F"}],vf=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF190F",buttonGradientEnd:"#FF166F"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4502",buttonGradientEnd:"#FF7C03"}}],k4={id:pf,name:cf,title:uf,type:gf,category:mf,description:ff,reactComponent:xf,dimensions:hf,fonts:bf,blueprint:yf,props:wf,variants:vf},P4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:yf,category:mf,default:k4,description:ff,dimensions:hf,fonts:bf,id:pf,name:cf,props:wf,reactComponent:xf,title:uf,type:gf,variants:vf},Symbol.toStringTag,{value:"Module"})),Sf="抽奖样式2",Tf="抽奖样式2",$f="抽奖样式2",Cf="atom",If="原子组件",kf="三列抽奖奖品组件，奖品位由蓝图奖品库变量填入。",Pf="抽奖样式2",zf={width:626,height:208},Ff="auto",Nf={autoExposeProps:!0,matchKeywords:["抽奖样式2","抽奖","奖品","奖品库"],textProps:["prize1","prize2","prize3","prize4","prize5","prize6","prize7","prize8","prize1ButtonText","prize2ButtonText","prize3ButtonText","prize4ButtonText","prize5ButtonText","prize6ButtonText","prize7ButtonText","prize8ButtonText"],prizeProps:[{prop:"prize1"},{prop:"prize2"},{prop:"prize3"}]},Ef=[{key:"prizeCount",name:"prizeCount",label:"奖品数量",type:"number",default:3,min:1,max:8,description:"控制投放抽奖弹窗奖品变量数量，最多 8 个；画面固定只展示前 3 个奖品。"},{key:"prize1",name:"prize1",label:"奖品1",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize2",name:"prize2",label:"奖品2",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize3",name:"prize3",label:"奖品3",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize4",name:"prize4",label:"奖品4",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize5",name:"prize5",label:"奖品5",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize6",name:"prize6",label:"奖品6",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize7",name:"prize7",label:"奖品7",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize8",name:"prize8",label:"奖品8",type:"prize",default:"",description:"奖品库下拉选择字段。选择奖品后写入该奖品绑定的名称和图片；为空时使用当前占位奖品。"},{key:"prize1ButtonText",name:"prize1ButtonText",label:"奖品1 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize2ButtonText",name:"prize2ButtonText",label:"奖品2 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize3ButtonText",name:"prize3ButtonText",label:"奖品3 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize4ButtonText",name:"prize4ButtonText",label:"奖品4 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize5ButtonText",name:"prize5ButtonText",label:"奖品5 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize6ButtonText",name:"prize6ButtonText",label:"奖品6 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize7ButtonText",name:"prize7ButtonText",label:"奖品7 · 弹窗按钮文案",type:"string",default:"开心收下"},{key:"prize8ButtonText",name:"prize8ButtonText",label:"奖品8 · 弹窗按钮文案",type:"string",default:"开心收下"}],z4={id:Sf,name:Tf,title:$f,type:Cf,category:If,description:kf,reactComponent:Pf,dimensions:zf,heightMode:Ff,blueprint:Nf,props:Ef},F4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Nf,category:If,default:z4,description:kf,dimensions:zf,heightMode:Ff,id:Sf,name:Tf,props:Ef,reactComponent:Pf,title:$f,type:Cf},Symbol.toStringTag,{value:"Module"})),_f="按钮-3-规则可视-点击后",Bf="按钮-3-规则可视-点击后",Af="按钮-3-规则可视-点击后",Mf="atom",jf="原子组件",Rf="按钮-3-规则可视-点击后组件：点击（已报名/已处理）状态下的规则可视按钮，主题自动切换浅粉系列纯色：粉色父#FF9ECA / 蓝色父#FF8290 / 橘色父#FF8571，按钮宽度恒定 228px。",Hf="按钮-3-规则可视-点击后",Df={width:608,height:114},Lf=[{text:"仅限8.18–8.20",family:"Source Han Sans CN",weight:700,size:"22px",lineHeight:"36px",usage:"限制日期",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"投放DOU+ / ≥2单 / （投点赞评论 / 播放量 / 粉丝量目标）",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"36px",usage:"规则说明",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"已报名",family:"Source Han Sans CN",weight:700,size:"32px",lineHeight:"40px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],Gf={autoExposeProps:!0,matchKeywords:["按钮-3-规则可视-点击后","按钮点击后","已报名","规则可视-点击后","规则可视已处理"],textProps:["limitedText","actionText","orderText","targetText","buttonText"]},Of=[{key:"limitedText",name:"limitedText",label:"限制日期",type:"string",default:"仅限8.18–8.20",description:"左侧第一段高亮日期文案。"},{key:"actionText",name:"actionText",label:"投放动作",type:"string",default:"投放DOU+",description:"左侧第一行中间文案。"},{key:"orderText",name:"orderText",label:"单量门槛",type:"string",default:"≥2单",description:"左侧第一行末尾门槛文案。"},{key:"targetText",name:"targetText",label:"目标说明",type:"string",default:"（投点赞评论 / 播放量 / 粉丝量目标）",description:"左侧第二行目标说明文案。"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"已报名",description:"右侧按钮文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF9ECA"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF9ECA"}],Vf=[{id:"default_pink",name:"默认粉色套（点击后）",props:{buttonGradientStart:"#FF9ECA",buttonGradientEnd:"#FF9ECA"}},{id:"blue_parent",name:"蓝色父级页面（点击后）",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF8290",buttonGradientEnd:"#FF8290"}},{id:"orange_parent",name:"橘色父级页面（点击后）",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF8571",buttonGradientEnd:"#FF8571"}}],N4={id:_f,name:Bf,title:Af,type:Mf,category:jf,description:Rf,reactComponent:Hf,dimensions:Df,fonts:Lf,blueprint:Gf,props:Of,variants:Vf},E4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Gf,category:jf,default:N4,description:Rf,dimensions:Df,fonts:Lf,id:_f,name:Bf,props:Of,reactComponent:Hf,title:Af,type:Mf,variants:Vf},Symbol.toStringTag,{value:"Module"})),Uf="按钮-3-规则可视",Kf="按钮-3-规则可视",qf="按钮-3-规则可视",Wf="atom",Xf="原子组件",Yf="按钮-3-规则可视组件，展示投放规则说明与立即报名按钮。",Jf="按钮-3-规则可视",Zf={width:608,height:114},Qf=[{text:"仅限8.18–8.20",family:"Source Han Sans CN",weight:700,size:"22px",lineHeight:"36px",usage:"限制日期",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"投放DOU+ / ≥2单 / （投点赞评论 / 播放量 / 粉丝量目标）",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"36px",usage:"规则说明",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"立即报名",family:"Source Han Sans CN",weight:700,size:"32px",lineHeight:"40px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],ex={autoExposeProps:!0,matchKeywords:["按钮-3-规则可视","规则可视","投放DOU+","立即报名","投点赞评论","播放量","粉丝量目标"],textProps:["limitedText","actionText","orderText","targetText","buttonText"]},nx=[{key:"limitedText",name:"limitedText",label:"限制日期",type:"string",default:"仅限8.18–8.20",description:"左侧第一段高亮日期文案。"},{key:"actionText",name:"actionText",label:"投放动作",type:"string",default:"投放DOU+",description:"左侧第一行中间文案。"},{key:"orderText",name:"orderText",label:"单量门槛",type:"string",default:"≥2单",description:"左侧第一行末尾门槛文案。"},{key:"targetText",name:"targetText",label:"目标说明",type:"string",default:"（投点赞评论 / 播放量 / 粉丝量目标）",description:"左侧第二行目标说明文案。"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即报名",description:"右侧按钮文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF229F"}],tx=[{id:"default_pink",name:"默认粉色套",props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4401",buttonGradientEnd:"#FF7C02"}}],_4={id:Uf,name:Kf,title:qf,type:Wf,category:Xf,description:Yf,reactComponent:Jf,dimensions:Zf,fonts:Qf,blueprint:ex,props:nx,variants:tx},B4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:ex,category:Xf,default:_4,description:Yf,dimensions:Zf,fonts:Qf,id:Uf,name:Kf,props:nx,reactComponent:Jf,title:qf,type:Wf,variants:tx},Symbol.toStringTag,{value:"Module"})),ix="提示",ax="提示",ox="提示",rx="atom",sx="原子组件",lx="提示条组件，展示一条中奖或活动提示文案。",dx="提示",px={width:629.21,height:40},cx=[{text:"用户XXXXXXX领到抖仔毛绒挂件奖",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"内容",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],ux={autoExposeProps:!0,matchKeywords:["提示","提示条","中奖提示","活动提示"],textProps:["contentText"]},gx=[{key:"contentText",name:"contentText",label:"内容",type:"string",default:"用户XXXXXXX领到抖仔毛绒挂件奖",description:"提示条展示文案。"},{key:"backgroundColor",name:"backgroundColor",label:"背景底色",type:"color",default:"#FFF4F6"},{key:"iconColor",name:"iconColor",label:"矢量icon",type:"color",default:"#FF62A0"},{key:"textColor",name:"textColor",label:"文案颜色",type:"color",default:"#FF62A0"}],mx=[{id:"default_pink",name:"默认粉色套",props:{backgroundColor:"#FFF4F6",iconColor:"#FF62A0",textColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{backgroundColor:"#FFF4F4",iconColor:"#FF6265",textColor:"#FF6265"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{backgroundColor:"#FFFDF0",iconColor:"#FF8F4A",textColor:"#FF8F4A"}}],A4={id:ix,name:ax,title:ox,type:rx,category:sx,description:lx,reactComponent:dx,dimensions:px,fonts:cx,blueprint:ux,props:gx,variants:mx},M4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:ux,category:sx,default:A4,description:lx,dimensions:px,fonts:cx,id:ix,name:ax,props:gx,reactComponent:dx,title:ox,type:rx,variants:mx},Symbol.toStringTag,{value:"Module"})),fx="无活动提示",xx="无活动提示",hx="无活动提示",bx="atom",yx="原子组件",wx="无活动状态提示组件。",vx="无活动提示",Sx={width:664,height:744},Tx={autoExposeProps:!1,matchKeywords:["无活动提示","无活动","活动太火爆了","请稍后再来看看吧"],textProps:[]},$x=[],j4={id:fx,name:xx,title:hx,type:bx,category:yx,description:wx,reactComponent:vx,dimensions:Sx,blueprint:Tx,props:$x},R4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Tx,category:yx,default:j4,description:wx,dimensions:Sx,id:fx,name:xx,props:$x,reactComponent:vx,title:hx,type:bx},Symbol.toStringTag,{value:"Module"})),Cx="智投星内容",Ix="智投星内容",kx="智投星内容",Px="atom",zx="原子组件",Fx="智投星内容介绍组件，展示产品说明和三项能力卖点。",Nx="智投星内容",Ex={width:622,height:315},_x={autoExposeProps:!0,matchKeywords:["智投星内容","智投星","AI智投","智能下单","轻松稳投","精准匹配"],textProps:["introText","card1Title","card1Content","card2Title","card2Content","card3Title","card3Content"]},Bx=[{key:"introText",name:"introText",label:"介绍文案",type:"text",control:"textarea",default:"AI智投聚焦创作者在投放过程中的决策难题，对话式智能下单产品、一站式轻松稳投，帮大家精准匹配需求、选对优化目标，让投放更高效、效果更有保障"},{key:"card1Title",name:"card1Title",label:"卡片1标题",type:"string",default:"更高效"},{key:"card1Content",name:"card1Content",label:"卡片1内容",type:"string",default:"智能下单产品"},{key:"card2Title",name:"card2Title",label:"卡片2标题",type:"string",default:"更轻松"},{key:"card2Content",name:"card2Content",label:"卡片2内容",type:"string",default:"一站式稳投"},{key:"card3Title",name:"card3Title",label:"卡片3标题",type:"string",default:"更精准"},{key:"card3Content",name:"card3Content",label:"卡片3内容",type:"string",default:"精准匹配需求"}],H4={id:Cx,name:Ix,title:kx,type:Px,category:zx,description:Fx,reactComponent:Nx,dimensions:Ex,blueprint:_x,props:Bx},D4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:_x,category:zx,default:H4,description:Fx,dimensions:Ex,id:Cx,name:Ix,props:Bx,reactComponent:Nx,title:kx,type:Px},Symbol.toStringTag,{value:"Module"})),Ax="查看更多",Mx="查看更多",jx="查看更多",Rx="atom",Hx="原子组件",Dx="查看更多入口文案组件。",Lx="查看更多",Gx={width:286,height:33},Ox=[{text:"查看更多内容诊断信息 >>",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Vx={autoExposeProps:!0,matchKeywords:["查看更多","查看更多内容诊断信息","内容诊断信息","更多诊断信息"],textProps:["text"]},Ux=[{key:"text",name:"text",label:"文案",type:"string",default:"查看更多内容诊断信息 >>",description:"查看更多入口展示文案。"}],L4={id:Ax,name:Mx,title:jx,type:Rx,category:Hx,description:Dx,reactComponent:Lx,dimensions:Gx,fonts:Ox,blueprint:Vx,props:Ux},G4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Vx,category:Hx,default:L4,description:Dx,dimensions:Gx,fonts:Ox,id:Ax,name:Mx,props:Ux,reactComponent:Lx,title:jx,type:Rx},Symbol.toStringTag,{value:"Module"})),Kx="标题+抽奖次数",qx="标题+抽奖次数",Wx="标题+抽奖次数",Xx="atom",Yx="原子组件",Jx="标题+抽奖次数组合原子组件。icon 库 14 种 × 3 色（粉/蓝/橘）联动。默认：礼物 biz-gift / 粉色。大小 50x50。距标题 10px。蓝图同步：titleText（标题）、drawCountText（抽奖次数数字）。",Zx="标题+抽奖次数",Qx={width:620,height:50},eh=[{text:"做任务 抽好礼",family:"MFBenHeiNoncommercial",weight:400,size:"36px",lineHeight:"40px",usage:"标题文字",source:{status:"exact",file:"造字工房本黑体.ttf"}},{text:"剩余抽奖次数：",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"normal",usage:"次数说明",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"2",family:"Douyin Number ABC",weight:500,size:"26px",lineHeight:"30px",usage:"抽奖次数数字",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}}],nh={autoExposeProps:!0,matchKeywords:["标题+抽奖次数","标题 抽奖次数","抽奖次数","剩余抽奖次数","做任务 抽好礼","任务抽奖标题","抽奖标题","做任务抽好礼"],textProps:["titleText","drawCountText"]},th=[{key:"titleText",name:"titleText",label:"标题文字",type:"string",default:"做任务 抽好礼"},{key:"drawCountText",name:"drawCountText",label:"抽奖次数数字",type:"string",default:"2"},{key:"iconLibraryId",name:"iconLibraryId",label:"图标（来自 icon 库）",type:"select",options:[{value:"biz-task",label:"任务"},{value:"biz-coupon",label:"券"},{value:"biz-helper",label:"小助手"},{value:"biz-tip",label:"提示"},{value:"biz-calendar",label:"日历"},{value:"biz-case",label:"案例"},{value:"biz-fire",label:"火"},{value:"biz-heart",label:"爱心"},{value:"biz-gift",label:"礼盒"},{value:"biz-redpacket",label:"红包"},{value:"biz-honor",label:"荣誉"},{value:"biz-honor2",label:"荣誉2"},{value:"biz-video",label:"视频"},{value:"biz-limited",label:"限时"}],default:"biz-gift"},{key:"iconColor",name:"iconColor",label:"图标颜色",type:"select",options:[{value:"pink",label:"粉色"},{value:"blue",label:"蓝色"},{value:"orange",label:"橘色"}],default:"pink"}],O4={id:Kx,name:qx,title:Wx,type:Xx,category:Yx,description:Jx,reactComponent:Zx,dimensions:Qx,fonts:eh,blueprint:nh,props:th},V4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:nh,category:Yx,default:O4,description:Jx,dimensions:Qx,fonts:eh,id:Kx,name:qx,props:th,reactComponent:Zx,title:Wx,type:Xx},Symbol.toStringTag,{value:"Module"})),ih="模块标题-正常",ah="模块标题-正常",oh="模块标题-正常",rh="atom",sh="原子组件",lh="模块标题组件，展示图标和标题文案。",dh="模块标题-正常",ph={width:640.13,height:50.09},ch=[{text:"端午消耗返冲刺赢大额券",family:"MFBenHeiNoncommercial",weight:400,size:"36px",lineHeight:"40px",usage:"标题内容",source:{status:"missing",required:"MFBenHeiNoncommercial / 400",note:"当前字体包未找到该字体文件，组件仍按原始 font-family 声明渲染。"}}],uh={autoExposeProps:!0,matchKeywords:["模块标题-正常","模块标题","标题","标题内容"],textProps:["titleText"]},gh=[{key:"titleText",name:"titleText",label:"标题内容",type:"string",default:"端午消耗返冲刺赢大额券",description:"模块标题展示文案。"},{key:"iconVariant",name:"iconVariant",label:"icon色系",type:"string",enum:["current","red","yellow"],default:"current",description:"内部主题图标切换：current（粉色系）/ red（蓝色系）/ yellow（橘色系）。"},{key:"iconType",name:"iconType",label:"icon类型",type:"string",enum:["coupon","alarm","calendar","gift","folder","fire","tip"],default:"coupon",description:"图标形状切换：coupon（券形图标）/ alarm（闹钟图标）/ calendar（日历图标）/ gift（礼物礼盒图标）/ folder（文件夹案例图标）/ fire（火苗图标）/ tip（提示图标）。"}],mh=[{id:"default_pink",name:"默认粉色套",props:{iconVariant:"current"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{iconVariant:"red"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{iconVariant:"yellow"}}],U4={id:ih,name:ah,title:oh,type:rh,category:sh,description:lh,reactComponent:dh,dimensions:ph,fonts:ch,blueprint:uh,props:gh,variants:mh},K4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:uh,category:sh,default:U4,description:lh,dimensions:ph,fonts:ch,id:ih,name:ah,props:gh,reactComponent:dh,title:oh,type:rh,variants:mh},Symbol.toStringTag,{value:"Module"})),fh="横排按钮数据条",xh="横排按钮数据条",hh="横排按钮数据条",bh="atom",yh="原子组件",wh="横排按钮数据条组件，展示累计现金消耗和可抽奖次数。",vh="横排按钮数据条",Sh={width:618,height:74},Th=[{text:"累计现金消耗",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"标签文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"30 / 2",family:"Douyin Number ABC",weight:500,size:"40px",lineHeight:"32px",usage:"消耗金额 / 抽奖次数",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}}],$h={autoExposeProps:!0,matchKeywords:["横排按钮数据条","数据条","累计现金消耗","可抽奖次数","消耗金额","抽奖次数"],textProps:["consumeAmountText","lotteryCountText"]},Ch=[{key:"consumeAmountText",name:"consumeAmountText",label:"消耗金额",type:"string",default:"30",description:"累计现金消耗金额数字，组件固定显示“(元)”单位。"},{key:"lotteryCountText",name:"lotteryCountText",label:"抽奖次数",type:"string",default:"2",description:"可抽奖次数数字。"},{key:"valueTextColor",name:"valueTextColor",label:"消耗金额 抽奖次数",type:"color",default:"#FF1B77"}],Ih=[{id:"default_pink",name:"默认粉色套",props:{valueTextColor:"#FF1B77"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{valueTextColor:"#FF134E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{valueTextColor:"#FF1A1D"}}],q4={id:fh,name:xh,title:hh,type:bh,category:yh,description:wh,reactComponent:vh,dimensions:Sh,fonts:Th,blueprint:$h,props:Ch,variants:Ih},W4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:$h,category:yh,default:q4,description:wh,dimensions:Sh,fonts:Th,id:fh,name:xh,props:Ch,reactComponent:vh,title:hh,type:bh,variants:Ih},Symbol.toStringTag,{value:"Module"})),kh="正文-带底框样式1",Ph="正文-带底框样式1",zh="正文-带底框样式1",Fh="atom",Nh="原子组件",Eh="带底框的正文组件样式1，展示标题和正文。",_h="正文-带底框样式1",Bh={width:626,height:230},Ah="auto",Mh=230,jh=[{text:"#如何参与",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"活动期间，领取任务后并投放DOU+「点赞评论量」「视频播放量」「粉丝量」目标，且现金消耗大于68元的用户，可参与抽奖。每天均可参与一次抽奖活动。",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"正文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Rh={autoExposeProps:!0,matchKeywords:["正文-带底框样式1","正文","带底框","活动规则","标题"],textProps:["titleText","bodyText"]},Hh=[{key:"titleText",name:"titleText",label:"标题",type:"string",default:"#如何参与",description:"正文模块标题。"},{key:"bodyText",name:"bodyText",label:"正文",type:"string",default:"活动期间，领取任务后并投放DOU+「点赞评论量」「视频播放量」「粉丝量」目标，且现金消耗大于68元的用户，可参与抽奖。每天均可参与一次抽奖活动。",description:"正文模块内容。"}],X4={id:kh,name:Ph,title:zh,type:Fh,category:Nh,description:Eh,reactComponent:_h,dimensions:Bh,heightMode:Ah,minHeight:Mh,fonts:jh,blueprint:Rh,props:Hh},Y4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Rh,category:Nh,default:X4,description:Eh,dimensions:Bh,fonts:jh,heightMode:Ah,id:kh,minHeight:Mh,name:Ph,props:Hh,reactComponent:_h,title:zh,type:Fh},Symbol.toStringTag,{value:"Module"})),Dh="正文-带底框样式2",Lh="正文-带底框样式2",Gh="正文-带底框样式2",Oh="atom",Vh="原子组件",Uh="带底框的活动规则正文组件，展示两段标题和说明文案。",Kh="正文-带底框样式2",qh={width:626,height:484},Wh="auto",Xh=484,Yh=[{text:"#如何参与",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"正文内容",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"150%",usage:"正文内容",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Jh={autoExposeProps:!0,matchKeywords:["正文-带底框样式2","带底框样式2","活动规则","规则正文","第一段标题","第一段正文","第一段高亮文本","第二段标题","第二段正文","第二段高亮文本"],textProps:["firstTitleText","firstBodyText","firstHighlightText","secondTitleText","secondBodyText","secondHighlightText"]},Zh=[{key:"firstTitleText",name:"firstTitleText",label:"第一段标题",type:"string",default:"#如何参与",description:"第一段标题文案。"},{key:"firstBodyText",name:"firstBodyText",label:"第一段正文",type:"text",control:"textarea",default:"作品投放指定话题#DOU+春日上热门，并且投放DOU+「点赞评论量、视频播放量、粉丝量」目标，且现金消耗大于30元的用户，可参与抽奖。",description:"第一段正文内容。"},{key:"firstHighlightText",name:"firstHighlightText",label:"第一段高亮文本",type:"text",control:"textarea",default:`#DOU+春日上热门
DOU+「点赞评论量、视频播放量、粉丝量」目标`,description:"第一段正文中需要高亮的完整文本片段，多个片段可用换行、逗号、分号或竖线分隔。"},{key:"secondTitleText",name:"secondTitleText",label:"第二段标题",type:"string",default:"#如何发奖",description:"第二段标题文案。"},{key:"secondBodyText",name:"secondBodyText",label:"第二段正文",type:"text",control:"textarea",default:"活动结束后，官方将完成上述条件的用户，统一完成随机抽奖，获奖名单将于活动结束后2日在活动规则页面展示。中奖用户将在5个工作日内收到DOU+官方账号加热的流量。",description:"第二段正文内容。"},{key:"secondHighlightText",name:"secondHighlightText",label:"第二段高亮文本",type:"text",control:"textarea",default:"用户将在5个工作日内",description:"第二段正文中需要高亮的完整文本片段，多个片段可用换行、逗号、分号或竖线分隔。"}],J4={id:Dh,name:Lh,title:Gh,type:Oh,category:Vh,description:Uh,reactComponent:Kh,dimensions:qh,heightMode:Wh,minHeight:Xh,fonts:Yh,blueprint:Jh,props:Zh},Z4=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Jh,category:Vh,default:J4,description:Uh,dimensions:qh,fonts:Yh,heightMode:Wh,id:Dh,minHeight:Xh,name:Lh,props:Zh,reactComponent:Kh,title:Gh,type:Oh},Symbol.toStringTag,{value:"Module"})),Qh="正文-带底框样式3",eb="正文-带底框样式3",nb="正文-带底框样式3",tb="atom",ib="原子组件",ab="带底框的正文组件样式3，展示三段正文内容。",ob="正文-带底框样式3",rb={width:634,height:517},sb=[{text:"1.最多可邀请 10 位新人好友，每成功邀请 1 位，可获得 1 张优惠券，奖励可叠加，2.获得奖励需同时满足：",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"160%",usage:"第一段正文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"被邀请的好友是从未使用过 DOU+ 投放或最近 1 年内未在 DOU+ 投放的新用户，好友通过你的邀请码成功绑定，活动期间内正常完成一单现金消耗≥30 元的投放（投点赞评论量、播放量、主页浏览量、粉丝量目标）",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"第二段正文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"注意：奖励发放按照好友投放完成进度执行，与邀请先后顺序无关。实际获券面额以“完成助力的好友情况”页面展示为准",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"第三段正文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],lb={autoExposeProps:!0,matchKeywords:["正文-带底框样式3","带底框样式3","正文","带底框","邀请好友","活动规则","第一段正文","第二段正文","第三段正文"],textProps:["firstBodyText","secondBodyText","thirdBodyText"]},db=[{key:"firstBodyText",name:"firstBodyText",label:"第一段正文",type:"string",default:"1.最多可邀请 10 位新人好友，每成功邀请 1 位，可获得 1 张优惠券，奖励可叠加，2.获得奖励需同时满足：",description:"第一段正文内容。"},{key:"secondBodyText",name:"secondBodyText",label:"第二段正文",type:"string",default:"被邀请的好友是从未使用过 DOU+ 投放或最近 1 年内未在 DOU+ 投放的新用户，好友通过你的邀请码成功绑定，活动期间内正常完成一单现金消耗≥30 元的投放（投点赞评论量、播放量、主页浏览量、粉丝量目标）",description:"第二段正文内容。"},{key:"thirdBodyText",name:"thirdBodyText",label:"第三段正文",type:"string",default:"注意：奖励发放按照好友投放完成进度执行，与邀请先后顺序无关。实际获券面额以“完成助力的好友情况”页面展示为准",description:"第三段正文内容。"}],Q4={id:Qh,name:eb,title:nb,type:tb,category:ib,description:ab,reactComponent:ob,dimensions:rb,fonts:sb,blueprint:lb,props:db},e5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:lb,category:ib,default:Q4,description:ab,dimensions:rb,fonts:sb,id:Qh,name:eb,props:db,reactComponent:ob,title:nb,type:tb},Symbol.toStringTag,{value:"Module"})),pb="正文-带消耗阶梯",cb="正文-带消耗阶梯",ub="正文-带消耗阶梯",gb="atom",mb="原子组件",fb="展示参与说明、四档抽奖次数与消耗金额阶梯的正文组件。",xb="正文-带消耗阶梯",hb={width:626,height:314},bb="auto",yb=314,wb=[{text:"#如何参与",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"34px",usage:"标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"活动期间，使用账户内DOU+流量券投放目标，消耗达标得抽奖次数。",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"正文、金额与说明",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"抽奖+1",family:"Douyin Sans",weight:700,size:"20px",lineHeight:"24px",usage:"抽奖标签",source:{status:"exact",file:"DouyinSansBold.ttf"}}],vb={autoExposeProps:!0,matchKeywords:["正文-带消耗阶梯","正文","参与方式","消耗阶梯","抽奖次数","消耗金额"],textProps:["titleText","bodyText","rewardText1","rewardText2","rewardText3","rewardText4","amountText1","amountText2","amountText3","amountText4","footnoteText"]},Sb=[{key:"titleText",name:"titleText",label:"标题",type:"string",default:"#如何参与",description:"组件顶部标题文案。"},{key:"bodyText",name:"bodyText",label:"正文",type:"text",control:"textarea",default:"活动期间，使用账户内DOU+流量券投放「点赞评论量、视频播放量、粉丝量」目标投放，消耗达标得抽奖次数。",description:"标题下方的参与说明正文。"},{key:"rewardText1",name:"rewardText1",label:"第一档抽奖文案",type:"string",default:"抽奖+1",description:"第一档阶梯上方的抽奖标签。"},{key:"rewardText2",name:"rewardText2",label:"第二档抽奖文案",type:"string",default:"抽奖+1",description:"第二档阶梯上方的抽奖标签。"},{key:"rewardText3",name:"rewardText3",label:"第三档抽奖文案",type:"string",default:"抽奖+2",description:"第三档阶梯上方的抽奖标签。"},{key:"rewardText4",name:"rewardText4",label:"第四档抽奖文案",type:"string",default:"抽奖+3",description:"第四档阶梯上方的抽奖标签。"},{key:"amountText1",name:"amountText1",label:"第一档金额",type:"string",default:"30元",description:"第一档消耗金额文案。"},{key:"amountText2",name:"amountText2",label:"第二档金额",type:"string",default:"90元",description:"第二档消耗金额文案。"},{key:"amountText3",name:"amountText3",label:"第三档金额",type:"string",default:"150元",description:"第三档消耗金额文案。"},{key:"amountText4",name:"amountText4",label:"第四档金额",type:"string",default:"200元",description:"第四档消耗金额文案。"},{key:"footnoteText",name:"footnoteText",label:"底部说明",type:"text",control:"textarea",default:"*活动页面数据有延迟请以消耗达成后第二天为准。",description:"阶梯下方的补充说明文案。"},{key:"accentGradientStart",name:"accentGradientStart",label:"强调色开始",type:"color",default:"#FF1473"},{key:"accentGradientEnd",name:"accentGradientEnd",label:"强调色结束",type:"color",default:"#FF229F"}],Tb=[{id:"default_pink",name:"默认粉色套",props:{accentGradientStart:"#FF1473",accentGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{accentGradientStart:"#FF190E",accentGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{accentGradientStart:"#FF4501",accentGradientEnd:"#FF7C02"}}],n5={id:pb,name:cb,title:ub,type:gb,category:mb,description:fb,reactComponent:xb,dimensions:hb,heightMode:bb,minHeight:yb,fonts:wb,blueprint:vb,props:Sb,variants:Tb},t5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:vb,category:mb,default:n5,description:fb,dimensions:hb,fonts:wb,heightMode:bb,id:pb,minHeight:yb,name:cb,props:Sb,reactComponent:xb,title:ub,type:gb,variants:Tb},Symbol.toStringTag,{value:"Module"})),$b="正文-活动规则样式1",Cb="正文-活动规则样式1",Ib="正文-活动规则样式1",kb="atom",Pb="原子组件",zb="活动规则正文组件，展示两段活动说明文案。",Fb="正文-活动规则样式1",Nb={width:596,height:156},Eb="auto",_b=156,Bb=[{text:"正文内容",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px / 149.24%",usage:"正文内容",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"参与下方抽奖",family:"Source Han Sans CN",weight:700,size:"24px",lineHeight:"149.24%",usage:"正文强调",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],Ab={autoExposeProps:!0,matchKeywords:["正文-活动规则样式1","活动规则样式1","活动规则","规则正文","正文内容","加粗文本"],textProps:["contentText","boldText"]},Mb=[{key:"contentText",name:"contentText",label:"正文内容",type:"text",control:"textarea",default:`活动期间下单「内容加热」「粉丝经营」目标，且达成累计现金消耗门槛后，点击「立即领」按钮即可获得优惠券，页面消耗数据于次日更新。
每次达成消耗门槛后还有机会参与下方抽奖。`,description:"活动规则正文内容，换行后会进入第二段容器。"},{key:"boldText",name:"boldText",label:"加粗文本",type:"text",control:"textarea",default:"参与下方抽奖",description:"正文中需要加粗的完整文本片段，多个片段可用换行、逗号、分号或竖线分隔。"}],i5={id:$b,name:Cb,title:Ib,type:kb,category:Pb,description:zb,reactComponent:Fb,dimensions:Nb,heightMode:Eb,minHeight:_b,fonts:Bb,blueprint:Ab,props:Mb},a5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Ab,category:Pb,default:i5,description:zb,dimensions:Nb,fonts:Bb,heightMode:Eb,id:$b,minHeight:_b,name:Cb,props:Mb,reactComponent:Fb,title:Ib,type:kb},Symbol.toStringTag,{value:"Module"})),jb="正文-活动规则样式2",Rb="正文-活动规则样式2",Hb="正文-活动规则样式2",Db="atom",Lb="原子组件",Gb="活动规则正文组件，展示活动参与、奖励瓜分和发放规则。",Ob="正文-活动规则样式2",Vb={width:596,height:716},Ub="auto",Kb=716,qb=[{text:"如何参与？",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"标题内容",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"活动规则正文",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px / 138%",usage:"正文内容",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Wb={autoExposeProps:!0,matchKeywords:["正文-活动规则样式2","活动规则样式2","活动规则","规则正文","第一段标题","第一段正文","第二段标题","第二段正文","第三段标题","第三段正文","加粗文本"],textProps:["firstTitleText","firstBodyText","secondTitleText","secondBodyText","thirdTitleText","thirdBodyText","boldText"]},Xb=[{key:"firstTitleText",name:"firstTitleText",label:"第一段标题",type:"string",default:"如何参与？",description:"第一段规则标题文案。"},{key:"firstBodyText",name:"firstBodyText",label:"第一段正文",type:"text",control:"textarea",default:`1、报名活动：在2月5日-2月18日活动期间, 点击报名按钮即可参与。
2、投放达标：报名后,  投放DOU+「点赞评论量 / 视频播放量 / 粉丝量」目标且累计现金消耗达到瓜分门槛。
累计现金消耗≥68元, 可瓜分15万元流量券
累计现金消耗≥300元, 可再瓜分10万元流量券
累计现金消耗≥800元, 可再瓜分8万元流量券`,description:"第一段规则正文。"},{key:"secondTitleText",name:"secondTitleText",label:"第二段标题",type:"string",default:"奖励如何瓜分？",description:"第二段规则标题文案。"},{key:"secondBodyText",name:"secondBodyText",label:"第二段正文",type:"text",control:"textarea",default:`18号活动结束后,  平台将对应档位奖池的总金额,  平均分给所有成功报名且完成该档位消耗任务的用户。
瓜分公式: 个人可得奖励 = 该档位总奖池➗该档位达标总人数。`,description:"第二段规则正文。"},{key:"thirdTitleText",name:"thirdTitleText",label:"第三段标题",type:"string",default:"奖励如何发放？",description:"第三段规则标题文案。"},{key:"thirdBodyText",name:"thirdBodyText",label:"第三段正文",type:"text",control:"textarea",default:'奖励将在活动结束后 (2.18起) 的7个工作日内,  以 "DOU+流量优惠券" 形式自动发放至您的DOU+账户,  请注意查收并使用。',description:"第三段规则正文。"},{key:"boldText",name:"boldText",label:"加粗文本",type:"text",control:"textarea",default:`报名后,  投放DOU+「点赞评论量 / 视频播放量 / 粉丝量」目标
DOU+流量优惠券`,description:"正文中需要加粗的完整文本片段，多个片段可用换行、逗号、分号或竖线分隔。"},{key:"iconVariant",name:"iconVariant",label:"icon",type:"string",default:"current",description:"内部主题图标切换字段：current / red / yellow。"}],Yb=[{id:"default_pink",name:"默认粉色套",props:{iconVariant:"current"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{iconVariant:"red"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{iconVariant:"yellow"}}],o5={id:jb,name:Rb,title:Hb,type:Db,category:Lb,description:Gb,reactComponent:Ob,dimensions:Vb,heightMode:Ub,minHeight:Kb,fonts:qb,blueprint:Wb,props:Xb,variants:Yb},r5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Wb,category:Lb,default:o5,description:Gb,dimensions:Vb,fonts:qb,heightMode:Ub,id:jb,minHeight:Kb,name:Rb,props:Xb,reactComponent:Ob,title:Hb,type:Db,variants:Yb},Symbol.toStringTag,{value:"Module"})),Jb="正文-活动规则样式3",Zb="正文-活动规则样式3",Qb="正文-活动规则样式3",ey="atom",ny="原子组件",ty="活动规则正文组件，展示活动说明和三条规则正文。",iy="正文-活动规则样式3",ay={width:603,height:318},oy="auto",ry=318,sy=[{text:"活动说明:",family:"Source Han Sans CN",weight:700,size:"28px",lineHeight:"normal",usage:"第一段标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"活动规则正文",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"正文内容",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],ly={autoExposeProps:!0,matchKeywords:["正文-活动规则样式3","活动规则样式3","活动规则","规则正文","活动说明","标题","第一段正文","第二段正文","第三段正文","高亮文本","段落数量"],textProps:["titleText","firstBodyText","secondBodyText","thirdBodyText","highlightText","paragraphCount"]},dy=[{key:"titleText",name:"titleText",label:"标题",type:"string",default:"活动说明:",description:"活动规则标题文案。"},{key:"firstBodyText",name:"firstBodyText",label:"第一段正文",type:"text",control:"textarea",default:"现金消耗满30元开启第一次抽奖，且累计满90/150/200元，可解锁更多抽奖机会，每日最多可抽10次",description:"第一段规则正文。"},{key:"secondBodyText",name:"secondBodyText",label:"第二段正文",type:"text",control:"textarea",default:"活动期间下单「内容加热」「粉丝经营」目标，且达成累计现金消耗门槛后，还可获得流量券，自动下发至DOU+账户。页面消耗数据于次日更新",description:"第二段规则正文。"},{key:"thirdBodyText",name:"thirdBodyText",label:"第三段正文",type:"text",control:"textarea",default:"现金消耗全程累计，投得越多，好礼越多",description:"第三段规则正文。"},{key:"highlightText",name:"highlightText",label:"高亮文本",type:"text",control:"textarea",default:"90/150/200",description:"正文中需要高亮的完整文本片段，多个片段可用换行、逗号、分号或竖线分隔。"},{key:"paragraphCount",name:"paragraphCount",label:"段落数量",type:"string",default:"3",description:"控制红点正文展示几段，可填 1、2 或 3。"},{key:"iconVariant",name:"iconVariant",label:"icon",type:"string",default:"current",description:"内部主题图标切换字段：current / red / yellow。"}],py=[{id:"default_pink",name:"默认粉色套",props:{iconVariant:"current"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{iconVariant:"red"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{iconVariant:"yellow"}}],s5={id:Jb,name:Zb,title:Qb,type:ey,category:ny,description:ty,reactComponent:iy,dimensions:ay,heightMode:oy,minHeight:ry,fonts:sy,blueprint:ly,props:dy,variants:py},l5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:ly,category:ny,default:s5,description:ty,dimensions:ay,fonts:sy,heightMode:oy,id:Jb,minHeight:ry,name:Zb,props:dy,reactComponent:iy,title:Qb,type:ey,variants:py},Symbol.toStringTag,{value:"Module"})),cy="正文-用户教育",uy="正文-用户教育",gy="正文-用户教育",my="atom",fy="原子组件",xy="用户教育正文组件，支持按段展示每段标题和正文。",hy="正文-用户教育",by={width:634,height:860},yy="auto",wy=180,vy={autoExposeProps:!0,matchKeywords:["正文-用户教育","用户教育","投放目标","投放时长","DOU+","段落数量"],textProps:["firstTitleText","firstBodyText","secondTitleText","secondBodyText","thirdTitleText","thirdBodyText","fourthTitleText","fourthBodyText","paragraphCount"]},Sy=[{key:"firstTitleText",name:"firstTitleText",label:"第一段标题",type:"string",default:"投放什么目标？"},{key:"firstBodyText",name:"firstBodyText",label:"第一段正文",type:"text",control:"textarea",default:`需要提升点赞/评论/转化量, 可以选择「点赞评论量」
需要更多视频播放量, 可以选择「视频播放量」
需要粉丝量快速提升, 达成千粉可以选择「粉丝量」`},{key:"secondTitleText",name:"secondTitleText",label:"第二段标题",type:"string",default:"如何选择投放时长?"},{key:"secondBodyText",name:"secondBodyText",label:"第二段正文",type:"text",control:"textarea",default:`优先建议24小时或者12小时投放, 可以匹配性价比最高流量, 建议预算不低于100元
长期运营的账户, 可以拉长周期, 比如3天300元以上`},{key:"thirdTitleText",name:"thirdTitleText",label:"第三段标题",type:"string",default:"什么作品适合投DOU+?"},{key:"thirdBodyText",name:"thirdBodyText",label:"第三段正文",type:"text",control:"textarea",default:`优选系统推荐视频, 如果账号下出现「潜力视频」等系统标签, 建议优先投放
建议多视频投放, 系统会自动选择多个视频中投放效果好的加大预算投入`},{key:"fourthTitleText",name:"fourthTitleText",label:"第四段标题",type:"string",default:"投放影响自然流量么?"},{key:"fourthBodyText",name:"fourthBodyText",label:"第四段正文",type:"text",control:"textarea",default:"DOU+付费流量与自然流量相互独立, 投放不会压制自然流量。优质数据反而可以协同带来更多自然流量。"},{key:"paragraphCount",name:"paragraphCount",label:"段落数量",type:"string",default:"4",description:"控制展示几段，可填 1、2、3 或 4。"}],d5={id:cy,name:uy,title:gy,type:my,category:fy,description:xy,reactComponent:hy,dimensions:by,heightMode:yy,minHeight:wy,blueprint:vy,props:Sy},p5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:vy,category:fy,default:d5,description:xy,dimensions:by,heightMode:yy,id:cy,minHeight:wy,name:uy,props:Sy,reactComponent:hy,title:gy,type:my},Symbol.toStringTag,{value:"Module"})),Ty="流量扶持券",$y="流量扶持券",Cy="流量扶持券",Iy="atom",ky="原子组件",Py="流量扶持券组件，展示流量扶持奖励文案。",zy="流量扶持券",Fy={width:626,height:155},Ny=[{text:"520",family:"Douyin Number ABC",weight:800,size:"50px",lineHeight:"normal",usage:"奖励数字",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"MFBenHeiNoncommercial",weight:400,size:"36px",lineHeight:"40px",usage:"奖励单位",source:{status:"exact",file:"造字工房本黑体.ttf"}},{text:"流量扶持",family:"MFBenHeiNoncommercial",weight:400,size:"36px",lineHeight:"40px",usage:"奖励文案",source:{status:"exact",file:"造字工房本黑体.ttf"}}],Ey={autoExposeProps:!0,matchKeywords:["流量扶持券","流量扶持","流量","520元流量扶持"],textProps:["supportText"]},_y=[{key:"supportText",name:"supportText",label:"文本",type:"string",default:"520元流量扶持",description:"组件展示文本，组件会自动拆分数字和后缀以保持原始版式。"}],c5={id:Ty,name:$y,title:Cy,type:Iy,category:ky,description:Py,reactComponent:zy,dimensions:Fy,fonts:Ny,blueprint:Ey,props:_y},u5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Ey,category:ky,default:c5,description:Py,dimensions:Fy,fonts:Ny,id:Ty,name:$y,props:_y,reactComponent:zy,title:Cy,type:Iy},Symbol.toStringTag,{value:"Module"})),By="消耗返-样式1-3个券",Ay="消耗返-样式1-3个券",My="消耗返-样式1-3个券",jy="atom",Ry="原子组件",Hy="消耗返模块样式1（3个券），三列优惠券卡片展示，包含金额、使用条件、未达标按钮、底部消耗可得文案。",Dy="消耗返-样式1-3个券",Ly={width:600,height:286},Gy=[{text:"满50元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"满减使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"50",family:"Douyin Number ABC",weight:600,size:"50px",lineHeight:"42px",usage:"券金额",source:{status:"exact",file:"DouyinNumberABC-Medium.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"38px",usage:"券金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"未达标",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"消耗30元得",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"30px",usage:"底部消耗可得文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Oy={autoExposeProps:!0,matchKeywords:["消耗返-样式1-3个券","消耗返样式1","消耗返","3个券","优惠券","金额","满多少可用","消耗多少可得","未达标","已达标"],textProps:["firstAmountText","firstConditionText","firstButtonText","secondAmountText","secondConditionText","secondButtonText","thirdAmountText","thirdConditionText","thirdButtonText","firstEarnText","secondEarnText","thirdEarnText"]},Vy=[{key:"firstAmountText",name:"firstAmountText",label:"第一张券金额",type:"string",default:"50"},{key:"firstConditionText",name:"firstConditionText",label:"第一张满多少可用",type:"string",default:"满50元可用"},{key:"firstButtonText",name:"firstButtonText",label:"第一张按钮文案",type:"string",default:"未达标"},{key:"secondAmountText",name:"secondAmountText",label:"第二张券金额",type:"string",default:"50"},{key:"secondConditionText",name:"secondConditionText",label:"第二张满多少可用",type:"string",default:"满50元可用"},{key:"secondButtonText",name:"secondButtonText",label:"第二张按钮文案",type:"string",default:"未达标"},{key:"thirdAmountText",name:"thirdAmountText",label:"第三张券金额",type:"string",default:"50"},{key:"thirdConditionText",name:"thirdConditionText",label:"第三张满多少可用",type:"string",default:"满50元可用"},{key:"thirdButtonText",name:"thirdButtonText",label:"第三张按钮文案",type:"string",default:"未达标"},{key:"firstEarnText",name:"firstEarnText",label:"底部消耗多少可得1",type:"string",default:"消耗30元得"},{key:"secondEarnText",name:"secondEarnText",label:"底部消耗多少可得2",type:"string",default:"消耗60元得"},{key:"thirdEarnText",name:"thirdEarnText",label:"底部消耗多少可得3",type:"string",default:"消耗80元得"},{key:"cardGradientStart",name:"cardGradientStart",label:"卡片背景色开始",type:"color",default:"#FF1473"},{key:"cardGradientEnd",name:"cardGradientEnd",label:"卡片背景色结束",type:"color",default:"#FF229F"},{key:"buttonBackground",name:"buttonBackground",label:"未达标按钮背景色",type:"color",default:"rgba(255, 94, 164, 1)"},{key:"buttonTextColor",name:"buttonTextColor",label:"按钮文字颜色",type:"color",default:"rgba(255, 158, 202, 1)"},{key:"waveAccentColor",name:"waveAccentColor",label:"券身装饰线颜色",type:"color",default:"#FF62A0"}],Uy=[{id:"default_pink",name:"默认粉色套",props:{cardGradientStart:"#FF1473",cardGradientEnd:"#FF229F",buttonBackground:"rgba(255, 94, 164, 1)",buttonTextColor:"rgba(255, 158, 202, 1)",waveAccentColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{cardGradientStart:"#FF180E",cardGradientEnd:"#FF166E",buttonBackground:"#FF8290",buttonTextColor:"#FFB8C9",waveAccentColor:"#FF6068"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{cardGradientStart:"#FF4401",cardGradientEnd:"#FF7C02",buttonBackground:"#FF8571",buttonTextColor:"#FFC9B5",waveAccentColor:"#FF8C3E"}}],g5={id:By,name:Ay,title:My,type:jy,category:Ry,description:Hy,reactComponent:Dy,dimensions:Ly,fonts:Gy,blueprint:Oy,props:Vy,variants:Uy},m5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Oy,category:Ry,default:g5,description:Hy,dimensions:Ly,fonts:Gy,id:By,name:Ay,props:Vy,reactComponent:Dy,title:My,type:jy,variants:Uy},Symbol.toStringTag,{value:"Module"})),Ky="消耗返样式4个券",qy="消耗返样式4个券",Wy="消耗返样式4个券",Xy="atom",Yy="原子组件",Jy="抽奖消耗返券组件，展示四档消耗金额，每档可在抽奖任务和消耗返之间切换。",Zy="消耗返样式4个券",Qy={width:604.09,height:235},e1=[{text:"110",family:"Douyin Number ABC",weight:800,size:"42px",lineHeight:"35.92px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"24px",lineHeight:"36px",usage:"金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"满赠券",family:"Douyin Sans",weight:400,size:"22px",lineHeight:"normal",usage:"满赠券文案",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"消耗  30  元",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"30px",usage:"消耗金额",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],n1={autoExposeProps:!0,matchKeywords:["消耗返样式4个券","消耗返","消耗返券","满赠券","4个券","四个券"],textProps:["rewardType1","amountText1","rewardType2","amountText2","rewardType3","amountText3","rewardType4","amountText4","consumeAmountText1","consumeAmountText2","consumeAmountText3","consumeAmountText4"]},t1=[{key:"rewardType1",name:"rewardType1",label:"第1档类型",type:"select",default:"抽奖任务",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第一档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText1",name:"amountText1",label:"金额1",type:"string",default:"110",description:"第一档券金额数字，组件固定显示“元”单位。"},{key:"rewardType2",name:"rewardType2",label:"第2档类型",type:"select",default:"消耗返",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第二档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText2",name:"amountText2",label:"金额2",type:"string",default:"110",description:"第二档券金额数字，组件固定显示“元”单位。"},{key:"rewardType3",name:"rewardType3",label:"第3档类型",type:"select",default:"消耗返",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第三档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText3",name:"amountText3",label:"金额3",type:"string",default:"110",description:"第三档券金额数字，组件固定显示“元”单位。"},{key:"rewardType4",name:"rewardType4",label:"第4档类型",type:"select",default:"消耗返",options:[{label:"抽奖任务",value:"抽奖任务"},{label:"消耗返",value:"消耗返"}],description:"第四档玩法类型，可在抽奖任务和消耗返之间切换。"},{key:"amountText4",name:"amountText4",label:"金额4",type:"string",default:"110",description:"第四档券金额数字，组件固定显示“元”单位。"},{key:"consumeAmountText1",name:"consumeAmountText1",label:"消耗金额1",type:"string",default:"30",description:"第一个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"consumeAmountText2",name:"consumeAmountText2",label:"消耗金额2",type:"string",default:"30",description:"第二个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"consumeAmountText3",name:"consumeAmountText3",label:"消耗金额3",type:"string",default:"30",description:"第三个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"consumeAmountText4",name:"consumeAmountText4",label:"消耗金额4",type:"string",default:"30",description:"第四个底部消耗金额数字，组件固定显示“消耗”和“元”。"},{key:"frameUnionGradientStart",name:"frameUnionGradientStart",label:"Frame 2147239858 的 Union 渐变开始",type:"color",default:"#FF237B"},{key:"frameUnionGradientEnd",name:"frameUnionGradientEnd",label:"Frame 2147239858 的 Union 渐变结束",type:"color",default:"#FF5EAE"},{key:"iconGradientStart",name:"iconGradientStart",label:"icon 渐变开始",type:"color",default:"#FF1478"},{key:"iconGradientEnd",name:"iconGradientEnd",label:"icon 渐变结束",type:"color",default:"#FF5DAA"},{key:"redPacketUnionGradientStart",name:"redPacketUnionGradientStart",label:"红包主体的 Union 渐变开始",type:"color",default:"#FF237B"},{key:"redPacketUnionGradientEnd",name:"redPacketUnionGradientEnd",label:"红包主体的 Union 渐变结束",type:"color",default:"#FF5EAE"},{key:"redPacketEllipseColor",name:"redPacketEllipseColor",label:"红包主体半圆 Ellipse 44511919 和 Ellipse 44511920",type:"color",default:"#FFC4E5"},{key:"backgroundPanelColor",name:"backgroundPanelColor",label:"背景板",type:"color",default:"#FFC5E5"},{key:"couponLabelColor",name:"couponLabelColor",label:"满赠券文案",type:"color",default:"#FF62A0"},{key:"amountTextColor",name:"amountTextColor",label:"金额文案",type:"color",default:"#FF1372"}],i1=[{id:"default_pink",name:"默认粉色套",props:{frameUnionGradientStart:"#FF237B",frameUnionGradientEnd:"#FF5EAE",iconGradientStart:"#FF1478",iconGradientEnd:"#FF5DAA",redPacketUnionGradientStart:"#FF237B",redPacketUnionGradientEnd:"#FF5EAE",redPacketEllipseColor:"#FFC4E5",backgroundPanelColor:"#FFC5E5",couponLabelColor:"#FF62A0",amountTextColor:"#FF1372"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{frameUnionGradientStart:"#FF166F",frameUnionGradientEnd:"#FF4C5D",iconGradientStart:"#FF224F",iconGradientEnd:"#FF3D58",redPacketUnionGradientStart:"#FF4070",redPacketUnionGradientEnd:"#FF4B5E",redPacketEllipseColor:"#FFA6BD",backgroundPanelColor:"#FFA6BD",couponLabelColor:"#FF6265",amountTextColor:"#FF134E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{frameUnionGradientStart:"#FF4641",frameUnionGradientEnd:"#FF6737",iconGradientStart:"#FF3E25",iconGradientEnd:"#FF5E33",redPacketUnionGradientStart:"#FF4343",redPacketUnionGradientEnd:"#FF6A36",redPacketEllipseColor:"#FF9597",backgroundPanelColor:"#FF9597",couponLabelColor:"#FF8F4A",amountTextColor:"#FF1A1D"}}],f5={id:Ky,name:qy,title:Wy,type:Xy,category:Yy,description:Jy,reactComponent:Zy,dimensions:Qy,fonts:e1,blueprint:n1,props:t1,variants:i1},x5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:n1,category:Yy,default:f5,description:Jy,dimensions:Qy,fonts:e1,id:Ky,name:qy,props:t1,reactComponent:Zy,title:Wy,type:Xy,variants:i1},Symbol.toStringTag,{value:"Module"})),a1="消返券-样式1-3个券-已领取",o1="消返券-样式1-3个券-已领取",r1="消返券-样式1-3个券-已领取",s1="atom",l1="原子组件",d1="消返券样式1（3个券家族）的单券已领取独立版，单张优惠券卡片展示，含金额、使用条件、腰封渐变及内卡装饰。蓝图自动同步：金额、使用条件。三色父级绑定：默认粉色 / 蓝色(sky) / 橘色(apricot)，含背景卡片、腰封、印章配色。",p1="消返券-样式1-3个券-已领取",c1={width:162,height:192},u1=[{text:"满68元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"满减使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"10",family:"Douyin Number ABC",weight:800,size:"50px",lineHeight:"42px",usage:"券金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"38px",usage:"券金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],g1={autoExposeProps:!0,matchKeywords:["消返券-样式1-3个券-已领取","消返券已领取","已领取","消耗返单个券已领取","优惠券已领取","已领","金额","满多少可用"],textProps:["amountText","conditionText"]},m1=[{key:"amountText",name:"amountText",label:"券金额",type:"string",default:"10"},{key:"conditionText",name:"conditionText",label:"使用条件（满多少可用）",type:"string",default:"满68元可用"},{key:"cardBgColor",name:"cardBgColor",label:"券背景卡片底色",type:"color",default:"#FFC5E5"},{key:"decorCircleColor",name:"decorCircleColor",label:"装饰圆填充色",type:"color",default:"#FFC4E5"},{key:"innerStrokeColor",name:"innerStrokeColor",label:"内卡装饰线描边色",type:"color",default:"#FFD9E5"},{key:"innerFillColor",name:"innerFillColor",label:"内卡花纹填充色",type:"color",default:"#FF62A0"},{key:"waistbandStart",name:"waistbandStart",label:"腰封装饰色（渐变开始）",type:"color",default:"#FF1473"},{key:"waistbandEnd",name:"waistbandEnd",label:"腰封装饰色（渐变结束）",type:"color",default:"#FF229F"},{key:"stampTextColor",name:"stampTextColor",label:"已领取印章文字颜色",type:"color",default:"#FF9ECA"},{key:"stampRingColor",name:"stampRingColor",label:"已领取印章圆圈边框颜色",type:"color",default:"#FFE6EF"}],f1=[{id:"default_pink",name:"默认粉色套",props:{cardBgColor:"#FFC5E5",decorCircleColor:"#FFC4E5",innerStrokeColor:"#FFD9E5",innerFillColor:"#FF62A0",waistbandStart:"#FF1473",waistbandEnd:"#FF229F",stampTextColor:"#FF9ECA",stampRingColor:"#FFE6EF"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{waistbandStart:"#FF190E",waistbandEnd:"#FF176E",cardBgColor:"#FFA5BD",stampTextColor:"#FFB0B2",stampRingColor:"#FFECEC"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{waistbandStart:"#FF4501",waistbandEnd:"#FF7C02",cardBgColor:"#FF9395",stampTextColor:"#FFC7A4",stampRingColor:"#FFF3EC"}}],h5={id:a1,name:o1,title:r1,type:s1,category:l1,description:d1,reactComponent:p1,dimensions:c1,fonts:u1,blueprint:g1,props:m1,variants:f1},b5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:g1,category:l1,default:h5,description:d1,dimensions:c1,fonts:u1,id:a1,name:o1,props:m1,reactComponent:p1,title:r1,type:s1,variants:f1},Symbol.toStringTag,{value:"Module"})),x1="消返券-样式1-3个券-立即领单个",h1="消返券-样式1-3个券-立即领单个",b1="消返券-样式1-3个券-立即领单个",y1="atom",w1="原子组件",v1="消返券样式1（3个券家族）的单券立即可领独立版，单张优惠券卡片展示，包含金额、使用条件、立即领按钮。",S1="消返券-样式1-3个券-立即领单个",T1={width:600,height:192.2},$1=[{text:"满50元可用",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"满减使用条件",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"50",family:"Douyin Number ABC",weight:800,size:"50px",lineHeight:"42px",usage:"券金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"38px",usage:"券金额单位",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"立即领",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文字",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],C1={autoExposeProps:!0,matchKeywords:["消返券-样式1-3个券-立即领单个","消返券","消返券样式1","消耗返单个券","立即领","单个券","优惠券","金额","满多少可用"],textProps:["amountText","conditionText"]},I1=[{key:"amountText",name:"amountText",label:"券金额",type:"string",default:"50"},{key:"conditionText",name:"conditionText",label:"使用条件（满多少可用）",type:"string",default:"满50元可用"},{key:"cardGradientStart",name:"cardGradientStart",label:"券背景色开始",type:"color",default:"#FF1473"},{key:"cardGradientEnd",name:"cardGradientEnd",label:"券背景色结束",type:"color",default:"#FF229F"},{key:"buttonBackground",name:"buttonBackground",label:"立即领按钮背景色",type:"color",default:"rgba(255, 94, 164, 1)"},{key:"buttonTextColor",name:"buttonTextColor",label:"按钮文字颜色",type:"color",default:"rgba(255, 158, 202, 1)"},{key:"waveAccentColor",name:"waveAccentColor",label:"券身装饰线颜色",type:"color",default:"#FF62A0"}],k1=[{id:"default_pink",name:"默认粉色套",props:{cardGradientStart:"#FF1473",cardGradientEnd:"#FF229F",buttonBackground:"rgba(255, 94, 164, 1)",buttonTextColor:"rgba(255, 158, 202, 1)",waveAccentColor:"#FF62A0"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{cardGradientStart:"#FF180E",cardGradientEnd:"#FF166E",buttonBackground:"#FF8290",buttonTextColor:"#FFB8C9",waveAccentColor:"#FF6068"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{cardGradientStart:"#FF4401",cardGradientEnd:"#FF7C02",buttonBackground:"#FF8571",buttonTextColor:"#FFC9B5",waveAccentColor:"#FF8C3E"}}],y5={id:x1,name:h1,title:b1,type:y1,category:w1,description:v1,reactComponent:S1,dimensions:T1,fonts:$1,blueprint:C1,props:I1,variants:k1},w5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:C1,category:w1,default:y5,description:v1,dimensions:T1,fonts:$1,id:x1,name:h1,props:I1,reactComponent:S1,title:b1,type:y1,variants:k1},Symbol.toStringTag,{value:"Module"})),P1="置底按钮",z1="置底按钮",F1="置底按钮",N1="atom",E1="原子组件",_1="页面底部固定样式按钮组件。",B1="置底按钮",A1={width:750,height:287},M1=[{text:"立即使用DOU+",family:"Source Han Sans CN",weight:700,size:"38px",lineHeight:"normal",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],j1={autoExposeProps:!0,matchKeywords:["置底按钮","底部按钮","按钮文案","立即使用DOU+"],textProps:["buttonText"]},R1=[{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即使用DOU+",description:"置底按钮展示文案。"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮颜色开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮颜色结束",type:"color",default:"#FF229F"},{key:"backgroundGradientColor",name:"backgroundGradientColor",label:"底部背景渐变色",type:"color",default:"#FFBBD8"}],H1=[{id:"default_pink",name:"默认粉色套",themeBinding:{parentThemeId:"pink"},props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F",backgroundGradientColor:"#FFBBD8"}},{id:"womens_day_parent",name:"三八父级页面",themeBinding:{parentThemeId:"node-womens-day"},props:{buttonGradientStart:"#FF1473",buttonGradientEnd:"#FF229F",backgroundGradientColor:"#5FC7DE"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#8FC4FF"}},{id:"cyan_parent",name:"青色父级页面",themeBinding:{parentThemeId:"daily-cyan"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#98F0F5"}},{id:"purple_parent",name:"紫色父级页面",themeBinding:{parentThemeId:"daily-purple"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#D9A8FF"}},{id:"green_parent",name:"绿色父级页面",themeBinding:{parentThemeId:"daily-green"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#D5F5AD"}},{id:"breath_parent",name:"气息父级页面",themeBinding:{parentThemeId:"node-breath"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#FFC3E8"}},{id:"anniversary_parent",name:"周年庆父级页面",themeBinding:{parentThemeId:"node-anniversary"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#FFC5C5"}},{id:"double_festival_parent",name:"双旦父级页面",themeBinding:{parentThemeId:"node-double-festival"},props:{buttonGradientStart:"#FF180D",buttonGradientEnd:"#FF166F",backgroundGradientColor:"#BEEBFF"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",backgroundGradientColor:"#FFC49A"}},{id:"yellow_parent",name:"黄色父级页面",themeBinding:{parentThemeId:"daily-yellow"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",backgroundGradientColor:"#FFC8A8"}},{id:"new_year_parent",name:"新年父级页面",themeBinding:{parentThemeId:"node-new-year"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",backgroundGradientColor:"#FFC3C6"}},{id:"mid_autumn_parent",name:"中秋父级页面",themeBinding:{parentThemeId:"node-mid-autumn"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",backgroundGradientColor:"#FFC5F0"}},{id:"double_11_parent",name:"双11父级页面",themeBinding:{parentThemeId:"node-double-11"},props:{buttonGradientStart:"#FF4501",buttonGradientEnd:"#FF7C02",backgroundGradientColor:"#FFE3A8"}}],v5={id:P1,name:z1,title:F1,type:N1,category:E1,description:_1,reactComponent:B1,dimensions:A1,fonts:M1,blueprint:j1,props:R1,variants:H1},S5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:j1,category:E1,default:v5,description:_1,dimensions:A1,fonts:M1,id:P1,name:z1,props:R1,reactComponent:B1,title:F1,type:N1,variants:H1},Symbol.toStringTag,{value:"Module"})),D1="节点指南-内容",L1="节点指南-内容",G1="节点指南-内容",O1="atom",V1="原子组件",U1="节点指南内容组件，展示多行业的内容建议、投放建议和执行要点。",K1="节点指南-内容",q1={width:2680,height:643.21},W1={autoExposeProps:!0,matchKeywords:["节点指南-内容","节点指南","行业指南","内容建议","投放建议","执行要点"],textProps:["card1IndustryTitle","card1TrendTitle","card1ContentTitle","card1Tag1","card1Tag2","card1Tag3","card1Tag4","card1ContentSummary","card1PlacementTitle","card1PlacementTextBefore1","card1PlacementHighlight1","card1PlacementTextBefore2","card1PlacementHighlight2","card1ActionTitle","card1ActionText","card2IndustryTitle","card2TrendTitle","card2ContentTitle","card2Tag1","card2Tag2","card2Tag3","card2ContentSummary","card2PlacementTitle","card2PlacementTextBefore","card2PlacementHighlight","card2ActionTitle","card2ActionText","card3IndustryTitle","card3TrendTitle","card3ContentTitle","card3Tag1","card3Tag2","card3Tag3","card3ContentSummary","card3PlacementTitle","card3PlacementTextBefore","card3PlacementHighlight","card3ActionTitle","card3ActionText","card4IndustryTitle","card4TrendTitle","card4ContentTitle","card4Tag1","card4Tag2","card4Tag3","card4ContentSummary","card4PlacementTitle","card4PlacementTextBefore","card4PlacementHighlight","card4ActionTitle","card4ActionText"]},X1=[{key:"card1IndustryTitle",name:"card1IndustryTitle",label:"卡片1行业标题",type:"string",default:"「服装配饰行业」"},{key:"card1TrendTitle",name:"card1TrendTitle",label:"卡片1趋势标题",type:"string",default:"# 七夕驱动穿搭需求集中爆发"},{key:"card1ContentTitle",name:"card1ContentTitle",label:"卡片1内容建议标题",type:"string",default:"视频内容建议做："},{key:"card1Tag1",name:"card1Tag1",label:"卡片1内容标签1",type:"string",default:"场景型"},{key:"card1Tag2",name:"card1Tag2",label:"卡片1内容标签2",type:"string",default:"对比型"},{key:"card1Tag3",name:"card1Tag3",label:"卡片1内容标签3",type:"string",default:"清单型"},{key:"card1Tag4",name:"card1Tag4",label:"卡片1内容标签4",type:"string",default:"上身效果型"},{key:"card1ContentSummary",name:"card1ContentSummary",label:"卡片1内容说明",type:"text",control:"textarea",default:"镜头须一眼看懂版型搭配，8/12起日更2-3条"},{key:"card1PlacementTitle",name:"card1PlacementTitle",label:"卡片1投放建议标题",type:"string",default:"投放建议："},{key:"card1PlacementTextBefore1",name:"card1PlacementTextBefore1",label:"卡片1投放建议前文",type:"text",control:"textarea",default:"投放「视频播放」，8/19晚18-22点保留"},{key:"card1PlacementHighlight1",name:"card1PlacementHighlight1",label:"卡片1投放建议重点1",type:"string",default:"60%预算"},{key:"card1PlacementTextBefore2",name:"card1PlacementTextBefore2",label:"卡片1投放建议后文",type:"text",control:"textarea",default:"追投，剩余预算考虑前置推广，建议每单"},{key:"card1PlacementHighlight2",name:"card1PlacementHighlight2",label:"卡片1投放建议重点2",type:"string",default:"100~300元"},{key:"card1ActionTitle",name:"card1ActionTitle",label:"卡片1执行要点标题",type:"string",default:"执行要点："},{key:"card1ActionText",name:"card1ActionText",label:"卡片1执行要点正文",type:"text",control:"textarea",default:"8.17 起前置直播预热，评论区承接尺码穿搭咨询"},{key:"card2IndustryTitle",name:"card2IndustryTitle",label:"卡片2行业标题",type:"string",default:"「文体娱乐行业」"},{key:"card2TrendTitle",name:"card2TrendTitle",label:"卡片2趋势标题",type:"string",default:"# 七夕约会需求集中爆发"},{key:"card2ContentTitle",name:"card2ContentTitle",label:"卡片2内容建议标题",type:"string",default:"视频内容建议做："},{key:"card2Tag1",name:"card2Tag1",label:"卡片2内容标签1",type:"string",default:"氛围切片型"},{key:"card2Tag2",name:"card2Tag2",label:"卡片2内容标签2",type:"string",default:"路线推荐型"},{key:"card2Tag3",name:"card2Tag3",label:"卡片2内容标签3",type:"string",default:"预告倒计时型"},{key:"card2ContentSummary",name:"card2ContentSummary",label:"卡片2内容说明",type:"text",control:"textarea",default:"8/16-8/19密集发布（每天2-4条）保持持续曝光"},{key:"card2PlacementTitle",name:"card2PlacementTitle",label:"卡片2投放建议标题",type:"string",default:"投放建议："},{key:"card2PlacementTextBefore",name:"card2PlacementTextBefore",label:"卡片2投放建议正文",type:"text",control:"textarea",default:"投放视频播放，8/19采用3-6小时短时快速放量，同城活动先锁城市或商圈定向，每条视频"},{key:"card2PlacementHighlight",name:"card2PlacementHighlight",label:"卡片2投放建议重点",type:"string",default:"200-300元"},{key:"card2ActionTitle",name:"card2ActionTitle",label:"卡片2执行要点标题",type:"string",default:"执行要点："},{key:"card2ActionText",name:"card2ActionText",label:"卡片2执行要点正文",type:"text",control:"textarea",default:"优先突出情绪氛围，前置主页/预约/私信入口"},{key:"card3IndustryTitle",name:"card3IndustryTitle",label:"卡片3行业标题",type:"string",default:"「餐饮服务行业」"},{key:"card3TrendTitle",name:"card3TrendTitle",label:"卡片3趋势标题",type:"string",default:"# 七夕餐饮到店为主 聚焦去哪吃"},{key:"card3ContentTitle",name:"card3ContentTitle",label:"卡片3内容建议标题",type:"string",default:"视频内容建议做："},{key:"card3Tag1",name:"card3Tag1",label:"卡片3内容标签1",type:"string",default:"氛围呈现型"},{key:"card3Tag2",name:"card3Tag2",label:"卡片3内容标签2",type:"string",default:"套餐展示型"},{key:"card3Tag3",name:"card3Tag3",label:"卡片3内容标签3",type:"string",default:"探店种草型"},{key:"card3ContentSummary",name:"card3ContentSummary",label:"卡片3内容说明",type:"text",control:"textarea",default:"发布需前置到16点开始，提前抢占流量"},{key:"card3PlacementTitle",name:"card3PlacementTitle",label:"卡片3投放建议标题",type:"string",default:"投放建议："},{key:"card3PlacementTextBefore",name:"card3PlacementTextBefore",label:"卡片3投放建议正文",type:"text",control:"textarea",default:"关键时段10、16点提前投，8/19晚18-22点重点投；定向优先门店周边及办公区，每条"},{key:"card3PlacementHighlight",name:"card3PlacementHighlight",label:"卡片3投放建议重点",type:"string",default:"100-200元"},{key:"card3ActionTitle",name:"card3ActionTitle",label:"卡片3执行要点标题",type:"string",default:"执行要点："},{key:"card3ActionText",name:"card3ActionText",label:"卡片3执行要点正文",type:"text",control:"textarea",default:"转化需预设主页、私信、电话入口"},{key:"card4IndustryTitle",name:"card4IndustryTitle",label:"卡片4行业标题",type:"string",default:"「传媒资讯行业」"},{key:"card4TrendTitle",name:"card4TrendTitle",label:"卡片4趋势标题",type:"string",default:"# 七夕传媒聚焦热点与互动"},{key:"card4ContentTitle",name:"card4ContentTitle",label:"卡片4内容建议标题",type:"string",default:"视频内容建议做："},{key:"card4Tag1",name:"card4Tag1",label:"卡片4内容标签1",type:"string",default:"热点解读型"},{key:"card4Tag2",name:"card4Tag2",label:"卡片4内容标签2",type:"string",default:"内容剪辑型"},{key:"card4Tag3",name:"card4Tag3",label:"卡片4内容标签3",type:"string",default:"榜单盘点型"},{key:"card4ContentSummary",name:"card4ContentSummary",label:"卡片4内容说明",type:"text",control:"textarea",default:"节中可高频连续更新追热点"},{key:"card4PlacementTitle",name:"card4PlacementTitle",label:"卡片4投放建议标题",type:"string",default:"投放建议："},{key:"card4PlacementTextBefore",name:"card4PlacementTextBefore",label:"卡片4投放建议正文",type:"text",control:"textarea",default:"主要聚焦节前和节中投放，投视频播放，多视频同推测爆款，节中结合热点快速投放，每条"},{key:"card4PlacementHighlight",name:"card4PlacementHighlight",label:"卡片4投放建议重点",type:"string",default:"200-300元"},{key:"card4ActionTitle",name:"card4ActionTitle",label:"卡片4执行要点标题",type:"string",default:"执行要点："},{key:"card4ActionText",name:"card4ActionText",label:"卡片4执行要点正文",type:"text",control:"textarea",default:"预留热点空间，强化互动，避免单一节日祝福"}],T5={id:D1,name:L1,title:G1,type:O1,category:V1,description:U1,reactComponent:K1,dimensions:q1,blueprint:W1,props:X1},$5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:W1,category:V1,default:T5,description:U1,dimensions:q1,id:D1,name:L1,props:X1,reactComponent:K1,title:G1,type:O1},Symbol.toStringTag,{value:"Module"})),Y1="诊断建议-样式1",J1="诊断建议-样式1",Z1="诊断建议-样式1",Q1="atom",ew="原子组件",nw="诊断建议组件，展示诊断标签、视频信息和建议正文。",tw="诊断建议-样式1",iw={width:626,height:234},aw="auto",ow=[{text:"诊断建议",family:"Douyin Sans",weight:400,size:"24px",lineHeight:"40px",usage:"标题",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"当猫咪发现了扫地机器人",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"42px",usage:"视频标题",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}},{text:"用户昵称",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"用户昵称",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"你的视频总播放量、点赞率均高于同类水平! 如果能再优化前几秒的视觉冲击和节奏就更好啦~ 评论区记得加入引导话术哦 !",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"诊断建议正文",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],rw={autoExposeProps:!0,matchKeywords:["诊断建议","诊断建议样式1","内容诊断建议","视频诊断建议","建议正文"],textProps:["titleText","videoTitle","userName","suggestionText"]},sw=[{key:"titleText",name:"titleText",label:"标题",type:"string",default:"诊断建议",description:"顶部标签文案。"},{key:"videoTitle",name:"videoTitle",label:"视频标题",type:"string",default:"当猫咪发现了扫地机器人",description:"视频标题文案。"},{key:"userName",name:"userName",label:"用户昵称",type:"string",default:"用户昵称",description:"用户昵称文案。"},{key:"suggestionText",name:"suggestionText",label:"诊断建议正文",type:"string",default:"你的视频总播放量、点赞率均高于同类水平! 如果能再优化前几秒的视觉冲击和节奏就更好啦~ 评论区记得加入引导话术哦 !",description:"诊断建议正文文案。"}],C5={id:Y1,name:J1,title:Z1,type:Q1,category:ew,description:nw,reactComponent:tw,dimensions:iw,heightMode:aw,fonts:ow,blueprint:rw,props:sw},I5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:rw,category:ew,default:C5,description:nw,dimensions:iw,fonts:ow,heightMode:aw,id:Y1,name:J1,props:sw,reactComponent:tw,title:Z1,type:Q1},Symbol.toStringTag,{value:"Module"})),lw="诊断建议-样式2",dw="诊断建议-样式2",pw="诊断建议-样式2",cw="atom",uw="原子组件",gw="诊断建议组件，展示优质视频提示、视频封面和平台判定标签。",mw="诊断建议-样式2",fw={width:626,height:299},xw=[{text:"你有1条",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"normal",usage:"提示前缀",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"优质视频内容",family:"Source Han Sans CN",weight:700,size:"24px",lineHeight:"normal",usage:"提示重点",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"，表现优于同类，现在加热有机会放大流量！",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"normal",usage:"提示后缀",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"一起过圣诞",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"38px",usage:"视频标题",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"平台判定标签：",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"36px",usage:"标签前缀",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"潜力视频",family:"Source Han Sans CN",weight:400,size:"24px",lineHeight:"30px",usage:"标签文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],hw={autoExposeProps:!0,matchKeywords:["诊断建议-样式2","诊断建议样式2","优质视频内容","平台判定标签","潜力视频"],textProps:["noticePrefixText","noticeHighlightText","noticeSuffixText","videoTitle","tagPrefixText","tagText"]},bw=[{key:"noticePrefixText",name:"noticePrefixText",label:"提示前缀",type:"string",default:"你有1条",description:"顶部提示前缀文案。"},{key:"noticeHighlightText",name:"noticeHighlightText",label:"提示重点",type:"string",default:"优质视频内容",description:"顶部提示加粗重点文案。"},{key:"noticeSuffixText",name:"noticeSuffixText",label:"提示后缀",type:"string",default:"，表现优于同类，现在加热有机会放大流量！",description:"顶部提示后缀文案。"},{key:"videoTitle",name:"videoTitle",label:"视频标题",type:"string",default:"一起过圣诞",description:"视频标题文案。"},{key:"tagPrefixText",name:"tagPrefixText",label:"标签前缀",type:"string",default:"平台判定标签：",description:"平台判定标签前缀文案。"},{key:"tagText",name:"tagText",label:"标签文案",type:"string",default:"潜力视频",description:"平台判定标签文案。"}],k5={id:lw,name:dw,title:pw,type:cw,category:uw,description:gw,reactComponent:mw,dimensions:fw,fonts:xw,blueprint:hw,props:bw},P5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:hw,category:uw,default:k5,description:gw,dimensions:fw,fonts:xw,id:lw,name:dw,props:bw,reactComponent:mw,title:pw,type:cw},Symbol.toStringTag,{value:"Module"})),yw="说明文-补充说明",ww="说明文-补充说明",vw="说明文-补充说明",Sw="atom",Tw="原子组件",$w="补充说明文案组件。",Cw="说明文-补充说明",Iw={width:604,height:36},kw="auto",Pw=36,zw=[{text:"*奖励将于活动结束后5个工作日内发放至获奖用户DOU+账户",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Fw={autoExposeProps:!0,matchKeywords:["说明文-补充说明","补充说明","说明文","奖励说明","文案"],textProps:["text"]},Nw=[{key:"text",name:"text",label:"文案",type:"text",control:"textarea",default:"*奖励将于活动结束后5个工作日内发放至获奖用户DOU+账户",description:"补充说明文案。"}],z5={id:yw,name:ww,title:vw,type:Sw,category:Tw,description:$w,reactComponent:Cw,dimensions:Iw,heightMode:kw,minHeight:Pw,fonts:zw,blueprint:Fw,props:Nw},F5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Fw,category:Tw,default:z5,description:$w,dimensions:Iw,fonts:zw,heightMode:kw,id:yw,minHeight:Pw,name:ww,props:Nw,reactComponent:Cw,title:vw,type:Sw},Symbol.toStringTag,{value:"Module"})),Ew="账户优惠券提示",_w="账户优惠券提示",Bw="账户优惠券提示",Aw="atom",Mw="原子组件",jw="展示当前账户优惠券总金额，并提供立即使用入口。",Rw="账户优惠券提示",Hw={width:702,height:160},Dw=[{text:"总计",family:"Source Han Sans CN",weight:700,size:"22px",lineHeight:"24px",usage:"总计",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"立即使用",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"立即使用",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"600",family:"Douyin Number ABC",weight:800,size:"50px",lineHeight:"42px",usage:"金额",source:{status:"exact",file:"DouyinNumberABC-ExtraBold.ttf"}},{text:"元",family:"Source Han Sans CN",weight:700,size:"24px",lineHeight:"36px",usage:"元",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"DOU+",family:"Douyin Sans",weight:400,size:"32px",lineHeight:"normal",usage:"标题英文",source:{status:"missing",required:"Douyin Sans Regular / 400",note:"当前字体包只有 DouyinSansBold.ttf，不能作为 400 字重精确源。"}},{text:"优惠券",family:"Source Han Sans CN",weight:700,size:"30px",lineHeight:"normal",usage:"标题中文",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}},{text:"共有",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"共有文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}},{text:"2",family:"Douyin Number ABC",weight:700,size:"22px",lineHeight:"normal",usage:"券数量数字",source:{status:"exact",file:"DouyinNumberABC-Bold.ttf"}},{text:"张券",family:"Source Han Sans CN",weight:400,size:"22px",lineHeight:"normal",usage:"张券文案",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.ttf"}}],Lw={autoExposeProps:!0,matchKeywords:["账户优惠券提示","账户优惠券","优惠券提示","优惠券总金额","当前账户优惠券总金额","立即使用"],textProps:["amountText","actionText"]},Gw=[{key:"amountText",name:"amountText",label:"金额",type:"string",default:"600",description:"优惠券金额数字，组件固定显示“元”单位。"},{key:"actionText",name:"actionText",label:"小按钮文案",type:"string",default:"立即使用",description:"右侧小按钮文案。"},{key:"totalTextColor",name:"totalTextColor",label:"总计/金额/按钮文字色",type:"color",default:"#FF1372"},{key:"totalBadgeBg",name:"totalBadgeBg",label:"总计背景框",type:"color",default:"#FFD9E5"},{key:"containerGradientStart",name:"containerGradientStart",label:"背景容器渐变开始",type:"color",default:"#FF1473"},{key:"containerGradientEnd",name:"containerGradientEnd",label:"背景容器渐变结束",type:"color",default:"#FF229F"},{key:"iconGradientStart",name:"iconGradientStart",label:"icon 渐变开始",type:"color",default:"#FF44A9"},{key:"iconGradientEnd",name:"iconGradientEnd",label:"icon 渐变结束",type:"color",default:"#FF2B8A"}],Ow=[{id:"default_pink",name:"默认粉色套",props:{totalTextColor:"#FF1372",totalBadgeBg:"#FFD9E5",containerGradientStart:"#FF1473",containerGradientEnd:"#FF229F",iconGradientStart:"#FF44A9",iconGradientEnd:"#FF2B8A"}},{id:"blue_parent_pink",name:"蓝色父级页面 · 粉红套",themeBinding:{parentThemeId:"sky"},props:{totalTextColor:"#FF134E",totalBadgeBg:"#FFD9DA",containerGradientStart:"#FF180C",containerGradientEnd:"#FF166F",iconGradientStart:"#F60052",iconGradientEnd:"#FF0D3F"}},{id:"orange_parent_orange",name:"橘色父级页面 · 橙红套",themeBinding:{parentThemeId:"apricot"},props:{totalTextColor:"#FF1A1D",totalBadgeBg:"#FFE8D9",containerGradientStart:"#FF4400",containerGradientEnd:"#FF7C02",iconGradientStart:"#FF6B02",iconGradientEnd:"#FF5B1A"}}],N5={id:Ew,name:_w,title:Bw,type:Aw,category:Mw,description:jw,reactComponent:Rw,dimensions:Hw,fonts:Dw,blueprint:Lw,props:Gw,variants:Ow},E5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Lw,category:Mw,default:N5,description:jw,dimensions:Hw,fonts:Dw,id:Ew,name:_w,props:Gw,reactComponent:Rw,title:Bw,type:Aw,variants:Ow},Symbol.toStringTag,{value:"Module"})),Vw="下单页弹窗",Uw="下单页弹窗",Kw="下单页弹窗",qw="atom",Ww="资源位",Xw="下单页弹窗原子组件。",Yw="下单页弹窗",Jw={width:560,height:740},Zw={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["下单页弹窗","下单页","弹窗","资源位"],textProps:["headlineText","campaignText","buttonText"]},Qw=[{key:"headlineText",name:"headlineText",label:"主标题文案",type:"string",default:"好礼天天抽 赢千元流量",description:"主标题作为一段文案输入，每行最多 6 个字符，空格可主动分行，整体保持居中。"},{key:"campaignText",name:"campaignText",label:"活动标签文案",type:"string",default:"DOU+双节狂欢投",description:"顶部活动标签文案，随内容长度保持居中并自动缩放。"},{key:"headlineHighlightText",name:"headlineHighlightText",label:"标题高亮内容",type:"string",default:"赢千元流量",description:"填写主标题中需要高亮显示的文案内容。"},{key:"mainVisualImage",name:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",description:"主视觉图片，复用头图的主体替换素材。",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"burstColor",name:"burstColor",label:"爆炸图形颜色",type:"color",default:"#0FB3FF",description:"爆炸图形使用头图素材作为遮罩并应用该颜色。"},{key:"burstOpacity",name:"burstOpacity",label:"爆炸图形透明度",type:"number",default:.3},{key:"glowOpacity",name:"glowOpacity",label:"光束透明度",type:"number",default:.6},{key:"background",name:"background",label:"背景色",type:"string",default:"linear-gradient(180deg, #ABF9FF 0%, #B5FBFF 30%, #CAF1F3 100%)"},{key:"ribbonColor",name:"ribbonColor",label:"顶部标签颜色",type:"color",default:"#00C8F5"},{key:"textColor",name:"textColor",label:"标题默认颜色",type:"color",default:"#092E39"},{key:"headlineGradientTop",name:"headlineGradientTop",label:"标题高亮颜色",type:"color",default:"#008BD4"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF180E"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF166F"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即参与"}],_5={id:Vw,name:Uw,title:Kw,type:qw,category:Ww,description:Xw,reactComponent:Yw,dimensions:Jw,blueprint:Zw,props:Qw},B5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:Zw,category:Ww,default:_5,description:Xw,dimensions:Jw,id:Vw,name:Uw,props:Qw,reactComponent:Yw,title:Kw,type:qw},Symbol.toStringTag,{value:"Module"})),e0="个人中心banner",n0="个人中心banner",t0="个人中心banner",i0="atom",a0="资源位",o0="个人中心 Banner 原子组件。",r0="个人中心banner",s0={width:686,height:120},l0={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["个人中心banner","个人中心","banner","资源位"],textProps:["campaignText","headlineText","buttonText"]},d0=[{key:"campaignText",name:"campaignText",label:"活动标签文案",type:"string",default:"DOU+双节狂欢投",description:"活动标签保持原位置单行展示，超长时自动缩放。"},{key:"headlineText",name:"headlineText",label:"主标题文案",type:"string",default:"完成任务 抽赢好礼",description:"主标题保持原位置单行展示，超长时自动缩放。"},{key:"headlineHighlightText",name:"headlineHighlightText",label:"标题高亮内容",type:"string",default:"抽赢",description:"填写主标题中需要高亮显示的连续文案内容。"},{key:"mainVisualImage",name:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",description:"主视觉图片，复用头图的主体替换素材。",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"background",name:"background",label:"背景渐变",type:"string",default:"linear-gradient(90deg, #D39AFF 0%, #F7EBFF 73.03%)",description:"仅使用父级色系的第一个颜色和最后一个颜色。"},{key:"textColor",name:"textColor",label:"标题默认颜色",type:"color",default:"#240939"},{key:"headlineHighlightColor",name:"headlineHighlightColor",label:"标题高亮颜色",type:"color",default:"#8D16E8"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF180E"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF166F"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即参与"}],A5={id:e0,name:n0,title:t0,type:i0,category:a0,description:o0,reactComponent:r0,dimensions:s0,blueprint:l0,props:d0},M5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:l0,category:a0,default:A5,description:o0,dimensions:s0,id:e0,name:n0,props:d0,reactComponent:r0,title:t0,type:i0},Symbol.toStringTag,{value:"Module"})),p0="挂件",c0="挂件",u0="挂件",g0="atom",m0="资源位",f0="挂件原子组件。",x0="挂件",h0={width:152,height:152},b0={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["挂件","资源位"],textProps:["buttonText"]},y0=[{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"七夕抽奖",description:"挂件底部按钮文案，随字数变化保持居中并自动缩放。"},{key:"buttonColor",name:"buttonColor",label:"按钮颜色",type:"select",default:"#FF1372",description:"挂件底部按钮颜色。",options:[{label:"粉色",value:"#FF1372"},{label:"红色",value:"#FF180E"},{label:"橙色",value:"#FF4501"}]},{key:"mainVisualImage",name:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",description:"挂件主体图片，复用头图的主体替换素材。",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]}],w0=[{id:"default_pink",name:"默认粉色套",props:{buttonColor:"#FF1372"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{buttonColor:"#FF180E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{buttonColor:"#FF4501"}}],j5={id:p0,name:c0,title:u0,type:g0,category:m0,description:f0,reactComponent:x0,dimensions:h0,blueprint:b0,props:y0,variants:w0},R5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:b0,category:m0,default:j5,description:f0,dimensions:h0,id:p0,name:c0,props:y0,reactComponent:x0,title:u0,type:g0,variants:w0},Symbol.toStringTag,{value:"Module"})),v0="详情页弹窗",S0="详情页弹窗",T0="详情页弹窗",$0="atom",C0="资源位",I0="详情页弹窗原子组件。",k0="详情页弹窗",P0={width:560,height:740},z0={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["详情页弹窗","资源弹窗","弹窗","资源位"],textProps:["campaignText","headlineText","headlineHighlightText","buttonText"]},F0=[{key:"campaignText",name:"campaignText",label:"活动标签文案",type:"string",default:"DOU+双节狂欢投",description:"主标题上方的活动标签文案。"},{key:"headlineText",name:"headlineText",label:"主标题文案",type:"string",default:"完成任务 抽流量好礼",description:"弹窗主标题文案，空格或换行分隔固定两行。"},{key:"headlineHighlightText",name:"headlineHighlightText",label:"标题高亮内容",type:"string",default:"流量好礼"},{key:"background",name:"background",label:"背景渐变",type:"string",default:"linear-gradient(165deg, #FF88C1 0%, #FFC1D5 20%, #FFF1F4 100%)"},{key:"headlineTextColor",name:"headlineTextColor",label:"标题文字颜色",type:"color",default:"#2C0113"},{key:"headlineHighlightColor",name:"headlineHighlightColor",label:"标题高亮颜色",type:"color",default:"#F00073"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF1473"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF229F"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即参与",description:"底部主按钮文案。"}],H5={id:v0,name:S0,title:T0,type:$0,category:C0,description:I0,reactComponent:k0,dimensions:P0,blueprint:z0,props:F0},D5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:z0,category:C0,default:H5,description:I0,dimensions:P0,id:v0,name:S0,props:F0,reactComponent:k0,title:T0,type:$0},Symbol.toStringTag,{value:"Module"})),N0="挽留页弹窗",E0="挽留页弹窗",_0="挽留页弹窗",B0="atom",A0="资源位",M0="挽留页弹窗原子组件。",j0="挽留页弹窗",R0={width:560,height:740},H0={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["挽留页弹窗","资源弹窗","弹窗","资源位"],textProps:["campaignText","headlineText","headlineHighlightText","buttonText"]},D0=[{key:"campaignText",name:"campaignText",label:"活动标签文案",type:"string",default:"DOU+双节狂欢投"},{key:"headlineText",name:"headlineText",label:"主标题文案",type:"string",default:"投一单DOU+ 抽千元流量"},{key:"headlineHighlightText",name:"headlineHighlightText",label:"标题高亮内容",type:"string",default:"DOU+"},{key:"mainVisualImage",name:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",description:"主视觉图片，复用头图的主体替换素材。",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"background",name:"background",label:"背景渐变",type:"string",default:"linear-gradient(165deg, #FF88C1 0%, #FFC1D5 20%, #FFF1F4 100%)"},{key:"campaignBackgroundColor",name:"campaignBackgroundColor",label:"活动标签颜色",type:"color",default:"#B64CFF"},{key:"headlineTextColor",name:"headlineTextColor",label:"标题文字颜色",type:"color",default:"#240939"},{key:"headlineHighlightColor",name:"headlineHighlightColor",label:"标题高亮颜色",type:"color",default:"#8D16E8"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF180E"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF166F"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即参与"}],L5={id:N0,name:E0,title:_0,type:B0,category:A0,description:M0,reactComponent:j0,dimensions:R0,blueprint:H0,props:D0},G5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:H0,category:A0,default:L5,description:M0,dimensions:R0,id:N0,name:E0,props:D0,reactComponent:j0,title:_0,type:B0},Symbol.toStringTag,{value:"Module"})),L0="顶部banner",G0="顶部banner",O0="顶部banner",V0="atom",U0="资源位",K0="顶部 Banner 原子组件。",q0="顶部banner",W0={width:1029,height:270},X0={autoExposeProps:!1,excludeFromPrd:!0,matchKeywords:["顶部banner","顶部","banner","资源位"],textProps:["campaignText","headlineText","buttonText"]},Y0=[{key:"campaignText",name:"campaignText",label:"活动标签文案",type:"string",default:"DOU+双节狂欢投",description:"顶部活动标签文案，保持单行居中并按长度自动缩放。"},{key:"headlineText",name:"headlineText",label:"主标题文案",type:"string",default:"好礼天天抽 赢千元流量",description:"主标题保持单行居中，并在超出可用宽度时自动缩放。"},{key:"headlineHighlightText",name:"headlineHighlightText",label:"标题高亮内容",type:"string",default:"千元流量",description:"填写主标题中需要高亮显示的连续文案内容。"},{key:"mainVisualImage",name:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",description:"主视觉图片，复用头图的主体替换素材。",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"background",name:"background",label:"背景渐变",type:"string",default:"linear-gradient(90deg, #D39AFF 0%, #F7EBFF 81.44%)",description:"仅使用父级色系的第一个颜色和最后一个颜色。"},{key:"textColor",name:"textColor",label:"标题默认颜色",type:"color",default:"#240939"},{key:"headlineHighlightColor",name:"headlineHighlightColor",label:"标题高亮颜色",type:"color",default:"#8D16E8"},{key:"buttonGradientStart",name:"buttonGradientStart",label:"按钮渐变开始",type:"color",default:"#FF180E"},{key:"buttonGradientEnd",name:"buttonGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF166F"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"立即参与"}],O5={id:L0,name:G0,title:O0,type:V0,category:U0,description:K0,reactComponent:q0,dimensions:W0,blueprint:X0,props:Y0},V5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:X0,category:U0,default:O5,description:K0,dimensions:W0,id:L0,name:G0,props:Y0,reactComponent:q0,title:O0,type:V0},Symbol.toStringTag,{value:"Module"})),J0="通知",Z0="通知",Q0="通知",e2="atom",n2="原子组件",t2="通知条组件，展示抢券开放时间等单行提示文案。",i2="通知",a2={width:475,height:55},o2=[{text:"抢券开放时间：5月10日10:00-23:59",family:"Source Han Sans CN",weight:500,size:"28px",lineHeight:"42px",usage:"文案内容",source:{status:"exact",file:"SOURCEHANSANSCN-MEDIUM.ttf"}}],r2={autoExposeProps:!0,matchKeywords:["通知","通知条","抢券开放时间","开放时间"],textProps:["contentText"]},s2=[{key:"contentText",name:"contentText",label:"文案内容",type:"string",default:"抢券开放时间：5月10日10:00-23:59",description:"通知条展示文案。"},{key:"backgroundColor",name:"backgroundColor",label:"背景颜色",type:"color",default:"#FFDDE2"},{key:"textColor",name:"textColor",label:"文字颜色",type:"color",default:"#FF1B77"}],l2=[{id:"default_pink",name:"默认粉色套",props:{backgroundColor:"#FFDDE2",textColor:"#FF1B77"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{backgroundColor:"#F7E1E2",textColor:"#FF134E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{backgroundColor:"#F6EBE1",textColor:"#FF1A1D"}}],U5={id:J0,name:Z0,title:Q0,type:e2,category:n2,description:t2,reactComponent:i2,dimensions:a2,fonts:o2,blueprint:r2,props:s2,variants:l2},K5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:r2,category:n2,default:U5,description:t2,dimensions:a2,fonts:o2,id:J0,name:Z0,props:s2,reactComponent:i2,title:Q0,type:e2,variants:l2},Symbol.toStringTag,{value:"Module"})),d2="随机奖品填写地址",p2="随机奖品填写地址",c2="随机奖品填写地址",u2="atom",g2="原子组件",m2="展示随机奖品说明和填写收货地址入口。",f2="随机奖品填写地址",x2={width:525.46,height:95.06},h2=[{text:"毛绒公仔/挂件/盲盒/冰箱贴随机发一件",family:"Source Han Sans CN Regular",weight:400,size:"20px",lineHeight:"29px",usage:"奖品说明",source:{status:"exact",file:"SOURCEHANSANSCN-REGULAR.otf"}},{text:"填写地址",family:"Source Han Sans CN",weight:700,size:"26px",lineHeight:"32px",usage:"按钮文案",source:{status:"exact",file:"SOURCEHANSANSCN-BOLD.ttf"}}],b2={autoExposeProps:!0,matchKeywords:["随机奖品填写地址","随机奖品","填写地址","收货地址"],textProps:["descriptionText","buttonText"]},y2=[{key:"descriptionText",name:"descriptionText",label:"奖品说明",type:"text",control:"textarea",default:`毛绒公仔/挂件/盲盒/
冰箱贴随机发一件`,description:"左侧随机奖品说明，支持换行。"},{key:"buttonText",name:"buttonText",label:"按钮文案",type:"string",default:"填写地址",description:"右侧按钮文案。"},{key:"accentGradientStart",name:"accentGradientStart",label:"按钮渐变开始",type:"color",default:"#FF1473"},{key:"accentGradientEnd",name:"accentGradientEnd",label:"按钮渐变结束",type:"color",default:"#FF229F"}],w2=[{id:"default_pink",name:"默认粉色套",props:{accentGradientStart:"#FF1473",accentGradientEnd:"#FF229F"}},{id:"blue_parent",name:"蓝色父级页面",themeBinding:{parentThemeId:"sky"},props:{accentGradientStart:"#FF190E",accentGradientEnd:"#FF166E"}},{id:"orange_parent",name:"橘色父级页面",themeBinding:{parentThemeId:"apricot"},props:{accentGradientStart:"#FF4501",accentGradientEnd:"#FF7C02"}}],q5={id:d2,name:p2,title:c2,type:u2,category:g2,description:m2,reactComponent:f2,dimensions:x2,fonts:h2,blueprint:b2,props:y2,variants:w2},W5=Object.freeze(Object.defineProperty({__proto__:null,blueprint:b2,category:g2,default:q5,description:m2,dimensions:x2,fonts:h2,id:d2,name:p2,props:y2,reactComponent:f2,title:c2,type:u2,variants:w2},Symbol.toStringTag,{value:"Module"})),X5=`.page {
  position: relative;
  width: 750px;
  height: 682px;
}
.image {
  width: 750px;
  height: 682px;
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: contain;
}
.wrap {
  position: absolute;
  top: 170px;
  left: 186px;
  width: 378px;
  height: 50px;
}
.image1 {
  width: 378px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image2 {
  width: 161px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text {
  position: absolute;
  top: 4px;
  left: 153px;
  transform: rotate(1.129999680560335e-7deg);
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  letter-spacing: -0.04em;
  font-weight: 500;
}
.text1 {
  position: absolute;
  top: 4px;
  left: 18px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  letter-spacing: -0.04em;
  font-weight: 500;
}
.text2 {
  position: absolute;
  top: 76px;
  left: 0;
  width: 750px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 65px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 95.75px;
  font-weight: 400;
}
.titleHighlight {
  color: #FFED62;
}
.douyinNumber {
  font-family: "Douyin Number ABC", "MFBenHeiNoncommercial";
  font-size: 76px;
  font-weight: 800;
}
`,Y5=`.page {
  width: 702px;
  height: 161px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
}
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  padding-right: 26px;
}
.container {
  width: 469px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  width: 440.36px;
  height: 33px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 22px;
}
.text {
  margin-right: 14px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  font-weight: 500;
}
.newTag {
  width: 75px;
  height: 33px;
  display: block;
  flex-shrink: 0;
  margin-right: 10px;
}
.main {
  width: 92.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.section {
  height: 33px;
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-lottery-tag-gradient-start, rgba(255, 20, 115, 1)) 0%,
    var(--task-bar-lottery-tag-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: 3px;
}
.text1 {
  font-family: "Douyin Sans";
  font-size: 20px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 400;
}
.text2 {
  font-family: "Douyin Number ABC";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: var(--task-bar-reward-count-text-color, rgba(255, 98, 160, 1));
  line-height: 24px;
  letter-spacing: -1px;
  font-weight: 500;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}
.text3 {
  width: 459px;
  height: 19px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(129, 129, 129, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.container1 {
  width: 152px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
}
.content2 {
  width: 150px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.main1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-button-gradient-start, #FF81BA) 0%,
    var(--task-bar-button-gradient-end, #FF81BA) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.content3 {
  height: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text5 {
  font-family: "Source Han Sans CN Regular";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
`,J5=`.page {
  width: 702px;
  height: 161px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
}
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  padding-right: 26px;
}
.container {
  width: 469px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  width: 440.36px;
  height: 33px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 22px;
}
.text {
  margin-right: 14px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  font-weight: 500;
}
.newTag {
  width: 75px;
  height: 33px;
  display: block;
  flex-shrink: 0;
  margin-right: 10px;
}
.main {
  width: 92.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.section {
  height: 33px;
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-lottery-tag-gradient-start, rgba(255, 20, 115, 1)) 0%,
    var(--task-bar-lottery-tag-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: 3px;
}
.text1 {
  font-family: "Douyin Sans";
  font-size: 20px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 400;
}
.text2 {
  font-family: "Douyin Number ABC";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: var(--task-bar-reward-count-text-color, rgba(255, 98, 160, 1));
  line-height: 24px;
  letter-spacing: -1px;
  font-weight: 500;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}
.text3 {
  width: 459px;
  height: 19px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(129, 129, 129, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
.container1 {
  width: 152px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
}
.content2 {
  width: 150px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.main1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
    var(--task-bar-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.content3 {
  height: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text5 {
  font-family: "Source Han Sans CN Regular";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}
`,Z5=`.page {
  width: 702px;
  height: 161px;
  border-radius: 20px 40px 40px 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  position: relative;
}
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  padding-right: 26px;
}
.taskBadge {
  position: absolute;
  top: 0;
  left: 0;
  height: 36px;
  padding-right: 16px;
  padding-left: 16px;
  border-radius: 20px 0 20px 0;
  box-sizing: border-box;
  background: var(--task-bar-type-label-color, #ffc544);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Han Sans CN";
  font-size: 20px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  font-weight: 700;
}
.container {
  width: 440.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  width: 440.36px;
  height: 33px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 13px;
}
.text {
  margin-right: 14px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  font-weight: 500;
}
.main {
  width: 92.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.section {
  height: 33px;
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-lottery-tag-gradient-start, rgba(255, 20, 115, 1)) 0%,
    var(--task-bar-lottery-tag-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: 3px;
}
.text1 {
  font-family: "Douyin Sans";
  font-size: 20px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 400;
}
.text2 {
  font-family: "Douyin Number ABC";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: var(--task-bar-reward-count-text-color, rgba(255, 98, 160, 1));
  line-height: 24px;
  letter-spacing: -1px;
  font-weight: 500;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}
.text3 {
  width: 408px;
  height: 18px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(129, 129, 129, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.container1 {
  width: 150px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
}
.content2 {
  width: 150px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.main1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--task-bar-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
    var(--task-bar-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.content3 {
  height: 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text5 {
  font-family: "Source Han Sans CN Regular";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
`,Q5=`.page {
  min-height: 83px;
  min-width: 368px;
  border-radius: 100px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  width: 184px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 700;
  flex-shrink: 0;
}
`,e$=`.page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 590px;
  height: 1327px;
}
.wrap {
  margin-left: 0.72px;
  position: relative;
  width: 587.78px;
  height: 395px;
}
.image {
  width: 261px;
  height: 327px;
  position: absolute;
  top: 68px;
  left: 326.78px;
}
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 369.78px;
  height: 388px;
}
.content1 {
  margin-left: 5.78px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 364px;
  height: 42px;
}
.text8 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text9 {
  margin-left: 14px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.text {
  margin-top: 19px;
  margin-left: 6.78px;
  width: 285px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.content {
  margin-top: 18px;
  position: relative;
  width: 274.64px;
  height: 165px;
}
.main {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 274.64px;
  height: 165px;
}
.text5 {
  margin-left: 84.78px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 25px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text5__seg0 {
  font-size: 15px;
}
.text5__seg1 {
  font-size: 25px;
}
.text5__seg2 {
  font-size: 15px;
  font-weight: 400;
}
.section {
  position: relative;
  width: 274.64px;
  height: 132px;
}
.subSection {
  position: absolute;
  top: 88.08px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 274.64px;
  height: 6.21px;
}
.div1 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 274.64px;
  height: 6.21px;
}
.image1 {
  width: 273.08px;
  height: 6.21px;
}
.subSection1 {
  width: 49px;
  border-radius: 10px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 46, 119, 1) 0%,
    rgba(255, 89, 156, 1) 100%
  );
  min-height: 91px;
  position: absolute;
  top: 0px;
  left: 110.78px;
}
.subSection2 {
  width: 49px;
  border-radius: 10px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 46, 119, 1) 0%,
    rgba(255, 89, 156, 1) 100%
  );
  min-height: 56px;
  position: absolute;
  top: 35px;
  left: 21.78px;
}
.subSection3 {
  width: 49px;
  border-radius: 10px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 46, 119, 1) 0%,
    rgba(255, 89, 156, 1) 100%
  );
  min-height: 45px;
  position: absolute;
  top: 46px;
  left: 199.28px;
}
.subSection4 {
  width: 49px;
  box-sizing: border-box;
  background: rgba(255, 204, 225, 1);
  min-height: 34px;
  position: absolute;
  top: 57px;
  left: 110.78px;
}
.subSection5 {
  width: 49px;
  box-sizing: border-box;
  background: rgba(255, 204, 225, 1);
  min-height: 12px;
  position: absolute;
  top: 79px;
  left: 21.78px;
}
.subSection6 {
  width: 49px;
  box-sizing: border-box;
  background: rgba(255, 204, 225, 1);
  min-height: 20px;
  position: absolute;
  top: 71px;
  left: 199.28px;
}
.subSection7 {
  position: absolute;
  top: 105px;
  left: 27.97px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 27px;
}
.text1 {
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(175, 94, 121, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.subSection8 {
  position: absolute;
  top: 11px;
  left: 107.97px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 148.81px;
  height: 121px;
}
.text3 {
  margin-left: 82.81px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text3__seg0 {
  font-size: 15px;
}
.text3__seg2 {
  font-size: 15px;
  font-weight: 400;
}
.text2 {
  margin-top: 65px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(175, 94, 121, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.subSection9 {
  position: absolute;
  top: 105px;
  left: 197.97px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 27px;
}
.text4 {
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(175, 94, 121, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.main1 {
  position: absolute;
  top: 39px;
  left: 22.78px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 47px;
  height: 29px;
}
.text7 {
  margin-top: 6px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 15px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.text7__seg0 {
  font-size: 15px;
}
.text6 {
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text6__seg1 {
  font-size: 15px;
  font-weight: 400;
}
.wrap1 {
  margin-top: 68px;
  margin-left: 3.5px;
  position: relative;
  width: 583px;
  height: 404px;
}
.image2 {
  width: 261px;
  height: 327px;
  position: absolute;
  top: 65px;
  left: 0px;
}
.container1 {
  position: absolute;
  top: 0px;
  left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 580px;
  height: 404px;
}
.content3 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 403px;
  height: 42px;
}
.text15 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text16 {
  margin-top: 2px;
  margin-left: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.text10 {
  margin-top: 23px;
  margin-left: 286px;
  width: 294px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.content2 {
  margin-top: 5px;
  margin-left: 286px;
  position: relative;
  width: 284px;
  height: 190px;
}
.main2 {
  position: absolute;
  top: 36.86px;
  left: 0px;
  width: 284px;
  height: 153.14px;
}
.image3 {
  width: 266px;
  height: 101px;
  position: absolute;
  top: 52.14px;
  left: 9px;
}
.image4 {
  width: 269px;
  height: 50px;
  position: absolute;
  top: 48.64px;
  left: 8.5px;
}
.section1 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 284px;
  height: 134.91px;
}
.subSection10 {
  margin-left: 24.52px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 61.93px;
  height: 28.08px;
}
.block1 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 61.93px;
  height: 28.08px;
}
.image5 {
  width: 61.93px;
  height: 28.08px;
}
.subSection11 {
  margin-top: 100.42px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 6.42px;
}
.subBlock1 {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 284px;
  height: 6.42px;
}
.image6 {
  width: 282px;
  height: 6.42px;
}
.main3 {
  position: absolute;
  top: 33px;
  left: 14px;
  width: 108px;
  height: 58px;
}
.text11 {
  position: absolute;
  top: 0px;
  left: 24px;
  width: 63.59px;
  height: 41.29px;
  font-family: "Douyin Number ABC";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 73, 50, 1);
  line-height: normal;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.text11__seg1 {
  font-size: 15px;
}
.text12 {
  position: absolute;
  top: 31px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 102, 0, 1);
  line-height: normal;
  font-weight: 400;
}
.main4 {
  position: absolute;
  top: 0px;
  left: 165px;
  width: 108px;
  height: 65px;
}
.text13 {
  position: absolute;
  top: 0px;
  left: 18px;
  width: 81px;
  height: 40px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 34px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 73, 50, 1);
  line-height: normal;
  font-weight: 500;
}
.text13__seg0 {
  font-size: 34px;
}
.text13__seg1 {
  font-size: 20px;
}
.text14 {
  position: absolute;
  top: 38px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 102, 0, 1);
  line-height: normal;
  font-weight: 400;
}
.image7 {
  width: 21px;
  height: 21px;
  position: absolute;
  top: 98px;
  left: 63px;
}
.image8 {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 76px;
  left: 214px;
}
.wrap2 {
  margin-top: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 590px;
  height: 392px;
}
.container2 {
  position: relative;
  width: 590px;
  height: 392px;
}
.text17 {
  position: absolute;
  top: 57px;
  left: 6px;
  width: 283px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
}
.content4 {
  position: absolute;
  top: 229px;
  left: 0px;
  width: 290px;
  height: 156px;
}
.main5 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 290px;
  height: 156px;
}
.section2 {
  width: 290px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(248, 255, 243, 1);
  min-height: 156px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text18 {
  position: absolute;
  top: 29.31px;
  left: 17px;
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(1, 65, 6, 1);
  line-height: 24px;
  font-weight: 700;
}
.section3 {
  position: absolute;
  top: 64.91px;
  left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 114.29px;
  height: 58px;
}
.text19 {
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  color: rgba(126, 176, 100, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.image9 {
  width: 33.29px;
  height: 49.17px;
  margin-top: 8.83px;
  margin-left: 9px;
}
.main6 {
  position: absolute;
  top: 64.69px;
  left: 20px;
  width: 256.71px;
  height: 71.18px;
}
.image10 {
  width: 33.29px;
  height: 49.17px;
  position: absolute;
  top: 8.22px;
  left: 223.42px;
}
.text20 {
  position: absolute;
  top: 0px;
  left: 139px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  color: rgba(126, 176, 100, 1);
  line-height: normal;
  font-weight: 400;
}
.text21 {
  position: absolute;
  top: 19.96px;
  left: 152px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 38.54px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  letter-spacing: -0.06em;
  font-weight: 600;
}
.text21__seg0 {
  font-size: 38.54px;
}
.text22 {
  position: absolute;
  top: 38.22px;
  left: 211px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 19.27px;
  white-space: nowrap;
  text-align: center;
  color: rgba(26, 108, 1, 1);
  line-height: normal;
  font-weight: 600;
}
.text22__seg0 {
  font-size: 19.27px;
}
.text23 {
  position: absolute;
  top: 38.22px;
  left: 139px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 21.68px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
}
.text23__seg0 {
  font-size: 21.68px;
}
.section4 {
  position: absolute;
  top: 20.18px;
  left: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 83px;
  height: 51px;
}
.text26 {
  margin-top: 18.04px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 21.68px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text26__seg0 {
  font-size: 21.68px;
}
.text24 {
  margin-left: 4px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 38.54px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text24__seg0 {
  font-size: 38.54px;
}
.text25 {
  margin-top: 18.04px;
  margin-left: 1px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 19.27px;
  white-space: nowrap;
  text-align: center;
  color: rgba(26, 108, 1, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text25__seg0 {
  font-size: 19.27px;
}
.image11 {
  width: 261px;
  height: 327px;
  position: absolute;
  top: 65px;
  left: 329px;
}
.content5 {
  position: absolute;
  top: 0px;
  left: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 415px;
  height: 42px;
}
.text27 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text28 {
  margin-left: 26px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
`,n$=`.page {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 1121px;
  height: 1027px;
}
.wrap2 {
  width: 347px;
  height: 1026px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container2 {
  width: 347px;
  overflow: hidden;
  border-radius: 30px;
  box-sizing: border-box;
  background: rgba(255, 246, 248, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;
}
.content5 {
  width: 347px;
  height: 434px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.image12 {
  width: 347px;
  height: 434px;
}
.content6 {
  width: 298px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.main4 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.section4 {
  width: 50.35px;
  height: 27.46px;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(255, 75, 140, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
.text25 {
  font-family: "Source Han Sans CN";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 500;
}
.text26 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
}
.text27 {
  width: 298px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
}
.content7 {
  width: 298px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text28 {
  margin-bottom: 8px;
  width: 291.67px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 700;
}
.main5 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 298px;
  height: 224px;
}
.section5 {
  width: 298px;
  height: 71px;
  overflow: hidden;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(252, 234, 240, 1);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.text29 {
  margin-top: 33px;
  margin-left: 20px;
  font-family: "Source Han Sans CN Regular";
  font-size: 16px;
  white-space: nowrap;
  color: rgba(175, 94, 121, 1);
  line-height: 26.49px;
  font-weight: 400;
  flex-shrink: 0;
}
.text30 {
  margin-top: 22px;
  margin-left: 9.07px;
  font-family: "Douyin Number ABC";
  font-size: 32.3px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 75, 140, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text30__seg0 {
  font-size: 32.3px;
}
.text30__seg1 {
  font-size: 19px;
  font-weight: 500;
}
.image13 {
  width: 80.93px;
  height: 63.74px;
  margin-top: 7.26px;
  margin-left: 45.68px;
}
.section6 {
  margin-top: 12px;
  position: relative;
  width: 263.57px;
  height: 141px;
}
.image14 {
  width: 263.57px;
  height: 1.57px;
  position: absolute;
  top: 104.54px;
  left: 0px;
}
.subSection7 {
  position: absolute;
  top: 2px;
  left: 42.21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 72px;
  height: 139px;
}
.block5 {
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50px;
  height: 29.43px;
}
.text32 {
  margin-top: 4px;
  width: 9px;
  height: 25.43px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 15px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.text31 {
  margin-left: 2px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text31__seg1 {
  font-size: 15px;
  font-weight: 400;
}
.block4 {
  margin-top: 1.77px;
  margin-left: 11px;
  position: relative;
  width: 49px;
  height: 71.21px;
}
.subBlock3 {
  width: 49px;
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 46, 119, 1) 0%,
    rgba(255, 89, 156, 1) 99.71%
  );
  min-height: 71.21px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subBlock4 {
  width: 49px;
  box-sizing: border-box;
  background: rgba(255, 204, 225, 1);
  min-height: 15.26px;
  position: absolute;
  top: 55.95px;
  left: 0px;
}
.text33 {
  margin-top: 9.59px;
  font-family: "Source Han Sans CN";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(175, 94, 121, 1);
  line-height: normal;
  font-weight: 350;
  flex-shrink: 0;
}
.subSection8 {
  position: absolute;
  top: 0px;
  left: 151.21px;
  width: 72px;
  height: 141px;
}
.block6 {
  position: absolute;
  top: 29.41px;
  left: 9.83px;
  width: 49px;
  height: 75px;
}
.subBlock5 {
  width: 49px;
  border-radius: 4px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 46, 119, 1) 0%,
    rgba(255, 89, 156, 1) 100%
  );
  min-height: 75px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subBlock6 {
  width: 49px;
  box-sizing: border-box;
  background: rgba(255, 204, 225, 1);
  min-height: 16px;
  position: absolute;
  top: 59px;
  left: 0px;
}
.block7 {
  position: absolute;
  top: 0px;
  left: 11.83px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 49px;
  height: 36.88px;
}
.text35 {
  margin-top: 4px;
  width: 9px;
  height: 25.43px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 15px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.text34 {
  margin-left: 2px;
  width: 38px;
  height: 36.88px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text34__seg1 {
  font-size: 15px;
  font-weight: 400;
}
.text36 {
  position: absolute;
  top: 114px;
  left: 0px;
  font-family: "Source Han Sans CN";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(175, 94, 121, 1);
  line-height: normal;
  font-weight: 350;
}
.wrap1 {
  width: 347px;
  height: 1027px;
  box-sizing: border-box;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container1 {
  width: 347px;
  overflow: hidden;
  border-radius: 30px 0px 0px 30px;
  box-sizing: border-box;
  background: rgba(255, 247, 239, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 30px;
}
.content3 {
  width: 347px;
  height: 434px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;
}
.image4 {
  width: 347px;
  height: 434px;
}
.content4 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-right: 24px;
  padding-left: 24px;
}
.main2 {
  width: 298px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 30px;
}
.section2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.subSection1 {
  width: 50.35px;
  height: 27.46px;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(255, 73, 50, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
.text14 {
  font-family: "Source Han Sans CN";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 500;
}
.text15 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
}
.text16 {
  width: 298px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 400;
}
.main3 {
  width: 298px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text17 {
  margin-bottom: 8px;
  width: 291.67px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 700;
}
.section3 {
  position: relative;
  width: 298px;
  height: 228.51px;
}
.subSection2 {
  position: absolute;
  top: 107px;
  left: 7.96px;
  width: 284px;
  height: 121.51px;
}
.block2 {
  position: absolute;
  top: 8px;
  left: 0px;
  width: 284px;
  height: 113.51px;
}
.image5 {
  width: 2px;
  height: 41px;
  position: absolute;
  top: 42px;
  left: 219.04px;
}
.image6 {
  width: 2px;
  height: 79px;
  position: absolute;
  top: 4px;
  left: 63.04px;
}
.image7 {
  width: 260.58px;
  height: 81px;
  position: absolute;
  top: 2.5px;
  left: 4.46px;
}
.image8 {
  width: 265.58px;
  height: 50.5px;
  position: absolute;
  top: 0px;
  left: 1.96px;
}
.subBlock2 {
  position: absolute;
  top: 80.36px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 284px;
  height: 33.15px;
}
.image9 {
  width: 282px;
  height: 6.42px;
  margin-left: 1px;
}
.text18 {
  margin-top: 12.22px;
  margin-left: 106.04px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  text-align: center;
  color: rgba(166, 134, 134, 1);
  line-height: 26.49px;
  font-weight: 400;
  flex-shrink: 0;
}
.image10 {
  width: 21px;
  height: 21px;
  position: absolute;
  top: 0px;
  left: 53.04px;
}
.image11 {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 37px;
  left: 207.08px;
}
.block3 {
  position: absolute;
  top: 6px;
  left: 192.04px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 54.1px;
  height: 33.67px;
}
.text20 {
  margin-top: 5.7px;
  width: 9.9px;
  height: 27.97px;
  font-family: "Douyin Number ABC";
  font-size: 16.5px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.text20__seg0 {
  font-size: 16.5px;
}
.text19 {
  margin-left: 2.2px;
  font-family: "Douyin Number ABC";
  font-size: 24.2px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text19__seg0 {
  font-size: 24.2px;
}
.text19__seg1 {
  font-size: 16.5px;
  font-weight: 400;
}
.subSection3 {
  width: 143px;
  height: 85px;
  overflow: hidden;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(254, 239, 236, 1);
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.text21 {
  margin-top: 15.33px;
  margin-left: 16px;
  width: 48px;
  height: 12px;
  font-family: "Source Han Sans CN Regular";
  font-size: 16px;
  white-space: nowrap;
  color: rgba(179, 113, 94, 1);
  line-height: 26.49px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
.text22 {
  margin-top: 7.13px;
  margin-left: 15px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 32.3px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 73, 50, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text22__seg0 {
  font-size: 32.3px;
}
.text22__seg1 {
  font-size: 19px;
  font-weight: 500;
}
.subSection4 {
  width: 143px;
  height: 85px;
  overflow: hidden;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(254, 239, 236, 1);
  position: absolute;
  top: 0px;
  left: 155px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.text23 {
  margin-top: 15px;
  margin-left: 16px;
  width: 48px;
  height: 12px;
  font-family: "Source Han Sans CN Regular";
  font-size: 16px;
  white-space: nowrap;
  color: rgba(179, 113, 94, 1);
  line-height: 26.49px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
.text24 {
  margin-top: 7.13px;
  margin-left: 16px;
  opacity: 0.9;
  font-family: "Douyin Number ABC";
  font-size: 32.3px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 73, 50, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text24__seg0 {
  font-size: 32.3px;
}
.text24__seg1 {
  font-size: 19px;
  font-weight: 500;
}
.wrap {
  width: 347px;
  height: 1023px;
  box-sizing: border-box;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 347px;
  height: 1023px;
  overflow: hidden;
  border-radius: 30px;
  box-sizing: border-box;
  background: rgba(252, 255, 250, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;
}
.content {
  width: 347px;
  height: 434px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.image {
  width: 347px;
  height: 434px;
}
.content1 {
  width: 298px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.section {
  width: 50.35px;
  height: 27.46px;
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(49, 124, 26, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  font-weight: 500;
}
.text1 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: 138.91%;
  font-weight: 700;
}
.text2 {
  width: 298px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(166, 134, 134, 1);
  line-height: normal;
  font-weight: 400;
}
.content2 {
  width: 291.67px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text3 {
  margin-bottom: 8px;
  width: 291.67px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(166, 134, 134, 1);
  line-height: 36px;
  font-weight: 700;
}
.main1 {
  position: relative;
  width: 286.29px;
  height: 215px;
}
.image1 {
  width: 147px;
  height: 215px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text4 {
  position: absolute;
  top: 28px;
  left: 22px;
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(1, 65, 6, 1);
  line-height: 32px;
  font-weight: 700;
}
.text5 {
  position: absolute;
  top: 56px;
  left: 22px;
  font-family: "Douyin Number ABC";
  font-size: 37.06px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
}
.text5__seg0 {
  font-size: 37.06px;
}
.text5__seg1 {
  font-size: 25.27px;
  font-weight: 400;
}
.section1 {
  position: absolute;
  top: 25.95px;
  left: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116.29px;
  height: 170.01px;
}
.subSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 116.29px;
  height: 170.01px;
}
.block1 {
  position: relative;
  width: 116.29px;
  height: 66.18px;
}
.subBlock {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 116.29px;
  height: 52.22px;
}
.div {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 116.29px;
  height: 52.22px;
}
.text10 {
  margin-top: 2.05px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  color: rgba(126, 176, 100, 1);
  line-height: 26.49px;
  font-weight: 400;
  flex-shrink: 0;
}
.image3 {
  width: 33.29px;
  height: 49.17px;
  margin-top: 3.05px;
  margin-left: 11px;
}
.subBlock1 {
  position: absolute;
  top: 15.18px;
  left: 2px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 81px;
  height: 51px;
}
.text13 {
  margin-top: 12.86px;
  font-family: "Douyin Number ABC";
  font-size: 21.68px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text13__seg0 {
  font-size: 21.68px;
}
.text11 {
  margin-left: 2px;
  font-family: "Douyin Number ABC";
  font-size: 38.54px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text11__seg0 {
  font-size: 38.54px;
}
.text12 {
  margin-top: 18.04px;
  margin-left: 1px;
  font-family: "Douyin Number ABC";
  font-size: 19.27px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
  flex-shrink: 0;
}
.text12__seg0 {
  font-size: 19.27px;
}
.block {
  margin-top: 37.64px;
  position: relative;
  width: 116.29px;
  height: 66.18px;
}
.image2 {
  width: 33.29px;
  height: 49.17px;
  position: absolute;
  top: 8.22px;
  left: 83px;
}
.text6 {
  position: absolute;
  top: 2.05px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 18px;
  white-space: nowrap;
  color: rgba(126, 176, 100, 1);
  line-height: 26.49px;
  font-weight: 400;
}
.text7 {
  position: absolute;
  top: 15.18px;
  left: 18px;
  font-family: "Douyin Number ABC";
  font-size: 38.54px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  letter-spacing: -0.06em;
  font-weight: 600;
}
.text7__seg0 {
  font-size: 38.54px;
}
.text8 {
  position: absolute;
  top: 33.44px;
  left: 62px;
  font-family: "Douyin Number ABC";
  font-size: 19.27px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
}
.text8__seg0 {
  font-size: 19.27px;
}
.text9 {
  position: absolute;
  top: 26.22px;
  left: 2px;
  font-family: "Douyin Number ABC";
  font-size: 21.68px;
  white-space: nowrap;
  text-align: center;
  color: rgba(49, 124, 26, 1);
  line-height: normal;
  font-weight: 600;
}
.text9__seg0 {
  font-size: 21.68px;
}
`,t$=`.page {
  width: 702px;
  height: 105.2px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  width: 702px;
  border-radius: 32px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 105.2px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 33.33px;
  height: 34.62px;
  position: absolute;
  top: 35.29px;
  left: 37.9px;
}
.image1 {
  width: 133.63px;
  height: 17.38px;
  position: absolute;
  top: 59.79px;
  left: 251.22px;
}
.text {
  position: absolute;
  top: 31.6px;
  left: 88.38px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.wrap1 {
  width: 204px;
  height: 62px;
  border-radius: 999px;
  border-color: rgba(255, 98, 160, 1);
  border-style: solid;
  border-width: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 21.6px;
  left: 471.85px;
}
.text1 {
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: normal;
  letter-spacing: 0.02em;
  font-weight: 700;
}
`,i$=`.page {
  width: 702px;
  height: 191.25px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  width: 702px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 190px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.wrap1 {
  position: absolute;
  top: 37.16px;
  left: 41.46px;
  width: 30px;
  height: 30px;
}
.image {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 4.39px;
  height: 18.88px;
  position: absolute;
  top: 5.56px;
  left: 12.8px;
}
.image2 {
  width: 660.81px;
  height: 98.02px;
  position: absolute;
  top: 73.48px;
  left: 20.59px;
}
.wrap2 {
  width: 202px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  position: absolute;
  top: 94.53px;
  left: 469px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.text1 {
  position: absolute;
  top: 30.66px;
  left: 79.61px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text2 {
  position: absolute;
  top: 112px;
  left: 41.46px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
}
`,a$=`.page {
  position: relative;
  width: 702.36px;
  height: 198.1px;
}
.image {
  width: 702px;
  height: 198.1px;
  position: absolute;
  top: 0px;
  left: 0.36px;
}
.image svg {
  display: block;
  width: 702px;
  height: 198.1px;
}
.wrap {
  position: absolute;
  top: 39.01px;
  left: 46.54px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 360px;
  height: 40px;
}
.text {
  font-family: "MFBenHeiNoncommercial";
  font-size: 36px;
  white-space: nowrap;
  text-align: left;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  font-weight: 400;
  flex-shrink: 0;
}
.wrap1 {
  width: 451px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  padding-right: 96px;
  padding-left: 42px;
  position: absolute;
  top: 99.05px;
  left: 0px;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
}
.text1 {
  margin-right: 4px;
  width: 31px;
  height: 63.92px;
  font-family: "Source Han Sans CN";
  font-size: 30px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: 40px;
  letter-spacing: 0.01em;
  font-weight: 700;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
}
.text2 {
  min-width: 0;
  height: 73.95px;
  font-family: "Douyin Number ABC";
  font-size: 76px;
  white-space: nowrap;
  text-align: left;
  color: rgba(255, 27, 119, 1);
  line-height: 84px;
  letter-spacing: -0.03em;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
.buttonText {
  position: absolute;
  top: 56px;
  left: 475.64px;
  width: 198px;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 700;
}
.text3 {
  min-width: 0;
  height: 55.83px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: left;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
`,o$=`.page {
  width: 608px;
  height: 201.71px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  width: 608px;
  border-radius: 50px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 197, 229, 1) 0%,
    rgba(255, 167, 210, 1) 100%
  );
  min-height: 200px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 501.57px;
  height: 200.54px;
  position: absolute;
  top: 1.16px;
  left: 4.81px;
}
.image1 {
  width: 421.64px;
  height: 200px;
  position: absolute;
  top: 0px;
  left: 186.3px;
}
.image1 svg {
  display: block;
  width: 421.64px;
  height: 200px;
}
.image2 {
  width: 421.49px;
  height: 200px;
  position: absolute;
  top: 0px;
  left: 186.45px;
}
.image2 svg {
  display: block;
  width: 421.49px;
  height: 200px;
}
.wrap1 {
  position: absolute;
  top: 49.73px;
  left: 281.1px;
  width: 253.42px;
  height: 102.02px;
}
.container {
  width: 253.42px;
  height: 51px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 12px;
  padding-left: 12px;
  position: absolute;
  top: 51.02px;
  left: 0px;
}
.text {
  width: 233px;
  height: 31px;
  font-family: "Source Han Sans CN Regular";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(255, 244, 246, 1);
  line-height: 30px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.container1 {
  width: 230.28px;
  height: 56px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 10.3px;
}
.text1 {
  margin-right: 3px;
  font-family: "Douyin Sans";
  font-size: 42px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  letter-spacing: -0.02em;
  font-weight: 400;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 40px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 56px;
  font-weight: 700;
}
.wrap2 {
  width: 195.32px;
  height: 104.52px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 53.75px;
  left: 41.57px;
}
.container2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.text3 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 76px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 84px;
  letter-spacing: -0.03em;
  font-weight: 700;
}
.text4 {
  width: 40px;
  height: 61.47px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 38px;
  font-weight: 700;
  display: inline-flex;
  align-items: flex-end;
}
`,r$=`.page {
  width: 607px;
  height: 198px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 607px;
  height: 198px;
  box-sizing: border-box;
  position: relative;
}
.container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 607px;
  height: 198px;
}
.content {
  width: 607px;
  border-radius: 52px;
  box-sizing: border-box;
  background: rgba(255, 197, 229, 1);
  min-height: 198px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 500.78px;
  height: 197.89px;
  position: absolute;
  top: 0.11px;
  left: 4.79px;
}
.image1 {
  width: 420.8px;
  height: 198px;
  position: absolute;
  top: 0px;
  left: 186.14px;
}
.image1 svg {
  display: block;
  width: 420.8px;
  height: 198px;
}
.image2 {
  width: 420.8px;
  height: 198px;
  position: absolute;
  top: 0px;
  left: 186.14px;
}
.image2 svg {
  display: block;
  width: 420.8px;
  height: 198px;
}
.container1 {
  position: absolute;
  top: 0px;
  left: 186.14px;
  width: 420.69px;
  height: 197px;
}
.image3 {
  width: 420.69px;
  height: 197px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image4 {
  width: 117.63px;
  height: 83.16px;
  position: absolute;
  top: 0px;
  left: 301.05px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(224, 130, 8, 1);
  line-height: 1;
  font-weight: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transform: rotate(34deg);
  transform-origin: 16px 36px;
}
.container2 {
  position: absolute;
  top: 48.48px;
  left: 280.64px;
  width: 253px;
  height: 101.77px;
}
.content1 {
  width: 253px;
  height: 51px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 12px;
  padding-left: 12px;
  position: absolute;
  top: 50.77px;
  left: 0px;
}
.text {
  width: 233px;
  height: 31px;
  font-family: "Source Han Sans CN Regular";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(255, 217, 229, 1);
  line-height: 30px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.content2 {
  width: 230.28px;
  height: 56px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 10.28px;
}
.text1 {
  margin-right: 3px;
  font-family: "Douyin Sans";
  font-size: 42px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  letter-spacing: -0.02em;
  font-weight: 400;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 40px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 56px;
  font-weight: 700;
}
.container3 {
  width: 195px;
  height: 145px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 31.48px;
  left: 44.64px;
}
.content3 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text3 {
  margin-bottom: -1px;
  width: 173px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(81, 81, 81, 1);
  line-height: 42px;
  font-weight: 500;
}
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.text4 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 76px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 84px;
  letter-spacing: -0.03em;
  font-weight: 800;
}
.text5 {
  width: 40px;
  height: 61.47px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 149.24%;
  font-weight: 700;
  display: inline-flex;
  align-items: flex-end;
}
`,s$=`.page {
  width: 618px;
  height: 333px;
  border-radius: 52px;
  box-sizing: border-box;
  background: linear-gradient(
    181deg,
    rgba(255, 255, 255, 1) -38.82%,
    rgba(255, 216, 221, 1) 111.38999999999999%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text1 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main1 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text2 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text3 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section1 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text5 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap1 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content2 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text6 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main2 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text7 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main3 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section2 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text8 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text9 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section3 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text10 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container3 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text11 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container4 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content4 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text12 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main4 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text13 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main5 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section4 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text14 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text15 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section5 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text16 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container5 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text17 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,l$=`.page {
  width: 618px;
  height: 333px;
  border-radius: 52px;
  box-sizing: border-box;
  background: linear-gradient(
    181deg,
    rgba(255, 255, 255, 1) -38.82%,
    rgba(255, 216, 221, 1) 111.38999999999999%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text1 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main1 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text2 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text3 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section1 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text5 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap1 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content2 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text6 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main2 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text7 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main3 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section2 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text8 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text9 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section3 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text10 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container3 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text11 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container4 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content4 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text12 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main4 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text13 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main5 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section4 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text14 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text15 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section5 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text16 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container5 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text17 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,d$=`.page {
  width: 618px;
  height: 333px;
  border-radius: 52px;
  box-sizing: border-box;
  background: linear-gradient(
    181deg,
    rgba(255, 255, 255, 1) -38.82%,
    rgba(255, 216, 221, 1) 111.38999999999999%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text1 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main1 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text2 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text3 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section1 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text5 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap1 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content2 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text6 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main2 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text7 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main3 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section2 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text8 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text9 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section3 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text10 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container3 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text11 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container4 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content4 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text12 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main4 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text13 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main5 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section4 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text14 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text15 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section5 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text16 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container5 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text17 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,p$=`.page {
  width: 618px;
  height: 333px;
  border-radius: 52px;
  box-sizing: border-box;
  background: linear-gradient(
    181deg,
    rgba(255, 255, 255, 1) -38.82%,
    rgba(255, 216, 221, 1) 111.38999999999999%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text1 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main1 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text2 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text3 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section1 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text4 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container1 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text5 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap1 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content2 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text6 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main2 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text7 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main3 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section2 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text8 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text9 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section3 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text10 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container3 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text11 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap2 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
.container4 {
  width: 179px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 12px;
}
.content4 {
  height: 38px;
  border-radius: 999px;
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
  position: relative;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 238, 130, 1) 0%,
    rgba(255, 237, 39, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: -19px;
}
.text12 {
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.main4 {
  width: 178px;
  height: 66px;
  border-radius: 40px 40px 10px 10px;
  box-sizing: border-box;
    background: var(--coupon-style4-title-background, rgba(255, 98, 160, 1));
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
}
.text13 {
  width: 143px;
  height: 31px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.main5 {
  width: 178px;
  border-radius: 10px 10px 40px 40px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.section4 {
  width: 178px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.text14 {
  margin-right: 2px;
  font-family: "Douyin Number ABC";
  font-size: 62px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 62px;
  letter-spacing: -2px;
  font-weight: 500;
}
.text15 {
  width: 24px;
  height: 46px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.section5 {
  width: 178px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text16 {
  width: 149px;
  height: 24px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.container5 {
  width: 150px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
      var(--coupon-style4-button-gradient-start, rgba(255, 20, 115, 1)) 0%,
      var(--coupon-style4-button-gradient-end, rgba(255, 34, 159, 1)) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text17 {
  width: 78px;
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,c$=`.page {
  width: 350px;
  height: 110px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  min-width: 350px;
  padding: 25px 0;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  width: 165px;
  font-family: "Source Han Sans CN";
  font-size: 40px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  letter-spacing: 2px;
  font-weight: 700;
  flex-shrink: 0;
}
`,u$=`.page {
  width: 750px;
  height: 400px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.image {
  width: 554.97px;
  height: 400px;
  position: absolute;
  top: 0px;
  left: 195.03px;
  opacity: 0.5;
}
.image1 {
  width: 533.58px;
  height: 400px;
  position: absolute;
  top: 0px;
  left: 216.42px;
  opacity: 0.6;
}
.image2 {
  width: 387px;
  height: 305.2px;
  position: absolute;
  top: 94.8px;
  left: 351.46px;
}
.image3 {
  width: 100.19px;
  height: 132.51px;
  position: absolute;
  top: 17.18px;
  left: 0px;
}
.wrap {
  position: absolute;
  top: 101.69px;
  left: 47.46px;
  width: 316.15px;
  height: 249.36px;
}
.text {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 316.15px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 74px;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: anywhere;
  color: rgba(44, 1, 19, 1);
  line-height: 96px;
  font-weight: 400;
  min-height: 96px;
}
.textLine {
  display: block;
  height: 96px;
}
.textLineGradient {
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.textLineSolid {
  color: inherit;
  -webkit-text-fill-color: currentColor;
}
.douyinNumber {
  font-family: "Douyin Number ABC", "MFBenHeiNoncommercial";
  font-size: 86px;
  font-weight: 800;
}
.container {
  position: absolute;
  top: 199.36px;
  left: 1.54px;
  display: inline-flex;
  align-items: center;
  width: max-content;
  min-width: 248px;
  height: 50px;
  padding: 0 15px;
  box-sizing: border-box;
}
.content {
  width: auto;
  border-radius: 32px;
  box-sizing: border-box;
  background: rgba(255, 98, 184, 1);
  position: absolute;
  inset: 0;
}
.text1 {
  position: relative;
  transform: rotate(1.129999680560335e-7deg);
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  font-weight: 500;
}
`,g$=`.page {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 303.12 / 224;
  container-type: inline-size;
}
.image {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("./assets/image_1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.image3 {
  position: absolute;
  top: 8.05%;
  left: 17.06%;
  width: 13.49%;
  height: 66.03%;
  opacity: 0.5;
}
.valueRow {
  position: absolute;
  top: 35.3%;
  left: 24%;
  width: 60%;
  height: 37.1%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3cqw;
}
.currency {
  flex: 0 0 auto;
  width: 10cqw;
  height: auto;
  margin-top: 6.1cqw;
  transform: translateX(1cqw);
}
.valueRowThreeDigits .currency {
  margin-top: 5.1cqw;
  transform: translateX(3cqw);
}
.amount {
  flex: 0 0 auto;
  position: relative;
  top: 3.5cqw;
  color: #ff8416;
  font-family: "Douyin Number ABC ExtraBold", "Source Han Sans CN Heavy", sans-serif;
  font-size: clamp(20px, 25cqw, 76px);
  font-weight: 800;
  line-height: 0.86;
  text-align: center;
  white-space: nowrap;
  transform: rotate(12.5deg);
  transform-origin: center;
}
.amountMedium {
  top: 5cqw;
  font-size: clamp(18px, 22cqw, 67px);
  transform: rotate(12.5deg) scaleX(0.92);
}
.amountSmall {
  font-size: clamp(16px, 18cqw, 55px);
}
`,m$=`.page {
  position: relative;
  width: 702px;
  height: 193px;
}
.wrap {
  width: 702px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 193px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 149px;
  height: 149px;
  border-radius: 28px;
  overflow: hidden;
  position: absolute;
  top: 22px;
  left: 22px;
}
.wrap1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  position: absolute;
  top: 44px;
  left: 176px;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 30px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text__seg0 {
  font-size: 30px;
}
.wrap2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  position: absolute;
  top: 95px;
  left: 176px;
}
.text1 {
  font-family: "Source Han Sans CN Regular";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 400;
}
.wrap3 {
  width: 176px;
  height: 70px;
  border-radius: 999px;
  box-sizing: border-box;
  background: rgba(45, 45, 45, 1);
  position: absolute;
  top: 66.9px;
  left: 504.64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,f$=`.page {
  width: 576px;
  height: 613px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.trafficCouponLocked {
  cursor: not-allowed;
  overflow: visible;
}
.trafficCouponLocked::after {
  content: attr(data-edit-hint);
  position: absolute;
  top: 50%;
  right: calc(100% + 12px);
  z-index: 50;
  padding: 8px 12px;
  border-radius: 6px;
  background: rgba(31, 35, 41, 0.92);
  color: #fff;
  font-family: "Source Han Sans CN", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(4px) translateY(-50%);
  transition: opacity 160ms ease-in-out, transform 160ms ease-in-out;
}
.trafficCouponLocked:hover::after {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}
.familyPackPage {
  height: 554.87px;
}
.familyPackPage .wrap,
.familyPackPage .container {
  height: 554.87px;
}
.familyPackPage .image {
  height: 436.58px;
}
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 576px;
  height: 613px;
}
.container {
  position: relative;
  width: 576px;
  height: 613px;
}
.image {
  width: 576px;
  height: 494.71px;
  position: absolute;
  top: 118.29px;
  left: 0px;
}
.image svg {
  display: block;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  top: 177.79px;
  left: 113.45px;
  width: 348.25px;
  height: 74.12px;
}
.image1 {
  width: 348.25px;
  height: 74.12px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image2 {
  width: 176.64px;
  height: 42.07px;
  position: absolute;
  top: 11.03px;
  left: 85.81px;
}
.image3 {
  width: 213.86px;
  height: 232px;
  object-fit: contain;
  position: absolute;
  top: 0px;
  left: 181.07px;
}
.trafficCouponImage {
  transform: scale(1.36);
  transform-origin: center center;
}
.trafficCouponComponent {
  position: absolute;
  top: 22px;
  left: 147px;
  width: 282px;
  height: 208px;
}
.officialRecommendationImage {
  transform: scale(2);
  transform-origin: center center;
}
.familyPackImage {
  transform: translateX(16px) scale(1.22);
  transform-origin: center center;
}
.contentDiagnosisImage {
  transform: translate(10px, -10px) scale(1.08);
  transform-origin: center center;
}
.text {
  position: absolute;
  top: 244px;
  left: 194.5px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 46px;
  white-space: nowrap;
  text-align: right;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  letter-spacing: 0.02em;
  font-weight: 400;
}
.wrap1 {
  position: absolute;
  top: 281.81px;
  left: 75px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 426.93px;
  height: 94.48px;
}
.noSubTextTitleWrap {
  top: 293.81px;
}
.familyPackTitleWrap {
  top: 281.81px;
  left: 16px;
  width: 576px;
  height: 48px;
  justify-content: center;
  align-items: center;
}
.familyPackTitle {
  width: auto;
  font-family: "MFBenHeiNoncommercial";
  font-size: 46px;
  line-height: 48px;
  font-weight: 400;
  color: #2D2D2D;
  text-align: center;
  white-space: nowrap;
}
.familyPackTitle span {
  color: inherit;
}
.contentDiagnosisTitleWrap {
  top: 279px;
  left: 0;
  width: 576px;
  height: 64px;
  justify-content: center;
  align-items: center;
}
.contentDiagnosisTitle {
  width: auto;
  font-family: "MFBenHeiNoncommercial";
  font-size: 46px;
  line-height: 54px;
  font-weight: 400;
  color: #2D2D2D;
  text-align: center;
  white-space: nowrap;
}
.contentDiagnosisTitle span {
  position: relative;
  display: inline-block;
  isolation: isolate;
}
.contentDiagnosisDecoration {
  position: absolute;
  z-index: -1;
  bottom: -11px;
  left: 50%;
  width: 260px;
  height: auto;
  transform: translateX(-50%);
}
.contentDiagnosisAmount {
  position: absolute;
  top: 379px;
  left: 0;
  width: 576px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.contentDiagnosisAmountIcon {
  width: 96px;
  height: auto;
}
.contentDiagnosisAmount span {
  font-family: "Popup Number ExtraBold";
  font-size: 57px;
  line-height: 86px;
  font-weight: 800;
  letter-spacing: -1px;
}
.text2 {
  font-family: "Popup Number ExtraBold";
  font-size: 95px;
  white-space: nowrap;
  color: rgba(255, 19, 114, 1);
  line-height: 100%;
  letter-spacing: -4.05px;
  font-weight: 800;
  flex-shrink: 0;
  transform: translateY(10px);
}
.text2__seg0 {
  letter-spacing: -4.05px;
}
.text1 {
  margin-top: 41.19px;
  margin-left: 10px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 46px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  letter-spacing: 0.02em;
  font-weight: 400;
  flex-shrink: 0;
}
.officialRecommendationPrizeName {
  color: inherit;
}
.douPrizeText {
  font-family: "Douyin Sans";
  font-size: 56px;
  font-weight: 700;
  -webkit-text-stroke: 1px currentColor !important;
}
.subText {
  position: absolute;
  top: 388px;
  left: 0;
  width: 576px;
  font-family: "Source Han Sans CN Regular";
  font-size: 30px;
  line-height: 38px;
  font-weight: 400;
  color: #2D2D2D;
  text-align: center;
  white-space: nowrap;
}
.officialRecommendationSubText {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
}
.familyPackAddress {
  position: absolute;
  top: 379.81px;
  left: 50%;
  transform: translateX(-50%);
}
.buttonPage {
  position: absolute;
  top: 468px;
  left: 131px;
  width: 314px;
  height: 110px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonWrap {
  min-width: 314px;
  padding: 25px 0;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonText {
  width: 165px;
  font-family: "Source Han Sans CN";
  font-size: 40px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  letter-spacing: 2px;
  font-weight: 700;
  flex-shrink: 0;
}
`,x$=`.page {
  width: 576px;
  height: 634px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  position: relative;
  width: 576px;
  height: 634px;
}
.container {
  position: absolute;
  top: 139px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 576px;
  height: 495px;
}
.content {
  position: relative;
  width: 576px;
  height: 495px;
}
.image {
  width: 576px;
  height: 495px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text {
  position: absolute;
  top: 265px;
  left: 100.48px;
  opacity: 0.65;
  font-family: "OPPOSans";
  font-size: 30px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 34px;
  font-weight: 300;
}
.text1 {
  position: absolute;
  top: 196px;
  left: 123px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 46px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  letter-spacing: 0.02em;
  font-weight: 400;
}
.main {
  position: absolute;
  top: 80.09px;
  left: 137.09px;
  width: 300.96px;
  height: 71.16px;
}
.image1 {
  width: 300.96px;
  height: 71.16px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image2 {
  width: 152.99px;
  height: 40.19px;
  position: absolute;
  top: 19px;
  left: 73.99px;
}
.image3 {
  width: 242.95px;
  height: 262.05px;
  position: absolute;
  top: 0px;
  left: 175.96px;
}
`,h$=`.page {
  width: 554px;
  height: 205px;
  box-sizing: border-box;
  position: relative;
}
.image {
  width: 554px;
  height: 205px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.wrap {
  width: 195px;
  height: 136px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40.76px;
  left: 42.64px;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: -10px;
}
.text {
  margin-right: 8px;
  font-family: "Douyin Number ABC";
  font-size: 76px;
  white-space: nowrap;
  text-align: center;
  color: rgba(110, 23, 23, 1);
  line-height: 84px;
  letter-spacing: -0.03em;
  font-weight: 600;
}
.text1 {
  width: 35px;
  height: 50px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: flex-end;
}
.text2 {
  width: 174px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(110, 23, 23, 1);
  line-height: normal;
  font-weight: 700;
}
.wrap1 {
  width: 263px;
  height: 90px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 62.55px;
  left: 287.57px;
}
.container1 {
  width: 243px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content1 {
  width: 230.28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.text3 {
  margin-right: 3px;
  font-family: "Douyin Sans";
  font-size: 42px;
  white-space: nowrap;
  color: rgba(215, 103, 103, 1);
  line-height: normal;
  letter-spacing: -0.02em;
  font-weight: 400;
}
.text4 {
  font-family: "Source Han Sans CN";
  font-size: 40px;
  white-space: nowrap;
  color: rgba(215, 103, 103, 1);
  line-height: 56px;
  font-weight: 700;
}
.text5 {
  width: 243px;
  font-family: "Source Han Sans CN Regular";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(215, 103, 103, 1);
  line-height: 30px;
  font-weight: 400;
}
`,b$=`.page {
  width: 600px;
  height: 233px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.container {
  width: 580.23px;
  height: 153.04px;
  box-sizing: border-box;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.slot {
  width: 160px;
  height: 153px;
  margin-right: 50px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.lastSlot {
  margin-right: 0;
}
.slot .image,
.slot .main,
.slot .main1 {
  margin-right: 0;
}
.drawSlot {
  width: 160px;
  height: 153px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  width: 160px;
  height: 141.58px;
  margin-right: 50px;
}
.image svg {
  display: block;
  width: 160px;
  height: 141.58px;
}
.main {
  width: 160px;
  height: 153px;
  overflow: hidden;
  box-sizing: border-box;
  margin-right: 50px;
  position: relative;
}
.section {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 160px;
  height: 152.25px;
}
.image1 {
  width: 160px;
  height: 127px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 svg {
  display: block;
  width: 160px;
  height: 127px;
}
.subSection {
  position: absolute;
  top: 6px;
  left: 5.05px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 149.89px;
  height: 115px;
}
.subBlock {
  width: 149.89px;
  border-radius: 31.82px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 115px;
}
.image2 {
  width: 160px;
  height: 78.6px;
  position: absolute;
  top: 73.65px;
  left: 0px;
}
.image2 svg {
  display: block;
  width: 160px;
  height: 78.6px;
}
.section1 {
  position: absolute;
  top: 64px;
  left: 42.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 36px;
}
.subSection1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.text {
  margin-right: 2px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 42px;
  white-space: nowrap;
  text-align: right;
  color: rgba(255, 19, 114, 1);
  line-height: 35.92px;
  font-weight: 800;
}
.text1 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 800;
}
.text2 {
  position: absolute;
  top: 17px;
  left: 47px;
  font-family: "Douyin Sans";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 98, 160, 1);
  line-height: normal;
  font-weight: 400;
}
.section2 {
  position: absolute;
  top: 43px;
  left: 4.67px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 150.27px;
  height: 14px;
}
.image3 {
  width: 7px;
  height: 14px;
}
.image3 svg {
  display: block;
  width: 7px;
  height: 14px;
}
.image5 {
  width: 125.24px;
  height: 3px;
  margin-top: 5px;
  margin-left: 5.52px;
}
.image4 {
  width: 7px;
  height: 14px;
  margin-left: 5.52px;
}
.image4 svg {
  display: block;
  width: 7px;
  height: 14px;
}
.main1 {
  width: 160px;
  height: 153px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.section3 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 160px;
  height: 152.25px;
}
.image6 {
  width: 160px;
  height: 127px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image6 svg {
  display: block;
  width: 160px;
  height: 127px;
}
.subSection2 {
  position: absolute;
  top: 6px;
  left: 5.05px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 149.89px;
  height: 115px;
}
.subBlock1 {
  width: 149.89px;
  border-radius: 31.82px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 115px;
}
.image7 {
  width: 160px;
  height: 78.6px;
  position: absolute;
  top: 73.65px;
  left: 0px;
}
.image7 svg {
  display: block;
  width: 160px;
  height: 78.6px;
}
.section4 {
  position: absolute;
  top: 64px;
  left: 42.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 36px;
}
.subSection3 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.text3 {
  margin-right: 2px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 42px;
  white-space: nowrap;
  text-align: right;
  color: rgba(255, 19, 114, 1);
  line-height: 35.92px;
  font-weight: 800;
}
.text4 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
}
.text5 {
  position: absolute;
  top: 17px;
  left: 47px;
  font-family: "Douyin Sans";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 98, 160, 1);
  line-height: normal;
  font-weight: 400;
}
.section5 {
  position: absolute;
  top: 43px;
  left: 4.67px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 150.27px;
  height: 14px;
}
.image8 {
  width: 7px;
  height: 14px;
}
.image8 svg {
  display: block;
  width: 7px;
  height: 14px;
}
.image10 {
  width: 125.24px;
  height: 3px;
  margin-top: 5px;
  margin-left: 5.52px;
}
.image9 {
  width: 7px;
  height: 14px;
  margin-left: 5.52px;
}
.image9 svg {
  display: block;
  width: 7px;
  height: 14px;
}
.container1 {
  width: 600px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1 {
  position: relative;
  width: 600px;
  height: 24px;
}
.main2 {
  width: 600px;
  border-radius: 999px;
  box-sizing: border-box;
  background: #ffdbdb;
  min-height: 12px;
  position: absolute;
  top: 6px;
  left: 0px;
}
.image11 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 288px;
}
.image12 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 499.7px;
}
.image13 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 76px;
}
.wrap1 {
  width: 580px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 160px);
  column-gap: 50px;
  align-items: flex-start;
  margin-top: 20px;
}
.text6,
.text7,
.text8 {
  width: 130px;
  display: grid;
  grid-template-columns: 48px 50px 24px;
  column-gap: 4px;
  align-items: center;
  justify-self: center;
  transform: rotate(-6.909522671007686e-15deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
.consumePrefix,
.consumeAmount,
.consumeUnit {
  display: block;
  min-width: 0;
  text-align: center;
}
.consumeAmount {
  font-family: "Source Han Sans CN Medium";
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #2d2d2d;
}
`,y$=`.page {
  width: 615.08px;
  height: 403px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  position: relative;
  width: 614.36px;
  height: 403px;
}
.container {
  position: absolute;
  top: 0px;
  left: 426px;
  width: 188.36px;
  height: 188px;
}
.content {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0.36px;
}
.content1 {
  width: 188px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 134px;
  left: 0px;
}
.text {
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.text,
.text1,
.text2,
.text5,
.text7 {
  overflow: visible;
  text-overflow: clip;
}
.text__listwrap,
.text1__listwrap {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
  word-break: break-word;
}
.content2 {
  position: absolute;
  top: 20px;
  left: 19px;
  width: 150px;
  height: 112px;
}
.container1 {
  position: absolute;
  top: 0px;
  left: 213px;
  width: 188px;
  height: 188px;
}
.content3 {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content4 {
  width: 187px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 134px;
  left: 0.64px;
}
.text1 {
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.content5 {
  position: absolute;
  top: 20px;
  left: 19px;
  width: 150px;
  height: 112px;
}
.container2 {
  position: absolute;
  top: 215px;
  left: 213px;
  width: 188px;
  height: 188px;
}
.content6 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 188px;
  height: 188px;
}
.main {
  position: relative;
  width: 188px;
  height: 188px;
}
.section {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.prizeImage {
  width: 150px;
  height: 112px;
  position: absolute;
  top: 20px;
  left: 19px;
  display: block;
  object-fit: contain;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.trafficCouponPrize {
  width: 150px;
  height: 112px;
}

.pointsPrizeImage {
  transform: translateX(6px);
}
.content2 .prizeImage,
.content5 .prizeImage,
.content10 .prizeImage,
.content13 .prizeImage {
  top: 0px;
  left: 0px;
}
.text2 {
  position: absolute;
  top: 134px;
  left: 0px;
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.container3 {
  position: absolute;
  top: 215px;
  left: 0px;
  width: 188.36px;
  height: 188px;
}
.content8 {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0.36px;
}
.content9 {
  width: 188px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 134px;
  left: 0px;
}
.text5 {
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  letter-spacing: 0;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.prizeNameRecommend {
  letter-spacing: -0.1em !important;
  white-space: nowrap !important;
  word-break: keep-all !important;
  flex-wrap: nowrap !important;
}
.content10 {
  position: absolute;
  top: 20px;
  left: 19px;
  width: 150px;
  height: 112px;
}
.container4 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 188.36px;
  height: 188px;
}
.content11 {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0.36px;
}
.content12 {
  width: 188px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 134px;
  left: 0px;
}
.text7 {
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.content13 {
  position: absolute;
  top: 20px;
  left: 19px;
  width: 150px;
  height: 112px;
}
.container5 {
  position: absolute;
  top: 215px;
  left: 426px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 188px;
  height: 188px;
}
.main3 {
  position: relative;
  width: 188px;
  height: 188px;
}
.section2 {
  width: 188px;
  background-color: rgba(244, 244, 244, 1);
  border-radius: 38px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
  min-height: 188px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image16 {
  width: 188px;
  height: 188px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text8 {
  position: absolute;
  top: 73px;
  left: 17px;
  opacity: 0.5;
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 34px;
  font-weight: 500;
}
.text8__seg0 {
  font-size: 22px;
}
.text9 {
  position: absolute;
  top: 82px;
  left: 80px;
  opacity: 0.5;
  font-family: "Source Han Sans CN";
  font-size: 30.41px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 47px;
  font-weight: 500;
}
.text9__seg0 {
  font-size: 30.41px;
}
`,w$=`.page {
  width: 615.08px;
  height: 613px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.wrap,
.wrap1,
.wrap2 {
  width: 615.08px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.wrap1,
.wrap2 {
  margin-top: 24px;
}

.prizeCard {
  position: relative;
  width: 188px;
  height: 188px;
  margin-right: 24px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(244, 244, 244, 1);
}

.prizeCard:nth-child(3) {
  margin-right: 0;
}

.prizeImage {
  width: 150px;
  height: 112px;
  position: absolute;
  top: 20px;
  left: 19px;
  display: block;
  object-fit: contain;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.trafficCouponPrize {
  position: absolute;
  top: 20px;
  left: 19px;
  width: 150px;
  height: 112px;
}

.pointsPrizeImage {
  transform: translateX(6px);
}

.prizeName {
  position: absolute;
  top: 134px;
  left: 0px;
  width: 188px;
  min-height: 34px;
  padding: 0 8px;
  overflow: visible;
  text-overflow: clip;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.prizeNameRecommend {
  letter-spacing: -0.1em !important;
  white-space: nowrap !important;
  word-break: keep-all !important;
  flex-wrap: nowrap !important;
}

.container4 {
  width: 187px;
  height: 189px;
  border-radius: 40px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--lottery-registered-button-gradient-start, #FF1473) 0%,
    var(--lottery-registered-button-gradient-end, #FF229F) 100%
  );
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 24px;
}

.text4 {
  width: 103px;
  font-family: MFYuanHeiNoncommercial;
  font-size: 102px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
`,v$=`.page {
  width: 626px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.container {
  width: 198px;
  height: 208px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 238, 243, 1) 0%,
    rgba(255, 238, 243, 0) 100%
  );
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.text {
  margin-bottom: 8px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.textCompact {
  letter-spacing: -2.8px;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.main {
  position: relative;
  width: 145.69px;
  height: 112.67px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image {
  display: block;
  max-width: 145.69px;
  max-height: 112.67px;
  width: auto;
  height: auto;
  object-fit: contain;
  transform: scale(1.14);
  transform-origin: center;
}
.trafficCouponPrize {
  width: 145.69px;
  height: 107.62px;
  transform: scale(1.14);
  transform-origin: center;
}
.text1 {
  position: absolute;
  top: 52.91px;
  left: 25.92px;
  transform: rotate(12.803485594259467deg);
  font-family: "MFBenHeiNoncommercial";
  font-size: 35.04px;
  white-space: nowrap;
  color: rgba(255, 97, 165, 1);
  line-height: 38.22px;
  font-weight: 400;
}
.text1__seg0 {
  font-size: 35.04px;
}
.image1 {
  width: 89.65px;
  height: 25.89px;
}
.wrap1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
}
.container1 {
  width: 198px;
  height: 208px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 238, 243, 1) 0%,
    rgba(255, 238, 243, 0) 100%
  );
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.text2 {
  margin-bottom: 11px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 11px;
}
.main1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145.69px;
  height: 112.67px;
}
.image2 {
  display: block;
  max-width: 145.69px;
  max-height: 112.67px;
  width: auto;
  height: auto;
  object-fit: contain;
  transform: scale(1.14);
  transform-origin: center;
}
.image3 {
  width: 89.65px;
  height: 25.89px;
}
.wrap2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
}
.container2 {
  width: 198px;
  height: 208px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 238, 243, 1) 0%,
    rgba(255, 238, 243, 0) 100%
  );
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.text3 {
  margin-bottom: 8px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.content2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.main2 {
  position: relative;
  width: 145.69px;
  height: 112.67px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image4 {
  display: block;
  max-width: 145.69px;
  max-height: 112.67px;
  width: auto;
  height: auto;
  object-fit: contain;
  transform: scale(1.14);
  transform-origin: center;
}
.text4 {
  position: absolute;
  top: 32.71px;
  left: 56.1px;
  transform: rotate(13.240536145650218deg);
  font-family: "Douyin Sans";
  font-size: 38.44px;
  white-space: nowrap;
  color: rgba(255, 149, 0, 1);
  line-height: 100%;
  letter-spacing: -1.8px;
  font-weight: 400;
}
.text4__seg0 {
  font-size: 38.44px;
  letter-spacing: -1.8px;
}
.image5 {
  width: 19.65px;
  height: 71.09px;
  position: absolute;
  top: 8.67px;
  left: 24.85px;
}
.image6 {
  width: 89.65px;
  height: 25.89px;
}
`,S$=`.page {
  width: 608px;
  height: 114px;
  border-radius: 32px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 367px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1px;
}
.text {
  margin-bottom: -1px;
  width: 344.21px;
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
}
.text__seg1 {
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
}
.text__seg2 {
  color: rgba(77, 77, 77, 1);
}
.text1 {
  width: 367px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(77, 77, 77, 1);
  line-height: 36px;
  font-weight: 400;
}
.wrap1 {
  width: 228px;
  height: 92px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  height: 92px;
  border-radius: 111px;
  box-sizing: border-box;
  padding: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 700;
}
`,T$=`.page {
  width: 608px;
  height: 114px;
  border-radius: 32px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  width: 367px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1px;
}
.text {
  margin-bottom: -1px;
  width: 344.21px;
  font-family: "Source Han Sans CN";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
}
.text__seg1 {
  font-weight: 400;
  color: rgba(77, 77, 77, 1);
}
.text__seg2 {
  color: rgba(77, 77, 77, 1);
}
.text1 {
  width: 367px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(77, 77, 77, 1);
  line-height: 36px;
  font-weight: 400;
}
.wrap1 {
  width: 228px;
  height: 92px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 92px;
  border-radius: 111px;
  box-sizing: border-box;
  padding: 0 50px;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  font-weight: 700;
}
`,$$=`.page {
  width: 629.21px;
  height: 40px;
  border-radius: 999px;
  box-sizing: border-box;
  background: rgba(255, 244, 246, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.image {
  width: 33.36px;
  height: 29.65px;
  margin-left: 15px;
}
.image svg {
  display: block;
  width: 33.36px;
  height: 29.65px;
}
.wrap {
  width: 567.86px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 13px;
}
.text {
  width: 361px;
  height: 40px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 98, 160, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
`,C$=`.page {
  position: relative;
  width: 664px;
  height: 744px;
}
.wrap {
  width: 664px;
  border-radius: 70px;
  border-width: 2px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 744px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text {
  position: absolute;
  top: 506.34px;
  left: 206px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  text-align: center;
  color: rgba(56, 10, 19, 1);
  line-height: 138.67%;
  font-weight: 700;
}
.image {
  width: 411px;
  height: 411px;
  position: absolute;
  top: 85px;
  left: 126px;
}
`,I$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
}
.image {
  width: 159.78px;
  height: 162px;
  margin-right: 4px;
}
.text {
  width: 452px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
}
.text__seg1 {
  color: rgba(255, 98, 160, 1);
}
.text__seg3 {
  color: rgba(255, 98, 160, 1);
}
.text__seg5 {
  color: rgba(255, 98, 160, 1);
}
.wrap1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 622px;
  height: 129px;
}
.container {
  position: relative;
  width: 198px;
  height: 129px;
}
.content {
  width: 198px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 229, 239, 1) 0%,
    rgba(255, 244, 248, 1) 100%
  );
  min-height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 198px;
  height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content1 {
  position: absolute;
  top: 19px;
  left: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 144px;
  height: 84px;
}
.text1 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 98, 161, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text2 {
  margin-top: 6px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(166, 134, 147, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.container1 {
  margin-left: 14px;
  position: relative;
  width: 198px;
  height: 129px;
}
.content2 {
  width: 198px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 229, 239, 1) 0%,
    rgba(255, 244, 248, 1) 100%
  );
  min-height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image2 {
  width: 198px;
  height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content3 {
  position: absolute;
  top: 19px;
  left: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 84px;
}
.text3 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 98, 161, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text4 {
  margin-top: 6px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(166, 134, 147, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.container2 {
  margin-left: 14px;
  position: relative;
  width: 198px;
  height: 129px;
}
.content4 {
  width: 198px;
  border-radius: 32px;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    rgba(255, 229, 239, 1) 0%,
    rgba(255, 244, 248, 1) 100%
  );
  min-height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image3 {
  width: 198px;
  height: 129px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content5 {
  position: absolute;
  top: 19px;
  left: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 144px;
  height: 84px;
}
.text5 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(255, 98, 161, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.text6 {
  margin-top: 6px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(166, 134, 147, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
`,k$=`.text {
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
}
`,P$=`.page {
  width: 620px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.wrap {
  margin-right: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 295px;
  height: 50px;
}

.container {
  width: 295px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.content {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  overflow: visible;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.iconWrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.iconWrapper svg {
  width: 50px;
  height: 50px;
  display: block;
}

.main {
  display: none;
}

.content1 {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  box-sizing: border-box;
}

.text {
  font-family: "MFBenHeiNoncommercial";
  font-size: 36px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  font-weight: 400;
  letter-spacing: 0;
}

.wrap1 {
  width: 252.11px;
  height: 46px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
}

.text1 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  width: 198px;
  text-align: right;
  color: rgba(38, 38, 38, 1);
  line-height: 46px;
  font-weight: 700;
  letter-spacing: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.text1__listwrap {
  width: 198px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text2 {
  font-family: "Douyin Number ABC";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(38, 38, 38, 1);
  line-height: 46px;
  font-weight: 500;
  letter-spacing: 0;
  margin-left: 6px;
  min-width: 18px;
  text-align: left;
  transform: translate(-14px, 2px);
}
`,z$=`.page {
  width: 640.13px;
  height: 50.09px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-left: 12px;
}
.container {
  width: 620px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
.content {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
}
.section {
  position: relative;
  width: 50px;
  height: 50px;
}
.image {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 36.61px;
  height: 17.27px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image2 {
  width: 13px;
  height: 13px;
  position: absolute;
  top: 11.46px;
  left: 11.8px;
}
.content1 {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.text {
  height: 40px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 36px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: 40px;
  font-weight: 400;
  -webkit-text-stroke: 0;
  text-shadow: none;
  paint-order: normal;
  display: inline-flex;
  align-items: center;
}

.douyinNumber {
  font-family: "Douyin Number ABC", "MFBenHeiNoncommercial";
  font-size: 50px;
  font-weight: 800;
  margin-inline: 9px;
}

.douyinSans {
  font-family: "Douyin Sans", "MFBenHeiNoncommercial";
  font-size: 42px;
  font-weight: 900;
  margin-inline: 9px;
  -webkit-text-stroke: 1px currentColor;
  paint-order: stroke fill;
}
`,F$=`.page {
  width: 618px;
  height: 74px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 618px;
  height: 74px;
}
.container {
  width: 618px;
  border-radius: 32px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  min-height: 74px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 3.64px;
  height: 57.31px;
  position: absolute;
  top: 8px;
  left: 382px;
}
.container1 {
  width: 171px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 19.4px;
  left: 402px;
}
.text {
  margin-right: 10px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.text1 {
  font-family: "Douyin Number ABC";
  font-size: 40px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: 32px;
  font-weight: 500;
}
.wrap1 {
  width: 310px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 45px;
}
.text2 {
  margin-right: 10px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.text3 {
  width: 110px;
  flex: 0 0 110px;
  margin-right: 10px;
  font-family: "Douyin Number ABC";
  font-size: 40px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: 32px;
  font-weight: 500;
}
.text4 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
`,N$=`.page {
  width: 626px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 626px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 32px 20px;
}
.container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text {
  margin-bottom: 16px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text1 {
  width: 100%;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
`,E$=`.page {
  width: 626px;
  min-height: 484px;
  padding-bottom: 32px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 32px;
}
.text {
  margin-bottom: 16px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text1 {
  width: 534.02px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 150%;
  letter-spacing: -2px;
  font-weight: 400;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
.text1__seg0 {
  letter-spacing: -2px;
}
.text1__seg1 {
  color: rgba(255, 27, 119, 1);
  letter-spacing: -2px;
}
.text1__seg2 {
  letter-spacing: -2px;
}
.text1__seg3 {
  color: rgba(255, 27, 119, 1);
  letter-spacing: -2px;
}
.text1__seg4 {
  letter-spacing: -2px;
}
.text1Highlight {
  color: rgba(255, 27, 119, 1);
  letter-spacing: -2px;
}
.image {
  width: 542.43px;
  height: 4px;
  margin-top: 24px;
}
.wrap1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
}
.text2 {
  margin-bottom: 16px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text3 {
  width: 534.02px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 150%;
  letter-spacing: -0.02em;
  font-weight: 400;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
.text3__seg1 {
  font-weight: 500;
  color: rgba(255, 27, 119, 1);
}
.text3Highlight {
  font-weight: 500;
  color: rgba(255, 27, 119, 1);
}
`,_$=`.page {
  width: 633.59px;
  height: 517px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.text {
  width: 633.59px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 160%;
  font-weight: 400;
  flex-shrink: 0;
}
.text__seg0 {
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.text__seg1 {
  color: rgba(51, 51, 51, 1);
}
.text__seg2 {
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}
.text__seg3 {
  color: rgba(51, 51, 51, 1);
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
}
.text1 {
  margin-bottom: 8px;
  width: 633.59px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.container {
  width: 626px;
  border-radius: var(var(--promo-radius-m), 40px);
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 8px;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text2 {
  margin-bottom: 16px;
  width: 584.29px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 36px;
  font-weight: 400;
}
.text3 {
  width: 584.29px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(45, 45, 45, 1);
  line-height: 160%;
  font-weight: 400;
}
.text3__seg1 {
  font-weight: 700;
}
.text4 {
  width: 584.29px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  text-align: justify;
  color: rgba(129, 129, 129, 1);
  line-height: normal;
  font-weight: 400;
}
`,B$=`.page {
  width: 626px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #2d2d2d;
}

.title {
  min-height: 34px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.body {
  width: 626px;
  margin-top: 26px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  text-align: justify;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.ladder {
  width: 626px;
  height: 111px;
  margin-top: 14px;
  padding: 0 40px;
  border-radius: 20px;
  box-sizing: border-box;
  background: #f7f7fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.rewardRow {
  width: 436px;
  min-height: 36px;
  margin-top: 21px;
  margin-left: 101px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rewardTag {
  position: relative;
  width: 76px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--consumption-ladder-accent-start, #ff1473),
    var(--consumption-ladder-accent-end, #ff229f)
  );
  font-family: "Douyin Sans";
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.rewardTag::after {
  position: absolute;
  bottom: -5px;
  left: calc(50% - 5px);
  width: 0;
  height: 0;
  border-top: 6px solid var(--consumption-ladder-accent-end, #ff229f);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: "";
}

.progressRow {
  width: 546px;
  height: 36px;
  margin-top: 6px;
  display: flex;
  align-items: center;
}

.consumeLabel {
  width: 94px;
  height: 36px;
  flex: 0 0 94px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  line-height: 36px;
  font-weight: 700;
  white-space: nowrap;
}

.progress {
  position: relative;
  width: 419px;
  height: 36px;
  flex: 0 0 419px;
  margin-left: 21px;
}

.amounts {
  position: relative;
  z-index: 1;
  width: 419px;
  height: 36px;
}

.amount {
  position: absolute;
  top: 0;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  white-space: nowrap;
}

.amount:nth-child(1) {
  left: 0;
}

.amount:nth-child(2) {
  left: 114px;
}

.amount:nth-child(3) {
  left: 229px;
}

.amount:nth-child(4) {
  right: 0;
}

.track {
  position: absolute;
  z-index: 0;
  top: 16px;
  left: 59px;
  width: 290px;
  height: 4px;
}

.segment {
  position: absolute;
  top: 0;
  width: 50px;
  height: 4px;
  border-radius: 4px;
  background: #ebeded;
}

.segment:nth-child(1) {
  left: 0;
}

.segment:nth-child(2) {
  left: 114px;
}

.segment:nth-child(3) {
  left: 240px;
}

.footnote {
  width: 584px;
  min-height: 36px;
  margin: 20px 21px 0;
  box-sizing: border-box;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  text-align: center;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
`,A$=`.page {
  width: 596px;
  min-height: 156px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 596px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.container {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 571px;
  min-height: 108px;
}
.text {
  width: 571px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
  overflow-wrap: anywhere;
}
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 571px;
  min-height: 36px;
}
.text1 {
  width: 571px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: normal;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 149.24%;
  font-weight: 400;
  flex-shrink: 0;
  overflow-wrap: anywhere;
}
.boldText,
.text1__seg0 {
  color: rgba(45, 45, 45, 1);
}
.boldText,
.text1__seg1 {
  font-weight: 700;
  color: rgba(45, 45, 45, 1);
}
.text1__seg2 {
  color: rgba(45, 45, 45, 1);
}
`,M$=`.page {
  width: 596px;
  min-height: 716px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  width: 596px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}
.content {
  margin-right: 8px;
  position: relative;
  width: 33.95px;
  height: 30.09px;
}
.image {
  width: 33.95px;
  height: 30.09px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 10.64px;
  height: 17.7px;
  position: absolute;
  top: 6.11px;
  left: 11.59px;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text1 {
  width: 596px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  letter-spacing: normal;
  font-weight: 400;
  overflow-wrap: anywhere;
}
.boldText,
.text1__seg2 {
  font-weight: 700;
}
.wrap1 {
  width: 596px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 32px;
}
.container1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}
.content1 {
  margin-right: 8px;
  position: relative;
  width: 33.49px;
  height: 29.77px;
}
.image2 {
  width: 33.49px;
  height: 29.77px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image3 {
  width: 11.29px;
  height: 11.29px;
  position: absolute;
  top: 4.78px;
  left: 11.1px;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text3 {
  width: 596px;
  min-height: 144px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: flex-start;
  overflow-wrap: anywhere;
}
.wrap2 {
  width: 596px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 32px;
}
.container2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
}
.content2 {
  margin-right: 8px;
  position: relative;
  width: 33.1px;
  height: 33.1px;
}
.image4 {
  width: 33.1px;
  height: 33.1px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image5 {
  width: 11.79px;
  height: 12.93px;
  position: absolute;
  top: 8.37px;
  left: 12.94px;
}
.text4 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
}
.text5 {
  width: 596px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 138%;
  font-weight: 400;
  overflow-wrap: anywhere;
}
.boldText,
.text5__seg1 {
  font-weight: 700;
}
`,j$=`.page {
  width: 603px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.text {
  width: 603px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: normal;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 603px;
}
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 603px;
}
.image {
  width: 13px;
  height: 13px;
  margin-top: 12px;
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}
.text1 {
  margin-left: 12px;
  width: 578px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  letter-spacing: -0.02em;
  font-weight: 400;
  flex-shrink: 0;
  overflow-wrap: anywhere;
}
.highlightText,
.text1__seg1 {
  font-weight: 700;
  color: rgba(255, 19, 114, 1);
}
.container2 {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 603px;
}
.image2 {
  width: 13px;
  height: 13px;
  margin-top: 12px;
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}
.text3 {
  margin-left: 12px;
  width: 578px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
  overflow-wrap: anywhere;
}
.container1 {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 596px;
}
.image1 {
  width: 13px;
  height: 13px;
  margin-top: 12.97px;
  display: inline-block;
  border-radius: 50%;
  flex-shrink: 0;
}
.text2 {
  margin-left: 12px;
  width: 571px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: normal;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
  overflow-wrap: anywhere;
}
`,R$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: -20px;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;
}
.container {
  height: 60px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    148deg,
    rgba(199, 232, 255, 1) -78.03999999999999%,
    rgba(255, 255, 255, 1) 170.08%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 32px;
  padding-left: 32px;
  margin-bottom: 16px;
}
.content {
  margin-right: 7px;
  position: relative;
  width: 34.2px;
  height: 29.92px;
}
.image {
  width: 34.2px;
  height: 29.92px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 14.96px;
  height: 16.54px;
  position: absolute;
  top: 7.13px;
  left: 9.97px;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(24, 136, 255, 1);
  line-height: normal;
  font-weight: 700;
}
.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610px;
}
.text1 {
  width: 610px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.image2 {
  width: 542.43px;
  height: 4px;
  margin-bottom: 24px;
}
.wrap1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;
}
.container2 {
  height: 60px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    144deg,
    rgba(199, 232, 255, 1) -70.99%,
    rgba(255, 255, 255, 1) 147.82999999999998%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 32px;
  padding-left: 32px;
  margin-bottom: 16px;
}
.content1 {
  margin-right: 7px;
  position: relative;
  width: 34.2px;
  height: 29.92px;
}
.image3 {
  width: 34.2px;
  height: 29.92px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image4 {
  width: 14.96px;
  height: 16.54px;
  position: absolute;
  top: 7.13px;
  left: 9.97px;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(24, 136, 255, 1);
  line-height: normal;
  font-weight: 700;
}
.container3 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610px;
}
.text3 {
  width: 610px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.image5 {
  width: 542.43px;
  height: 4px;
  margin-bottom: 24px;
}
.wrap2 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 24px;
}
.container4 {
  height: 60px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    140deg,
    rgba(199, 232, 255, 1) -64.64999999999999%,
    rgba(255, 255, 255, 1) 128.6%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 32px;
  padding-left: 32px;
  margin-bottom: 16px;
}
.content2 {
  margin-right: 7px;
  position: relative;
  width: 34.2px;
  height: 29.92px;
}
.image6 {
  width: 34.2px;
  height: 29.92px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image7 {
  width: 14.96px;
  height: 16.54px;
  position: absolute;
  top: 7.13px;
  left: 9.97px;
}
.text4 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(24, 136, 255, 1);
  line-height: normal;
  font-weight: 700;
}
.container5 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610px;
}
.text5 {
  width: 610px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
.image8 {
  width: 542.43px;
  height: 4px;
  margin-bottom: 24px;
}
.wrap3 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.container6 {
  height: 60px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    142deg,
    rgba(199, 232, 255, 1) -67.32000000000001%,
    rgba(255, 255, 255, 1) 136.5%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-right: 32px;
  padding-left: 32px;
  margin-bottom: 16px;
}
.content3 {
  margin-right: 7px;
  position: relative;
  width: 34.2px;
  height: 29.92px;
}
.image9 {
  width: 34.2px;
  height: 29.92px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image10 {
  width: 14.96px;
  height: 16.54px;
  position: absolute;
  top: 7.13px;
  left: 9.97px;
}
.text6 {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  color: rgba(24, 136, 255, 1);
  line-height: normal;
  font-weight: 700;
}
.container7 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610px;
}
.text7 {
  width: 610px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
`,H$=`.page {
  position: relative;
  width: 626px;
  height: 155px;
}
.image {
  width: 626px;
  height: 138px;
  position: absolute;
  top: 17px;
  left: 0px;
}
.text {
  position: absolute;
  top: 71.5px;
  left: 138px;
  font-family: "MFBenHeiNoncommercial";
  font-size: 36px;
  white-space: nowrap;
  color: rgba(114, 13, 56, 1);
  line-height: 40px;
  font-weight: 400;
}
.textUnit {
  font-weight: 400;
}
.textLabel {
  font-weight: 400;
}
.text1 {
  position: absolute;
  top: 60px;
  left: 50px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  color: rgba(114, 13, 56, 1);
  line-height: normal;
  font-weight: 800;
}
.image1 {
  width: 181px;
  height: 155px;
  position: absolute;
  top: 0px;
  left: 410px;
}
`,D$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  width: 600px;
  height: 286.2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 46px;
  overflow: hidden;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 16px;
}
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.section {
  width: 162.49px;
  height: 192.2px;
  box-sizing: border-box;
  margin-right: 48px;
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.subSection {
  width: 161.6px;
  box-sizing: border-box;
  min-height: 52.72px;
  display: flex;
  height: 52.72px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 126.64px;
  left: 0.4px;
}
.image {
  width: 161.71px;
  height: 191.66px;
  position: absolute;
  top: 0px;
  left: 0.79px;
}
.subSection1 {
  position: absolute;
  top: 102.63px;
  left: 0.74px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161.6px;
  height: 40.41px;
}
.image1 {
  width: 161.6px;
  height: 40.41px;
}
.subSection2 {
  width: 161.6px;
  height: 27.85px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 74.78px;
  left: 0.74px;
}
.text {
  width: 139px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.subSection3 {
  width: 161.6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32.89px;
  left: 0.74px;
}
.text1 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  font-weight: 800;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  font-weight: 700;
}
.subSection4 {
  width: 136px;
  height: 56px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(255, 94, 164, 1);
  position: absolute;
  top: 116.6px;
  left: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text3 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 158, 202, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.section1 {
  width: 162.49px;
  height: 192.2px;
  box-sizing: border-box;
  margin-right: 48px;
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.subSection5 {
  width: 161.6px;
  box-sizing: border-box;
  min-height: 52.72px;
  display: flex;
  height: 52.72px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 126.64px;
  left: 0.4px;
}
.image2 {
  width: 161.71px;
  height: 191.66px;
  position: absolute;
  top: 0px;
  left: 0.79px;
}
.subSection6 {
  position: absolute;
  top: 102.63px;
  left: 0.74px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161.6px;
  height: 40.41px;
}
.image3 {
  width: 161.6px;
  height: 40.41px;
}
.subSection7 {
  width: 161.6px;
  height: 27.85px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 74.78px;
  left: 0.74px;
}
.text4 {
  width: 139px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.subSection8 {
  width: 161.6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32.89px;
  left: 0.74px;
}
.text5 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  font-weight: 800;
}
.text6 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  font-weight: 700;
}
.subSection9 {
  width: 136px;
  height: 56px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(255, 94, 164, 1);
  position: absolute;
  top: 116.6px;
  left: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text7 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 158, 202, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.section2 {
  width: 162.49px;
  height: 192.2px;
  box-sizing: border-box;
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.subSection10 {
  width: 161.6px;
  box-sizing: border-box;
  min-height: 52.72px;
  display: flex;
  height: 52.72px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 126.64px;
  left: 0.4px;
}
.image4 {
  width: 161.71px;
  height: 191.66px;
  position: absolute;
  top: 0px;
  left: 0.79px;
}
.subSection11 {
  position: absolute;
  top: 102.63px;
  left: 0.74px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161.6px;
  height: 40.41px;
}
.image5 {
  width: 161.6px;
  height: 40.41px;
}
.subSection12 {
  width: 161.6px;
  height: 27.85px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 74.78px;
  left: 0.74px;
}
.text8 {
  width: 139px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.subSection13 {
  width: 161.6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32.89px;
  left: 0.74px;
}
.text9 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  font-weight: 800;
}
.text10 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  font-weight: 700;
}
.subSection14 {
  width: 136px;
  height: 56px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(255, 94, 164, 1);
  position: absolute;
  top: 116.6px;
  left: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text11 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 158, 202, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.content1 {
  width: 600px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main1 {
  position: relative;
  width: 600px;
  height: 24px;
}
.section3 {
  width: 600px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(240, 240, 240, 1);
  min-height: 12px;
  position: absolute;
  top: 6px;
  left: 0px;
}
.image6 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 288px;
}
.image7 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 499.7px;
}
.image8 {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0px;
  left: 76px;
}
.container1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
}
.text12 {
  margin-right: 88px;
  transform: rotate(-6.909522671007686e-15deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
.text13 {
  margin-right: 88px;
  transform: rotate(-6.909522671007686e-15deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
.text14 {
  transform: rotate(-6.909522671007686e-15deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
`,L$=`.page {
  width: 604.09px;
  height: 235px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.container {
  width: 604.09px;
  height: 153px;
  box-sizing: border-box;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;
}
.slot {
  width: 130px;
  height: 152px;
  margin-right: 28px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
}
.lastSlot {
  margin-right: 0;
}
.slot .main,
.slot .main1,
.slot .main2,
.slot .main3 {
  margin-right: 0;
}
.main {
  margin-right: 28px;
  position: relative;
  width: 130px;
  height: 127.32px;
}
.image {
  width: 130px;
  height: 127.32px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 130px;
  height: 127.32px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image svg,
.image1 svg,
.image2 svg,
.image3 svg,
.image4 svg,
.image5 svg,
.image7 svg,
.image8 svg,
.image9 svg,
.image10 svg,
.image12 svg,
.image13 svg,
.image14 svg,
.image15 svg {
  display: block;
  width: 100%;
  height: 100%;
}
.section {
  position: absolute;
  top: 57.67px;
  left: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 32px;
}
.text {
  font-family: "Douyin Sans";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 400;
  flex-shrink: 0;
}
.main1 {
  width: 130px;
  height: 152px;
  overflow: hidden;
  box-sizing: border-box;
  margin-right: 28px;
  position: relative;
}
.section1 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 130px;
  height: 152px;
}
.image2 {
  width: 130px;
  height: 127.05px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subSection {
  position: absolute;
  top: 5.57px;
  left: 5.53px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 118.9px;
  height: 115.26px;
}
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 118.9px;
  height: 115.26px;
}
.subBlock {
  width: 118.9px;
  border-radius: 31.82px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 115.25px;
}
.image3 {
  width: 130px;
  height: 78.39px;
  position: absolute;
  top: 73.61px;
  left: 0px;
}
.section2 {
  position: absolute;
  top: 64px;
  left: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 36px;
}
.subSection1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.text1 {
  margin-right: 2px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 42px;
  white-space: nowrap;
  text-align: right;
  color: rgba(255, 19, 114, 1);
  line-height: 35.92px;
  font-weight: 800;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 800;
}
.text3 {
  position: absolute;
  top: 17px;
  left: 32px;
  font-family: "Douyin Sans";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 98, 160, 1);
  line-height: normal;
  font-weight: 400;
}
.section3 {
  position: absolute;
  top: 43px;
  left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 14px;
}
.image4 {
  width: 7px;
  height: 14px;
}
.image6 {
  width: 86px;
  height: 3px;
  margin-top: 5px;
  margin-left: 10px;
}
.image5 {
  width: 7px;
  height: 14px;
  margin-left: 10px;
}
.main2 {
  width: 130px;
  height: 152px;
  overflow: hidden;
  box-sizing: border-box;
  margin-right: 28px;
  position: relative;
}
.section4 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 130px;
  height: 152px;
}
.image7 {
  width: 130px;
  height: 127.05px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subSection2 {
  position: absolute;
  top: 5.57px;
  left: 5.53px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 118.9px;
  height: 115.26px;
}
.block1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 118.9px;
  height: 115.26px;
}
.subBlock1 {
  width: 118.9px;
  border-radius: 31.82px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 115.25px;
}
.image8 {
  width: 130px;
  height: 78.39px;
  position: absolute;
  top: 73.61px;
  left: 0px;
}
.section5 {
  position: absolute;
  top: 64px;
  left: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 36px;
}
.subSection3 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.text4 {
  margin-right: 2px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 42px;
  white-space: nowrap;
  text-align: right;
  color: rgba(255, 19, 114, 1);
  line-height: 35.92px;
  font-weight: 800;
}
.text5 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
}
.text6 {
  position: absolute;
  top: 17px;
  left: 32px;
  font-family: "Douyin Sans";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 98, 160, 1);
  line-height: normal;
  font-weight: 400;
}
.section6 {
  position: absolute;
  top: 43px;
  left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 14px;
}
.image9 {
  width: 7px;
  height: 14px;
}
.image11 {
  width: 86px;
  height: 3px;
  margin-top: 5px;
  margin-left: 10px;
}
.image10 {
  width: 7px;
  height: 14px;
  margin-left: 10px;
}
.main3 {
  width: 130px;
  height: 152px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.section7 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 130px;
  height: 152px;
}
.image12 {
  width: 130px;
  height: 127.05px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subSection4 {
  position: absolute;
  top: 5.57px;
  left: 5.53px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 118.9px;
  height: 115.26px;
}
.block2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 118.9px;
  height: 115.26px;
}
.subBlock2 {
  width: 118.9px;
  border-radius: 31.82px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 115.25px;
}
.image13 {
  width: 130px;
  height: 78.39px;
  position: absolute;
  top: 73.61px;
  left: 0px;
}
.section8 {
  position: absolute;
  top: 64px;
  left: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 36px;
}
.subSection5 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.text7 {
  margin-right: 2px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 42px;
  white-space: nowrap;
  text-align: right;
  color: rgba(255, 19, 114, 1);
  line-height: 35.92px;
  font-weight: 800;
}
.text8 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
}
.text9 {
  position: absolute;
  top: 17px;
  left: 32px;
  font-family: "Douyin Sans";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 98, 160, 1);
  line-height: normal;
  font-weight: 400;
}
.section9 {
  position: absolute;
  top: 43px;
  left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 120px;
  height: 14px;
}
.image14 {
  width: 7px;
  height: 14px;
}
.image16 {
  width: 86px;
  height: 3px;
  margin-top: 5px;
  margin-left: 10px;
}
.image15 {
  width: 7px;
  height: 14px;
  margin-left: 10px;
}
.container1 {
  width: 600px;
  height: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content1 {
  position: relative;
  width: 600px;
  height: 24px;
}
.main4 {
  width: 600px;
  border-radius: 999px;
  box-sizing: border-box;
  background: #ffdbdb;
  min-height: 12px;
  position: absolute;
  top: 6px;
  left: 0px;
}
.main5 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 51px;
}
.image17 {
  width: 24px;
  height: 24px;
  margin-right: 134px;
}
.image18 {
  width: 24px;
  height: 24px;
  margin-right: 134px;
}
.image19 {
  width: 24px;
  height: 24px;
  margin-right: 134px;
}
.image20 {
  width: 24px;
  height: 24px;
}
.wrap1 {
  width: 604px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 130px);
  column-gap: 28px;
  align-items: flex-start;
  margin-top: 20px;
}
.text10,
.text11,
.text12,
.text13 {
  width: 130px;
  display: grid;
  grid-template-columns: 48px 50px 24px;
  column-gap: 4px;
  align-items: center;
  transform: rotate(-6.909522671007686e-15deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(129, 129, 129, 1);
  line-height: 30px;
  font-weight: 400;
}
.consumePrefix,
.consumeAmount,
.consumeUnit {
  display: block;
  min-width: 0;
  text-align: center;
}
.consumeAmount {
  font-family: "Source Han Sans CN Medium";
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: #2d2d2d;
}
`,G$=`.page {
  width: 162px;
  height: 192px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 162px;
  height: 192px;
}
.image {
  width: 162px;
  height: 192px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.container {
  position: absolute;
  top: 6.96px;
  left: 0.37px;
  width: 161.6px;
  height: 144.11px;
}
.content {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 161.6px;
  height: 144.11px;
}
.main {
  width: 148.17px;
  border-radius: var(var(--promo-radius-m), 40px);
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 144.11px;
  position: absolute;
  top: 0px;
  left: 6.52px;
}
.image1 {
  width: 13.88px;
  height: 13.88px;
  position: absolute;
  top: 62.15px;
  left: 147.72px;
}
.image2 {
  width: 13.88px;
  height: 13.88px;
  position: absolute;
  top: 61.91px;
  left: 0px;
}
.image3 {
  width: 148.12px;
  height: 144.11px;
  position: absolute;
  top: 0px;
  left: 6.57px;
}
.image4 {
  width: 162px;
  height: 121.97px;
  position: absolute;
  top: 70.03px;
  left: 0px;
}
.wrap1 {
  width: 161.6px;
  height: 52.72px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 126.45px;
  left: 0.4px;
}
.text {
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.wrap2 {
  width: 161.6px;
  height: 41.78px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 54.82px;
  left: 0.4px;
}
.text1 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 42px;
  font-weight: 600;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 38px;
  font-weight: 700;
}
`,O$=`.page {
  width: 162px;
  height: 192px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 162px;
  height: 192px;
}
.image {
  width: 162px;
  height: 192px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.container {
  position: absolute;
  top: 6.96px;
  left: 0.37px;
  width: 161.6px;
  height: 144.11px;
}
.content {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 161.6px;
  height: 144.11px;
}
.main {
  width: 148.17px;
  border-radius: var(--promo-radius-m, 40px);
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  min-height: 144.11px;
  position: absolute;
  top: 0px;
  left: 6.52px;
}
.image1 {
  width: 13.88px;
  height: 13.88px;
  position: absolute;
  top: 62.15px;
  left: 147.72px;
}
.image2 {
  width: 13.88px;
  height: 13.88px;
  position: absolute;
  top: 61.91px;
  left: 0px;
}
.image3 {
  width: 148.12px;
  height: 144.11px;
  position: absolute;
  top: 0px;
  left: 6.57px;
}
.image4 {
  width: 162px;
  height: 121.97px;
  position: absolute;
  top: 70.03px;
  left: 0px;
}
.wrap1 {
  width: 161.6px;
  height: 52.72px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 126.45px;
  left: 0.4px;
}
.text {
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.wrap2 {
  width: 161.6px;
  height: 41.78px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 54.82px;
  left: 0.4px;
}
.text1 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 42px;
  font-weight: 800;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 38px;
  font-weight: 700;
}
`,V$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  width: 600px;
  height: 192.2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 46px;
  overflow: hidden;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.main {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 600px;
}
.section {
  width: 162.49px;
  height: 192.2px;
  box-sizing: border-box;
  position: relative;
  border-radius: 46px;
  overflow: hidden;
}
.subSection {
  width: 161.6px;
  box-sizing: border-box;
  min-height: 52.72px;
  display: flex;
  height: 52.72px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 126.64px;
  left: 0.4px;
}
.subSection1 {
  position: absolute;
  top: 102.63px;
  left: 0.74px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161.6px;
  height: 40.41px;
}
.subSection2 {
  width: 161.6px;
  height: 27.85px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 74.78px;
  left: 0.74px;
}
.text {
  width: 139px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 217, 229, 1);
  line-height: normal;
  font-weight: 400;
}
.subSection3 {
  width: 161.6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32.89px;
  left: 0.74px;
}
.text1 {
  margin-right: 4px;
  font-family: "Douyin Number ABC";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  font-weight: 800;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
  font-weight: 700;
}
.subSection4 {
  width: 136px;
  height: 56px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(255, 94, 164, 1);
  position: absolute;
  top: 116.6px;
  left: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text3 {
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 158, 202, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
`,U$=`.image {
  width: 750px;
  height: 287px;
  box-sizing: border-box;
}
`,K$=`.page {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 2680px;
  height: 643.21px;
}
.wrap1 {
  width: 640px;
  height: 637.81px;
  box-sizing: border-box;
  position: relative;
}
.container1 {
  width: 640px;
  height: 637.81px;
  border-radius: 56px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
  padding-bottom: 48px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.content1 {
  width: 551px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.main1 {
  width: 337.94px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
}
.text11 {
  margin-bottom: 4px;
  width: 337.94px;
  height: 48px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(255, 75, 140, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}
.section2 {
  height: 38.55px;
  border-radius: 87.16px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 18px;
  padding-left: 18px;
}
.text12 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(131, 97, 120, 1);
  line-height: 36px;
  font-weight: 400;
}
.section3 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.subSection4 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.block5 {
  margin-right: 8px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image6 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subBlock4 {
  position: absolute;
  top: 11.13px;
  left: 7.97px;
  width: 25.2px;
  height: 18.88px;
}
.div9 {
  width: 25.2px;
  border-radius: 4.79px;
  box-sizing: border-box;
  background: rgba(255, 75, 140, 1);
  min-height: 18.88px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image7 {
  width: 9.8px;
  height: 9.8px;
  position: absolute;
  top: 4.54px;
  left: 8.9px;
}
.text13 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 31, 84, 1);
  line-height: 36px;
  font-weight: 700;
}
.subSection5 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;
}
.block6 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.subBlock5 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 40px;
}
.div10 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text14 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 75, 140, 1);
  line-height: 36px;
  font-weight: 400;
}
.subBlock6 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 40px;
}
.div11 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text15 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 75, 140, 1);
  line-height: 36px;
  font-weight: 400;
}
.subBlock7 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 40px;
}
.div12 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text16 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 75, 140, 1);
  line-height: 36px;
  font-weight: 400;
}
.subBlock8 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div13 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text17 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 75, 140, 1);
  line-height: 36px;
  font-weight: 400;
}
.text18 {
  width: 549.36px;
  height: 36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(131, 97, 120, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.section4 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.subSection6 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.block7 {
  margin-right: 5px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image8 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.subBlock9 {
  position: absolute;
  top: 10.82px;
  left: 7.16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.77px;
  height: 22.87px;
}
.image9 {
  width: 22.77px;
  height: 22.87px;
}
.text19 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 31, 84, 1);
  line-height: 36px;
  font-weight: 700;
}
.text20 {
  width: 549.36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  color: rgba(131, 97, 120, 1);
  line-height: 36px;
  font-weight: 400;
}
.text20__seg1 {
  color: rgba(255, 75, 140, 1);
}
.text20__seg3 {
  color: rgba(255, 75, 140, 1);
}
.section5 {
  position: relative;
  width: 551px;
  height: 112px;
}
.subSection7 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 551px;
  height: 112px;
}
.block8 {
  width: 551px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(255, 239, 245, 1);
  min-height: 112px;
}
.subSection8 {
  position: absolute;
  top: 20px;
  left: 28px;
  width: 495px;
  height: 73.54px;
}
.text21 {
  position: absolute;
  top: 0px;
  left: 38.33px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 31, 84, 1);
  line-height: 36px;
  font-weight: 700;
}
.image10 {
  width: 24.83px;
  height: 27.47px;
  position: absolute;
  top: 4.27px;
  left: 0px;
}
.text22 {
  position: absolute;
  top: 37.54px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(131, 97, 120, 1);
  line-height: 36px;
  font-weight: 400;
}
.image11 {
  width: 224.73px;
  height: 211.76px;
  position: absolute;
  top: 5.39px;
  left: 398.98px;
}
.wrap2 {
  width: 640px;
  height: 637.81px;
  box-sizing: border-box;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.container2 {
  position: relative;
  width: 640px;
  height: 637.81px;
}
.content2 {
  width: 640px;
  height: 637.81px;
  border-radius: 56px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
  padding-bottom: 48px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.main3 {
  width: 551px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.section6 {
  width: 337.94px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
}
.text23 {
  margin-bottom: 4px;
  width: 337.94px;
  height: 48px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(255, 130, 40, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}
.subSection9 {
  height: 38.55px;
  border-radius: 87.16px;
  box-sizing: border-box;
  background: rgba(255, 242, 231, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 18px;
  padding-left: 18px;
}
.text24 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(139, 121, 104, 1);
  line-height: 36px;
  font-weight: 400;
}
.subSection10 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block9 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.subBlock10 {
  margin-right: 8px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image12 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div14 {
  position: absolute;
  top: 11.13px;
  left: 7.97px;
  width: 25.2px;
  height: 18.88px;
}
.div15 {
  width: 25.2px;
  border-radius: 4.79px;
  box-sizing: border-box;
  background: rgba(255, 130, 40, 1);
  min-height: 18.88px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image13 {
  width: 9.8px;
  height: 9.8px;
  position: absolute;
  top: 4.54px;
  left: 8.9px;
}
.text25 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 71, 31, 1);
  line-height: 36px;
  font-weight: 700;
}
.block10 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;
}
.subBlock11 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.div16 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div17 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 242, 231, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text26 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 130, 40, 1);
  line-height: 36px;
  font-weight: 400;
}
.div18 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div19 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 242, 231, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text27 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 130, 40, 1);
  line-height: 36px;
  font-weight: 400;
}
.div20 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 40px;
}
.div21 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(255, 242, 231, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text28 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(255, 130, 40, 1);
  line-height: 36px;
  font-weight: 400;
}
.text29 {
  width: 549.36px;
  height: 36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(139, 121, 104, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.subSection11 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block11 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.subBlock12 {
  margin-right: 5px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image14 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div22 {
  position: absolute;
  top: 10.82px;
  left: 7.16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.77px;
  height: 22.87px;
}
.image15 {
  width: 22.77px;
  height: 22.87px;
}
.text30 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 71, 31, 1);
  line-height: 36px;
  font-weight: 700;
}
.text31 {
  width: 549.36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  color: rgba(139, 121, 104, 1);
  line-height: 36px;
  font-weight: 400;
}
.text31__seg1 {
  color: rgba(255, 130, 40, 1);
}
.subSection12 {
  position: relative;
  width: 551px;
  height: 112px;
}
.block12 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 551px;
  height: 112px;
}
.subBlock13 {
  width: 551px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(255, 242, 231, 1);
  min-height: 112px;
}
.block13 {
  position: absolute;
  top: 20px;
  left: 28px;
  width: 462px;
  height: 73.54px;
}
.text32 {
  position: absolute;
  top: 0px;
  left: 38.33px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(110, 71, 31, 1);
  line-height: 36px;
  font-weight: 700;
}
.image16 {
  width: 24.83px;
  height: 27.47px;
  position: absolute;
  top: 4.27px;
  left: 0px;
}
.text33 {
  position: absolute;
  top: 37.54px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(139, 121, 104, 1);
  line-height: 36px;
  font-weight: 400;
}
.image17 {
  width: 224.73px;
  height: 211.76px;
  position: absolute;
  top: 5.39px;
  left: 398.98px;
}
.wrap {
  width: 640px;
  height: 637.81px;
  box-sizing: border-box;
  margin-left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.container {
  position: relative;
  width: 640px;
  height: 637.81px;
}
.content {
  width: 640px;
  height: 637.81px;
  border-radius: 56px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
  padding-bottom: 48px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.main {
  width: 551px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.section {
  width: 367px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
}
.text {
  margin-bottom: 4px;
  width: 337.94px;
  height: 48px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(19, 169, 64, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}
.subSection {
  height: 38.55px;
  border-radius: 87.16px;
  box-sizing: border-box;
  background: rgba(237, 252, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 18px;
  padding-left: 18px;
}
.text1 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(93, 123, 98, 1);
  line-height: 36px;
  font-weight: 400;
}
.subSection1 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.subBlock {
  margin-right: 8px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div {
  position: absolute;
  top: 11.13px;
  left: 7.97px;
  width: 25.2px;
  height: 18.88px;
}
.div1 {
  width: 25.2px;
  border-radius: 4.79px;
  box-sizing: border-box;
  background: rgba(19, 169, 64, 1);
  min-height: 18.88px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 9.8px;
  height: 9.8px;
  position: absolute;
  top: 4.54px;
  left: 8.9px;
}
.text2 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 110, 71, 1);
  line-height: 36px;
  font-weight: 700;
}
.block1 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;
}
.subBlock1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.div2 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div3 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(237, 252, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text3 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(19, 169, 64, 1);
  line-height: 36px;
  font-weight: 400;
}
.div4 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div5 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(237, 252, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text4 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(19, 169, 64, 1);
  line-height: 36px;
  font-weight: 400;
}
.div6 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div7 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(237, 252, 245, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text5 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(19, 169, 64, 1);
  line-height: 36px;
  font-weight: 400;
}
.text6 {
  width: 549.36px;
  height: 36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(93, 123, 98, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.subSection2 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block2 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.subBlock2 {
  margin-right: 5px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image2 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div8 {
  position: absolute;
  top: 10.82px;
  left: 7.16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.77px;
  height: 22.87px;
}
.image3 {
  width: 22.77px;
  height: 22.87px;
}
.text7 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 110, 71, 1);
  line-height: 36px;
  font-weight: 700;
}
.text8 {
  width: 549.36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  color: rgba(93, 123, 98, 1);
  line-height: 36px;
  font-weight: 400;
}
.text8__seg1 {
  color: rgba(19, 169, 64, 1);
}
.subSection3 {
  position: relative;
  width: 551px;
  height: 112px;
}
.block3 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 551px;
  height: 112px;
}
.subBlock3 {
  width: 551px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(237, 252, 245, 1);
  min-height: 112px;
}
.block4 {
  position: absolute;
  top: 20px;
  left: 28px;
  width: 347px;
  height: 73.54px;
}
.text9 {
  position: absolute;
  top: 0px;
  left: 38.33px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 110, 71, 1);
  line-height: 36px;
  font-weight: 700;
}
.image4 {
  width: 24.83px;
  height: 27.47px;
  position: absolute;
  top: 4.27px;
  left: 0px;
}
.text10 {
  position: absolute;
  top: 37.54px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(93, 123, 98, 1);
  line-height: 36px;
  font-weight: 400;
}
.image5 {
  width: 224.73px;
  height: 211.76px;
  position: absolute;
  top: 5.39px;
  left: 398.98px;
}
.wrap3 {
  width: 640px;
  height: 637.81px;
  box-sizing: border-box;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container3 {
  position: relative;
  width: 640px;
  height: 637.81px;
}
.content3 {
  width: 640px;
  height: 637.81px;
  border-radius: 56px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
  padding-bottom: 48px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.main4 {
  width: 551px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.section8 {
  width: 337.94px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
}
.text34 {
  margin-bottom: 4px;
  width: 337.94px;
  height: 48px;
  font-family: "Source Han Sans CN";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(52, 144, 255, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}
.subSection13 {
  height: 38.55px;
  border-radius: 87.16px;
  box-sizing: border-box;
  background: rgba(239, 246, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 18px;
  padding-left: 18px;
}
.text35 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(91, 109, 131, 1);
  line-height: 36px;
  font-weight: 400;
}
.subSection14 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block14 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
}
.subBlock14 {
  margin-right: 8px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image18 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div23 {
  position: absolute;
  top: 11.13px;
  left: 7.97px;
  width: 25.2px;
  height: 18.88px;
}
.div24 {
  width: 25.2px;
  border-radius: 4.79px;
  box-sizing: border-box;
  background: rgba(52, 144, 255, 1);
  min-height: 18.88px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image19 {
  width: 9.8px;
  height: 9.8px;
  position: absolute;
  top: 4.54px;
  left: 8.9px;
}
.text36 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 67, 110, 1);
  line-height: 36px;
  font-weight: 700;
}
.block15 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 8px;
}
.subBlock15 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.div25 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div26 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(239, 246, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text37 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(52, 144, 255, 1);
  line-height: 36px;
  font-weight: 400;
}
.div27 {
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div28 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(239, 246, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text38 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(52, 144, 255, 1);
  line-height: 36px;
  font-weight: 400;
}
.div29 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 40px;
}
.div30 {
  height: 40px;
  border-radius: 12px;
  box-sizing: border-box;
  background: rgba(239, 246, 255, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  padding-left: 14px;
}
.text39 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(52, 144, 255, 1);
  line-height: 36px;
  font-weight: 400;
}
.text40 {
  width: 549.36px;
  height: 36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(91, 109, 131, 1);
  line-height: 36px;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
}
.subSection15 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;
}
.block16 {
  width: 549.36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.subBlock16 {
  margin-right: 5px;
  position: relative;
  width: 41.14px;
  height: 41.14px;
}
.image20 {
  width: 41.14px;
  height: 41.14px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.div31 {
  position: absolute;
  top: 10.82px;
  left: 7.16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22.77px;
  height: 22.87px;
}
.image21 {
  width: 22.77px;
  height: 22.87px;
}
.text41 {
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 67, 110, 1);
  line-height: 36px;
  font-weight: 700;
}
.text42 {
  width: 549.36px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  color: rgba(91, 109, 131, 1);
  line-height: 36px;
  font-weight: 400;
}
.text42__seg1 {
  color: rgba(52, 144, 255, 1);
}
.subSection16 {
  position: relative;
  width: 551px;
  height: 96px;
}
.block17 {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 551px;
  height: 112px;
}
.subBlock17 {
  width: 551px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(239, 246, 255, 1);
  min-height: 112px;
}
.block18 {
  position: absolute;
  top: 20px;
  left: 28px;
  width: 467px;
  height: 73.54px;
}
.text43 {
  position: absolute;
  top: 0px;
  left: 38.33px;
  font-family: "Source Han Sans CN";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(31, 67, 110, 1);
  line-height: 36px;
  font-weight: 700;
}
.image22 {
  width: 24.83px;
  height: 27.47px;
  position: absolute;
  top: 4.27px;
  left: 0px;
}
.text44 {
  position: absolute;
  top: 37.54px;
  left: 0px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(91, 109, 131, 1);
  line-height: 36px;
  font-weight: 400;
}
.image23 {
  width: 224.73px;
  height: 211.76px;
  position: absolute;
  top: 5.39px;
  left: 398.98px;
}
`,q$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.wrap {
  margin-bottom: -26px;
  position: relative;
  width: 130px;
  height: 46px;
}
.image {
  width: 130px;
  height: 46px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.text {
  position: absolute;
  top: 3px;
  left: 17px;
  font-family: "Douyin Sans";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(205, 123, 42, 1);
  line-height: 40px;
  font-weight: 400;
}
.wrap1 {
  width: 626px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 32px;
  padding-right: 24px;
  padding-bottom: 32px;
  padding-left: 24px;
}
.container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.content {
  width: 446px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
}
.image1 {
  width: 118px;
  height: 118px;
  margin-right: 20px;
}
.main {
  width: 308px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text1 {
  margin-bottom: 4px;
  width: 308px;
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: rgba(45, 45, 45, 1);
  line-height: 42px;
  font-weight: 500;
}
.text2 {
  width: 308px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
}
.text3 {
  width: 545px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  text-align: justify;
  color: rgba(129, 129, 129, 1);
  line-height: 36px;
  font-weight: 400;
}
`,W$=`.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.wrap {
  margin-bottom: 24px;
  position: relative;
  width: 614px;
  height: 94px;
}
.container {
  width: 614px;
  border-radius: 999px;
  box-sizing: border-box;
  background: rgba(255, 244, 246, 1);
  min-height: 94px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 34.65px;
  height: 36px;
  position: absolute;
  top: 29px;
  left: 33.87px;
}
.text {
  position: absolute;
  top: 11px;
  left: 91px;
  width: 491px;
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  color: rgba(110, 31, 84, 1);
  line-height: normal;
  letter-spacing: 1px;
  font-weight: 400;
}
.text__seg1 {
  font-family: "Source Han Sans CN Bold";
  font-weight: 700;
}
.wrap1 {
  width: 626px;
  height: 181px;
  border-radius: 40px;
  box-sizing: border-box;
  background: rgba(247, 247, 250, 1);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-right: 32px;
  padding-left: 32px;
}
.container2 {
  width: 582px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.content {
  margin-right: 24px;
  position: relative;
  width: 161.37px;
  height: 181px;
}
.image1 {
  width: 152px;
  height: 152px;
  position: absolute;
  top: 21px;
  left: 0px;
}
.main {
  position: absolute;
  top: 8px;
  left: 133px;
  width: 28.37px;
  height: 32.41px;
}
.image2 {
  width: 28.37px;
  height: 32.41px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image3 {
  width: 11.14px;
  height: 13.06px;
  position: absolute;
  top: 14.38px;
  left: 8.38px;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text1 {
  margin-bottom: 16px;
  width: 340px;
  transform: rotate(-3.4753641115539876e-8deg);
  font-family: "Source Han Sans CN";
  font-size: 26px;
  white-space: nowrap;
  color: rgba(45, 45, 45, 1);
  line-height: 38px;
  font-weight: 700;
}
.main1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.text2 {
  margin-right: 12px;
  transform: rotate(-3.4753641115539876e-8deg);
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  color: rgba(81, 81, 81, 1);
  line-height: 36px;
  font-weight: 400;
}
.section {
  border-radius: 4px;
  box-sizing: border-box;
  background: rgba(220, 240, 255, 1);
  padding: 2px 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text3 {
  font-family: "Source Han Sans CN Regular";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(24, 136, 255, 1);
  line-height: 30px;
  font-weight: 400;
}
`,X$=`.page {
  width: 604px;
  min-height: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.text {
  width: 604px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: rgba(129, 129, 129, 1);
  line-height: 36px;
  font-weight: 400;
  flex-shrink: 0;
}
`,Y$=`.page {
  width: 702px;
  height: 160px;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 702px;
  height: 160px;
}
.content {
  width: 702px;
  border-radius: 40px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 20, 115, 1) 0%,
    rgba(255, 34, 159, 1) 100%
  );
  min-height: 160px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image {
  width: 702px;
  height: 160px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.image1 {
  width: 233px;
  height: 148px;
  position: absolute;
  top: 6px;
  left: 6px;
}
.container1 {
  width: 34px;
  height: 54px;
  border-radius: 6px;
  box-sizing: border-box;
  background: rgba(255, 217, 229, 1);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 53px;
  left: 37px;
}
.text {
  width: 22px;
  font-family: "Source Han Sans CN Bold";
  font-size: 22px;
  text-align: justify;
  color: rgba(255, 19, 114, 1);
  line-height: 24px;
  letter-spacing: -1px;
  font-weight: 700;
}
.container2 {
  width: 176px;
  height: 70px;
  line-height: 32px;
  border-radius: 999px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 219, 178, 1) 0%,
    rgba(255, 248, 233, 1) 100%
  );
  position: absolute;
  top: 45px;
  left: 505.36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text1 {
  width: 104px;
  font-family: "Source Han Sans CN Bold";
  font-size: 26px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: 32px;
  font-weight: 700;
  flex-shrink: 0;
}
.wrap1 {
  width: 136px;
  height: 59px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50.5px;
  left: 77px;
}
.text2 {
  margin-right: 7px;
  font-family: "Douyin Number ABC ExtraBold";
  font-size: 50px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 42px;
  font-weight: 800;
}
.text3 {
  width: 22.61px;
  height: 39.69px;
  font-family: "Source Han Sans CN Bold";
  font-size: 24px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 19, 114, 1);
  line-height: 36px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.wrap2 {
  width: 236px;
  height: 76px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 42px;
  left: 253px;
}
.container3 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: -2px;
}
.text4 {
  -webkit-text-stroke-width: 0.86px;
  -webkit-text-stroke-color: rgba(255, 255, 255, 1);
  paint-order: stroke fill;
  font-family: "Douyin Sans";
  font-size: 32px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 400;
}
.text5 {
  font-family: "Source Han Sans CN Bold";
  font-size: 30px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 700;
}
.container4 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.content1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-right: 8px;
}
.text6 {
  margin-right: 4px;
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 400;
}
.text7 {
  margin-right: 4px;
  width: 13px;
  height: 12px;
  font-family: "Douyin Number ABC Bold";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}
.text8 {
  font-family: "Source Han Sans CN Regular";
  font-size: 22px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  line-height: normal;
  font-weight: 400;
}
`,J$=`.page {
  width: 560px;
  height: 740px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 560px;
  height: 740px;
  border-radius: 30px;
  box-sizing: border-box;
  background: var(--checkout-background);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.image {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 302px;
  height: 60px;
  border-radius: 0 0 60px 60px;
  background: var(--checkout-ribbon-color);
}
.campaignText {
  width: 227.29px;
  height: 27.15px;
  margin-top: 16px;
  margin-right: 36.01px;
  overflow: hidden;
  color: #ffffff;
  font-family: "Douyin Sans", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 27.15px;
  text-align: center;
  white-space: nowrap;
}
.content {
  width: 560px;
  height: 659px;
  margin-top: 21px;
  position: relative;
}
.main {
  position: absolute;
  top: 0px;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 440px;
  height: 173.37px;
  overflow: hidden;
  flex-direction: column;
  font-family: "MFBenHeiNoncommercial", sans-serif;
  font-size: 66px;
  font-weight: 400;
  line-height: 1.08;
  text-align: center;
  white-space: nowrap;
  color: var(--checkout-text-color);
}
.headlineLine {
  display: block;
  width: 100%;
}
.headlineHighlight {
  color: var(--checkout-highlight-color);
}
.image3 {
  position: absolute;
  top: 104.01px;
  left: 0px;
  width: 560px;
  height: 554.99px;
}
.burst {
  position: absolute;
  z-index: 0;
  top: 50px;
  left: -39.5px;
  width: 555px;
  height: 400px;
}
.glow {
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 13px;
  width: 534px;
  height: 400px;
}
.image4 {
  width: 377px;
  height: 298.09px;
  position: absolute;
  z-index: 2;
  top: 109.62px;
  left: 93px;
  object-fit: contain;
  transform-origin: center;
}
.actionButton {
  width: 350px;
  height: 110px;
  position: absolute;
  z-index: 3;
  top: 393.99px;
  left: 105px;
  overflow: hidden;
  border-radius: 999px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  animation: popupButtonPulse 1.2s ease-in-out infinite;
}

.actionButton::after {
  position: absolute;
  z-index: 1;
  top: -20%;
  left: -42%;
  width: 28%;
  height: 140%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.72),
    transparent
  );
  content: "";
  pointer-events: none;
  transform: skewX(-20deg);
  animation: popupButtonShine 1.8s ease-in-out infinite;
}
.buttonText {
  position: relative;
  z-index: 2;
  width: 280px;
  height: 60px;
  overflow: hidden;
  font-family: "Source Han Sans CN Bold", "Source Han Sans CN", sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: center;
  color: #ffffff;
}
.image6 {
  width: 130.98px;
  height: 113.51px;
  position: absolute;
  z-index: 4;
  top: 431.62px;
  left: 374.51px;
  transform-origin: 28% 18%;
  animation: popupHandTap 1.2s ease-in-out infinite;
}

@keyframes popupButtonPulse {
  0%,
  100% {
    transform: scale(0.96);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes popupButtonShine {
  0%,
  24% {
    opacity: 0;
    transform: translateX(0) skewX(-20deg);
  }
  34% {
    opacity: 1;
  }
  66% {
    opacity: 1;
    transform: translateX(520%) skewX(-20deg);
  }
  76%,
  100% {
    opacity: 0;
    transform: translateX(520%) skewX(-20deg);
  }
}

@keyframes popupHandTap {
  0%,
  100% {
    transform: translate(7px, 7px) rotate(1deg);
  }
  48%,
  62% {
    transform: translate(-4px, -4px) scale(0.96);
  }
}

@media (prefers-reduced-motion: reduce) {
  .actionButton,
  .actionButton::after,
  .image6 {
    animation: none;
  }
}
`,Z$=`.page {
  --profile-banner-background: linear-gradient(90deg, #d39aff 0%, #f7ebff 73.03%);
  --profile-banner-text-color: #240939;
  --profile-banner-highlight-color: #8d16e8;
  --profile-banner-button-start: #ff180e;
  --profile-banner-button-end: #ff166f;
  width: 686px;
  height: 120px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background: var(--profile-banner-background);
}

.copy {
  width: 303.18px;
  height: 71px;
  position: absolute;
  z-index: 2;
  top: 23.2px;
  left: 21.8px;
}

.campaignText {
  width: 196.99px;
  height: 23.53px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0.43px;
  font-family: "Source Han Sans CN Bold", "Source Han Sans CN", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 23.53px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: left;
  color: var(--profile-banner-text-color);
}

.headline {
  width: 303.18px;
  height: 32.23px;
  overflow: hidden;
  position: absolute;
  top: 38.76px;
  left: 0;
  font-family: MFBenHeiNoncommercial, "Source Han Sans CN Heavy", sans-serif;
  font-size: 36px;
  font-weight: 900;
  line-height: 32.23px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: left;
  color: var(--profile-banner-text-color);
}

.headlineHighlight {
  color: var(--profile-banner-highlight-color);
}

.mainVisual {
  width: 167px;
  height: 120px;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 338px;
  object-fit: fill;
  transform-origin: center;
}

.actionButton {
  width: 146px;
  height: 56px;
  overflow: hidden;
  position: absolute;
  z-index: 2;
  top: 32px;
  left: 516px;
  border-radius: 66px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--profile-banner-button-start) 0%,
    var(--profile-banner-button-end) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttonText {
  width: 118px;
  height: 34px;
  overflow: hidden;
  font-family: "Source Han Sans CN Bold", "Source Han Sans CN", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: center;
  color: #ffffff;
}
`,Q$=`.viewport {
  overflow: visible;
  position: absolute;
  transform-origin: center;
  pointer-events: none;
}

.canvas {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: center;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.layer {
  position: absolute;
}

.layer img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center;
  user-select: none;
}

[data-main-visual-scheme="subject-1"] .canvas {
  transform-origin: 58% 82%;
  animation-name: giftPresent;
}

[data-main-visual-scheme="subject-2"] .canvas {
  transform-origin: 50% 88%;
  animation-name: cheerBounce;
}

[data-main-visual-scheme="subject-3"] .canvas {
  transform-origin: 56% 76%;
  animation-name: announceRock;
}

[data-main-visual-scheme="subject-4"] .canvas {
  transform-origin: 50% 90%;
  animation-name: giftLift;
}

.floatSlow,
.floatFast,
.coinFloat,
.rocketFloat,
.driftLeft,
.driftRight {
  animation-name: accentFollow;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.coreFloat {
  animation: none;
}

.floatFast {
  transform-origin: 48% 28%;
  animation-name: lightFollow;
  animation-duration: 1.2s;
}

.floatSlow {
  transform-origin: 38% 68%;
  animation-name: softFollow;
  animation-duration: 1.2s;
}

.driftLeft {
  transform-origin: 72% 64%;
  animation-name: ribbonFollow;
  animation-duration: 1.2s;
}

.driftRight {
  transform-origin: 28% 64%;
  animation-name: ribbonFollow;
  animation-duration: 1.2s;
}

.coinFloat,
.rocketFloat {
  animation-name: accentEmphasis;
  animation-duration: 1.2s;
}

.coinFloat {
  transform-origin: center;
}

.rocketFloat {
  transform-origin: 42% 72%;
  animation-name: rocketFollow;
  animation-duration: 1.2s;
}

@keyframes giftPresent {
  0% {
    transform: translate(-2px, 3px) rotate(-0.8deg) scale(0.995);
  }
  50% {
    transform: translate(5px, -6px) rotate(0.9deg) scale(1.018);
  }
  100% {
    transform: translate(-2px, 3px) rotate(-0.8deg) scale(0.995);
  }
}

@keyframes cheerBounce {
  0% {
    transform: translate(-2px, 3px) rotate(-0.5deg) scale(0.995);
  }
  50% {
    transform: translate(4px, -7px) rotate(0.7deg) scale(1.02);
  }
  100% {
    transform: translate(-2px, 3px) rotate(-0.5deg) scale(0.995);
  }
}

@keyframes announceRock {
  0% {
    transform: translate(-2px, 3px) rotate(-0.8deg) scale(0.995);
  }
  50% {
    transform: translate(5px, -5px) rotate(1.1deg) scale(1.018);
  }
  100% {
    transform: translate(-2px, 3px) rotate(-0.8deg) scale(0.995);
  }
}

@keyframes giftLift {
  0% {
    transform: translate(-2px, 3px) rotate(-0.6deg) scale(0.995);
  }
  50% {
    transform: translate(4px, -8px) rotate(0.8deg) scale(1.02);
  }
  100% {
    transform: translate(-2px, 3px) rotate(-0.6deg) scale(0.995);
  }
}

@keyframes accentFollow {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.99);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) scale(1.025);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.99);
  }
}

@keyframes softFollow {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.99);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) scale(1.03);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.99);
  }
}

@keyframes lightFollow {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.98);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) scale(1.05);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.98);
  }
}

@keyframes ribbonFollow {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) skewX(-1deg);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) skewX(1.5deg);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) skewX(-1deg);
  }
}

@keyframes accentEmphasis {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.97);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) scale(1.07);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.97);
  }
}

@keyframes rocketFollow {
  0% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.97);
  }
  50% {
    transform: translate(var(--bloom-x), var(--bloom-y))
      rotate(var(--bloom-rotate)) scale(1.08);
  }
  100% {
    transform: translate(var(--bloom-in-x), var(--bloom-in-y))
      rotate(var(--bloom-in-rotate)) scale(0.97);
  }
}

@media (prefers-reduced-motion: reduce) {
  .canvas,
  .layer img {
    animation: none;
  }
}
`,eC=`.page {
  width: 152px;
  height: 152px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.image {
  width: 152px;
  height: 120px;
  position: absolute;
  top: 14px;
  left: 0px;
}
.wrap {
  position: absolute;
  top: 108px;
  left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 38px;
  transform-origin: center;
  animation: pendantButtonPulse 1.2s ease-in-out infinite;
}
.container {
  width: 130px;
  height: 38px;
  overflow: hidden;
  position: relative;
  border-radius: 66px;
  box-sizing: border-box;
  background: rgba(255, 19, 114, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container::after {
  position: absolute;
  z-index: 1;
  top: -25%;
  left: -38%;
  width: 24%;
  height: 150%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.72),
    transparent
  );
  content: "";
  pointer-events: none;
  transform: skewX(-20deg);
  animation: pendantButtonShine 1.2s ease-in-out infinite;
}

.buttonText {
  position: relative;
  z-index: 2;
  max-width: 114px;
  color: #ffffff;
  font-family: "Source Han Sans CN", sans-serif;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  text-overflow: clip;
  white-space: nowrap;
}

@keyframes pendantButtonPulse {
  0%,
  100% {
    transform: scale(0.96);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes pendantButtonShine {
  0% {
    opacity: 0;
    transform: translateX(0) skewX(-20deg);
  }
  20% {
    opacity: 1;
  }
  70% {
    opacity: 1;
    transform: translateX(560%) skewX(-20deg);
  }
  100% {
    opacity: 0;
    transform: translateX(560%) skewX(-20deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wrap,
  .container::after {
    animation: none;
  }
}
`,nC=`.page {
  --detail-popup-background: linear-gradient(
    165deg,
    #ff88c1 0%,
    #ffc1d5 20%,
    #fff1f4 100%
  );
  --detail-popup-text-color: #2c0113;
  --detail-popup-highlight-color: #f00073;
  width: 560px;
  height: 740px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}
.wrap {
  position: absolute;
  z-index: 1;
  top: 198px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 511px;
}
.container {
  position: relative;
  width: 560px;
  height: 511px;
  border-radius: 90px;
  box-sizing: border-box;
  background: var(--detail-popup-background);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.content1 {
  margin-top: 98px;
  margin-left: 114px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 327.75px;
  height: 26.95px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main1 {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4.14px;
  margin-left: 8.7px;
}
.section1 {
  width: 314.6px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
}
.image4 {
  flex: 1 1 42.3px;
  min-width: 16px;
  height: 2.7px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--detail-popup-text-color) 100%
  );
}
.image5 {
  width: max-content;
  max-width: calc(100% - 68px);
  height: 26px;
  flex: 0 1 auto;
  color: var(--detail-popup-text-color);
  font-family: "Douyin Sans", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 26px;
  text-align: center;
  white-space: nowrap;
}
.subSection {
  flex: 1 1 42.3px;
  min-width: 16px;
  border-radius: 41.4px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--detail-popup-text-color) 0%,
    transparent 99.29%
  );
  min-height: 2.7px;
}
.headline {
  width: 360px;
  height: 156px;
  margin-top: 39.29px;
  margin-left: 100px;
  position: relative;
  font-family: MFBenHeiNoncommercial, sans-serif;
  font-size: 66px;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  white-space: normal;
  overflow: hidden;
  color: var(--detail-popup-text-color);
}

.headlineLine {
  display: block;
  width: 100%;
  height: 66px;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 66px;
  white-space: nowrap;
}

.headlineLine:nth-child(2) {
  top: 90px;
}

.headlineHighlight {
  color: var(--detail-popup-highlight-color);
}

.button {
  width: 350px;
  height: 110px;
  position: absolute;
  top: 358.99px;
  left: 105px;
  overflow: hidden;
  border-radius: 999px;
  transform-origin: center;
  animation: popupButtonPulse 1.2s ease-in-out infinite;
}

.button::after {
  position: absolute;
  z-index: 2;
  top: -20%;
  left: -42%;
  width: 28%;
  height: 140%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.72),
    transparent
  );
  content: "";
  pointer-events: none;
  transform: skewX(-20deg);
  animation: popupButtonShine 1.8s ease-in-out infinite;
}

.hand {
  width: 130.98px;
  height: 113.51px;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  top: 394.92px;
  left: 383.32px;
  transform-origin: 28% 18%;
  animation: popupHandTap 1.2s ease-in-out infinite;
}

.mainVisual {
  width: 427px;
  height: 317px;
  position: absolute;
  z-index: 3;
  top: 37px;
  left: 67px;
  overflow: visible;
  pointer-events: none;
}

.mainVisualCanvas {
  width: 100%;
  height: 100%;
  position: relative;
  transform-origin: 50% 82%;
  animation: detailVisualPulse 1.2s ease-in-out infinite;
}

.detailRibbon,
.detailCoin,
.detailSpark {
  position: absolute;
  display: block;
  object-fit: contain;
  transform-origin: center;
}

.detailRibbon {
  z-index: 0;
  top: 69px;
  left: 0;
  width: 101px;
  height: 150px;
  transform-origin: 74% 58%;
  animation: detailRibbonBloom 1.2s ease-in-out infinite;
}

.detailCoin {
  z-index: 1;
  top: 0;
  left: 42px;
  width: 294px;
  height: 317px;
}

.detailSpark {
  z-index: 2;
  top: 96px;
  left: 291px;
  width: 136px;
  height: 140px;
  transform-origin: 18% 65%;
  animation: detailSparkBloom 1.2s ease-in-out infinite;
}

@keyframes detailVisualPulse {
  0%,
  100% {
    transform: translateY(3px) rotate(-0.5deg) scale(0.98);
  }
  50% {
    transform: translateY(-6px) rotate(0.6deg) scale(1.025);
  }
}

@keyframes detailRibbonBloom {
  0%,
  100% {
    transform: translate(2px, 1px) rotate(1.5deg) scale(0.98);
  }
  50% {
    transform: translate(-7px, -4px) rotate(-4deg) scale(1.06);
  }
}

@keyframes detailSparkBloom {
  0%,
  100% {
    transform: translate(-2px, 1px) rotate(-1deg) scale(0.98);
  }
  50% {
    transform: translate(8px, -5px) rotate(4deg) scale(1.07);
  }
}

@keyframes popupButtonPulse {
  0%,
  100% {
    transform: scale(0.96);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes popupButtonShine {
  0%,
  24% {
    opacity: 0;
    transform: translateX(0) skewX(-20deg);
  }
  34% {
    opacity: 1;
  }
  66% {
    opacity: 1;
    transform: translateX(520%) skewX(-20deg);
  }
  76%,
  100% {
    opacity: 0;
    transform: translateX(520%) skewX(-20deg);
  }
}

@keyframes popupHandTap {
  0%,
  100% {
    transform: translate(7px, 7px) rotate(1deg);
  }
  48%,
  62% {
    transform: translate(-4px, -4px) scale(0.96);
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .button::after,
  .hand,
  .mainVisualCanvas,
  .detailRibbon,
  .detailSpark {
    animation: none;
  }
}
`,tC=`.page {
  --retention-popup-background: linear-gradient(
    165deg,
    #ff88c1 0%,
    #ffc1d5 20%,
    #fff1f4 100%
  );
  --retention-popup-campaign-color: #b64cff;
  --retention-popup-text-color: #240939;
  --retention-popup-highlight-color: #8d16e8;
  width: 560px;
  height: 740px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.mainVisual {
  width: 309.35px;
  height: 244.6px;
  position: absolute;
  z-index: 0;
  top: 9px;
  left: 119px;
  object-fit: fill;
}

.container {
  position: absolute;
  z-index: 1;
  top: 229px;
  left: 0;
  width: 560px;
  height: 511px;
  border-radius: 90px;
  box-sizing: border-box;
  background: var(--retention-popup-background);
}

.campaignBadge {
  width: 302px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 129px;
  border-radius: 0 0 48px 48px;
  background: var(--retention-popup-campaign-color);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.campaignText {
  width: 250px;
  height: 28px;
  overflow: hidden;
  margin-top: 15px;
  font-family: "Douyin Sans", "Source Han Sans CN Bold", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: center;
  color: #ffffff;
}

.headline {
  width: 407px;
  height: 192px;
  overflow: hidden;
  position: absolute;
  top: 116px;
  left: 70.8px;
  font-family: MFBenHeiNoncommercial, "Source Han Sans CN Heavy", sans-serif;
  font-size: 66px;
  font-weight: 900;
  line-height: 96px;
  letter-spacing: 0;
  white-space: normal;
  text-align: center;
  color: var(--retention-popup-text-color);
}

.headlineLine {
  display: block;
  width: 100%;
  height: 96px;
  white-space: nowrap;
}

.headlineLine:nth-child(2) {
  font-size: 80px;
}

.headlineHighlight {
  color: var(--retention-popup-highlight-color);
}

.button {
  width: 350px;
  height: 110px;
  position: absolute;
  top: 345px;
  left: 105px;
  overflow: hidden;
  border-radius: 999px;
  transform-origin: center;
  animation: popupButtonPulse 1.2s ease-in-out infinite;
}

.button::after {
  position: absolute;
  z-index: 2;
  top: -20%;
  left: -42%;
  width: 28%;
  height: 140%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.72),
    transparent
  );
  content: "";
  pointer-events: none;
  transform: skewX(-20deg);
  animation: popupButtonShine 1.8s ease-in-out infinite;
}

.hand {
  width: 130.98px;
  height: 113.51px;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  top: 387px;
  left: 375px;
  transform-origin: 28% 18%;
  animation: popupHandTap 1.2s ease-in-out infinite;
}

@keyframes popupButtonPulse {
  0%,
  100% {
    transform: scale(0.96);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes popupButtonShine {
  0%,
  24% {
    opacity: 0;
    transform: translateX(0) skewX(-20deg);
  }
  34% {
    opacity: 1;
  }
  66% {
    opacity: 1;
    transform: translateX(520%) skewX(-20deg);
  }
  76%,
  100% {
    opacity: 0;
    transform: translateX(520%) skewX(-20deg);
  }
}

@keyframes popupHandTap {
  0%,
  100% {
    transform: translate(7px, 7px) rotate(1deg);
  }
  48%,
  62% {
    transform: translate(-4px, -4px) scale(0.96);
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .button::after,
  .hand {
    animation: none;
  }
}
`,iC=`.page {
  width: 1029px;
  height: 270px;
  overflow: hidden;
  box-sizing: border-box;
  background: #ffffff;
}

.container {
  --top-banner-background: linear-gradient(90deg, #d39aff 0%, #f7ebff 81.44%);
  --top-banner-text-color: #240939;
  --top-banner-highlight-color: #8d16e8;
  --top-banner-button-start: #ff180e;
  --top-banner-button-end: #ff166f;
  width: 1029px;
  height: 270px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background: var(--top-banner-background);
}

.content {
  width: 577.96px;
  height: 206.42px;
  position: absolute;
  z-index: 2;
  top: 32.8px;
  left: 35px;
}

.campaignText {
  width: 295.48px;
  height: 35.29px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 15.35px;
  font-family: "Source Han Sans CN Bold", "Source Han Sans CN", sans-serif;
  font-size: 38px;
  font-weight: 700;
  line-height: 35.29px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: left;
  color: var(--top-banner-text-color);
}

.headline {
  width: 563.85px;
  height: 52.49px;
  overflow: hidden;
  position: absolute;
  top: 54.91px;
  left: 14.12px;
  font-family: MFBenHeiNoncommercial, "Source Han Sans CN Heavy", sans-serif;
  font-size: 58px;
  font-weight: 900;
  line-height: 52.49px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: left;
  color: var(--top-banner-text-color);
}

.headlineHighlight {
  color: var(--top-banner-highlight-color);
}

.actionButton {
  width: 212.24px;
  height: 72.84px;
  overflow: hidden;
  position: absolute;
  top: 133.58px;
  left: 0;
  border-radius: 85.85px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--top-banner-button-start) 0%,
    var(--top-banner-button-end) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttonText {
  width: 176px;
  height: 48px;
  overflow: hidden;
  font-family: "Source Han Sans CN Bold", "Source Han Sans CN", sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0;
  white-space: nowrap;
  text-align: center;
  color: #ffffff;
}

.mainVisual {
  width: 331px;
  height: 262px;
  position: absolute;
  z-index: 1;
  top: 1.6px;
  left: 653.35px;
  object-fit: contain;
  transform-origin: center;
}
`,aC=`.page {
  width: 475px;
  height: 55px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 475px;
  height: 55px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.container {
  height: 55px;
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    rgba(255, 221, 226, 0) 0%,
    rgba(255, 221, 226, 0.6) 22.11%,
    rgba(255, 221, 226, 0.6) 77.4%,
    rgba(255, 221, 226, 0) 100%
  );
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.text {
  font-family: "Source Han Sans CN";
  font-size: 28px;
  white-space: nowrap;
  text-align: center;
  color: rgba(255, 27, 119, 1);
  line-height: 42px;
  font-weight: 500;
}
`,oC=`.page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 525.46px;
  height: 95.06px;
}

.wrap {
  position: relative;
  width: 525.46px;
  height: 95.06px;
  overflow: hidden;
  border-radius: 18px;
  box-sizing: border-box;
  background: #ffeeee;
}

.description {
  position: absolute;
  top: 18px;
  left: 22.95px;
  width: 218.79px;
  min-height: 58.25px;
  color: #595959;
  font-family: "Source Han Sans CN Regular", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.button {
  position: absolute;
  top: 8.45px;
  left: 293.79px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 223.11px;
  height: 78.16px;
  border-radius: var(--promo-radius-pill, 99px);
  box-sizing: border-box;
  background: linear-gradient(
    90deg,
    var(--random-prize-address-accent-start, #ff1473) 0%,
    var(--random-prize-address-accent-end, #ff229f) 100%
  );
  color: #fff;
  font-family: "Source Han Sans CN", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0;
  text-align: center;
  overflow-wrap: anywhere;
}
`,rC=""+new URL("主体替换-方案1-CXXKlRrq.png",import.meta.url).href,sC=""+new URL("主体替换-方案2-BU1B_25Y.png",import.meta.url).href,lC=""+new URL("主体替换-方案3-BdIfNk_S.png",import.meta.url).href,dC=""+new URL("主体替换-方案4-BocFxWfO.png",import.meta.url).href;function pC(e,n){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;const t=document.implementation.createHTMLDocument(),i=t.createElement("base"),a=t.createElement("a");return t.head.appendChild(i),t.body.appendChild(a),n&&(i.href=n),a.href=e,a.href}const cC=(()=>{let e=0;const n=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${n()}${e}`)})();function it(e){const n=[];for(let t=0,i=e.length;t<i;t++)n.push(e[t]);return n}let Ot=null;function v2(e={}){return Ot||(e.includeStyleProperties?(Ot=e.includeStyleProperties,Ot):(Ot=it(window.getComputedStyle(document.documentElement)),Ot))}function ya(e,n){const i=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(n);return i?parseFloat(i.replace("px","")):0}function uC(e){const n=ya(e,"border-left-width"),t=ya(e,"border-right-width");return e.clientWidth+n+t}function gC(e){const n=ya(e,"border-top-width"),t=ya(e,"border-bottom-width");return e.clientHeight+n+t}function S2(e,n={}){const t=n.width||uC(e),i=n.height||gC(e);return{width:t,height:i}}function mC(){let e,n;try{n=process}catch{}const t=n&&n.env?n.env.devicePixelRatio:null;return t&&(e=parseInt(t,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}const en=16384;function fC(e){(e.width>en||e.height>en)&&(e.width>en&&e.height>en?e.width>e.height?(e.height*=en/e.width,e.width=en):(e.width*=en/e.height,e.height=en):e.width>en?(e.height*=en/e.width,e.width=en):(e.width*=en/e.height,e.height=en))}function xC(e,n={}){return e.toBlob?new Promise(t=>{e.toBlob(t,n.type?n.type:"image/png",n.quality?n.quality:1)}):new Promise(t=>{const i=window.atob(e.toDataURL(n.type?n.type:void 0,n.quality?n.quality:void 0).split(",")[1]),a=i.length,o=new Uint8Array(a);for(let s=0;s<a;s+=1)o[s]=i.charCodeAt(s);t(new Blob([o],{type:n.type?n.type:"image/png"}))})}function wa(e){return new Promise((n,t)=>{const i=new Image;i.onload=()=>{i.decode().then(()=>{requestAnimationFrame(()=>n(i))})},i.onerror=t,i.crossOrigin="anonymous",i.decoding="async",i.src=e})}async function hC(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(n=>`data:image/svg+xml;charset=utf-8,${n}`)}async function bC(e,n,t){const i="http://www.w3.org/2000/svg",a=document.createElementNS(i,"svg"),o=document.createElementNS(i,"foreignObject");return a.setAttribute("width",`${n}`),a.setAttribute("height",`${t}`),a.setAttribute("viewBox",`0 0 ${n} ${t}`),o.setAttribute("width","100%"),o.setAttribute("height","100%"),o.setAttribute("x","0"),o.setAttribute("y","0"),o.setAttribute("externalResourcesRequired","true"),a.appendChild(o),o.appendChild(e),hC(a)}const Ye=(e,n)=>{if(e instanceof n)return!0;const t=Object.getPrototypeOf(e);return t===null?!1:t.constructor.name===n.name||Ye(t,n)};function yC(e){const n=e.getPropertyValue("content");return`${e.cssText} content: '${n.replace(/'|"/g,"")}';`}function wC(e,n){return v2(n).map(t=>{const i=e.getPropertyValue(t),a=e.getPropertyPriority(t);return`${t}: ${i}${a?" !important":""};`}).join(" ")}function vC(e,n,t,i){const a=`.${e}:${n}`,o=t.cssText?yC(t):wC(t,i);return document.createTextNode(`${a}{${o}}`)}function Ml(e,n,t,i){const a=window.getComputedStyle(e,t),o=a.getPropertyValue("content");if(o===""||o==="none")return;const s=cC();try{n.className=`${n.className} ${s}`}catch{return}const l=document.createElement("style");l.appendChild(vC(s,t,a,i)),n.appendChild(l)}function SC(e,n,t){Ml(e,n,":before",t),Ml(e,n,":after",t)}const jl="application/font-woff",Rl="image/jpeg",TC={woff:jl,woff2:jl,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:Rl,jpeg:Rl,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function $C(e){const n=/\.([^./]*?)$/g.exec(e);return n?n[1]:""}function zr(e){const n=$C(e).toLowerCase();return TC[n]||""}function CC(e){return e.split(/,/)[1]}function tr(e){return e.search(/^(data:)/)!==-1}function IC(e,n){return`data:${n};base64,${e}`}async function T2(e,n,t){const i=await fetch(e,n);if(i.status===404)throw new Error(`Resource "${i.url}" not found`);const a=await i.blob();return new Promise((o,s)=>{const l=new FileReader;l.onerror=s,l.onloadend=()=>{try{o(t({res:i,result:l.result}))}catch(d){s(d)}},l.readAsDataURL(a)})}const Po={};function kC(e,n,t){let i=e.replace(/\?.*/,"");return t&&(i=e),/ttf|otf|eot|woff2?/i.test(i)&&(i=i.replace(/.*\//,"")),n?`[${n}]${i}`:i}async function Fr(e,n,t){const i=kC(e,n,t.includeQueryParams);if(Po[i]!=null)return Po[i];t.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+new Date().getTime());let a;try{const o=await T2(e,t.fetchRequestInit,({res:s,result:l})=>(n||(n=s.headers.get("Content-Type")||""),CC(l)));a=IC(o,n)}catch(o){a=t.imagePlaceholder||"";let s=`Failed to fetch resource: ${e}`;o&&(s=typeof o=="string"?o:o.message),s&&console.warn(s)}return Po[i]=a,a}async function PC(e){const n=e.toDataURL();return n==="data:,"?e.cloneNode(!1):wa(n)}async function zC(e,n){if(e.currentSrc){const o=document.createElement("canvas"),s=o.getContext("2d");o.width=e.clientWidth,o.height=e.clientHeight,s?.drawImage(e,0,0,o.width,o.height);const l=o.toDataURL();return wa(l)}const t=e.poster,i=zr(t),a=await Fr(t,i,n);return wa(a)}async function FC(e,n){var t;try{if(!((t=e?.contentDocument)===null||t===void 0)&&t.body)return await Ka(e.contentDocument.body,n,!0)}catch{}return e.cloneNode(!1)}async function NC(e,n){return Ye(e,HTMLCanvasElement)?PC(e):Ye(e,HTMLVideoElement)?zC(e,n):Ye(e,HTMLIFrameElement)?FC(e,n):e.cloneNode($2(e))}const EC=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SLOT",$2=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SVG";async function _C(e,n,t){var i,a;if($2(n))return n;let o=[];return EC(e)&&e.assignedNodes?o=it(e.assignedNodes()):Ye(e,HTMLIFrameElement)&&(!((i=e.contentDocument)===null||i===void 0)&&i.body)?o=it(e.contentDocument.body.childNodes):o=it(((a=e.shadowRoot)!==null&&a!==void 0?a:e).childNodes),o.length===0||Ye(e,HTMLVideoElement)||await o.reduce((s,l)=>s.then(()=>Ka(l,t)).then(d=>{d&&n.appendChild(d)}),Promise.resolve()),n}function BC(e,n,t){const i=n.style;if(!i)return;const a=window.getComputedStyle(e);a.cssText?(i.cssText=a.cssText,i.transformOrigin=a.transformOrigin):v2(t).forEach(o=>{let s=a.getPropertyValue(o);o==="font-size"&&s.endsWith("px")&&(s=`${Math.floor(parseFloat(s.substring(0,s.length-2)))-.1}px`),Ye(e,HTMLIFrameElement)&&o==="display"&&s==="inline"&&(s="block"),o==="d"&&n.getAttribute("d")&&(s=`path(${n.getAttribute("d")})`),i.setProperty(o,s,a.getPropertyPriority(o))})}function AC(e,n){Ye(e,HTMLTextAreaElement)&&(n.innerHTML=e.value),Ye(e,HTMLInputElement)&&n.setAttribute("value",e.value)}function MC(e,n){if(Ye(e,HTMLSelectElement)){const t=n,i=Array.from(t.children).find(a=>e.value===a.getAttribute("value"));i&&i.setAttribute("selected","")}}function jC(e,n,t){return Ye(n,Element)&&(BC(e,n,t),SC(e,n,t),AC(e,n),MC(e,n)),n}async function RC(e,n){const t=e.querySelectorAll?e.querySelectorAll("use"):[];if(t.length===0)return e;const i={};for(let o=0;o<t.length;o++){const l=t[o].getAttribute("xlink:href");if(l){const d=e.querySelector(l),p=document.querySelector(l);!d&&p&&!i[l]&&(i[l]=await Ka(p,n,!0))}}const a=Object.values(i);if(a.length){const o="http://www.w3.org/1999/xhtml",s=document.createElementNS(o,"svg");s.setAttribute("xmlns",o),s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.overflow="hidden",s.style.display="none";const l=document.createElementNS(o,"defs");s.appendChild(l);for(let d=0;d<a.length;d++)l.appendChild(a[d]);e.appendChild(s)}return e}async function Ka(e,n,t){return!t&&n.filter&&!n.filter(e)?null:Promise.resolve(e).then(i=>NC(i,n)).then(i=>_C(e,i,n)).then(i=>jC(e,i,n)).then(i=>RC(i,n))}const C2=/url\((['"]?)([^'"]+?)\1\)/g,HC=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,DC=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function LC(e){const n=e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${n})(['"]?\\))`,"g")}function GC(e){const n=[];return e.replace(C2,(t,i,a)=>(n.push(a),t)),n.filter(t=>!tr(t))}async function OC(e,n,t,i,a){try{const o=t?pC(n,t):n,s=zr(n);let l;return a||(l=await Fr(o,s,i)),e.replace(LC(n),`$1${l}$3`)}catch{}return e}function VC(e,{preferredFontFormat:n}){return n?e.replace(DC,t=>{for(;;){const[i,,a]=HC.exec(t)||[];if(!a)return"";if(a===n)return`src: ${i};`}}):e}function I2(e){return e.search(C2)!==-1}async function k2(e,n,t){if(!I2(e))return e;const i=VC(e,t);return GC(i).reduce((o,s)=>o.then(l=>OC(l,s,n,t)),Promise.resolve(i))}async function Vt(e,n,t){var i;const a=(i=n.style)===null||i===void 0?void 0:i.getPropertyValue(e);if(a){const o=await k2(a,null,t);return n.style.setProperty(e,o,n.style.getPropertyPriority(e)),!0}return!1}async function UC(e,n){await Vt("background",e,n)||await Vt("background-image",e,n),await Vt("mask",e,n)||await Vt("-webkit-mask",e,n)||await Vt("mask-image",e,n)||await Vt("-webkit-mask-image",e,n)}async function KC(e,n){const t=Ye(e,HTMLImageElement);if(!(t&&!tr(e.src))&&!(Ye(e,SVGImageElement)&&!tr(e.href.baseVal)))return;const i=t?e.src:e.href.baseVal,a=await Fr(i,zr(i),n);await new Promise((o,s)=>{e.onload=o,e.onerror=n.onImageErrorHandler?(...d)=>{try{o(n.onImageErrorHandler(...d))}catch(p){s(p)}}:s;const l=e;l.decode&&(l.decode=o),l.loading==="lazy"&&(l.loading="eager"),t?(e.srcset="",e.src=a):e.href.baseVal=a})}async function qC(e,n){const i=it(e.childNodes).map(a=>P2(a,n));await Promise.all(i).then(()=>e)}async function P2(e,n){Ye(e,Element)&&(await UC(e,n),await KC(e,n),await qC(e,n))}function WC(e,n){const{style:t}=e;n.backgroundColor&&(t.backgroundColor=n.backgroundColor),n.width&&(t.width=`${n.width}px`),n.height&&(t.height=`${n.height}px`);const i=n.style;return i!=null&&Object.keys(i).forEach(a=>{t[a]=i[a]}),e}const Hl={};async function Dl(e){let n=Hl[e];if(n!=null)return n;const i=await(await fetch(e)).text();return n={url:e,cssText:i},Hl[e]=n,n}async function Ll(e,n){let t=e.cssText;const i=/url\(["']?([^"')]+)["']?\)/g,o=(t.match(/url\([^)]+\)/g)||[]).map(async s=>{let l=s.replace(i,"$1");return l.startsWith("https://")||(l=new URL(l,e.url).href),T2(l,n.fetchRequestInit,({result:d})=>(t=t.replace(s,`url(${d})`),[s,d]))});return Promise.all(o).then(()=>t)}function Gl(e){if(e==null)return[];const n=[],t=/(\/\*[\s\S]*?\*\/)/gi;let i=e.replace(t,"");const a=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const d=a.exec(i);if(d===null)break;n.push(d[0])}i=i.replace(a,"");const o=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,s="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",l=new RegExp(s,"gi");for(;;){let d=o.exec(i);if(d===null){if(d=l.exec(i),d===null)break;o.lastIndex=l.lastIndex}else l.lastIndex=o.lastIndex;n.push(d[0])}return n}async function XC(e,n){const t=[],i=[];return e.forEach(a=>{if("cssRules"in a)try{it(a.cssRules||[]).forEach((o,s)=>{if(o.type===CSSRule.IMPORT_RULE){let l=s+1;const d=o.href,p=Dl(d).then(c=>Ll(c,n)).then(c=>Gl(c).forEach(u=>{try{a.insertRule(u,u.startsWith("@import")?l+=1:a.cssRules.length)}catch(g){console.error("Error inserting rule from remote css",{rule:u,error:g})}})).catch(c=>{console.error("Error loading remote css",c.toString())});i.push(p)}})}catch(o){const s=e.find(l=>l.href==null)||document.styleSheets[0];a.href!=null&&i.push(Dl(a.href).then(l=>Ll(l,n)).then(l=>Gl(l).forEach(d=>{s.insertRule(d,s.cssRules.length)})).catch(l=>{console.error("Error loading remote stylesheet",l)})),console.error("Error inlining remote css file",o)}}),Promise.all(i).then(()=>(e.forEach(a=>{if("cssRules"in a)try{it(a.cssRules||[]).forEach(o=>{t.push(o)})}catch(o){console.error(`Error while reading CSS rules from ${a.href}`,o)}}),t))}function YC(e){return e.filter(n=>n.type===CSSRule.FONT_FACE_RULE).filter(n=>I2(n.style.getPropertyValue("src")))}async function JC(e,n){if(e.ownerDocument==null)throw new Error("Provided element is not within a Document");const t=it(e.ownerDocument.styleSheets),i=await XC(t,n);return YC(i)}function z2(e){return e.trim().replace(/["']/g,"")}function ZC(e){const n=new Set;function t(i){(i.style.fontFamily||getComputedStyle(i).fontFamily).split(",").forEach(o=>{n.add(z2(o))}),Array.from(i.children).forEach(o=>{o instanceof HTMLElement&&t(o)})}return t(e),n}async function F2(e,n){const t=await JC(e,n),i=ZC(e);return(await Promise.all(t.filter(o=>i.has(z2(o.style.fontFamily))).map(o=>{const s=o.parentStyleSheet?o.parentStyleSheet.href:null;return k2(o.cssText,s,n)}))).join(`
`)}async function QC(e,n){const t=n.fontEmbedCSS!=null?n.fontEmbedCSS:n.skipFonts?null:await F2(e,n);if(t){const i=document.createElement("style"),a=document.createTextNode(t);i.appendChild(a),e.firstChild?e.insertBefore(i,e.firstChild):e.appendChild(i)}}async function e3(e,n={}){const{width:t,height:i}=S2(e,n),a=await Ka(e,n,!0);return await QC(a,n),await P2(a,n),WC(a,n),await bC(a,t,i)}async function N2(e,n={}){const{width:t,height:i}=S2(e,n),a=await e3(e,n),o=await wa(a),s=document.createElement("canvas"),l=s.getContext("2d"),d=n.pixelRatio||mC(),p=n.canvasWidth||t,c=n.canvasHeight||i;return s.width=p*d,s.height=c*d,n.skipAutoScale||fC(s),s.style.width=`${p}`,s.style.height=`${c}`,n.backgroundColor&&(l.fillStyle=n.backgroundColor,l.fillRect(0,0,s.width,s.height)),l.drawImage(o,0,0,s.width,s.height),s}async function n3(e,n={}){const t=await N2(e,n);return await xC(t)}async function t3(e,n={}){return F2(e,n)}var i3={trailer:59};function E2(e=256){let n=0,t=new Uint8Array(e);return{get buffer(){return t.buffer},reset(){n=0},bytesView(){return t.subarray(0,n)},bytes(){return t.slice(0,n)},writeByte(a){i(n+1),t[n]=a,n++},writeBytes(a,o=0,s=a.length){i(n+s);for(let l=0;l<s;l++)t[n++]=a[l+o]},writeBytesView(a,o=0,s=a.byteLength){i(n+s),t.set(a.subarray(o,o+s),n),n+=s}};function i(a){var o=t.length;if(o>=a)return;var s=1024*1024;a=Math.max(a,o*(o<s?2:1.125)>>>0),o!=0&&(a=Math.max(a,256));let l=t;t=new Uint8Array(a),n>0&&t.set(l.subarray(0,n),0)}}var zo=12,Ol=5003,a3=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function o3(e,n,t,i,a=E2(512),o=new Uint8Array(256),s=new Int32Array(Ol),l=new Int32Array(Ol)){let d=s.length,p=Math.max(2,i);o.fill(0),l.fill(0),s.fill(-1);let c=0,u=0,g=p+1,w=g,y=!1,h=w,x=(1<<h)-1,$=1<<g-1,k=$+1,F=$+2,_=0,O=t[0],H=0;for(let K=d;K<65536;K*=2)++H;H=8-H,a.writeByte(p),Y($);let L=t.length;for(let K=1;K<L;K++)e:{let se=t[K],I=(se<<zo)+O,z=se<<H^O;if(s[z]===I){O=l[z];break e}let D=z===0?1:d-z;for(;s[z]>=0;)if(z-=D,z<0&&(z+=d),s[z]===I){O=l[z];break e}Y(O),O=se,F<1<<zo?(l[z]=F++,s[z]=I):(s.fill(-1),F=$+2,y=!0,Y($))}return Y(O),Y(k),a.writeByte(0),a.bytesView();function Y(K){for(c&=a3[u],u>0?c|=K<<u:c=K,u+=h;u>=8;)o[_++]=c&255,_>=254&&(a.writeByte(_),a.writeBytesView(o,0,_),_=0),c>>=8,u-=8;if((F>x||y)&&(y?(h=w,x=(1<<h)-1,y=!1):(++h,x=h===zo?1<<h:(1<<h)-1)),K==k){for(;u>0;)o[_++]=c&255,_>=254&&(a.writeByte(_),a.writeBytesView(o,0,_),_=0),c>>=8,u-=8;_>0&&(a.writeByte(_),a.writeBytesView(o,0,_),_=0)}}}var r3=o3;function _2(e,n,t){return e<<8&63488|n<<2&992|t>>3}function B2(e,n,t,i){return e>>4|n&240|(t&240)<<4|(i&240)<<8}function A2(e,n,t){return e>>4<<8|n&240|t>>4}function Zi(e,n,t){return e<n?n:e>t?t:e}function sa(e){return e*e}function Vl(e,n,t){var i=0,a=1e100;let o=e[n],s=o.cnt;o.ac;let l=o.rc,d=o.gc,p=o.bc;for(var c=o.fw;c!=0;c=e[c].fw){let g=e[c],w=g.cnt,y=s*w/(s+w);if(!(y>=a)){var u=0;u+=y*sa(g.rc-l),!(u>=a)&&(u+=y*sa(g.gc-d),!(u>=a)&&(u+=y*sa(g.bc-p),!(u>=a)&&(a=u,i=c)))}}o.err=a,o.nn=i}function Fo(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function s3(e,n){let t=n==="rgb444"?4096:65536,i=new Array(t),a=e.length;if(n==="rgba4444")for(let o=0;o<a;++o){let s=e[o],l=s>>24&255,d=s>>16&255,p=s>>8&255,c=s&255,u=B2(c,p,d,l),g=u in i?i[u]:i[u]=Fo();g.rc+=c,g.gc+=p,g.bc+=d,g.ac+=l,g.cnt++}else if(n==="rgb444")for(let o=0;o<a;++o){let s=e[o],l=s>>16&255,d=s>>8&255,p=s&255,c=A2(p,d,l),u=c in i?i[c]:i[c]=Fo();u.rc+=p,u.gc+=d,u.bc+=l,u.cnt++}else for(let o=0;o<a;++o){let s=e[o],l=s>>16&255,d=s>>8&255,p=s&255,c=_2(p,d,l),u=c in i?i[c]:i[c]=Fo();u.rc+=p,u.gc+=d,u.bc+=l,u.cnt++}return i}function l3(e,n,t={}){let{format:i="rgb565",clearAlpha:a=!0,clearAlphaColor:o=0,clearAlphaThreshold:s=0,oneBitAlpha:l=!1}=t;if(!e||!e.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(e instanceof Uint8Array)&&!(e instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let d=new Uint32Array(e.buffer),p=t.useSqrt!==!1,c=i==="rgba4444",u=s3(d,i),g=u.length,w=g-1,y=new Uint32Array(g+1);for(var h=0,x=0;x<g;++x){let j=u[x];if(j!=null){var $=1/j.cnt;c&&(j.ac*=$),j.rc*=$,j.gc*=$,j.bc*=$,u[h++]=j}}sa(n)/h<.022&&(p=!1);for(var x=0;x<h-1;++x)u[x].fw=x+1,u[x+1].bk=x,p&&(u[x].cnt=Math.sqrt(u[x].cnt));p&&(u[x].cnt=Math.sqrt(u[x].cnt));var k,F,_;for(x=0;x<h;++x){Vl(u,x);var O=u[x].err;for(F=++y[0];F>1&&(_=F>>1,!(u[k=y[_]].err<=O));F=_)y[F]=k;y[F]=x}var H=h-n;for(x=0;x<H;){for(var L;;){var Y=y[1];if(L=u[Y],L.tm>=L.mtm&&u[L.nn].mtm<=L.tm)break;L.mtm==w?Y=y[1]=y[y[0]--]:(Vl(u,Y),L.tm=x);var O=u[Y].err;for(F=1;(_=F+F)<=y[0]&&(_<y[0]&&u[y[_]].err>u[y[_+1]].err&&_++,!(O<=u[k=y[_]].err));F=_)y[F]=k;y[F]=Y}var K=u[L.nn],se=L.cnt,I=K.cnt,$=1/(se+I);c&&(L.ac=$*(se*L.ac+I*K.ac)),L.rc=$*(se*L.rc+I*K.rc),L.gc=$*(se*L.gc+I*K.gc),L.bc=$*(se*L.bc+I*K.bc),L.cnt+=K.cnt,L.mtm=++x,u[K.bk].fw=K.fw,u[K.fw].bk=K.bk,K.mtm=w}let z=[];var D=0;for(x=0;;++D){let j=Zi(Math.round(u[x].rc),0,255),W=Zi(Math.round(u[x].gc),0,255),Z=Zi(Math.round(u[x].bc),0,255),J=255;c&&(J=Zi(Math.round(u[x].ac),0,255),l&&(J=J<=(typeof l=="number"?l:127)?0:255),a&&J<=s&&(j=W=Z=o,J=0));let P=c?[j,W,Z,J]:[j,W,Z];if(d3(z,P)||z.push(P),(x=u[x].fw)==0)break}return z}function d3(e,n){for(let t=0;t<e.length;t++){let i=e[t],a=i[0]===n[0]&&i[1]===n[1]&&i[2]===n[2],o=i.length>=4&&n.length>=4?i[3]===n[3]:!0;if(a&&o)return!0}return!1}function p3(e,n,t="rgb565"){if(!e||!e.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(e instanceof Uint8Array)&&!(e instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(n.length>256)throw new Error("applyPalette() only works with 256 colors or less");let i=new Uint32Array(e.buffer),a=i.length,o=t==="rgb444"?4096:65536,s=new Uint8Array(a),l=new Array(o);if(t==="rgba4444")for(let d=0;d<a;d++){let p=i[d],c=p>>24&255,u=p>>16&255,g=p>>8&255,w=p&255,y=B2(w,g,u,c),h=y in l?l[y]:l[y]=c3(w,g,u,c,n);s[d]=h}else{let d=t==="rgb444"?A2:_2;for(let p=0;p<a;p++){let c=i[p],u=c>>16&255,g=c>>8&255,w=c&255,y=d(w,g,u),h=y in l?l[y]:l[y]=u3(w,g,u,n);s[p]=h}}return s}function c3(e,n,t,i,a){let o=0,s=1e100;for(let l=0;l<a.length;l++){let d=a[l],p=d[3],c=It(p-i);if(c>s)continue;let u=d[0];if(c+=It(u-e),c>s)continue;let g=d[1];if(c+=It(g-n),c>s)continue;let w=d[2];c+=It(w-t),!(c>s)&&(s=c,o=l)}return o}function u3(e,n,t,i){let a=0,o=1e100;for(let s=0;s<i.length;s++){let l=i[s],d=l[0],p=It(d-e);if(p>o)continue;let c=l[1];if(p+=It(c-n),p>o)continue;let u=l[2];p+=It(u-t),!(p>o)&&(o=p,a=s)}return a}function It(e){return e*e}function g3(e={}){let{initialCapacity:n=4096,auto:t=!0}=e,i=E2(n),a=5003,o=new Uint8Array(256),s=new Int32Array(a),l=new Int32Array(a),d=!1;return{reset(){i.reset(),d=!1},finish(){i.writeByte(i3.trailer)},bytes(){return i.bytes()},bytesView(){return i.bytesView()},get buffer(){return i.buffer},get stream(){return i},writeHeader:p,writeFrame(c,u,g,w={}){let{transparent:y=!1,transparentIndex:h=0,delay:x=0,palette:$=null,repeat:k=0,colorDepth:F=8,dispose:_=-1}=w,O=!1;if(t?d||(O=!0,p(),d=!0):O=!!w.first,u=Math.max(0,Math.floor(u)),g=Math.max(0,Math.floor(g)),O){if(!$)throw new Error("First frame must include a { palette } option");f3(i,u,g,$,F),Ul(i,$),k>=0&&x3(i,k)}let H=Math.round(x/10);m3(i,_,H,y,h);let L=!!$&&!O;h3(i,u,g,L?$:null),L&&Ul(i,$),b3(i,c,u,g,F,o,s,l)}};function p(){M2(i,"GIF89a")}}function m3(e,n,t,i,a){e.writeByte(33),e.writeByte(249),e.writeByte(4),a<0&&(a=0,i=!1);var o,s;i?(o=1,s=2):(o=0,s=0),n>=0&&(s=n&7),s<<=2,e.writeByte(0|s|0|o),tt(e,t),e.writeByte(a||0),e.writeByte(0)}function f3(e,n,t,i,a=8){let o=1,s=0,l=Nr(i.length)-1,d=o<<7|a-1<<4|s<<3|l;tt(e,n),tt(e,t),e.writeBytes([d,0,0])}function x3(e,n){e.writeByte(33),e.writeByte(255),e.writeByte(11),M2(e,"NETSCAPE2.0"),e.writeByte(3),e.writeByte(1),tt(e,n),e.writeByte(0)}function Ul(e,n){let t=1<<Nr(n.length);for(let i=0;i<t;i++){let a=[0,0,0];i<n.length&&(a=n[i]),e.writeByte(a[0]),e.writeByte(a[1]),e.writeByte(a[2])}}function h3(e,n,t,i){if(e.writeByte(44),tt(e,0),tt(e,0),tt(e,n),tt(e,t),i){let a=0,o=0,s=Nr(i.length)-1;e.writeByte(128|a|o|0|s)}else e.writeByte(0)}function b3(e,n,t,i,a=8,o,s,l){r3(t,i,n,a,e,o,s,l)}function tt(e,n){e.writeByte(n&255),e.writeByte(n>>8&255)}function M2(e,n){for(var t=0;t<n.length;t++)e.writeByte(n.charCodeAt(t))}function Nr(e){return Math.max(Math.ceil(Math.log2(e)),1)}const ir=2,j2=["workflowType","resourceLevel","resourceDrafts","activity","pages","currentTemplateId","activePageId","selectedDimension","prdTextInput","prdBlueprintPasteTemplateName","prdBlueprintPasteVersions","prdBlueprintPasteModuleVersions","prdBlueprintPasteRows","prdTableRows","prdManualModuleVersions","selectedDemoPackageId","selectedBlueprintAudienceId","selectedBlueprintSceneId","prdTableBlueprint","prdTableBlueprintSignature","pageTemplateBlueprintStates","pageTemplateChildStates","guidedHeaderLevelId","guidedHeaderLevelDrafts","guidedHeaderDefaultPageSnapshots","guidedLotteryPrizeOverrides","guidedVisiblePageIds","guidedVisibleCompanionNodeIds","prdTemplatePreviewVersions","guidedLineageVersion","selectedLineageVariantId"],y3={selectedId:null,dropIndex:null,dropPageId:null,dropMoleculeId:null,dropChildIndex:null,draggingNodeId:null,pointerDrag:null,suppressClick:!1,colorPanelOpen:!1,variantPanelOpen:!1,propsPanelOpen:!1,richtextEditorOpen:!1,canvasColorPanelOpen:!1,guidedPanelMode:null,guidedStateMenuNodeId:null,guidedAddTargetContext:null};function Vn(e){if(e!==void 0)return JSON.parse(JSON.stringify(e))}function w3(e,{appVersion:n="",activePageTemplate:t=null,referencedPageTemplates:i=[],referencedMoleculeTemplates:a=[],stage:o="blueprint"}={}){const s={};return j2.forEach(l=>{e[l]!==void 0&&(s[l]=Vn(e[l]))}),{schemaVersion:ir,appVersion:n,savedAt:new Date().toISOString(),source:{prdUrl:String(e.prdFeishuUrl||""),prdText:String(e.prdTextInput||""),templateName:String(e.prdBlueprintPasteTemplateName||"")},editor:s,templates:{activePageTemplate:Vn(t),referencedPageTemplates:Vn(i),referencedMoleculeTemplates:Vn(a)},resume:{stage:o==="preview"?"preview":"blueprint"}}}function v3(e){return!!(e&&typeof e=="object"&&!Array.isArray(e)&&Number.isInteger(e.schemaVersion)&&e.schemaVersion>0&&e.editor&&typeof e.editor=="object"&&Array.isArray(e.editor.pages))}function S3(e){var t,i,a,o,s,l,d,p,c;const n=Vn(e);return n.source||(n.source={}),n.editor||(n.editor={}),n.templates||(n.templates={}),n.resume||(n.resume={}),(t=n.source).prdUrl||(t.prdUrl=""),(i=n.source).prdText||(i.prdText=n.editor.prdTextInput||""),(a=n.source).templateName||(a.templateName=n.editor.prdBlueprintPasteTemplateName||""),(o=n.editor).activity||(o.activity={name:"未命名活动",note:"活动 → 维度 → 页面 → 模块 → 变体"}),(s=n.editor).pages||(s.pages=[]),(l=n.editor).guidedLotteryPrizeOverrides||(l.guidedLotteryPrizeOverrides=null),(d=n.templates).activePageTemplate||(d.activePageTemplate=null),(p=n.templates).referencedPageTemplates||(p.referencedPageTemplates=[]),(c=n.templates).referencedMoleculeTemplates||(c.referencedMoleculeTemplates=[]),n.resume.stage=n.resume.stage==="preview"?"preview":"blueprint",n}function T3(e){var t,i,a;const n=Vn(e);return n.schemaVersion=2,n.editor||(n.editor={}),(t=n.editor).workflowType||(t.workflowType="venue"),(i=n.editor).resourceLevel||(i.resourceLevel="daily"),(a=n.editor).resourceDrafts||(a.resourceDrafts={}),n}function $3(e){if(!e||typeof e!="object")throw new Error("项目快照不存在");if(e.schemaVersion>ir)throw new Error("该项目由更高版本创建，请先更新应用");let n=Vn(e);for(;n.schemaVersion<ir;){if(n.schemaVersion===1){n=T3(n);continue}throw new Error(`暂不支持快照版本 ${n.schemaVersion}`)}if(n=S3(n),!v3(n))throw new Error("项目快照格式无效");return n}function C3(e,n){const t=$3(n);return j2.forEach(a=>{t.editor[a]!==void 0&&(e[a]=Vn(t.editor[a]))}),e.prdFeishuUrl=String(t.source.prdUrl||""),e.prdTextInput=String(t.editor.prdTextInput??t.source.prdText??""),e.prdBlueprintPasteTemplateName=String(t.editor.prdBlueprintPasteTemplateName??t.source.templateName??""),Object.assign(e,Vn(y3)),e.pages.some(a=>a.id===e.activePageId)||(e.activePageId=e.pages[0]?.id||""),e.selectedDimension||(e.selectedDimension=e.pages[0]?.dimension||"默认维度"),t}class va extends Error{constructor(n,{status:t=0,code:i="NETWORK_ERROR"}={}){super(n),this.name="ProjectHistoryApiError",this.status=t,this.code=i}}async function mt(e,n={}){let t;try{t=await fetch(`/api${e}`,{credentials:"same-origin",...n,headers:{...n.body?{"Content-Type":"application/json"}:{},...n.headers}})}catch{throw new va("网络连接失败，本次修改已保存在本地",{code:"NETWORK_ERROR"})}const i=await t.json().catch(()=>null);if(!t.ok||!i?.success)throw new va(i?.error||`请求失败（${t.status}）`,{status:t.status,code:i?.code||"REQUEST_FAILED"});return i.data}function R2(){return mt("/me")}async function I3(){return(await mt("/projects")).projects||[]}function k3({name:e,prdUrl:n,templateId:t,snapshot:i,scope:a="personal",teamId:o=null}){return mt("/projects",{method:"POST",body:JSON.stringify({name:e,prdUrl:n,templateId:t,snapshot:i,scope:a,teamId:o})})}function P3(e,{baseVersionId:n,snapshot:t}){return mt(`/projects/${encodeURIComponent(e)}/autosave`,{method:"PUT",body:JSON.stringify({baseVersionId:n,snapshot:t})})}function z3(e,{baseVersionId:n,snapshot:t}){return mt(`/projects/${encodeURIComponent(e)}/versions`,{method:"POST",body:JSON.stringify({baseVersionId:n,snapshot:t})})}async function F3(e){return(await mt(`/projects/${encodeURIComponent(e)}/versions`)).versions||[]}async function H2(e,n){return(await mt(`/projects/${encodeURIComponent(e)}/versions/${encodeURIComponent(n)}`)).version}function N3(e){return mt(`/projects/${encodeURIComponent(e)}`,{method:"DELETE"})}const E3="h5-builder-project-history",_3=1,Sa="drafts";function B3(){return new Promise((e,n)=>{const t=indexedDB.open(E3,_3);t.onupgradeneeded=()=>{const i=t.result;if(!i.objectStoreNames.contains(Sa)){const a=i.createObjectStore(Sa,{keyPath:"id"});a.createIndex("ownerId","ownerId",{unique:!1}),a.createIndex("updatedAt","updatedAt",{unique:!1})}},t.onsuccess=()=>e(t.result),t.onerror=()=>n(t.error)})}async function qa(e,n){const t=await B3();try{return await new Promise((i,a)=>{const o=t.transaction(Sa,e),s=o.objectStore(Sa),l=n(s);l.onsuccess=()=>i(l.result),l.onerror=()=>a(l.error),o.onerror=()=>a(o.error)})}finally{t.close()}}async function D2({id:e,ownerId:n="anonymous",projectId:t=null,baseVersionId:i=null,name:a,snapshot:o,synced:s=!1,scope:l="personal",teamId:d=null}){const p={id:e,ownerId:n,projectId:t,baseVersionId:i,name:String(a||"未命名活动"),snapshot:o,synced:s,scope:l==="team"?"team":"personal",teamId:l==="team"?d:null,updatedAt:new Date().toISOString()};return await qa("readwrite",c=>c.put(p)),p}async function Kl(e="anonymous"){return(await qa("readonly",t=>t.index("ownerId").getAll(e))||[]).sort((t,i)=>new Date(i.updatedAt)-new Date(t.updatedAt))}function L2(e){return qa("readonly",n=>n.get(e))}function A3(e){return qa("readwrite",n=>n.delete(e))}const G2="h5_builder_collaboration_v1",cn=()=>new Date().toISOString(),Er=e=>`${e}_${Date.now()}_${Math.random().toString(16).slice(2)}`;function Ta(e={}){const n=String(e.id||e.employeeId||e.userId||e.openId||"").trim();return n?{id:n,name:String(e.name||"未命名用户").trim()||"未命名用户",avatarUrl:String(e.avatarUrl||e.avatar||"").trim(),role:e.role==="admin"||e.isAdmin?"admin":"member"}:null}function O2(e,n={}){const t=Ta(e),i=new Set((n.adminIds||[]).map(a=>String(a).trim()));return t&&i.has(t.id)&&(t.role="admin"),{version:1,users:t?[t]:[],teams:[],records:[],updatedAt:cn()}}function V2(e,n,t={}){const i=e&&typeof e=="object"?{version:1,users:Array.isArray(e.users)?e.users.map(Ta).filter(Boolean):[],teams:Array.isArray(e.teams)?e.teams:[],records:Array.isArray(e.records)?e.records:[],updatedAt:e.updatedAt||cn()}:O2(n,t),a=Ta(n),o=new Set((t.adminIds||[]).map(s=>String(s).trim()));if(a){o.has(a.id)&&(a.role="admin");const s=i.users.findIndex(l=>l.id===a.id);s>=0?i.users[s]={...i.users[s],avatarUrl:a.avatarUrl||i.users[s].avatarUrl,role:a.role==="admin"?"admin":i.users[s].role}:i.users.push(a)}return i.teams=i.teams.filter(s=>s&&s.id).map(s=>({id:String(s.id),name:String(s.name||"未命名组"),createdAt:s.createdAt||cn(),updatedAt:s.updatedAt||cn()})),i.records=i.records.filter(s=>s&&s.id&&s.ownerId).map(s=>({...s,id:String(s.id),ownerId:String(s.ownerId),scope:s.scope==="team"?"team":"personal",teamId:s.scope==="team"?String(s.teamId||""):null})),i}function M3(e,n={}){if(typeof localStorage>"u")return O2(e,n);let t=null;try{t=JSON.parse(localStorage.getItem(G2)||"null")}catch{t=null}const i=V2(t,e,n);return Mt(i),i}function Mt(e){const n={...e,updatedAt:cn()};return typeof localStorage<"u"&&localStorage.setItem(G2,JSON.stringify(n)),n}function j3(e,{id:n,name:t,role:i="member"}){const a=Ta({id:n,name:t,role:i});if(!a)throw new Error("请输入用户 ID");if(e.users.some(o=>o.id===a.id))throw new Error("该用户已存在");return Mt({...e,users:[...e.users,a]})}function R3(e,n,t){const i=String(t||"").trim();if(!i)throw new Error("用户名称不能为空");return Mt({...e,users:e.users.map(a=>a.id===String(n)?{...a,name:i}:a)})}function ql(e,{name:n}){const t=String(n||"").trim();if(!t)throw new Error("组名称不能为空");if(e.teams.some(a=>a.name===t))throw new Error("该组已存在");const i=cn();return Mt({...e,teams:[...e.teams,{id:Er("team"),name:t,createdAt:i,updatedAt:i}]})}function H3(e,n,{name:t}){const i=String(t||"").trim();if(!i)throw new Error("组名称不能为空");const a=String(n);if(e.teams.some(o=>o.id!==a&&o.name===i))throw new Error("该组已存在");return Mt({...e,teams:e.teams.map(o=>o.id===a?{...o,name:i,updatedAt:cn()}:o)})}function $a(e,n){const t=String(n.id||n.projectId||Er("record")),i={id:t,projectId:n.projectId?String(n.projectId):null,ownerId:String(n.ownerId||""),name:String(n.name||"未命名活动"),scope:n.scope==="team"?"team":"personal",teamId:n.scope==="team"?String(n.teamId||""):null,snapshot:n.snapshot||null,updatedAt:n.updatedAt||cn(),createdAt:n.createdAt||cn()},a=e.records.findIndex(s=>s.id===t),o=[...e.records];return a>=0?o[a]={...o[a],...i,createdAt:o[a].createdAt||i.createdAt}:o.unshift(i),Mt({...e,records:o})}function D3(e,n,t){const i=String(n);if(!e.records.find(o=>o.id===i))throw new Error("历史记录不存在");return Mt({...e,records:e.records.map(o=>o.id===i?{...o,...t,id:i,updatedAt:cn()}:o)})}function Wl(e,n,{ownerId:t,scope:i="personal",teamId:a=null}){const o=e.records.find(s=>s.id===String(n));if(!o)throw new Error("历史记录不存在");return $a(e,{...o,id:Er("record"),projectId:null,ownerId:t,scope:i,teamId:i==="team"?a:null,name:`${o.name} - 副本`,createdAt:cn(),updatedAt:cn()})}function L3(e,n,t="personal",i=null){const a=String(n||"");return t==="team"?e.records.filter(o=>o.scope==="team"&&(!i||o.teamId===String(i))).sort((o,s)=>new Date(s.updatedAt)-new Date(o.updatedAt)):e.records.filter(o=>o.scope==="personal"&&o.ownerId===a).sort((o,s)=>new Date(s.updatedAt)-new Date(o.updatedAt))}class Xl extends Error{constructor(n,{status:t=0,code:i="NETWORK_ERROR"}={}){super(n),this.name="CollaborationApiError",this.status=t,this.code=i}}async function ji(e,n={}){let t;try{t=await fetch(`/api${e}`,{credentials:"same-origin",...n,headers:{...n.body?{"Content-Type":"application/json"}:{},...n.headers}})}catch{throw new Xl("协作服务暂时无法连接")}const i=await t.json().catch(()=>null);if(!t.ok||!i?.success)throw new Xl(i?.error||`请求失败（${t.status}）`,{status:t.status,code:i?.code||"REQUEST_FAILED"});return i.data}async function G3(){return(await ji("/collaboration/bootstrap")).state}async function U2(e){return(await ji("/collaboration/sync",{method:"PUT",body:JSON.stringify({state:e})})).state}async function O3(e,n){return(await ji(`/collaboration/records/${encodeURIComponent(e)}`,{method:"PATCH",body:JSON.stringify(n)})).record}async function V3(e){return!!(await ji("/admin/unlock",{method:"POST",body:JSON.stringify({password:e})})).unlocked}function _r(){return ji("/admin/lock",{method:"POST"})}const Xe=750,Yl=24,Ca=400,K2=32,q2=16,W2=358,X2=1502,Y2=154,J2=1759,Qt="#E2DCFF",U3="00",ar=3,K3=8;function Ii(e){return{5:"30",6:"68",9:"98",10:"100",12:"150",16:"198",22:"280"}[String(e||"").trim()]||U3}const q3=Object.assign({"../S级-中秋头图/schema.json":ET,"../任务条-样式1-点击后/schema.json":BT,"../任务条-样式1/schema.json":MT,"../任务条-样式2/schema.json":RT,"../内容按钮/schema.json":DT,"../内容案例-样式1/schema.json":GT,"../内容案例-样式2/schema.json":VT,"../内容诊断-样式1-点击前/schema.json":KT,"../内容诊断-账号诊断/schema.json":WT,"../发券-样式1/schema.json":YT,"../发券-样式2/schema.json":ZT,"../发券-样式3/schema.json":e4,"../发券-样式4-已结束/schema.json":t4,"../发券-样式4-已预约/schema.json":a4,"../发券-样式4-立即抢/schema.json":r4,"../发券-样式4/schema.json":l4,"../大按钮/schema.json":p4,"../头图/schema.json":u4,"../奖品-流量券/schema.json":m4,"../官方小助手/schema.json":x4,"../弹窗-中奖/schema.json":b4,"../弹窗-未中奖/schema.json":w4,"../投稿赢流量-样式2/schema.json":S4,"../抽奖+消耗返3-3个券/schema.json":$4,"../抽奖九宫格-报名前/schema.json":I4,"../抽奖九宫格-报名后/schema.json":P4,"../抽奖样式2/schema.json":F4,"../按钮-3-规则可视-点击后/schema.json":E4,"../按钮-3-规则可视/schema.json":B4,"../提示/schema.json":M4,"../无活动提示/schema.json":R4,"../智投星内容/schema.json":D4,"../查看更多/schema.json":G4,"../标题+抽奖次数/schema.json":V4,"../模块标题-正常/schema.json":K4,"../横排按钮数据条/schema.json":W4,"../正文-带底框样式1/schema.json":Y4,"../正文-带底框样式2/schema.json":Z4,"../正文-带底框样式3/schema.json":e5,"../正文-带消耗阶梯/schema.json":t5,"../正文-活动规则样式1/schema.json":a5,"../正文-活动规则样式2/schema.json":r5,"../正文-活动规则样式3/schema.json":l5,"../正文-用户教育/schema.json":p5,"../流量扶持券/schema.json":u5,"../消耗返-样式1-3个券/schema.json":m5,"../消耗返样式4个券/schema.json":x5,"../消返券-样式1-3个券-已领取/schema.json":b5,"../消返券-样式1-3个券-立即领单个/schema.json":w5,"../置底按钮/schema.json":S5,"../节点指南-内容/schema.json":$5,"../诊断建议-样式1/schema.json":I5,"../诊断建议-样式2/schema.json":P5,"../说明文-补充说明/schema.json":F5,"../账户优惠券提示/schema.json":E5,"../资源位/下单页弹窗/schema.json":B5,"../资源位/个人中心banner/schema.json":M5,"../资源位/挂件/schema.json":R5,"../资源位/资源弹窗1/schema.json":D5,"../资源位/资源弹窗2/schema.json":G5,"../资源位/顶部banner/schema.json":V5,"../通知/schema.json":K5,"../随机奖品填写地址/schema.json":W5}),W3=Object.assign({"../S级-中秋头图/index.module.scss":X5,"../任务条-样式1-点击后/index.module.scss":Y5,"../任务条-样式1/index.module.scss":J5,"../任务条-样式2/index.module.scss":Z5,"../内容按钮/index.module.scss":Q5,"../内容案例-样式1/index.module.scss":e$,"../内容案例-样式2/index.module.scss":n$,"../内容诊断-样式1-点击前/index.module.scss":t$,"../内容诊断-账号诊断/index.module.scss":i$,"../发券-样式1/index.module.scss":a$,"../发券-样式2/index.module.scss":o$,"../发券-样式3/index.module.scss":r$,"../发券-样式4-已结束/index.module.scss":s$,"../发券-样式4-已预约/index.module.scss":l$,"../发券-样式4-立即抢/index.module.scss":d$,"../发券-样式4/index.module.scss":p$,"../大按钮/index.module.scss":c$,"../头图/index.module.scss":u$,"../奖品-流量券/index.module.scss":g$,"../官方小助手/index.module.scss":m$,"../弹窗-中奖/index.module.scss":f$,"../弹窗-未中奖/index.module.scss":x$,"../投稿赢流量-样式2/index.module.scss":h$,"../抽奖+消耗返3-3个券/index.module.scss":b$,"../抽奖九宫格-报名前/index.module.scss":y$,"../抽奖九宫格-报名后/index.module.scss":w$,"../抽奖样式2/index.module.scss":v$,"../按钮-3-规则可视-点击后/index.module.scss":S$,"../按钮-3-规则可视/index.module.scss":T$,"../提示/index.module.scss":$$,"../无活动提示/index.module.scss":C$,"../智投星内容/index.module.scss":I$,"../查看更多/index.module.scss":k$,"../标题+抽奖次数/index.module.scss":P$,"../模块标题-正常/index.module.scss":z$,"../横排按钮数据条/index.module.scss":F$,"../正文-带底框样式1/index.module.scss":N$,"../正文-带底框样式2/index.module.scss":E$,"../正文-带底框样式3/index.module.scss":_$,"../正文-带消耗阶梯/index.module.scss":B$,"../正文-活动规则样式1/index.module.scss":A$,"../正文-活动规则样式2/index.module.scss":M$,"../正文-活动规则样式3/index.module.scss":j$,"../正文-用户教育/index.module.scss":R$,"../流量扶持券/index.module.scss":H$,"../消耗返-样式1-3个券/index.module.scss":D$,"../消耗返样式4个券/index.module.scss":L$,"../消返券-样式1-3个券-已经领取/index.module.scss":G$,"../消返券-样式1-3个券-已领取/index.module.scss":O$,"../消返券-样式1-3个券-立即领单个/index.module.scss":V$,"../置底按钮/index.module.scss":U$,"../节点指南-内容/index.module.scss":K$,"../诊断建议-样式1/index.module.scss":q$,"../诊断建议-样式2/index.module.scss":W$,"../说明文-补充说明/index.module.scss":X$,"../账户优惠券提示/index.module.scss":Y$,"../资源位/下单页弹窗/index.module.scss":J$,"../资源位/个人中心banner/index.module.scss":Z$,"../资源位/分层主视觉/index.module.scss":Q$,"../资源位/挂件/index.module.scss":eC,"../资源位/资源弹窗1/index.module.scss":nC,"../资源位/资源弹窗2/index.module.scss":tC,"../资源位/顶部banner/index.module.scss":iC,"../通知/index.module.scss":aC,"../随机奖品填写地址/index.module.scss":oC}),X3=Object.assign({"../头图/主体替换/主体替换-方案1.png":rC,"../头图/主体替换/主体替换-方案2.png":sC,"../头图/主体替换/主体替换-方案3.png":lC,"../头图/主体替换/主体替换-方案4.png":dC}),Z2=new URL(""+new URL("主视觉-B9birl0w.png",import.meta.url).href,import.meta.url).href,Y3=new URL(""+new URL("顶栏-O6FMUs0s.svg",import.meta.url).href,import.meta.url).href,Br=new URL("../内容模块.png",import.meta.url).href,J3=new URL("../内容模块2.png",import.meta.url).href,Z3=new URL(""+new URL("image_1-BSF_c5Ff.png",import.meta.url).href,import.meta.url).href,Ge=[{id:"traffic_coupon",name:"10元流量券",image:new URL(""+new URL("10元流量券-PnCbOMKs.png",import.meta.url).href,import.meta.url).href,type:"traffic_coupon",copyAmount:"10",copyThreshold:"100",copy:"满100元赠价值10元流量",optionLabel:"流量券"},{id:"official_recommendation",name:"DOU+官方推荐机会",image:new URL(""+new URL("dou_官方推荐机会-DK-3FQDv.png",import.meta.url).href,import.meta.url).href,type:"official_recommendation",copy:"「DOU+小助手」官方账号给你的视频点赞并推荐"},{id:"douzi_merch",name:"DOU仔周边",image:new URL(""+new URL("dou仔周边-VkFQPlfW.png",import.meta.url).href,import.meta.url).href,type:"douzi_merch",copy:""},{id:"douzi_family_pack",name:"DOU仔随机周边",image:new URL(""+new URL("dou仔周边全家福-DfBcT0yC.png",import.meta.url).href,import.meta.url).href,type:"douzi_family_pack",copy:`毛绒公仔/毛绒挂件/AI抖仔挂件/盲盒/冰箱贴
随机发一件`},{id:"douzi_canvas_bag",name:"DOU仔帆布包",image:new URL(""+new URL("dou仔周边帆布包-hpmj6Gbp.png",import.meta.url).href,import.meta.url).href,type:"douzi_canvas_bag",copy:""},{id:"douzi_keychain",name:"DOU仔挂件",image:new URL(""+new URL("dou仔挂件-CoWABFzm.png",import.meta.url).href,import.meta.url).href,type:"douzi_keychain",copy:""},{id:"douzi_doll",name:"DOU仔玩偶",image:new URL(""+new URL("dou仔玩偶-Cmm6N4NI.png",import.meta.url).href,import.meta.url).href,type:"douzi_doll",copy:""},{id:"coupon_pack",name:"1000元心动券包",image:new URL(""+new URL("券包-BL1llfL7.png",import.meta.url).href,import.meta.url).href,copy:""},{id:"jianying_vip",name:"剪映VIP",image:new URL(""+new URL("剪映vip-DxLPofah.png",import.meta.url).href,import.meta.url).href,type:"jianying_vip",copy:""},{id:"traffic_support",name:"流量扶持",image:new URL(""+new URL("流量扶持-C4HfzMJ1.png",import.meta.url).href,import.meta.url).href,type:"traffic_support",copy:""},{id:"points",name:"内容诊断积分",image:new URL(""+new URL("积分-D-ssRT2B.png",import.meta.url).href,import.meta.url).href,type:"content_diagnosis",copy:""}],Q3={"核心权益模块-bigday发券-样式1":"核心权益｜big-day发券","核心权益模块-bigday发券-样式1-已报名":"核心权益｜big-day发券（已报名）","核心权益模块-bigday发券-样式2":"核心权益｜预约抢券","核心权益模块-发券-样式2":"核心权益｜发券","核心玩法模块-抽奖消返-3列":"核心玩法｜抽奖消耗返","核心玩法模块-抽奖消返-4列":"核心玩法｜抽奖消耗返","核心玩法模块-抽奖-未报名":"核心玩法｜抽奖-九宫格","核心玩法模块-抽奖-已报名":"核心玩法｜抽奖-九宫格",投放抽奖:"核心玩法｜投放抽奖",任务列表:"核心玩法｜任务",投稿赢流量:"内容增长｜投稿赢流量","投稿赢流量-样式3":"内容增长｜流量扶持券","内容诊断-样式-点击后":"内容诊断｜生成报告后","内容诊断-优质视频提示":"内容诊断｜优质视频提示","诊断建议-样式1":"诊断建议","诊断建议-样式2":"诊断建议","用户教育案例-样式1":"用户教育｜案例展示","用户教育案例-样式2":"用户教育｜案例加行动按钮","用户教育-攻略":"用户教育｜投放攻略",AI智投:"产品教育｜AI 智投",节点指南:"节点营销｜行业内容指南",官方小助手模块:"用户教育｜官方小助手","模块标题-正常":"模块标题","任务条-样式1-点击后":"任务条｜已完成状态","内容诊断-样式1-点击前":"内容诊断｜入口卡片","内容诊断-账号诊断":"内容诊断｜账号问题提示","发券-样式1":"优惠券｜横幅领券",横排按钮数据条:"消耗与抽奖数据","正文-带消耗阶梯":"正文｜消耗阶梯",大按钮:"按钮",置底按钮:"底部行动按钮",账户优惠券提示:"账户优惠券提醒","S级-中秋头图":"S级-中秋头图"};function Hn(e,n=""){return Q3[e]||n||e||"模块"}function eI(e,n){const t=e.split("/").slice(-2)[0],i=n.id||t,a=(n.props||[]).map(o=>({...o,key:o.name||o.key,label:o.label||o.name||o.key,type:o.type||"string",default:o.default??"",description:o.description||""}));return{...n,id:i,name:Hn(i,n.title||n.name||t),type:"atom",description:n.description||"",reactComponent:n.reactComponent||t,dimensions:n.dimensions||null,props:a,category:n.category||"未分类",canvasOnly:!!n.canvasOnly}}function nI(e){if(!e)return[];const n=new Set,t=e.matchAll(/(--[a-z0-9-]+)\s*:/g);for(const a of t)n.add(a[1]);const i=e.matchAll(/var\(\s*(--[a-z0-9-]+)/g);for(const a of i)n.add(a[1]);return[...n].sort()}function tI(){const e=[];for(const[n,t]of Object.entries(q3)){const i=eI(n,t),a=n.replace(/\/schema\.json$/,"/index.module.scss"),o=W3[a],s=typeof o=="string"?o:o?.default||"",d=nI(s).map(p=>({key:`__css_var_${p.replace(/^--/,"")}`,label:`CSS变量 · ${p}`,type:"string",default:"",description:`覆盖 SCSS 中的 ${p}`,isCssVar:!0,cssVarName:p}));e.push({...i,props:[...i.props,...d]})}return e}const iI=tI(),aI=[];function oI(e,n){const t=new Map(n.map(o=>[o.id,o])),i=[],a=new Set;for(const o of e)if(t.has(o.id)){const s=t.get(o.id);i.push({...o,...s,dimensions:s.dimensions||o.dimensions}),a.add(o.id)}else i.push(o);for(const o of n)a.has(o.id)||i.push(o);return i}const jt=oI(aI,iI),Ar=new Set(["任务条-样式1-点击后","内容诊断-样式1-点击前","内容诊断-账号诊断","发券-样式1","置底按钮","账户优惠券提示"]);function Jl(e){return Ar.has(e?.id)}function rI(e,n,t){const i=(s,l="")=>`
    <option value="${f(s.id)}" ${s.id===t?"selected":""}>
      ${v(`${l}${s.name||s.id}`)}
    </option>
  `;if(e!=="atom")return n.map(s=>i(s)).join("");const a=n.filter(Jl),o=n.filter(s=>!Jl(s));return`
    <optgroup label="模块级原子">
      ${a.map(s=>i(s,"模块级｜")).join("")}
    </optgroup>
    <optgroup label="普通原子">
      ${o.map(s=>i(s)).join("")}
    </optgroup>
  `}const Q2=[{id:"核心权益模块-bigday发券-样式1",name:"核心权益模块-bigday发券-样式1",type:"molecule",description:"由标题、Bigday 发券样式 3、规则可视按钮、补充说明组成。支持「报名前 / 已报名」双状态切换，状态绑定的蓝图与画布预览自动同步。",className:"bigday-coupon-style1",children:[["模块标题-正常",{}],["发券-样式3",{}],["按钮-3-规则可视",{}],["说明文-补充说明",{}]],states:[{id:"default",name:"报名前",schemaId:"核心权益模块-bigday发券-样式1"},{id:"postSignup",name:"已报名",schemaId:"核心权益模块-bigday发券-样式1-已报名"}]},{id:"核心权益模块-bigday发券-样式1-已报名",name:"核心权益模块-bigday发券-样式1-已报名",type:"molecule",description:"【已报名状态】标题、Bigday 发券样式 3、点击后规则可视按钮（浅粉 #FF9ECA / 蓝 #FF8290 / 橘 #FF8571 三色系自动切换）、补充说明组成。与「样式1-报名前」共享双状态切换，原子组件的蓝图会自动组合为分子的蓝图并随原子同步变化。",className:"bigday-coupon-style1",children:[["模块标题-正常",{}],["发券-样式3",{}],["按钮-3-规则可视-点击后",{buttonText:"已报名"}],["说明文-补充说明",{}]],states:[{id:"default",name:"报名前",schemaId:"核心权益模块-bigday发券-样式1"},{id:"postSignup",name:"已报名",schemaId:"核心权益模块-bigday发券-样式1-已报名"}]},{id:"核心权益模块-bigday发券-样式2",name:"核心权益模块-bigday发券-样式2",type:"molecule",description:"由标题、通知、Bigday 发券样式 4 组成。",className:"bigday-coupon-style2",children:[["模块标题-正常",{iconType:"alarm"}],["通知",{}],["发券-样式4",{}]]},{id:"核心玩法模块-抽奖消返-3列",name:"核心玩法模块-抽奖消返-3列",type:"molecule",description:"由标题、3 列抽奖消返、数据条、活动规则样式 3、大按钮组成。",className:"lottery-consumption-return-3col",children:[["模块标题-正常",{}],["抽奖+消耗返3-3个券",{}],["横排按钮数据条",{}],["正文-活动规则样式3",{}],["大按钮",{}]]},{id:"核心玩法模块-抽奖消返-4列",name:"核心玩法模块-抽奖消返-4列",type:"molecule",description:"由标题、4 列消耗返、数据条、活动规则样式 3、大按钮组成。",className:"lottery-consumption-return-4col",children:[["模块标题-正常",{}],["消耗返样式4个券",{}],["横排按钮数据条",{}],["正文-活动规则样式3",{}],["大按钮",{}]]},{id:"核心玩法模块-抽奖-未报名",name:"核心玩法模块-抽奖-未报名",type:"molecule",description:"由标题+抽奖次数、提示、九宫格抽奖报名前、大按钮组成。",className:"lottery-unregistered-module",children:[["标题+抽奖次数",{}],["提示",{}],["抽奖九宫格-报名前",{}],["大按钮",{buttonText:"立即报名"}]]},{id:"核心玩法模块-抽奖-已报名",name:"核心玩法模块-抽奖-已报名",type:"molecule",description:"由标题+抽奖次数、提示、九宫格抽奖报名后、查看更多入口组成。",className:"lottery-registered-module",children:[["标题+抽奖次数",{}],["提示",{}],["抽奖九宫格-报名后",{}],["查看更多",{text:"内容诊断积分查看入口 >>"}]]},{id:"投稿赢流量",name:"投稿赢流量",type:"molecule",description:"由标题、投稿赢流量样式 2、大按钮、活动规则样式 2 组成。",className:"traffic-submission-module",children:[["模块标题-正常",{iconType:"folder",titleText:"话题投稿赢流量"}],["投稿赢流量-样式2",{}],["大按钮",{buttonText:"立即投稿"}],["正文-活动规则样式2",{}]]},{id:"投稿赢流量-样式3",name:"投稿赢流量-样式3",type:"molecule",description:"由标题、流量扶持券、大按钮、活动规则样式 3 组成。",className:"traffic-submission-style3-module",children:[["模块标题-正常",{iconType:"folder",titleText:"优质投稿 赢520元官方加热"}],["流量扶持券",{}],["大按钮",{buttonText:"立即投稿"}],["正文-活动规则样式3",{}]]},{id:"内容诊断-样式-点击后",name:"内容诊断-样式-点击后",type:"molecule",description:"由模块标题、诊断建议、查看更多和内容按钮组成。",className:"content-diagnosis-clicked-module",states:[{id:"default",name:"点击前",schemaId:"内容诊断-样式1-点击前",preserveProps:!0},{id:"clicked",name:"点击后",schemaId:"内容诊断-样式-点击后",preserveProps:!0}],children:[["模块标题-正常",{}],["诊断建议-样式1",{}],["查看更多",{}],["内容按钮",{}]]},{id:"内容诊断-优质视频提示",name:"内容诊断-优质视频提示",type:"molecule",description:"由模块标题、诊断建议样式 2 和内容按钮组成。",className:"content-diagnosis-quality-video-module",children:[["模块标题-正常",{}],["诊断建议-样式2",{}],["内容按钮",{}]]},{id:"用户教育案例-样式1",name:"用户教育案例-样式1",type:"molecule",description:"由模块标题和内容案例样式 2 组成，内容案例在分子容器内横向滑动。",className:"user-education-case-style1-module",children:[["模块标题-正常",{iconType:"fire",titleText:"TA们都用DOU+上热门"}],["内容案例-样式2",{}]]},{id:"用户教育案例-样式2",name:"用户教育案例-样式2",type:"molecule",description:"由模块标题、内容案例样式 1 和大按钮组成。",className:"user-education-case-style2-module",children:[["模块标题-正常",{iconType:"folder"}],["内容案例-样式1",{}],["大按钮",{buttonText:"马上试试"}]]},{id:"用户教育-攻略",name:"用户教育-攻略",type:"molecule",description:"由模块标题、用户教育正文和大按钮组成。",className:"user-education-guide-module",children:[["模块标题-正常",{iconType:"tip",titleText:"快速分享DOU+攻略"}],["正文-用户教育",{}],["大按钮",{buttonText:"立即投稿"}]]},{id:"AI智投",name:"AI智投",type:"molecule",description:"由模块标题、智投星内容和大按钮组成。",className:"ai-smart-invest-module",children:[["模块标题-正常",{titleText:"AI智投 全新上线",useUnifiedTypography:!0}],["智投星内容",{}],["大按钮",{buttonText:"立即体验"}]]},{id:"核心权益模块-发券-样式2",name:"核心权益模块-发券-样式2",type:"molecule",description:"由模块标题、发券样式 2 和大按钮组成。",className:"core-benefit-coupon-style2-module",children:[["模块标题-正常",{}],["发券-样式2",{}],["大按钮",{buttonText:"立即使用"}]]},{id:"投放抽奖",name:"投放抽奖",type:"molecule",description:"由模块标题、抽奖样式 2、消耗与抽奖数据、大按钮和消耗阶梯正文组成。",className:"placement-lottery-module",children:[["模块标题-正常",{iconType:"gift"}],["抽奖样式2",{}],["横排按钮数据条",{}],["大按钮",{buttonText:"立即抽奖"}],["正文-带消耗阶梯",{}]]},{id:"节点指南",name:"节点指南",type:"molecule",description:"由模块标题和节点指南内容组成，节点指南内容在分子内横向滑动。",className:"node-guide-module",children:[["模块标题-正常",{iconType:"fire",titleText:"七夕行业节点投放指南"}],["节点指南-内容",{}]]},{id:"官方小助手模块",name:"官方小助手模块",type:"molecule",description:"由模块标题和官方小助手组成。",className:"official-assistant-module",children:[["模块标题-正常",{titleText:"官方1v1小助手",useUnifiedTypography:!0}],["官方小助手",{}]]},{id:"任务列表",name:"任务列表",type:"molecule",description:"由标题和可配置数量的任务条样式 1 组成。",className:"task-list-module",props:[{key:"taskCount",name:"taskCount",label:"任务数量",type:"number",default:3,min:1,description:"控制任务条-样式1的数量。"}],dynamicChildren:{propKey:"taskCount",childSchemaId:"任务条-样式1",min:1},children:[["模块标题-正常",{iconType:"calendar",titleText:"任务清单"}]]}],ev=Q2.map(e=>e.id),G=Q2.map(e=>({...e,name:Hn(e.id,e.name)})),nv="builder_molecule_templates_empty_v1";function sI(){try{const e=localStorage.getItem(nv),n=e?JSON.parse(e):[];Array.isArray(n)&&n.forEach(t=>{t&&t.id&&!G.find(i=>i.id===t.id)&&G.push(t)})}catch(e){console.warn("加载分子模板失败",e)}}function Mr(){try{const e=G.filter(n=>!ev.includes(n.id));localStorage.setItem(nv,JSON.stringify(e))}catch(e){console.warn("保存分子模板失败",e)}}function lI(e){try{e&&e.id&&!G.find(n=>n.id===e.id)&&G.push(e),Mr()}catch(n){console.warn("保存分子模板失败",n)}}function dI(e){try{const n=G.findIndex(t=>t.id===e);n!==-1&&(G.splice(n,1),Mr())}catch(n){console.warn("删除分子模板失败",n)}}sI();const tv="builder_page_templates_empty_v1",dt={"模板1 只发券":["模板1 只发券"],"模板2 只抽奖":["模板2 只抽奖"],"模板3 抽奖 + 消耗返":["模板3 抽奖 + 消耗返"],"模板4 无激励攻略":["模板4 无激励攻略"]},Zl={label:"核心权益｜big-day发券",states:[{id:"default",name:"报名前",schemaId:"核心权益模块-bigday发券-样式1",preserveProps:!0,preserveBoundProps:!1},{id:"postSignup",name:"已报名",schemaId:"核心权益模块-bigday发券-样式1-已报名",preserveProps:!0,preserveBoundProps:!1,lockedPropKeys:["buttonText"]}]},iv=new Set(["核心权益模块-bigday发券-样式1","核心权益模块-bigday发券-样式1-已报名"]),av={"核心权益模块-bigday发券-样式1":Zl,"核心权益模块-bigday发券-样式1-已报名":Zl,"核心玩法模块-抽奖-未报名":{label:"核心玩法｜抽奖-九宫格",states:[{id:"default",name:"报名前",schemaId:"核心玩法模块-抽奖-未报名"},{id:"registered",name:"已报名",schemaId:"核心玩法模块-抽奖-已报名"}]},"内容诊断-样式1-点击前":{label:"内容诊断｜入口卡片",states:[{id:"default",name:"点击前",schemaId:"内容诊断-样式1-点击前"},{id:"clicked",name:"点击后",schemaId:"内容诊断-样式-点击后"}]},"内容诊断-样式-点击后":{label:"内容诊断｜生成报告后",states:[{id:"default",name:"点击前",schemaId:"内容诊断-样式1-点击前"},{id:"clicked",name:"点击后",schemaId:"内容诊断-样式-点击后"}]},"核心玩法模块-抽奖消返-3列":{label:"核心玩法｜抽奖消耗返",states:[{id:"default",name:"报名状态",schemaId:"核心玩法模块-抽奖消返-3列",preserveProps:!0},{id:"unregistered",name:"未报名",schemaId:"核心玩法模块-抽奖消返-3列",preserveProps:!0,lockedPropKeys:["buttonText"],childProps:{1:{hideProgressGraphic:!1},4:{buttonText:"立即报名"}}}]},"核心玩法模块-抽奖消返-4列":{label:"核心玩法｜抽奖消耗返",states:[{id:"default",name:"报名状态",schemaId:"核心玩法模块-抽奖消返-4列",preserveProps:!0},{id:"unregistered",name:"未报名",schemaId:"核心玩法模块-抽奖消返-4列",preserveProps:!0,lockedPropKeys:["buttonText"],childProps:{1:{hideProgressGraphic:!1},4:{buttonText:"立即报名"}}}]}},pI={},cI={"page-guide-no-incentive|1":{label:"内容诊断",states:[{id:"entry",name:"入口卡片",schemaId:"内容诊断-样式1-点击前"},{id:"quality",name:"优质视频提示",schemaId:"内容诊断-优质视频提示"},{id:"account",name:"账号问题提示",schemaId:"内容诊断-账号诊断"}]}},ti=[{id:"default",name:"点击前",schemaId:"内容诊断-样式1-点击前"},{id:"clicked",name:"点击后",schemaId:"内容诊断-样式-点击后"}],uI=new Set(["用户教育案例-样式1","用户教育案例-样式2","AI智投","节点指南"]),ne=[];function N(e){return String(e||"").replace(/\s+/g,"").replace(/[【】\[\]（）()「」『』《》]/g,"").replace(/＋/g,"+").replace(/消耗返回/g,"消耗返").toLowerCase()}function gI(e){let n=!1;const t=(a,o)=>{if(!Object.prototype.hasOwnProperty.call(dt,o))return!1;const s=Array.isArray(a.nodes)?a.nodes:[];if(s.some(p=>p?.schemaId==="头图"||p?.name==="头图"))return!1;const d=ce("头图");return a.nodes=[d,...s],!0},i=(a,o,s)=>{const l=(a.nodes||[]).findIndex(c=>c?.schemaId===o);if(l<0)return!1;const d=a.nodes[l],p=yn(s);return p?(p.id=d.id||p.id,a.nodes[l]=p,!0):!1};return e.forEach(a=>{const o=N(a?.name),s=Object.entries(dt).find(([d,p])=>N(d)===o||p.some(c=>N(c)===o));s&&a.name!==s[0]&&(a.name=s[0],n=!0);const l=s?.[0]||a.name;n=t(a,l)||n,l==="模板3 抽奖 + 消耗返"&&(n=i(a,"核心玩法模块-抽奖消返-3列","核心玩法模块-抽奖消返-4列")||n),l==="模板4 无激励攻略"&&(n=i(a,"用户教育案例-样式1","用户教育案例-样式2")||n)}),n}function mI(){try{const e=localStorage.getItem(tv),n=e?JSON.parse(e):[];if(Array.isArray(n)){let t=!1;t=gI(n),n.forEach(i=>{i&&i.id&&!ne.find(a=>a.id===i.id)&&ne.push(i)}),t&&ft()}}catch(e){console.warn("加载自定义页面模板失败",e)}}function ft(){try{localStorage.setItem(tv,JSON.stringify(ne))}catch(e){console.warn("保存自定义页面模板失败",e)}}async function Ql(e,n){const t={id:`custom_page_${Date.now()}`,name:n,isCustom:!0,canvasBackground:e.canvasBackground||"#ffffff",navBarEnabled:!!e.navBarEnabled,nodes:JSON.parse(JSON.stringify(e.nodes))};ne.push(t),await ft()}function fI(e){const n=N(e);return[...ne].reverse().find(t=>N(t?.name)===n)}function Rt(e){const n=N(e),i=Object.entries(dt).find(([o,s])=>N(o)===n||s.some(l=>N(l)===n))?.[1]||[e];for(const o of i){const s=fI(o);if(s)return s}const a=[...pe,...Wa];for(const o of i){const s=N(o),l=a.find(d=>N(d?.name)===s);if(l)return{...l,isCustom:!1,canvasBackground:l.canvasBackground||l.background||"#ffffff"}}return null}function xI(e){const n=ne.find(a=>a.id===e);if(!n)return;const t=r.selectedDimension||Q().dimension||"自定义维度",i={id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:n.name,dimension:t,tags:["自定义模板"],nodes:JSON.parse(JSON.stringify(n.nodes)),canvasBackground:n.canvasBackground||"#ffffff",navBarEnabled:!!n.navBarEnabled};r.pages.push(i),r.activePageId=i.id,r.selectedDimension=t,r.selectedId=null,T()}mI();const hI={moduleName:"页面基础信息",description:"先确认模板命中和活动基本信息。",sections:[{title:"活动信息",fields:["页面类型","活动名称","活动时间"]}]},Wa=[],pe=[{id:"blank-page",name:"空白页",category:"基础",description:"从零开始搭建",preview:[{type:"empty",height:160,gradient:"#f8f9fa",marginTop:0,radius:8}],nodes:[]},{id:"page-coupon",name:"模板1 只发券",category:"页面模板",description:"核心权益发券由用户填写，其余页面模块沿用默认内容。",canvasBackground:"#FFE0E9",background:"#FFE0E9",viewportWidth:750,nodes:[["头图",{}],["核心权益模块-发券-样式2",{}],["内容诊断-样式1-点击前",{}],["用户教育-攻略",{}],["用户教育案例-样式1",{}],["官方小助手模块",{}],["置底按钮",{}]]},{id:"page-lottery",name:"模板2 只抽奖",category:"页面模板",description:"核心权益发券和投放抽奖由用户填写，其余页面模块沿用默认内容。",canvasBackground:"#FFE0E9",background:"#FFE0E9",viewportWidth:750,nodes:[["头图",{}],["账户优惠券提示",{}],["核心权益模块-发券-样式2",{}],["投放抽奖",{}],["内容诊断-样式1-点击前",{}],["用户教育-攻略",{}],["用户教育案例-样式1",{}],["官方小助手模块",{}],["置底按钮",{}]]},{id:"page-lottery-consumption-return",name:"模板3 抽奖 + 消耗返",category:"页面模板",description:"Big-day 发券、四档消耗返、抽奖九宫格、任务和流量扶持券由用户填写，其余页面模块沿用默认内容。",canvasBackground:"#FFE0E9",background:"#FFE0E9",viewportWidth:750,nodes:[["头图",{}],["账户优惠券提示",{}],["核心权益模块-bigday发券-样式1",{}],["核心玩法模块-抽奖消返-4列",{}],["核心玩法模块-抽奖-未报名",{}],["任务列表",{}],["投稿赢流量-样式3",{}],["AI智投",{}],["节点指南",{}],["置底按钮",{}]]},{id:"page-guide-no-incentive",name:"模板4 无激励攻略",category:"页面模板",description:"无需填写 PRD，页面模块直接使用默认内容。",canvasBackground:"#FFE0E9",background:"#FFE0E9",viewportWidth:750,nodes:[["头图",{}],["账户优惠券提示",{}],["用户教育-攻略",{}],["用户教育案例-样式2",{}],["置底按钮",{}]]}],Ia={"模板1 只发券":"page-coupon","模板2 只抽奖":"page-lottery","模板3 抽奖 + 消耗返":"page-lottery-consumption-return","模板4 无激励攻略":"page-guide-no-incentive"},Qi={schemaIds:["头图"],moduleName:"头图",sections:[{title:"",fields:[["text","文案"],["dateText","日期文案"]]}]},ii={"page-coupon":[Qi,{schemaIds:["核心权益模块-发券-样式2"],moduleName:"核心权益｜发券",sections:[{title:"",fields:[["0.titleText","模块标题"],["1.amountText","券金额"],["1.conditionText","券使用条件"],["2.buttonText","主按钮文案"]]}]}],"page-lottery":[Qi,{schemaIds:["核心权益模块-发券-样式2"],moduleName:"核心权益｜发券",sections:[{title:"",fields:[["0.titleText","模块标题"],["1.amountText","券金额"],["1.conditionText","券使用条件"],["2.buttonText","主按钮文案"]]}]},{schemaIds:["投放抽奖"],moduleName:"核心玩法｜投放抽奖",sections:[{title:"",fields:[["0.titleText","模块标题"]]},{title:"奖品配置",fields:Array.from({length:K3},(e,n)=>[[`1.prize${n+1}`,`奖品${n+1}`],[`1.prize${n+1}ButtonText`,`奖品${n+1} · 弹窗按钮文案`]]).flat()},{title:"消耗与抽奖数据",fields:[["2.consumeAmountText","消耗金额"],["2.lotteryCountText","抽奖次数"]]},{title:"行动按钮",fields:[["3.buttonText","主按钮文案"]]},{title:"消耗阶梯正文",fields:[["4.titleText","标题"],["4.bodyText","正文"],["4.rewardText1","第一档抽奖文案"],["4.rewardText2","第二档抽奖文案"],["4.rewardText3","第三档抽奖文案"],["4.rewardText4","第四档抽奖文案"],["4.amountText1","第一档金额"],["4.amountText2","第二档金额"],["4.amountText3","第三档金额"],["4.amountText4","第四档金额"],["4.footnoteText","底部说明"]]}]}],"page-lottery-consumption-return":[Qi,{schemaIds:["核心权益模块-bigday发券-样式1","核心权益模块-bigday发券-样式1-已报名"],moduleName:"核心权益｜big-day发券",sections:[{title:"",fields:[["0.titleText","模块标题"]]},{title:"券信息",fields:[["1.amountText","券金额"],["1.conditionText","券使用条件"],["1.giftConditionText","券门槛/赠送条件"],["1.specialText","用户标签"]]},{title:"参与规则",fields:[["2.limitedText","活动限制时间"],["2.actionText","参与动作"],["2.orderText","参与门槛"],["2.targetText","投放目标说明"]]},{title:"行动与说明",fields:[["2.buttonText","报名按钮文案"],["3.text","补充说明"]]}]},{schemaIds:["核心玩法模块-抽奖消返-3列"],moduleName:"核心玩法｜抽奖消耗返",sections:[{title:"",fields:[["0.titleText","模块标题"]]},{title:"返券配置",fields:[["1.rewardType1","第1档 · 类型"],["1.amountText1","第1档 · 券金额"],["1.rewardType2","第2档 · 类型"],["1.amountText2","第2档 · 券金额"],["1.rewardType3","第3档 · 类型"],["1.amountText3","第3档 · 券金额"],["1.consumeAmountText1","第1档 · 消耗门槛"],["1.consumeAmountText2","第2档 · 消耗门槛"],["1.consumeAmountText3","第3档 · 消耗门槛"]]},{title:"活动规则",fields:[["3.titleText","标题"],["3.firstBodyText","规则正文1"],["3.secondBodyText","规则正文2"],["3.thirdBodyText","规则正文3"],["3.highlightText","高亮内容"],["3.paragraphCount","规则段落数量"]]}]},{schemaIds:["核心玩法模块-抽奖消返-4列"],moduleName:"核心玩法｜抽奖消耗返",sections:[{title:"",fields:[["0.titleText","模块标题"]]},{title:"返券配置",fields:[["1.rewardType1","第1档 · 类型"],["1.amountText1","第1档 · 券金额"],["1.rewardType2","第2档 · 类型"],["1.amountText2","第2档 · 券金额"],["1.rewardType3","第3档 · 类型"],["1.amountText3","第3档 · 券金额"],["1.rewardType4","第4档 · 类型"],["1.amountText4","第4档 · 券金额"],["1.consumeAmountText1","第1档 · 消耗门槛"],["1.consumeAmountText2","第2档 · 消耗门槛"],["1.consumeAmountText3","第3档 · 消耗门槛"],["1.consumeAmountText4","第4档 · 消耗门槛"]]},{title:"活动规则",fields:[["3.titleText","标题"],["3.firstBodyText","规则正文1"],["3.secondBodyText","规则正文2"],["3.thirdBodyText","规则正文3"],["3.highlightText","高亮内容"],["3.paragraphCount","规则段落数量"]]}]},{schemaIds:["核心玩法模块-抽奖-未报名","核心玩法模块-抽奖-已报名"],moduleName:"核心玩法｜抽奖-九宫格",preferredStateId:"registered",sections:[{title:"",fields:[["0.titleText","标题"]]},{title:"奖品配置",fields:Array.from({length:8},(e,n)=>[[`2.prize${n+1}`,`奖品${n+1}`],[`2.prize${n+1}ButtonText`,`奖品${n+1} · 弹窗按钮文案`]]).flat()}]},{schemaIds:["任务列表"],moduleName:"核心玩法｜任务",sections:[{title:"",fields:[["taskCount","任务数量"],["0.titleText","模块标题"]]},...Array.from({length:3},(e,n)=>{const t=n+1;return{title:`任务${t}`,fields:[[`${t}.taskTitle`,"标题"],[`${t}.showNewTag`,"NEW标签"],[`${t}.taskSubtitle`,"说明"],[`${t}.rewardCountText`,"奖励数量"],[`${t}.completionText`,"完成次数说明"]]}})]},{schemaIds:["投稿赢流量-样式3"],moduleName:"内容增长｜流量扶持券",sections:[{title:"奖励信息",fields:[["1.supportText","流量扶持金额"]]},{title:"行动按钮",fields:[["2.buttonText","主按钮文案"]]},{title:"活动规则",fields:[["3.titleText","活动规则标题"],["3.firstBodyText","规则正文1"],["3.secondBodyText","规则正文2"],["3.thirdBodyText","规则正文3"],["3.highlightText","重点说明"],["3.paragraphCount","规则段落数量"]]}]}],"page-guide-no-incentive":[Qi]};function bI(e){if(!e)return"";if(Object.prototype.hasOwnProperty.call(ii,e.id))return e.id;const n=N(e.name),t=Object.keys(Ia).find(i=>N(i)===n?!0:(dt[i]||[]).some(a=>N(a)===n));return t?Ia[t]:""}function ov(e){const n=bI(e);return Object.prototype.hasOwnProperty.call(ii,n)?ii[n]:null}function ka(e,n){const t=ov(e);return t&&t.find(i=>i.schemaIds.includes(n))||null}function yI(e){const n=new Set([e?.moduleSchemaId,e?.sourceModuleSchemaId].filter(Boolean));if(!n.size)return null;const t=de(e);for(const i of Object.values(ii))for(const a of i)if(a.schemaIds.some(o=>n.has(o)))for(const o of a.sections||[]){const s=(o.fields||[]).find(([l])=>l===t);if(s)return{moduleName:a.moduleName,sectionTitle:o.title,label:s[1]}}return null}const Oe="saved-prd-table";try{localStorage.removeItem("builder_prd_generated_history"),localStorage.removeItem("builder_prd_upload_table")}catch(e){console.warn("清理旧 PRD 本地数据失败",e)}function wI(){return[{key:"",value:""}]}function re(e){if(!Array.isArray(e))return wI();const n=e.map(t=>({key:String(t?.key??""),value:String(t?.value??"")}));return n.length?n:[{key:"",value:""}]}const ed=["module","field"],vI=["模块","字段"],xt=["","","",""],ai="人群1";function ki(e={}){return{id:"base",name:ai,title:ai,isBase:!0,...e}}function rv(){return{module:"",field:"",values:[]}}function Ve(e,n=4){const t=Array.isArray(e)?e.map(a=>String(a||"").trim()):[],i=[...xt];for(;t.length<n;)t.push(t.length<i.length?i[t.length]:"");return t}function Cn(e,n=12,t=null){const i=t??Math.max(xt.length,...Array.isArray(e)?e.map(o=>o?.values?.length||0):[0]),a=Array.isArray(e)?e.map(o=>({module:String(o?.module??""),field:String(o?.field??""),values:Array.from({length:i},(s,l)=>String(o?.values?.[l]??o?.[`value${l}`]??""))})):[];for(;a.length<n;)a.push(rv());return a.forEach(o=>{for(;o.values.length<i;)o.values.push("")}),a}function Pi(e){return N(e)}function _n(e={},n=[]){const t={};Object.entries(e||{}).forEach(([a,o])=>{const s=Pi(a),l=Ve(o,0);s&&l.length&&(t[s]=l)});const i=Ve(n,0);return i.length&&(t[Pi("页面基础信息")]=i),t}function jr(e,n={},t=[]){const i=Pi(e);return _n(n)[i]||Ve(t,0)}function Xt(e=[],n=[],t={}){return Math.max(Ve(n,0).length,...Object.values(t||{}).map(i=>Ve(i,0).length),...Array.isArray(e)?e.map(i=>i?.values?.length||0):[0])}function SI(e=[]){return vI.every((n,t)=>N(e[t])===N(n))}function TI(e=""){return e.trim()?[...new DOMParser().parseFromString(e,"text/html").querySelectorAll("table")].map(t=>[...t.querySelectorAll("tr")].map(i=>[...i.querySelectorAll("th,td")].map(a=>a.textContent.trim())).filter(i=>i.some(Boolean))).filter(t=>t.length):[]}function $I(e=""){const n=String(e||"").replace(/\r\n?/g,`
`).split(/\n\s*\n/).map(t=>t.split(`
`).map(i=>i.split("	").map(a=>a.trim())).filter(i=>i.some(Boolean))).filter(t=>t.length);return n.length?n:[]}function CI(e){const n=TI(e?.getData("text/html")||"");return n.length?n:$I(e?.getData("text/plain")||"")}function Pa(e,n){const t=N(n);return e.findIndex(i=>{const a=N(i[0]);return t?a===t:!a||a===N("模块信息")})}function sv(e){return new Set((e?.sections||[]).flatMap(n=>n.fields||[]).map(([,n])=>N(n)).filter(Boolean))}function II(e,n,t){const i=Ia[t],a=ii[i]||[],o=e.slice(n+1).map(s=>N(s[0])).filter(Boolean);return a.map(s=>{const l=sv(s);return{spec:s,score:o.filter(d=>l.has(d)).length}}).sort((s,l)=>l.score-s.score)[0]}function kI(e=[]){return e.slice(1).map(n=>String(n||"").trim()).filter(n=>n&&!/^(填写示意|参考输入|默认值|示例)$/.test(n))}function PI(e,n){const t=Pa(e,"");if(t<0)return null;const i=kI(e[t]),a=II(e,t,n);if(!a?.score)return null;const o=sv(a.spec),s=Ht(a.spec.moduleName);let l=0;const d=[];return e.slice(t+1).forEach(p=>{const c=String(p[0]||"").trim(),u=s?c.match(/^任务\s*(\d+)/):null;if(u){l=Number(u[1]);return}if(!o.has(N(c)))return;const g=i.map((w,y)=>String(p[y+1]||"").trim());g.some(Boolean)&&d.push({field:s&&l?`任务${l}｜${c}`:c,values:g})}),{module:a.spec.moduleName,versions:i,fields:d}}function zI(e){const n=String(e||"").replace(/\s+/g,"").replace(/元/g,""),t=n.match(/(?:累计现金消耗)?(?:≥|>=|满)([\d.]+)/),i=n.match(/赠(?:价值)?([\d.]+)/);return{threshold:t?.[1]||"",reward:i?.[1]||""}}function FI(e){const n=String(e||"").match(/第([1-4一二三四])档/);return Number({一:1,二:2,三:3,四:4}[n?.[1]]||n?.[1]||0)}function NI(e,n){const t=String(e||"").replace(/\s+/g,"");return n.reward||/赠(?:价值)?[\d.]+/.test(t)||/消耗返/.test(t)?"消耗返":/抽奖/.test(t)?"抽奖任务":n.reward?"消耗返":"抽奖任务"}function EI(e=[]){return e.map((n,t)=>({sourceIndex:t,header:String(n||"").trim(),tier:FI(n)})).filter(n=>n.tier).sort((n,t)=>n.tier-t.tier)}function lv(e=[]){const n=new Set([N("人群策略"),N("人群版本")]);for(let t=0;t<e.length;t+=1){const i=e[t]||[],a=i.findIndex(s=>n.has(N(s)));if(a<0)continue;const o=EI(i).filter(s=>s.sourceIndex>a);if(o.length)return{rowIndex:t,nameColumnIndex:a,tierColumns:o}}return null}function _I(e){const n=lv(e);if(!n)return null;const{rowIndex:t,nameColumnIndex:i,tierColumns:a}=n,o=e.slice(t+1).map(c=>{const u=String(c[i]||"").trim(),g=a.map(w=>{const y=zI(c[w.sourceIndex]);return{...y,index:w.tier,type:y.threshold||y.reward?NI(w.header,y):""}});return{name:u,tiers:g}}).filter(c=>c.name&&c.tiers.some(u=>u.threshold||u.reward));if(!o.length)return null;const s=o.flatMap(c=>c.tiers.filter(u=>u.threshold||u.reward).map(u=>u.index)),d=(s.length?Math.max(...s):3)>=4?4:3,p=[];for(let c=1;c<=d;c+=1)p.push([`第${c}档 · 类型`,o.map(u=>u.tiers.find(g=>g.index===c)?.type||"")],[`第${c}档 · 券金额`,o.map(u=>u.tiers.find(g=>g.index===c)?.reward||"")],[`第${c}档 · 消耗门槛`,o.map(u=>u.tiers.find(g=>g.index===c)?.threshold||"")]);return{module:"核心玩法｜抽奖消耗返",tierCount:d,versions:o.map(c=>c.name),fields:p.map(([c,u])=>({field:c,values:u}))}}function BI(e){const n=Pa(e,"页面模块顺序");if(n<0)return null;const i=(e.slice(n+1).find(s=>String(s[0]||"").trim()==="2")||[]).slice(1).map(s=>String(s||"").trim()).find(Boolean),a=N(i);return{stateId:a.includes(N("优质视频提示"))?"quality":a.includes(N("账号问题提示"))?"account":"entry"}}function nd(e,n,t=[],i=!1){if(!e.some(g=>Pa(g,"")>=0||!!lv(g)||Pa(g,"页面模块顺序")>=0))return null;const o=e.map(_I).find(Boolean),s=e.map(BI).find(Boolean),l=n||(o?"模板3 抽奖 + 消耗返":"");if(!l)return{error:"请先选择本次粘贴对应的页面模板"};const d=e.map(g=>PI(g,l)).filter(Boolean);if(!d.length&&!o&&!s)return{error:"未识别到该模板的模块字段，请确认复制了完整表格"};const p={};d.forEach(g=>{p[Pi(g.module)]=Ve(g.versions,0)}),o&&(p[Pi(o.module)]=Ve(o.versions,0));const c=o?o.versions:s?[""]:i?Ve(t,0):d[0]?.versions||[];if(!c.length)return{error:"表格中没有已填写的人群版本"};const u=[["模块","字段",...c],["页面基础信息","页面类型",l]];return d.forEach(g=>{g.fields.forEach(w=>{u.push([g.module,w.field,...w.values])})}),o&&o.fields.forEach(g=>{u.push([o.module,g.field,...g.values])}),{rows:u,versions:c,moduleVersions:p,templateName:l,guideStateId:s?.stateId||""}}function AI(e=""){const n=N(e);return Object.entries(dt).find(([i,a])=>[i,...a].some(o=>n.includes(N(o))))?.[0]||""}function td(e,n,t=""){const i=n.versions,a=_n(n.moduleVersions,i),o=Xt(e,i,a),s=Cn(e,0,o);return n.rows.slice(1).forEach(l=>{const d=String(l[0]||"").trim(),p=String(l[1]||"").trim();if(t&&N(d)!==N(t)&&N(d)!==N("页面基础信息"))return;const c=s.findIndex(w=>N(w.module)===N(d)&&N(w.field)===N(p)),g=jr(d,a,i).map((w,y)=>String(l[y+2]||"").trim());if(c<0){s.push({module:d,field:p,values:g});return}s[c].values=g}),s}function No(e){const n=[...e.querySelectorAll("[data-prd-blueprint-version-cell]")].map(t=>t.textContent.trim()).filter(Boolean);return n.length?n:Ve(r.prdBlueprintPasteVersions,r.prdBlueprintPasteVersions.length)}function Eo(e){const n=_n(r.prdBlueprintPasteModuleVersions,r.prdBlueprintPasteVersions),t=Cn(r.prdBlueprintPasteRows,0,Xt(r.prdBlueprintPasteRows,r.prdBlueprintPasteVersions,n));return[...e.querySelectorAll("[data-prd-blueprint-paste-row]")].forEach(i=>{const a=[...i.querySelectorAll("[data-prd-blueprint-cell]")],o=Number(i.dataset.prdBlueprintPasteRow);Number.isInteger(o)&&(t[o]={module:a[0]?.textContent.trim()||"",field:a[1]?.textContent.trim()||"",values:a.slice(2).map(s=>s.textContent.trim())})}),t}function za(e=[]){return Cn(e,0).filter(n=>n.module.trim()||n.field.trim()||n.values.some(t=>t.trim()))}function MI(e,n,t,i,a){const o=SI(t[0]||[]),s=o?t.slice(1):t,l=Ve(n);o&&t[0].slice(ed.length).filter(Boolean).forEach((c,u)=>{l[u]=c});const d=Cn(e,12,l.length);return s.forEach((p,c)=>{const u=i+c;for(;d.length<=u;)d.push(rv());p.forEach((g,w)=>{const y=a+w;if(y===0&&(d[u].module=g||""),y===1&&(d[u].field=g||""),y>=2){const h=y-ed.length;for(;l.length<=h;)l.push(`版本${l.length+1}`);for(;d[u].values.length<=h;)d[u].values.push("");d[u].values[h]=g||""}})}),{rows:Cn(d,12,l.length),versions:l}}function Xa(e=[],n=xt,t={}){const i=Ve(n,0),a=_n(t,i);return za(e).flatMap(o=>{const s=jr(o.module,a,i);return o.values.map((l,d)=>({module:o.module,version:s[d]||"",field:o.field,value:l})).filter((l,d)=>d<s.length&&l.value.trim())})}function jI(e=[],n=xt,t={}){const i=Xa(e,n,t),o=Object.keys(dt).find(l=>i.some(d=>[d.module,d.field,d.value].some(p=>N(p)===N(l))));if(o)return o;const s=i.find(l=>N(l.module)===N("页面基础信息")&&/^(页面类型|活动类型|类型)$/.test(String(l.field||"").trim()));return sr(s?.value||"")}function Fa(e,n){const t=wn(e)[n],i=ee(t?.schemaId)||G.find(o=>o.id===t?.schemaId||o.name===t?.schemaId),a=no(t?.schemaId,e?.id,n);return[t?.name,t?.schemaId,i?.name,i?.id,Hn(t?.schemaId,t?.name),a?.label].filter(Boolean)}function Na(e){const n=N(e||"默认版本");return!n||n===N("默认版本")}function or(e,n,t){!e||Na(n)||(t[e]||(t[e]=[]),!t[e].some(i=>N(i.name)===N(n))&&t[e].push({id:`imported_${Date.now()}_${t[e].length+1}`,name:n}))}function Ht(e){const n=zi(e);return n===N("任务列表")||n===N("任务列表模块")||n===N("核心玩法｜任务")}function RI(e){const n=String(e||"").match(/^任务\s*(\d+)/);return n?Number(n[1]):0}function dv(e=[],n=xt,t={}){const i=new Map,a=new Map;Xa(e,n,t).forEach(s=>{if(!Ht(s.module))return;const l=s.version||"";if(N(s.field)===N("任务数量")){const p=Number(s.value);Number.isFinite(p)&&p>0&&i.set(l,Math.round(p));return}const d=RI(s.field);d>0&&String(s.value||"").trim()&&a.set(l,Math.max(a.get(l)||0,d))});const o=new Map;return new Set([...i.keys(),...a.keys()]).forEach(s=>{o.set(s,Math.max(1,Math.round(i.get(s)||a.get(s)||0)))}),o}function HI(e=[],n=xt,t={}){return Math.max(0,...dv(e,n,t).values())}function DI(e=[],n=xt,t={}){const i=new Map;return za(e).forEach(a=>{if(zi(a.module)!==N("核心玩法｜抽奖消耗返"))return;const o=N(a.field).match(/^第([1-4])档/);if(!o)return;const s=Number(o[1]);jr(a.module,t,n).forEach((d,p)=>{String(a.values[p]||"").trim()&&i.set(d||"",Math.max(i.get(d||"")||3,s))})}),i}function LI(e,n,t,i={}){const a={},o=wn(e),s=HI(n,t,i);if(s>0){const l=o.findIndex((d,p)=>Fa(e,p).some(Ht));l>=0&&(a[Be(l,"taskCount")]=s)}return Xa(n,t,i).forEach(l=>{if(N(l.field)!==N("任务数量"))return;const d=o.findIndex((p,c)=>Fa(e,c).some(u=>N(u)===N(l.module)));d>=0&&(a[Be(d,"taskCount")]=l.value)}),a}function zi(e){const n=N(e);return/核心玩法.*消耗返.*(?:三档|四档|3列|4列)/.test(n)||/核心玩法模块抽奖消返[34]列/.test(n)?N("核心玩法｜抽奖消耗返"):n.replace(/核心玩法模块抽奖$/,"核心玩法模块抽奖未报名").replace(/任务列表模块$/,"任务列表")}function pv(e,n){const t=zi(n);return e.moduleAliases.some(i=>zi(i)===t)}function GI(e){const n=String(e.label||""),t=String(e.key||""),i=String(e.childName||""),a=String(e.sectionTitle||""),o=new Set([n,t,e.field?.name,e.field?.label,i&&n?`${i}｜${n}`:"",i&&n?`${i}${n}`:"",a&&n?`${a}｜${n}`:"",a&&n?`${a}${n}`:""].filter(Boolean)),s=n.match(/^奖品(\d+)$/);s&&o.add(`奖品${s[1]}名称`);const l=Number(e.childIndex);if(Number.isFinite(l)&&l>0&&/任务条/.test(i)){const p=`任务${l}`,u={任务标题:"标题",任务副标题:"描述",抽奖加成:"奖励数量",完成次数文案:"每日次数"}[n];u&&o.add(`${p}${u}`)}return n==="标题内容"&&(o.add("模块标题"),o.add("抽奖模块标题"),o.add("消耗返模块标题"),o.add("报名模块标题")),({第1档类型:["第1档玩法类型","第1档奖励类型"],金额1:["第1档奖励金额"],第2档类型:["第2档玩法类型","第2档奖励类型"],金额2:["第2档奖励金额"],第3档类型:["第3档玩法类型","第3档奖励类型"],金额3:["第3档奖励金额"],第4档类型:["第4档玩法类型","第4档奖励类型"],金额4:["第4档奖励金额"],满赠券文案:["第3档奖励金额"],"30元文案":["抽奖入口文案","第1个进度节点文案"],消耗金额1:["第2个进度节点文案"],消耗金额2:["第3个进度节点文案"],消耗金额3:["第4个进度节点文案"]}[n]||[]).forEach(p=>o.add(p)),[...o].map(N).filter(Boolean)}function rr(e){const n=String(e||"").replace(/\s+/g,"").match(/^奖(?:品|池)(\d+)(?:名称)?$/);return n?Number(n[1]):0}function Pt(e){return/^prize\d+(Name|Text|Copy|Amount|Threshold|ButtonText)?$/.test(String(e||""))}function OI(e,n){const t=N(n);return t?GI(e).includes(t):!1}function VI(e,n){return e.find(t=>pv(t,n.module)&&OI(t,n.field))}function UI(e){return e.find(n=>n.key==="taskCount"&&n.moduleAliases?.some(Ht))}function KI(e,n){const t=[...e];return n.forEach(i=>{const a=rr(i.field);if(!a||!String(i.value||"").trim())return;const o=t.find(c=>pv(c,i.module)&&rr(c.label)===1);if(!o)return;const l=de(o).match(/^(\d+)\.prize\d+$/),d=`prize${a}`,p=l?Be(o.moduleIndex,Fe(Number(l[1]),d)):Be(o.moduleIndex,d);t.some(c=>c.compoundKey===p)||t.push({...o,key:d,compoundKey:p,label:`奖品${a}`,field:{...o.field||{},key:d,name:d,label:`奖品${a}`,type:"prize"}})}),t}function qI(e,n){const t=new Map,i=(s,l)=>`${s}|${l}`,a=(s,l)=>{const d=i(s,l);return t.has(d)||t.set(d,{moduleIndex:s,childIndex:l,maxPrizeIndex:0,explicitCount:0,baseField:null}),t.get(d)};e.forEach(s=>{const d=de(s).match(/^(\d+)\.prize(\d+)$/);if(!d)return;const p=a(Number(s.moduleIndex),Number(d[1]));Number(d[2])===1&&(p.baseField=s)}),re(n).forEach(s=>{if(!String(s.value||"").trim())return;const d=Ce(s.key)||Ne(s.key),p=d?.compoundKey||"",c=p.match(/^(\d+)\.prizeCount$/);if(c){a(d.moduleIndex,Number(c[1])).explicitCount=Math.max(1,Number(s.value)||1);return}const u=p.match(/^(\d+)\.prize(\d+)$/);if(!u)return;const g=a(d.moduleIndex,Number(u[1]));g.maxPrizeIndex=Math.max(g.maxPrizeIndex,Number(u[2]))});let o=e.filter(s=>{const d=de(s).match(/^(\d+)\.prize(\d+)$/);if(!d)return!0;const p=t.get(i(Number(s.moduleIndex),Number(d[1]))),c=Math.max(1,p?.explicitCount||p?.maxPrizeIndex||ar);return Number(d[2])<=c});return t.forEach(s=>{const l=s.baseField||o.find(p=>Number(p.moduleIndex)===Number(s.moduleIndex)&&de(p)===Fe(s.childIndex,"prize1"));if(!l)return;const d=Math.max(1,s.explicitCount||s.maxPrizeIndex||ar);for(let p=1;p<=d;p+=1){const c=Be(s.moduleIndex,Fe(s.childIndex,`prize${p}`));o.some(u=>u.compoundKey===c)||o.push({...l,key:`prize${p}`,compoundKey:c,label:`奖品${p}`,field:{...l.field||{},key:`prize${p}`,name:`prize${p}`,label:`奖品${p}`,type:"prize"}})}}),o}function Ea(e,n,t,i="",a=""){const o=Be(Number(e),Fe(Number(n),`prize${Number(t)}${a}`));return i?[zn,String(Number(e)+1),i,o].join("｜"):[Dn,String(Number(e)+1),o].join("｜")}function id(e,n,t=""){const i=Be(Number(e),Fe(Number(n),"prizeCount"));return t?[zn,String(Number(e)+1),t,i].join("｜"):[Dn,String(Number(e)+1),i].join("｜")}function Un(e,n=""){const t=Pn(e);return t>=0?(r.prdTableRows[t].value=String(n),t):(r.prdTableRows.push({key:e,value:String(n)}),r.prdTableRows.length-1)}function Rr(e,n){let t=0,i=0;return re(r.prdTableRows).forEach(a=>{if(!String(a.value||"").trim())return;const s=Ce(a.key)||Ne(a.key);if(!s||Number(s.moduleIndex)!==Number(e))return;const l=String(s.compoundKey||"").match(/^(\d+)\.prizeCount$/);if(l&&Number(l[1])===Number(n)){t=Math.max(t,Number(a.value)||0);return}const d=String(s.compoundKey||"").match(/^(\d+)\.prize(\d+)$/);d&&Number(d[1])===Number(n)&&(i=Math.max(i,Number(d[2])))}),Math.max(1,t||i||ar)}function cv(e,n,t,i=[]){const a=Math.max(1,Math.round(Number(t)||1));return Un(id(e,n),String(a)),i.forEach(o=>{o&&Un(id(e,n,o),String(a))}),a}function WI(e,n,t=[]){const i=Rr(e,n)+1;cv(e,n,i,t),(t.length?t:[""]).forEach(o=>{Un(Ea(e,n,i,o),"")})}function XI(e,n,t,i=[]){const a=Rr(e,n);if(a<=1||t<1||t>a)return;const o=a-1;r.prdTableRows=re(r.prdTableRows).map(s=>{const l=Ce(s.key),d=Ne(s.key),p=l||d;if(!p||Number(p.moduleIndex)!==Number(e))return s;const c=String(p.compoundKey||"").match(/^(\d+)\.prize(\d+)(Name|Text|Copy|Amount|Threshold|ButtonText)?$/);if(!c||Number(c[1])!==Number(n))return s;const u=Number(c[2]);if(u===Number(t))return null;if(u<Number(t))return s;const g=Ea(e,n,u-1,d?.versionName||"",c[3]||"");return{...s,key:g}}).filter(Boolean),cv(e,n,o,i)}function YI(e,n,t,i,a=[]){const o=Rr(e,n),s=Number(t)+Number(i);return!Number.isInteger(s)||s<1||s>o?!1:(["",...a.filter(Boolean)].forEach(l=>{["","Name","Text","Copy","Amount","Threshold","ButtonText"].forEach(d=>{const p=Ea(e,n,t,l,d),c=Ea(e,n,s,l,d),u=Pn(p),g=Pn(c);if(u<0&&g<0)return;const w=u>=0?r.prdTableRows[u].value:"",y=g>=0?r.prdTableRows[g].value:"";vi(p,y),vi(c,w)})}),!0)}function JI({rows:e,fields:n,taskCountsByVersion:t,explicitTaskCountVersions:i,pageTemplate:a,manualVersions:o}){const s=UI(n);s&&t.forEach((l,d)=>{if(!l||i.has(d))return;if(Na(d)){e.push({key:ut(s),value:String(l)});return}const p=on(a.id,s.moduleIndex);or(p,d,o),e.push({key:_i(s,d),value:String(l)})})}function ad(e=[],n=xt,t={}){const i=_n(t,n),a=Xa(e,n,i),o=a.filter(h=>N(h.module)===N("页面基础信息")).map(h=>({key:h.field,value:h.value})),s=jI(e,n,i)||Or(o),l=s?Rt(s):null,d={};if(!l){const h=a.filter(x=>N(x.module)!==N("页面基础信息")).map(x=>({key:[x.module,x.version||"",x.field].filter(Boolean).join("｜"),value:x.value}));return{rows:re([...o,...h]),manualVersions:d}}jv(l,Mv(a));const p=LI(l,e,n,i),c=KI(fS(l,{blueprint:p}).map(h=>({...h,moduleAliases:Fa(l,h.moduleIndex)})),a),u=[...o],g=dv(e,n,i),w=new Set(a.filter(h=>Ht(h.module)&&N(h.field)===N("任务数量")).map(h=>h.version||""));JI({rows:u,fields:c,taskCountsByVersion:g,explicitTaskCountVersions:w,pageTemplate:l,manualVersions:d});const y=DI(e,n,i);if(y.size){const h=wn(l).findIndex((x,$)=>Fa(l,$).some(k=>zi(k)===N("核心玩法｜抽奖消耗返")));if(h>=0){const x=on(l.id,h);y.forEach(($,k)=>{or(x,k,d),u.push({key:eo(h,Na(k)?"":k),value:String($)})})}}return a.forEach(h=>{if(N(h.module)===N("页面基础信息"))return;const x=VI(c,h);if(!x){u.push({key:[h.module,h.version||"",h.field].filter(Boolean).join("｜"),value:h.value});return}const $=h.version||"",k=oS(x)?Ei(h.value):h.value;if(Na($)){u.push({key:ut(x),value:k});return}const F=on(l.id,x.moduleIndex);or(F,$,d),u.push({key:_i(x,$),value:k})}),{rows:re(u),manualVersions:d}}function ZI(e){const n=String(e||"").replace(/\r\n?/g,`
`).split(`
`),t=[];let i=null;n.forEach(o=>{const s=o.trim();if(!s)return;const l=s.match(/^(#{1,6})\s+(.+)$/);if(l){l[1].length===1&&!t.some(c=>/活动名称|标题/.test(c.key))?i={key:"活动名称",value:l[2].trim()}:i={key:l[2].trim(),value:""},t.push(i);return}const d=s.match(/^(?:[-*+]\s*)?([^:：]{1,60})\s*[:：]\s*(.*)$/);if(d){i={key:d[1].replace(/\*\*/g,"").trim(),value:d[2].replace(/\*\*/g,"").trim()},t.push(i);return}const p=s.replace(/^(?:[-*+]\s*)/,"").trim();if(i){i.value=i.value?`${i.value}
${p}`:p;return}i={key:"PRD 文本",value:p},t.push(i)});const a=t.filter(o=>o.key||o.value);return a.length?re(a):[]}function QI(e){return JSON.stringify(re(e))}function ek(e,n){return String(e||"").trim()||`模块 ${n+1}`}function uv(e){return`${e?.key||""}
${e?.value||""}`.trim()}function gv(e){return String(e||"").replace(/组件|模块|原子|分子|component|schema/gi,"").replace(/[\s"'“”‘’`·_\-—:：|｜/\\()[\]{}]+/g,"").toLowerCase()}function od(e){const n=new Set(["标题","头图","公告","富文本","按钮","文本"]);return[e.id,e.name,e.title,e.reactComponent].filter(Boolean).map(gv).filter(t=>t&&t.length>=3&&!n.has(t))}function nk(e){const n=uv(e),t=gv(n),i=jt.filter(o=>!o.canvasOnly&&!o.blueprint?.excludeFromPrd).filter(o=>od(o).some(s=>s&&t.includes(s))).map(o=>o.id),a=G.filter(o=>o.id!=="MoleculeContainer").filter(o=>od(o).some(s=>s&&t.includes(s))).map(o=>`molecule:${o.name||o.id}`);return[...new Set([...i,...a])]}function tk(e,n){const t=String(e||"");for(const i of n){const a=t.match(new RegExp(`${i}\\s*[：:]\\s*([^\\n\\s，,；;]+(?:\\s+[^\\n，,；;]+){0,6})`));if(a?.[1])return a[1].trim()}return""}function ik(e){return nk(e)}function ak(e,n){const t=uv(e),i=String(e.value||"").trim(),a=String(e.key||"").trim(),o=ee(n);if(o){let s=!1;const l=Array.isArray(o.blueprint?.textProps)?new Set(o.blueprint.textProps):null;return Ue(o).filter(([p,c])=>l?l.has(p):Lt(p,c,c.default)).map(([p,c])=>{const u=c.label||p,g=tk(t,[u,p]),w=!s&&!g&&/text|title|content|amount|description|subtitle|button/i.test(p);return w&&(s=!0),{field:u,propKey:p,value:g||(w?i||a:c.default??"")}})}return[{field:"文本",value:i||t}]}function ok(e,n,t,i){return{rows:i,variantGroups:[{id:"base",name:ai,rows:oe(i)}]}}function mv(e){const n=[],t=/【\s*(个人|企业)奖品\s*】\s*[:：]\s*([\s\S]*?)(?=【\s*(?:个人|企业)奖品\s*】|$)/g;let i=t.exec(String(e||""));for(;i;){const a=i[1],s=i[2].trim().replace(/^七夕心动券\s*[:：]\s*/,"").split(/[\n\r,，、;；]+/).map(l=>l.trim()).filter(Boolean);s.length&&n.push({id:a==="个人"?"personal":"enterprise",name:`${a}奖品`,audience:a,dimensionTitle:a==="个人"?"个人用户":"企业用户",prizes:s}),i=t.exec(String(e||""))}return n.sort((a,o)=>{const s={personal:0,enterprise:1};return s[a.id]-s[o.id]})}function rk(e,n){const t=oe(e||[]);return n.forEach((i,a)=>{const o=`prize${a+1}`,s=t.find(l=>l.propKey===o||String(l.field||"").replace(/\s+/g,"")===`奖品${a+1}`);s?(s.value=Ei(i)||i,s.propKey=o):t.push({field:`奖品${a+1}`,propKey:o,value:Ei(i)||i})}),t}function Hr(e){const n=String(e||"").replace(/,/g,"").match(/(?:送)?满\s*(\d+(?:\.\d+)?)\s*赠\s*(\d+(?:\.\d+)?)/);return n?{milestone:`消耗${n[1]}元`,amount:n[2]}:{milestone:"",amount:""}}function rd(e){const n=Hr(e);if(n.amount)return n.amount;const t=String(e||"").replace(/,/g,"").match(/(?:奖励|赠)\s*(\d+(?:\.\d+)?)\s*元?/);return t?.[1]?t[1]:String(e||"").replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*元?/)?.[1]||""}function Dr(e){const n=String(e||"").replace(/,/g,"").match(/(?:消耗|≥|>=|满)\s*(\d+(?:\.\d+)?)\s*元?/);return n?`消耗${n[1]}元`:""}function sd(e){const n=Hr(e);return n.milestone?n.milestone:Dr(e)}function fv(e){const n=String(e||"").replace(/^⭐/,"").trim();if(/^未首消（?个人）?/.test(n))return{id:"first-spend-personal",title:"未首消（个人）",versionTitle:"未首消（个人）"};const t=n.match(/^(素人|入驻个人|企业)-(.+)$/);return t?{...{素人:{id:"novice",title:"素人"},入驻个人:{id:"settled-personal",title:"入驻个人"},企业:{id:"enterprise",title:"企业"}}[t[1]],versionTitle:t[2]}:null}function ld(e){const n=String(e||"").replace(/^⭐/,"").trim(),t=fv(n);return t||(/未首消/.test(n)?{id:"first-spend-personal",title:"未首消（个人）",versionTitle:n||"未首消（个人）"}:/素人/.test(n)?{id:"novice",title:"素人",versionTitle:n.replace(/^素人[-：:\s]*/,"")||"默认"}:/入驻个人/.test(n)?{id:"settled-personal",title:"入驻个人",versionTitle:n.replace(/^入驻个人[-：:\s]*/,"")||"默认"}:/企业/.test(n)?{id:"enterprise",title:"企业",versionTitle:n.replace(/^企业[-：:\s]*/,"")||"默认"}:null)}function xv(e,n,t,i=""){return e?{id:`consumption-progress-${e.id}-${t+1}`,dimensionId:e.id,dimensionTitle:e.title,title:i||e.versionTitle,props:{lotteryText:"抽奖",reward1AmountText:"",reward1UnitText:"",reward1LabelText:"",reward2AmountText:"",reward2UnitText:"",reward2LabelText:"",reward3AmountText:"",reward3UnitText:"",reward3LabelText:"",milestone1Text:"",milestone2Text:"",milestone3Text:"",milestone4Text:"",...n}}:null}function hv(e){return[1,2,3].forEach(n=>{const t=`reward${n}AmountText`;e[t]&&(e[`reward${n}UnitText`]="元",e[`reward${n}LabelText`]="满赠券")}),e}function bv(e,n){const t=String(e||"").trim().replace(/"\s*\n\s*/g,""),i=t.match(/^(?:⭐)?(?:未首消（?个人）?|素人-[^\s\t]+|入驻个人-[^\s\t]+|企业-[^\s\t]+)/);if(!i)return null;const a=fv(i[0]);if(!a)return null;const o=t.slice(i[0].length).trim();let s=o.split(/\t+|\s{2,}/).map(c=>c.trim()).filter(Boolean);s.length<14&&(s=o.split(/\s+/).map(c=>c.trim()).filter(Boolean));const l=s.findIndex(c=>/累计现金消耗/.test(c)),d=s.findIndex(c=>/(?:送)?满\s*\d+(?:\.\d+)?\s*赠\s*\d+/.test(c));if(l<0||d<0)return null;const p=s.slice(d).filter(c=>/(?:送)?满\s*\d+(?:\.\d+)?\s*赠\s*\d+/.test(c)).slice(0,3).map(Hr);return xv(a,hv({milestone1Text:Dr(s[l]),milestone2Text:p[0]?.milestone||"",milestone3Text:p[1]?.milestone||"",milestone4Text:p[2]?.milestone||"",reward1AmountText:p[0]?.amount||"",reward2AmountText:p[1]?.amount||"",reward3AmountText:p[2]?.amount||""}),n)}function sk(e=[]){const n=re(e),t=n.findIndex(l=>/消耗(?:分|返)\s*[-—–]?\s*阶梯任务进度/.test(`${l.key||""}${l.value||""}`));if(t<0)return[];const i=[];let a=null;const o=()=>{a?.audience&&i.push(xv(a.audience,hv(a.props),i.length,a.title))},s=()=>(a||(a={audience:null,title:"",props:{}}),a);for(let l=t+1;l<n.length;l+=1){const d=n[l],p=String(d.key||"").trim(),c=String(d.value||"").trim(),u=`${p}：${c}`.trim();if(i.length&&/(?:任务模块|九宫格|奖品|规则说明|头图模块|活动类型)/.test(p))break;if(/^(?:人群|维度|人群策略)$/.test(p)){a?.audience&&o();const h=ld(c);a={audience:h,title:h?.versionTitle||"",props:{}};continue}if(/^(?:版本|消耗区间)$/.test(p)){const h=s(),x=ld(c);x?(h.audience&&o(),a={audience:x,title:x.versionTitle||c,props:{}}):h.title=c;continue}if(/^(?:抽奖门槛|抽奖任务|第1档抽奖任务)$/.test(p)){s().props.milestone1Text=Dr(c)||c;continue}const g=p.match(/^第\s*([123])\s*档(?:门槛|消耗|奖励)?$/);if(g){const h=Number(g[1]),x=s();x.props[`milestone${h+1}Text`]=sd(c),x.props[`reward${h}AmountText`]=rd(c);continue}const w=p.match(/^第\s*([123])\s*档(.+)$/);if(w){const h=Number(w[1]),x=w[2],$=s();/奖励|金额|券/.test(x)&&($.props[`reward${h}AmountText`]=rd(c)),/门槛|消耗|节点/.test(x)&&($.props[`milestone${h+1}Text`]=sd(c)||c);continue}const y=bv(u,i.length);y&&(a?.audience&&(o(),a=null),i.push(y))}return a?.audience&&o(),i}function lk(e=[]){const n=sk(e),t=e.map(p=>`${p.key||""}
${p.value||""}`).join(`
`),i=t.match(/消耗(?:分|返)\s*[-—–]?\s*阶梯任务进度\s*[:：]?/);if(!i&&!n.length)return null;const o=t.slice(i?.index||0).replace(/\r\n?/g,`
`).replace(/"\s*\n\s*/g,"").split(`
`).map(p=>p.trim()).filter(p=>/^(?:⭐)?(?:未首消（?个人）?|素人-|入驻个人-|企业-)/.test(p)).map(bv).filter(Boolean),s=new Set,l=[...n,...o].filter(p=>{const c=`${p.dimensionId}::${p.title}`;return s.has(c)?!1:(s.add(c),!0)});if(!l.length)return null;const d=["first-spend-personal","novice","settled-personal","enterprise"];return l.sort((p,c)=>d.indexOf(p.dimensionId)-d.indexOf(c.dimensionId)||0),{entries:l,dimensions:d.map(p=>{const c=l.find(u=>u.dimensionId===p);return c?{id:p,title:c.dimensionTitle}:null}).filter(Boolean)}}function dk(e){const t=String(e||"").match(/每天可完成\s*([^\s，,。；;）)]*次)/);return t?.[1]?`${t[1]}/天`:""}function pk(e){const n=String(e||"").match(/[（(]\s*([^+＋）)]*?)\s*[+＋]\s*([^)）]+?)\s*[）)]/);return n?{rewardLabel:n[1].trim()||"抽奖",rewardCount:`+${n[2].trim().replace(/^[+＋]/,"")}`}:{rewardLabel:"抽奖",rewardCount:"+1"}}function Lr(e=[]){const n=re(e),t=n.findIndex(o=>/任务(?:列表|分子)?模块/.test(`${o.key||""}${o.value||""}`));if(t<0)return null;const i=[];for(let o=t+1;o<n.length;o+=1){const s=n[o],l=String(s.key||"").trim(),d=String(s.value||"").trim();if(/^任务\s*\d+/.test(l)){i.push({key:l,value:d});continue}if(i.length&&!/^任务\s*\d+/.test(l)&&/(?:模块|九宫格|消耗返|标题|规则|优惠券|按钮|头图)/.test(l))break}const a=i.map((o,s)=>{const l=o.key.match(/^任务\s*(\d+)/),d=o.value||"",{rewardLabel:p,rewardCount:c}=pk(d),u=dk(d)||"1次/天",g=d.split(/\n/)[0].replace(/[（(]\s*[^)）]+[)）]/g,"").replace(/每天可完成.*$/,"").replace(/[—-]{2,}.*$/,"").trim(),w=d.split(`
`).slice(1).join(`
`).trim();return g?{id:`prd-task-${l?.[1]||s+1}`,title:g,description:w,rewardLabel:p,rewardCount:c,frequency:u,buttonText:"去完成"}:null}).filter(Boolean);return a.length?{tasks:a}:null}function yv(e=[]){const n=re(e).reduce((o,s)=>{if(!((Ce(s.key)||Ne(s.key))?.compoundKey==="taskCount"||N(s.key)===N("任务数量")))return o;const p=Number(s.value);return Number.isFinite(p)?Math.max(o,p):o},0);if(n>0)return Math.max(1,Math.round(n));const t=Lr(e)?.tasks?.length||0,i=re(e).reduce((o,s)=>{const l=String(s.key||"").match(/任务\s*(\d+)/);return l?Math.max(o,Number(l[1])):o},0),a=Math.max(t,i);return a>0?a:3}function wv(e=[]){const n=Lr(e)?.tasks||[];return Object.fromEntries(n.flatMap((t,i)=>{const a=i+1;return[[`任务${a}标题`,t.title],[`任务${a}奖励类型`,t.rewardLabel],[`任务${a}奖励数量`,t.rewardCount],[`任务${a}每日次数`,t.frequency],[`任务${a}按钮文案`,t.buttonText],[`任务${a}描述`,t.description]]}))}function Gr(e){const n=String(e?.key||"").replace(/\s+/g,""),t=String(e?.value||"").trim();return/^(类型|页面类型|活动类型|模板类型)$/.test(n)||/^页面\d+$/.test(n)||/(?:页面|活动|模板)?类型\s*[:：]/.test(String(e?.key||""))||/^(?:页面|活动|模板)?类型\s*[:：]/.test(t)}function sr(e){return String(e||"").split(/[\n\r,，;；]/)[0].trim().replace(/^["'“‘【\[]|["'”’】\]]$/g,"")}function Or(e=[]){const t=Object.keys(dt).find(i=>e.some(a=>[a?.key,a?.value].some(o=>N(o)===N(i))));if(t)return t;for(const i of e){if(Gr(i)&&String(i?.value||"").trim()){const o=String(i.value).replace(/^(?:页面|活动|模板)?类型\s*[:：]\s*/i,"");return sr(o)}const a=[i?.key,i?.value,`${i?.key||""}：${i?.value||""}`];for(const o of a){const s=String(o||"").match(/(?:页面|活动|模板)?类型\s*[:：]\s*([^\n\r,，;；]+)/i);if(s?.[1])return sr(s[1])}}return""}function ck(e=[]){const n=re(e).filter(c=>c.key.trim()||c.value.trim()),t=Or(n),i=n.filter(c=>!Gr(c)),a=i.flatMap((c,u)=>{const g=ek(c.key,u),w=ik(c);return w.map((y,h)=>{const x=ak(c,y),$=ok(c.value,g,y,x),k=w.length>1?` · ${y==="LotteryGridInteractive"?"抽奖":y==="TaskModule"?"任务":"模块"}`:"";return{id:`prd-table-module-${u+1}-${h+1}`,slot:`prd-table-slot-${u+1}-${h+1}`,name:`${g}${k}`,component:y,blueprintRole:`根据 PRD 字段「${g}」生成页面模块。`,blueprintRule:$.blueprintRule||`已匹配为 ${y} 组件，并写入对应模块变量。`,blueprintBenefit:"用于拼接生成活动页面，并可在模块变量中继续编辑。",rows:$.rows,variantGroups:$.variantGroups}})}),o=mv(i.filter(c=>/九宫格抽奖模块|【\s*(?:个人|企业)奖品\s*】/.test(`${c.key||""}：${c.value||""}`)).map(c=>`${c.key||""}：${c.value||""}`).join(`
`));if(o.length>=2){const c=a.find(u=>u.component==="LotteryGrid"||u.component==="LotteryGridInteractive");c&&(c.variantGroups=o.map((u,g)=>({id:g===0?"base":`lottery-${u.id}`,name:u.name,rows:rk(c.rows,u.prizes)})),c.rows=oe(c.variantGroups[0].rows),c.blueprintRule="已定位页面模板中的九宫格模块，并将个人与企业奖品写入模块变量版本 1。")}const s=t?lk(n):null,l=t?Lr(n):null,d=n.find(c=>/活动名称|名称|标题/.test(c.key)),p=n.find(c=>/目标|目的|核心/.test(c.key));return{activityName:d?.value?.trim()||"PRD 信息表生成页面",activityGoal:p?.value?.trim()||"根据当前 PRD 文本拼接活动页面。",pageType:t,consumptionProgressConfig:s,taskListConfig:l,audiences:[{id:"prd-table-page",name:"PRD 生成页面",description:"按信息表字段顺序生成单页模块。",canvasBackground:"#ffffff",modules:a}],slots:a.map((c,u)=>({id:c.slot,label:c.name||`模块 ${u+1}`}))}}function Ze(){const e=re(r.prdTableRows),n=QI(e);return(!r.prdTableBlueprint||r.prdTableBlueprintSignature!==n)&&(r.prdTableBlueprint=ck(e),r.prdTableBlueprintSignature=n),r.prdTableBlueprint}function lr(){return`local_${Date.now()}_${Math.random().toString(16).slice(2)}`}function uk(){try{const e=sessionStorage.getItem("builder_active_history_draft_id");if(e)return e;const n=lr();return sessionStorage.setItem("builder_active_history_draft_id",n),n}catch{return lr()}}function vv(){const e=lr();return Sv(e)}function Sv(e){try{sessionStorage.setItem("builder_active_history_draft_id",e)}catch{}return e}const Fi={key:"__themeId",label:"颜色",type:"select",default:"pink",options:[{label:"日常色系-粉色",value:"pink"},{label:"日常色系-蓝色",value:"sky"},{label:"日常色系-青色",value:"daily-cyan"},{label:"日常色系-紫色",value:"daily-purple"},{label:"日常色系-绿色",value:"daily-green"},{label:"日常色系-卡其色",value:"apricot"},{label:"日常色系-黄色",value:"daily-yellow"}]};function Ya(e){return[{...Fi,default:e.defaultThemeId||Fi.default},...e.fields||[]]}const pt={daily:{id:"daily",name:"日常级别",description:"用于常规运营场景，包含 6 个日常资源位。",slots:[{id:"pendant",name:"挂件",schemaId:"挂件",defaultThemeId:"pink",fields:[{key:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"buttonText",label:"按钮文案",default:"七夕抽奖"},{key:"buttonColor",label:"按钮颜色",type:"select",default:"#FF1372",options:[{label:"粉色",value:"#FF1372"},{label:"红色",value:"#FF180E"},{label:"橙色",value:"#FF4501"}]}]},{id:"checkout-popup",name:"下单页弹窗",schemaId:"下单页弹窗",defaultThemeId:"pink",fields:[{key:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"headlineText",label:"主标题文案",default:"好礼天天抽 赢千元流量"},{key:"campaignText",label:"活动标签文案",default:"DOU+双节狂欢投"},{key:"headlineHighlightText",label:"标题高亮内容",default:"赢千元流量"},{key:"buttonText",label:"按钮文案",default:"立即参与"}]},{id:"top-banner",name:"顶部banner",schemaId:"顶部banner",defaultThemeId:"pink",fields:[{key:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"campaignText",label:"活动标签文案",default:"DOU+双节狂欢投"},{key:"headlineText",label:"主标题文案",default:"好礼天天抽 赢千元流量"},{key:"headlineHighlightText",label:"标题高亮内容",default:"千元流量"},{key:"buttonText",label:"按钮文案",default:"立即参与"}]},{id:"profile-center-banner",name:"个人中心banner",schemaId:"个人中心banner",defaultThemeId:"pink",fields:[{key:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"campaignText",label:"活动标签文案",default:"DOU+双节狂欢投"},{key:"headlineText",label:"主标题文案",default:"完成任务 抽赢好礼"},{key:"headlineHighlightText",label:"标题高亮内容",default:"抽赢"},{key:"buttonText",label:"按钮文案",default:"立即参与"}]},{id:"resource-popup-2",name:"挽留页弹窗",schemaId:"挽留页弹窗",defaultThemeId:"pink",fields:[{key:"mainVisualImage",label:"主体替换",type:"select",default:"subject-1",options:[{label:"主体替换-方案1",value:"subject-1"},{label:"主体替换-方案2",value:"subject-2"},{label:"主体替换-方案3",value:"subject-3"},{label:"主体替换-方案4",value:"subject-4"}]},{key:"campaignText",label:"活动标签文案",default:"DOU+双节狂欢投"},{key:"headlineText",label:"主标题文案",default:"投一单DOU+ 抽千元流量"},{key:"headlineHighlightText",label:"标题高亮内容",default:"DOU+"},{key:"buttonText",label:"按钮文案",default:"立即参与"}]},{id:"resource-popup-1",name:"详情页弹窗",schemaId:"详情页弹窗",defaultThemeId:"pink",fields:[{key:"campaignText",label:"活动标签文案",default:"DOU+双节狂欢投"},{key:"headlineText",label:"主标题文案",default:"完成任务 抽流量好礼"},{key:"headlineHighlightText",label:"标题高亮内容",default:"流量好礼"},{key:"buttonText",label:"按钮文案",default:"立即参与"}]}]},s:{id:"s",name:"S级别",description:"用于重点活动场景，当前资源位与日常级别保持一致。",slots:[]}},dd=["pendant","checkout-popup","resource-popup-2","resource-popup-1","top-banner","profile-center-banner"];pt.daily.slots.sort((e,n)=>dd.indexOf(e.id)-dd.indexOf(n.id));pt.s.slots=pt.daily.slots.map(e=>({...e,fields:(e.fields||[]).map(n=>({...n,...n.options?{options:n.options.map(t=>({...t}))}:{}}))}));function Ja(e,n){return{id:n===0?"base":`resource_version_${Date.now()}_${n}_${Math.random().toString(16).slice(2)}`,name:`人群${n+1}`,values:Object.fromEntries(Ya(e).map(t=>[t.key,t.default]))}}function dr(e){const n=pt[e]||pt.daily;return{activityName:e==="s"?"S级资源位活动":"日常资源位活动",modules:Object.fromEntries(n.slots.map(t=>[t.id,{versions:[Ja(t,0)]}]))}}function gk(){const e=window.currentUser||{},n=String(e.employeeId||e.userId||e.unionId||e.openId||"").trim();return n?{id:n,employeeId:String(e.employeeId||"").trim(),name:String(e.name||"当前用户").trim(),avatarUrl:String(e.avatar||e.avatarUrl||"").trim(),role:e.role,isAdmin:e.isAdmin}:null}const _t=gk(),pd=M3(_t),r={view:"home",workflowType:"venue",resourceLevel:"daily",resourceDrafts:{daily:dr("daily"),s:dr("s")},resourcePreviewVersionIds:{},currentTemplateId:null,createDraft:{name:"新活动",dimensions:["个人用户"],pages:{}},createModalOpen:!1,pageTemplateModalOpen:!1,pageTemplateModalDimension:"",draftTemplateModalOpen:!1,draftTemplateModalTarget:null,activePanelTab:"materials",activity:{name:"未命名活动",note:"活动 → 维度 → 页面 → 模块 → 变体"},activeLibrary:"materials",activeTab:"atom",activePageId:"page_1",selectedDimension:"默认维度",pages:[{id:"page_1",name:"页面 1",dimension:"默认维度",tags:["默认场景"],nodes:[],canvasBackground:"#ffffff",navBarEnabled:!1}],selectedId:null,dropIndex:null,dropPageId:null,dropMoleculeId:null,dropChildIndex:null,draggingNodeId:null,pointerDrag:null,suppressClick:!1,colorPanelOpen:!1,variantPanelOpen:!1,propsPanelOpen:!1,richtextEditorOpen:!1,canvasColorPanelOpen:!1,canvasZoom:1,canvasPanX:40,canvasPanY:40,spaceDown:!1,canvasPanDrag:null,adminComponentVerifier:{type:"atom",schemaId:"账户优惠券提示",parentThemeId:"pink",variantId:"default_pink",blueprint:{amountText:"600",actionText:"立即使用"}},prdDemoStep:"upload",collaboration:pd,historyScope:"personal",historyGroupId:pd.teams[0]?.id||"",historySaveScope:"personal",historySaveGroupId:"",historyCollaborationRecordId:null,adminSection:"users",adminEditingRecordId:null,adminNotice:"",adminUnlocked:!1,adminAuthModalOpen:!1,adminAuthError:"",adminAuthLoading:!1,prdFileModalOpen:!1,prdFeishuUrl:"",prdTextInput:"",prdBlueprintPasteRows:Cn([]),prdBlueprintPasteVersions:Ve([]),prdBlueprintPasteModuleVersions:{},prdBlueprintPasteTemplateName:"",prdBlueprintPasteError:"",prdTableRows:[],prdTableBlueprint:null,prdTableBlueprintSignature:"",selectedDemoPackageId:"",selectedBlueprintAudienceId:"",selectedBlueprintSceneId:"",demoSelectedNodeId:null,blueprintReturningFromPreview:!1,guidedHeaderLevelId:"default",guidedHeaderLevelDrafts:{s:{mainTitle:"任务通关赢X元流量",highlightText:"X元流量",subtitle:"为爱加投",dateText:""}},guidedHeaderDefaultPageSnapshots:[],guidedLotteryPrizeOverrides:null,guidedPanelMode:null,guidedWorkspaceMode:"split",guidedCanvasInitialized:!1,guidedVisiblePageIds:[],guidedVisibleCompanionNodeIds:[],guidedStateMenuNodeId:null,guidedAddTargetContext:null,prdTemplateAddAfterIndex:null,prdTemplateAddModal:null,prdTemplateSelectedModuleIndex:null,prdTemplatePreviewVersions:{},pageTemplateBlueprintStates:{},pageTemplateChildStates:{},guidedLineageZoom:1,guidedLineagePanX:0,guidedLineagePanY:0,guidedLineagePanDrag:null,guidedLineageVersion:"v3",selectedLineageVariantId:"base",prdManualModuleVersions:{},libraryReturnView:null,historyUser:_t,historyProjects:[],historyLocalDrafts:[],historyVersions:{},historyStatus:"idle",historyError:"",historyExpandedProjectId:null,historyCurrentProjectId:null,historyCurrentVersionId:null,historyLocalDraftId:uk()},A=e=>document.querySelector(e);let _o=0,la=null;const jn=()=>`node_${Date.now()}_${Math.random().toString(16).slice(2)}`,oe=e=>JSON.parse(JSON.stringify(e)),$e=(e,n,t)=>Math.min(t,Math.max(n,e)),mk=["#1677ff","#101828","#1f9d62","#e5484d","#f59e0b","#ffffff"],Fn=(e=[])=>{const[n,t,i,a]=e;return!n||!t||!i||!a?a||i||t||n||"#ffffff":`linear-gradient(165deg, ${n} 0px, ${t} 200px, ${i} 360px, ${a} 400px, ${a} 100%)`},cd=(e=[])=>{const[n,t,i,a]=e;return!n||!t||!i||!a?a||i||t||n||"#ffffff":`linear-gradient(165deg, ${n} 0px, ${n} 40px, ${t} 280px, ${i} 440px, ${a} 480px, ${a} 100%)`},ud=(e=[])=>{const[n,t,i,a]=e;return!n||!t||!i||!a?a||i||t||n||"#ffffff":`linear-gradient(165deg, ${n} 0px, ${n} 40px, ${t} 280px, ${i} 480px, ${a} 520px, ${a} 100%)`},he=[{id:"pink",name:"日常色系-粉色",background:Fn(["#FF88C1","#FFC1D5","#FFDAE6","#FFE9EE"]),solidBackground:"#FFDFE9",primary:"#FF88C1",secondary:"#FFE9EE",variantThemeId:"pink",filter:"none"},{id:"node-womens-day",name:"节点色系-三八",background:Fn(["#00B7FF","#9ED8FF","#CCE3FF","#CCE3FF"]),solidBackground:"#FEF6E5",primary:"#00B7FF",secondary:"#CCE3FF",variantThemeId:"pink",filter:"none"},{id:"sky",name:"日常色系-蓝色",background:Fn(["#88BEFF","#AED3FF","#CCE3FF","#ECF5FF"]),solidBackground:"#CCE3FF",primary:"#88BEFF",secondary:"#ECF5FF",variantThemeId:"sky",filter:"none"},{id:"daily-cyan",name:"日常色系-青色",background:Fn(["#ABF9FF","#B5FBFF","#C7E9EC","#CAF1F3"]),solidBackground:"#D0F9FC",primary:"#ABF9FF",secondary:"#CAF1F3",variantThemeId:"sky",filter:"none"},{id:"daily-purple",name:"日常色系-紫色",background:Fn(["#CB88FF","#DCAEFF","#E9CCFF","#F7ECFF"]),solidBackground:"#E9CCFF",primary:"#CB88FF",secondary:"#F7ECFF",variantThemeId:"sky",filter:"none"},{id:"daily-green",name:"日常色系-绿色",background:Fn(["#DAFF99","#E1FFAE","#DAEFC5","#EFFCDE"]),solidBackground:"#EFFCDE",primary:"#DAFF99",secondary:"#EFFCDE",variantThemeId:"sky",filter:"none"},{id:"node-breath",name:"节点色系-七夕",background:Fn(["#FF89E3","#FFC6EE","#FFDAF2","#FFE1F8"]),solidBackground:"#FFE8F7",primary:"#FF89E3",secondary:"#FFE1F8",variantThemeId:"sky",filter:"none"},{id:"node-anniversary",name:"节点色系-周年庆",background:ud(["#9B0C33","#F1446D","#FFCFD9","#FFECEE"]),solidBackground:"#FFE8E8",primary:"#9B0C33",secondary:"#FFECEE",variantThemeId:"sky",filter:"none"},{id:"node-double-festival",name:"节点色系-双旦",background:cd(["#1E78FF","#5B9EFF","#B9E2FF","#D4EFFF"]),solidBackground:"#E6F8FF",primary:"#1E78FF",secondary:"#D4EFFF",variantThemeId:"sky",filter:"none"},{id:"apricot",name:"日常色系-卡其色",background:Fn(["#FFBE88","#FFD2AE","#FFE3CC","#FFE7D1"]),solidBackground:"#FFE3CC",primary:"#FFBE88",secondary:"#FFE7D1",variantThemeId:"apricot",filter:"none"},{id:"daily-yellow",name:"日常色系-黄色",background:Fn(["#FADD4E","#FFF4BD","#FFE8B7","#FFF0E6"]),solidBackground:"#FFF6D1",primary:"#FADD4E",secondary:"#FFF0E6",variantThemeId:"apricot",filter:"none"},{id:"node-new-year",name:"节点色系-新年",background:Fn(["#FF7275","#FFA8AA","#FFCECE","#FFDFDF"]),solidBackground:"#FFE8E9",primary:"#FF7275",secondary:"#FFDFDF",variantThemeId:"apricot",filter:"none"},{id:"node-mid-autumn",name:"节点色系-中秋",background:ud(["#4B1E7B","#A141B6","#FFD7EF","#FFE6F5"]),solidBackground:"#FFE8FA",primary:"#4B1E7B",secondary:"#FFE6F5",variantThemeId:"apricot",filter:"none"},{id:"s-mid-autumn",name:"S级-中秋",background:Qt,solidBackground:Qt,primary:"#7B5BFF",secondary:Qt,variantThemeId:"pink",filter:"none"},{id:"node-double-11",name:"节点色系-双11",background:cd(["#FF7A21","#FFD06A","#FFF2CD","#FFF0CD"]),solidBackground:"#FFF7E8",primary:"#FF7A21",secondary:"#FFF0CD",variantThemeId:"apricot",filter:"none"}],fk=he.map(e=>e.background),Tv=new Set(["node-womens-day","node-breath","node-anniversary","node-double-festival","node-new-year","node-mid-autumn","node-double-11","s-mid-autumn"]);function xk(e,n="#ffffff"){return String(e||"").trim().match(/#[0-9a-fA-F]{6}\b/)?.[0]||n}function oi(e){return typeof e=="object"&&e?e:he.find(n=>n.id===e)||null}function kn(e){const n=oi(e);return n?.variantThemeId||n?.id||e||"pink"}function hk(e){return String(e?.name||"").startsWith("节点色系-")?"节点色系":"日常色系"}function $v(){const e=Object.entries(X3).map(([n,t])=>{const a=decodeURIComponent(n.split("/").pop()||"").replace(/\.[^.]+$/,"");return{id:n,name:a,url:t,offsetY:/^主体替换-方案[2-5]$/.test(a)?-18:0,scale:/^主体替换-方案[4-5]$/.test(a)?1.08:1}}).sort((n,t)=>n.name.localeCompare(t.name,"zh-CN"));return[{id:"default-main-visual",name:"惊喜",url:Z2,offsetY:0,scale:1},...e]}function bk(){return $v().map(e=>{const n=e.name.match(/主体替换-方案([1-4])$/);return n?{...e,id:`subject-${n[1]}`}:null}).filter(Boolean)}function da(e,n,t=new WeakSet){!e||t.has(e)||(t.add(e),Object.prototype.hasOwnProperty.call(e.props||{},"mainVisualImage")&&(e.props={...e.props||{},mainVisualImage:n}),(e.children||[]).forEach(i=>da(i,n,t)),(e.guidedStates||[]).forEach(i=>da(i.node,n,t)),(e.guidedLineageVariants||[]).forEach(i=>da(i.node,n,t)))}function yk(e){Ra("mainVisualImage",e),r.pages.forEach(n=>{(n.nodes||[]).forEach(t=>da(t,e))}),Ts()}function wk(){for(const e of r.pages){const n=[...e.nodes||[]];for(;n.length;){const t=n.shift();if(Object.prototype.hasOwnProperty.call(t?.props||{},"mainVisualImage"))return t.props.mainVisualImage||"subject-1";n.push(...t?.children||[])}}return"subject-1"}function vk(e,n){const t=Tv.has(e.id);return`
    <button
      class="${e.id===n?"active":""}${t?" is-disabled":""}"
      data-guided-page-theme="${f(e.id)}"
      aria-label="${t?`${f(e.name)}暂不可用`:`使用${f(e.name)}色系`}"
      title="${f(e.name)}${t?"（暂不可用）":""}"
      ${t?'disabled aria-disabled="true"':""}
    >
      <i style="background:linear-gradient(135deg, ${f(e.primary)} 0 50%, ${f(e.secondary)} 50% 100%)"></i>
      <span>${v(e.name)}</span>
    </button>
  `}function ee(e){const n=String(e||"").replace(/\s+/g,"").toLowerCase();return n?jt.find(t=>[t.id,t.name,t.title,t.reactComponent,t.component].map(a=>String(a||"").replace(/\s+/g,"").toLowerCase()).includes(n)):null}const Sk={头图:"hero","S级-中秋头图":"hero"},_a={hero:"头图/动效",title:"标题",notice:"通知",rule:"规则说明",cta:"按钮",reward:"奖励/券包",task:"任务",data:"数据",play:"玩法",service:"服务权益"},li={activityName:"",sourceName:"",matchedPackage:"",confidence:0,summary:"",audiences:[]},qn={id:"audience-only",slots:[],audiences:[]},be={id:"audience-time",slots:[],audiences:[],phases:[],scenes:[]};function Q(){return r.pages.find(e=>e.id===r.activePageId)||r.pages[0]}function Cv(){const e=r.pages.length+1;return{id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:`页面 ${e}`,dimension:"自定义维度",tags:["自定义场景"],nodes:[],canvasBackground:"#ffffff",navBarEnabled:!1}}Object.defineProperty(r,"nodes",{get(){return Q().nodes},set(e){Q().nodes=e}});Object.defineProperty(r,"canvasBackground",{get(){return Q().canvasBackground},set(e){Q().canvasBackground=e}});function ht(e,n={}){const t=ee(e),i={};return Ue(t).forEach(([a,o])=>{i[a]=o.default}),(t?.style||[]).forEach(a=>{i[a.key]=a.default}),{...i,...n}}function di(e){const n={};return Ue(e).forEach(([t,i])=>{n[t]=i.default??""}),n}function Iv(e,n={}){const t=Number.isFinite(Number(n.min))?Number(n.min):0,i=Number.isFinite(Number(n.max))?Number(n.max):Number.MAX_SAFE_INTEGER,a=Number(e),o=Number.isFinite(a)?Math.round(a):t;return Math.min(i,Math.max(t,o))}function pi(e,n={}){const t=[...e?.children||[]],i=e?.dynamicChildren;if(!i?.childSchemaId||!i?.propKey)return t;const a=Iv(n[i.propKey],i);for(let o=0;o<a;o+=1)t.push([i.childSchemaId,i.overrides||{}]);return t}function Ri(e){const n=G.find(d=>d.id===e?.schemaId),t=n?.dynamicChildren;if(!t?.childSchemaId||!t?.propKey)return;const i=(n.children||[]).length,a=Iv(e.props?.[t.propKey],t);e.props&&(e.props[t.propKey]=a);const o=(e.children||[]).slice(0,i),s=(e.children||[]).slice(i).filter(d=>d.schemaId===t.childSchemaId),l=Array.from({length:a},(d,p)=>s[p]||ce(t.childSchemaId,t.overrides||{}));e.children=[...o,...l]}function Ue(e){return e?Array.isArray(e.props)?e.props.map(n=>[n.key,n]):Object.entries(e.props||{}):[]}function Je(e){return(e?.variants||[]).map(n=>({...n,id:n.id||n.key,name:n.name||n.label,props:{...n.props||{}}}))}function Hi(e){return ee(e)||G.find(n=>n.id===e||n.name===e)}function Za(e,n={},t={}){if(e?.type==="molecule"){const a={...di(e),...t.props||{}},o=pi(e,a).map(([s,l],d)=>ce(s,{...l,...t.childProps?.[d]||{}}));return{id:jn(),schemaId:e.id,name:e.name||e.id,type:"molecule",allowedChildren:e.allowedChildren||null,className:e.className||"",props:a,children:o}}const i=Je(e);return{id:jn(),schemaId:e.id,name:e.name||e.id,type:"atom",activeVariantId:i[0]?.id||null,variants:i,props:ht(e.id,{...n,...t.props||{}})}}function kv(e,n={}){return(e?.states||[]).map(t=>{const i=t.schemaId||t.component,a=Hi(i);return a?{id:t.id||a.id,name:t.name||a.name||a.id,component:a.id,preserveProps:!!t.preserveProps,preserveBoundProps:t.preserveBoundProps!==!1,lockedPropKeys:[...t.lockedPropKeys||[]],node:Za(a,n,t)}:null}).filter(Boolean)}function Pv(e){return(e?.states||[]).map(n=>{const t=n.schemaId||n.component,i=Hi(t);return i?{id:n.id||i.id,name:n.name||i.name||i.id,schemaId:i.id}:null}).filter(Boolean)}function ce(e,n={}){const t=ee(e),i=Je(t),a={id:jn(),schemaId:t?.id||e,name:t?.name||e,type:"atom",activeVariantId:i[0]?.id||null,variants:i,props:ht(e,n)},o=kv(t,n);return o.length&&(a.guidedStates=o,a.activeGuidedStateId=o.find(s=>s.component===a.schemaId)?.id||o[0]?.id||null),a}function yn(e){const n=G.find(o=>o.id===e);if(!n)return null;const t=di(n),i={id:jn(),schemaId:e,name:n.name,type:"molecule",allowedChildren:n.allowedChildren||null,className:n.className||"",props:t,children:pi(n,t).map(([o,s])=>ce(o,s))},a=kv(n,t);return a.length&&(i.guidedStates=a,i.activeGuidedStateId=a.find(o=>o.component===i.schemaId)?.id||a[0]?.id||null),i}function zv(e,n){const t=G.find(a=>a.id===n);if(!t)return null;if(e?.isCustom){const a=yn(n);return a&&(delete a.id,a.name=t.name,a.isBlueprintInserted=!0),a}const i=[n,{}];return i.isBlueprintInserted=!0,i}function Vr(){if(r.selectedDemoPackageId!==Oe)return null;const n=Ze()?.pageType||"";return n?Rt(n):null}function Tk(e){r.prdTableRows=re(r.prdTableRows).map(n=>{const t=Ce(n.key);if(t&&t.moduleIndex>=e){const o=t.moduleIndex+1;return{...n,key:[Dn,String(o+1),Be(o,t.compoundKey)].join("｜")}}const i=Ne(n.key);if(!i||i.moduleIndex<e)return n;const a=i.moduleIndex+1;return{...n,key:[zn,String(a+1),i.versionName,Be(a,i.compoundKey)].join("｜")}}),ei("prdManualModuleVersions",e),ei("pageTemplateBlueprintStates",e),ei("pageTemplateChildStates",e),r.prdTableBlueprint=null,r.prdTableBlueprintSignature=""}function $k(e){r.prdTableRows=re(r.prdTableRows).map(n=>{const t=Ce(n.key);if(t){if(t.moduleIndex===e)return null;if(t.moduleIndex>e){const a=t.moduleIndex-1;return{...n,key:[Dn,String(a+1),Be(a,t.compoundKey)].join("｜")}}return n}const i=Ne(n.key);if(!i)return n;if(i.moduleIndex===e)return null;if(i.moduleIndex>e){const a=i.moduleIndex-1;return{...n,key:[zn,String(a+1),i.versionName,Be(a,i.compoundKey)].join("｜")}}return n}).filter(Boolean),ei("prdManualModuleVersions",e,-1),ei("pageTemplateBlueprintStates",e,-1),ei("pageTemplateChildStates",e,-1),r.prdTableBlueprint=null,r.prdTableBlueprintSignature=""}function Ck(e,n){const t=i=>i===e?n:i===n?e:i;r.prdTableRows=re(r.prdTableRows).map(i=>{const a=Ce(i.key);if(a){const l=t(a.moduleIndex);return l===a.moduleIndex?i:{...i,key:[Dn,String(l+1),Be(l,a.compoundKey)].join("｜")}}const o=Ne(i.key);if(!o)return i;const s=t(o.moduleIndex);return s===o.moduleIndex?i:{...i,key:[zn,String(s+1),o.versionName,Be(s,o.compoundKey)].join("｜")}}),Bo("prdManualModuleVersions",e,n),Bo("pageTemplateBlueprintStates",e,n),Bo("pageTemplateChildStates",e,n),r.prdTableBlueprint=null,r.prdTableBlueprintSignature=""}function ei(e,n,t=1){const i=r[e];if(!i||typeof i!="object")return;const a={};Object.entries(i).forEach(([o,s])=>{const l=String(o).split("｜");if(l[0]==="page-template"&&Number.isFinite(Number(l[2]))){const p=Number(l[2]);if(t<0&&p===n)return;const c=p>=n?p+t:p;a[[l[0],l[1],String(c)].join("｜")]=s;return}const d=String(o).split("|");if(d.length>=2&&Number.isFinite(Number(d[1]))){const p=Number(d[1]);if(t<0&&p===n)return;const c=p>=n?p+t:p;a[[d[0],String(c),...d.slice(2)].join("|")]=s;return}a[o]=s}),r[e]=a}function Bo(e,n,t){const i=r[e];if(!i||typeof i!="object")return;const a=s=>s===n?t:s===t?n:s,o={};Object.entries(i).forEach(([s,l])=>{const d=String(s).split("｜");if(d[0]==="page-template"&&Number.isFinite(Number(d[2]))){const c=a(Number(d[2]));o[[d[0],d[1],String(c)].join("｜")]=l;return}const p=String(s).split("|");if(p.length>=2&&Number.isFinite(Number(p[1]))){const c=a(Number(p[1]));o[[p[0],String(c),...p.slice(2)].join("|")]=l;return}o[s]=l}),r[e]=o}function Fv(e,n,t){const i=e?.sourcePageTemplateId?[...pe,...ne].find(s=>s.id===e.sourcePageTemplateId):Vr();if(!i?.nodes)return!1;const a=zv(i,t);if(!a)return!1;const o=Math.max(0,Math.min(n,i.nodes.length));return Tk(o),i.nodes.splice(o,0,a),i.isCustom&&ft(),!0}function Nv(e,n,t,i={}){const a=r.pages.find(p=>p.id===e)||Q();if(!a||a.isSystemFallback)return null;const o=yn(t);if(!o)return null;const s=(a.nodes||[]).filter(p=>p.canvasPlacement!=="page-side"),l=(a.nodes||[]).filter(p=>p.canvasPlacement==="page-side"),d=Math.max(0,Math.min(n,s.length));return i.syncTemplate!==!1&&Fv(a,d,t),o.sourcePageTemplateId=a.sourcePageTemplateId||Vr()?.id||"",o.sourcePageTemplateNodeIndex=d,s.splice(d,0,o),s.forEach((p,c)=>{p.sourcePageTemplateId===o.sourcePageTemplateId&&(p.sourcePageTemplateNodeIndex=c)}),a.nodes=[...s,...l],r.activePageId=a.id,r.selectedId=o.id,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,o}function Ik(){const e=new Set(r.guidedVisiblePageIds||[]);return r.pages.find(n=>n.id===r.activePageId&&!n.isSystemFallback)||r.pages.find(n=>e.has(n.id)&&!n.isSystemFallback)||r.pages.find(n=>!n.isSystemFallback)||null}function kk(e,n,t){const i=[...pe,...ne].find(s=>s.id===e);if(!i?.nodes)return!1;const a={sourcePageTemplateId:i.id};return Fv(a,n,t)?(r.prdTemplateAddAfterIndex=null,r.prdTemplateAddModal=null,r.prdTemplateSelectedModuleIndex=null,!0):!1}function Ev(e,n){const t=[...pe,...ne].find(a=>a.id===e);if(!t?.nodes?.length)return!1;const i=Number(n);return!Number.isInteger(i)||i<0||i>=t.nodes.length?!1:(t.nodes.splice(i,1),$k(i),t.isCustom&&ft(),r.prdTemplateSelectedModuleIndex=null,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,!0)}function Pk(e,n,t){const i=[...pe,...ne].find(d=>d.id===e);if(!i?.nodes?.length)return!1;const a=Number(n),o=t==="up"?-1:t==="down"?1:0,s=a+o;if(!Number.isInteger(a)||!o||s<0||s>=i.nodes.length)return!1;const[l]=i.nodes.splice(a,1);return i.nodes.splice(s,0,l),Ck(a,s),i.isCustom&&ft(),r.prdTemplateSelectedModuleIndex=s,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,!0}function pr(e,n,t){const i=[...pe,...ne].find(s=>s.id===e);if(!i?.nodes?.length)return!1;const a=Number(n);if(!Number.isInteger(a)||a<0||a>=i.nodes.length)return!1;const o=zv(i,t);return o?(i.isCustom&&i.nodes[a]?.id&&o&&typeof o=="object"&&!Array.isArray(o)&&(o.id=i.nodes[a].id),i.nodes[a]=o,i.isCustom&&ft(),r.prdTemplateSelectedModuleIndex=a,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",!0):!1}function zk(e,n){const t=Number(n);r.prdTableRows=re(r.prdTableRows).filter(a=>{if((Ce(a.key)||Ne(a.key))?.moduleIndex===t)return!1;const s=ci(a.key);return!(s?.templateId===e&&s.moduleIndex===t)});const i=on(e,t);delete r.prdManualModuleVersions?.[i],delete r.pageTemplateBlueprintStates?.[bt(e,t)],Object.keys(r.pageTemplateChildStates||{}).forEach(a=>{a.startsWith(`${e}|${t}|`)&&delete r.pageTemplateChildStates[a]}),r.prdTableBlueprint=null,r.prdTableBlueprintSignature=""}function cr(e){return Array.isArray(e)?e[0]:e?.schemaId}function _v(e){return Number(e)>=4?"核心玩法模块-抽奖消返-4列":Number(e)>=3?"核心玩法模块-抽奖消返-3列":""}function dn(e){return["核心玩法模块-抽奖消返-3列","核心玩法模块-抽奖消返-4列"].includes(e?.schemaId)}const Ba="__consumptionReturnTierCount",Qa="__consumptionReturnDetailMode",un="shared",at="audience",Bv="页面模板状态变量";function Fk(e,n,t,i){return[Bv,e,String(Number(n)+1),t,i].join("｜")}function ci(e){const n=String(e||"").split("｜");if(n[0]!==Bv||n.length<5)return null;const t=Number(n[2])-1;return Number.isFinite(t)?{templateId:n[1],moduleIndex:t,stateId:n[3],compoundKey:n.slice(4).join("｜")}:null}function eo(e,n=""){return n?[zn,String(Number(e)+1),n,Ba].join("｜"):[Dn,String(Number(e)+1),Ba].join("｜")}function Ni(e){return[Dn,String(Number(e)+1),Qa].join("｜")}function Av(e=new Map,n=1){const t=e.get(Qa);return[un,at].includes(t)?t:Number(n)>=2?at:un}function ct(e){return e===Ba||String(e||"").startsWith("1.")}function Nk(e,n,t){if(t!==un)return n;const i=new Map;return e.forEach((a,o)=>{ct(o)||i.set(o,a)}),n.forEach((a,o)=>{ct(o)&&i.set(o,a)}),i}function Ao(e){if(!Number.isInteger(Number(e)))return!1;const n=Number(e);if(r.prdTableRows.find(s=>s.key===Ni(n))?.value!==un)return!1;const i=r.prdTableRows.map(s=>({row:s,parsed:Ce(s.key)})).filter(({parsed:s})=>s?.moduleIndex===n&&s.compoundKey!==Qa&&!ct(s.compoundKey)),a=new Map(i.map(({row:s,parsed:l})=>[l.compoundKey,s.value??""]));let o=!1;return r.prdTableRows.forEach(s=>{const l=Ne(s.key);l?.moduleIndex!==n||!a.has(l.compoundKey)||(s.value=String(a.get(l.compoundKey)??""),o=!0)}),o}function Mo(e=new Map){const n=Number(e.get(Ba));if([3,4].includes(n))return n;const t=new Set(["1.amountText4","1.consumeAmountText4"]);return[...e.entries()].some(([i,a])=>t.has(String(i||""))&&String(a??"").trim())?4:3}function jo(e,n){if(!dn(e))return e;const t=_v(n);if(!t||e.schemaId===t)return e;const i=yn(t);return i?(i.id=e.id,i.props={...i.props||{},...e.props||{}},i.children.forEach((a,o)=>{const s=e.children?.[o];!s?.props||!a?.props||Object.keys(a.props).forEach(l=>{s.props[l]!==void 0&&(a.props[l]=oe(s.props[l]))})}),["sourceContextId","sourceModuleId","sourceSlot","sourceInputScope","sourcePageTemplateId","sourcePageTemplateNodeIndex","consumptionReturnDetailMode","moduleGroupId","moduleGroupRole","canvasPlacement","isBlueprintInserted"].forEach(a=>{e[a]!==void 0&&(i[a]=oe(e[a]))}),Kr(i),i):e}function Mv(e=[]){let n=0;return e.forEach(t=>{const i=String(t.value??"").trim(),a=String(t.field??t.key??"").trim(),o=String(t.module??"").trim();if(!i)return;const s=N(o),l=N(a);if(s&&!s.includes(N("消耗返"))&&!s.includes(N("抽奖消返")))return;const d=l.match(/(?:rewardtype|amounttext|consumeamounttext)([1-4])/i),p=l.match(/第([1-4一二三四])档/),c={一:1,二:2,三:3,四:4},u=d?.[1]||p?.[1]||0,g=Number(c[u]||u||0);g&&(n=Math.max(n,g))}),n>=4?4:n>=1?3:0}function jv(e,n){const t=_v(n);if(!e?.nodes?.length||!t)return!1;const i=e.nodes.findIndex(a=>["核心玩法模块-抽奖消返-3列","核心玩法模块-抽奖消返-4列"].includes(cr(a)));return i<0||cr(e.nodes[i])===t?!1:pr(e.id,i,t)}function Ek(e=[]){const n=re(e),t=Or(n),i=t?Rt(t):null;return jv(i,Mv(n))}function no(e,n="",t=-1){return cI[bt(n,t)]||av[e]||null}function bt(e,n){return`${e||""}|${n}`}function to(e,n){return bt(e,n)==="page-guide-no-incentive|1"}function Rv(e,n){return`${bt(e,n)}|entry-card`}function io(e,n){const t=r.pageTemplateBlueprintStates?.[Rv(e,n)];return ti.some(i=>i.id===t)?t:ti[0].id}function Ur(e,n,t,i){if(to(e,n)&&i==="entry"){const a=io(e,n);return ti.find(o=>o.id===a)?.schemaId}return t?.states?.find(a=>a.id===i)?.schemaId}function ao(e,n,t){const i=bt(e,n),a=r.pageTemplateBlueprintStates?.[i],o=pI[i],s=[...pe,...ne].find(p=>p.id===e),l=wn(s)[n],d=ka(s,l?.schemaId)?.preferredStateId;return t?.states?.some(p=>p.id===a)?a:t?.states?.some(p=>p.id===o)?o:t?.states?.some(p=>p.id===d)?d:t?.states?.[0]?.id||"default"}function Hv(e){const n=Hi(e.schemaId);if(!n)return null;const t=Za(n,{},e);return{id:e.id,name:e.name,component:e.schemaId,preserveProps:!!e.preserveProps,preserveBoundProps:e.preserveBoundProps!==!1,lockedPropKeys:[...e.lockedPropKeys||[]],node:t}}function Kr(e){if(!dn(e))return e;const n=av[e.schemaId];if(!n?.states?.length)return e;const t=n.states.map(s=>s.id);if(!(e.guidedStates?.length===t.length&&t.every(s=>e.guidedStates.some(l=>l.id===s&&l.node?.schemaId===e.schemaId)))){const s=t.includes(e.activeGuidedStateId)?e.activeGuidedStateId:t[0];e.guidedStates=n.states.map(Hv).filter(Boolean),e.activeGuidedStateId=s}const a=e.sourcePageTemplateId||"",o=Number(e.sourcePageTemplateNodeIndex);return!a||!Number.isInteger(o)||e.guidedStates.forEach(s=>{const l=new Map;r.prdTableRows.forEach(d=>{const p=Ce(d.key);s.id==="default"&&p?.moduleIndex===o&&!ct(p.compoundKey)&&l.set(p.compoundKey,d.value??"");const c=ci(d.key);c?.templateId===a&&c.moduleIndex===o&&c.stateId===s.id&&l.set(c.compoundKey,d.value??"")}),s.detailValues=Object.fromEntries(l),l.size&&pn(s.node,l)}),e}function qr(e=[],n=""){e.forEach((t,i)=>{const a=no(t.schemaId,n,i);if(!a?.states?.length)return;const o=a.states.map(s=>Hv({...s,schemaId:Ur(n,i,a,s.id)||s.schemaId})).filter(Boolean);o.length&&(t.guidedStates=o,t.activeGuidedStateId=ao(n,i,a))})}function gd(e){!e?.sourcePageTemplateId||e.sourcePageTemplateNodeIndex===void 0||!e.activeGuidedStateId||(r.pageTemplateBlueprintStates=r.pageTemplateBlueprintStates||{},r.pageTemplateBlueprintStates[bt(e.sourcePageTemplateId,e.sourcePageTemplateNodeIndex)]=e.activeGuidedStateId)}function _k(e,n,t){const i=bt(e,n);r.pageTemplateBlueprintStates=r.pageTemplateBlueprintStates||{},r.pageTemplateBlueprintStates[i]=t,r.pages.forEach(a=>{if(a.sourcePageTemplateId!==e)return;const o=a.nodes?.find(s=>Number(s.sourcePageTemplateNodeIndex)===Number(n));o?.guidedStates?.length&&gn(o,t)})}function Bk(e,n,t){if(!ti.some(a=>a.id===t))return;r.pageTemplateBlueprintStates=r.pageTemplateBlueprintStates||{},r.pageTemplateBlueprintStates[Rv(e,n)]=t;const i=ti.find(a=>a.id===t);r.pages.forEach(a=>{if(a.sourcePageTemplateId!==e)return;const o=a.nodes?.find(p=>Number(p.sourcePageTemplateNodeIndex)===Number(n)),s=o?.guidedStates?.find(p=>p.id==="entry"),l=Hi(i?.schemaId);if(!s||!l)return;s.component=i.schemaId,s.node=Za(l,{},i);const d=new Map;r.prdTableRows.forEach(p=>{const c=ci(p.key);c?.templateId===e&&c.moduleIndex===n&&c.stateId===`entry:${t}`&&d.set(c.compoundKey,p.value??"")}),d.size&&(s.detailValues=Object.fromEntries(d),pn(s.node,d)),o.activeGuidedStateId==="entry"&&gn(o,"entry")})}function Wr(e=[],n=""){e.forEach((t,i)=>{if(!t?.guidedStates?.length)return;const a=ao(n||t.sourcePageTemplateId,i,{states:t.guidedStates});gn(t,a)})}function Dv(e,n,t){return`${e||""}|${n}|${t}`}function Lv(e,n,t,i=[]){const a=Dv(e,n,t),o=r.pageTemplateChildStates?.[a];return i.some(s=>s.id===o)?o:i[0]?.id||null}function md(e,n,t,i){r.pageTemplateChildStates=r.pageTemplateChildStates||{},r.pageTemplateChildStates[Dv(e,n,t)]=i,r.pages.forEach(a=>{if(a.sourcePageTemplateId!==e)return;const s=a.nodes?.find(l=>Number(l.sourcePageTemplateNodeIndex)===Number(n))?.children?.[Number(t)];s?.guidedStates?.length&&gn(s,i)})}function Gv(e=[],n=""){e.forEach((t,i)=>{(t?.children||[]).forEach((a,o)=>{if(!a?.guidedStates?.length)return;const s=Lv(n||t.sourcePageTemplateId,i,o,a.guidedStates);s&&gn(a,s)})})}function Ak(e){const n=G.find(a=>a.id===e),t=yn(e);if(!n||!t)return;ja(),t.sourceMoleculeTemplateId=e;const i={id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:"分子模板编辑",dimension:"组件模板",tags:["后台管理","分子模板"],nodes:[t],canvasBackground:"#f8fafc",navBarEnabled:!1};r.currentTemplateId=null,r.activity={name:`编辑模板：${n.name}`,note:"后台管理 → 分子模板修改"},r.pages=[i],r.activePageId=i.id,r.selectedDimension=i.dimension,r.selectedId=t.id,r.dropIndex=null,r.dropPageId=null,r.dropMoleculeId=null,r.dropChildIndex=null,r.activePanelTab="materials",r.activeLibrary="materials",r.activeTab="atom",r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,r.canvasZoom=1,r.canvasPanX=40,r.canvasPanY=40,r.view="workbench",T(),requestAnimationFrame(()=>Ds())}function Mk(e,n){return n==="molecule"?yn(e):ce(e)}function Ov(e){const[n,t={}]=e;return G.find(a=>a.id===n)?yn(n):ce(n,t)}function wn(e){if(!e?.nodes)return[];if(e.isCustom){const n=t=>(t.name=Hn(t.schemaId,t.name),(t.children||[]).forEach(n),t);return oe(e.nodes).map(n)}return e.nodes.map(Ov).filter(Boolean)}function Vv(e,n={}){return{id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:n.name||e.name,dimension:n.dimension||"页面维度",tags:n.tags||[e.audience,e.goal],nodes:wn(e),canvasBackground:e.background||"#ffffff",navBarEnabled:!!(n.navBarEnabled||e.navBarEnabled)}}function jk(e,n){if(e.templateId){const t=Wa.find(i=>i.id===e.templateId);if(t)return Vv(t,e)}return{id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:e.name||`页面 ${n+1}`,dimension:e.dimension||"自定义维度",tags:e.tags||["自定义场景"],nodes:(e.nodes||[]).map(Ov),canvasBackground:e.canvasBackground||"#ffffff",navBarEnabled:!!e.navBarEnabled}}function Rk(e){ja();const n=e.pages.map(jk);r.activity={name:e.name,note:e.description||"活动 → 页面 → 分子 → 原子"},r.pages=n.length?n:[Cv()],r.activePageId=r.pages[0].id,r.selectedDimension=r.pages[0].dimension||"未分组",r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,r.canvasZoom=1,r.canvasPanX=40,r.canvasPanY=40,r.view="workbench",T(),requestAnimationFrame(()=>Ds())}function fd(){const{name:e,dimensions:n,pages:t}=r.createDraft,i=[];n.forEach(a=>{const o=t[a]||[];o.length===0?i.push({id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:"页面 1",dimension:a,tags:["默认场景"],nodes:[],canvasBackground:"#ffffff",navBarEnabled:!1}):o.forEach(s=>{let l=[],d="#ffffff",p=!1;if(s.templateId){const c=[...pe,...ne].find(u=>u.id===s.templateId);c&&(l=wn(c),d=c.canvasBackground||c.background||"#ffffff",p=!!c.navBarEnabled)}i.push({id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:s.name||"页面",dimension:a,tags:s.templateId?["自定义模板"]:["默认场景"],nodes:l,canvasBackground:d,navBarEnabled:p})})}),Rk({name:e||"新活动",description:"自定义创建的活动",pages:i})}function Hk(e,n,t=r.nodes.length){const i=Mk(e,n);r.nodes.splice(t,0,i),r.selectedId=i.id,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.dropIndex=null,r.dropPageId=null,T()}function Ro(e=r.selectedDimension||Q().dimension||"自定义维度"){const n=Cv();n.dimension=e,r.pages.push(n),r.activePageId=n.id,r.selectedDimension=e,r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,T()}function Dk(e){const n=Wa.find(i=>i.id===e);if(!n)return;const t=Vv(n);r.pages.push(t),r.activePageId=t.id,r.selectedDimension=t.dimension||"未分组",r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,T()}function Lk(e,n){const t=pe.find(o=>o.id===e);if(!t)return;const i=n||r.selectedDimension||Q().dimension||"自定义维度",a={id:`page_${Date.now()}_${Math.random().toString(16).slice(2)}`,name:t.name,dimension:i,tags:[t.category],nodes:wn(t),canvasBackground:t.canvasBackground||t.background||"#ffffff",navBarEnabled:!!t.navBarEnabled};r.pages.push(a),r.activePageId=a.id,r.selectedDimension=i,r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,r.pageTemplateModalOpen=!1,r.pageTemplateModalDimension="",T()}function xd(e){r.pageTemplateModalOpen=!0,r.pageTemplateModalDimension=e||"",T()}function hi(){r.pageTemplateModalOpen=!1,r.pageTemplateModalDimension="",T()}function Gk(e){if(r.pages.length<=1)return;const n=r.pages.findIndex(t=>t.id===e);if(!(n<0)){if(r.pages.splice(n,1),r.activePageId===e){const t=r.pages[Math.max(0,n-1)]||r.pages[0];r.activePageId=t.id}r.selectedDimension=Q().dimension||"未分组",r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,T()}}function Sn(e){r.activePageId!==e&&(r.activePageId=e,r.selectedDimension=Q().dimension||"未分组",r.selectedId=null,r.dropIndex=null,r.dropPageId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1)}function xe(e,n,t=null){for(const i of e){if(i.id===n)return{node:i,parent:t};if(i.children){const a=xe(i.children,n,i);if(a)return a}}return null}function te(){const e=r.selectedId||document.querySelector(".node-wrap.selected")?.dataset.nodeId;return e?xe(r.nodes,e):null}function Uv(e,n=r.nodes){const t=n.findIndex(i=>i.id===e);return t>=0?(n.splice(t,1),!0):n.some(i=>i.children&&Uv(e,i.children))}function Ok(e,n,t=r.activePageId,i=r.activePageId){const a=r.pages.find(p=>p.id===t)||Q(),o=r.pages.find(p=>p.id===i)||Q();let s=null,l=a.nodes.findIndex(p=>p.id===e);if(l>=0)[s]=a.nodes.splice(l,1);else{const p=xe(a.nodes,e);if(p&&p.parent){const c=p.parent.children;l=c.findIndex(u=>u.id===e),l>=0&&([s]=c.splice(l,1))}}if(!s)return;const d=a===o&&l>=0&&l<n?n-1:n;o.nodes.splice(Math.max(0,Math.min(d,o.nodes.length)),0,s)}function Vk(e,n,t){const i=xe(r.nodes,n);if(!i)return;const a=i.node.allowedChildren;if(Array.isArray(a)&&!a.includes(e))return;const o=ce(e);i.node.children.splice(Math.max(0,Math.min(t,i.node.children.length)),0,o),r.selectedId=o.id,r.colorPanelOpen=!1,r.variantPanelOpen=!1}function Uk(e,n,t){const i=xe(r.nodes,e);if(!i)return;const a=xe(r.nodes,n);if(!a||e===n)return;const o=i.node;if(o.type==="molecule")return;const s=a.node.allowedChildren;if(Array.isArray(s)&&!s.includes(o.schemaId))return;const l=i.parent&&i.parent.id===n;let d=-1;if(i.parent){const u=i.parent.children;d=u.findIndex(g=>g.id===e),d>=0&&u.splice(d,1)}else d=r.nodes.findIndex(u=>u.id===e),d>=0&&r.nodes.splice(d,1);const p=a.node.children;let c=t;l&&d>=0&&d<t&&(c=t-1),c=Math.max(0,Math.min(c,p.length)),p.splice(c,0,o),r.selectedId=e,r.colorPanelOpen=!1,r.variantPanelOpen=!1}function Kk(e){const n=e.replace("#","");if(n.length!==6)return"#ffffff";const t=parseInt(n.slice(0,2),16),i=parseInt(n.slice(2,4),16),a=parseInt(n.slice(4,6),16);return(t*299+i*587+a*114)/1e3>160?"#17212f":"#ffffff"}async function qk(e){if(e==="MoleculeContainer")return!1;const n=G.findIndex(t=>t.id===e);return n<0?!1:(G.splice(n,1),await dI(e),!0)}function Wk(e){const n=xe(r.nodes,e);if(!n)return;const t=n.node.sourceMoleculeTemplateId,i=t?G.find(p=>p.id===t):null,a=document.querySelector(".save-molecule-bar");a&&a.remove();const o=document.createElement("div");o.className="save-molecule-bar",o.innerHTML=`
    <span style="font-size:13px;color:#344054;font-weight:600;">${i?"修改分子模板":"保存分子模板"}</span>
    <input type="text" placeholder="输入分子名称" value="${f(i?.name||"新分子")}" data-molecule-name />
    <div style="display:flex;gap:8px;">
      <button class="save-btn" data-confirm-save-molecule>${i?"覆盖保存":"保存到物料库"}</button>
      <button data-cancel-save-molecule>取消</button>
    </div>
  `,document.body.appendChild(o);const s=document.querySelector(`[data-node-id="${e}"]`);if(s){const p=s.getBoundingClientRect();o.style.left=`${Math.min(window.innerWidth-480,p.left)}px`,o.style.top=`${Math.max(10,p.top-60)}px`}else o.style.left="50%",o.style.top="80px",o.style.transform="translateX(-50%)";const l=o.querySelector("[data-molecule-name]");l.focus(),l.select();function d(){const p=l.value.trim()||"新分子",c=n.node.children||[];return{id:i?.id||`molecule_${Date.now()}`,name:p,type:"molecule",description:`由 ${c.length} 个原子组成的分子组件`,children:c.map(u=>[u.schemaId,{...u.props}])}}o.querySelector("[data-cancel-save-molecule]").addEventListener("click",()=>{o.remove()}),o.querySelector("[data-confirm-save-molecule]").addEventListener("click",()=>{const p=d(),c=i?G.findIndex(u=>u.id===i.id):-1;c>=0?(G.splice(c,1,p),n.node.name=p.name):(G.push(p),n.node.sourceMoleculeTemplateId=p.id),lI(p),r.activeTab="molecule",T(),o.remove()}),l.addEventListener("keydown",p=>{p.key==="Enter"?o.querySelector("[data-confirm-save-molecule]").click():p.key==="Escape"&&o.remove()})}function Xk(e){const n=r.pages.find(a=>!a.isSystemFallback&&(a.nodes||[]).some(o=>o.id===e));if(!n)return null;const t=(n.nodes||[]).filter(a=>a.canvasPlacement!=="page-side"),i=t.findIndex(a=>a.id===e);return i<0?null:{page:n,sortableNodes:t,index:i,canMoveUp:i>0,canMoveDown:i<t.length-1}}function Yk(e,n,t){const i=r.pages.find(c=>c.id===e);if(!i?.nodes?.length||i.isSystemFallback)return!1;const a=i.nodes.filter(c=>c.canvasPlacement!=="page-side"),o=i.nodes.filter(c=>c.canvasPlacement==="page-side"),s=a.findIndex(c=>c.id===n);if(s<0)return!1;const d=s+(t==="up"?-1:t==="down"?1:0);if(d<0||d>=a.length)return!1;const[p]=a.splice(s,1);return a.splice(d,0,p),i.nodes=[...a,...o],r.activePageId=i.id,r.selectedId=p.id,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,Zk(i),!0}function Jk(e,n){const t=r.pages.find(l=>l.id===e)||Q();if(!t?.nodes?.length||t.isSystemFallback)return!1;const i=(t.nodes||[]).find(l=>l.id===n);if(!i)return!1;const a=i.sourcePageTemplateId||t.sourcePageTemplateId,o=Number(i.sourcePageTemplateNodeIndex),s=i.moduleGroupId;return t.nodes=(t.nodes||[]).filter(l=>s?l.moduleGroupId!==s:l.id!==n),a&&Number.isInteger(o)&&(Ev(a,o),t.nodes.forEach(l=>{l.sourcePageTemplateId===a&&Number(l.sourcePageTemplateNodeIndex)>o&&(l.sourcePageTemplateNodeIndex=Number(l.sourcePageTemplateNodeIndex)-1)})),r.activePageId=t.id,r.selectedId=null,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,!0}function Zk(e){if(!e.sourcePageTemplateId)return!1;const n=[...pe,...ne].find(l=>l.id===e.sourcePageTemplateId);if(!n?.nodes?.length)return!1;const t=(e.nodes||[]).filter(l=>l.canvasPlacement!=="page-side"),i=n.nodes||[],a=new Set,o=t.map(l=>{const d=Number(l.sourcePageTemplateNodeIndex);return!Number.isInteger(d)||!i[d]||a.has(d)?null:(a.add(d),i[d])}).filter(Boolean),s=i.filter((l,d)=>!a.has(d));return n.nodes=[...o,...s],t.forEach((l,d)=>{l.sourcePageTemplateNodeIndex=d}),!0}function ur(e,n){if(e.type==="molecule"){e.children.forEach(i=>ur(i,n));return}"backgroundColor"in e.props&&(e.props.backgroundColor=n);const t=Kk(n);e.props.background=n,"textColor"in e.props&&(e.props.textColor=t),"titleColor"in e.props&&(e.props.titleColor=t),"bodyColor"in e.props&&(e.props.bodyColor=t==="#ffffff"?"rgba(255,255,255,0.82)":"#667085"),"priceColor"in e.props&&(e.props.priceColor=t),"bgGradientStart"in e.props&&(e.props.bgGradientStart=n),"bgGradientEnd"in e.props&&(e.props.bgGradientEnd=n),"topGradientStart"in e.props&&(e.props.topGradientStart=n),"topGradientEnd"in e.props&&(e.props.topGradientEnd=n),"dividerColor"in e.props&&(e.props.dividerColor=n),"tagButtonColor"in e.props&&(e.props.tagButtonColor=n),"titleColor"in e.props&&(e.props.titleColor=t),"amountColor"in e.props&&(e.props.amountColor=t),"unitColor"in e.props&&(e.props.unitColor=t),"tagColor"in e.props&&(e.props.tagColor=t);for(let i=1;i<=3;i+=1){const a=`coupon${i}`;`${a}BgGradientStart`in e.props&&(e.props[`${a}BgGradientStart`]=n),`${a}BgGradientEnd`in e.props&&(e.props[`${a}BgGradientEnd`]=n),`${a}TopGradientStart`in e.props&&(e.props[`${a}TopGradientStart`]=n),`${a}TopGradientEnd`in e.props&&(e.props[`${a}TopGradientEnd`]=n),`${a}DividerColor`in e.props&&(e.props[`${a}DividerColor`]=n),`${a}TagButtonColor`in e.props&&(e.props[`${a}TagButtonColor`]=n),`${a}TitleColor`in e.props&&(e.props[`${a}TitleColor`]=t),`${a}AmountColor`in e.props&&(e.props[`${a}AmountColor`]=t),`${a}UnitColor`in e.props&&(e.props[`${a}UnitColor`]=t),`${a}TagColor`in e.props&&(e.props[`${a}TagColor`]=t)}}function Qk(e){return e.props?.background||e.props?.topGradientEnd||e.props?.topGradientStart||e.props?.coupon1TopGradientEnd||e.props?.coupon1TopGradientStart||"#ffffff"}function pa(){const e=A(".material-list");if(r.activeLibrary==="templates"){eP(e);return}const n=r.activeTab==="atom"?jt.filter(t=>!t.canvasOnly):G;if(!n.length){e.innerHTML=`
      <div class="empty-library">
        <strong>暂无组件</strong>
        <span>把新组件按规范放进项目后，再录入到物料库。</span>
      </div>
    `;return}e.innerHTML=n.map(t=>{const i=t.type==="molecule"?fo(t):Mn(t.id),a=r.activeTab==="atom"&&Ar.has(t.id)?'<span class="material-badge">模块级</span>':"",o="",s=["MoleculeContainer","TaskListModule",...ev],d=t.type==="molecule"&&!s.includes(t.id)?`<button class="material-delete-btn" data-delete-molecule="${t.id}" title="删除">×</button>`:"";return`
        <div class="material-card-wrapper">
          <button class="material-card${o}" data-material-id="${t.id}" data-type="${t.type}">
            <div class="material-preview">${i}</div>
            <div class="material-meta">
              <strong>${t.name}${a}</strong>
            </div>
          </button>
          ${d}
        </div>
      `}).join("")}function eP(e){const n=[...Wa,...ne];if(!n.length){e.innerHTML=`
      <div class="empty-library">
        <strong>暂无模板</strong>
        <span>在画布中选择页面，点击保存按钮可保存为自定义模板。</span>
      </div>
    `;return}const t=n.filter(o=>!o.isCustom),i=n.filter(o=>o.isCustom);let a="";t.length>0&&(a+=`
      <div class="template-section">
        <div class="template-section-title">内置模板</div>
        <div class="template-grid">
          ${t.map(o=>`
                <button class="template-card" data-template-id="${o.id}">
                  <div class="template-preview" style="background:${o.background}">
                    ${o.nodes.map(s=>qv(s)).join("")}
                  </div>
                  <div class="material-meta">
                    <strong>${v(o.name)}</strong>
                    <span>${v(o.audience||"")} · ${v(o.goal||"")}</span>
                  </div>
                </button>
              `).join("")}
        </div>
      </div>
    `),i.length>0&&(a+=`
      <div class="template-section">
        <div class="template-section-title">
          自定义模板
          <span class="template-count">${i.length}</span>
        </div>
        <div class="template-grid">
          ${i.map(o=>`
                <div class="template-card-wrapper">
                  <button class="template-card custom-template" data-custom-template-id="${o.id}">
                    <div class="template-preview" style="background:${o.canvasBackground||"#ffffff"}">
                      ${Kv(o)}
                    </div>
                    <div class="material-meta">
                      <strong>${v(o.name)}</strong>
                      <span>${o.nodes.length} 个组件</span>
                    </div>
                  </button>
                  <button class="template-delete" data-delete-custom-template="${o.id}" title="删除模板">×</button>
                </div>
              `).join("")}
        </div>
      </div>
    `),e.innerHTML=a}function Kv(e){return!e.nodes||e.nodes.length===0?'<div class="template-empty-preview">空白页面</div>':e.nodes.map(n=>{if(n.type==="atom")return Mn(n.schemaId,n.props);if(n.type==="molecule"){const t=G.find(i=>i.id===n.schemaId);return t?fo(t):""}return""}).join("")}function qv(e){const[n,t={}]=e,i=G.find(a=>a.id===n);return i?fo(i):Mn(n,t)}const nP="0.1.0";let gr=null,Aa="",hd=Promise.resolve(),Ut=null;function Bt(){const e=_t?.id||r.historyUser?.id||"";return r.collaboration.users.find(n=>n.id===e)||_t||null}function ri(e){return r.collaboration.teams.find(n=>n.id===String(e||""))||null}function tP(){return r.adminUnlocked}let Ma=null;function $n(e){return r.collaboration=e,window.clearTimeout(Ma),Ma=window.setTimeout(async()=>{try{await U2(r.collaboration)}catch(n){console.warn("协作数据暂未同步到服务端，已保留本地副本",n)}},400),e}function Ho(e=[],n=[]){const t=new Map;return[...e,...n].forEach(i=>{if(!i?.id)return;const a=t.get(String(i.id));(!a||new Date(i.updatedAt||0).getTime()>=new Date(a.updatedAt||0).getTime())&&t.set(String(i.id),i)}),[...t.values()]}async function Wv({syncLocal:e=!0}={}){try{const n=await G3(),t=V2({version:1,users:Ho(n.users,r.collaboration.users),teams:Ho(n.teams,r.collaboration.teams),records:Ho(n.records,r.collaboration.records),updatedAt:n.updatedAt},_t);return r.collaboration=t,!r.historyGroupId&&t.teams[0]&&(r.historyGroupId=t.teams[0].id),e&&(window.clearTimeout(Ma),Ma=window.setTimeout(()=>{U2(r.collaboration).catch(i=>{console.warn("本地协作数据上传失败",i)})},100)),T(),!0}catch(n){return console.warn("协作服务不可用，继续使用本地数据",n),!1}}async function iP(){r.adminUnlocked=!1,r.adminAuthError="";try{await _r()}catch(e){console.warn("后台解锁状态清理失败",e)}r.adminAuthModalOpen=!0,T()}function ja(){window.clearTimeout(gr),r.historyCurrentProjectId=null,r.historyCurrentVersionId=null,r.historyLocalDraftId=vv(),r.historySaveScope="personal",r.historySaveGroupId="",r.historyCollaborationRecordId=null,Aa=""}function Xv(e,n=new Set){return(e||[]).forEach(t=>{t?.schemaId&&n.add(t.schemaId),Xv(t?.children,n)}),n}function Yv(){const e=new Set;r.pages.forEach(d=>Xv(d.nodes,e));const n=Q(),t=r.currentTemplateId||n?.sourcePageTemplateId||n?.templateId||"",i=[...pe,...ne],a=i.find(d=>d.id===t),o=new Set(r.pages.flatMap(d=>[d.sourcePageTemplateId,d.templateId].filter(Boolean)));t&&o.add(t);const s=i.filter(d=>o.has(d.id)),l=G.filter(d=>e.has(d.id));return w3(r,{appVersion:nP,activePageTemplate:a||null,referencedPageTemplates:s,referencedMoleculeTemplates:l,stage:r.view==="guided-preview"?"preview":"blueprint"})}async function ca(e,n=!1,t=r.historySaveScope,i=r.historySaveGroupId){const a=Bt(),o=t==="team"?ri(i):null;try{const s=await D2({id:r.historyLocalDraftId,ownerId:r.historyUser?.id||a?.id||"anonymous",projectId:r.historyCurrentProjectId,baseVersionId:r.historyCurrentVersionId,name:r.activity?.name||"未命名活动",snapshot:e,synced:n,scope:o?"team":"personal",teamId:o?.id||null}),l=r.historyLocalDrafts.findIndex(d=>d.id===s.id);return l>=0?r.historyLocalDrafts[l]=s:r.historyLocalDrafts.unshift(s),s}catch(s){return console.warn("保存本地项目草稿失败",s),null}}function aP(e){const n=r.historyProjects.findIndex(t=>t.id===e.id);n>=0?r.historyProjects[n]=e:r.historyProjects.unshift(e)}async function oP({saveType:e="manual",silent:n=!1,targetScope:t=r.historySaveScope,targetGroupId:i=r.historySaveGroupId}={}){const a=t==="team"?ri(i):null,o=a?"team":"personal";r.historySaveScope=o,r.historySaveGroupId=a?.id||"";const s=Yv(),l=await ca(s,!1,o,a?.id);try{if(r.historyUser||(r.historyUser=await R2(),await ca(s,!1,o,a?.id)),r.historyCurrentProjectId)if(e==="autosave")await P3(r.historyCurrentProjectId,{baseVersionId:r.historyCurrentVersionId,snapshot:s});else{const p=await z3(r.historyCurrentProjectId,{baseVersionId:r.historyCurrentVersionId,snapshot:s});r.historyCurrentVersionId=p.version.id;const c=r.historyProjects.find(u=>u.id===r.historyCurrentProjectId);c&&(c.name=r.activity?.name||c.name,c.prdUrl=r.prdFeishuUrl||"",c.templateId=r.currentTemplateId||"",c.latestVersionId=p.version.id,c.updatedAt=p.version.createdAt)}else{if(e==="autosave")return{cloudSaved:!1,localSaved:!!l,snapshot:s};const p=await k3({name:r.activity?.name||"未命名活动",prdUrl:r.prdFeishuUrl||"",templateId:r.currentTemplateId||"",snapshot:s,scope:o,teamId:a?.id||null});r.historyCurrentProjectId=p.project.id,r.historyCurrentVersionId=p.version.id,aP(p.project)}r.historyError="",await ca(s,!0,o,a?.id);const d=Bt();if(d){const p=r.collaboration.records.find(u=>u.id===r.historyCollaborationRecordId),c=p&&p.scope===o&&(o!=="team"||p.teamId===a?.id);$n($a(r.collaboration,{id:c?p.id:r.historyCurrentProjectId||r.historyLocalDraftId,projectId:r.historyCurrentProjectId,ownerId:d.id,name:r.activity?.name||"未命名活动",scope:o,teamId:a?.id||null,snapshot:s}))}return{cloudSaved:!0,localSaved:!!l,snapshot:s}}catch(d){const p=d instanceof va?d.message:"云端保存失败";r.historyError=l?`${p}，本次修改已保存在本地`:`${p}，且本地草稿保存失败`;const c=Bt();if(l&&c){const u=r.collaboration.records.find(w=>w.id===r.historyCollaborationRecordId),g=u&&u.scope===o&&(o!=="team"||u.teamId===a?.id);$n($a(r.collaboration,{id:g?u.id:r.historyCurrentProjectId||r.historyLocalDraftId,projectId:r.historyCurrentProjectId,ownerId:c.id,name:r.activity?.name||"未命名活动",scope:o,teamId:a?.id||null,snapshot:s}))}return n||window.alert(r.historyError),{cloudSaved:!1,localSaved:!!l,snapshot:s}}}function Jv(e={}){const n=hd.catch(()=>null).then(()=>oP(e));return hd=n,n}function bd(e,n="personal",t=""){if(!e)return;const i=e.dataset.saveOriginalText||e.textContent;e.dataset.saveOriginalText=i,e.disabled=!0,e.textContent="保存中",Jv({targetScope:n,targetGroupId:t}).then(a=>{e.textContent=a.cloudSaved?"已保存":a.localSaved?"已存本地":"保存失败",e.classList.toggle("saved",a.cloudSaved)}).catch(a=>{console.error("保存项目失败",a),e.textContent="保存失败"}).finally(()=>{window.setTimeout(()=>{e.disabled=!1,e.textContent=i,e.classList.remove("saved"),delete e.dataset.saveOriginalText},1500)})}function Do(){["workbench","prd-demo","guided-preview"].includes(r.view)&&(window.clearTimeout(gr),gr=window.setTimeout(async()=>{const e=Yv(),n=JSON.stringify(e.editor);n!==Aa&&(Aa=n,await ca(e,!1),r.historyCurrentProjectId&&await Jv({saveType:"autosave",silent:!0}))},1500))}async function Zv(){r.historyStatus="loading",r.historyError="",T();try{const e=await R2();r.historyUser=e;const n=await L2(r.historyLocalDraftId).catch(()=>null);n?.ownerId==="anonymous"&&await D2({...n,ownerId:e.id}).catch(()=>null);const[t,i]=await Promise.all([I3(),Kl(e.id)]);r.historyProjects=t,r.historyLocalDrafts=i,r.historyStatus="ready"}catch(e){r.historyUser=_t,r.historyProjects=[],r.historyLocalDrafts=await Kl(_t?.id||"anonymous").catch(()=>[]),r.historyError=e instanceof va?e.message:"项目历史加载失败",r.historyStatus="error"}T()}function rP(){r.view="mine",r.historyStatus="loading",T(),Zv()}async function sP(e){if(r.historyExpandedProjectId===e){r.historyExpandedProjectId=null,T();return}r.historyExpandedProjectId=e,T();try{r.historyVersions[e]=await F3(e),r.historyError=""}catch(n){r.historyError=n.message||"版本列表加载失败"}T()}function lP(e){const n=e.templates||{};(n.referencedMoleculeTemplates||[]).forEach(i=>{i?.id&&!G.some(a=>a.id===i.id)&&G.push(oe(i))}),[...n.referencedPageTemplates||[],n.activePageTemplate].filter(Boolean).forEach(i=>{i?.id&&![...pe,...ne].some(a=>a.id===i.id)&&ne.push({...oe(i),isCustom:!0})}),ft(),Mr()}function Xr(e,n,t){const i=C3(r,e);lP(i),r.historyCurrentProjectId=n||null,r.historyCurrentVersionId=t||null,r.historyLocalDraftId=vv(),r.prdDemoStep="analysis",r.view=i.resume?.stage==="preview"?"guided-preview":r.workflowType==="resource"?"resource-blueprint":"prd-demo",Aa=JSON.stringify(i.editor),T()}async function dP(e,n){try{const t=r.historyProjects.find(o=>o.id===e),i=n||t?.latestVersionId;if(!i)throw new Error("该项目没有可恢复的版本");const a=await H2(e,i);Xr(a.snapshot,e,t?.latestVersionId||a.id)}catch(t){r.historyError=t.message||"项目恢复失败",T()}}async function pP(e,n){const t=r.historyProjects.find(o=>o.id===e),i=ri(n),a=Bt();if(!(!t?.latestVersionId||!i||!a)){try{const o=await H2(e,t.latestVersionId);$n($a(r.collaboration,{ownerId:a.id,name:`${t.name} - 副本`,scope:"team",teamId:i.id,snapshot:o.snapshot})),r.historyGroupId=i.id,r.historyScope="team",r.historyError=""}catch(o){r.historyError=o.message||"复制项目失败"}T()}}async function cP(e){try{const n=await L2(e);if(!n?.snapshot)throw new Error("本地草稿不存在");r.historySaveScope=n.scope==="team"?"team":"personal",r.historySaveGroupId=n.scope==="team"&&n.teamId||"",r.historyCollaborationRecordId=null;const t=r.historyProjects.find(i=>i.id===n.projectId);Xr(n.snapshot,n.projectId,n.baseVersionId||t?.latestVersionId||null),r.historyLocalDraftId=Sv(n.id)}catch(n){r.historyError=n.message||"本地草稿恢复失败",T()}}async function uP(e){if(window.confirm("删除后将无法在“我的”中恢复该项目，确定继续吗？"))try{await N3(e),r.historyProjects=r.historyProjects.filter(n=>n.id!==e),r.historyCurrentProjectId===e&&(r.historyCurrentProjectId=null,r.historyCurrentVersionId=null),T()}catch(n){r.historyError=n.message||"项目删除失败",T()}}function yi(e){return e?new Intl.DateTimeFormat("zh-CN",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e)):""}function gP(){const e=A(".activity-center");if(!e)return;const n=Bt(),t=r.historyScope==="team"?"team":"personal",i=ri(r.historyGroupId)||r.collaboration.teams[0]||null;i&&r.historyGroupId!==i.id&&(r.historyGroupId=i.id);const a=r.historyLocalDrafts.filter(g=>!g.synced&&(g.scope==="team"?"team":"personal")===t&&(t!=="team"||g.teamId===i?.id)),o=L3(r.collaboration,n?.id,t,i?.id),s=new Set(r.historyProjects.map(g=>String(g.id))),l=new Set(r.historyLocalDrafts.map(g=>String(g.id))),d=o.filter(g=>!s.has(String(g.projectId||g.id))&&!l.has(String(g.id))),p=new Set(r.collaboration.records.filter(g=>g.scope==="team"&&g.projectId).map(g=>String(g.projectId))),c=r.historyProjects.filter(g=>!p.has(String(g.id))),u=t==="personal"?c.length||a.length||d.length:o.length;e.innerHTML=`
    <div class="project-history-shell">
      <nav class="prd-minimal-nav">
        <button class="prd-brand" data-back-home aria-label="返回活动中心">
          <span>+</span>
          <strong>DOU+ 活动生成器</strong>
        </button>
        <button type="button" class="project-history-back" data-back-home>返回活动中心</button>
      </nav>
      <header class="project-history-header">
        <div>
          <span>MY PROJECTS</span>
          <h1>我的项目</h1>
          <p>${n?`已绑定 ${v(n.name||"当前飞书用户")}`:"云端登录态未接入时，仅展示本地草稿"}</p>
        </div>
        <button type="button" data-history-refresh>刷新</button>
      </header>
      <div class="project-history-tabs" role="tablist" aria-label="历史记录范围">
        <button
          type="button"
          class="${t==="personal"?"active":""}"
          data-history-scope="personal"
          role="tab"
          aria-selected="${t==="personal"}"
        >个人</button>
        <button
          type="button"
          class="${t==="team"?"active":""}"
          data-history-scope="team"
          role="tab"
          aria-selected="${t==="team"}"
        >组</button>
      </div>
      ${t==="team"?`
            <div class="project-history-group-filter">
              <label for="history-group-select">当前组</label>
              <select id="history-group-select" data-history-group-select ${i?"":"disabled"}>
                ${r.collaboration.teams.map(g=>`<option value="${f(g.id)}" ${g.id===i?.id?"selected":""}>${v(g.name)}</option>`).join("")||'<option value="">暂无组</option>'}
              </select>
              <span>所有用户都可以查看和编辑组内记录</span>
            </div>
          `:""}
      ${r.historyError?`<div class="project-history-notice">${v(r.historyError)}</div>`:""}
      ${r.historyStatus==="loading"?'<div class="project-history-empty">正在加载项目...</div>':""}
      ${r.historyStatus!=="loading"&&!u?`<div class="project-history-empty"><strong>${t==="team"?i?"这个组还没有项目":"还没有创建组":"还没有保存的项目"}</strong><span>完成编辑后使用保存按钮创建第一个版本。</span></div>`:""}
      ${a.length?`
            <section class="project-history-section">
              <header><strong>本地草稿</strong><span>云端不可用时自动保留</span></header>
              <div class="project-history-list">
                ${a.map(g=>`
                      <article class="project-history-item is-local">
                        <div>
                          <strong>${v(g.name)}</strong>
                          <span>${yi(g.updatedAt)} · 待同步</span>
                        </div>
                        <div class="project-history-actions">
                          <button type="button" data-restore-local="${g.id}">继续编辑</button>
                          <button type="button" data-delete-local="${g.id}" aria-label="删除本地草稿">删除</button>
                        </div>
                      </article>
                    `).join("")}
              </div>
            </section>
          `:""}
      ${t==="personal"&&c.length?`
            <section class="project-history-section">
              <header><strong>云端项目</strong><span>${c.length} 个项目</span></header>
              <div class="project-history-list">
                ${c.map(g=>{const w=r.historyVersions[g.id],y=r.historyExpandedProjectId===g.id;return`
                      <article class="project-history-item">
                        <div>
                          <strong>${v(g.name)}</strong>
                          <span>${yi(g.updatedAt)}${g.prdUrl?" · 飞书 PRD":""}</span>
                        </div>
                        <div class="project-history-actions">
                          <button type="button" data-restore-project="${g.id}">打开</button>
                          ${r.collaboration.teams.length?`
                                <select data-copy-project-group="${f(g.id)}" aria-label="复制目标组">
                                  ${r.collaboration.teams.map(h=>`<option value="${f(h.id)}">${v(h.name)}</option>`).join("")}
                                </select>
                                <button type="button" data-copy-project-to-group="${f(g.id)}">复制到组</button>
                              `:""}
                          <button type="button" data-toggle-versions="${g.id}">${y?"收起版本":"查看版本"}</button>
                          <button type="button" data-delete-project="${g.id}" aria-label="删除项目">删除</button>
                        </div>
                      </article>
                      ${y?`<div class="project-version-list">${w?w.map(h=>`
                                        <button type="button" data-restore-project="${g.id}" data-version-id="${h.id}">
                                          <span>V${h.versionNo} · ${h.saveType==="autosave"?"自动草稿":"正式版本"}</span>
                                          <time>${yi(h.createdAt)}</time>
                                        </button>
                                      `).join(""):"<span>正在加载版本...</span>"}</div>`:""}
                    `}).join("")}
              </div>
            </section>
          `:""}
      ${(t==="team"?o:d).length?`
            <section class="project-history-section">
              <header>
                <strong>${t==="team"?v(i?.name||"组项目"):"本地历史"}</strong>
                <span>${(t==="team"?o:d).length} 个项目</span>
              </header>
              <div class="project-history-list">
                ${(t==="team"?o:d).map(g=>{const w=r.collaboration.users.find(y=>y.id===g.ownerId);return`
                      <article class="project-history-item">
                        <div>
                          <strong>${v(g.name)}</strong>
                          <span>${yi(g.updatedAt)}${t==="team"?` · ${v(w?.name||"创建者")}`:""}</span>
                        </div>
                        <div class="project-history-actions">
                          <button type="button" data-restore-collab-record="${f(g.id)}">打开编辑</button>
                          ${t==="team"?`<button type="button" data-copy-record-personal="${f(g.id)}">复制到个人</button>`:r.collaboration.teams.length?`
                                  <select data-copy-record-group="${f(g.id)}" aria-label="复制目标组">
                                    ${r.collaboration.teams.map(y=>`<option value="${f(y.id)}">${v(y.name)}</option>`).join("")}
                                  </select>
                                  <button type="button" data-copy-record-team="${f(g.id)}">复制到组</button>
                                `:""}
                        </div>
                      </article>
                    `}).join("")}
              </div>
            </section>
          `:""}
    </div>
  `}function oo(){const e=A(".activity-center");e&&(e.innerHTML=`
    <div class="prd-flow-shell is-home">
      <nav class="prd-minimal-nav">
        <button class="prd-brand" data-back-home aria-label="返回首页">
          <span>+</span>
          <strong>DOU+ 活动生成器</strong>
        </button>
        <div class="prd-progress">
          <span class="active">01 上传</span>
          <i></i>
          <span>02 确认</span>
          <i></i>
          <span>03 预览</span>
        </div>
        <div class="prd-nav-actions">
          <button type="button" class="prd-admin-link" data-open-my-projects>我的</button>
          <button type="button" class="prd-admin-link" data-open-admin-dashboard>后台管理</button>
        </div>
      </nav>
      <section class="prd-home">
        <header class="prd-home-hero">
          <span>AI ACTIVITY BUILDER</span>
          <h1>从 PRD 开始<br />生成完整活动</h1>
          <p>自动识别页面、人群和业务内容，生成可直接确认的活动蓝图。</p>
        </header>
        <div class="prd-home-side flow-entry-grid">
          <div class="prd-upload-tool">
            <div class="prd-tool-head">
              <span>新建活动</span>
              <i>01</i>
            </div>
            <button class="prd-upload-target" data-demo-open-file-modal>
              <span class="prd-upload-target-icon">↑</span>
              <strong>上传活动 PRD</strong>
              <em>导入文档或选择模板直接进入</em>
            </button>
            <div class="prd-tool-footer">
              <span>DOCX</span>
              <span>PDF</span>
              <span>表格粘贴</span>
              <b>最大 20MB</b>
            </div>
          </div>
          <div class="prd-upload-tool resource-entry-tool">
            <div class="prd-tool-head">
              <span>新建资源位</span>
              <i>02</i>
            </div>
            <button class="prd-upload-target resource-entry-target" data-open-resource-flow>
              <span class="prd-upload-target-icon">▦</span>
              <strong>生成资源位</strong>
              <em>选择活动级别，一次生成多个资源位</em>
            </button>
            <div class="prd-tool-footer">
              <span>日常级别</span>
              <span>S级别</span>
              <b>多人群版本</b>
            </div>
          </div>
        </div>
        ${r.prdFileModalOpen?GP():""}
      </section>
      ${r.createModalOpen?WS():""}
      ${r.adminAuthModalOpen?xP():""}
    </div>
  `)}function Jn(e=r.resourceLevel){return pt[e]||pt.daily}function We(e=r.resourceLevel){var a;const n=e==="s"?"s":"daily";r.resourceDrafts||(r.resourceDrafts={}),(a=r.resourceDrafts)[n]||(a[n]=dr(n));const t=r.resourceDrafts[n],i=Jn(n);return t.modules||(t.modules={}),i.slots.forEach(o=>{var s,l;(s=t.modules)[l=o.id]||(s[l]={versions:[Ja(o,0)]})}),t}function yd(e,n=""){const t=Jn(),i=We();for(const a of t.slots){const o=Ya(a).find(l=>l.key===e);if(!o)continue;return i.modules?.[a.id]?.versions?.[0]?.values?.[e]??o.default??n}return n}function Ra(e,n){const t=Jn(),i=We();t.slots.forEach(a=>{Ya(a).some(s=>s.key===e)&&(i.modules?.[a.id]?.versions||[]).forEach(s=>{s.values||(s.values={}),s.values[e]=n})})}function mP(){return Jn().slots.flatMap(e=>e.fields||[]).find(e=>e.key==="mainVisualImage")}function fP(e){return`
    <nav class="prd-minimal-nav">
      <button class="prd-brand" data-back-home aria-label="返回活动中心">
        <span>+</span>
        <strong>DOU+ 活动生成器</strong>
      </button>
      <div class="prd-progress">
        <span class="active">01 蓝图</span>
        <i></i>
        <span class="">02 预览</span>
      </div>
      <div class="prd-nav-actions">
        <button type="button" class="prd-admin-link" data-save>保存版本</button>
        <button type="button" class="prd-admin-link" data-open-my-projects>我的</button>
      </div>
    </nav>
  `}function xP(){return`
    <div class="admin-auth-modal" data-admin-auth-modal>
      <form class="admin-auth-dialog" data-admin-auth-form>
        <header>
          <div>
            <span>ADMIN ACCESS</span>
            <h2>进入后台管理</h2>
          </div>
          <button type="button" data-close-admin-auth aria-label="关闭">×</button>
        </header>
        <label>
          <span>后台密码</span>
          <input
            name="password"
            type="password"
            autocomplete="current-password"
            placeholder="请输入后台密码"
            required
            autofocus
          />
        </label>
        ${r.adminAuthError?`<p class="admin-auth-error">${v(r.adminAuthError)}</p>`:""}
        <footer>
          <button type="button" data-close-admin-auth>取消</button>
          <button type="submit" class="primary" ${r.adminAuthLoading?"disabled":""}>
            ${r.adminAuthLoading?"验证中...":"进入后台"}
          </button>
        </footer>
      </form>
    </div>
  `}function hP(){const e=A(".activity-center");if(!e)return;const n=Jn(),t=We(),i=yd("__themeId","pink"),a=yd("mainVisualImage","subject-1"),o=mP();e.innerHTML=`
    <div class="prd-flow-shell is-blueprint resource-flow-shell">
      ${fP()}
      <section class="blueprint-confirm blueprint-overview resource-blueprint">
        <header class="blueprint-minimal-head resource-blueprint-head">
          <div>
            <span>资源位蓝图</span>
            <h1>填写资源位内容</h1>
            <p>每个资源位模块独立维护人群版本，并与预览画布里的“模块人群”保持联动。</p>
          </div>
          <button type="button" class="blueprint-side-generate" data-resource-generate>
            <span>预览资源位</span>
            <b>→</b>
          </button>
        </header>
        <div class="resource-level-switch" aria-label="资源位级别">
          ${Object.values(pt).map(s=>`
            <button
              type="button"
              class="${s.id===n.id?"active":""}"
              data-resource-level-switch="${s.id}"
            >
              <strong>${v(s.name)}</strong>
              <span>${s.slots.length} 个资源位</span>
            </button>
          `).join("")}
        </div>
        <section class="resource-global-controls" aria-label="资源位全局控制">
          <label>
            <span>资源位配色</span>
            ${An(Fi,i,'data-resource-global-theme class="resource-global-select"',"全局资源位配色")}
          </label>
          <label>
            <span>主体替换</span>
            ${An(o,a,'data-resource-global-main-visual class="resource-global-select"',"全局主体替换")}
          </label>
        </section>
        <section class="prd-variable-table resource-variable-table">
          <header>
            <div>
              <span>资源位变量表</span>
              <strong>${v(n.name)}</strong>
            </div>
            <em>${n.slots.length} 个资源位</em>
          </header>
          <div class="prd-variable-table-head">
            <span>资源位模块</span>
            <span>模块专属填写表单</span>
          </div>
          <div class="prd-variable-module-list">
            ${n.slots.map(s=>bP(s,t)).join("")}
          </div>
        </section>
      </section>
    </div>
  `}function bP(e,n){const t=n.modules?.[e.id]?.versions||[];return`
    <section class="prd-variable-module-row has-versions">
      <article class="prd-variable-module-name">
        <div class="prd-variable-module-title-row">
          <strong>${v(e.name)}</strong>
        </div>
        <div class="prd-variable-module-meta">
          <b>${t.length} 个人群版本</b>
          <span>${v(e.schemaId)}</span>
        </div>
        ${eS(e,n)}
      </article>
      <div class="prd-variable-section-list">
        <section
          class="prd-variable-version-matrix"
          style="--prd-version-count:${t.length}"
        >
          <div class="prd-variable-matrix-head">
            <span class="prd-variable-matrix-actions">
              <button
                type="button"
                class="prd-variable-matrix-add-version"
                data-resource-add-version="${f(e.id)}"
              >＋ 人群</button>
            </span>
            ${t.map(i=>`
              <strong class="prd-variable-version-head is-manual">
                <input
                  value="${f(i.name)}"
                  data-resource-version-name="${f(`${e.id}|${i.id}`)}"
                  aria-label="${f(`${e.name}人群名称`)}"
                />
                ${t.length>1?`
                  <button
                    type="button"
                    data-resource-remove-version="${f(`${e.id}|${i.id}`)}"
                    aria-label="删除人群"
                  >×</button>
                `:""}
              </strong>
            `).join("")}
          </div>
          ${Ya(e).map(i=>`
            <div class="prd-variable-matrix-row">
              <span>${v(i.label)}</span>
              ${t.map(a=>{const o=a.values?.[i.key]??i.default,s=`data-resource-field="${f(`${e.id}|${a.id}|${i.key}`)}"`;return rt(i)?An(i,o,`${s} class="resource-variable-select"`,`${e.name}${a.name}${i.label}`):`
                    <textarea
                      rows="2"
                      ${s}
                    >${v(o)}</textarea>
                  `}).join("")}
            </div>
          `).join("")}
        </section>
      </div>
    </section>
  `}function yP(e,n){const t=n.modules?.[e.id]?.versions||[],i=r.resourcePreviewVersionIds?.[e.id];return t.find(a=>a.id===i)||t[0]}function Qv(e,n){const t=n?.values?.__themeId||e.defaultThemeId||Fi.default;return oi(t)?.id||Fi.default}function mr(e,n){const t={...n?.values||{}};delete t.__themeId;const i=ce(e.schemaId,t);return mn([i],Qv(e,n)),i}function eS(e,n){const t=yP(e,n),i=mr(e,t),a=Rn(i),o=Math.max(1,Number(a.width||300)),s=Math.max(1,Number(a.height||300)),l=Math.min(1,208/o,220/s),d=Math.ceil(o*l),p=Math.ceil(s*l),c=Math.max(0,Math.floor((208-d)/2));return`
    <div
      class="prd-module-preview is-canvas resource-module-preview"
      data-resource-module-preview="${f(e.id)}"
      data-resource-preview-version="${f(t?.id||"")}"
      style="--prd-preview-page-width:${o}px;--prd-preview-page-height:${s}px;--prd-preview-scale:${l};height:${p}px;"
      aria-label="${f(`${e.name}实时预览`)}"
    >
      <div class="prd-module-preview-canvas-stage" style="margin-left:${c}px;">
        <section class="guided-page-shell prd-module-preview-shell">
          <div class="phone guided-phone prd-module-preview-phone">
            <div class="page guided-theme-page prd-module-preview-page">
              ${bS(i)}
            </div>
          </div>
        </section>
      </div>
    </div>
  `}function nS(e,n){const t=Jn().slots.find(l=>l.id===e),i=We();if(!t)return;r.resourcePreviewVersionIds||(r.resourcePreviewVersionIds={}),n&&(r.resourcePreviewVersionIds[e]=n);const a=document.querySelector(`[data-resource-module-preview="${CSS.escape(e)}"]`);if(!a)return;const o=document.createElement("template");o.innerHTML=eS(t,i).trim();const s=o.content.firstElementChild;s&&(a.replaceWith(s),window.renderReactMaterials?.(s))}function wd(e,n){document.querySelectorAll(`[data-resource-field$="|${CSS.escape(e)}"]`).forEach(t=>{t.value=n}),Jn().slots.forEach(t=>{nS(t.id)})}function wP(){const e=Jn(),n=We(),t=oi("pink")||he[0],i=Date.now(),a=e.slots.map((o,s)=>{const l=n.modules?.[o.id]?.versions||[Ja(o,0)],d=oi(Qv(o,l[0]))||t,p=mr(o,l[0]);return p.sourceModuleId=o.id,p.sourceSlot=o.id,p.sourceInputScope="context",p.sourceResourceSlotId=o.id,p.guidedLineageVariants=l.map((c,u)=>({id:u===0?"base":c.id,title:c.name,node:ue(mr(o,c))})),p.activeLineageVariantId="base",{id:`resource_${e.id}_${s}_${i}`,name:o.name,dimension:e.name,tags:[e.name,o.name],resourceLevel:e.id,resourceSlotId:o.id,canvasBackground:d.background,colorThemeId:d.id,navBarEnabled:!1,nodes:[p]}});r.activity={name:n.activityName||`${e.name}资源位`,note:`${e.name} → ${a.length} 个资源位`},r.pages=a,r.activePageId=a[0]?.id||"",r.guidedVisiblePageIds=a.map(o=>o.id),r.guidedVisibleCompanionNodeIds=[],r.guidedCanvasInitialized=!1,r.selectedDimension=a[0]?.dimension||"人群1",r.selectedId=null,r.demoSelectedNodeId=null,r.canvasZoom=1,r.canvasPanX=40,r.canvasPanY=40,r.currentTemplateId=null}function vP(){return`
    <div class="admin-auth-modal" data-save-scope-modal>
      <section class="admin-auth-dialog save-scope-dialog" role="dialog" aria-modal="true" aria-labelledby="save-scope-title">
        <header>
          <div>
            <span>SAVE PROJECT</span>
            <h2 id="save-scope-title">保存到哪里？</h2>
          </div>
          <button type="button" data-close-save-scope aria-label="关闭">×</button>
        </header>
        <div class="save-scope-options">
          <button type="button" data-save-scope="personal">
            <strong>保存到个人</strong>
            <span>仅自己可以在“我的”中查看和继续编辑</span>
          </button>
          <div class="save-scope-group">
            <label for="save-group-select">保存到已有组</label>
            <div>
              <select id="save-group-select" data-save-group-select ${r.collaboration.teams.length?"":"disabled"}>
                ${r.collaboration.teams.map(e=>`<option value="${f(e.id)}">${v(e.name)}</option>`).join("")||'<option value="">暂无组</option>'}
              </select>
              <button type="button" data-save-scope="team" ${r.collaboration.teams.length?"":"disabled"}>保存到组</button>
            </div>
            <span>所有用户都可以查看、编辑和复制组内记录</span>
          </div>
          <div class="save-scope-create-group">
            <label for="save-new-group">或新建组</label>
            <div>
              <input id="save-new-group" data-save-new-group placeholder="输入组名称" />
              <button type="button" data-save-create-group>新建并保存</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `}function SP(){return`
    <section class="collab-admin-panel">
      <header>
        <div>
          <strong>用户管理</strong>
          <span>${r.collaboration.users.length} 位用户</span>
        </div>
      </header>
      <div class="collab-user-list">
        ${r.collaboration.users.map(e=>`
              <article>
                <div>
                  <input value="${f(e.name)}" data-admin-user-name="${f(e.id)}" aria-label="用户名称" />
                  <span>${v(e.id)} · 用户</span>
                </div>
                <button type="button" data-admin-rename-user="${f(e.id)}">保存名称</button>
              </article>
            `).join("")}
      </div>
      <form class="collab-inline-form" data-admin-add-user-form>
        <input name="userId" placeholder="用户 ID" required />
        <input name="userName" placeholder="用户名称" required />
        <button type="submit">新增用户</button>
      </form>
    </section>
  `}function TP(){return`
    <section class="collab-admin-panel">
      <header>
        <div>
          <strong>组管理</strong>
          <span>${r.collaboration.teams.length} 个组</span>
        </div>
      </header>
      <div class="collab-team-grid">
        ${r.collaboration.teams.map(e=>`
              <article class="collab-team-card">
                <input value="${f(e.name)}" data-admin-team-name="${f(e.id)}" aria-label="组名称" />
                <span>${r.collaboration.records.filter(n=>n.scope==="team"&&n.teamId===e.id).length} 条共享记录</span>
                <button type="button" data-admin-update-team="${f(e.id)}">保存组名称</button>
              </article>
            `).join("")||'<p class="collab-empty-copy">还没有组</p>'}
      </div>
      <form class="collab-create-team" data-admin-create-team-form>
        <input name="teamName" placeholder="新组名称" required />
        <span>新建后立即对所有用户可见</span>
        <button type="submit">创建组</button>
      </form>
    </section>
  `}function $P(){return`
    <section class="collab-admin-panel">
      <header>
        <div>
          <strong>历史记录管理</strong>
          <span>${r.collaboration.records.length} 条记录</span>
        </div>
      </header>
      <div class="collab-admin-history">
        ${r.collaboration.records.map(e=>{const n=r.collaboration.users.find(i=>i.id===e.ownerId),t=r.collaboration.teams.find(i=>i.id===e.teamId);return`
                <article>
                  <div>
                    <strong>${v(e.name)}</strong>
                    <span>${v(n?.name||e.ownerId)} · ${e.scope==="team"?v(t?.name||"组"):"个人"} · ${yi(e.updatedAt)}</span>
                  </div>
                  <button type="button" data-admin-edit-record="${f(e.id)}">查看并覆盖</button>
                </article>
              `}).join("")||'<p class="collab-empty-copy">还没有可管理的历史记录</p>'}
      </div>
    </section>
  `}function CP(){const e=r.collaboration.records.find(n=>n.id===r.adminEditingRecordId);return e?`
    <div class="admin-auth-modal" data-admin-record-modal>
      <form class="admin-record-dialog" data-admin-record-form data-record-id="${f(e.id)}">
        <header>
          <div>
            <span>HISTORY OVERRIDE</span>
            <h2>查看并覆盖历史记录</h2>
          </div>
          <button type="button" data-close-admin-record aria-label="关闭">×</button>
        </header>
        <label>
          <span>记录名称</span>
          <input name="recordName" value="${f(e.name)}" required />
        </label>
        <label>
          <span>项目快照 JSON</span>
          <textarea name="recordSnapshot" spellcheck="false" required>${v(JSON.stringify(e.snapshot,null,2))}</textarea>
        </label>
        <footer>
          <button type="button" data-close-admin-record>取消</button>
          <button type="submit" class="primary">覆盖保存</button>
        </footer>
      </form>
    </div>
  `:""}function tS(){const e=A(".activity-center");if(e){if(!tP()){r.view="home",r.adminAuthModalOpen=!0,oo();return}e.innerHTML=`
    <section class="admin-shell">
      <nav class="admin-nav">
        <button class="admin-back" data-back-home>← 返回主流程</button>
        <span>管理员后台</span>
      </nav>

      <header class="admin-hero">
        <span>ADMIN CONSOLE</span>
        <h1>用户与项目管理</h1>
        <p>维护所有用户、公共组和可覆盖的历史记录。</p>
      </header>

      <div class="collab-admin-tabs" role="tablist">
        <button type="button" class="${r.adminSection==="users"?"active":""}" data-admin-section="users">用户</button>
        <button type="button" class="${r.adminSection==="teams"?"active":""}" data-admin-section="teams">组</button>
        <button type="button" class="${r.adminSection==="history"?"active":""}" data-admin-section="history">历史记录</button>
        <button type="button" class="${r.adminSection==="design"?"active":""}" data-admin-section="design">设计工具</button>
      </div>
      ${r.adminNotice?`<div class="collab-admin-notice">${v(r.adminNotice)}</div>`:""}
      ${r.adminSection==="users"?SP():""}
      ${r.adminSection==="teams"?TP():""}
      ${r.adminSection==="history"?$P():""}
      ${r.adminSection==="design"?`
            <section class="admin-action-grid">
              <button class="admin-action-card primary" data-open-create-modal>
                <span>01</span>
                <strong>进入后台画布</strong>
                <em>进入画布组合原子/分子，搭建活动页面</em>
              </button>
              <button class="admin-action-card" data-open-admin-component-verifier>
                <span>02</span>
                <strong>组件验收面板</strong>
                <em>验证蓝图同步、变量、父级色系和导出切图</em>
              </button>
            </section>
          `:""}
      ${r.createModalOpen?WS():""}
      ${CP()}
    </section>
  `}}function iS(e){const n={};return Ue(e).forEach(([t,i])=>{n[t]=i.default??""}),n}function In(e){return e?.type==="prize"||e?.control==="prize-library"}function Lo(e){return e?.type==="text"||e?.control==="textarea"}function Kn(e){const n=ot(e);return JSON.stringify({type:n.type,name:n.name,image:n.image,copy:n.copy,copyThreshold:n.copyThreshold,copyAmount:n.copyAmount})}function xn(e){return String(e||"").match(/(\d+(?:\.\d+)?)\s*元\s*流量券/)?.[1]||""}function fr(e){const t=String(e||"").replace(/,/g,"").match(/(?:送)?满\s*(00|\d+(?:\.\d+)?)\s*元?\s*(?:赠|送)\s*(?:价值)?\s*(\d+(?:\.\d+)?)\s*元?(?:\s*流量)?/);return t?{threshold:t[1],amount:t[2]}:{threshold:"",amount:""}}function Yr(e,n){return e?`满${n||Ii(e)}元赠价值${e}元流量`:""}function aS(e){return String(e??"").replace(/1314\s*元?心动券包/g,"1000元心动券包")}function IP(e,n={}){const t={...n};return Object.keys(t).forEach(i=>{/^prize\d+(?:Name|Text|Copy|Amount|Threshold)?$/.test(i)&&typeof t[i]=="string"&&(t[i]=aS(t[i]))}),e==="弹窗-中奖"&&String(t.amountText||"").trim()==="1314"&&String(t.prizeText||"").replace(/\s+/g,"").includes("心动券包")&&(t.amountText="1000"),t}function ot(e={},n=""){const t=e.name||e.title||e.label||"",i=e.copy||e.text||e.description||"",a=e.image||e.imageUrl||e.url||e.src||"",o=fr([n,i,t].filter(Boolean).join(" ")),s=xn(t),l=xn(n),d=a?Ge.find(x=>x.image===a):null,p=d?d.type||"standard":String(e.type||"").trim(),c=p==="traffic_coupon"||!p&&!!(s||l||o.amount),u=c?e.copyAmount||s||l||o.amount:"",g=c?o.threshold||e.copyThreshold||(u?Ii(u):""):"",w=c?"traffic_coupon":p||"standard",y=fr(i),h=c?i&&!y.amount?i:Yr(u,g):i;return{...e,type:w,name:t,image:a,copy:h,copyThreshold:g,copyAmount:u}}function Gn(e,n){const t=Pe(e),i=String(n??"").trim();if(!t)return"";const a=xn(i),o=t.type==="traffic_coupon"&&a?{type:"traffic_coupon",copyAmount:a,copyThreshold:Ii(a),copy:Yr(a,Ii(a))}:{},s=ot({...t,name:i||t.name||"",...o});return JSON.stringify({type:s.type,name:s.name,image:s.image,copy:s.copy,copyThreshold:s.copyThreshold,copyAmount:s.copyAmount})}function On(e,n){const t=Pe(e),i=String(n??"").trim();if(!t)return"";const a=ot({...t,copy:i||t.copy||""},i);return JSON.stringify({type:a.type,name:a.name,image:a.image,copy:i||a.copy,copyThreshold:a.copyThreshold,copyAmount:a.copyAmount})}function Kt(e,n){const t=Pe(e);if(!t)return"";const i=String(n??"").trim(),a=Ii(i),o=ot({...t,type:"traffic_coupon",copyAmount:i,copyThreshold:a,copy:Yr(i,a)});return JSON.stringify({type:o.type,name:o.name,image:o.image,copy:o.copy,copyThreshold:o.copyThreshold,copyAmount:o.copyAmount})}function qe(e,n,t){const i=String(n||"").match(/^prize(\d+)$/),a=Pe(t);if(!e||!i||!a)return;const o=`prize${i[1]}`;e[`${o}Name`]=a.name,e[`${o}Text`]=a.name,e[`${o}Copy`]=a.copy}function Pe(e){const n=String(e??"").trim();if(!n)return null;try{const t=JSON.parse(n);if(t&&typeof t=="object")return ot({type:t.type||"",name:t.name||t.title||t.label||"",image:t.image||t.imageUrl||t.url||t.src||"",copy:t.copy||t.text||t.description||"",copyThreshold:t.copyThreshold||t.threshold||"",copyAmount:t.copyAmount||t.amount||""},n)}catch{return ot({name:n,image:"",copy:""},n)}return ot({name:n,image:"",copy:""},n)}function ni(e){return e?.type?e.type==="traffic_coupon":!!(e&&(xn(e.name)||xn(e.copy)))}function Jr(e){return e?ni(e)?`
      <span class="prize-library-traffic-coupon-thumb">
        <img src="${f(Z3)}" alt="" />
        <b>${v(e.copyAmount||xn(e.name)||"10")}</b>
      </span>
    `:e.image?`<img src="${f(e.image)}" alt="" />`:"<i></i>":"<i></i>"}function $t(e){return String(e||"").trim().replace(/\s+/g,"").replace(/[＋+]/g,"+").replace(/抖仔/g,"dou仔").replace(/[（）()]/g,"").toLowerCase()}function Di(e){const n=Pe(e),t=$t(n?.name||e);if(!t)return null;if(n?.type==="traffic_coupon")return Ge.find(p=>p.id==="traffic_coupon")||null;const i=n?.image?Ge.find(p=>p.image===n.image):null;if(i)return i;const o={券包:"coupon_pack","1000元券包":"coupon_pack",心动券包:"coupon_pack","1314元心动券包":"coupon_pack","1000元心动券包":"coupon_pack",积分:"points",内容诊断积分:"points",剪映vip:"jianying_vip",剪映vip月卡:"jianying_vip",dou流量券:"traffic_coupon","dou+流量券":"traffic_coupon",流量券:"traffic_coupon",dou官方推荐机会:"official_recommendation","dou+官方推荐机会":"official_recommendation",dou仔周边:"douzi_merch",dou仔随机周边:"douzi_family_pack",dou仔周边随机发:"douzi_family_pack",dou仔全家福:"douzi_family_pack",dou仔全家福随机发:"douzi_family_pack",dou仔周边全家福:"douzi_family_pack",dou仔周边帆布包:"douzi_canvas_bag"}[t];if(o)return Ge.find(p=>p.id===o)||null;if(/^内容诊断\d*积分$/.test(t))return Ge.find(p=>p.id==="points")||null;if(xn(n?.name||e))return Ge.find(p=>p.id==="traffic_coupon")||null;const s=Ge.find(p=>$t(p.name)===t);if(s)return s;const l=[...Ge].sort((p,c)=>$t(c.name).length-$t(p.name).length).find(p=>{const c=$t(p.name);return t.includes(c)||c.includes(t)});if(l)return l;const d=fr(e);return d.amount&&Ge.find(p=>String(p.copyAmount||"")===String(d.amount))||null}function Ei(e){const n=String(e??"");if(Ge.find(s=>Kn(s)===n))return n;const i=Pe(e),a=Di(e);if(!a)return i?Kn(i):"";const o=ot({...a,...i||{},name:i?.name||a.name,image:i?.image||a.image,copy:i?.copy||a.copy,copyAmount:i?.copyAmount||xn(i?.name)||a.copyAmount||"",copyThreshold:i?.copyThreshold||a.copyThreshold||""},e);return Kn(o)}function oS(e){return/^(\d+)\.prize\d+$/.test(de(e))}function ua(e,n,t,i="",a="",o=""){const s=String(e??""),l=new Set(Ge.map(u=>Kn(u))),d=s?Pe(s):null,p=d?Di(s):null,c=s&&!l.has(s)?d:null;return`
    <div class="prize-library-control">
      <span class="prize-library-thumb">
        ${Jr(d)}
      </span>
      <select class="prize-library-select" ${n} aria-label="${f(t)}">
        <option value="" ${s?"":"selected"}>占位奖品</option>
        ${Ge.map(u=>{const g=Kn(u),w=s===g;return`
            <option value="${f(g)}" ${w?"selected":""}>
              ${v(u.optionLabel||u.name)}
            </option>
          `}).join("")}
        ${c?`
          <option value="${f(s)}" data-custom-prize-option selected>
            ${v(p?.optionLabel||c.name||"已选奖品")}
          </option>
        `:""}
      </select>
      ${d?`
        <input
          class="prize-library-name-input"
          type="text"
          ${i}
          value="${f(d.name||"")}"
          aria-label="${f(`${t}名称`)}"
        />
        <input
          class="prize-library-copy-input"
          type="text"
          ${a}
          value="${f(d.copy||"")}"
          aria-label="${f(`${t}文案`)}"
        />
        ${ni(d)?`
          <input
            class="prize-library-amount-input"
            type="text"
            inputmode="decimal"
            ${o}
            value="${f(d.copyAmount||xn(d.name)||"")}"
            aria-label="${f(`${t}券面数字`)}"
          />
        `:""}
      `:""}
    </div>
  `}function rt(e){return e?.type==="select"&&Array.isArray(e.options)&&e.options.length>0}function kP(e){return(e?.options||[]).map(n=>typeof n=="string"?{label:n,value:n}:{label:n.label??n.value??"",value:n.value??n.label??""})}function An(e,n,t,i=""){const a=String(n==null||n===""?e?.default??"":n);return`
    <select ${t} ${i?`aria-label="${f(i)}"`:""}>
      ${kP(e).map(o=>`
        <option value="${f(o.value)}" ${String(o.value)===a?"selected":""}>
          ${v(o.label)}
        </option>
      `).join("")}
    </select>
  `}function PP(e,n,t,i="",a="",o="",s=""){const l=Ei(e),d=new Set(Ge.map(g=>Kn(g))),p=l?Pe(l):null,c=p?Di(l):null,u=l&&!d.has(l)?p:null;return`
    <div class="prize-library-control is-fixed">
      <span class="prize-library-thumb">
        ${Jr(p)}
      </span>
      <select class="prize-library-select" ${n} aria-label="${f(t)}">
        <option value="" ${l?"":"selected"}>选择奖品</option>
        ${Ge.map(g=>{const w=Kn(g),y=l===w;return`
            <option value="${f(w)}" ${y?"selected":""}>
              ${v(g.optionLabel||g.name)}
            </option>
          `}).join("")}
        ${u?`
          <option value="${f(l)}" data-custom-prize-option selected>
            ${v(c?.optionLabel||u.name||"已选奖品")}
          </option>
        `:""}
      </select>
      ${p?`
        <input
          class="prize-library-name-input"
          type="text"
          ${i}
          value="${f(p.name||"")}"
          aria-label="${f(`${t}名称`)}"
        />
        <input
          class="prize-library-copy-input"
          type="text"
          ${a}
          value="${f(p.copy||"")}"
          aria-label="${f(`${t}小字正文`)}"
        />
        ${ni(p)?`
          <input
            class="prize-library-amount-input"
            type="text"
            inputmode="decimal"
            ${o}
            value="${f(p.copyAmount||xn(p.name)||"")}"
            aria-label="${f(`${t}券面数字`)}"
          />
        `:""}
      `:""}
      ${s}
    </div>
  `}function qt(e){const n=e?.closest(".prize-library-control"),t=n?.querySelector(".prize-library-thumb");if(!t)return;const i=Pe(e.value);t.innerHTML=Jr(i);let a=n.querySelector(".prize-library-name-input"),o=n.querySelector(".prize-library-copy-input"),s=n.querySelector(".prize-library-amount-input");const l=e.dataset.nodePropChildIndex!==void 0?` data-node-prop-child-index="${f(e.dataset.nodePropChildIndex)}"`:"",d=e.dataset.adminPrizeProp?`data-admin-prize-amount-prop="${f(e.dataset.adminPrizeProp)}"`:e.dataset.adminMoleculeBlueprintProp?`data-admin-molecule-prize-amount-prop="${f(e.dataset.adminMoleculeBlueprintProp)}"`:e.dataset.adminPageBlueprintProp?`data-admin-page-prize-amount-prop="${f(e.dataset.adminPageBlueprintProp)}"`:e.dataset.prdPrizeTableRow!==void 0?`data-prd-prize-amount-row="${f(e.dataset.prdPrizeTableRow)}"`:e.dataset.blueprintPrizeValue?`data-blueprint-prize-amount-value="${f(e.dataset.blueprintPrizeValue)}"`:e.dataset.nodePropInput?`data-node-prize-amount-input="${f(e.dataset.nodePropInput)}"${l}`:"";if(!a&&i){const p=e.dataset.adminPrizeProp?`data-admin-prize-name-prop="${f(e.dataset.adminPrizeProp)}"`:e.dataset.adminMoleculeBlueprintProp?`data-admin-molecule-prize-name-prop="${f(e.dataset.adminMoleculeBlueprintProp)}"`:e.dataset.adminPageBlueprintProp?`data-admin-page-prize-name-prop="${f(e.dataset.adminPageBlueprintProp)}"`:e.dataset.prdPrizeTableRow!==void 0?`data-prd-prize-name-row="${f(e.dataset.prdPrizeTableRow)}"`:e.dataset.blueprintPrizeValue?`data-blueprint-prize-name-value="${f(e.dataset.blueprintPrizeValue)}"`:e.dataset.nodePropInput?`data-node-prize-name-input="${f(e.dataset.nodePropInput)}"${l}`:"",c=e.dataset.adminPrizeProp?`data-admin-prize-copy-prop="${f(e.dataset.adminPrizeProp)}"`:e.dataset.adminMoleculeBlueprintProp?`data-admin-molecule-prize-copy-prop="${f(e.dataset.adminMoleculeBlueprintProp)}"`:e.dataset.adminPageBlueprintProp?`data-admin-page-prize-copy-prop="${f(e.dataset.adminPageBlueprintProp)}"`:e.dataset.prdPrizeTableRow!==void 0?`data-prd-prize-copy-row="${f(e.dataset.prdPrizeTableRow)}"`:e.dataset.blueprintPrizeValue?`data-blueprint-prize-copy-value="${f(e.dataset.blueprintPrizeValue)}"`:e.dataset.nodePropInput?`data-node-prize-copy-input="${f(e.dataset.nodePropInput)}"${l}`:"";p&&(e.insertAdjacentHTML("afterend",`<input class="prize-library-name-input" type="text" ${p} aria-label="奖品名称" />`),a=n.querySelector(".prize-library-name-input")),c&&((a||e).insertAdjacentHTML("afterend",`<input class="prize-library-copy-input" type="text" ${c} aria-label="奖品文案" />`),o=n.querySelector(".prize-library-copy-input"))}!s&&d&&ni(i)&&((o||a||e).insertAdjacentHTML("afterend",`<input class="prize-library-amount-input" type="text" inputmode="decimal" ${d} aria-label="券面数字" />`),s=n.querySelector(".prize-library-amount-input")),a&&i&&(a.value=i.name||""),a&&!i&&a.remove(),o&&i&&(o.value=i.copy||""),o&&!i&&o.remove(),s&&ni(i)&&(s.value=i.copyAmount||xn(i.name)||""),s&&!ni(i)&&s.remove()}function nn(e,n){const t=e?.closest(".prize-library-control"),i=Pe(n);if(!t||!i)return;const a=t.querySelector(".prize-library-select"),o=t.querySelector(".prize-library-name-input"),s=t.querySelector(".prize-library-copy-input"),l=t.querySelector(".prize-library-amount-input");if(a){const d=[...a.options].find(c=>c.value===n&&!c.dataset.customPrizeOption);let p=a.querySelector("[data-custom-prize-option]");if(d)p?.remove(),a.value=n;else{p||(p=document.createElement("option"),p.dataset.customPrizeOption="",a.append(p));const c=Di(n);p.value=n,p.textContent=c?.optionLabel||i.name||"已选奖品",a.value=n}}o&&o!==e&&(o.value=i.name||""),s&&s!==e&&(s.value=i.copy||""),l&&l!==e&&(l.value=i.copyAmount||xn(i.name)||"")}function Ha(){return ee(r.adminComponentVerifier?.schemaId)||jt[0]||null}function kt(){const e=r.adminComponentVerifier||{};return e.type==="page"?"page":e.type==="molecule"?"molecule":pe.some(n=>n.id===e.schemaId)?"page":G.some(n=>n.id===e.schemaId)?"molecule":"atom"}function wi(){return G.find(n=>n.id===r.adminComponentVerifier?.schemaId)||G.find(n=>n.id!=="MoleculeContainer")||null}function Da(){const e=[...pe,...ne].filter(t=>t.id!=="blank-page");return e.find(t=>t.id===r.adminComponentVerifier?.schemaId)||e[0]||pe[0]||null}function rS(e){const n=r.adminComponentVerifier||{},t=e?.id||jt[0]?.id||"账户优惠券提示",i=n.schemaId===t,a=Array.isArray(e?.blueprint?.textProps)?e.blueprint.textProps:Ue(e).filter(([c,u])=>Lt(c,u,u.default)).map(([c])=>c),o=i?{...n.blueprint||{}}:{},s=iS(e);a.forEach(c=>{o[c]===void 0&&(o[c]=s[c]??"")});const l=Je(e),d=l[0]?.id||null,p=i&&l.some(c=>c.id===n.variantId)?n.variantId:d;return r.adminComponentVerifier={type:"atom",schemaId:t,parentThemeId:i&&n.parentThemeId||an(e,p),variantId:p,blueprint:o},r.adminComponentVerifier}function zP(e,n){const t=Je(e);return t.find(i=>i.id===n.variantId)||t[0]||null}function FP(e){if(!e)return[];const n=new Set;return Je(e).forEach(t=>{Wn(e,t).length&&n.add(an(e,t.id))}),he.filter(t=>n.has(kn(t)))}function sS(e,n){const t=zP(e,n),i=kn(n?.parentThemeId||(t?an(e,t.id):void 0)),a=si(e,i),o=Object.fromEntries(Wn(e,a)),s=Ct(n?.parentThemeId||i),l=e?.id==="头图"?{burstColor:Qr(n?.parentThemeId||i),burstOpacity:es(n?.parentThemeId||i),buttonBackgroundColor:ns(n?.parentThemeId||i),ribbonColor:La(n?.parentThemeId||i),glowOpacity:is(n?.parentThemeId||i),headlineGradientTop:s==="#FFFFFF"?s:as(n?.parentThemeId||i),headlineGradientBottom:s,textColor:s}:{};return{...iS(e),...t?.props||{},...o,...l,...n.blueprint||{}}}function Fe(e,n){return`${e}.${n}`}function Be(e,n){return`${e}|${n}`}function lS(e,n,t){const i={};e?.type==="molecule"&&(Object.entries(e.props||{}).forEach(([o,s])=>{i[o]=s}),(e.children||[]).forEach((o,s)=>{Object.entries(o.props||{}).forEach(([l,d])=>{i[Fe(s,l)]=d})}));const a=`${n}|`;return Object.entries(t?.blueprint||{}).forEach(([o,s])=>{o.startsWith(a)&&(i[o.slice(a.length)]=s)}),i}function Zr(e,n){const t=Ue(e).map(([o,s])=>({scope:"molecule",key:o,compoundKey:o,field:s,childName:e?.name||"分子",value:n?.blueprint?.[o]??s.default??""})),i=di(e);t.forEach(({key:o,value:s})=>{i[o]=s});const a=pi(e,i).flatMap(([o,s={}],l)=>{const d=ee(o),p=new Set(Array.isArray(d?.blueprint?.textProps)?d.blueprint.textProps:[]),c=d?.name||o;return Ue(d).filter(([u,g])=>{const w=s[u]??g.default;return p.has(u)||In(g)||Lt(u,g,w)}).map(([u,g])=>({childIndex:l,key:u,field:g,childName:c,value:n?.blueprint?.[Fe(l,u)]??s[u]??g.default??""}))});return[...t,...a]}function ro(e,n,t=null){const i=wn(e);return(t==null?i.map((o,s)=>({node:o,nodeIndex:s})):i[Number(t)]?[{node:i[Number(t)],nodeIndex:Number(t)}]:[]).flatMap(({node:o,nodeIndex:s})=>{const l=no(o?.schemaId,e?.id,s),d=ka(e,o?.schemaId),p=r.pageTemplateBlueprintStates?.[bt(e?.id,s)],c=d?.preferredStateId,u=l?.states?.some($=>$.id===p)?p:l?.states?.some($=>$.id===c)?c:ao(e?.id,s,l),g=Ur(e?.id,s,l,u)||o.schemaId,w=Hn(g,l?.label||o.name||`模块 ${s+1}`),y=G.find($=>$.id===g);if(y){const $=lS(o,s,n);return Zr(y,{blueprint:$}).map(k=>{const F=k.compoundKey||Fe(k.childIndex,k.key),_=Be(s,F);return{...k,moduleIndex:s,moduleName:w,moduleSchemaId:g,sourceModuleSchemaId:o.schemaId,compoundKey:_,value:n?.blueprint?.[_]??k.value}})}const h=ee(g),x=new Set(Array.isArray(h?.blueprint?.textProps)?h.blueprint.textProps:[]);return Ue(h).filter(([$,k])=>{const F=o.props?.[$]??k.default;return x.has($)||In(k)||Lt($,k,F)}).map(([$,k])=>{const F=Be(s,$);return{scope:"atom",moduleIndex:s,moduleName:w,moduleSchemaId:g,sourceModuleSchemaId:o.schemaId,childName:w,key:$,compoundKey:F,field:k,value:n?.blueprint?.[F]??o.props?.[$]??k.default??""}})})}function si(e,n){const t=Je(e).find(a=>an(e,a.id)===n);if(t)return t;const i=kn(n);return Je(e).find(a=>an(e,a.id)===i)||null}function Wn(e,n){const t=new Map(Ue(e));return Object.entries(n?.props||{}).filter(([i,a])=>{const o=t.get(i);return In(o)?!1:!Lt(i,o||{type:typeof a},a)})}function Qr(e){const n={"daily-cyan":"#0FB3FF","daily-green":"#7DB52E","node-anniversary":"#FF0A4F","node-mid-autumn":"#952BB2","node-double-11":"#FD3F00"};return n[e]?n[e]:(he.find(t=>t.id===e)||he[0])?.primary||"#FF88C1"}function es(e){return new Set(["daily-cyan","daily-green"]).has(e)?.3:e==="node-anniversary"||e==="node-mid-autumn"?.5:e==="node-double-11"?.3:new Set(["sky","daily-cyan","daily-green","apricot","daily-yellow"]).has(e)?.8:.5}function ns(e){const n={pink:"#FF62B8","daily-cyan":"#0FB3FF","daily-purple":"#A32CFF","daily-yellow":"#FE9E14",sky:"#2C8BFF","daily-green":"#7DB52E",apricot:"#E57112","node-new-year":"#FF797B","node-womens-day":"#38BDFF","node-breath":"#FF79DA","node-mid-autumn":"#952BB2","node-anniversary":"#E52051","node-double-festival":"#287FFF","node-double-11":"#FD3F00"};return n[e]||n[kn(e)]||"#FF62B8"}function NP(e){return new Set(["pink","node-womens-day"]).has(e)?{start:"#FF1473",end:"#FF229F"}:new Set(["apricot","daily-yellow","node-new-year","node-mid-autumn","node-double-11"]).has(e)?{start:"#FF4501",end:"#FF7C02"}:{start:"#FF180E",end:"#FF166F"}}function ts(e,n=.35){const t=String(e||"").replace("#","");return/^[0-9a-f]{6}$/i.test(t)?`#${[0,2,4].map(i=>{const a=Number.parseInt(t.slice(i,i+2),16);return Math.round(a+(255-a)*n).toString(16).padStart(2,"0")}).join("")}`:e||"#FFFFFF"}function EP(e){const n=ts(e?.secondary),t=[0,2,4].map(o=>Number.parseInt(n.slice(o+1,o+3),16)),i=(String(e?.background||"").match(/#[0-9a-f]{6}/gi)||[]).filter((o,s,l)=>s===0||o.toLowerCase()!==l[s-1].toLowerCase()),a=String(i.at(-2)||e?.primary||"").replace("#","");return/^[0-9a-f]{6}$/i.test(a)?`#${t.map((o,s)=>{const l=Number.parseInt(a.slice(s*2,s*2+2),16);return Math.round(o+(l-o)*.2).toString(16).padStart(2,"0")}).join("")}`:n}function _P(e){const n=String(e?.background||""),t=n.match(/#[0-9a-f]{6}/gi)||[],i=t.length>=4?[t[0],t[1],t[3]]:t.filter((o,s,l)=>s===0||o.toLowerCase()!==l[s-1].toLowerCase()).slice(0,3);return i.length<3?n:`linear-gradient(${n.match(/linear-gradient\(\s*([^,]+)/i)?.[1]||"180deg"}, ${i[0]} 0%, ${i[1]} 20%, ${ts(i[2])} 100%)`}function La(e){const n={pink:"#FF4FAE","daily-cyan":"#00C8F5","daily-purple":"#B64CFF","daily-yellow":"#FFC21A",sky:"#3D94FF","daily-green":"#8FD937",apricot:"#FF8A2A","node-new-year":"#FF4D58","node-womens-day":"#24B9FF","node-breath":"#FF56CC","node-mid-autumn":"#B23AD1","node-anniversary":"#FF1F55","node-double-festival":"#3B8CFF","node-double-11":"#FF4B00"};return n[e]||n[kn(e)]||"#FF4FAE"}function is(e){return new Set(["node-mid-autumn","node-anniversary","node-double-festival"]).has(e)?.2:.6}function as(e){const n={pink:"#FF6FC5","daily-cyan":"#22E6FF","daily-purple":"#C35BFF","daily-yellow":"#FFE45C",sky:"#5AA7FF","daily-green":"#A7F04A",apricot:"#FFA04A","node-new-year":"#FF6669","node-womens-day":"#45C8FF","node-breath":"#FF69D8","node-mid-autumn":"#BF4CDA","node-anniversary":"#F13965","node-double-festival":"#4B97FF","node-double-11":"#FF6A12"};return n[e]||n[kn(e)]||"#FF5F5F"}function Go(e){const n={pink:"#F00073","daily-cyan":"#008BD4","daily-purple":"#8D16E8","daily-yellow":"#F06A00",sky:"#006FE8","daily-green":"#4D8F00",apricot:"#D44E00","node-new-year":"#D91F2C","node-womens-day":"#007FC8","node-breath":"#D000A9","node-mid-autumn":"#7C169B","node-anniversary":"#CF1645","node-double-festival":"#006BD8","node-double-11":"#D83900"};return n[e]||n[kn(e)]||"#F00073"}function Ct(e){const n={pink:"#2C0113","daily-cyan":"#092E39","daily-purple":"#240939","daily-yellow":"#392909",sky:"#001A2F","daily-green":"#1B3608",apricot:"#391F09","node-new-year":"#4E0506","node-womens-day":"#052A4E","node-breath":"#4E0548","node-mid-autumn":"#FFFFFF","node-anniversary":"#FFFFFF","node-double-festival":"#FFFFFF","node-double-11":"#320603"};return n[e]||n[kn(e)]||"#2C0113"}function os(e,n){if(!e?.props)return;const t=new Set(["头图","下单页弹窗"]).has(e.schemaId),i=new Set(["顶部banner","个人中心banner"]).has(e.schemaId),a=e.schemaId==="挽留页弹窗",o=e.schemaId==="详情页弹窗",s=a||o,l=he.find(p=>p.id===n)||he[0],d=EP(l);if(t&&"background"in e.props&&(e.props.background=l?.background),i&&"background"in e.props){const p=e.schemaId==="个人中心banner"?"73.03%":"81.44%",c=ts(l?.primary,.15);e.props.background=`linear-gradient(90deg, ${c} 0%, ${d} ${p})`}if(s&&"background"in e.props&&(e.props.background=_P(l)),a&&"campaignBackgroundColor"in e.props&&(e.props.campaignBackgroundColor=La(n)),t&&"burstColor"in e.props&&(e.props.burstColor=Qr(n)),t&&"burstOpacity"in e.props&&(e.props.burstOpacity=es(n)),t&&"buttonBackgroundColor"in e.props&&(e.props.buttonBackgroundColor=ns(n)),new Set(["下单页弹窗","顶部banner","个人中心banner","挽留页弹窗","详情页弹窗"]).has(e.schemaId)){const p=NP(n);"buttonGradientStart"in e.props&&(e.props.buttonGradientStart=p.start),"buttonGradientEnd"in e.props&&(e.props.buttonGradientEnd=p.end)}if(t&&"ribbonColor"in e.props&&(e.props.ribbonColor=La(n)),t&&"glowOpacity"in e.props&&(e.props.glowOpacity=is(n)),t&&"headlineGradientTop"in e.props){const p=Ct(n);e.props.headlineGradientTop=e.schemaId==="下单页弹窗"?Go(n):p==="#FFFFFF"?p:as(n)}t&&"textColor"in e.props&&(e.props.textColor=Ct(n)),i&&"textColor"in e.props&&(e.props.textColor=Ct(n)),i&&"headlineHighlightColor"in e.props&&(e.props.headlineHighlightColor=Go(n)),s&&"headlineTextColor"in e.props&&(e.props.headlineTextColor=Ct(n)),s&&"headlineHighlightColor"in e.props&&(e.props.headlineHighlightColor=Go(n)),t&&"headlineGradientBottom"in e.props&&(e.props.headlineGradientBottom=Ct(n))}function BP(e,n){const t=di(e);return Object.keys(t).forEach(i=>{n?.blueprint?.[i]!==void 0&&(t[i]=n.blueprint[i])}),t}function rs(e,n){return pi(e,BP(e,n))}function dS(e,n={}){let t=0;return rs(e,n).map(([i],a)=>{const o=ee(i),s=Pv(o);if(s.length<2)return null;t+=1;const l=n?.childStates?.[a],d=s.some(p=>p.id===l)?l:s.find(p=>p.schemaId===o?.id)?.id||s[0].id;return{childIndex:a,label:e?.id==="任务列表"?`任务 ${t}`:`子组件 ${a+1} · ${o?.name||i}`,activeStateId:d,stateOptions:s}}).filter(Boolean)}function AP(e,n={}){return Object.entries(n||{}).forEach(([t,i])=>{const a=e?.children?.[Number(t)];a?.guidedStates?.length&&gn(a,i)}),e}function xr(e,n=null){const t=new Set;return rs(e,n).forEach(([i])=>{const a=ee(i);Je(a).forEach(o=>{Wn(a,o).length&&t.add(an(a,o.id))})}),he.filter(i=>t.has(kn(i)))}function MP(e,n,t){!e||!n||(n.parentThemeId=t,n.blueprint={...n.blueprint||{}},rs(e,n).forEach(([i],a)=>{const o=ee(i),s=si(o,t);if(s&&(Wn(o,s).forEach(([l,d])=>{n.blueprint[Fe(a,l)]=d}),o?.id==="头图")){const l=Ct(t);n.blueprint[Fe(a,"burstColor")]=Qr(t),n.blueprint[Fe(a,"burstOpacity")]=es(t),n.blueprint[Fe(a,"buttonBackgroundColor")]=ns(t),n.blueprint[Fe(a,"ribbonColor")]=La(t),n.blueprint[Fe(a,"glowOpacity")]=is(t),n.blueprint[Fe(a,"headlineGradientTop")]=l==="#FFFFFF"?l:as(t),n.blueprint[Fe(a,"headlineGradientBottom")]=l,n.blueprint[Fe(a,"textColor")]=l}}))}function ss(e,n){!e||!n||(e.children||[]).forEach(t=>{const i=ee(t.schemaId),a=si(i,n);a&&(t.activeVariantId=a.id,Wn(i,a).forEach(([o,s])=>{t.props&&o in t.props&&(t.props[o]=s)}),os(t,n),t.children?.length&&ss(t,n))})}function jP(e,n){const t=ee(e?.schemaId),i=si(t,n);i&&(e.activeVariantId=i.id,Wn(t,i).forEach(([a,o])=>{e.props&&a in e.props&&(e.props[a]=o)}),os(e,n))}function ls(e,n){const t=yn(e.id);if(!t)return null;const i=new Map,a=new Set(Ue(e).map(([o])=>o));return Object.entries(n?.blueprint||{}).forEach(([o,s])=>{a.has(o)&&(t.props[o]=s)}),Ri(t),(t.children||[]).forEach((o,s)=>{Object.entries(n?.blueprint||{}).forEach(([d,p])=>{const[c,u]=d.split(".");if(Number(c)===s&&u&&(u in o.props||Pt(u))){o.props[u]=p;const g=Number(String(u).match(/^prize(\d+)/)?.[1]||0);g&&i.set(s,Math.max(i.get(s)||0,g))}});const l=i.get(s);l&&(o.props.prizeCount=l)}),AP(t,n?.childStates),ss(t,n?.parentThemeId),t}function so(e){if(!e)return e;if(e.type==="molecule"){if((e.children||[]).forEach(so),dn(e)&&e.activeGuidedStateId==="unregistered"){const t=e.children?.[1];t?.props&&(t.props.hideProgressGraphic=!1)}return e}const n=Vi(e);return n.hiddenPropKeys?.length&&e.props&&n.hiddenPropKeys.forEach(t=>{t in e.props&&(e.props[t]="")}),n.exportPropOverrides&&(e.props={...e.props||{},...n.exportPropOverrides}),e}function pS(e,n){const t=ls(e,n);return so(t)}function ds(e,n){const t=wn(e);return qr(t,e?.id),Wr(t,e?.id),t.forEach((i,a)=>{if(i.type==="molecule"){const o=G.find(d=>d.id===i.schemaId),s=new Set(Ue(o).map(([d])=>d));Object.entries(n?.blueprint||{}).forEach(([d,p])=>{const[c,u]=d.split("|");Number(c)!==a||!u||u.includes(".")||s.has(u)&&(i.props[u]=p)}),Ri(i),ss(i,n?.parentThemeId);const l=new Map;Object.entries(n?.blueprint||{}).forEach(([d,p])=>{const[c,u]=d.split("|");if(Number(c)!==a||!u||!u.includes("."))return;const[g,w]=u.split("."),y=i.children?.[Number(g)];if(y?.props&&(w in y.props||Pt(w))){y.props[w]=p;const h=Number(String(w).match(/^prize(\d+)/)?.[1]||0);h&&l.set(g,Math.max(l.get(g)||0,h))}}),l.forEach((d,p)=>{const c=i.children?.[Number(p)];c?.props&&(c.props.prizeCount=d)});return}jP(i,n?.parentThemeId),Object.entries(n?.blueprint||{}).forEach(([o,s])=>{const[l,d]=o.split("|");Number(l)===a&&d&&i.props&&d in i.props&&(i.props[d]=s)})}),t}function RP(e,n){return ds(e,n).map(so)}function vd(e,n=null){const t=new Set;return ds(e,n).forEach(i=>{if(i.type==="molecule"){xr(G.find(o=>o.id===i.schemaId),{blueprint:lS(i,0,null)}).forEach(o=>t.add(kn(o)));return}const a=ee(i.schemaId);Je(a).forEach(o=>{Wn(a,o).length&&t.add(an(a,o.id))})}),he.filter(i=>t.has(kn(i)))}function Ga(e,n,t=!1){const i=t?RP(e,n):ds(e,n),o=he.find(s=>s.id===n?.parentThemeId)?.background||e?.canvasBackground||e?.background||"#ffffff";return`
    <div
      class="admin-verifier-page"
      style="width:${Number(e?.viewportWidth||750)}px;background:${f(o)}"
    >
      ${i.map(s=>ge(s,{editable:!1})).join("")}
    </div>
  `}function HP(e){return e?Array.isArray(e.fonts)?e.fonts:Array.isArray(e.typography)?e.typography:[]:[]}function an(e,n){return(e?.variants||[]).find(i=>(i.id||i.key)===n)?.themeBinding?.parentThemeId||"pink"}function DP(){const e=A(".activity-center");if(!e)return;const n=kt(),t=n==="atom"?Ha():null,i=n==="molecule"?wi():null,a=n==="page"?Da():null;if(n==="atom"&&!t||n==="page"&&!a){e.innerHTML=`
      <section class="admin-shell">
        <nav class="admin-nav">
          <button class="admin-back" data-back-admin>← 返回后台</button>
          <span>组件验收</span>
        </nav>
        <div class="admin-empty-state">
          <strong>没有找到待验收组件</strong>
          <span>请先注册 schema.json。</span>
        </div>
      </section>
    `;return}const o=n==="atom"?rS(t):n==="molecule"?(()=>{const q=xr(i)[0]?.id||"pink";return{type:"molecule",schemaId:i?.id||"",parentThemeId:r.adminComponentVerifier?.schemaId===i?.id&&r.adminComponentVerifier?.parentThemeId||q,blueprint:r.adminComponentVerifier?.schemaId===i?.id?{...r.adminComponentVerifier?.blueprint||{}}:{},childStates:r.adminComponentVerifier?.schemaId===i?.id?{...r.adminComponentVerifier?.childStates||{}}:{}}})():(()=>{const q=vd(a,r.adminComponentVerifier)[0]?.id||"pink";return{type:"page",schemaId:a?.id||"",parentThemeId:r.adminComponentVerifier?.schemaId===a?.id&&r.adminComponentVerifier?.parentThemeId||q,blueprint:r.adminComponentVerifier?.schemaId===a?.id?{...r.adminComponentVerifier?.blueprint||{}}:{}}})();n==="molecule"&&(r.adminComponentVerifier=o),n==="page"&&(r.adminComponentVerifier=o);const s=n==="atom"?sS(t,o):{},l=n==="atom"&&Array.isArray(t.blueprint?.textProps)?t.blueprint.textProps:[],d=n==="atom"?Ue(t).filter(([P])=>l.includes(P)):n==="molecule"?Zr(i,o):ro(a,o),p=n==="page"?`${d.length} 个页面组合变量`:n==="molecule"?`${d.length} 个组合蓝图变量`:d.some(([,P])=>In(P))?`${d.length} 个蓝图变量`:`${d.length} 个文字变量`,c=n==="atom"?HP(t):[],u=c.filter(P=>P.source?.status&&P.source.status!=="exact").length,g=n==="atom"?Je(t):[],w=n==="atom"?Pv(t):[],y=n==="molecule"?dS(i,o):[],h=n==="molecule"?xr(i,o):[],x=n==="atom"?FP(t):[],$=n==="page"?vd(a,o):[],k=he.find(P=>P.id===o.parentThemeId)||he[0];n==="page"?Number(a?.viewportWidth||750):n==="atom"&&Number(t.dimensions?.width||702);const F=Xe,_=n==="atom"&&gt(t)||n==="atom"&&aT(t)?0:n==="atom"&&iT(t)?q2:K2,H=(n==="page"?1334:n==="atom"?Number(t.dimensions?.height||160):240)+_,L=n==="atom"?t.heightMode==="auto":!0,Y=n==="molecule"&&i?ls(i,o):null,K=n==="molecule"&&i?pS(i,o):null,se=n==="atom"?Mn(t.id,s):n==="page"?Ga(a,o):Y?ge(Y,{editable:!1}):"",I=n==="atom"&&gt(t),z=n==="atom"?I?`
        <div
          class="guided-export-header-image"
          style="background:${f(k.background)};background-position:top center;--guided-page-theme-filter:${f(k.filter||"none")};"
        >
          <div class="guided-export-themed-content">
            ${Mn(t.id,kr(t.id,s))}
          </div>
        </div>
      `:Mn(t.id,kr(t.id,s)):n==="page"?Ga(a,o,!0):K?ge(K,{editable:!1}):"",D=n==="atom"?t.name:n==="page"?a?.name||"页面模板":i?.name||"分子组件",j=n==="atom"&&Ar.has(t.id)?'<span class="admin-verifier-title-badge">模块级原子</span>':"",W=n==="atom"?jt:n==="page"?[...pe,...ne].filter(P=>P.id!=="blank-page"):G.filter(P=>P.id!=="MoleculeContainer"),Z=n==="page"?"验收页面":"验收组件",J=n==="page"?"页面模板调用分子组合；在这里切换页面并检查继承来的分子变量和 750 宽页面预览。":n==="molecule"?"分子组件直接调用原子组合；在这里切换分子并检查组合蓝图与最终预览。":"固定检查蓝图输入、组件文案、父级色系联动和最终导出切图。";e.innerHTML=`
    <section class="admin-shell admin-verifier-shell">
      <nav class="admin-nav">
        <button class="admin-back" data-back-admin>← 返回后台</button>
        <span>组件验收</span>
      </nav>

      <header class="admin-hero admin-verifier-head">
        <span>COMPONENT QA</span>
        <div class="admin-verifier-title-row">
          <div class="admin-verifier-title-main">
            <h1>${v(D)}</h1>
            ${j}
          </div>
          <div class="admin-verifier-select-row">
            <label class="admin-verifier-component-select admin-verifier-type-select">
              <span>组件类型</span>
              <select data-admin-verifier-type>
                <option value="atom" ${n==="atom"?"selected":""}>原子组件</option>
                <option value="molecule" ${n==="molecule"?"selected":""}>分子组件</option>
                <option value="page" ${n==="page"?"selected":""}>页面模板</option>
              </select>
            </label>
            <label class="admin-verifier-component-select">
              <span>${Z}</span>
              <select data-admin-select-component>
                ${rI(n,W,o.schemaId)}
              </select>
            </label>
          </div>
        </div>
        <p>${J}</p>
      </header>

      <section class="admin-verifier-grid">
        <aside class="admin-verifier-panel">
          <section class="admin-verifier-block">
            <header>
              <strong>蓝图同步</strong>
              <span>${p}</span>
            </header>
            <div class="admin-verifier-fields">
              ${n==="atom"?d.map(([P,q])=>{const V=o.blueprint[P]??q.default??"";return`
                  <label>
                    <span>${v(q.label||P)}</span>
                    ${In(q)?ua(V,`data-admin-prize-prop="${f(P)}"`,`${t.name} ${q.label||P}`,`data-admin-prize-name-prop="${f(P)}"`,`data-admin-prize-copy-prop="${f(P)}"`,`data-admin-prize-amount-prop="${f(P)}"`):Lo(q)?`
                          <textarea
                            rows="${st(V)}"
                            data-admin-blueprint-prop="${f(P)}"
                          >${v(V)}</textarea>
                        `:rt(q)?An(q,V,`data-admin-blueprint-prop="${f(P)}"`,q.label||P):`
                        <input
                          type="text"
                          data-admin-blueprint-prop="${f(P)}"
                          value="${f(V)}"
                        />
                      `}
                  </label>
                `}).join(""):n==="molecule"?d.map(({childIndex:P,childName:q,key:V,compoundKey:ie,field:me,value:ye})=>{const le=ie||Fe(P,V);return`
                  <label>
                    <span>${v(`${q} · ${me.label||V}`)}</span>
                    ${In(me)?ua(ye,`data-admin-molecule-blueprint-prop="${f(le)}"`,`${q} ${me.label||V}`,`data-admin-molecule-prize-name-prop="${f(le)}"`,`data-admin-molecule-prize-copy-prop="${f(le)}"`,`data-admin-molecule-prize-amount-prop="${f(le)}"`):Lo(me)?`
                          <textarea
                            rows="${st(ye)}"
                            data-admin-molecule-blueprint-prop="${f(le)}"
                          >${v(ye)}</textarea>
                        `:me.type==="number"?`
                          <input
                            type="number"
                            min="${f(me.min??"")}"
                            max="${f(me.max??"")}"
                            data-admin-molecule-blueprint-prop="${f(le)}"
                            value="${f(ye)}"
                          />
                        `:rt(me)?An(me,ye,`data-admin-molecule-blueprint-prop="${f(le)}"`,me.label||V):`
                          <input
                            type="text"
                            data-admin-molecule-blueprint-prop="${f(le)}"
                            value="${f(ye)}"
                          />
                        `}
                  </label>
                `}).join(""):d.map(({moduleName:P,childName:q,compoundKey:V,field:ie,value:me})=>{const ye=P===q?`${P} · ${ie.label||V}`:`${P} · ${q} · ${ie.label||V}`;return`
                  <label>
                    <span>${v(ye)}</span>
                    ${In(ie)?ua(me,`data-admin-page-blueprint-prop="${f(V)}"`,`${ye}`,`data-admin-page-prize-name-prop="${f(V)}"`,`data-admin-page-prize-copy-prop="${f(V)}"`,`data-admin-page-prize-amount-prop="${f(V)}"`):Lo(ie)?`
                          <textarea
                            rows="${st(me)}"
                            data-admin-page-blueprint-prop="${f(V)}"
                          >${v(me)}</textarea>
                        `:ie.type==="number"?`
                          <input
                            type="number"
                            min="${f(ie.min??"")}"
                            max="${f(ie.max??"")}"
                            data-admin-page-blueprint-prop="${f(V)}"
                            value="${f(me)}"
                          />
                        `:rt(ie)?An(ie,me,`data-admin-page-blueprint-prop="${f(V)}"`,ie.label||V):`
                          <input
                            type="text"
                            data-admin-page-blueprint-prop="${f(V)}"
                            value="${f(me)}"
                          />
                        `}
                  </label>
                `}).join("")}
            </div>
          </section>

          ${n==="molecule"&&y.length?`<section class="admin-verifier-block">
            <header>
              <strong>子组件状态</strong>
              <span>${y.length} 个可切换组件</span>
            </header>
            <div class="admin-verifier-child-states">
              ${y.map(P=>`
                <section>
                  <strong>${v(P.label)}</strong>
                  <div class="admin-verifier-state-switch">
                    ${P.stateOptions.map(q=>`
                      <button
                        type="button"
                        class="${q.id===P.activeStateId?"active":""}"
                        data-admin-molecule-child-state="${f(`${P.childIndex}|${q.id}`)}"
                      >${v(q.name)}</button>
                    `).join("")}
                  </div>
                </section>
              `).join("")}
            </div>
          </section>`:""}

          ${n==="atom"&&w.length>1?`<section class="admin-verifier-block">
            <header>
              <strong>查看状态</strong>
              <span>${v(w.find(P=>P.schemaId===t.id)?.name||"当前状态")}</span>
            </header>
            <div class="admin-verifier-variants">
              ${w.map(P=>`
                <button
                  class="${P.schemaId===t.id?"active":""}"
                  type="button"
                  data-admin-preview-state="${f(P.schemaId)}"
                >
                  <i></i>
                  <span>${v(P.name)}</span>
                  <em>${v(P.schemaId)}</em>
                </button>
              `).join("")}
            </div>
          </section>`:""}

          ${n==="atom"?`<section class="admin-verifier-block">
            <header>
              <strong>组件变体</strong>
              <span>${g.length} 项变体</span>
            </header>
            <div class="admin-verifier-variants">
              ${g.map(P=>{const q=an(t,P.id),V=he.find(ie=>ie.id===q)||he[0];return`
                  <button
                    class="${P.id===o.variantId?"active":""}"
                    type="button"
                    data-admin-preview-variant="${f(P.id)}"
                    style="--admin-variant-start:${f(P.props.containerGradientStart||V.primary)};--admin-variant-end:${f(P.props.containerGradientEnd||V.secondary)}"
                  >
                    <i></i>
                    <span>${v(P.name)}</span>
                    <em>${v(V.name)}</em>
                  </button>
                `}).join("")}
            </div>
          </section>${x.length?`<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${v(k.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${x.map(P=>`
                <button
                  class="${P.id===o.parentThemeId?"active":""}"
                  type="button"
                  data-admin-preview-page-theme="${f(P.id)}"
                  style="--admin-variant-start:${f(P.primary)};--admin-variant-end:${f(P.secondary)}"
                >
                  <i></i>
                  <span>${v(P.name)}</span>
                  <em>父级联动</em>
                </button>
              `).join("")}
            </div>
          </section>`:""}`:h.length?`<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${v(k.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${h.map(P=>`
                <button
                  class="${P.id===o.parentThemeId?"active":""}"
                  type="button"
                  data-admin-preview-molecule-theme="${f(P.id)}"
                  style="--admin-variant-start:${f(P.primary)};--admin-variant-end:${f(P.secondary)}"
                >
                  <i></i>
                  <span>${v(P.name)}</span>
                  <em>父级联动</em>
                </button>
              `).join("")}
            </div>
          </section>`:$.length?`<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${v(k.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${$.map(P=>`
                <button
                  class="${P.id===o.parentThemeId?"active":""}"
                  type="button"
                  data-admin-preview-page-theme="${f(P.id)}"
                  style="--admin-variant-start:${f(P.primary)};--admin-variant-end:${f(P.secondary)}"
                >
                  <i></i>
                  <span>${v(P.name)}</span>
                  <em>页面联动</em>
                </button>
              `).join("")}
            </div>
          </section>`:""}

            ${n==="atom"?`<section class="admin-verifier-block">
              <header>
                <strong>字体</strong>
                <span>${u?`${u} 项缺失`:`${c.length} 项通过`}</span>
              </header>
              <div class="admin-verifier-font-list">
                ${c.map(P=>{const q=P.family||P.fontFamily||"",V=P.weight||P.fontWeight||"",ie=P.size||P.fontSize||"",me=P.lineHeight||"",ye=P.usage||P.label||"",le=P.source||{},Qn=le.status==="exact",ae=P.text||P.sample||"",C=le.required||`${q} ${V}`;return`
                    <div class="${Qn?"is-ok":"is-missing"}">
                      <span
                        style="font-family:${f(q)};font-weight:${f(V)};font-size:${f(ie||"18px")};line-height:${f(me||"normal")}"
                      >${v(ae||"缺少真实文案")}</span>
                      <strong>${v(q)}</strong>
                      <em>${Qn?"已匹配":"缺失"}</em>
                      <code>${v([V&&`W${V}`,ie,me&&`LH ${me}`].filter(Boolean).join(" / "))}</code>
                      ${ye?`<small>用途：${v(ye)}</small>`:""}
                      <small>${Qn?`文件：${v(le.file||"")}`:`需要：${v(C)}`}</small>
                      ${le.note?`<small>${v(le.note)}</small>`:""}
                    </div>
                  `}).join("")}
              </div>
            </section>`:""}
        </aside>

        <main class="admin-verifier-stage">
          <section class="admin-verifier-preview" style="background:${f(k.background)}">
            <header>
              <strong>后台实时预览</strong>
              <span>父级页面：${v(k.name)}</span>
            </header>
            <div class="admin-verifier-component">${se}</div>
          </section>

          <section class="admin-verifier-export">
            <header>
              <div>
                <strong>导出切图样子</strong>
                <span>${I?`${F} x ${Ca}px，带页面背景`:`${L?`${F}px 宽，底部留白 ${_}px`:`${F} x ${H}px`}，透明背景`}</span>
              </div>
              <button type="button" data-admin-export-cut>下载 PNG</button>
            </header>
            <div class="admin-export-canvas">
              <div
                class="admin-export-capture"
                data-admin-export-cut-capture
                style="width:${F}px;${I?`height:${Ca}px;`:L?"height:auto;":`height:${H}px`};padding-bottom:${I?0:_}px;box-sizing:border-box;"
                >${z}</div>
            </div>
          </section>
        </main>
      </section>
    </section>
  `,xa()}function De(){const e=document.querySelector(".admin-verifier-component"),n=document.querySelector("[data-admin-export-cut-capture]");if(kt()==="page"){const l=Da();if(!l)return;e&&(e.innerHTML=Ga(l,r.adminComponentVerifier)),n&&(n.innerHTML=Ga(l,r.adminComponentVerifier,!0)),xa();return}if(kt()==="molecule"){const l=wi(),d=l?ls(l,r.adminComponentVerifier):null,p=l?pS(l,r.adminComponentVerifier):null,c=d?ge(d,{editable:!1}):"",u=p?ge(p,{editable:!1}):"";e&&(e.innerHTML=c),n&&(n.innerHTML=u),xa();return}const t=Ha();if(!t)return;const i=rS(t),a=sS(t,i),o=kr(t.id,a),s=he.find(l=>l.id===i.parentThemeId)||he[0];e&&(e.innerHTML=Mn(t.id,a)),n&&(n.innerHTML=gt(t)?`
        <div
          class="guided-export-header-image"
          style="background:${f(s.background)};background-position:top center;--guided-page-theme-filter:${f(s.filter||"none")};"
        >
          <div class="guided-export-themed-content">
            ${Mn(t.id,o)}
          </div>
        </div>
      `:Mn(t.id,o)),xa()}function et(){r.view==="admin"?tS():oo()}function LP(){const e=A(".activity-center");if(!e)return;const n=r.prdDemoStep==="upload",t=r.prdDemoStep==="parsing";if(n){r.view="home",oo();return}e.innerHTML=`
    <div class="prd-flow-shell ${n||t?"is-home":"is-blueprint"}">
      <nav class="prd-minimal-nav">
        <button class="prd-brand" data-back-home aria-label="返回活动中心">
          <span>+</span>
          <strong>DOU+ 活动生成器</strong>
        </button>
        <div class="prd-progress">
          <span class="${n?"active":"done"}">01 上传</span>
          <i></i>
          <span class="${t?"active":n?"":"active"}">02 确认</span>
          <i></i>
          <span>03 预览</span>
        </div>
        <div class="prd-nav-actions">
          <button type="button" class="prd-admin-link" data-save>保存版本</button>
          <button type="button" class="prd-admin-link" data-open-my-projects>我的</button>
        </div>
      </nav>
      ${t?OP():""}
      ${r.prdDemoStep==="analysis"?VP():""}
    </div>
  `}function Oo(e,n){const t=Ia[e],i=ii[t]||[];return[{module:"页面基础信息",field:"页面类型",values:n.map((a,o)=>o===0?e:"")},...i.flatMap(a=>a.sections.flatMap(o=>o.fields.map(([,s])=>({module:a.moduleName,field:s,values:n.map(()=>"")}))))]}function GP(){return`
    <div class="prd-file-modal" data-demo-file-modal>
      <section role="dialog" aria-modal="true" aria-labelledby="prd-file-modal-title">
        <header>
          <div>
            <span>演示模式</span>
            <h2 id="prd-file-modal-title">导入 PRD</h2>
          </div>
          <button data-demo-close-file-modal aria-label="关闭">×</button>
        </header>
        <div class="prd-feishu-import">
          <div class="prd-text-import-head">
            <div>
              <strong>飞书文档链接</strong>
              <span>支持企业内部文档，应用需拥有文档阅读权限</span>
            </div>
            <em>链接</em>
          </div>
          <div class="prd-feishu-import-row">
            <input
              type="url"
              placeholder="https://xxx.feishu.cn/docx/xxx"
              data-prd-feishu-input
              value="${v(r.prdFeishuUrl||"")}"
            />
            <button type="button" data-prd-feishu-submit>获取文档内容</button>
          </div>
          <div class="prd-feishu-import-note">
            <span class="${r.prdFeishuError?"error":""}">
              ${v(r.prdFeishuError||"支持 docx、doc 和 wiki 链接")}
            </span>
          </div>
        </div>
        <div class="prd-file-divider"><span>或直接进入</span></div>
        <div class="prd-blueprint-paste">
          <div class="prd-text-import-head">
            <div>
              <strong>直接进入</strong>
              <span>选择一个页面模板，直接进入编辑</span>
            </div>
            <em>模板</em>
          </div>
          <label class="prd-blueprint-template-select">
            <span>页面模板</span>
            <select data-prd-blueprint-template-select>
              <option value="">请选择模板</option>
              ${Object.keys(dt).map(e=>`
                <option
                  value="${f(e)}"
                  ${r.prdBlueprintPasteTemplateName===e?"selected":""}
                >${v(e)}</option>
              `).join("")}
            </select>
          </label>
          <div class="prd-text-import-actions">
            <span class="${r.prdBlueprintPasteError?"error":""}">
              ${v(r.prdBlueprintPasteError||"可选择以上任一模板")}
            </span>
            <button type="button" data-prd-blueprint-table-submit>直接进入</button>
          </div>
        </div>
        <footer>
          <button data-demo-close-file-modal>取消</button>
        </footer>
      </section>
    </div>
  `}function OP(){return`
    <section class="prd-parsing">
      <div class="prd-parsing-card">
        <div class="prd-parsing-icon" aria-hidden="true">PRD</div>
        <span class="prd-parsing-kicker">解析 PRD 中</span>
        <div class="prd-parsing-bar" aria-hidden="true"><i></i></div>
      </div>
    </section>
  `}function ea(){r.view="prd-demo",r.prdFileModalOpen=!1,r.prdDemoStep="analysis",r.prdTemplateSelectedModuleIndex=null,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,r.guidedHeaderLevelId="default",r.guidedHeaderLevelDrafts={s:{mainTitle:"任务通关赢X元流量",highlightText:"X元流量",subtitle:"为爱加投",dateText:""}},r.guidedHeaderDefaultPageSnapshots=[],r.selectedDemoPackageId===Oe&&Ek(r.prdTableRows),r.selectedDemoPackageId===Oe?r.selectedBlueprintAudienceId=Ze().audiences[0]?.id||"prd-table-page":r.selectedDemoPackageId===be.id?r.selectedBlueprintSceneId=be.scenes[0].id:r.selectedBlueprintAudienceId=qn.audiences[0].id,T()}function VP(){return r.selectedDemoPackageId===Oe?UP():r.selectedDemoPackageId===be.id?Az():Bz()}function UP(){const e=Ze();return KP(e)}function KP(e){const n=e.pageType||"",t=n?Rt(n):null,i=re(r.prdTableRows).map((d,p)=>({...d,sourceIndex:p})).filter(d=>d.key.trim()||d.value.trim()).filter(d=>!Gr(d)),a=t?_z(t.nodes||[]):e.audiences[0]?.modules.map((d,p)=>({id:d.id,order:p+1,name:d.name,kind:ms(d.component),detail:"由 PRD 字段临时生成"}))||[],o=Math.max(a.length,i.length,1),s=r.blueprintReturningFromPreview?" is-returned-from-preview":"",l=!!t;return`
    <section class="blueprint-confirm blueprint-overview${s}">
      <header class="blueprint-minimal-head">
        <div>
          <span>PRD 解析结果</span>
          <h1>确认活动策略</h1>
          <p>${l?"页面模板已命中；下方直接展开页面继承的分子变量，有 PRD 值自动带入，没值留空。":`左侧是「${v(n||"未识别类型")}」命中的页面模板模块；右侧是 PRD 输入表格里的具体信息，有值展示、没值留空。`}</p>
        </div>
        <button class="blueprint-side-generate" data-demo-generate-activity>
          <span>预览页面</span>
          <b>→</b>
        </button>
      </header>

      ${l?`
        ${fz({templateName:t.name})}
        ${sz({templateName:t.name,pageTemplate:t})}
      `:`
        <section class="prd-template-map">
        <header>
          <div>
            <span>模板模块与 PRD 信息对齐</span>
            <strong>${v(t?.name||n||"未命中模板")}</strong>
          </div>
          <em>${a.length} 个模板模块 · ${i.length} 条 PRD 信息</em>
        </header>
        <div class="prd-template-map-head">
          <span>页面模块</span>
          <span>PRD 具体信息</span>
        </div>
        <div class="prd-template-map-rows">
          ${Array.from({length:o},(d,p)=>Ez({index:p,module:a[p],row:i[p]})).join("")}
        </div>
      </section>
      `}
    </section>
  `}function qP(e){const t={页面类型:["类型","页面类型","模板类型","页面模板类型"],活动名称:["活动名称","名称"],活动目标:["活动目标","目标","核心目标"],活动时间:["活动时间","时间"]}[e]||[e];return r.prdTableRows.findIndex(i=>t.some(a=>N(i?.key)===N(a)))}function Pn(e){const n=N(e);return r.prdTableRows.findIndex(t=>N(t?.key)===n)}function WP(e,n=""){let t=qP(e);return t>=0?t:(r.prdTableRows.push({key:e,value:n}),r.prdTableRows.length-1)}function XP({label:e,moduleName:n,versionName:t,dimensionTitle:i="",defaultValue:a=""}){if(!t||t==="默认版本")return WP(e,a);const s=i?`${n}｜${i}｜${t}｜${e}`:`${n}｜${t}｜${e}`,l=Pn(s);return l>=0?l:(r.prdTableRows.push({key:s,value:a}),r.prdTableRows.length-1)}const Dn="页面模板变量",zn="页面模板变量版本";function ut(e){return[Dn,String((e.moduleIndex??0)+1),e.compoundKey].join("｜")}function on(e,n){return["page-template",e,String(n)].join("｜")}function lo(e){const[n,t,i]=String(e||"").split("｜");if(n!=="page-template")return null;const a=Number(i);return!t||!Number.isFinite(a)?null:{templateId:t,moduleIndex:a}}function _i(e,n){return[zn,String((e.moduleIndex??0)+1),n,e.compoundKey].join("｜")}function Ne(e){const n=String(e||"").split("｜");if(n[0]!==zn||n.length<4)return null;const t=Number(n[1])-1,i=n[2];let a=n.slice(3).join("｜");const o=a.match(/^(\d+)\|(.+)$/);if(o){const s=Number(o[1]);Number.isFinite(s)&&(s===t||s===t+1)&&(a=o[2])}return!Number.isFinite(t)||!i||!a?null:{moduleIndex:t,versionName:i,compoundKey:a}}function cS(e){return e.field?.label||e.key||e.compoundKey}function de(e){const n=String(e?.compoundKey||e?.key||""),t=n.match(/^(\d+)\|(.+)$/);if(!t)return n;const i=Number(t[1]);return Number.isFinite(i)&&i===Number(e?.moduleIndex)?t[2]:n}function YP(e){const n=e.field?.label||e.key||e.compoundKey,t=e.moduleName===e.childName?`${e.moduleName} · ${n}`:`${e.moduleName} · ${e.childName} · ${n}`,i=[e.label,n,e.key,t].filter(Boolean);for(const a of i){const o=uo(r.prdTableRows,a);if(o)return o}return""}function ps(e){const n=ut(e),t=Pn(n);return t>=0?r.prdTableRows[t]?.value||"":YP(e)||e.value||""}function cs(e,n){const t=_i(e,n),i=Pn(t);return i>=0?i:(r.prdTableRows.push({key:t,value:ps(e)}),r.prdTableRows.length-1)}function JP(e){const n=Pn(e.rowKey);return n>=0?n:(r.prdTableRows.push({key:e.rowKey,value:e.value||""}),r.prdTableRows.length-1)}function uS(e,n,t,i){if(!e||t==="default")return e?.rowIndex;const a=de(e),o=Fk(n,e.moduleIndex,t,a),s=Pn(o);if(s>=0)return s;const l=i!==void 0?i:r.prdTableRows[e.rowIndex]?.value??e.value??"";return r.prdTableRows.push({key:o,value:t==="unregistered"&&a==="4.buttonText"?"立即报名":t==="postSignup"&&iv.has(e.sourceModuleSchemaId||e.moduleSchemaId)&&a==="2.buttonText"?"已报名":l}),r.prdTableRows.length-1}function ZP(e){return e?.stateOptions?.length>1&&(iv.has(e.sourceModuleSchemaId||e.moduleSchemaId)||to(e.templateId,e.moduleIndex))}function QP(e){return to(e?.templateId,e?.moduleIndex)?e.activeStateId!=="entry"?e.activeStateId:`entry:${io(e.templateId,e.moduleIndex)}`:e?.activeStateId||"default"}function ez(e,n){const t=Hi(e?.moduleSchemaId);if(!t)return"";const i=Za(t);return Ps(i,de(n))}function nz(e,n){const t=QP(e);return!n||t==="default"||!ZP(e)?n:{...n,name:e.stateOptions?.find(i=>i.id===e.activeStateId)?.name||n.name,sections:(n.sections||[]).map(i=>({...i,fields:(i.fields||[]).map(a=>({...a,rowIndex:uS(a,e.templateId,t,t==="entry:default"?void 0:ez(e,a))}))}))}}function us(e,n){return!n||e.activeStateId==="default"?n:{...n,name:e.stateOptions?.find(t=>t.id===e.activeStateId)?.name||n.name,sections:(n.sections||[]).map(t=>({...t,fields:(t.fields||[]).map(i=>{const a=de(i);return ct(a)?i:{...i,rowIndex:uS(i,e.templateId,e.activeStateId)}})}))}}function vi(e,n){const t=Pn(e);return t>=0?(r.prdTableRows[t].value=n,t):(r.prdTableRows.push({key:e,value:n}),r.prdTableRows.length-1)}function tz(e,n){const t=e?.sourcePageTemplateId||"",i=Number(e?.sourcePageTemplateNodeIndex);if(!t||!Number.isFinite(i))return null;const a=[...pe,...ne].find(s=>s.id===t);return a&&(e?.schemaId==="S级-中秋头图"?xS({templateId:t,moduleIndex:i,moduleName:Hn("S级-中秋头图","头图"),sourceModuleSchemaId:"头图"}):Li(a)).find(s=>Number(s.moduleIndex)!==i?!1:de(s)===n||s.compoundKey===n||s.key===n)||null}function iz(e,n){if(!n||n==="base")return"";const t=on(e.sourcePageTemplateId,e.sourcePageTemplateNodeIndex);return Dt(t).find(a=>a.id===n)?.name||je(e,n)?.title||""}function Yt(e,n,t){if(!e)return;Ai(e,n,t);const i=String(n||"").split(".").pop();(e.guidedStates||[]).forEach(a=>{(a.lockedPropKeys||[]).includes(i)||Ai(a.node,n,t)})}function gS(e,n,t,i){if(!e)return;const a=n||e.activeLineageVariantId||"base";if(a!=="base"){const s=je(e,a);s&&Yt(s.node,t,i),e.activeLineageVariantId===a&&Yt(e,t,i);return}Yt(e,t,i);const o=je(e,"base");o&&Yt(o.node,t,i)}function az(e,n,t){e&&(Yt(e,n,t),Zn(e).forEach(i=>{Yt(i.node,n,t)}))}function mS(e,n){if(ct(n))return!1;if(e?.consumptionReturnDetailMode===un)return!0;const t=Number(e.sourcePageTemplateNodeIndex);return Number.isInteger(t)?r.prdTableRows.find(a=>a.key===Ni(t))?.value===un:!1}function Sd(e,n,t,i,a){mS(e,n)&&document.querySelectorAll("[data-guided-lineage-value], [data-guided-lineage-inline]").forEach(o=>{o===a||String(o.dataset.guidedLineageValue||o.dataset.guidedLineageInline||"").split("|")[1]!==t||(o.matches("[data-guided-lineage-inline]")?ZS(o,i):o.value=i)})}function hr(e,n,t,i){const a=tz(e,t);if(!a)return!1;const o=mS(e,t),s=iz(e,n);if(o){vi(ut(a),i);const l=on(e.sourcePageTemplateId,e.sourcePageTemplateNodeIndex);Dt(l).forEach(d=>{vi(_i(a,d.name),i)})}else{const l=s?_i(a,s):ut(a);vi(l,i)}return r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",r.pages.forEach(l=>{if(l.sourcePageTemplateId!==e.sourcePageTemplateId)return;const d=l.nodes?.find(p=>Number(p.sourcePageTemplateNodeIndex)===Number(e.sourcePageTemplateNodeIndex));o?az(d,t,i):gS(d,n,t,i)}),!0}function Td(e=[],n=""){const[t,i]=String(n).split("."),a=i!==void 0,o=Number(t),s=a?i:n;return e.find(l=>a?Number(l.childIndex)===o&&l.propKey===s:l.propKey===s||l.moleculePropKey===s)}function oz(e,n,t,i){if(!e?.sourceContextId||!e?.sourceModuleId)return!1;const{module:a}=Bn(e.sourceContextId,e.sourceModuleId);if(!a)return!1;const o=hn(a),s=o.find(p=>p.id===(n||e.activeLineageVariantId))||o[0],l=Td(s?.rows||[],t);return l?(l.value=i,s===o[0]&&(a.rows=oe(s.rows)),(a.inputScope==="activity"?ln().map(p=>p.modules.find(c=>c.inputScope==="activity"&&c.slot===a.slot)).filter(Boolean):[a]).forEach(p=>{const c=hn(p),u=c.find(w=>w.id===s.id)||c[0],g=Td(u?.rows||[],t);g&&(g.value=i),u===c[0]&&(p.rows=oe(u.rows))}),!0):!1}function Le(e,n,t,i){const a=e?.parent||e?.node;if(!a)return!1;const o=e?.parent?`${e.parent.children.indexOf(e.node)}.${t}`:t;if(a.schemaId==="S级-中秋头图"){if(hr(a,n,o,i))return(!n||n==="base")&&(Gt()[o]=String(i||"")),!0;if(xs(o,i))return!0}return hr(a,n,o,i)?!0:oz(a,n,o,i)}function rz(e=[]){const n={},t=new Map,i=new Map;return re(e).forEach(o=>{const s=Ce(o.key),l=String(o.value||"").trim(),d=Ne(o.key),p=s||d;if(!p||!l)return;s&&(n[Be(s.moduleIndex,s.compoundKey)]=l);const c=p.compoundKey==="taskCount"?Number(l):0,u=String(p.compoundKey||"").match(/^(\d+)\.(?:taskTitle|showNewTag|taskSubtitle|rewardCountText|completionText)$/),g=u?Number(u[1]):0;Number.isFinite(c)&&c>0&&t.set(p.moduleIndex,Math.max(t.get(p.moduleIndex)||0,c)),Number.isFinite(g)&&g>0&&i.set(p.moduleIndex,Math.max(i.get(p.moduleIndex)||0,g))}),new Set([...t.keys(),...i.keys()]).forEach(o=>{const s=t.get(o)||i.get(o)||1,l=Be(o,"taskCount");n[l]=String(Math.max(1,Math.round(s)))}),n}function fS(e,n,t=null){const i=ro(e,n,t),a=ov(e),o=a===null?i.map(s=>({field:s,fieldSpec:{moduleName:s.moduleName,sectionTitle:"",label:cS(s)}})):a.flatMap(s=>s.sections.flatMap(l=>l.fields.map(([d,p])=>{const c=i.find(u=>s.schemaIds.includes(u.moduleSchemaId)&&de(u)===d);return c?{field:c,fieldSpec:{moduleName:s.moduleName,sectionTitle:l.title,label:p}}:null}).filter(Boolean)));if(a!==null){const s=new Set(o.map(({field:d})=>d.compoundKey)),l={taskTitle:"标题",showNewTag:"NEW标签",taskSubtitle:"说明",rewardCountText:"奖励数量",completionText:"完成次数说明"};i.forEach(d=>{if(d.moduleSchemaId!=="任务列表"||s.has(d.compoundKey))return;const p=de(d).match(/^(\d+)\.(taskTitle|showNewTag|taskSubtitle|rewardCountText|completionText)$/);p&&o.push({field:d,fieldSpec:{moduleName:"核心玩法｜任务",sectionTitle:`任务${p[1]}`,label:l[p[2]]}})})}return o.map(({field:s,fieldSpec:l})=>({...s,...l}))}function Li(e,n=null){const t={blueprint:rz(r.prdTableRows)},i=ro(e,t,n),a=qI(fS(e,t,n),r.prdTableRows),o=new Map(a.map(d=>[d.compoundKey,d])),s=new Set;return a.forEach(d=>{const p=de(d).match(/^(\d+)\.prize\d+$/);p&&s.add(`${d.moduleIndex}|${p[1]}`)}),[...a,...i.filter(d=>{if(o.has(d.compoundKey))return!1;const p=de(d).match(/^(\d+)\.prize\d+$/);return!(p&&s.has(`${d.moduleIndex}|${p[1]}`))})].map(d=>{const p=o.get(d.compoundKey),c=p||yI(d),u={...d};return u.moduleName=c?.moduleName||d.moduleName,u.sectionTitle=c?c.sectionTitle:d.childName&&d.childName!==d.moduleName?d.childName:"模块内容",!p&&u.moduleSchemaId==="任务列表"&&Number(d.childIndex)>=1&&(u.sectionTitle=`任务${d.childIndex}`),u.label=c?.label||cS(d),u.isPrdKey=!!c,u.rowKey=ut(u),u.value=ps(u),u})}function xS(e){const n=ee("S级-中秋头图"),t=Gt();return[["mainTitle","主标题",t.mainTitle||"任务通关赢X元流量"],["highlightText","高亮文案",t.highlightText??"X元流量"],["subtitle","副标题",t.subtitle||"为爱加投"],["dateText","日期文案",t.dateText||"6月10日-6月21日"]].map(([a,o,s])=>{const l={templateId:e.templateId,moduleIndex:Number(e.moduleIndex),moduleSchemaId:"S级-中秋头图",sourceModuleSchemaId:e.sourceModuleSchemaId,moduleName:e.moduleName,childName:e.moduleName,sectionTitle:"S级头图文案",key:a,compoundKey:a,field:n?.props?.find(d=>d.key===a)||{key:a,label:o,type:"string"},label:o,isPrdKey:!1,value:s};return l.rowKey=ut(l),l.value=ps(l),l})}function $d(e,n){const t=[];e.forEach(a=>{const o=a.sectionTitle||"";let s=t.find(l=>l.title===o);s||(s={title:o,fields:[]},t.push(s)),s.fields.push({...a,rowIndex:n(a)})});const i=a=>a.fields.some(o=>o.key==="taskCount")?0:a.fields.some(o=>de(o)==="0.titleText")?1:2;return t.sort((a,o)=>i(a)-i(o)),t}function Gi(e,n=null){const t=wn(e),i=Li(e,n);return(n==null?t.map((o,s)=>({node:o,moduleIndex:s})):t[Number(n)]?[{node:t[Number(n)],moduleIndex:Number(n)}]:[]).map(({node:o,moduleIndex:s})=>{const l=i.filter(w=>Number(w.moduleIndex)===s),d=o.schemaId,p=no(d,e.id,s),c=ao(e.id,s,p),u=Ur(e.id,s,p,c)||l[0]?.moduleSchemaId||d,g=ka(e,u)||ka(e,d);return{templateId:e.id,moduleIndex:s,moduleSchemaId:u,sourceModuleSchemaId:d,isHeaderModule:bn(u)==="hero"||bn(d)==="hero",moduleName:g?.moduleName||Hn(u,p?.label||o.name),stateOptions:p?.states||[],activeStateId:c,fields:l,isPrdInputModule:l.some(w=>w.isPrdKey),isContentLocked:uI.has(u),versionModuleKey:on(e.id,s)}}).map(o=>{const s=o.isHeaderModule&&r.guidedHeaderLevelId==="s"?{...o,moduleSchemaId:"S级-中秋头图",fields:xS(o)}:o,l=Dt(s.versionModuleKey),d=ki({sections:$d(s.fields,JP)}),p=dn({schemaId:s.moduleSchemaId})?us(s,d):d,c=nz(s,d),u=l.map(x=>({...x,sections:$d(s.fields,$=>cs($,x.name))})),g=ui(s.versionModuleKey)&&u.length?u:[c,...u],w=G.find(x=>x.id===s.moduleSchemaId);if(!w)return{...s,versions:g,baseVersion:d,activeStateVersion:c,sharedDetailVersion:p};const y={};s.fields.forEach(x=>{const $=de(x);String($||"").includes(".")||(y[$]=x.value)});const h=dS(w,{blueprint:y}).map(x=>({...x,activeStateId:Lv(s.templateId,s.moduleIndex,x.childIndex,x.stateOptions)}));return{...s,versions:g,baseVersion:d,activeStateVersion:c,sharedDetailVersion:p,childStateControls:h}})}function sz({pageTemplate:e}){return`
    <section class="prd-variable-table">
      <div class="prd-variable-module-list">
        ${Gi(e).map(gs).join("")}
      </div>
    </section>
    ${hS()}
  `}function gs(e,n=0){const t=(e.versions||[]).length>1,i=r.prdTemplateSelectedModuleIndex!==null&&r.prdTemplateSelectedModuleIndex!==void 0&&Number(r.prdTemplateSelectedModuleIndex)===Number(e.moduleIndex);return`
    <section
      class="prd-variable-module-row ${t?"has-versions":""} ${i?"is-selected":""}"
      data-prd-template-module-row="${f(`${e.templateId}|${e.moduleIndex}`)}"
    >
      ${i?`
            <div class="prd-module-insert-rail" aria-label="添加分子模块">
              <button
                type="button"
                class="prd-module-order-btn"
                data-prd-move-template-module="${f(`${e.templateId}|${e.moduleIndex}|up`)}"
                aria-label="上移模块"
              >↑</button>
              <button
                type="button"
                class="prd-module-order-btn"
                data-prd-move-template-module="${f(`${e.templateId}|${e.moduleIndex}|down`)}"
                aria-label="下移模块"
              >↓</button>
              <button
                type="button"
                class="prd-module-jump-rail-btn"
                data-prd-switch-canvas="${f(`${e.templateId}|${e.moduleIndex}`)}"
              >切换至页面</button>
              <button
                type="button"
                data-prd-open-add-component="${f(`${e.templateId}|${e.moduleIndex}|before`)}"
              >上方添加</button>
              <button
                type="button"
                data-prd-open-add-component="${f(`${e.templateId}|${Number(e.moduleIndex)+1}|after`)}"
              >下方添加</button>
              <button
                type="button"
                class="prd-module-delete-float-btn"
                data-prd-delete-template-module="${f(`${e.templateId}|${e.moduleIndex}`)}"
              >删除模块</button>
            </div>
          `:""}
      <article class="prd-variable-module-name">
        <div class="prd-variable-module-title-row">
          <strong>${v(e.moduleName)}</strong>
          <button
            type="button"
            class="prd-module-jump-canvas-btn"
            data-prd-switch-canvas="${f(`${e.templateId}|${e.moduleIndex}`)}"
            aria-label="切换至页面预览"
          >▦ 切换至页面</button>
        </div>
        ${cz(e)}
        ${lz(e)}
        ${uz(e)}
        ${pz(e)}
        ${yS(e)}
      </article>
      <div class="prd-variable-section-list">
        ${e.isContentLocked?'<div class="prd-locked-module-note">固定内容</div>':e.isHeaderModule&&r.guidedHeaderLevelId==="s"?dz(e):CS(e)}
      </div>
    </section>
  `}function ke(e){const n=e?.dataset.prdTemplateModuleRow;if(!n)return!1;const[t,i]=n.split("|"),a=Number(i),o=[...pe,...ne].find(p=>p.id===t);if(!o||!Number.isInteger(a))return!1;const s=Gi(o,a)[0];if(!s)return!1;const l=document.createElement("template");l.innerHTML=gs(s,a).trim();const d=l.content.firstElementChild;return d?(e.replaceWith(d),window.renderReactMaterials?.(d),!0):!1}function Vo(){const e=document.querySelector(".prd-variable-module-list"),n=Vr();if(!e||!n)return!1;const t=Gi(n);return e.innerHTML=t.map(gs).join(""),window.renderReactMaterials?.(e),!0}function Uo(){const e=document.querySelector(".blueprint-overview");if(!e)return!1;e.querySelector("[data-prd-add-modal]")?.remove();const n=hS();if(!n)return!0;const t=document.createElement("template");t.innerHTML=n.trim();const i=t.content.firstElementChild;return i?(e.append(i),window.renderReactMaterials?.(i),!0):!1}function lz(e){if(!e?.isHeaderModule)return"";const n=r.guidedHeaderLevelId==="s"?"s":"default";return`
    <div class="prd-module-state-switch" aria-label="头图等级切换">
      <button
        type="button"
        class="${n==="default"?"active":""}"
        data-prd-header-level="default"
      >普通</button>
      <button
        type="button"
        class="${n==="s"?"active":""}"
        data-prd-header-level="s"
      >S级</button>
    </div>
  `}function dz(e){return CS(e)}function hS(){const e=r.prdTemplateAddModal;if(!e)return"";const n=Tr();return`
    <div class="prd-template-add-modal" data-prd-add-modal>
      <section class="prd-template-add-dialog" role="dialog" aria-modal="true" aria-label="选择分子组件">
        <header>
          <div>
            <span>选择分子模块</span>
            <strong>${e.direction==="before"?"添加到当前模块上方":"添加到当前模块下方"}</strong>
          </div>
          <button type="button" data-prd-close-add-component aria-label="关闭">×</button>
        </header>
        <div class="prd-template-add-grid">
          ${n.map(t=>`
            <button
              type="button"
              class="prd-template-add-card"
              data-prd-template-insert-molecule="${f(t.id)}"
              data-prd-template-id="${f(e.templateId)}"
              data-prd-template-insert-index="${f(e.insertIndex)}"
            >
              <div class="prd-template-add-preview ${t.imageUrl?"is-content":""}">
                <div class="prd-template-add-preview-inner ${t.imageUrl?"is-content":""}">
                  ${Cr(t)}
                </div>
              </div>
              <div class="prd-template-add-card-meta">
                <span>预存分子</span>
                <strong>${v(t.name)}</strong>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    </div>
  `}function pz(e){return e?.moduleSchemaId==="任务列表"||!e?.childStateControls?.length?"":`
    <section class="prd-variable-section prd-child-state-section">
      <strong>任务状态</strong>
      <div class="prd-child-state-list">
        ${e.childStateControls.map(n=>`
          <div class="prd-child-state-row">
            <span>${v(n.label)}</span>
            <div class="prd-module-state-switch" aria-label="${f(`${n.label}状态切换`)}">
              ${n.stateOptions.map(t=>`
                <button
                  type="button"
                  class="${t.id===n.activeStateId?"active":""}"
                  data-prd-template-child-state="${f(`${e.templateId}|${e.moduleIndex}|${n.childIndex}|${t.id}`)}"
                >${v(t.name)}</button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `}function cz(e){return e?.stateOptions?.length?`
    <div class="prd-module-state-switch${e.stateOptions.length>2?" is-multi":""}" aria-label="模块状态切换">
      ${e.stateOptions.map(t=>`
          <button
            type="button"
            class="${t.id===e.activeStateId?"active":""}"
            data-prd-template-state="${f(`${e.templateId}|${e.moduleIndex}|${t.id}`)}"
          >${v(t.name)}</button>
        `).join("")}
    </div>
  `:""}function uz(e){if(!to(e?.templateId,e?.moduleIndex)||e?.activeStateId!=="entry")return"";const n=io(e.templateId,e.moduleIndex);return`
    <div
      class="prd-module-state-switch is-secondary"
      aria-label="入口卡片状态切换"
    >
      ${ti.map(t=>`
        <button
          type="button"
          class="${t.id===n?"active":""}"
          data-prd-template-entry-state="${f(`${e.templateId}|${e.moduleIndex}|${t.id}`)}"
        >${v(t.name)}</button>
      `).join("")}
    </div>
  `}function gz(e){const n=[...pe,...ne].find(y=>y.id===e?.templateId),t=n?wn(n):[];t.forEach((y,h)=>{y.sourcePageTemplateId=n.id,y.sourcePageTemplateNodeIndex=h}),qr(t,n?.id||""),Wr(t,n?.id||""),Gv(t,n?.id||"");const i=Ze();jS(t,[],i?.consumptionProgressConfig,i?.taskListConfig,r.prdTableRows,n?.id||"");let a=t[Number(e?.moduleIndex)];if(!a)return null;const o=`${e.templateId}|${e.moduleIndex}`,s=r.prdTemplatePreviewVersions?.[o],l=e?.versions?.find(y=>y.id===s||y.name===s||y.title===s)||e?.versions?.[0];if(s&&s!=="base"&&a.guidedLineageVariants?.length){const y=a.guidedLineageVariants.find(h=>h.id===s||h.title===s||h.name===s);y?.node&&(a=ue(y.node))}e?.isHeaderModule&&r.guidedHeaderLevelId==="s"&&(a=bs("s",a));const d=l?.sections?.flatMap(y=>y.fields||[])||[],p=e?.sharedDetailVersion||us(e,e?.baseVersion),c=a.consumptionReturnDetailMode===un?p?.sections?.flatMap(y=>y.fields||[])||[]:[],u=new Map(c.map(y=>[de(y),y])),g=d.map(y=>{const h=de(y);return ct(h)?y:u.get(h)||y}),w=new Map;return g.forEach(y=>{const h=de(y),x=r.prdTableRows[y.rowIndex]?.value??y.value,[$,k]=String(h||"").split(".");if(k){const F=a.children?.[Number($)];if(F?.props&&(k in F.props||Pt(k))){F.props[k]=x;const _=Number(String(k).match(/^prize(\d+)/)?.[1]||0);_&&String(x||"").trim()&&w.set(Number($),Math.max(w.get(Number($))||0,_))}return}a.props&&h in a.props&&(a.props[h]=x)}),w.forEach((y,h)=>{const x=a.children?.[Number(h)];x?.props&&(x.props.prizeCount=y)}),(e?.childStateControls||[]).forEach(y=>{const h=a.children?.[Number(y.childIndex)];h?.guidedStates?.length&&y.activeStateId&&gn(h,y.activeStateId)}),a}function bS(e){const n=e.schemaId==="投放案例"?"placement-case-canvas":"",t=e.schemaId==="投放案例"?Is(e,{editable:!1}):ge(e,{editable:!1});return`
    <section
      class="node-wrap root guided-node prd-module-preview-node ${n}"
      data-node-id="${f(e.id||"")}"
    >
      <div class="guided-node-theme-content">${t}</div>
    </section>
  `}function yS(e){const n=gz(e);if(n){const t=[...pe,...ne].find(p=>p.id===e?.templateId),i=Rn(n),a=Number(t?.viewportWidth||750),o=Number(i.height||300),s=Math.min(.32,208/Math.max(1,a)),l=Math.max(72,Math.ceil(o*s)),d=e?.isHeaderModule&&r.guidedHeaderLevelId==="s"?Qt:t?.canvasBackground||t?.background||"#ffffff";return`
      <div
        class="prd-module-preview is-canvas"
        data-prd-module-preview="${f(`${e.templateId}|${e.moduleIndex}`)}"
        style="--prd-preview-page-width:${a}px;--prd-preview-page-height:${o}px;--prd-preview-scale:${s};height:${l}px;"
        aria-label="${f(`${e.moduleName}预览`)}"
      >
        <div class="prd-module-preview-canvas-stage">
          <section class="guided-page-shell prd-module-preview-shell">
            <div class="phone guided-phone prd-module-preview-phone">
              <div
                class="page guided-theme-page prd-module-preview-page"
                style="background:${f(d)};"
              >
                ${bS(n)}
              </div>
            </div>
          </section>
        </div>
      </div>
    `}return""}function wS(e,n){const t=[...pe,...ne].find(d=>d.id===e);if(!t)return;const i=Gi(t,Number(n))[0];if(!i)return;const a=document.querySelector(`[data-prd-module-preview="${CSS.escape(`${e}|${n}`)}"]`);if(!a)return;const o=yS(i);if(!o){a.remove();return}const s=document.createElement("template");s.innerHTML=o.trim();const l=s.content.firstElementChild;l&&(a.replaceWith(l),window.renderReactMaterials?.(l))}function Jt(e){const n=r.prdTableRows[Number(e)]?.key,t=Ce(n)||Ne(n)||ci(n);if(!t)return;const i=Ze(),a=i?.pageType?Rt(i.pageType):null;if(!a)return;const o=`${a.id}|${t.moduleIndex}`;r.prdTemplatePreviewVersions=r.prdTemplatePreviewVersions||{},r.prdTemplatePreviewVersions[o]=t.versionName||"base",wS(a.id,t.moduleIndex)}const Si=new Map;function vS(e){const n=r.prdTableRows[Number(e)]?.key,t=Ce(n)||Ne(n)||ci(n);return t?String(t.moduleIndex):""}function Cd(e){const n=vS(e);if(!n)return;const t=Si.get(n);t&&window.clearTimeout(t),Si.set(n,window.setTimeout(()=>{Si.delete(n),Jt(e)},72))}function mz(e){const n=vS(e);if(!n)return;const t=Si.get(n);t&&(window.clearTimeout(t),Si.delete(n),Jt(e))}function fz({templateName:e}){return`
    <section class="prd-basic-info-panel">
      <header>
        <strong>基础信息</strong>
      </header>
      <div class="prd-basic-info-grid">
        ${(hz(hI,{templateName:e}).versions?.[0]?.sections?.[0]?.fields||[]).map(xz).join("")}
      </div>
    </section>
  `}function xz(e){const n=r.prdTableRows[e.rowIndex]||{value:""},t=e.size==="wide";return`
    <label class="prd-basic-info-field ${t?"is-wide":""}">
      <span>${v(e.label)}</span>
      <textarea
        rows="${t?2:1}"
        data-prd-table-row="${e.rowIndex}"
      >${v(n.value||"")}</textarea>
    </label>
  `}function hz(e,{templateName:n}={}){const t=wz(e),i=bz(e);return{...e,sections:i,versions:t.map(a=>({...a,sections:yz({moduleConfig:{...e,sections:i},templateName:n,version:a})}))}}function bz(e){if(!Ht(e.moduleName))return e.sections;const n=yv(r.prdTableRows);return Array.from({length:n},(t,i)=>{const a=i+1;return{title:`任务${a}`,className:"is-task-card",fields:[[`${a}.taskTitle`,"标题"],[`${a}.showNewTag`,"NEW标签"],[`${a}.taskSubtitle`,"说明"],[`${a}.rewardCountText`,"奖励数量"],[`${a}.completionText`,"完成次数说明"]]}})}function yz({moduleConfig:e,templateName:n,version:t}){return e.sections.map(i=>({...i,fields:i.fields.map(a=>{const o=Array.isArray(a)?{key:a[0],label:a[1],type:/\.showNewTag$/.test(a[0])?"boolean":"string"}:typeof a=="string"?{label:a}:a,s=$z({moduleConfig:e,templateName:n,version:t,label:o.label});return{...o,rowIndex:XP({label:o.label,moduleName:e.moduleName,versionName:t.isBase?"":t.name,dimensionTitle:t.dimensionTitle,defaultValue:s})}})}))}function wz(e){const n=Dt(e.moduleName),t=ui(e.moduleName),i=a=>[...a,...n.filter(o=>!a.some(s=>N(s.name)===N(o.name)))];if(e.versionMode==="lotteryPrizes"){const a=mv(re(r.prdTableRows).map(o=>`${o.key||""}：${o.value||""}`).join(`
`));if(a.length>=2)return i(a.map((o,s)=>({id:s===0?"base":`lottery-${o.id}`,name:o.name,dimensionTitle:o.dimensionTitle||o.audience||"奖品人群",defaults:Object.fromEntries(o.prizes.map((l,d)=>[`奖品${d+1}名称`,l]))})))}if(e.versionMode==="consumptionProgress"){const a=Ze().consumptionProgressConfig;if(a?.entries?.length>=2)return i(a.entries.map((o,s)=>({id:s===0?"base":o.id,name:o.title||o.dimensionTitle||`版本${s+1}`,dimensionTitle:o.dimensionTitle,defaults:Tz(o.props)})))}return t&&n.length?n:i([ki({defaults:{}})])}function Dt(e){return(r.prdManualModuleVersions?.[e]||[]).map((n,t)=>({id:n.id||`manual_${t+1}`,name:n.name||`自定义版本 ${t+1}`,defaults:{},isManual:!0}))}function ui(e){return(r.prdManualModuleVersions?.[e]||[]).some(n=>String(n?.id||"").startsWith("imported_"))}function SS(e,n={}){if(!e||e==="页面基础信息")return;r.prdManualModuleVersions||(r.prdManualModuleVersions={});const t=r.prdManualModuleVersions[e]||[];if(n.id){const o=t.find(s=>s.id===n.id);if(o)return o}const i=ui(e)?t.length+1:t.length+2,a={id:n.id||`manual_${Date.now()}_${i}`,name:String(n.name||"").trim()||`人群${i}`};return t.push(a),r.prdManualModuleVersions[e]=t,r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",a}function TS(e,n,t){const a=(r.prdManualModuleVersions?.[e]||[]).find(l=>l.id===n);if(!a)return;const o=a.name,s=String(t||"").trim()||o||"自定义版本";s!==o&&(a.name=s,vz(e,o,s),document.querySelectorAll("[data-prd-version-name]").forEach(l=>{l.dataset.prdVersionModuleKey===e&&l.dataset.prdVersionId===n&&l.value!==s&&(l.value=s)}),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="")}function $S(e,n){const t=r.prdManualModuleVersions?.[e]||[],i=t.find(a=>a.id===n);return i?(r.prdManualModuleVersions[e]=t.filter(a=>a.id!==n),Sz(e,i.name),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",!0):!1}function vz(e,n,t){const i=lo(e);r.prdTableRows=re(r.prdTableRows).map(a=>{const o=String(a.key||"");if(i){const d=Ne(o);return d&&d.moduleIndex===i.moduleIndex&&N(d.versionName)===N(n)?{...a,key:o.replace(`${zn}｜${i.moduleIndex+1}｜${n}｜`,`${zn}｜${i.moduleIndex+1}｜${t}｜`)}:a}const l=[{prev:`${e}｜${n}｜`,next:`${e}｜${t}｜`},{prev:`${e}｜默认维度｜${n}｜`,next:`${e}｜默认维度｜${t}｜`}].find(d=>o.startsWith(d.prev));return l?{...a,key:`${l.next}${o.slice(l.prev.length)}`}:a})}function Sz(e,n){const t=lo(e);r.prdTableRows=re(r.prdTableRows).filter(i=>{const a=String(i.key||"");if(t){const o=Ne(a);return!(o&&o.moduleIndex===t.moduleIndex&&N(o.versionName)===N(n))}return!(a.startsWith(`${e}｜${n}｜`)||a.startsWith(`${e}｜默认维度｜${n}｜`))})}function Tz(e={}){return{抽奖入口文案:e.lotteryText,第1档奖励金额:e.reward1AmountText,第2档奖励金额:e.reward2AmountText,第3档奖励金额:e.reward3AmountText,第1个进度节点文案:e.milestone1Text,第2个进度节点文案:e.milestone2Text,第3个进度节点文案:e.milestone3Text,第4个进度节点文案:e.milestone4Text}}function $z({moduleConfig:e,templateName:n,version:t,label:i}){if(i==="页面类型")return n||"";if(t?.defaults&&Object.prototype.hasOwnProperty.call(t.defaults,i))return t.defaults[i]||"";if(Ht(e.moduleName)){const a=wv(r.prdTableRows);if(Object.prototype.hasOwnProperty.call(a,i))return a[i]||""}return""}function CS(e){const n=e.versions||[],t=n[0]?.sections||[],i=Pz(n),a=e.versionModuleKey||e.moduleName,o=new Set(["核心玩法模块-抽奖消返-3列","核心玩法模块-抽奖消返-4列"]).has(e.moduleSchemaId),s=e.fields.some(k=>String(k.value||"").trim().length>=36),l=e.fields.some(k=>/prize\d+ButtonText$/.test(de(k))),d=(k,F=!0,_=n,O="")=>`
    <section
      class="prd-variable-version-matrix${s?" has-long-copy":""}${l?" has-prize-popup-fields":""}"
      style="--prd-version-count:${_.length}"
    >
      ${i.length>1?`
        <div class="prd-variable-matrix-dimensions">
          <span>维度</span>
          ${_===n?i.map(H=>`
                  <strong style="grid-column: span ${H.count};">
                    ${v(H.title)}
                    <em>${H.count} 个版本</em>
                  </strong>
                `).join(""):`
                <strong style="grid-column: span ${_.length};">
                  ${v(_[0]?.dimensionTitle||"配置")}
                  <em>${_.length} 个版本</em>
                </strong>
              `}
        </div>
      `:""}
      <div class="prd-variable-matrix-head">
        <span class="prd-variable-matrix-actions">
          ${e.isContentLocked||!F?`配置项${O}`:`
                <button
                  type="button"
                  class="prd-variable-matrix-add-version"
                  data-prd-add-module-version="${f(a)}"
                  aria-label="新增人群"
                >＋ 人群</button>
              `}
        </span>
        ${_.map(H=>kz(H,a,e.isContentLocked)).join("")}
      </div>
      ${k.map(({section:H,sectionIndex:L})=>zz(H,L,_,e.isContentLocked)).join("")}
    </section>
  `,p=t.map((k,F)=>({section:k,sectionIndex:F}));if(!o)return d(p);const c=p.find(({section:k})=>k.title==="返券配置")||p.find(({section:k})=>(k.fields||[]).some(F=>F.key==="rewardType1")),u=p.filter(({section:k,sectionIndex:F})=>F!==c?.sectionIndex),g=r.prdTableRows.find(k=>k.key===Ni(e.moduleIndex)),w=Av(new Map([[Qa,g?.value||""]]),n.length),y=e.baseVersion||n.find(k=>!k.isManual)||n[0],h=e.sharedDetailVersion||us(e,y),x=w===un&&h?[{...h,name:"共用",dimensionTitle:"共用配置",isManual:!1}]:n,$=`
    <select
      class="prd-consumption-return-detail-mode-select"
      aria-label="下方配置版本模式"
      ${e.isContentLocked?"disabled":""}
      data-prd-consumption-detail-mode
      data-prd-consumption-module-index="${f(e.moduleIndex)}"
    >
      <option
        value="${at}"
        ${w===at?"selected":""}
      >跟随人群</option>
      <option
        value="${un}"
        ${w===un?"selected":""}
      >共用一套</option>
    </select>
  `;return`
    <section class="prd-variable-version-matrix prd-consumption-return-table">
      ${Cz(c?.sectionIndex??0,n,e.isContentLocked,a,e)}
    </section>
    ${d(u,!1,x,$)}
  `}function Cz(e,n,t=!1,i="",a={}){const o=(x,$)=>x.sections?.[e]?.fields?.find(k=>k.key===$),s=Array.from(new Set(n.flatMap(x=>(x.sections?.[e]?.fields||[]).map($=>String($.key||"").match(/^rewardType(\d+)$/)?.[1]).filter(Boolean).map(Number)))).sort((x,$)=>x-$),l=s.length?s:[1,2,3,4],d=(x,$)=>{if(!x)return"";const k=r.prdTableRows[x.rowIndex]||{value:""},F=rt(x.field||x)?An(x.field||x,k.value,`${t?"disabled":""} data-prd-table-row="${f(x.rowIndex)}"`,x.label):`
        <textarea
          rows="1"
          aria-label="${f(x.label)}"
          ${t?"readonly":""}
          data-prd-table-row="${x.rowIndex}"
        >${v(k.value||"")}</textarea>
      `;return`
      <label class="prd-consumption-return-input">
        <span>${v($)}</span>
        ${F}
      </label>
    `},p=x=>{const $=x?r.prdTableRows[x.rowIndex]:null,k=String($?.value||x?.field?.default||x?.default||"").trim();return k==="抽奖"||k==="抽奖任务"},c=x=>{const $=eo(a.moduleIndex,x.isManual?x.name:""),k=r.prdTableRows.find(O=>O.key===$),F=Number(k?.value);return[3,4].includes(F)?F:["amountText4","consumeAmountText4"].some(O=>{const H=o(x,O),L=H?r.prdTableRows[H.rowIndex]:null;return!!String(L?.value??"").trim()})?4:3},u=Math.max(3,...n.map(x=>c(x))),g=l.filter(x=>x<=u),w=x=>{const $=n.map(_=>o(_,`rewardType${x}`)).filter(Boolean),k=$[0];if(!k)return`<strong>第${x}档</strong>`;const F=r.prdTableRows[k.rowIndex]||{value:""};return`
      <strong class="prd-consumption-return-tier-head">
        <span>第${x}档</span>
        ${An(k.field||k,F.value,`${t?"disabled":""} data-prd-return-tier-type-rows="${f($.map(_=>_.rowIndex).join(","))}"`,`第${x}档类型`)}
      </strong>
    `},y=(x,$)=>{if($>c(x))return'<div class="prd-consumption-return-cell is-hidden-tier" aria-hidden="true"></div>';const k=o(x,`rewardType${$}`),F=o(x,`consumeAmountText${$}`),_=o(x,`amountText${$}`),O=p(k);return`
      <div class="prd-consumption-return-cell ${O?"is-draw-task":""}">
        ${d(F,"满")}
        ${O?"":d(_,"赠")}
      </div>
    `},h=x=>{const $=c(x),k=`
      <select
        class="prd-consumption-return-version-tier-select is-${$}-tier"
        aria-label="${f(`${x.name}返券档位`)}"
        ${t?"disabled":""}
        data-prd-consumption-version-tier
        data-prd-consumption-template-id="${f(a.templateId||"")}"
        data-prd-consumption-module-index="${f(a.moduleIndex)}"
        data-prd-consumption-version-id="${f(x.id||"base")}"
        data-prd-consumption-version-name="${f(x.name)}"
      >
        <option value="3" ${$===3?"selected":""}>三档</option>
        <option value="4" ${$===4?"selected":""}>四档</option>
      </select>
    `;return x.isManual?`
      <div class="prd-consumption-return-version is-manual">
        <input
          type="text"
          value="${f(x.name)}"
          aria-label="版本名称"
          ${t?"readonly":""}
          data-prd-version-name
          data-prd-version-module-key="${f(i)}"
          data-prd-version-id="${f(x.id)}"
        />
        ${k}
        ${t?"":`
              <button
                type="button"
                aria-label="删除版本"
                title="删除版本"
                data-prd-delete-module-version="${f(x.id)}"
                data-prd-version-module-key="${f(i)}"
              >×</button>
            `}
      </div>
    `:`
        <div class="prd-consumption-return-version">
          <strong>${v(x.name)}</strong>
          ${k}
          ${x.dimensionTitle?`<span>${v(x.dimensionTitle)}</span>`:""}
        </div>
      `};return`
    <section class="prd-variable-matrix-section prd-consumption-return-section">
      <div class="prd-variable-matrix-section-head">
        <strong class="prd-consumption-return-title">
          返券配置
          <b>PRD</b>
        </strong>
      </div>
      <div class="prd-consumption-return-matrix" style="--prd-return-tier-count:${g.length}">
        <div class="prd-consumption-return-head">
          <strong class="prd-consumption-return-version-head">
            <span>版本</span>
            ${t?"":`
                  <button
                    type="button"
                    class="prd-variable-matrix-add-version"
                    data-prd-add-module-version="${f(i)}"
                    aria-label="新增返券配置人群"
                  >＋ 人群</button>
                `}
          </strong>
          ${g.map(x=>w(x)).join("")}
        </div>
        ${n.map(x=>`
          <div class="prd-consumption-return-row">
            ${h(x)}
            ${g.map($=>y(x,$)).join("")}
          </div>
        `).join("")}
      </div>
    </section>
  `}function Iz(e){const n=e?.closest?.(".prd-consumption-return-row"),t=n?.querySelector?.("[data-prd-consumption-version-tier]");if(!t)return;const a=[...n.querySelectorAll("textarea")].some(l=>["第4档 · 消耗门槛","第4档 · 券金额"].includes(l.getAttribute("aria-label"))&&String(l.value||"").trim())?4:3;t.value=String(a),t.classList.toggle("is-3-tier",a===3),t.classList.toggle("is-4-tier",a===4);const o=Number(t.dataset.prdConsumptionModuleIndex),s=t.dataset.prdConsumptionVersionId==="base"?"":t.dataset.prdConsumptionVersionName||"";Number.isInteger(o)&&Un(eo(o,s),String(a))}function kz(e,n,t=!1){return e.isManual?`
    <strong class="prd-variable-version-head is-manual">
      <input
        type="text"
        value="${f(e.name)}"
        aria-label="版本名称"
        ${t?"readonly":""}
        data-prd-version-name
        data-prd-version-module-key="${f(n)}"
        data-prd-version-id="${f(e.id)}"
      />
      ${t?"":`
            <button
              type="button"
              aria-label="删除版本"
              title="删除版本"
              data-prd-delete-module-version="${f(e.id)}"
              data-prd-version-module-key="${f(n)}"
            >×</button>
          `}
    </strong>
  `:`
      <strong>
        ${v(e.name)}
        ${e.dimensionTitle?`<em>${v(e.dimensionTitle)}</em>`:""}
      </strong>
    `}function Pz(e=[]){const n=[];return e.forEach(t=>{const i=t.dimensionTitle||"默认维度",a=n[n.length-1];a?.title===i?a.count+=1:n.push({title:i,count:1})}),n}function zz(e,n,t,i=!1){const a=e.className?` ${e.className}`:"",o=e.title==="模块内容"?"":e.title,s=(e.fields||[]).find(z=>z.key==="paragraphCount"),l=(e.fields||[]).find(z=>z.key==="taskCount"),d=s?t.map(z=>z.sections?.[n]?.fields?.find(D=>D.key==="paragraphCount")).filter(Boolean):[],p=s?d.map(z=>$e(Number(r.prdTableRows[z.rowIndex]?.value||z.value||4),1,4)):[],c=p.length?Math.max(...p):4,u={first:1,second:2,third:3,fourth:4},g=s?d.map((z,D)=>{const j=p[D]||4;return`
          <div class="prd-paragraph-stepper" aria-label="段落数量">
            <button
              type="button"
              data-prd-paragraph-count-delta="-1"
              data-prd-paragraph-count-rows="${f(z.rowIndex)}"
              aria-label="减少一段"
              ${j<=1?"disabled":""}
            >−</button>
            <span>${j}</span>
            <button
              type="button"
              data-prd-paragraph-count-delta="1"
              data-prd-paragraph-count-rows="${f(z.rowIndex)}"
              aria-label="增加一段"
              ${j>=4?"disabled":""}
            >＋</button>
          </div>
        `}).join(""):"",w=z=>z.sections?.flatMap(D=>D.fields||[]).find(D=>D.key==="taskCount"),y=t.map(w),h=y.map(z=>Math.max(1,Math.round(Number(z&&r.prdTableRows[z.rowIndex]?.value||z?.value||3)))),x=l?y.map((z,D)=>{const j=h[D]||3;return z?`
          <div class="prd-paragraph-stepper" aria-label="任务数量">
            <button
              type="button"
              data-prd-task-count-delta="-1"
              data-prd-task-count-rows="${f(z.rowIndex)}"
              aria-label="减少一个任务"
              ${j<=1?"disabled":""}
            >−</button>
            <span>${j}</span>
            <button
              type="button"
              data-prd-task-count-delta="1"
              data-prd-task-count-rows="${f(z.rowIndex)}"
              aria-label="增加一个任务"
            >＋</button>
          </div>
        `:"<div></div>"}).join(""):"",$=(e.fields||[]).filter(z=>/^(\d+)\.prize\d+$/.test(de(z))),k=$[0]?de($[0]).match(/^(\d+)\.prize\d+$/):null,F=t.filter(z=>!z.isBase&&z.name).map(z=>z.name),_=k&&!i?`
      <button
        type="button"
        class="prd-variable-prize-add"
        data-prd-prize-add
        data-prd-prize-module-index="${f($[0].moduleIndex)}"
        data-prd-prize-child-index="${f(k[1])}"
        data-prd-prize-version-names="${f(JSON.stringify(F))}"
      >+ 奖品</button>
    `:"",O=o||(l?"任务数量":""),H=/^任务\d+$/.test(o)?t.map(z=>z.sections?.[n]?.fields?.find(D=>/\.showNewTag$/.test(de(D)))).filter(Boolean):[],L=H.map(z=>z.rowIndex).filter(z=>Number.isInteger(z)),Y=H.some(z=>/^(?:true|1|yes|是|开启|开|new)$/i.test(String(r.prdTableRows[z.rowIndex]?.value||""))),K=L.length?`
      <button
        type="button"
        class="prd-task-new-tag-toggle ${Y?"is-checked":""}"
        data-prd-task-new-tag-rows="${f(L.join(","))}"
        aria-pressed="${Y?"true":"false"}"
        aria-label="${Y?"关闭":"开启"}NEW标签"
        ${i?"disabled":""}
      >
        <i aria-hidden="true"></i>
        <span>NEW标签</span>
      </button>
    `:"",se=Number(String(o).match(/^任务\s*(\d+)$/)?.[1]||0);if(se&&h.length&&h.every(z=>z<se))return"";const I=!!(s||l);return`
    <section class="prd-variable-matrix-section${a}">
      ${O?`<div class="prd-variable-matrix-section-head${I?" has-versioned-count-controls":""}"><strong>${v(O)}${K}</strong><div class="prd-variable-section-actions${I?" is-versioned":""}">${g}${x}${_}</div></div>`:""}
      <div class="prd-variable-matrix-rows">
        ${(e.fields||[]).map((z,D)=>{if(z.key==="paragraphCount"||z.key==="taskCount"||/\.showNewTag$/.test(de(z)))return"";const j=de(z);if(/^(\d+)\.prize\d+ButtonText$/.test(j))return"";const W=j.match(/^(\d+)\.prize(\d+)$/),Z=W?(e.fields||[]).findIndex(P=>de(P)===`${W[1]}.prize${W[2]}ButtonText`):-1,J=Object.keys(u).find(P=>String(z.key||"").startsWith(P));return J&&u[J]>c?"":Fz(z,{sectionIndex:n,fieldIndex:D,versions:t,isContentLocked:i,prizeCount:$.length,prizeVersionNames:F,pairedFieldIndex:Z,paragraphCounts:p,paragraphOrder:J?u[J]:0,taskCounts:h,taskNumber:se})}).join("")}
      </div>
    </section>
  `}function Fz(e,{sectionIndex:n,fieldIndex:t,versions:i,isContentLocked:a=!1,prizeCount:o=0,prizeVersionNames:s=[],pairedFieldIndex:l=-1,paragraphCounts:d=[],paragraphOrder:p=0,taskCounts:c=[],taskNumber:u=0}){const g=de(e).match(/^(\d+)\.prize(\d+)$/),w=g&&!a?`
      <button
        type="button"
        class="prd-variable-prize-delete"
        data-prd-prize-delete
        data-prd-prize-module-index="${f(e.moduleIndex)}"
        data-prd-prize-child-index="${f(g[1])}"
        data-prd-prize-index="${f(g[2])}"
        data-prd-prize-version-names="${f(JSON.stringify(s))}"
        aria-label="删除${f(e.label)}"
        ${o<=1?"disabled":""}
      >×</button>
    `:"",y=g&&!a?`
      <span class="prd-variable-prize-order">
        <button
          type="button"
          data-prd-prize-move="-1"
          data-prd-prize-module-index="${f(e.moduleIndex)}"
          data-prd-prize-child-index="${f(g[1])}"
          data-prd-prize-index="${f(g[2])}"
          data-prd-prize-version-names="${f(JSON.stringify(s))}"
          aria-label="上移${f(e.label)}"
          title="上移"
          ${Number(g[2])<=1?"disabled":""}
        >↑</button>
        <button
          type="button"
          data-prd-prize-move="1"
          data-prd-prize-module-index="${f(e.moduleIndex)}"
          data-prd-prize-child-index="${f(g[1])}"
          data-prd-prize-index="${f(g[2])}"
          data-prd-prize-version-names="${f(JSON.stringify(s))}"
          aria-label="下移${f(e.label)}"
          title="下移"
          ${Number(g[2])>=o?"disabled":""}
        >↓</button>
      </span>
    `:"";return`
    <div class="prd-variable-matrix-row ${e.isPrdKey?"is-prd-key":""}">
      <span>
        <i>${v(e.label)}</i>
        <em>${e.isPrdKey?"<b>PRD</b>":""}${y}${w}</em>
      </span>
      ${i.map((h,x)=>{const $=h.sections?.[n]?.fields?.[t]||e;if(p&&p>(d[x]||4)||u&&u>(c[x]||3))return'<div class="prd-variable-matrix-empty-cell" aria-hidden="true"></div>';const k=l>=0?h.sections?.[n]?.fields?.[l]:null;return Nz($,a,k)}).join("")}
    </div>
  `}function Nz(e,n=!1,t=null){const i=r.prdTableRows[e.rowIndex]||{value:""};if(oS(e)){const a=Ei(i.value);i.value&&a&&i.value!==a&&(r.prdTableRows[e.rowIndex].value=a,i.value=a);const o=t?r.prdTableRows[t.rowIndex]||{value:""}:null,s=t?`
        <label class="prd-prize-popup-button-field">
          <span>弹窗按钮文案</span>
          <textarea
            rows="1"
            aria-label="${f(t.label)}"
            ${n?"readonly":""}
            data-prd-table-row="${t.rowIndex}"
          >${v(o?.value||"")}</textarea>
        </label>
      `:"";return PP(i.value,`${n?"disabled":""} data-prd-prize-table-row="${f(e.rowIndex)}"`,e.label,`${n?"disabled":""} data-prd-prize-name-row="${f(e.rowIndex)}"`,`${n?"disabled":""} data-prd-prize-copy-row="${f(e.rowIndex)}"`,`${n?"disabled":""} data-prd-prize-amount-row="${f(e.rowIndex)}"`,s)}if(rt(e.field||e))return An(e.field||e,i.value,`${n?"disabled":""} data-prd-table-row="${f(e.rowIndex)}"`,e.label);if(e.type==="boolean"){const a=/^(?:true|1|yes|是|开启|开|new)$/i.test(String(i.value||"").trim());return`
      <label class="prd-variable-checkbox">
        <input
          type="checkbox"
          data-prd-table-row="${e.rowIndex}"
          ${a?"checked":""}
          ${n?"disabled":""}
        />
        <span>${a?"开启":"关闭"}</span>
      </label>
    `}return`
    <textarea
      rows="${Math.min(2,st(i.value))}"
      aria-label="${f(e.label)}"
      ${n?"readonly":""}
      data-prd-table-row="${e.rowIndex}"
    >${v(i.value||"")}</textarea>
  `}function Ez({index:e,module:n,row:t}){const i=n?.name||"",a=n?.kind||"",o=n?.detail||"",s=String(t?.key||"").trim(),l=String(t?.value||"").trim();return`
    <section class="prd-template-map-row">
      <article class="prd-template-module-cell ${n?"":"is-empty"}">
        <b>${String(e+1).padStart(2,"0")}</b>
        <div>
          <span>${v(a||"空模块位")}</span>
          <strong>${v(i||"模板没有对应模块")}</strong>
          <em>${v(o||(n?"页面顶层模块":"PRD 信息多于模板模块"))}</em>
        </div>
      </article>
      <label class="prd-template-info-cell ${t?"":"is-empty"}">
        <span>${v(s||"无 PRD 字段")}</span>
        <textarea
          rows="${st(l)}"
          ${t?`data-prd-table-row="${t.sourceIndex}"`:"readonly"}
        >${v(l)}</textarea>
      </label>
    </section>
  `}function _z(e=[]){return(e||[]).filter(n=>n&&n.type!=="background").map((n,t)=>{const i=ee(n.schemaId)||G.find(o=>o.id===n.schemaId||o.name===n.schemaId),a=n.type==="molecule"||i?.type==="molecule";return{id:n.id||`template-module-${t+1}`,schemaId:n.schemaId,order:t+1,name:Hn(n.schemaId,n.name||i?.name||`模块 ${t+1}`),kind:a?"分子模块":"原子组件",detail:a?`${(n.children||[]).length} 个子组件`:i?.category||i?.description||"页面组件"}})}function Bz(){return IS({audienceGroups:qn.audiences.map(e=>({audience:e,contexts:[e]})),slots:qn.slots,unitLabel:"页面"})}function Az(){return IS({audienceGroups:be.audiences.map(e=>({audience:e,contexts:be.phases.map(n=>be.scenes.find(t=>t.audienceId===e.id&&t.phaseId===n.id)).filter(Boolean)})),slots:be.slots,unitLabel:"场景"})}function Mz(){if(r.selectedDemoPackageId===Oe){const e=Ze();return{audienceGroups:e.audiences.map(n=>({audience:n,contexts:[n]})),slots:e.slots,unitLabel:"页面"}}return r.selectedDemoPackageId===be.id?{audienceGroups:be.audiences.map(e=>({audience:e,contexts:be.phases.map(n=>be.scenes.find(t=>t.audienceId===e.id&&t.phaseId===n.id)).filter(Boolean)})),slots:be.slots,unitLabel:"场景"}:{audienceGroups:qn.audiences.map(e=>({audience:e,contexts:[e]})),slots:qn.slots,unitLabel:"页面"}}function jz(e){return 360}function IS({audienceGroups:e,slots:n,unitLabel:t}){const i=e.flatMap(s=>s.contexts),a=new Map,o=r.blueprintReturningFromPreview?" is-returned-from-preview":"";return i.forEach(s=>{s.modules.forEach(l=>{if(l.inputScope!=="activity")return;const d=`${l.slot}|${l.component}`;a.has(d)||a.set(d,s.id)})}),`
    <section class="blueprint-confirm blueprint-overview${o}">
      <header class="blueprint-minimal-head">
        <div>
          <span>PRD 解析结果</span>
          <h1>确认活动策略</h1>
          <p>确认系统拆出的活动目标、人群策略和页面模块，详细变量可在预览阶段继续编辑。</p>
        </div>
        <button class="blueprint-side-generate" data-demo-generate-activity>
          <span>预览页面</span>
          <b>→</b>
        </button>
      </header>

      ${Rz({contexts:i,audienceGroups:e,slots:n,activityInputOwners:a,unitLabel:t})}
    </section>
  `}function Rz({contexts:e,audienceGroups:n,slots:t,activityInputOwners:i,unitLabel:a}){return`
    <section class="blueprint-strategy-board">
      ${Hz({contexts:e,audienceGroups:n,slots:t,unitLabel:a})}
      <section class="blueprint-strategy-audiences">
        <header>
          <div>
            <span>人群策略拆解</span>
          </div>
          <em>${n.length} 类人群 · ${e.length} 个${a}</em>
        </header>
        <div
          class="blueprint-strategy-columns"
          style="--blueprint-strategy-columns:${n.length}"
        >
          ${n.map((o,s)=>Dz({group:o,index:s,slots:t,activityInputOwners:i})).join("")}
        </div>
      </section>
    </section>
  `}function Hz({contexts:e,audienceGroups:n,slots:t,unitLabel:i}){const a=e.reduce((o,s)=>o+s.modules.length,0);return`
    <section class="blueprint-activity-hero">
      <div class="blueprint-activity-hero-main">
        <span>活动基础信息</span>
        <input
          value="${f(Kz())}"
          data-blueprint-prd-field="activityName"
          aria-label="活动名称"
        />
        <label>
          <b>核心目标</b>
          <textarea
            rows="2"
            data-blueprint-prd-field="activityGoal"
          >${v(qo(e,"activityGoal"))}</textarea>
        </label>
      </div>
      <div class="blueprint-activity-hero-facts">
        ${na({label:"入口",value:qo(e,"activityEntrance"),key:"activityEntrance"})}
        ${na({label:"时间",value:qo(e,"activityTime"),key:"activityTime"})}
        ${na({label:"人群页面",value:`${n.length} 类人群，各生成 1 套${i}`,readonly:!0})}
        ${na({label:"模块组成",value:`${t.length} 个模块位置，合计 ${a} 个模块实例`,readonly:!0})}
      </div>
    </section>
  `}function na({label:e,value:n,key:t,readonly:i=!1}){return`
    <label class="blueprint-strategy-fact">
      <span>${v(e)}</span>
      <textarea
        rows="2"
        ${t?`data-blueprint-prd-field="${f(t)}"`:""}
        ${i?"readonly":""}
      >${v(n)}</textarea>
    </label>
  `}function Dz({group:e,index:n,slots:t,activityInputOwners:i}){return`
    <article class="blueprint-strategy-audience">
      <header>
        <span>${String(n+1).padStart(2,"0")}</span>
        <div>
          <em>人群策略</em>
          <input
            value="${f(e.audience.name)}"
            data-blueprint-audience-field="${f(`${e.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${f(`${e.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${v(e.audience.ruleSummary||e.audience.description||`${e.contexts.length} 个页面场景`)}</textarea>
        </div>
      </header>
      <div class="blueprint-strategy-pages">
        ${e.contexts.map(a=>Lz({context:a,group:e,slots:t,activityInputOwners:i})).join("")}
      </div>
    </article>
  `}function Lz({context:e,group:n,slots:t,activityInputOwners:i}){const a=e.phaseId?be.phases.find(s=>s.id===e.phaseId):null,o=Gz(e,t,i);return`
    <section class="blueprint-strategy-page">
      ${a?`
        <header>
          <span>${v(a.name)}</span>
        </header>
      `:""}
      <div class="blueprint-strategy-page-body">
        <div class="blueprint-strategy-pair-head">
          <span>页面模块</span>
          <span>模块策略</span>
        </div>
        <div class="blueprint-strategy-page-grid">
          ${o.map(s=>`
            <section class="blueprint-strategy-row">
              <div class="blueprint-page-skeleton-wrap">
                ${Oz({...s})}
              </div>
              <div class="blueprint-strategy-content-list">
                ${Uz({context:e,group:n,...s})}
              </div>
            </section>
          `).join("")}
        </div>
      </div>
    </section>
  `}function Gz(e,n,t){return e.modules.flatMap(i=>{const a=n.find(d=>d.id===i.slot)||{id:i.slot,label:i.slot},o=`${i.slot}|${i.component}`,s={slot:a,module:i,isActivityReference:i.inputScope==="activity"&&t.get(o)!==e.id};return[...(i.prependComponents||[]).map(d=>({slot:a,module:{id:`${i.id}__${d.id}`,slot:i.slot,name:d.name||ms(d.component),component:d.component,rows:oe(d.rows||[]),isGeneratedCompanion:!0,blueprintRole:"承接优惠券权益展示，先给用户明确可领取的活动利益。",blueprintRule:"进入页面后直接展示优惠券信息，不改动组件默认文案。",blueprintBenefit:"红包优惠券"},isActivityReference:!1})),s]}).map((i,a)=>({...i,slotIndex:a}))}function Oz({slot:e,module:n}){return`
    <article class="blueprint-page-skeleton-block">
      ${Vz(e,n)}
    </article>
  `}function ms(e){if(!e)return"模块";const n=e.replace("molecule:","");if(bn(n)==="hero")return"头图模块";if(n.includes("九宫格"))return"抽奖模块";if(n==="RedPacketCoupon")return"发券模块";if(n==="QualityVideoDiagnosis")return"优质视频诊断";if(n==="ContentModuleImage"||n==="DoublePromotion")return"优质案例";const t=ee(n)||G.find(i=>i.name===n||i.id===n);return Hn(t?.id||n,t?.name||n)}function Vz(e,n){const t=bn(n?.component||e.id),i=t==="reward"?"reward":t==="play"||t==="task"?"play":"content",a=ms(n?.component)||n?.name||"模块";return`
    <div class="blueprint-module-skeleton is-${i}" aria-hidden="true">
      <strong>${v(a)}</strong>
    </div>
  `}function Uz({context:e,group:n,module:t,slot:i,slotIndex:a,isActivityReference:o}){t.isGeneratedCompanion||(po(t),hn(t));const s=kS(t,i),l=d=>t.isGeneratedCompanion?"readonly":`data-blueprint-module-field="${f(`${e.id}|${t.id}|${d}`)}"`;return`
    <article
      class="blueprint-strategy-content-item"
    >
      <div class="blueprint-strategy-module-body">
        <label>
          <span>策略职责</span>
          <textarea
            rows="2"
            ${l("blueprintRole")}
          >${v(s.role)}</textarea>
        </label>
        <label>
          <span>核心规则</span>
          <textarea
            rows="2"
            ${l("blueprintRule")}
          >${v(s.rule)}</textarea>
        </label>
        <label>
          <span>利益点</span>
          <textarea
            rows="2"
            ${l("blueprintBenefit")}
          >${v(s.benefit)}</textarea>
        </label>
      </div>
    </article>
  `}function Ko(e,n){for(const t of e)for(const i of t.modules||[]){const a=(i.rows||[]).find(o=>n.some(s=>o.field.includes(s)));if(a?.value)return a.value}return""}function qo(e,n){if(r.selectedDemoPackageId===Oe){const i=Ze(),a={activityTime:Ko(e,["活动时间","时间","任务周期"])||"与 PRD 信息表一致",activityEntrance:Ko(e,["入口","活动入口","页面入口"])||"按 PRD 信息表配置",signupRule:"按 PRD 信息表配置",deliveryRule:"按 PRD 信息表配置",activityGoal:i.activityGoal};return i[n]||a[n]||""}const t={activityTime:Ko(e,["活动时间","任务周期","玩法时间"])||"与 PRD 活动时间一致",activityEntrance:"移动端抖音 / DOU+ 下单页 / 活动组件",signupRule:"需要报名",deliveryRule:"进入落地页下发",activityGoal:"原生-花钱-消耗"};return li[n]||t[n]||""}function Kz(){return r.selectedDemoPackageId===Oe?Ze().activityName:li.activityName}function qz(e,n,t,i,a={}){const o=e.contexts.some(c=>c.phaseId),s=e.contexts.map(c=>r.pages.find(u=>u.sourceContextId===c.id)?.id).filter(Boolean),l=s.some(c=>a.visiblePageIds?.has(c)),d=a.showPageToggle&&s.length?`
      <button
        type="button"
        class="blueprint-audience-page-toggle ${l?"active":""}"
        data-guided-context-pages="${f(s.join(","))}"
        aria-pressed="${l}"
      >
        <i>${l?"✓":""}</i>
        <span>${l?"画布中":"未展示"}</span>
      </button>
    `:"",p=a.columnWidth||jz();return`
    <section
      class="blueprint-audience-group ${o?"has-phases":"single-context"}"
      style="--blueprint-audience-width:${p}px"
    >
      <header class="blueprint-audience-head">
        <span>${String(t+1).padStart(2,"0")}</span>
        <div>
          <em>目标人群</em>
          <input
            value="${f(e.audience.name)}"
            data-blueprint-audience-field="${f(`${e.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${f(`${e.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${v(e.audience.ruleSummary||e.audience.description||(o?`${e.contexts.length} 个阶段`:"页面结构"))}</textarea>
        </div>
        ${d}
      </header>
      <div class="blueprint-audience-contexts">
        ${e.contexts.map(c=>Wz(c,n,o,i)).join("")}
      </div>
    </section>
  `}function Wz(e,n,t,i){const a=e.phaseId?be.phases.find(o=>o.id===e.phaseId):null;return`
    <section class="blueprint-context-column ${t?"is-phase":""}">
      ${a?`
        <header class="blueprint-phase-head">
          <div>
            <strong>${v(a.name)}</strong>
          </div>
        </header>
      `:""}
      <div class="blueprint-compact-modules">
        ${n.map((o,s)=>{const l=e.modules.find(p=>p.slot===o.id);if(!l)return"";const d=`${l.slot}|${l.component}`;return Xz({context:e,module:l,slot:o,slotIndex:s,hasPhases:t,isActivityReference:l.inputScope==="activity"&&i.get(d)!==e.id})}).join("")}
      </div>
    </section>
  `}function Xz({context:e,module:n,slot:t,slotIndex:i,hasPhases:a,isActivityReference:o}){po(n),hn(n);const s=n.inputScope==="activity",l=Zz(e),d=kS(n,t);return`
    <article
      class="blueprint-compact-module ${a?"is-phase-module":""} ${s?"is-activity-input":""}"
    >
      <header>
        <span>${String(i+1).padStart(2,"0")}</span>
        <div>
          <em>${v(t.label)}</em>
          <input
            value="${f(n.name)}"
            data-blueprint-module-field="${f(`${e.id}|${n.id}|name`)}"
            aria-label="${f(`${l} ${t.label} 模块名称`)}"
          />
        </div>
        ${s?"<b>活动公共</b>":""}
        <div class="blueprint-module-controls">
          <button
            type="button"
            data-blueprint-module-move="${f(`${e.id}|${n.id}|up`)}"
            aria-label="${f(`上移 ${n.name}`)}"
          >↑</button>
          <button
            type="button"
            data-blueprint-module-move="${f(`${e.id}|${n.id}|down`)}"
            aria-label="${f(`下移 ${n.name}`)}"
          >↓</button>
        </div>
      </header>
      ${o?`
        <div class="blueprint-activity-reference">
          <strong>引用活动公共内容</strong>
          <span>与首个人群保持一致，无需重复录入</span>
        </div>
      `:`
        <div class="blueprint-module-brief-body is-simple">
          <label>
            <span>核心规则</span>
            <textarea
              rows="2"
              data-blueprint-module-field="${f(`${e.id}|${n.id}|blueprintRule`)}"
            >${v(d.rule)}</textarea>
          </label>
          <label>
            <span>利益点</span>
            <textarea
              rows="2"
              data-blueprint-module-field="${f(`${e.id}|${n.id}|blueprintBenefit`)}"
            >${v(d.benefit)}</textarea>
          </label>
        </div>
      `}
    </article>
  `}function Wo(e,n){return(e.rows||[]).find(i=>n.some(a=>i.field.includes(a)))?.value||""}function kS(e,n){const t=hn(e),i=e.states?.length||0,a=(e.component||"").replace("molecule:",""),o=Wo(e,["标题","主标题","模块标题","内容标题","任务标题"]),s=Wo(e,["核心利益点","利益点","奖励","金额梯度","提示文案","领取条件"]),l=/消耗返|Coupon|券|Reward|Promo/i.test(a+e.name),d=a==="QualityVideoDiagnosis",p=e.slot==="content";return{...{role:e.blueprintRole||(p?"承接活动说明、案例内容和权益解释。":l?"承接消耗返玩法，推动用户完成活动目标。":d?"识别用户内容机会，引导生成诊断报告并进入下一步行动。":`${n.label}模块，承接页面中的关键业务节点。`),rule:e.blueprintRule||(l?"用户在活动周期内满足现金消耗门槛后自动领取 DOU+ 优惠券。":d?"进入页面后展示诊断提示，点击后可切换为报告生成状态。":Wo(e,["任务","规则","活动时间"])||"规则与活动主流程保持一致。"),benefit:e.blueprintBenefit||s||o||(p?"强化活动可信度和转化理由。":"突出该人群的核心参与理由。")},tags:[_a[bn(e.component)]||n.label,`${t.length} 个分发组`,i?`${i} 个状态`:"默认状态",l?"奖励规则":"主干模块"]}}function st(e){const n=String(e||""),t=n.split(`
`).length,i=Math.ceil(n.length/28);return $e(Math.max(t,i,1),1,4)}function hn(e){return(!Array.isArray(e.variantGroups)||!e.variantGroups.length)&&(e.variantGroups=[{id:"base",name:ai,rows:oe(e.rows||[])}]),e.variantGroups.forEach(n=>{Array.isArray(n.rows)||(n.rows=oe(e.rows||[])),(e.rows||[]).forEach((t,i)=>{n.rows[i]||(n.rows[i]=oe(t))})}),e.rows=oe(e.variantGroups[0].rows),e.variantGroups}function ln(){return r.selectedDemoPackageId===Oe?Ze().audiences:r.selectedDemoPackageId===be.id?be.scenes:qn.audiences}function Bn(e,n){const t=ln().find(a=>a.id===e),i=t?.modules.find(a=>a.id===n);return{context:t,module:i}}function Yz(){return r.selectedDemoPackageId===Oe?Ze().audiences:r.selectedDemoPackageId===be.id?be.audiences:qn.audiences}function Jz(e,n,t){const{context:i,module:a}=Bn(e,n);if(!i||!a)return!1;const o=i.modules.findIndex(p=>p.id===n),s=t==="up"?o-1:o+1;if(o<0||s<0||s>=i.modules.length)return!1;const l=i.modules[s],d=a.slot;return a.slot=l.slot,l.slot=d,i.modules.splice(o,1),i.modules.splice(s,0,a),!0}function br(e,n={}){const t=hn(e);if(n.id){const o=t.find(s=>s.id===n.id);if(o)return o}const i=t[0],a={id:n.id||`group_${Date.now()}_${t.length}`,name:String(n.name||"").trim()||`文案分组 ${t.length+1}`,rows:oe(i.rows)};return t.push(a),a}function PS(e,n){const t=hn(e);if(t.length<=1)return!1;const i=t.filter(a=>a.id!==n);return i.length===t.length?!1:(e.variantGroups=i,e.rows=oe(i[0].rows),!0)}function zS(e){if(!e.component?.startsWith("molecule:"))return null;const n=e.component.slice(9),t=RS(n);if(!t)return null;const i=Ue(t).map(([l,d])=>{const p=e.rows.find(c=>c.moleculePropKey===l||c.propKey===l);return{field:d.label||l,value:p?.value??String(d.default??""),moleculePropKey:l,propKey:l}}),a=di(t);i.forEach(l=>{a[l.moleculePropKey]=l.value});const o=pi(t,a);if(!o.length)return i.length?i:null;const s=o.flatMap(([l,d={}],p)=>{const c=ee(l),u=c?.name||l;return(c?Ue(c):Object.keys(d).map(w=>[w,{key:w,label:w,type:"string",default:""}])).filter(([w,y])=>{const h=d[w]??y.default;return y.type==="boolean"||rt(y)||Lt(w,y,h)}).map(([w,y])=>{const h=e.rows.find(x=>x.childIndex===p&&x.propKey===w);return{field:`${u} · ${y.label||w}`,value:h?.value??String(d[w]??y.default??""),childIndex:p,propKey:w}})});return[...i,...s]}function Lt(e,n,t){if(n.isCssVar||t==null||typeof t!="string"||n.type&&!["string","text"].includes(n.type))return!1;const i=`${e} ${n.label||""}`.toLowerCase();return!["src","url","image","img","icon","图片","图标","color","colour","gradient","font","radius","spacing","letter","width","height","size","gap","margin","padding","bg","background","border","shadow","opacity","颜色","色调","渐变","字体","字号","字间距","圆角","间距","宽","高","背景","边框","阴影"].some(o=>i.includes(o))}function po(e){const n=zS(e);n?.length&&(e.rows=n)}function Zz(e){if(!e.phaseId)return e.name;const n=be.audiences.find(i=>i.id===e.audienceId),t=be.phases.find(i=>i.id===e.phaseId);return`${n?.name||""} · ${t?.name||""}`}function fs(){const e=oi("pink")||he[0],n=r.selectedDemoPackageId===be.id,t=r.selectedDemoPackageId===Oe,i=t?Ze():null,a=i?.pageType||"",o=t&&a?Rt(a):null,l=(t?i.audiences:n?be.scenes:qn.audiences).map((c,u)=>{const g=o?[]:c.modules.flatMap(x=>{const $=HS(x),k=Array.isArray($)?$:[$];return k.forEach(F=>{F.sourceContextId=c.id,F.sourceModuleId=x.id,F.sourceSlot=x.slot,F.sourceInputScope=x.inputScope||"context"}),k}),w=o?wn(o):g;o&&(w.forEach((x,$)=>{x.sourcePageTemplateId=o.id,x.sourcePageTemplateNodeIndex=$}),qr(w,o.id),Wr(w,o.id),Gv(w,o.id)),o&&jS(w,c.modules,i?.consumptionProgressConfig,i?.taskListConfig,r.prdTableRows,o.id);const y=t?c:n?be.audiences.find(x=>x.id===c.audienceId):c,h=n?be.phases.find(x=>x.id===c.phaseId):null;return{id:`page_${Date.now()}_${u}`,name:o?.name||h?.name||"活动页面",dimension:y.name,tags:o?["自定义模板",o.name]:c.modules.map(x=>x.name),sourceContextId:c.id,sourcePageTemplateId:o?.id||"",canvasBackground:e.background,colorThemeId:e.id,navBarEnabled:o?!!o.navBarEnabled:!1,nodes:w}}),d=yF(l);r.activity={name:t?i.activityName:li.activityName,note:t?o?`PRD 文本 → ${a} 页面模板`:"PRD 文本 → 页面模块":"PRD mock → 活动包 → 人群页面"};const p=eF(l[0]);r.pages=[...l,...p],r.activePageId=l[0]?.id||p[0].id,r.guidedHeaderLevelId==="s"&&yr("s"),r.guidedVisiblePageIds=[...new Set([...l[0]?[l[0].id]:[],...d&&d.id!==l[0]?.id?[d.id]:[],...p.map(c=>c.id)])],r.guidedVisibleCompanionNodeIds=l.flatMap(c=>(c.nodes||[]).filter(u=>u.canvasPlacement==="page-side").map(u=>u.id)),r.guidedCanvasInitialized=!1,r.selectedDimension=l[0]?.dimension||"个人用户",r.selectedId=null,r.demoSelectedNodeId=null,r.canvasZoom=1,r.canvasPanX=40,r.canvasPanY=40,r.currentTemplateId=null}function _e(e){return(e?.nodes||[]).find(n=>bn(n?.schemaId)==="hero")||null}function Qz(e){const n=_e(e);if(!n)return ce("头图");const t=ue(n),i=a=>{a&&(a.id=jn(),(a.children||[]).forEach(i),(a.guidedStates||[]).forEach(o=>{o.node&&i(o.node)}))};return i(t),t}function eF(e=he[0]){const n=Date.now(),t=e?.nodes?e:null,i=t?Qe(t):oi(e)||he[0],a=t?fi(t,i):i.background,o=t?.colorThemeId||i.id,s=d=>[Qz(t),d].filter(Boolean),l=[{id:`page_fallback_hot_${n}`,name:"活动火爆",dimension:"兜底页面",tags:["系统页面","活动火爆"],canvasBackground:a,colorThemeId:o,navBarEnabled:!1,sourceContextId:t?.sourceContextId||"",sourcePageTemplateId:t?.sourcePageTemplateId||"",isSystemFallback:!0,fallbackBottomSpace:W2,fallbackPageHeight:X2,nodes:s(ce("无活动提示"))},{id:`page_fallback_case_${n}`,name:"内容案例",dimension:"兜底页面",tags:["系统页面","内容案例"],canvasBackground:a,colorThemeId:o,navBarEnabled:!1,sourceContextId:t?.sourceContextId||"",sourcePageTemplateId:t?.sourcePageTemplateId||"",isSystemFallback:!0,fallbackBottomSpace:Y2,fallbackPageHeight:J2,nodes:s(yn("用户教育案例-样式1"))}];return l.forEach(d=>mn(d.nodes,i.id)),l}function zt(e,n,t=0,i=1,a=new WeakSet){!e||a.has(e)||(a.add(e),(e.schemaId==="头图"||e.name==="头图")&&(e.props={...e.props||{}},e.props.mainVisualImage=n,e.props.mainVisualOffsetY=t,e.props.mainVisualScale=i),(e.children||[]).forEach(o=>zt(o,n,t,i,a)),(e.guidedStates||[]).forEach(o=>zt(o.node,n,t,i,a)),(e.guidedLineageVariants||[]).forEach(o=>zt(o.node,n,t,i,a)))}function nF(e,n=0,t=1){const i=Q();if(!i||i.isSystemFallback)return;const a=_e(i);!a||a.id!==r.selectedId||r.pages.forEach(o=>{if(!o?.isSystemFallback)return;const s=_e(o);s&&zt(s,e,n,t)})}function Bi(e){return e?.schemaId==="S级-中秋头图"?"s":"default"}function Gt(){return r.guidedHeaderLevelDrafts=r.guidedHeaderLevelDrafts||{},r.guidedHeaderLevelDrafts.s={mainTitle:"任务通关赢X元流量",highlightText:"X元流量",subtitle:"为爱加投",dateText:"",...r.guidedHeaderLevelDrafts.s||{}},r.guidedHeaderLevelDrafts.s}function xs(e,n){return["mainTitle","highlightText","subtitle","dateText"].includes(e)?(Gt()[e]=String(n||""),r.pages.forEach(t=>{const i=_e(t);i?.schemaId==="S级-中秋头图"&&(i.props={...i.props||{},[e]:String(n||"")})}),!0):!1}function tF(){const e=Ze(),n=e?.pageType?Rt(e.pageType):null;if(!n)return!1;const t=Gi(n).find(a=>a.isHeaderModule);if(!t)return!1;let i=!1;return[...r.prdTableRows].forEach(a=>{const o=Ne(a.key)||Ce(a.key);if(!o||Number(o.moduleIndex)!==Number(t.moduleIndex)||o.compoundKey!=="text")return;const s=o.versionName?[zn,String(o.moduleIndex+1),o.versionName,"mainTitle"].join("｜"):[Dn,String(o.moduleIndex+1),"mainTitle"].join("｜");Un(s,a.value??""),o.versionName||(Gt().mainTitle=String(a.value||"")),i=!0}),i}function Id(e,n){const t=Ne(e)||Ce(e);return!t||!["mainTitle","highlightText","subtitle","dateText"].includes(t.compoundKey)?!1:(t.versionName||(Gt()[t.compoundKey]=String(n||"")),r.pages.forEach(i=>{const a=_e(i);if(a?.schemaId!=="S级-中秋头图"||Number(a.sourcePageTemplateNodeIndex)!==Number(t.moduleIndex))return;const o=on(a.sourcePageTemplateId,t.moduleIndex),s=t.versionName?Dt(o).find(l=>N(l.name)===N(t.versionName))?.id:"base";if(s){if(s!=="base"&&!je(a,s)){const l=Zn(a),d=l[0];l.push({id:s,title:t.versionName,node:ue(d?.node||a)}),wt(a)}gS(a,s,t.compoundKey,String(n||""))}}),!0)}function iF(e,n){if(r.guidedHeaderLevelId!=="s")return!1;const t=e?.closest("[data-prd-template-module-row]");if(!t?.querySelector("[data-prd-header-level]"))return!1;const a={主标题:"mainTitle",高亮文案:"highlightText",副标题:"subtitle",日期文案:"dateText"}[e.getAttribute("aria-label")||""];if(!a)return!1;xs(a,n);const[o,s]=String(t.dataset.prdTemplateModuleRow||"").split("|"),l=Number(s),d=[...pe,...ne].find(u=>u.id===o),p=a==="mainTitle"?"text":a,c=d&&Number.isInteger(l)?Li(d,l).find(u=>Number(u.moduleIndex)===l&&de(u)===p):null;return c&&["text","dateText"].includes(p)&&Un(ut(c),n),!0}function hs(e,n){const t=lo(e);t&&r.pages.forEach(i=>{const a=_e(i);a?.schemaId==="S级-中秋头图"&&a.sourcePageTemplateId===t.templateId&&Number(a.sourcePageTemplateNodeIndex)===t.moduleIndex&&n(a)})}function aF(e,n){n?.id&&hs(e,t=>{if(je(t,n.id))return;const i=Zn(t);i.push({id:n.id,title:n.name,node:ue(i[0]?.node||t)}),wt(t)})}function oF(e,n,t){hs(e,i=>{const a=je(i,n);a&&(a.title=String(t||"").trim()||a.title)})}function rF(e,n){hs(e,t=>{je(t,n)&&US(t,n)})}function sF(e){if(e?.schemaId!=="S级-中秋头图")return;const n=Gt();["mainTitle","highlightText","subtitle","dateText"].forEach(t=>{e.props?.[t]!==void 0&&(n[t]=String(e.props[t]||""))})}function lF(){r.guidedHeaderDefaultPageSnapshots=r.pages.map(e=>{const n=_e(e);return{pageId:e.id,canvasBackground:e.canvasBackground,colorThemeId:e.colorThemeId,header:n?ue(n):null}})}function dF(){(r.guidedHeaderDefaultPageSnapshots||[]).forEach(n=>{const t=r.pages.find(s=>s.id===n.pageId),i=_e(t),a=n.header;if(i?.schemaId!=="S级-中秋头图"||!a)return;const o=(s,l)=>{!s||!l||(l.props={...l.props||{}},s.props?.mainTitle!==void 0&&(l.props.text=String(s.props.mainTitle||"")),s.props?.dateText!==void 0&&(l.props.dateText=String(s.props.dateText||"")),(l.guidedLineageVariants||[]).forEach(d=>{const p=(s.guidedLineageVariants||[]).find(c=>c.id===d.id);p?.node&&o(p.node,d.node)}))};o(i,a)})}function pF(){const e=r.guidedHeaderDefaultPageSnapshots||[];let n=0;return r.pages.forEach(t=>{const i=e.find(l=>l.pageId===t.id),a=_e(t);if(!i?.header||!a)return;const o=t.nodes.indexOf(a),s=ue(i.header);s.id=a.id,t.nodes.splice(o,1,s),t.canvasBackground=i.canvasBackground,t.colorThemeId=i.colorThemeId,n+=1}),n}function cF(e){const n=e?.props?.dateText||"6月10日-6月21日",t=e?.props?.text||e?.props?.mainTitle||"抽666元流量大奖",i=e?.schemaId==="S级-中秋头图"?e?.props?.mainTitle||e?.props?.text:e?.props?.text||e?.props?.mainTitle;return[{id:"default",name:"普通",description:"沿用当前页面模板头图，可继续替换主体图。",node:ce("头图",{text:t,dateText:n,...e?.props?.mainVisualImage?{mainVisualImage:e.props.mainVisualImage}:{}})},{id:"s",name:"S级",description:`切换为中秋 S 级头图，页面背景同步为 ${Qt}。`,node:ce("S级-中秋头图",{mainTitle:i||"任务通关赢X元流量",highlightText:e?.props?.highlightText??"X元流量",subtitle:e?.props?.subtitle||"为爱加投",dateText:n})}]}function bs(e,n={},t={}){const i=e==="s"?"S级-中秋头图":"头图",a=n.props||{},o=n.schemaId==="S级-中秋头图"?a.mainTitle||a.text:a.text||a.mainTitle,s=a.dateText||"6月10日-6月21日",l=Gt(),d=i==="S级-中秋头图"?{mainTitle:o||l.mainTitle||"任务通关赢X元流量",highlightText:a.highlightText??l.highlightText??"X元流量",subtitle:a.subtitle||l.subtitle||"为爱加投",dateText:a.dateText||l.dateText||s}:{text:a.text||a.mainTitle||"抽666元流量大奖",dateText:s,...a.mainVisualImage?{mainVisualImage:a.mainVisualImage}:{}},p=ce(i,d);return p.id=n.id||jn(),["sourceContextId","sourceModuleId","sourceSlot","sourceInputScope","sourcePageTemplateId","sourcePageTemplateNodeIndex","moduleGroupId","canvasPlacement","isBlueprintInserted"].forEach(c=>{n[c]!==void 0&&(p[c]=n[c])}),t.preserveLineage!==!1&&Array.isArray(n.guidedLineageVariants)&&n.guidedLineageVariants.length&&(p.guidedLineageVariants=n.guidedLineageVariants.map(c=>({...c,node:bs(e,c.node,{preserveLineage:!1})})),p.activeLineageVariantId=n.activeLineageVariantId||"base",n.guidedLineageGraph&&(p.guidedLineageGraph=oe(n.guidedLineageGraph)),n.guidedLineageDimensions&&(p.guidedLineageDimensions=oe(n.guidedLineageDimensions))),p}function Xo(e,n,t,i=null){if(!e?.nodes?.length)return null;const a=e.nodes.findIndex(l=>bn(l?.schemaId)==="hero");if(a<0)return null;const o=e.nodes[a];if(n&&!e.isSystemFallback&&o.id!==n)return null;const s=bs(t,i||o);return s.id=o.id,["sourceContextId","sourceModuleId","sourceSlot","sourceInputScope","sourcePageTemplateId","sourcePageTemplateNodeIndex","moduleGroupId","canvasPlacement","isBlueprintInserted"].forEach(l=>{o[l]!==void 0?s[l]=o[l]:delete s[l]}),e.nodes.splice(a,1,s),s}function yr(e){const n=Q(),t=n&&!n.isSystemFallback?n:r.pages.find(d=>!d.isSystemFallback);if(!t)return!1;const i=_e(t);if(!i)return!1;const a=e==="s"?"s":"default",o=Bi(i);sF(i),a==="default"&&o==="s"&&dF(),a==="s"&&o!=="s"&&lF();const s=i.id;let l=null;return a==="default"&&pF()?(l=_e(t),r.guidedHeaderDefaultPageSnapshots=[]):l=Xo(t,s,a,i),l?(a==="s"?r.pages.forEach(d=>{d.canvasBackground=Qt,d.colorThemeId="s-mid-autumn",d!==t&&Xo(d,null,a,l),mn(d.nodes,"pink")}):o==="s"&&r.pages.forEach(d=>{Bi(_e(d))==="s"&&Xo(d,null,a,l)}),r.guidedHeaderLevelId=a,r.selectedId=l.id,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,r.guidedCanvasInitialized=!1,!0):!1}function yt(e){return["LotteryGridInteractive","LotteryGrid","抽奖九宫格-报名前","抽奖九宫格-报名后","抽奖样式2","抽奖公告九宫格"].includes(e?.schemaId)}function lt(e){return!!(e?.isLotteryResultPopup||["弹窗-中奖","弹窗-未中奖"].includes(e?.schemaId))}function wr(e=[],n=[]){return e.forEach(t=>{yt(t)&&n.push(t),wr(t?.children||[],n),(t?.guidedStates||[]).forEach(i=>{i.node&&wr([i.node],n)})}),n}function ys(e,n){const t=e?.props||{},i=String(t[`prize${n}Name`]||"").trim(),a=Pe(t[`prize${n}`]),o=[{name:"抖仔限量盲盒",sourceName:"DOU仔周边"},{name:"剪映VIP月卡",sourceName:"剪映VIP"},{name:"DOU+流量券",sourceName:"6元流量券"}],l=(e?.schemaId==="抽奖九宫格-报名前"?["DOU仔周边","6元流量券","内容诊断积分","DOU+官方推荐机会","1000元心动券包"]:["1000元心动券包","6元流量券","10元流量券","DOU仔周边","DOU仔周边","5元流量券","DOU+官方推荐机会","内容诊断积分"])[n-1],d=e?.schemaId==="抽奖样式2"?o[n-1]:null,p=Di(d?.sourceName||l)||Ge[n-1]||{};return{type:a?.type||p.type||"standard",name:aS(i||a?.name||d?.name||p.name||`奖品${n}`),image:a?.image||p.image||"",copy:a?.copy||t[`prize${n}Copy`]||p.copy||"满30元赠价值5元流量",copyAmount:a?.copyAmount||p.copyAmount||"",copyThreshold:a?.copyThreshold||p.copyThreshold||""}}function FS(e){const t=ee(e?.schemaId)?.blueprint?.prizeProps?.length,i=Object.entries(e?.props||{}).filter(([,o])=>String(o||"").trim()).map(([o])=>o.match(/^prize(\d+)(?:Name|Text|Copy|Amount|Threshold|ButtonText)?$/)?.[1]).filter(Boolean).map(Number),a=Number(e?.props?.prizeCount)||0;return Math.max(1,a||t||0,...i)}function gi(e){const n=String(e||"").trim(),t=n.match(/^(\d+(?:\.\d+)?)(.*)$/);return t?{amountText:t[1],prizeText:t[2]||n}:{amountText:"",prizeText:n}}function NS(e){const n=FS(e),t=$e(Number(e?.props?.selectedPrizeIndex||1),1,n),i={};for(let l=1;l<=n;l+=1){const d=ys(e,l);i[`prize${l}`]=Kn(d),i[`prize${l}Text`]=d.name,i[`prize${l}Copy`]=d.copy,i[`prize${l}ButtonText`]=e?.props?.[`prize${l}ButtonText`]??e?.props?.popupButtonText??"开心收下"}const a=i[`prize${t}Text`]||"元心动券包",o=gi(a),s=i[`prize${t}Copy`]||"满30元赠价值5元流量";return{titleText:"恭喜抽中",buttonText:i[`prize${t}ButtonText`]??"开心收下",amountText:e?.props?.resultAmountText||o.amountText,selectedPrizeIndex:t,prizeCount:n,prizeText:o.prizeText,prizeSubText:s,...i}}function ws(e={}){return{...ht("弹窗-未中奖"),...e.lotteryLoseProps||{}}}function vr(e,n,t={}){const i=ee(n),a=Je(i);e.schemaId=i?.id||n,e.name=i?.name||n,e.type="atom",e.activeVariantId=a[0]?.id||null,e.variants=a,e.props=ht(n,t),e.children=[]}function nt(e,n="win"){if(!e)return;if(n==="lose"){e.schemaId==="弹窗-中奖"&&(e.lotteryWinProps={...e.props||{}}),vr(e,"弹窗-未中奖",ws(e)),e.activeLotteryPopupResult="lose",e.activeGuidedStateId="lose";return}const t=e.lotteryWinProps||e.props||{};vr(e,"弹窗-中奖",t),e.activeLotteryPopupResult="win",e.activeGuidedStateId="win"}function Ft(e){if(!lt(e))return;e.isLotteryResultPopup=!0;const n=ce("弹窗-中奖",e.lotteryWinProps||e.props||{}),t=ce("弹窗-未中奖",ws(e));e.guidedStates=[{id:"win",name:"中奖",component:"弹窗-中奖",preserveProps:!0,node:n},{id:"lose",name:"未中奖",component:"弹窗-未中奖",preserveProps:!0,node:t}],e.activeGuidedStateId=e.activeLotteryPopupResult==="lose"?"lose":"win"}function uF(e,n){if(!e||!n)return;const t=NS(n),i=e.lotteryWinProps?.selectedPrizeIndex||e.props?.selectedPrizeIndex||e.guidedStates?.find(o=>o.id==="win")?.node?.props?.selectedPrizeIndex;if(i){t.selectedPrizeIndex=$e(Number(i)||1,1,t.prizeCount);const o=gi(t[`prize${t.selectedPrizeIndex}Text`]||t.prizeText);t.amountText=o.amountText,t.prizeText=o.prizeText,t.prizeSubText=t[`prize${t.selectedPrizeIndex}Copy`]||"满30元赠价值5元流量",t.buttonText=t[`prize${t.selectedPrizeIndex}ButtonText`]??"开心收下"}const a=e.schemaId==="弹窗-中奖"?e.props:e.lotteryWinProps;e.lotteryWinProps={...a||{},...t},e.activeLotteryPopupResult==="lose"||e.schemaId==="弹窗-未中奖"?nt(e,"lose"):nt(e,"win"),Ft(e)}function gF(e){const n=(a,o)=>{for(const s of a||[]){const l=xe([s],o);if(l?.node)return{...l,root:s}}return null},t=e?.sourceLotteryNodeId;if(t){const a=n(r.nodes,t)||n(Q()?.nodes||[],t)||(r.pages||[]).map(o=>n(o.nodes||[],t)).find(Boolean);if(a?.node)return a}const i=Xn(Q()?.nodes||r.nodes||[])||(r.pages||[]).map(a=>Xn(a.nodes||[])).find(Boolean);return i?n(r.nodes,i.id)||(r.pages||[]).map(a=>n(a.nodes||[],i.id)).find(Boolean)||{node:i,parent:null,root:i}:null}function Yo(e,n){const t={...(e?.schemaId==="弹窗-中奖"?e.props:e?.lotteryWinProps)||{}},i=Math.max(1,Number(t.prizeCount)||1),a=$e(Number(n)||1,1,i),o=gi(t[`prize${a}Text`]||""),s=Pe(t[`prize${a}`]);t.selectedPrizeIndex=a,t.amountText=o.amountText,t.prizeText=o.prizeText,t.prizeSubText=t[`prize${a}Copy`]||s?.copy||"满30元赠价值5元流量",t.buttonText=t[`prize${a}ButtonText`]??"开心收下",e.lotteryWinProps=t,nt(e,"win"),Ft(e)}function Nt(e){if(!lt(e))return;e.isLotteryResultPopup=!0;const n=e.schemaId==="弹窗-中奖"?e.props||{}:e.lotteryWinProps||{},t=$e(Number(n.selectedPrizeIndex||e.lotteryWinProps?.selectedPrizeIndex||1),1,Math.max(1,Number(n.prizeCount||e.lotteryWinProps?.prizeCount||1))),i=String(n.amountText??"").trim(),a=String(n.prizeText??"").trim(),o=i==="1314"&&a.replace(/\s+/g,"").includes("心动券包")?"1000":i,s=String(n.prizeSubText??"").trim(),l=`${o}${a}`.trim(),d=`prize${t}Copy`,p=`prize${t}`,c=`prize${t}Text`;e.pendingLotteryPrizeOriginalName||(e.pendingLotteryPrizeOriginalValue=e.lotteryWinProps?.[p]||n[p]||"",e.pendingLotteryPrizeOriginalName=String(e.lotteryWinProps?.[c]||n[c]||Pe(n[p])?.name||l).trim());const u={...e.lotteryWinProps||{},...e.schemaId==="弹窗-中奖"?e.props||{}:{},[c]:l,[d]:s,amountText:o,prizeText:a,prizeSubText:s};u[p]&&(u[p]=On(Gn(u[p],l),s)),e.lotteryWinProps=u,e.schemaId==="弹窗-中奖"&&(e.props={...e.props||{},[c]:l,[d]:s,amountText:o,prizeText:a,prizeSubText:s},e.props[p]&&(e.props[p]=u[p])),Ft(e)}function Ti(e){const n=gF(e),t=n?.node;if(!e?.props||!t?.props)return;Nt(e);const i=e.lotteryWinProps||e.props||{},a=$e(Number(i.selectedPrizeIndex)||1,1,Math.max(1,Number(i.prizeCount)||1));r.guidedLotteryPrizeOverrides={originalName:e.pendingLotteryPrizeOriginalName||i[`prize${a}Text`]||"",originalValue:e.pendingLotteryPrizeOriginalValue||i[`prize${a}`]||"",name:i[`prize${a}Text`]||"",value:i[`prize${a}`]||"",copy:i[`prize${a}Copy`]||"",fallbackIndex:a};const o=n.parent?.activeLineageVariantId||t.activeLineageVariantId||"base";Le(n,o,`prize${a}`,r.guidedLotteryPrizeOverrides.value),Le(n,o,`prize${a}Name`,r.guidedLotteryPrizeOverrides.name),Le(n,o,`prize${a}Copy`,r.guidedLotteryPrizeOverrides.copy),Le(n,o,`prize${a}ButtonText`,i.buttonText??"");const s=[n.root,n.parent,t].find(l=>l?.sourcePageTemplateId&&l.sourcePageTemplateNodeIndex!==void 0);if(s){const l=`prize${a}`,d=s===t?-1:(s.children||[]).findIndex(c=>c===t||yt(c)),p=d>=0?`${d}.${l}`:l;hr(s,o,p,r.guidedLotteryPrizeOverrides.value)}(r.pages||[]).forEach(l=>{(l.nodes||[]).forEach(co)})}function Jo(e,n){if(!lt(e))return!1;const t=String(n||"").match(/^prize(\d+)$/),i=Pe(e.props?.[n]);if(!t||!i)return!1;const a=Number(t[1]),o=`prize${a}Text`,s=`prize${a}Copy`,l={...e.lotteryWinProps||{},...e.props||{},[n]:e.props[n],[o]:i.name,[s]:i.copy};if(Number(l.selectedPrizeIndex||1)===a){const d=gi(i.name);l.amountText=d.amountText,l.prizeText=d.prizeText,l.prizeSubText=i.copy}return e.lotteryWinProps=l,e.props={...e.props||{},...l},Nt(e),Ti(e),!0}function mF(e,n,t=1){const i=$t(n?.originalName),a=Pe(n?.originalValue)?.image||"",o=Math.max(1,FS(e));for(let s=1;s<=o;s+=1){const l=ys(e,s);if(a&&l.image===a||i&&$t(l.name)===i)return s}return $e(Number(t)||1,1,o)}function co(e){const n=r.guidedLotteryPrizeOverrides;if(!e||!n)return;const t=new Set,i=a=>{if(!(!a||t.has(a))){if(t.add(a),yt(a)){const o=mF(a,n,n.fallbackIndex),s=`prize${o}`,l=a.props?.[s]||Kn(ys(a,o))||n.value;a.props||(a.props={}),a.props[s]=On(Gn(l,n.name),n.copy),a.props[`prize${o}Name`]=n.name,a.props[`prize${o}Copy`]=n.copy}(a.children||[]).forEach(i),(a.guidedStates||[]).forEach(o=>i(o.node)),(a.guidedLineageVariants||[]).forEach(o=>i(o.node))}};i(e)}function fF(e){const n=NS(e),t=ce("弹窗-中奖",n);return t.name="弹窗-中奖",t.canvasPlacement="page-side",t.sourceLotteryNodeId=e?.id||null,t.isLotteryResultPopup=!0,t.activeLotteryPopupResult="win",t.lotteryWinProps={...t.props||{}},Ft(t),t}function vs(e){const n=Xn(e?.nodes||[]);n&&(e?.nodes||[]).filter(lt).forEach(t=>uF(t,n))}function kd(e,n=null){const t=new Map;return re(r.prdTableRows).forEach(i=>{const a=n===null?Ce(i.key):Ne(i.key);!a||Number(a.moduleIndex)!==Number(e)||n!==null&&a.versionName!==n||t.set(a.compoundKey,i.value??"")}),t}function xF(e,n){const t=Math.max(1,Math.round(Number(n)||1));wr([e]).forEach(i=>{i.props=i.props||{},i.props.prizeCount=t,Te(i,"prizeCount"),Object.keys(i.props).forEach(a=>{const o=a.match(/^prize(\d+)(Name|Text|Copy|Amount|Threshold|ButtonText)?$/);o&&Number(o[1])>t&&delete i.props[a]})})}function hF(e,n){n.forEach((t,i)=>{const a=String(i||"").match(/^(\d+)\.prize(\d+)$/),o=String(i||"").match(/^prize(\d+)$/);if(!a&&!o)return;const s=a?Number(a[1]):null,l=Number(a?.[2]||o?.[1]),d=s===null?e:e.children?.[s];if(!d?.props||!yt(d))return;const p=s===null?"":`${s}.`,c=`prize${l}`,u=`${c}Name`,g=`${c}Text`,w=`${c}Copy`,y=Pe(t),h=n.has(`${p}${u}`)?n.get(`${p}${u}`):n.get(`${p}${g}`),x=n.get(`${p}${w}`),$=String(y?.name||h||"").trim(),k=String(y?.copy??x??"").trim();(y||h!==void 0)&&(d.props[u]=$,d.props[g]=$,Te(d,u),Te(d,g)),(y||x!==void 0)&&(d.props[w]=k,Te(d,w))})}function bF(e,n){if(!e||!n)return;pn(e,n),hF(e,n);const t=new Map;n.forEach((i,a)=>{const o=String(a||"").match(/^(\d+)\.prizeCount$/);o&&t.set(Number(o[1]),Math.max(1,Number(i)||1))}),t.forEach((i,a)=>{const o=e.type==="molecule"?e.children?.[a]:e;o&&xF(o,i)})}function ga(e,n,t=new Set){!e||t.has(e)||(t.add(e),bF(e,n),(e.guidedStates||[]).forEach(i=>{ga(i.node,n,t)}))}function ma(e){const n=kd(e);(r.pages||[]).forEach(t=>{const i=(t.nodes||[]).find(d=>Number(d.sourcePageTemplateNodeIndex)===Number(e)&&!!Xn([d]));if(!i)return;const a=i.activeLineageVariantId;ga(i,n);const o=on(i.sourcePageTemplateId||t.sourcePageTemplateId,e),s=new Map(Dt(o).map(d=>[d.id,d.name]));(i.guidedLineageVariants||[]).forEach(d=>{if(ga(d.node,n),d.id==="base")return;const p=s.get(d.id)||d.title;ga(d.node,kd(e,p))});const l=(i.guidedLineageVariants||[]).find(d=>d.id===a);l&&Fs(i,l),vs(t)})}function Wt(e){const n=Ce(e)||Ne(e);!n||!/^\d+\.prize(?:Count|\d+(?:Name|Text|Copy|Amount|Threshold|ButtonText)?)$/.test(n.compoundKey)||ma(n.moduleIndex)}function St(){const e=te();if(lt(e?.node)&&(Nt(e.node),Ti(e.node),r.view==="guided-preview")){At();return}if(vs(Q()),r.view==="guided-preview"){At();return}_s(),Zt(),nT(),Tn()}function yF(e=[]){let n=null;return e.forEach(t=>{t.nodes=(t.nodes||[]).filter(o=>!o.isLotteryResultPopup);const i=Xn(t.nodes);if(!i)return;const a=fF(i);mn([a],Qe(t).id),t.nodes.push(a),n||(n=t)}),n}function Xn(e=[]){for(const n of e){if(yt(n))return n;const t=Xn(n.children||[]);if(t)return t;for(const i of n.guidedStates||[]){const a=Xn(i.node?[i.node]:[]);if(a)return a}}return null}function ES(e=[]){for(const n of e){if(n.type==="molecule"&&Xn(n.children||[])||yt(n))return n;const t=ES(n.children||[]);if(t)return t}return null}function Pd(e,n){const t=yt(e)?e:Xn(e.children||[]);if(!t)return;let i=Number(t.props?.prizeCount)||0;n.forEach(a=>{const o=rr(a.field),s=/^prize\d+(Name|Copy)?$/.test(a.propKey||"")?a.propKey:o?`prize${o}`:"";if(s){t.props[s]=a.value,Te(t,s);const l=Number(String(s).match(/^prize(\d+)/)?.[1]||0);l&&(i=Math.max(i,l))}}),i&&(t.props.prizeCount=i,Te(t,"prizeCount"))}function Ss(e=[]){for(const n of e){if(n.schemaId==="消耗返进度条")return n;const t=Ss(n.children||[]);if(t)return t}return null}function wF(e=[]){for(const n of e)if(n.schemaId==="消耗返进度条"||Ss(n.children||[]))return n;return null}function zd(e,n={}){const t=e?.schemaId==="消耗返进度条"?e:Ss(e?.children||[]);t?.props&&Object.entries(n).forEach(([i,a])=>{t.props[i]=a})}function vF(e,n){if(!n?.entries?.length||!n.dimensions?.length)return;const t=wF(e);if(!t)return;const i=n.entries.map((o,s)=>{const l=ue(t);return zd(l,o.props),{id:s===0?"base":o.id,title:o.title,dimensionId:o.dimensionId,node:l}}),a=i[0];zd(t,n.entries[0].props),t.guidedLineageVariants=i,t.activeLineageVariantId=a.id,t.guidedLineageDefaultVersion="v3",t.guidedLineageGraph={dimensions:n.dimensions.map(o=>({id:`progress-dimension-${o.id}`,title:o.title,x:28,y:28})),nodes:i.map(o=>({id:o.id==="base"?"node_base":`node_${o.id}`,variantId:o.id,kind:"component",dimensionId:`progress-dimension-${o.dimensionId}`,x:260,y:28})),edges:[]}}function Nn(e=[],n=[]){const t=new Set(n);for(const i of e){if(t.has(i.schemaId)||t.has(i.name))return i;const a=Nn(i.children||[],n);if(a)return a}return null}function uo(e,n){const t=N(n),i=re(e).find(a=>N(a.key)===t);return String(i?.value||"").trim()}const _S={账户优惠券提示:{当前账户优惠券总金额:"amountText",金额:"amountText",按钮文案:"actionText",小按钮文案:"actionText",立即使用:"actionText"},抽奖公告九宫格:{抽奖模块标题:"title",剩余抽奖次数文案:"subtitle",用户中奖公告文案:"announcementText",奖品1名称:"prize1Name",奖品2名称:"prize2Name",奖品3名称:"prize3Name",奖品4名称:"prize4Name",奖品5名称:"prize5Name",奖品6名称:"prize6Name",奖品7名称:"prize7Name",奖品8名称:"prize8Name",抽奖按钮文案:"buttonText"},消耗返数据报名规则:{消耗返模块标题:"titleText",抽奖入口文案:"lotteryText",行动按钮文案:"buttonText",第1档奖励金额:"reward1AmountText",第2档奖励金额:"reward2AmountText",第3档奖励金额:"reward3AmountText",第1个进度节点文案:"milestone1Text",第2个进度节点文案:"milestone2Text",第3个进度节点文案:"milestone3Text",第4个进度节点文案:"milestone4Text",左侧数据名称:"leftLabel",左侧数据数值:"leftValue",左侧数据单位:"leftUnit",右侧数据名称:"rightLabel",右侧数据数值:"rightValue",规则标题:"rulesTitle",参与规则1:"ruleOne",参与规则2:"ruleTwo",参与规则3:"ruleThree",规则备注:"note"},BigDay优惠券报名:{报名模块标题:"titleText",优惠券金额:"couponAmount",优惠券单位:"couponUnit",优惠券有效期文案:"couponExpiry",优惠券品牌前缀:"couponPrefix",优惠券名称:"couponTitle",报名按钮文案:"actionText",活动日期文案:"dateText",报名门槛文案:"thresholdText",报名说明文案:"descriptionText"},投放案例:{行业分类:"categoryText",案例标题:"headlineText",视频日更数量:"videoFrequencyText",视频内容建议:"videoDescriptionText",投放建议:"placementDescriptionText",建议单笔投放金额:"placementAmountText",执行要点:"executionDescriptionText",日更最小数量:"updateMinText",日更最大数量:"updateMaxText",追投预算比例:"budgetPercentText"},置底按钮:{底部按钮文案:"buttonText"}},SF=[{moduleName:"账户优惠券提示",schemaIds:["账户优惠券提示"]},{moduleName:"抽奖公告九宫格",schemaIds:["LotteryGridInteractive","抽奖公告九宫格"]},{moduleName:"消耗返数据报名规则",schemaIds:["消耗返数据报名规则"]},{moduleName:"BigDay优惠券报名",schemaIds:["BigDay优惠券报名"]},{moduleName:"投放案例",schemaIds:["投放案例"]},{moduleName:"置底按钮",schemaIds:["StickyBottomButton","置底按钮"]}];function Oa(e,n){return(r.prdManualModuleVersions?.[e]||[]).some(t=>N(t.name)===N(n))}function BS(e,n,t,i="version"){return Oa(e,n)?`${i}_manual_${t+1}`:t===0?"base":`${i}_${t+1}`}function Fd(e,n){const t=String(e||"").split("｜");if(t.length<3)return null;const[i,a,o,...s]=t;return N(i)!==N(n)?null:t.length>=4?{moduleName:i,dimensionTitle:a,versionName:o,label:s.join("｜"),groupKey:`${a}｜${o}`}:{moduleName:i,dimensionTitle:"",versionName:a,label:[o,...s].join("｜"),groupKey:a}}function TF(e,n){const t=_S[n];if(!t)return[];const i=new Map,a=re(e),o=a.some(s=>!!Fd(s.key,n)?.dimensionTitle);return a.forEach(s=>{const l=Fd(s.key,n);if(!l||o&&!l.dimensionTitle&&!Oa(n,l.versionName))return;const d=t[l.label];if(!d)return;if(!i.has(l.groupKey)){const c=i.size;i.set(l.groupKey,{id:BS(n,l.groupKey,c),title:l.versionName,dimensionTitle:l.dimensionTitle,props:{}})}const p=String(s.value||"").trim();p&&(i.get(l.groupKey).props[d]=p)}),[...i.values()].filter(s=>Object.keys(s.props).length||Oa(n,s.title))}function $F(e,n){const t=_S[n];if(!t)return null;const i={};return Object.entries(t).forEach(([a,o])=>{const s=uo(e,a);s&&(i[o]=s)}),Object.keys(i).length?ki({props:i}):ki({props:{}})}function CF(e,n,t){return!((r.prdManualModuleVersions?.[t]||[]).length>0)||!e.length||ui(t)||e.some(a=>a.id==="base"||a.title==="默认版本"||!a.title)?e:[$F(n,t),...e]}function AS(e,n=[]){const t=[],i=new Map;return n.forEach(a=>{const o=a.dimensionTitle||"默认维度",s=N(o)||"default";if(i.has(s))return;const l=`${e}_dimension_${t.length+1}`;i.set(s,l),t.push({id:l,title:o,x:28,y:28+t.length*180})}),{dimensions:t,nodes:n.map((a,o)=>{const s=a.dimensionTitle||"默认维度",l=N(s)||"default";return{id:a.id==="base"?"node_base":`node_${a.id}`,variantId:a.id,kind:"component",dimensionId:i.get(l)||t[0]?.id,x:260,y:28+o*180}}),edges:[]}}function Nd(e,n=[]){SF.forEach(({moduleName:t,schemaIds:i})=>{const a=CF(TF(n,t),n,t);if(a.length<2)return;const o=Nn(e,i);if(!o)return;const s=a.map(l=>{const d=ue(o);return En(d,l.props),{id:l.id,title:l.title,dimensionTitle:l.dimensionTitle,node:d}});En(o,a[0].props),o.guidedLineageVariants=s,o.activeLineageVariantId=s[0].id,o.guidedLineageGraph=AS(t,s)}),kF(e,n)}function IF(e){const n=new Map;return re(e).forEach(t=>{const i=String(t.key||"").split("｜");if(i.length<3)return;const[a,o,...s]=i,l=s.join("｜");if(N(a)!==N("任务列表模块"))return;if(!n.has(o)){const p=n.size;n.set(o,{id:BS("任务列表模块",o,p,"task_version"),title:o,values:{}})}const d=String(t.value||"").trim();d&&(n.get(o).values[l]=d)}),[...n.values()].filter(t=>Object.keys(t.values).length||Oa("任务列表模块",t.title))}function MS(e){const n=o=>uo(e,o),t=wv(e),i={},a=yv(e);return Array.from({length:a},(o,s)=>s+1).forEach(o=>{[`任务${o}标题`,`任务${o}奖励类型`,`任务${o}奖励数量`,`任务${o}每日次数`,`任务${o}按钮文案`,`任务${o}描述`].forEach(s=>{const l=n(s)||t[s]||"";l&&(i[s]=l)})}),ki({values:i})}function kF(e,n=[]){let t=IF(n);const i=(r.prdManualModuleVersions?.任务列表模块||[]).length>0,a=ui("任务列表模块");i&&!a&&t.length&&!t.some(o=>o.id==="base")&&(t=[MS(n),...t]),t.length<2}function En(e,n){e&&(e.props=e.props||{},Object.entries(n).forEach(([t,i])=>{const a=String(i||"").trim();a&&(e.props[t]=a,Te(e,t))}))}function Ce(e){const n=String(e||"").split("｜");if(n[0]!==Dn||n.length<3)return null;const t=Number(n[1])-1;let i=n.slice(2).join("｜");const a=i.match(/^(\d+)\|(.+)$/);if(a){const o=Number(a[1]);Number.isFinite(o)&&(o===t||o===t+1)&&(i=a[2])}return!Number.isFinite(t)||!i?null:{moduleIndex:t,compoundKey:i}}function pn(e,n){if(!e||!n)return;if(e.type!=="molecule"){let i=0;n.forEach((a,o)=>{if(!e.props)return;const s=bn(e.schemaId)==="hero"&&["mainTitle","highlightText","subtitle"].includes(o);if(o in e.props||s||Pt(o)||o==="prizeCount"){e.props[o]=a,Te(e,o);const l=Number(String(o).match(/^prize(\d+)/)?.[1]||0);l&&(i=Math.max(i,l))}}),i&&(e.props.prizeCount=Math.max(Number(e.props.prizeCount)||0,i),Te(e,"prizeCount"));return}n.forEach((i,a)=>{!a.includes(".")&&e.props&&a in e.props&&(e.props[a]=i)}),Ri(e);const t=new Map;n.forEach((i,a)=>{if(!a.includes("."))return;const[o,s]=a.split("."),l=e.children?.[Number(o)];if(l?.props&&(s in l.props||Pt(s)||s==="prizeCount")){l.props[s]=i,Te(l,s);const d=Number(String(s).match(/^prize(\d+)/)?.[1]||0);d&&t.set(o,Math.max(t.get(o)||0,d)),(l.guidedStates||[]).forEach(p=>{p.node?.props&&(s in p.node.props||Pt(s)||s==="prizeCount")&&(p.node.props[s]=i,Te(p.node,s))})}}),t.forEach((i,a)=>{const o=e.children?.[Number(a)];o?.props&&(o.props.prizeCount=Math.max(Number(o.props.prizeCount)||0,i),Te(o,"prizeCount"),(o.guidedStates||[]).forEach(s=>{s.node?.props&&(s.node.props.prizeCount=o.props.prizeCount,Te(s.node,"prizeCount"))}))})}function PF(e=[],n=[]){const t=new Map,i=new Map;re(n).forEach(a=>{const o=ci(a.key);if(o){const d=`${o.templateId}|${o.moduleIndex}|${o.stateId}`;i.has(d)||i.set(d,new Map),i.get(d).set(o.compoundKey,a.value??"");return}const s=Ce(a.key);if(!s)return;const l=String(a.value??"");t.has(s.moduleIndex)||t.set(s.moduleIndex,new Map),t.get(s.moduleIndex).set(s.compoundKey,l)}),t.forEach((a,o)=>{const s=e[o];pn(s,a),(s?.guidedStates||[]).forEach(l=>{pn(l.node,a)})}),i.forEach((a,o)=>{const[s,l,d]=o.split("|"),p=e[Number(l)];if(!p||p.sourcePageTemplateId!==s)return;const[c,u]=d.split(":");if(u&&(c!=="entry"||io(s,Number(l))!==u))return;const g=(p.guidedStates||[]).find(w=>w.id===c);g?.node&&(g.detailValues=Object.fromEntries(a),pn(g.node,a),p.activeGuidedStateId===c&&pn(p,a))})}function zF(e=[],n=[],t=""){if(!t)return;const i=new Map,a=new Map;re(n).forEach(o=>{const s=Ne(o.key);if(!s){const d=Ce(o.key);if(!d)return;a.has(d.moduleIndex)||a.set(d.moduleIndex,new Map),a.get(d.moduleIndex).set(d.compoundKey,o.value??"");return}i.has(s.moduleIndex)||i.set(s.moduleIndex,new Map);const l=i.get(s.moduleIndex);l.has(s.versionName)||l.set(s.versionName,new Map),l.get(s.versionName).set(s.compoundKey,o.value??"")}),e.forEach((o,s)=>{const l=on(t,s),d=Dt(l),p=i.get(s)||new Map,c=a.get(s)||new Map,u=dn(o)?Av(c,d.length+1):at;if(dn(o)&&(o.consumptionReturnDetailMode=u),!d.length){if(dn(o)){const x=jo(o,Mo(c));pn(x,c),e[s]=x}return}let g=ue(o);dn(g)&&(g=jo(g,Mo(c)),pn(g,c));const w={id:"base",title:ai,dimensionTitle:"蓝图版本",node:g},y=d.map(x=>{const $=p.get(x.name)||new Map,k=dn(o)?Nk(c,$,u):$;let F=ue(o);return dn(F)&&(F=jo(F,Mo(k))),pn(F,k),(F.guidedStates||[]).forEach(_=>{pn(_.node,k)}),{id:x.id,title:x.name,dimensionTitle:"蓝图版本",node:F}}),h=ui(l)?y:[w,...y];h.length&&(o.guidedLineageVariants=h,o.activeLineageVariantId=h[0].id,o.guidedLineageGraph=AS(o.name||o.schemaId||"模块",h),(h[0].id!=="base"||h[0].node.schemaId!==o.schemaId)&&Fs(o,h[0]))})}function Ed(e,n=[]){const t=i=>uo(n,i);En(Nn(e,["账户优惠券提示"]),{amountText:t("当前账户优惠券总金额"),actionText:t("按钮文案")}),En(Nn(e,["TaskTitle"]),{title:t("抽奖模块标题"),subtitle:t("剩余抽奖次数文案")}),En(Nn(e,["Announcement"]),{text:t("用户中奖公告文案")}),En(Nn(e,["LotteryGridInteractive","抽奖九宫格-报名前","抽奖九宫格-报名后","抽奖样式2"]),{prize1Name:t("奖品1名称"),prize2Name:t("奖品2名称"),prize3Name:t("奖品3名称"),prize4Name:t("奖品4名称"),prize5Name:t("奖品5名称"),prize6Name:t("奖品6名称"),prize7Name:t("奖品7名称"),prize8Name:t("奖品8名称"),buttonText:t("抽奖按钮文案")}),En(Nn(e,["消耗返数据报名规则"]),{titleText:t("消耗返模块标题"),lotteryText:t("抽奖入口文案"),buttonText:t("行动按钮文案"),reward1AmountText:t("第1档奖励金额"),reward2AmountText:t("第2档奖励金额"),reward3AmountText:t("第3档奖励金额"),milestone1Text:t("第1个进度节点文案"),milestone2Text:t("第2个进度节点文案"),milestone3Text:t("第3个进度节点文案"),milestone4Text:t("第4个进度节点文案"),leftLabel:t("左侧数据名称"),leftValue:t("左侧数据数值"),leftUnit:t("左侧数据单位"),rightLabel:t("右侧数据名称"),rightValue:t("右侧数据数值"),rulesTitle:t("规则标题"),ruleOne:t("参与规则1"),ruleTwo:t("参与规则2"),ruleThree:t("参与规则3"),note:t("规则备注")}),En(Nn(e,["BigDay优惠券报名"]),{titleText:t("报名模块标题"),couponAmount:t("优惠券金额"),couponUnit:t("优惠券单位"),couponExpiry:t("优惠券有效期文案"),couponPrefix:t("优惠券品牌前缀"),couponTitle:t("优惠券名称"),actionText:t("报名按钮文案"),dateText:t("活动日期文案"),thresholdText:t("报名门槛文案"),descriptionText:t("报名说明文案")}),MS(n).values,En(Nn(e,["投放案例"]),{categoryText:t("行业分类"),headlineText:t("案例标题"),videoFrequencyText:t("视频日更数量"),videoDescriptionText:t("视频内容建议"),placementDescriptionText:t("投放建议"),placementAmountText:t("建议单笔投放金额"),executionDescriptionText:t("执行要点"),updateMinText:t("日更最小数量"),updateMaxText:t("日更最大数量"),budgetPercentText:t("追投预算比例")}),En(Nn(e,["StickyBottomButton","置底按钮"]),{buttonText:t("底部按钮文案")})}function jS(e,n=[],t=null,i=null,a=[],o=""){const s=n.find(d=>(d.component==="LotteryGrid"||d.component==="LotteryGridInteractive")&&d.variantGroups?.length>=2);if(s){const d=ES(e);if(d){const p=s.variantGroups.map(u=>{const g=ue(d);return Pd(g,u.rows||[]),{id:u.id,title:u.name,node:g}}),c=p.find(u=>u.id==="base")||p[0];Pd(d,s.variantGroups.find(u=>u.id===c.id)?.rows||[]),d.guidedLineageVariants=p,d.activeLineageVariantId=c.id,d.guidedLineageGraph={dimensions:p.map((u,g)=>({id:`lottery_dimension_${g+1}`,title:u.title,x:28,y:28+g*180})),nodes:p.map((u,g)=>({id:u.id==="base"?"node_base":`node_${u.id}`,variantId:u.id,kind:"component",dimensionId:`lottery_dimension_${g+1}`,x:260,y:28+g*180})),edges:[]}}}vF(e,t),Ed(e,a),Nd(e,a),PF(e,a),zF(e,a,o);const l=e.flatMap(d=>(d.guidedStates||[]).map(p=>p.node).filter(Boolean));l.length&&(Ed(l,a),Nd(l,a)),e.forEach(d=>{[d,...(d.guidedLineageVariants||[]).map(p=>p.node)].filter(dn).forEach(p=>{Kr(p),gn(p,p.activeGuidedStateId||"default")})})}function RS(e){const n=String(e).replace(/\s+/g,"").toLowerCase();return G.find(t=>{if(t.id==="MoleculeContainer")return!1;const i=String(t.name||"").replace(/\s+/g,"").toLowerCase();return i===n||i.includes(n)})}function FF(e,n){const t=g=>e.rows.find(w=>w.field===g)?.value||"",i=jn(),a={buttonText:"抽"};for(let g=1;g<=8;g+=1){const w=t(`奖池 ${g}`);w&&(a[`prize${g}`]=w)}const o=n?.children?.length?n.children.map(([g,w={}])=>ce(g,w)):[],l=o.find(g=>g.schemaId==="LotteryGridInteractive"||g.schemaId==="LotteryGrid")||ce("LotteryGridInteractive");l.props={...l.props,...a};const d=o.filter(g=>g.schemaId==="TaskModule"),c=e.rows.map(g=>g.field.match(/^任务 (\d+) 名称$/)?.[1]).filter(Boolean).map(g=>ce("TaskModule",{title:t(`任务 ${g} 名称`),description:t(`任务 ${g} 内容`),frequency:"可完成",buttonText:"去完成",rewardLabel:"抽奖",rewardCount:"+1"})),u=d.length?d:c.length?c:KS();return u.forEach((g,w)=>{const y=String(w+1),h=t(`任务 ${y} 名称`),x=t(`任务 ${y} 内容`);h&&(g.props.title=h),x&&(g.props.description=x),g.moduleGroupId=i,g.moduleGroupRole="task"}),[{id:jn(),schemaId:n?.id||"demo_lottery",name:"九宫格抽奖",type:"molecule",moduleGroupId:i,moduleGroupRole:"lottery",children:[l]},...u]}function NF(e,n){const t=n.rows.find(s=>s.field==="标题")?.value||"",i=(n.rows.find(s=>s.field==="金额梯度")?.value||"").split(/[-/、,\s]+/).filter(Boolean);let a=0,o=!1;return e.children.forEach(s=>{if(!o){const l=["title","text","titleText"].find(d=>d in s.props);l&&(s.props[l]=t,o=!0)}Object.keys(s.props).forEach(l=>{/amount/i.test(l)&&a<i.length&&(s.props[l]=i[a],a+=1)})}),e}function EF(e,n){return n.rows.forEach(t=>{t.moleculePropKey&&e.props&&t.moleculePropKey in e.props&&(e.props[t.moleculePropKey]=Number.isFinite(Number(t.value))?Number(t.value):t.value)}),Ri(e),n.rows.forEach(t=>{if(typeof t.childIndex!="number"||!t.propKey)return;const i=e.children?.[t.childIndex];i?.props&&(t.propKey in i.props||Pt(t.propKey))&&(i.props[t.propKey]=t.value)}),e}function _F(e=[]){const n=t=>e.find(i=>i.field===t)?.value||"";return{titlePrefix:n("标题前段"),brandText:n("品牌文字"),titleSuffix:n("标题后段"),sectionTitle:n("建议标签"),videoTitle:n("视频标题"),userName:n("用户昵称"),suggestionText:n("诊断建议"),moreText:n("查看更多文案"),buttonText:n("按钮文案")}}function BF(e){return(e.states||[]).map(n=>{const t=n.component==="OneClickBoost"?_F(n.rows):{},i=ce(n.component,t);return{id:n.id,name:n.name,component:n.component,node:i}})}function AF(e,n){const t=ce(e.component,n);return{id:"default",name:e.name,component:e.component,node:t}}function MF(e){return(e.prependComponents||[]).map(n=>{const t=n.rows||[],i=s=>t.find(l=>l.field===s)?.value||"",a=n.component==="RedPacketCoupon"&&t.length?{prefix:i("前缀"),title:i("标题"),accountInfo:i("账户信息"),totalLabel:i("总计标签"),amount:i("金额"),unit:i("单位"),buttonText:i("按钮文案")}:{},o=ce(n.component,a);return o.name=n.name||o.name,o.sourceCompanionId=n.id,o})}function HS(e,n={}){n.skipSync||po(e),n.rows||hn(e),e={...e,rows:oe(n.rows||e.rows||[])};const t=l=>e.rows.find(d=>d.field===l)?.value||"",i={};if(e.rows.forEach(l=>{l.propKey&&(i[l.propKey]=l.value)}),e.component.startsWith("molecule:")){const l=e.component.slice(9),d=RS(l);if(l==="九宫格"&&(e.useLotteryTaskGroup||e.rows.some(p=>p.field==="奖池 1")))return FF(e,d);if(d){const p=yn(d.id);p.name=e.name,EF(p,e);const c=/^消耗返/.test(l)&&e.rows.some(u=>u.field==="金额梯度")?NF(p,e):p;return ta(c,e,n)}return/^消耗返/.test(l)&&e.rows.some(p=>p.field==="金额梯度")?ta({id:jn(),schemaId:"demo_consumption_return",name:e.name,type:"molecule",children:[ce("TaskModule",{title:t("标题"),description:`金额梯度：${t("金额梯度")}`,buttonText:"去投放",rewardLabel:"返还",rewardCount:t("金额梯度")})]},e,n):ta(ce(e.fallbackComponent||"LotteryGridInteractive"),e,n)}if(e.component==="文本组件3")i.text=t("文本")||t("内容")||e.rows[0]?.value||"";else if(e.component==="RichText")i.content=t("文本")||t("内容")||e.rows[0]?.value||"",i.fontSize=t("字号")||"body",i.color="black";else if(e.component==="DouPlusJunePromoAnimationV2")i.titleText=t("logo标题")||t("顶部标题")||"DOU+",i.mainTextTop=t("主标题")||e.name,i.mainTextBottom=t("副标题")||t("核心利益点")||"",i.dateText=t("活动时间")||t("日期")||"";else if(e.component==="BigDayCouponClassic")i.amount=t("金额")||"800",i.unit=t("单位")||"元",i.expiry=t("有效期")||"",i.prefix=t("前缀")||"DOU+",i.title=t("标题")||e.name||"优惠券";else if(e.slot==="hero")i.titleText=t("主标题"),i.mainTextTop=t("核心利益点")||t("核心信息")||t("召回文案")||t("权益说明")||t("预热利益点")||t("召回利益点")||t("返场权益"),i.dateText=t("活动时间")||t("开始时间")||t("开放时间")||t("截止时间");else if(e.component==="LotteryGridInteractive"){for(let l=1;l<=8;l+=1){const d=t(`奖品${l}`)||t(`奖品 ${l}`)||t(`奖池 ${l}`);d&&(i[`prize${l}`]=d)}i.buttonText=t("抽奖按钮")||t("按钮文案")||"抽",i.resultTitle=t("中奖提示")||t("抽奖标题")||"恭喜抽中{prize}！",i.resultHintText=t("奖品梯度")||"快去填写地址吧~"}else e.component==="TaskModule"?(i.title=t("任务标题")||t("冲刺目标"),i.description=t("描述文字")||t("任务内容")||t("说明文案"),i.frequency=t("每日次数")||t("任务次数")||"",i.rewardLabel=t("奖励标签")||"抽奖",i.rewardCount=t("奖励数量")||"+1",i.buttonText=t("按钮文案")||"去完成任务"):e.component==="BigButton"||e.component==="SectionTitle"||e.component==="Announcement"?i.text=t("文本")||e.rows[0]?.value||e.name:e.component==="PromotionModule"?(i.title=t("服务标题")||t("预约标题")||t("报告标题"),i.description=t("服务权益")||t("预约权益")||t("报告内容"),i.buttonText=t("按钮文案")):e.component==="QualityVideoDiagnosis"?(i.title=t("标题")||t("模块标题"),i.description=t("提示文案")||t("副标题")||t("说明文案"),i.buttonText=t("按钮文案")):e.slot==="content"&&(i.src=Br,i.alt=t("模块标题")||t("内容标题")||t("说明标题")||"内容模块",i.title=t("模块标题")||t("内容标题")||t("说明标题"),i.subtitle=t("案例介绍")||t("内容说明")||t("预告内容")||t("说明正文")||t("服务介绍"));const a=ce(e.component,i),o=BF(e);o.length&&(a.guidedStates=[AF(e,i),...o],a.activeGuidedStateId="default");const s=ta(a,e,n);return!n.skipLineage&&e.prependComponents?.length?[...MF(e),s]:s}function ta(e,n,t={}){if(t.skipLineage||!e||Array.isArray(e))return e;const i=t.sourceModule||n,a=hn(i);return a.length&&(e.guidedLineageVariants=a.map(o=>({id:o.id,title:o.name,node:ue(HS(i,{rows:o.rows,skipLineage:!0,skipSync:!0}))})),e.activeLineageVariantId=a[0].id,delete e.guidedLineageGraph),e}function Ts(){const e=A(".activity-center");if(!e)return;const n=new Set(r.guidedVisiblePageIds),t=r.pages.filter(s=>n.has(s.id)),i=r.selectedId?xe(r.nodes,r.selectedId)?.node:null,a=r.guidedWorkspaceMode||"split";e.innerHTML=`
    <div class="guided-preview-shell guided-workspace resource-guided-workspace is-${a}">
      ${Cs(a,n)}
      <section class="guided-canvas-pane">
        <button class="guided-theme-entry" data-guided-open-theme>
          <span aria-hidden="true">◐</span>
          资源位配色
        </button>
        <button class="guided-main-visual-entry" data-guided-open-main-visual>
          <span aria-hidden="true">◆</span>
          主体替换
        </button>
        <button class="guided-export-entry guided-export-entry-floating" data-guided-open-export>
          <span>↓</span>
          导出切图
        </button>
        <main class="device-stage guided-device-stage">
          <div class="pages-row">
            <div
              class="canvas-world guided-canvas-world ${r.guidedCanvasInitialized?"":"is-initializing"}"
              style="transform:translate3d(${r.canvasPanX}px, ${r.canvasPanY}px, 0) scale(${r.canvasZoom});--guided-action-scale:${$e(1/Math.max(r.canvasZoom,.01),.75,1.6)};--guided-title-scale:${$s()};"
            >
              ${t.length?DS(t):'<div class="guided-canvas-empty">从左侧选择要预览的资源位</div>'}
            </div>
          </div>
        </main>
      </section>
      <div class="guided-operation-host" aria-live="polite">
        ${r.guidedPanelMode&&(i||r.guidedPanelMode==="page"||r.guidedPanelMode==="resource-main-visual")?Es(i):""}
      </div>
    </div>
  `,A(".guided-main-visual-entry")?.addEventListener("click",s=>{s.stopPropagation(),r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="resource-main-visual",sn(null),ze({enter:!0})});const o=A(".guided-device-stage");Gs(o);try{window.renderReactMaterials?.(e)}finally{!r.guidedCanvasInitialized&&a!=="blueprint-full"?Ls():requestAnimationFrame(()=>{fn(),He()})}}function DS(e){return`
    <div
      class="guided-page-tree resource-canvas-tree"
      style="--guided-page-count:${e.length}"
    >
      <div class="guided-activity-title-node">
        <strong>${v(r.activity?.name||"资源位活动")}</strong>
      </div>
      <div class="guided-page-title-row ${e.length>1?"has-branches":""}">
        ${e.map(GS).join("")}
      </div>
      <div class="guided-page-preview-row resource-canvas-row">
        ${e.map(jF).join("")}
      </div>
    </div>
  `}function jF(e){const n=e.id===r.activePageId,t=e.nodes?.[0],i=Rn(t),a=Math.max(1,Number(i.width||300)),o=Math.max(1,Number(i.height||300));return`
    <section
      class="guided-page-shell resource-canvas-shell ${n?"active":""}"
      data-page-id="${f(e.id)}"
      style="--resource-canvas-width:${a}px;--resource-canvas-height:${o}px;"
    >
      <div class="page guided-theme-page resource-canvas-surface">
        ${(e.nodes||[]).map(Sr).join("")}
      </div>
    </section>
  `}function At(){const e=A(".activity-center");if(!e)return;r.pages[0]&&!r.pages.some(d=>r.guidedVisiblePageIds.includes(d.id))&&(r.guidedVisiblePageIds=[r.pages[0].id],r.activePageId=r.pages[0].id);const n=new Set(r.guidedVisiblePageIds),t=r.pages.filter(d=>n.has(d.id)),i=r.selectedId?xe(r.nodes,r.selectedId)?.node:null,a=r.guidedWorkspaceMode||"split",s=Bi(_e(Q()))==="s";e.innerHTML=`
    <div class="guided-preview-shell guided-workspace is-${a}">
      ${Cs(a,n)}
      <section class="guided-canvas-pane">
        <button
          class="guided-theme-entry ${s?"is-disabled":""}"
          data-guided-open-theme
          ${s?"disabled":""}
          aria-disabled="${s}"
          title="${s?"S级头图锁定橘色套系，不能切换页面配色":"页面配色"}"
        >
          <span aria-hidden="true">◐</span>
          页面配色
        </button>
        ${r.workflowType==="resource"?"":`
              <button class="guided-header-level-entry" data-guided-open-header-level>
                <span aria-hidden="true">S</span>
                切换等级
              </button>
            `}
        <button class="guided-add-entry" data-guided-open-add>
          <span aria-hidden="true">＋</span>
          增加组件
        </button>
        <button class="guided-export-entry guided-export-entry-floating" data-guided-open-export>
          <span>↓</span>
          导出切图
        </button>
        <main class="device-stage guided-device-stage">
          <div class="pages-row">
            <div
              class="canvas-world guided-canvas-world ${r.guidedCanvasInitialized?"":"is-initializing"}"
              style="transform:translate3d(${r.canvasPanX}px, ${r.canvasPanY}px, 0) scale(${r.canvasZoom});--guided-action-scale:${$e(1/Math.max(r.canvasZoom,.01),.75,1.6)};--guided-title-scale:${$s()};"
            >
              ${t.length?LS(t):`<div class="guided-canvas-empty">从左侧选择要同时预览的${r.workflowType==="resource"?"资源位":"页面"}</div>`}
            </div>
          </div>
        </main>
      </section>
      <div class="guided-operation-host" aria-live="polite">
        ${r.guidedPanelMode&&(i||r.guidedPanelMode==="page"||r.guidedPanelMode==="add")?Es(i):""}
      </div>
    </div>
  `,A(".guided-export-entry")?.addEventListener("click",d=>{d.stopPropagation(),r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode=null,r.view="guided-export",T()}),A(".guided-theme-entry")?.addEventListener("click",d=>{d.stopPropagation(),r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="page",sn(null),ze({enter:!0})}),A(".guided-add-entry")?.addEventListener("click",d=>{d.stopPropagation(),r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="add",r.guidedAddTargetContext=null,sn(null),ze({enter:!0})});const l=A(".guided-device-stage");Gs(l);try{window.renderReactMaterials?.(e)}finally{!r.guidedCanvasInitialized&&a!=="blueprint-full"?Ls():requestAnimationFrame(()=>{fn(),He()})}}function Zo(){if(r.view!=="guided-preview")return!1;const e=document.querySelector(".guided-preview-shell"),n=e?.querySelector(".guided-blueprint-pane"),t=e?.querySelector(".guided-canvas-world");if(!e||!n||!t)return!1;const i=new Set(r.guidedVisiblePageIds),a=r.pages.filter(l=>i.has(l.id)),o=document.createElement("template");o.innerHTML=Cs(r.guidedWorkspaceMode||"split",i).trim();const s=o.content.firstElementChild;return s?(n.replaceWith(s),t.innerHTML=a.length?r.workflowType==="resource"?DS(a):LS(a):`<div class="guided-canvas-empty">从左侧选择要同时预览的${r.workflowType==="resource"?"资源位":"页面"}</div>`,t.classList.toggle("is-initializing",!r.guidedCanvasInitialized),ze(),window.renderReactMaterials?.(t),!r.guidedCanvasInitialized&&r.guidedWorkspaceMode!=="blueprint-full"?Ls():requestAnimationFrame(()=>{fn(),He()}),!0):!1}function $s(){return $e(1/Math.sqrt(Math.max(r.canvasZoom,.01)),.82,2.35)}function LS(e){const n=new Set(r.guidedVisibleCompanionNodeIds||[]);return`
    <div class="guided-page-tree ${e.some(i=>(i.nodes||[]).some(a=>a.canvasPlacement==="page-side"&&n.has(a.id)))?"has-side-companions":""}" style="--guided-page-count:${e.length}">
      <div class="guided-activity-title-node">
        <strong>${v(r.activity?.name||li.activityName||"活动名称")}</strong>
      </div>
      <div class="guided-page-title-row ${e.length>1?"has-branches":""}">
        ${e.map(GS).join("")}
      </div>
      <div class="guided-page-preview-row">
        ${e.map(UF).join("")}
      </div>
    </div>
  `}function GS(e){const n=e.id===r.activePageId,t=n&&r.guidedPanelMode==="page"&&!r.selectedId;return`
    <header
      class="guided-page-title-node ${e.isSystemFallback?"is-system-fallback":""} ${n?"active":""} ${t?"has-selected-page":""}"
      data-guided-page-title="${e.id}"
    >
      <strong>${v(e.dimension||"未分组")}</strong>
      <span>${v(e.name||"活动页面")}</span>
    </header>
  `}function RF(){const e=document.querySelector("[data-demo-generate-activity]");e?.setAttribute("disabled","true"),fs(),r.prdDemoStep="preview",r.view="guided-preview",r.guidedWorkspaceMode="split",r.blueprintReturningFromPreview=!1,T(),requestAnimationFrame(()=>{window.scrollTo(0,0)}),e?.removeAttribute("disabled")}function HF(){const e=document.querySelector("[data-resource-generate]");e?.setAttribute("disabled","true"),wP(),r.view="guided-preview",r.guidedWorkspaceMode="split",r.blueprintReturningFromPreview=!1,T(),requestAnimationFrame(()=>window.scrollTo(0,0)),e?.removeAttribute("disabled")}function DF(){r.view=r.workflowType==="resource"?"resource-blueprint":"prd-demo",r.workflowType!=="resource"&&(r.prdDemoStep="analysis"),r.guidedWorkspaceMode="split",r.blueprintReturningFromPreview=!1,r.selectedId=null,r.guidedPanelMode=null,r.prdTemplateSelectedModuleIndex=null,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,T(),window.scrollTo(0,0)}function OS(e,n={}){e&&(n.scroll!==!1&&e.scrollIntoView({behavior:"smooth",block:"center"}),e.classList.remove("is-locate-flash"),e.offsetWidth,e.classList.add("is-locate-flash"),setTimeout(()=>e.classList.remove("is-locate-flash"),2e3))}function LF(e,n){r.view="prd-demo",r.prdDemoStep="analysis",r.guidedWorkspaceMode="split",r.blueprintReturningFromPreview=!1,r.selectedId=null,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,r.prdTemplateSelectedModuleIndex=Number(n),T(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const t=document.querySelector(`[data-prd-template-module-row="${CSS.escape(`${e}|${n}`)}"]`);OS(t)})})}function GF(e,n){fs();const t=r.pages.flatMap(a=>a.nodes||[]).find(a=>a.sourcePageTemplateId===e&&Number(a.sourcePageTemplateNodeIndex)===Number(n)),i=r.pages.find(a=>(a.nodes||[]).some(o=>o.id===t?.id));i&&(r.guidedVisiblePageIds.includes(i.id)||(r.guidedVisiblePageIds=[...r.guidedVisiblePageIds,i.id]),r.activePageId=i.id),r.prdDemoStep="preview",r.view="guided-preview",r.guidedWorkspaceMode="split",r.blueprintReturningFromPreview=!1,r.selectedId=null,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,la=t?.id||null,r.guidedCanvasInitialized=!1,T(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(t){const a=document.querySelector(`.guided-node[data-node-id="${CSS.escape(t.id)}"]`);OS(a,{scroll:!1})}})})}function OF(e,n={}){const t=new Set(r.guidedVisibleCompanionNodeIds||[]);return r.pages.flatMap(i=>{const a=e.has(i.id),o=`
        <button
          class="${a?"active":""}"
          data-demo-scenario="${i.id}"
          aria-pressed="${a}"
        >
          <i>${a?"✓":""}</i>
          <span class="guided-page-card-copy">
            <strong>${v(i.dimension)}</strong>
            <span>${v(i.name)}</span>
          </span>
          ${n.showStatus?`<em>${a?"画布中":"未展示"}</em>`:""}
        </button>
      `,s=(i.nodes||[]).filter(l=>l.canvasPlacement==="page-side").map(l=>{const d=a&&t.has(l.id);return`
            <button
              class="is-companion ${d?"active":""}"
              data-guided-companion-toggle="${f(l.id)}"
              data-guided-companion-page="${f(i.id)}"
              aria-pressed="${d}"
            >
              <i>${d?"✓":""}</i>
              <span class="guided-page-card-copy">
                <strong>会场弹窗</strong>
                <span>${v(l.name||"抽奖结果弹窗")}</span>
              </span>
              ${n.showStatus?`<em>${d?"画布中":"未展示"}</em>`:""}
            </button>
          `});return[o,...s]}).join("")}function Cs(e,n){return e==="blueprint-panel"?VF(n):`
    <aside class="guided-blueprint-pane guided-compact-nav" aria-label="${r.workflowType==="resource"?"资源位切换":"页面切换"}">
      <button class="guided-table-edge-tab" data-demo-back-analysis aria-label="返回${r.workflowType==="resource"?"资源位":"蓝图"}表格">
        <span class="guided-table-edge-arrow" aria-hidden="true">←</span>
        <span>表格</span>
      </button>
      <div class="guided-page-list">
        ${OF(n)}
      </div>
      <footer class="guided-history-actions">
        <button type="button" data-save>保存版本</button>
        <button type="button" data-open-my-projects>我的</button>
      </footer>
    </aside>
  `}function VF(e){const{audienceGroups:n,slots:t}=Mz(),i=n.some(d=>d.audience.id===r.selectedBlueprintAudienceId)?r.selectedBlueprintAudienceId:n[0]?.audience.id,a=Math.max(0,n.findIndex(d=>d.audience.id===i)),o=n[a],s=n.flatMap(d=>d.contexts),l=new Map;return s.forEach(d=>{d.modules.forEach(p=>{if(p.inputScope!=="activity")return;const c=`${p.slot}|${p.component}`;l.has(c)||l.set(c,d.id)})}),`
    <aside class="guided-blueprint-pane guided-table-nav" aria-label="人群表格">
      <header class="guided-table-nav-head">
        <button class="guided-sidebar-back" data-demo-back-analysis>
          <span>←</span>
          返回
        </button>
      </header>
      <div class="guided-audience-tabs" aria-label="人群分类">
        ${n.map(d=>`
              <button
                class="${d.audience.id===i?"active":""}"
                data-blueprint-audience="${f(d.audience.id)}"
              >
                ${v(d.audience.name)}
              </button>
            `).join("")}
      </div>
      <div class="guided-blueprint-scroll">
        <div
          class="blueprint-overview-list"
          style="--blueprint-audience-count:1;--blueprint-list-width:100%"
        >
          ${o?qz(o,t,a,l,{visiblePageIds:e,showPageToggle:!0}):""}
        </div>
      </div>
      <footer class="guided-history-actions">
        <button type="button" data-save>保存版本</button>
        <button type="button" data-open-my-projects>我的</button>
      </footer>
    </aside>
  `}function UF(e){const n=e.id===r.activePageId,t=n&&r.guidedPanelMode==="page"&&!r.selectedId,i=(e.nodes||[]).filter(d=>d.canvasPlacement!=="page-side"),a=(e.nodes||[]).filter(d=>d.canvasPlacement==="page-side"&&(r.guidedVisibleCompanionNodeIds||[]).includes(d.id)),o=[];!i.length&&n&&r.dropPageId===e.id&&r.dropIndex===0&&o.push('<div class="drop-marker guided-drop-marker"></div>'),i.forEach((d,p)=>{n&&r.dropPageId===e.id&&r.dropIndex===p&&o.push('<div class="drop-marker guided-drop-marker"></div>'),o.push(Sr(d))}),n&&r.dropPageId===e.id&&r.dropIndex===i.length&&o.push('<div class="drop-marker guided-drop-marker"></div>');const s=Ms(e),l=e.isSystemFallback?`--guided-fallback-bottom-space:${Number(s?.bottomSpace||0)}px;min-height:${Number(s?.pageHeight||1334)}px;`:"";return`
    <section class="guided-page-shell ${a.length?"has-side-companion":""} ${e.isSystemFallback?"is-system-fallback":""} ${n?"active":""} ${t?"has-selected-page":""}" data-page-shell="${e.id}">
      <div class="phone guided-phone">
        <div
          class="page guided-theme-page ${e.isSystemFallback?"guided-fallback-page":""}"
          data-page-id="${e.id}"
          data-page-theme="${f(Qe(e).id)}"
          style="${f(`${f6(e)}${l}`)}"
        >
          ${o.join("")}
          ${e.navBarEnabled?eT():""}
        </div>
      </div>
      ${a.length?`
            <aside
              class="guided-page-companion ${a.some(d=>d.isLotteryResultPopup)?"is-left":""}"
              data-page-id="${e.id}"
              aria-label="会场弹窗静态组件"
            >
              <header>
                <span>会场弹窗</span>
                <strong>静态组件 · 可编辑导出</strong>
              </header>
              ${a.map(d=>Sr(d)).join("")}
            </aside>
          `:""}
    </section>
  `}function KF(e){const n=r.pages.find(l=>l.id===e.pageId),t=n?.nodes?.length?n.nodes:[],i=fi(n,e.pageTheme||Qe(n))||"#FFE0E9",a=Ms(n),o=Number(a?.bottomSpace||0);return`
    <div
      class="page guided-theme-page guided-fallback-page guided-export-fallback-page"
      style="height:${Number(a?.pageHeight||e.dimensions?.height||1334)}px;background:${f(i)};background-position:top center;--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")};--guided-fallback-bottom-space:${o}px"
    >
      ${t.map(l=>ge(l,{editable:!1})).join("")}
    </div>
  `}function Is(e,n={}){return`
    <div class="placement-case-carousel-shell">
      <div class="placement-case-carousel">
        <div class="placement-case-carousel-track">
          ${Array.from({length:4},(t,i)=>`
              <div class="placement-case-carousel-item" data-carousel-index="${i}">
                ${ge(e,n)}
              </div>
            `).join("")}
        </div>
      </div>
      <input
        class="placement-case-scrollbar"
        type="range"
        min="0"
        max="1000"
        value="0"
        aria-label="横向查看投放案例"
        data-placement-case-scrollbar
      />
    </div>
  `}function qF(e){return e?.schemaId==="节点指南"||e?.schemaId==="用户教育案例-样式1"}function WF(e){const n=document.querySelector(`.guided-node[data-node-id="${CSS.escape(e)}"]`),t=n?.querySelector(".component.molecule.node-guide-module .molecule-child:nth-child(2)")||n?.querySelector(".component.molecule.user-education-case-style1-module .molecule-child:nth-child(2)")||n?.querySelector(".placement-case-carousel"),i=n?.querySelector("[data-placement-case-scrollbar]");if(!t)return;const a=t.querySelector(".placement-case-carousel-item"),o=t.querySelector(".placement-case-carousel-track"),s=o&&Number.parseFloat(getComputedStyle(o).columnGap||getComputedStyle(o).gap||"0")||0,l=a?a.getBoundingClientRect().width+s:Math.max(1,t.scrollWidth/4),d=Math.max(0,t.scrollWidth-t.clientWidth),c=t.scrollLeft+l>=d-2?0:Math.min(d,t.scrollLeft+l);t.scrollTo({left:c,behavior:"smooth"}),i&&(i.value=d?String(c/d*Number(i.max||1e3)):"0")}function VS(e){const n=e.schemaId==="弹窗-中奖"?e.props||e.lotteryWinProps||{}:e.lotteryWinProps||{},t=Math.max(1,Number(n.prizeCount)||1),i=Array.from({length:t},(o,s)=>{const l=s+1,d=Pe(n[`prize${l}`]),p=n[`prize${l}Text`]||d?.name||`奖品${l}`,c=gi(p),u={...e,id:`${e.id}_prize_${l}`,schemaId:"弹窗-中奖",type:"atom",props:{...n,selectedPrizeIndex:l,amountText:c.amountText,prizeText:c.prizeText,prizeSubText:n[`prize${l}Copy`]||d?.copy||""}};return`
      <div class="guided-popup-preview-item" data-guided-popup-prize-preview="${l}">
        ${ge(u)}
      </div>
    `}),a={...e,id:`${e.id}_lose`,schemaId:"弹窗-未中奖",type:"atom",props:ws(e)};return`
    <div class="guided-popup-preview-stack">
      ${i.join("")}
      <div class="guided-popup-preview-item" data-guided-popup-result-preview="lose">
        ${ge(a)}
      </div>
    </div>
  `}function Sr(e){const n=r.selectedId===e.id?"selected":"",t=bn(e.schemaId),i=t==="hero",a=e.canvasPlacement==="page-side",o=qF(e),s=a?null:Xk(e.id),l=e.schemaId==="投放案例"?"placement-case-canvas":"",d=e.schemaId==="投放案例"?Is(e):e.isLotteryResultPopup?VS(e):ge(e),p=mi(e),c=mo(e),u=u6(e),g=r.guidedStateMenuNodeId===e.id&&u;return`
    <section
      class="node-wrap root guided-node ${i?"is-hero":""} ${l} ${n}"
      data-select="${e.id}"
      data-node-id="${e.id}"
      aria-label="${f(e.name||_a[t]||"模块")}"
      tabindex="0"
    >
      <div class="guided-node-kind">${v(a?"弹窗原子":_a[t]||"模块")}</div>
      ${s?`
            <div class="guided-node-order-actions" aria-label="调整模块顺序">
              <button
                type="button"
                data-guided-order="up"
                data-guided-node="${f(e.id)}"
                data-guided-page="${f(s.page.id)}"
                ${s.canMoveUp?"":"disabled"}
                aria-label="上移模块"
              >↑</button>
              <button
                type="button"
                data-guided-order="down"
                data-guided-node="${f(e.id)}"
                data-guided-page="${f(s.page.id)}"
                ${s.canMoveDown?"":"disabled"}
                aria-label="下移模块"
              >↓</button>
            </div>
          `:""}
      <div class="guided-node-actions">
        ${e.isLotteryResultPopup?"":`
          <button data-guided-action="global" data-guided-node="${e.id}" aria-label="编辑全局信息">
            <span>◎</span><i>模块人群</i>
          </button>
        `}
        ${e.sourcePageTemplateId&&e.sourcePageTemplateNodeIndex!==void 0?`
              <button data-guided-switch-table="${f(e.sourcePageTemplateId)}" data-guided-module-index="${f(String(e.sourcePageTemplateNodeIndex))}" aria-label="切换至表格">
                <span>▤</span><i>切换至表格</i>
              </button>
            `:""}
          ${e.isLotteryResultPopup?"":`
                <button class="is-danger" data-guided-action="delete" data-guided-node="${e.id}" aria-label="删除模块">
                  <span>×</span><i>删除模块</i>
                </button>
              `}
        ${a?"":i?`
              ${e.schemaId==="头图"?`
                <button data-guided-action="hero" data-guided-node="${e.id}" aria-label="替换主体">
                  <span>图</span><i>替换主体</i>
                </button>
              `:""}
            `:`
              <button data-guided-action="replace" data-guided-node="${e.id}" aria-label="更改模块">
                <span>↻</span><i>更改模块</i>
              </button>
              ${o?`
                    <button data-guided-action="slide" data-guided-node="${e.id}" aria-label="横滑查看">
                      <span>↔</span><i>横滑查看</i>
                    </button>
                  `:""}
              ${u?`
                    <button data-guided-action="states" data-guided-node="${e.id}" aria-label="查看状态">
                      <span>◇</span><i>查看状态</i>
                    </button>
                  `:""}
              ${g?YF(e,p,c):""}
            `}
      </div>
      <div class="guided-node-theme-content">${d}</div>
    </section>
  `}function fa(e,n="",t=null,i=null){if(r.view!=="guided-preview"||!e?.id)return!1;const a=document.querySelector(`.guided-node[data-node-id="${CSS.escape(e.id)}"] .guided-node-theme-content`),o=document.querySelector(`.guided-node .molecule-child[data-node-id="${CSS.escape(e.id)}"]`),s=a||o;if(!s)return!1;const l=i?QS(i,e):e;if(s.innerHTML=l.isLotteryResultPopup?VS(l):ge(l),window.renderReactMaterials?.(s),n){const d=s.querySelector(`[data-edit-prop="${CSS.escape(n)}"]`);d&&t!==null&&JS(d,t)}return Et(),!0}function XF(){document.querySelectorAll("[data-guided-inline-state]").forEach(e=>{const n=xe(r.nodes,e.dataset.guidedNode)?.node;e.classList.toggle("active",n?.activeGuidedStateId===e.dataset.guidedInlineState)}),document.querySelectorAll("[data-guided-child-state]").forEach(e=>{const n=xe(r.nodes,e.dataset.guidedChildStateNode)?.node;e.classList.toggle("active",n?.activeGuidedStateId===e.dataset.guidedChildState)})}function Ln(e,n=null){return fa(n||e)?(XF(),r.guidedPanelMode&&ze(),sn(r.selectedId),!0):!1}function Qo(e,n,t){return r.view==="guided-preview"&&!t.isComposing&&(e?.schemaId==="头图"&&n==="text"||e?.schemaId==="S级-中秋头图"&&n==="mainTitle"||e?.schemaId==="模块标题-正常"&&n==="titleText")}function Va(e){return e?.name?e.name:e?.id==="default"?"默认状态":e?.id==="clicked"||e?.id==="registered"?"切换后":e?.id||"默认状态"}function YF(e,n=[],t=[]){return t.length?`
      <div class="guided-node-state-popover is-child-state-list">
        ${t.map(i=>`
          <div class="guided-node-child-state-row">
            <span>${v(i.label)}</span>
            <div>
              ${i.stateEntries.map(a=>`
                <button
                  type="button"
                  class="${i.child.activeGuidedStateId===a.id?"active":""}"
                  data-guided-child-state-node="${f(i.child.id)}"
                  data-guided-child-state="${f(a.id)}"
                >${v(Va(a))}</button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `:`
    <div class="guided-node-state-popover">
      ${n.map(i=>`
            <button
              type="button"
              class="${e.activeGuidedStateId===i.id?"active":""}"
              data-guided-inline-state="${f(i.id)}"
              data-guided-node="${e.id}"
            >${v(Va(i))}</button>
          `).join("")}
    </div>
  `}function sn(e){r.selectedId=e||null;let n=null;document.querySelectorAll(".guided-node").forEach(t=>{const i=t.dataset.nodeId===e;t.classList.toggle("selected",i),i&&(n=t.closest(".guided-page-shell"))}),document.querySelectorAll(".guided-page-shell").forEach(t=>{t.classList.toggle("has-selected-node",t===n),e&&t.classList.remove("has-selected-page")}),document.querySelectorAll(".guided-page-title-node").forEach(t=>{t.classList.toggle("active",t.dataset.guidedPageTitle===r.activePageId),e&&t.classList.remove("has-selected-page")})}function ze(e={}){const n=document.querySelector(".activity-center .guided-operation-host")||A(".guided-operation-host");if(!n)return;const t=r.selectedId?xe(r.nodes,r.selectedId)?.node:null,i=r.guidedPanelMode==="page"&&Q(),a=r.guidedPanelMode==="add",o=r.guidedPanelMode==="resource-main-visual";n.innerHTML=r.guidedPanelMode&&(t||i||a||o)?Es(t,e):"",window.renderReactMaterials?.(n),requestAnimationFrame(()=>Ua())}function ia(e={}){const n=A(".guided-floating-panel");if(!n||!r.guidedPanelMode){r.guidedPanelMode=null,e.clearSelection&&(r.selectedId=null),ze();return}n.classList.add("is-closing"),window.setTimeout(()=>{r.guidedPanelMode=null,e.clearSelection&&(r.selectedId=null),ze()},240)}function JF(e){if(e?.isLotteryResultPopup){const n=e.lotteryWinProps||e.props||{},t=e.activeLotteryPopupResult==="lose"||e.schemaId==="弹窗-未中奖",i=Math.max(1,Number(n.prizeCount||1)),a=$e(Number(n.selectedPrizeIndex||1),1,i);return`
      <div class="guided-popup-prize-list">
        ${Array.from({length:i},(s,l)=>{const d=l+1,p=Pe(n[`prize${d}`]);return{index:d,name:n[`prize${d}Text`]||p?.name||`奖品${d}`,image:p?.image||""}}).map(s=>`
          <div class="guided-popup-prize-row ${!t&&s.index===a?"is-current":""}">
            <button
              type="button"
              class="guided-popup-prize-pick"
              data-guided-popup-prize-index="${s.index}"
              data-guided-node="${f(e.id)}"
              aria-pressed="${!t&&s.index===a}"
            >
              <span>${s.index}</span>
              ${s.image?`<img src="${f(s.image)}" alt="" />`:'<i aria-hidden="true"></i>'}
              <strong>${v(s.name)}</strong>
              ${!t&&s.index===a?"<em>当前展示</em>":""}
            </button>
          </div>
        `).join("")}
        <div class="guided-popup-prize-row ${t?"is-current":""}">
          <button
            type="button"
            class="guided-popup-prize-pick"
            data-guided-popup-result="lose"
            data-guided-node="${f(e.id)}"
            aria-pressed="${t}"
          >
            <span>未</span>
            <i aria-hidden="true"></i>
            <strong>未中奖</strong>
            ${t?"<em>当前展示</em>":""}
          </button>
        </div>
      </div>
    `}return r6(e)}function ue(e){const n=oe(e);return delete n.guidedLineageVariants,delete n.guidedLineageDimensions,delete n.guidedLineageGraph,delete n.activeLineageVariantId,n}function ks(e,n=""){if(e.type==="molecule")return(e.children||[]).flatMap((i,a)=>ks(i,`${n}${a}.`).map(o=>({...o,label:`${i.name} · ${o.label}`})));const t=ee(e.schemaId);return t?Ue(t).filter(([i,a])=>Lt(i,a,e.props?.[i]??a.default)).map(([i,a])=>({path:`${n}${i}`,label:a.label||i})):[]}function Ps(e,n){const t=n.split(".");if(t.length===1)return e.props?.[t[0]]??"";const[i,...a]=t;return Ps(e.children?.[Number(i)]||{},a.join("."))}function Ai(e,n,t){const i=n.split(".");if(i.length===1){e.props||(e.props={}),e.props[i[0]]=t,Te(e,i[0]);return}const[a,...o]=i,s=e.children?.[Number(a)];s&&Ai(s,o.join("."),t)}function Zn(e){return(!Array.isArray(e.guidedLineageVariants)||!e.guidedLineageVariants.length)&&(e.guidedLineageVariants=[{id:"base",title:ai,node:ue(e)}],e.activeLineageVariantId="base"),e.guidedLineageVariants}function wt(e){const n=Zn(e),t=e.guidedLineageGraph;if(!t?.dimensions?.length){const a=t?.nodes||[],o=a.filter(d=>d.kind==="root"),s=(o.length?o:[{id:"dimension_1"}]).map((d,p)=>({id:`dimension_${p+1}`,title:`维度 ${p+1}`,x:28,y:28,legacyRootId:d.id})),l=a.length?a.map(d=>{const p=Math.max(0,o.findIndex(c=>d.id===c.id||d.rootId===c.id));return{id:d.id==="base"?"node_base":d.id,variantId:d.variantId,kind:"component",dimensionId:s[p]?.id||s[0].id,x:260,y:28}}):n.map(d=>({id:d.id==="base"?"node_base":`node_${d.id}`,variantId:d.id,kind:"component",dimensionId:s[0].id,x:260,y:28}));e.guidedLineageGraph={dimensions:s,nodes:l,edges:[]}}const i=e.guidedLineageGraph;return n.forEach(a=>{i.nodes.some(o=>o.variantId===a.id)||i.nodes.push({id:`node_${a.id}`,variantId:a.id,kind:"component",dimensionId:i.dimensions[0].id,x:260,y:28})}),go(e,e.guidedLineageGraph),{base:n[0],graph:e.guidedLineageGraph,dimensions:e.guidedLineageGraph.dimensions}}function je(e,n){return Zn(e).find(t=>t.id===n)}function ZF(e,n){const t=je(e,n.variantId);return t?Ns(t.node).previewHeight+58:220}function zs(e){return e.dimensions||[]}function Oi(e,n){return e.nodes.filter(t=>t.dimensionId===n)}function go(e,n){let t=28;zs(n).forEach(i=>{const a=Oi(n,i.id);let o=t;a.forEach(d=>{d.x=260,d.y=o,o+=ZF(e,d)+18});const s=je(e,a[0]?.variantId),l=s?Ns(s.node):null;i.x=28,i.y=l?t+24+l.previewHeight/2:t+42,t+=Math.max(120,o-t)+64}),n.edges=n.nodes.map(i=>({id:`edge_${i.dimensionId}_${i.id}`,from:i.dimensionId,to:i.id}))}function QF(e){return`维度 ${zs(e.guidedLineageGraph).length+1}`}function e6(e,n){return`文案版本 ${Oi(e.guidedLineageGraph,n.id).length+1}`}function n6(e,n){const{base:t,graph:i}=wt(e),a=i.dimensions.find(p=>p.id===n)||i.dimensions[0],o=Oi(i,a.id)[0],s=je(e,o?.variantId)||t,l=`copy_${Date.now()}_${i.nodes.length}`,d={id:l,title:e6(e,a),node:ue(s.node)};return e.guidedLineageVariants.push(d),i.nodes.push({id:`node_${l}`,variantId:l,kind:"component",dimensionId:a.id,x:0,y:0}),go(e,i),d}function t6(e){const{base:n,graph:t}=wt(e),i=`dimension_${Date.now()}_${t.dimensions.length}`,a=`copy_${Date.now()}_${t.nodes.length}`,o={id:a,title:"默认文案",node:ue(n.node)};return t.dimensions.push({id:i,title:QF(e),x:0,y:0}),t.nodes.push({id:`node_${a}`,variantId:a,kind:"component",dimensionId:i,x:0,y:0}),e.guidedLineageVariants.push(o),go(e,t),{dimensionId:i,variant:o}}function i6(e){const n=Zn(e),t=n[0],a={id:`copy_${Date.now()}_${n.length}`,title:`文案版本 ${n.length+1}`,node:ue(t.node)};return e.guidedLineageVariants.push(a),a}function Tt(e){return e?.parent||e?.node||null}function er(e,n){if(!e||!n||n.id==="base")return!1;if(e.sourcePageTemplateId&&e.sourcePageTemplateNodeIndex!==void 0){const t=Number(e.sourcePageTemplateNodeIndex),i=on(e.sourcePageTemplateId,t),a=SS(i,{id:n.id});a?.name&&(n.title=a.name);const o=[...pe,...ne].find(s=>s.id===e.sourcePageTemplateId);return o&&a?.name&&Li(o).filter(s=>Number(s.moduleIndex)===t).forEach(s=>cs(s,a.name)),!!a}if(e.sourceContextId&&e.sourceModuleId){const{module:t}=Bn(e.sourceContextId,e.sourceModuleId);if(!t)return!1;const a=(o=>br(o,{id:n.id}))(t);return a?.name&&(n.title=a.name),t.inputScope==="activity"&&ln().map(o=>o.modules.find(s=>s.inputScope==="activity"&&s.slot===t.slot)).filter(Boolean).forEach(o=>br(o,{id:n.id,name:n.title})),!0}return!1}function a6(e,n,t){if(!e||!n||n==="base")return!1;if(e.sourcePageTemplateId&&e.sourcePageTemplateNodeIndex!==void 0){const i=on(e.sourcePageTemplateId,e.sourcePageTemplateNodeIndex);return TS(i,n,t),!0}if(e.sourceContextId&&e.sourceModuleId){const{module:i}=Bn(e.sourceContextId,e.sourceModuleId);if(!i)return!1;const a=o=>{const s=hn(o).find(l=>l.id===n);s&&(s.name=String(t||"").trim()||s.name)};return a(i),i.inputScope==="activity"&&ln().map(o=>o.modules.find(s=>s.inputScope==="activity"&&s.slot===i.slot)).filter(Boolean).forEach(a),!0}return!1}function o6(e,n){if(!e||!n||n==="base")return!1;if(e.sourcePageTemplateId&&e.sourcePageTemplateNodeIndex!==void 0){const t=on(e.sourcePageTemplateId,e.sourcePageTemplateNodeIndex);return $S(t,n)}if(e.sourceContextId&&e.sourceModuleId){const{module:t}=Bn(e.sourceContextId,e.sourceModuleId);if(!t)return!1;const i=a=>PS(a,n);return i(t),t.inputScope==="activity"&&ln().map(a=>a.modules.find(o=>o.inputScope==="activity"&&o.slot===t.slot)).filter(Boolean).forEach(i),!0}return!1}function US(e,n){if(n==="base")return!1;const{graph:t}=wt(e),i=t.nodes.find(o=>o.variantId===n);if(!i)return!1;const a=new Set([n]);return e.guidedLineageGraph.nodes=t.nodes.filter(o=>o.id!==i.id),e.guidedLineageVariants=Zn(e).filter(o=>!a.has(o.id)),a.has(e.activeLineageVariantId)&&(e.activeLineageVariantId="base"),a.has(r.selectedLineageVariantId)&&(r.selectedLineageVariantId=Oi(e.guidedLineageGraph,i.dimensionId)[0]?.variantId||"base"),go(e,e.guidedLineageGraph),!0}function Fs(e,n){const t=ue(n.node),i={id:e.id,sourceContextId:e.sourceContextId,sourceModuleId:e.sourceModuleId,sourceSlot:e.sourceSlot,sourceInputScope:e.sourceInputScope,sourcePageTemplateId:e.sourcePageTemplateId,sourcePageTemplateNodeIndex:e.sourcePageTemplateNodeIndex,moduleGroupId:e.moduleGroupId,moduleGroupRole:e.moduleGroupRole,canvasPlacement:e.canvasPlacement,sourceLotteryNodeId:e.sourceLotteryNodeId,isLotteryResultPopup:e.isLotteryResultPopup,activeGuidedStateId:e.activeGuidedStateId,guidedStates:e.guidedStates,guidedLineageVariants:e.guidedLineageVariants,guidedLineageDimensions:e.guidedLineageDimensions,guidedLineageGraph:e.guidedLineageGraph};Object.assign(e,t,i,{activeLineageVariantId:n.id})}function r6(e){const n=Zn(e),t=n[0];if(n.some(o=>o.id===r.selectedLineageVariantId)||(r.selectedLineageVariantId=t.id),!ks(t.node).length)return'<div class="guided-panel-empty">当前组件没有可编辑的文案变量。</div>';const a="v3";return r.guidedLineageVersion=a,`
    <div class="guided-lineage-version-switch" aria-label="模块变量版本切换">
      <button class="active" data-guided-lineage-version="v3">版本 3</button>
    </div>
    ${s6(e)}
  `}function s6(e){const{base:n,graph:t}=wt(e);Zn(e);const i=zs(t);return ks(n.node).length?`
    <p>模块图总览，大维度独立成组，组内按表格铺开所有文案版本。</p>
    <div class="guided-lineage-v3-map" data-guided-lineage-map>
      <div
        class="guided-lineage-canvas guided-lineage-v3-canvas"
        style="transform:translate3d(${r.guidedLineagePanX}px, ${r.guidedLineagePanY}px, 0) scale(${r.guidedLineageZoom||1});"
      >
        ${i.map(o=>l6(e,o,n)).join("")}
      </div>
    </div>
  `:'<div class="guided-panel-empty">当前组件没有可编辑的文案变量。</div>'}function l6(e,n,t,i){const a=Oi(e.guidedLineageGraph,n.id);return`
    <section class="guided-lineage-v3-dimension">
      <header>
        <input
          value="${f(n.title)}"
          data-guided-lineage-dimension-title="${f(n.id)}"
          aria-label="大维度名称"
        />
        <span>${a.length} 个版本</span>
      </header>
      <div class="guided-lineage-v3-grid">
        ${a.map(o=>{const s=je(e,o.variantId)||t;return d6(e,s,t)}).join("")}
        <button class="guided-lineage-v3-add" data-guided-lineage-add-component="${f(n.id)}">
          <span>+</span>
          <strong>增加版本</strong>
        </button>
      </div>
    </section>
  `}function d6(e,n,t){const a=Ns(n.node,.2).previewHeight+40,o=r.selectedLineageVariantId===n.id,s=(e.activeLineageVariantId||t.id)===n.id;return`
    <section
      class="guided-lineage-v3-card ${o?"selected":""} ${s?"active":""}"
      data-guided-lineage-card="${f(n.id)}"
      style="--lineage-preview-height:${a}px;"
    >
      <header>
        <div>
          <input
            value="${f(n.title)}"
            data-guided-lineage-title="${f(n.id)}"
            aria-label="变体标题"
          />
        </div>
        <button data-guided-lineage-apply="${f(n.id)}">
          ${s?"当前页面":"应用"}
        </button>
      </header>
      <div class="guided-lineage-preview">
        <div class="guided-lineage-preview-inner">
          ${ge(n.node,{editableMode:"lineage",variantId:n.id,lineageInitialNode:t.node})}
        </div>
      </div>
    </section>
  `}function Ua(){const e=document.querySelector(".guided-lineage-canvas"),n=e?.closest("[data-guided-lineage-map]");if(!e||!n)return;const t=r.guidedLineageZoom||1,i=e.offsetWidth*t,a=e.offsetHeight*t,o=Math.min(140,n.clientWidth*.18),s=Math.min(120,n.clientHeight*.18),l=n.clientWidth-i,d=n.clientHeight-a,p=Math.min(0,l)-o,c=Math.max(0,l)+o,u=Math.min(0,d)-s,g=Math.max(0,d)+s;r.guidedLineagePanX=$e(r.guidedLineagePanX,p,c),r.guidedLineagePanY=$e(r.guidedLineagePanY,u,g),e.style.transform=`translate3d(${r.guidedLineagePanX}px, ${r.guidedLineagePanY}px, 0) scale(${t})`}function Ns(e,n=.72){let t=320;if(e.type==="molecule")t=(e.children||[]).reduce((a,o)=>{const s=ee(o.schemaId);return a+Number(s?.dimensions?.height||160)},24);else{const a=ee(e.schemaId);t=Number(a?.dimensions?.height||320)}const i=Math.max(120,Math.ceil(t*n)+8);return{previewHeight:i,sideAddTop:Math.max(62,Math.ceil(32+i/2))}}function Tr(){const e=new Set(["MoleculeContainer","核心权益模块-bigday发券-样式1-已报名","核心玩法模块-抽奖消返-3列","核心玩法模块-抽奖-已报名"]);return G.filter(t=>!e.has(t.id)).map(t=>({id:t.id,name:t.name,schema:t}))}function KS(){return[]}function p6(e,n){const t={sourceContextId:n.node.sourceContextId,sourceModuleId:n.node.sourceModuleId,sourceSlot:n.node.sourceSlot,sourceInputScope:n.node.sourceInputScope,sourcePageTemplateId:n.node.sourcePageTemplateId,sourcePageTemplateNodeIndex:n.node.sourcePageTemplateNodeIndex,canvasPlacement:n.node.canvasPlacement};if(e.startsWith("content:")){const u=e==="content:2"?J3:Br,g=ce("ContentModuleImage",{...n.node.props,src:u,alt:e==="content:2"?"内容模块 2":"内容模块"});return g.id=n.node.id,g.name=e==="content:2"?"内容模块 2":"内容模块",Object.assign(g,t),[g]}const i=G.find(u=>u.id===e)?.name||"";let a;if(a=yn(e),!a)return[];const s=(n.node.moduleGroupId?r.nodes.filter(u=>u.moduleGroupId===n.node.moduleGroupId):[]).filter(u=>u.moduleGroupRole==="task");if(!i.includes("九宫格"))return n.node.moduleGroupId&&(a.moduleGroupId=n.node.moduleGroupId,a.moduleGroupRole="play"),Object.assign(a,t),[a];const d=n.node.moduleGroupId||jn(),p=(a.children||[]).filter(u=>u.schemaId==="TaskModule");a.children=(a.children||[]).filter(u=>u.schemaId!=="TaskModule"),a.moduleGroupId=d,a.moduleGroupRole="lottery",a.name="九宫格抽奖";const c=s.length?s:p.length?p:KS();return c.forEach(u=>{u.moduleGroupId=d,u.moduleGroupRole="task",Object.assign(u,t)}),Object.assign(a,t),[a,...c]}function c6(e){return(e.type==="molecule"?e.children||[]:[e]).flatMap(t=>(t.variants||[]).map(i=>({node:t,variant:i})))}function mi(e){return e.guidedStates||[]}function u6(e){return mi(e).length>1||mo(e).length>0}function mo(e){if(e?.type!=="molecule")return[];let n=0;return(e.children||[]).map((t,i)=>{const a=mi(t);return a.length<2?null:(n+=1,{child:t,childIndex:i,label:e.schemaId==="任务列表"?`任务 ${n}`:`子组件 ${i+1} · ${t.name||t.schemaId}`,stateEntries:a})}).filter(Boolean)}const $i="__prdBoundPropKeys";function Te(e,n){if(!e||!n)return;const t=new Set(Array.isArray(e[$i])?e[$i]:[]);t.add(n),e[$i]=[...t]}function g6(e){return new Set(Array.isArray(e?.[$i])?e[$i]:[])}function $r(e){return String(e||"").match(/^prize(\d+)(Name|Text|Copy|Amount|Threshold|ButtonText)?$/)}function m6(e,n,t){const i=$r(t);if(!i||!e?.props||!n?.props)return;const a=i[1],o=i[2]||"",s=`prize${a}`,l=`prize${a}Name`,d=`prize${a}Text`,p=`prize${a}Copy`,c=e.props[t];if(n.props[t]=c,Te(n,t),(o==="Name"||o==="Text")&&s in n.props&&(n.props[s]=Gn(e.props[s]||n.props[s]||c,c)||c,Te(n,s)),o==="Copy"&&s in n.props&&(n.props[s]=On(e.props[s]||n.props[s]||"",c)||n.props[s],Te(n,s)),!o){const u=Pe(c);u?.name&&(n.props[l]=u.name,n.props[d]=u.name,Te(n,l),Te(n,d)),u?.copy&&(n.props[p]=u.copy,Te(n,p))}}function qS(e,n,t=new Set){!e||!n||(g6(e).forEach(i=>{!t.has(i)&&e.props&&n.props&&(i in n.props||$r(i))&&($r(i)?m6(e,n,i):(n.props[i]=e.props[i],Te(n,i)))}),(e.children||[]).forEach((i,a)=>{qS(i,n.children?.[a],t)}))}function gn(e,n){const t=e?.guidedStates?.find(l=>l.id===n);if(!e||!t)return!1;const i=t.node;e.schemaId=i.schemaId,e.name=t.name,e.type=i.type,e.allowedChildren=oe(i.allowedChildren||null),e.className=i.className||"";const a=new Set(t.lockedPropKeys||[]),o=oe(i.props);t.preserveProps&&Object.entries(e.props||{}).forEach(([l,d])=>{!a.has(l)&&l in o&&(o[l]=d)});const s=oe(i.children||[]);if(t.preserveBoundProps!==!1&&qS(e,{props:o,children:s},a),e.props=o,e.children=s,e.variants=oe(i.variants||[]),e.activeVariantId=i.activeVariantId||null,e.activeGuidedStateId=t.id,t.detailValues&&pn(e,new Map(Object.entries(t.detailValues))),dn(e)&&t.id==="unregistered"){const l=e.children?.[1],d=e.children?.[4];l?.props&&(l.props.hideProgressGraphic=!1),d?.props&&(d.props.buttonText="立即报名")}return!0}function Cr(e){if(e.imageUrl)return`<img class="guided-content-option-image" src="${f(e.imageUrl)}" alt="${f(e.name)}" />`;const n=yn(e.id);return n?(n.id=`prd_add_preview_${e.id}`,ge(n,{editable:!1})):e.schema?fo(e.schema):""}function Qe(e){const n=String(e?.canvasBackground||"").toLowerCase();return he.find(t=>t.id===e?.colorThemeId)||he.find(t=>t.background.toLowerCase()===n||String(t.solidBackground||"").toLowerCase()===n)||he[0]}function fi(e,n=Qe(e)){const t=e?.canvasBackground||n.background;return String(t||"").includes("gradient(")?n.background:t}function f6(e){const n=Qe(e);return`background:${fi(e,n)};background-position:top center;--guided-page-theme-filter:${n.filter};`}function mn(e=[],n,t=new WeakSet){e.forEach(i=>{if(!(!i||t.has(i))){if(t.add(i),i.type==="atom"){const a=ee(i.schemaId),o=si(a,n);if(o){i.activeVariantId=o.id;const s=Object.fromEntries(Wn(a,o));i.props={...ht(i.schemaId),...i.props||{},...s}}if(os(i,n),i.isLotteryResultPopup&&i.lotteryWinProps){const s=ee("弹窗-中奖"),l=si(s,n);if(l){const d=Object.fromEntries(Wn(s,l));i.lotteryWinProps={...i.lotteryWinProps||{},...d}}}}i.children?.length&&mn(i.children,n,t),(i.guidedStates||[]).forEach(a=>{a.node&&mn([a.node],n,t)}),(i.guidedLineageVariants||[]).forEach(a=>{a.node&&mn([a.node],n,t)})}})}function x6(e){const n=Q(),t=he.find(d=>d.id===e);if(!n||!t)return;if(r.workflowType==="resource"&&Ra("__themeId",t.id),r.pages.forEach(d=>{d.colorThemeId=t.id,d.canvasBackground=t.background,mn(d.nodes,t.id)}),r.view==="guided-preview"){r.workflowType==="resource"?Ts():At();return}const i=document.querySelector(`.guided-device-stage [data-page-id="${n.id}"]`);i&&(i.style.background=t.background,i.style.setProperty("--guided-page-theme-filter",t.filter),i.dataset.pageTheme=t.id);const a=document.querySelector(".guided-page-editor");if(!a)return;const o=a.querySelector(".guided-page-color-dot");o&&(o.style.background=`linear-gradient(135deg, ${t.primary} 0 50%, ${t.secondary} 50% 100%)`);const s=a.querySelector(".guided-page-color-picker strong");s&&(s.textContent=t.name);const l=a.querySelector(".guided-page-color-picker code");l&&(l.textContent=t.background),a.querySelectorAll("[data-guided-page-theme]").forEach(d=>{d.classList.toggle("active",d.dataset.guidedPageTheme===t.id)})}function h6(e){const n=Qe(e);return`
    <div class="guided-page-editor">
      <section class="guided-page-editor-section">
        <span>全局色系</span>
        <div class="guided-page-color-picker">
          <i
            class="guided-page-color-dot"
            style="background:linear-gradient(135deg, ${f(n.primary)} 0 50%, ${f(n.secondary)} 50% 100%)"
          ></i>
          <div>
            <strong>${v(n.name)}</strong>
            <code>${v(n.background)}</code>
            <em>同步切换组件与页面背景色</em>
          </div>
        </div>
        <div class="guided-page-color-swatches">
          ${["日常色系","节点色系"].map(t=>{const i=he.filter(a=>hk(a)===t);return i.length?`
                <div class="guided-page-color-group">
                  <strong>${v(t)}</strong>
                  <div>
                    ${i.map(a=>vk(a,n.id)).join("")}
                  </div>
                </div>
              `:""}).join("")}
        </div>
      </section>
    </div>
  `}function Es(e,n={}){const t=r.guidedPanelMode,i=t==="replace"?"更改模块":t==="states"?"查看状态":t==="hero-level"?"切换等级":t==="global"?e?.isLotteryResultPopup?"查看变量":"模块人群":t==="page"?"页面设置":t==="resource-main-visual"?"主体替换":t==="add"?"增加组件":"替换主体";let a="";if(t==="page")a=h6(Q());else if(t==="resource-main-visual"){const p=wk();a=`
      <p>选择后，挂件、下单页、挽留页、顶部 Banner 和个人中心 Banner 将同步替换。</p>
      <div class="guided-header-visual-options">
        ${bk().map(c=>`
            <button
              type="button"
              class="guided-header-visual-card ${p===c.id?"active":""}"
              data-guided-resource-main-visual="${f(c.id)}"
              aria-label="全局替换为${f(c.name)}"
            >
              <span><img src="${f(c.url)}" alt="" loading="lazy" /></span>
              <strong>${v(c.name)}</strong>
            </button>
          `).join("")}
      </div>
    `}else if(t==="global")a=JF(e);else if(t==="add")a=`
      <p>拖拽分子组件到页面模块之间；直接点击会追加到当前页面末尾。</p>
      <div class="guided-molecule-options">
        ${Tr().map(c=>`
              <div
                class="guided-molecule-card"
                role="button"
                tabindex="0"
                data-guided-add-molecule="${f(c.id)}"
                aria-label="增加${f(c.name)}"
              >
                <div class="guided-molecule-preview ${c.imageUrl?"is-content":""}">
                  <div class="guided-molecule-preview-inner ${c.imageUrl?"is-content":""}">
                    ${Cr(c)}
                  </div>
                </div>
                <div class="guided-molecule-card-meta">
                  <span>预存分子</span>
                  <strong>${v(c.name)}</strong>
                </div>
              </div>
            `).join("")}
      </div>
    `;else if(t==="replace")a=`
      <p>选择一个预存分子模块，替换后保留当前页面位置。</p>
      <div class="guided-molecule-options">
        ${Tr().map(c=>`
              <div
                class="guided-molecule-card"
                role="button"
                tabindex="0"
                data-guided-replace-molecule="${f(c.id)}"
                aria-label="替换为${f(c.name)}"
              >
                <div class="guided-molecule-preview ${c.imageUrl?"is-content":""}">
                  <div class="guided-molecule-preview-inner ${c.imageUrl?"is-content":""}">
                    ${Cr(c)}
                  </div>
                </div>
                <div class="guided-molecule-card-meta">
                  <span>预存分子</span>
                  <strong>${v(c.name)}</strong>
                </div>
              </div>
            `).join("")}
      </div>
    `;else if(t==="hero-level"){const p=Bi(e);a=`
      <p>选择头图等级，S级头图会同步页面背景和系统兜底页。</p>
      <div class="guided-business-states guided-header-level-options">
        ${cF(e).map(c=>`
            <button
              type="button"
              class="guided-business-state-card ${p===c.id?"active":""}"
              data-guided-header-level="${f(c.id)}"
              aria-label="切换为${f(c.name)}头图"
            >
              <header>
                <span>${v(c.name)}</span>
                <code>${v(c.node.schemaId)}</code>
              </header>
              <div class="guided-business-state-preview">
                <div class="guided-business-state-preview-inner">
                  ${ge(c.node,{editable:!1})}
                </div>
              </div>
              <p>${v(c.description)}</p>
            </button>
          `).join("")}
      </div>
    `}else if(t==="states"){const p=mi(e),c=mo(e),u=c6(e);a=p.length||c.length||u.length?`
        <p>这里展示组件包含的全部状态，可逐个切换并立即同步预览。</p>
        ${p.length?`
              <div class="guided-business-states">
                ${p.map(g=>`
                      <button
                        class="guided-business-state-card ${e.activeGuidedStateId===g.id?"active":""}"
                        data-guided-business-state="${f(g.id)}"
                        aria-label="切换为${f(g.name)}"
                      >
                        <header>
                          <span>${v(g.name)}</span>
                          <code>${v(g.component)}</code>
                        </header>
                        <div class="guided-business-state-preview">
                          <div class="guided-business-state-preview-inner">
                            ${ge(g.node,{editable:!1})}
                          </div>
                        </div>
                      </button>
                    `).join("")}
              </div>
            `:""}
        ${c.length?`
              <div class="guided-child-state-groups">
                ${c.map(g=>`
                  <section class="guided-child-state-group">
                    <header>
                      <strong>${v(g.label)}</strong>
                      <span>${v(g.child.name||g.child.schemaId)}</span>
                    </header>
                    <div class="guided-child-state-options">
                      ${g.stateEntries.map(w=>`
                        <button
                          type="button"
                          class="${g.child.activeGuidedStateId===w.id?"active":""}"
                          data-guided-child-state-node="${f(g.child.id)}"
                          data-guided-child-state="${f(w.id)}"
                        >
                          <strong>${v(w.name)}</strong>
                          <span>${v(w.component)}</span>
                        </button>
                      `).join("")}
                    </div>
                  </section>
                `).join("")}
              </div>
            `:""}
        <div class="guided-state-options">
          ${u.map(({node:g,variant:w})=>`
                <button
                  class="${g.activeVariantId===w.id?"active":""}"
                  data-guided-variant-node="${g.id}"
                  data-guided-variant="${w.id}"
                >
                  <strong>${v(w.name)}</strong>
                  <span>${v(g.name)}</span>
                </button>
              `).join("")}
        </div>
      `:'<div class="guided-panel-empty">当前组件只有默认状态，暂无其他变体。</div>'}else{const p=$v();a=`
      ${p.length?`
            <div class="guided-header-visual-options">
              ${p.map(c=>`
                    <button
                      type="button"
                      class="guided-header-visual-card ${(e?.props?.mainVisualImage||Z2)===c.url?"active":""}"
                      data-guided-header-main-visual="${f(c.url)}"
                      data-guided-header-main-visual-offset-y="${Number(c.offsetY||0)}"
                      data-guided-header-main-visual-scale="${Number(c.scale||1)}"
                      aria-label="替换为${f(c.name)}"
                    >
                      <span><img src="${f(c.url)}" alt="" loading="lazy" /></span>
                      <strong>${v(c.name)}</strong>
                    </button>
                  `).join("")}
            </div>
          `:'<div class="guided-panel-empty">把 PNG 主体图放到 头图/主体替换 文件夹后重新打开预览。</div>'}
    `}const o=t==="global"?"v3":r.guidedLineageVersion||"v3",s=t==="global"&&o==="v3"?"is-lineage-v3":"",l=t==="replace"?"is-replace":t==="add"?"is-add":t==="page"?"is-page":t==="global"&&e?.isLotteryResultPopup?"is-popup-variables":"",d=t==="page"?Q().dimension||Q().name:t==="resource-main-visual"?"全部资源位":t==="add"?Q()?.name||"当前页面":e?.name||"";return`
      <aside
        class="guided-floating-panel guided-operation-panel ${l} ${n.enter?"is-entering":""} ${t==="global"&&!e?.isLotteryResultPopup?`is-global is-lineage ${s}`:""}"
        role="dialog"
        aria-label="${f(i)}"
      >
      <header>
        <div>
          <span>${v(d)}</span>
          <h2>${i}</h2>
        </div>
        <button data-guided-close-panel aria-label="关闭">×</button>
      </header>
      <div class="guided-floating-panel-body">
        ${a}
      </div>
    </aside>
  `}function bn(e){const n=G.find(t=>t.id===e);return n&&/九宫格|消耗返1/.test(n.name||"")?"play":Sk[e]||"reward"}const _d=[];function b6(){const e=A(".activity-center");e&&(e.innerHTML=`
    <div class="activity-hero motion-lib-hero">
      <button class="back-btn" data-back-home>← 返回活动中心</button>
      <span class="motion-lib-kicker">Local Motion Assets</span>
      <h1>动效预览库</h1>
      <p>预览项目里的本地动效组件，用于校对素材、层级、尺寸和循环节奏。</p>
      <div class="motion-lib-summary">
        <span>共 ${_d.length} 个动效</span>
        <span>·</span>
        <span>全部来自本地 动效/ 目录</span>
        <span>·</span>
        <span>实时播放 CSS 动效</span>
      </div>
    </div>

    <section class="motion-preview-section">
      <div class="motion-preview-grid">
        ${_d.map(n=>y6(n)).join("")}
      </div>
    </section>
  `)}function y6(e){const n=Number(e.dimensions?.width||750),t=Number(e.dimensions?.height||559),i=ht(e.component);return`
    <article class="motion-preview-card" data-motion-preview="${f(e.id)}">
      <div class="motion-preview-stage">
        <div class="react-component-fit motion-preview-fit" style="--component-width:${n}px;--component-height:${t}px">
          <div
            class="react-component-host"
            style="width:${n}px;height:${t}px"
            data-react-component="${f(e.component)}"
            data-props="${f(JSON.stringify(i))}"
          ></div>
        </div>
      </div>
      <div class="motion-preview-info">
        <div>
          <span class="motion-preview-version">${v(e.version)}</span>
          <h2>${v(e.name)}</h2>
          <p>${v(e.description)}</p>
        </div>
        <dl>
          <div>
            <dt>尺寸</dt>
            <dd>${n} x ${t}</dd>
          </div>
          <div>
            <dt>路径</dt>
            <dd>${v(e.source)}</dd>
          </div>
        </dl>
      </div>
    </article>
  `}function xa(){window.renderReactMaterials?.(),requestAnimationFrame(()=>{window.renderReactMaterials?.()})}function w6(){return r.pageTemplateModalDimension||r.selectedDimension||Q()?.dimension,`
    <div class="create-modal-overlay" data-page-template-overlay>
      <div class="create-modal create-modal-large">
        <div class="create-modal-head">
          <h3>新增页面</h3>
          <button class="create-modal-close" data-close-page-template-modal>×</button>
        </div>

        <div class="create-step-label">
          <h4>页面结构配置</h4>
          <p>设置页面名称和所属维度</p>
        </div>

        <div class="structure-tree-config">
          ${[...new Set(r.pages.map(n=>n.dimension))].map((n,t)=>`
                <div class="structure-dimension-config">
                  <div class="structure-dimension-header">
                    <strong>${v(n)}</strong>
                    <span>${r.pages.filter(i=>i.dimension===n).length} 个页面</span>
                  </div>
                  <div class="structure-page-list">
                    ${r.pages.filter(i=>i.dimension===n).map(i=>`
                        <div class="structure-page-item">
                          <span>${v(i.name)}</span>
                        </div>
                      `).join("")}
                  </div>
                  <button class="add-page-btn" data-add-page-to-dimension="${n}">+ 添加页面到「${v(n)}」</button>
                </div>
              `).join("")}
        </div>

        <button class="add-dimension-btn" data-add-dimension-page-modal>+ 添加新维度</button>

        <div class="create-modal-footer">
          <button class="next-btn" data-add-blank-page>添加空白页</button>
        </div>
      </div>
    </div>
  `}function WS(){const{name:e,dimensions:n,pages:t}=r.createDraft;return`
    <div class="create-modal-overlay" data-create-modal-overlay>
      <div class="create-modal create-modal-large">
        <div class="create-modal-head">
          <h3>新建活动</h3>
          <button class="create-modal-close" data-close-create-modal>×</button>
        </div>

        <div class="create-step-label">
          <h4>活动结构配置</h4>
          <p>设置活动名称、维度和页面结构</p>
        </div>

        <div class="create-form-group">
          <label>活动名称</label>
          <input type="text" data-create-name value="${f(e)}" placeholder="请输入活动名称" />
        </div>

        <div class="structure-tree-config">
          ${n.map((i,a)=>`
                <div class="structure-dimension-config">
                  <div class="structure-dimension-header">
                    <input type="text" data-dimension-name="${a}" value="${f(i)}" placeholder="维度名称" />
                    ${n.length>1?`<button class="dimension-delete" data-delete-dimension="${a}" title="删除">×</button>`:""}
                  </div>
                  <div class="structure-page-list">
                    ${(t[i]||[]).map((o,s)=>`
                      <div class="structure-page-item">
                        <input type="text" data-page-name="${a}:${s}" value="${f(o.name)}" placeholder="页面名称" />
                        <button class="page-template-btn" data-select-page-template="${a}:${s}" title="选择模板">
                          ${o.templateId?'<span class="template-tag">已选</span>':'<span class="template-icon">T</span>'}
                        </button>
                        <button class="page-delete" data-delete-page="${a}:${s}" title="删除">×</button>
                      </div>
                    `).join("")}
                    ${(t[i]||[]).length===0?'<div class="structure-empty-page">暂无页面，点击下方按钮添加</div>':""}
                  </div>
                  <button class="add-page-btn" data-add-draft-page="${a}">+ 添加页面</button>
                </div>
              `).join("")}
        </div>

        <button class="add-dimension-btn" data-add-dimension>+ 添加维度</button>

        <div class="create-modal-footer">
          <button class="next-btn" data-create-next>创建并进入画布</button>
        </div>
      </div>
      ${r.draftTemplateModalOpen?v6():""}
    </div>
  `}function v6(){const n=[...pe.map(t=>({...t,isCustom:!1,canvasBackground:t.canvasBackground||t.background||"#ffffff"})),...ne];return n.length?`
    <div class="draft-template-modal" data-draft-template-modal>
      <div class="draft-template-content">
        <div class="draft-template-header">
          <h4>选择页面模板</h4>
          <button class="draft-template-close" data-close-draft-template-modal>×</button>
        </div>
        <div class="draft-template-body">
          <div class="draft-template-grid">
            ${n.map(t=>{const i=t.isCustom;return`
                <button class="draft-template-card ${i?"custom":""}" data-select-draft-template="${t.id}">
                  <div class="draft-template-preview" style="background:${t.canvasBackground||t.background||"#ffffff"}">
                    ${i?Kv(t):t.nodes.map(a=>qv(a)).join("")}
                  </div>
                  <div class="draft-template-name">${v(t.name)}</div>
                </button>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `:`
      <div class="draft-template-modal" data-draft-template-modal>
        <div class="draft-template-content">
          <div class="draft-template-header">
            <h4>选择页面模板</h4>
            <button class="draft-template-close" data-close-draft-template-modal>×</button>
          </div>
          <div class="draft-template-body">
            <p style="text-align: center; color: #999;">暂无可用模板</p>
          </div>
        </div>
      </div>
    `}function Zt(){const e=A(".structure-tree");if(!e)return;const n=r.pages.reduce((t,i)=>t+i.nodes.length,0);e.innerHTML=`
    <div class="structure-activity">
      <div>
        <strong contenteditable="true" spellcheck="false" data-edit-activity-name>${v(r.activity.name)}</strong>
        <span>${r.pages.length} 个页面 · ${n} 个模块</span>
      </div>
    </div>
    <div class="structure-list">
      ${Bs().map(t=>S6(t)).join("")}
    </div>
  `}function S6(e){return`
    <section class="structure-dimension">
      <div class="structure-dimension-head">
        <strong>${v(e.dimension)}</strong>
        <span>${e.pages.length} 页</span>
      </div>
      ${e.pages.map(n=>T6(n,r.pages.indexOf(n))).join("")}
    </section>
  `}function T6(e,n){const t=e.id===r.activePageId?"active":"",i=e.nodes.length?e.nodes.map(a=>XS(a)).join(""):'<div class="structure-empty">暂无模块</div>';return`
    <section class="structure-page ${t}" data-structure-page="${e.id}">
      <div class="structure-page-header">
        <button class="structure-page-head" data-structure-page="${e.id}">
          <span class="page-icon"></span>
          <strong>${v(e.name)}</strong>
          <span class="page-count">${e.nodes.length}</span>
        </button>
        <button class="structure-page-save-template" data-save-page-template="${e.id}" title="保存为模板">
          <span class="template-icon">+</span>
        </button>
      </div>
      <div class="structure-nodes">${i}</div>
    </section>
  `}function XS(e,n){const t=e.id===r.selectedId?"selected":"",i=e.type==="molecule"?"分子":"原子",a=e.children?.length?`<div class="structure-children">${e.children.map(o=>XS(o)).join("")}</div>`:"";return`
    <button class="structure-node ${t}" data-structure-node="${e.id}">
      <span class="node-type">${i}</span>
      <strong>${v(e.name)}</strong>
    </button>
    ${a}
  `}function Mn(e,n={}){ee(e);const t={id:`preview_${e}`,schemaId:e,type:"atom",props:ht(e,n)};return ge(t,{editable:!1})}function fo(e){const n=pi(e,di(e)),t=e.className?` ${e.className}`:"",i=String(e.className||"").split(/\s+/).includes("task-list-module")?"background:transparent;border-radius:0;padding:0;min-height:100px;overflow:visible;":"background:rgba(255,255,255,1);border-radius:12px;padding:12px;min-height:100px;";return n.length?`
    <div class="component molecule preview-molecule molecule-container${t}"
         style="${i}">
      ${n.map(([a,o])=>Mn(a,o)).join("")}
    </div>
  `:`
      <div class="component molecule preview-molecule molecule-container${t}"
           style="${i}">
        <div class="molecule-empty-hint" style="font-size:12px;">分子容器</div>
      </div>
    `}function YS(e,n){const t=Array.from(String(e??"")),i=Array.from(String(n??""));if(!t.length)return"";if(t.join("")===i.join(""))return v(t.join(""));const a=i.length+1,o=t.length+1,s=Array.from({length:a},()=>Array(o).fill(0));for(let c=i.length-1;c>=0;c-=1)for(let u=t.length-1;u>=0;u-=1)s[c][u]=i[c]===t[u]?s[c+1][u+1]+1:Math.max(s[c+1][u],s[c][u+1]);const l=new Set;let d=0,p=0;for(;d<i.length&&p<t.length;)i[d]===t[p]?(l.add(p),d+=1,p+=1):s[d+1][p]>=s[d][p+1]?d+=1:p+=1;return t.map((c,u)=>{const g=v(c);return l.has(u)?g:`<span class="lineage-char-changed">${g}</span>`}).join("")}function ha(e){const n=window.getSelection?.();if(!n||!n.rangeCount)return null;const t=n.getRangeAt(0);if(!e.contains(t.startContainer))return null;const i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let a=0,o=i.nextNode();for(;o;){if(o===t.startContainer)return a+t.startOffset;a+=o.textContent.length,o=i.nextNode()}return a}function JS(e,n){if(n==null)return;const t=window.getSelection?.();if(!t)return;const i=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let a=n,o=i.nextNode();for(;o;){const l=o.textContent.length;if(a<=l){const d=document.createRange();d.setStart(o,a),d.collapse(!0),t.removeAllRanges(),t.addRange(d);return}a-=l,o=i.nextNode()}const s=document.createRange();s.selectNodeContents(e),s.collapse(!1),t.removeAllRanges(),t.addRange(s)}function ZS(e,n){const t=ha(e),i=e.dataset.initialValue||"";e.classList.toggle("lineage-text-changed",n!==i);const a=e.dataset.lineageValuePrefix||"",o=e.dataset.lineageValueSuffix||"";e.innerHTML=`${v(a)}${YS(n,i)}${v(o)}`,JS(e,t)}function $6(e){let n=e.textContent||"";const t=e.dataset.lineageValuePrefix||"",i=e.dataset.lineageValueSuffix||"";return t&&n.startsWith(t)&&(n=n.slice(t.length)),i&&n.endsWith(i)&&(n=n.slice(0,-i.length)),n}function rn(e,n,t="span",i={}){let a="",o=v(e);if(i.mode==="canvas")a=`contenteditable="true" spellcheck="false" data-edit-prop="${n}"`;else if(i.mode==="variant")a=`contenteditable="true" spellcheck="false" data-variant-id="${i.variantId}" data-variant-prop="${n}"`;else if(i.mode==="lineage"){const s=`${i.lineagePrefix||""}${n}`,l=Ps(i.lineageInitialRoot||i.lineageInitialNode||{},s);a=`contenteditable="true" spellcheck="false" class="${(String(e??"")!==String(l??"")?" lineage-text-changed":"").trim()}" data-guided-lineage-inline="${f(`${i.variantId}|${s}`)}" data-initial-value="${f(l)}"`,o=YS(e,l)}return`<${t} ${a}>${o}</${t}>`}function QS(e,n){if(n?.schemaId!=="模块标题-正常")return n;const t=e?.schemaId==="AI智投"||e?.schemaId==="官方小助手模块";return{...n,props:{...n.props||{},useUnifiedTypography:t}}}function C6(e,n={}){const t=e.children||[],i=r.dropMoleculeId===e.id,a=t.length===0?"200px":"auto",o=e.className?` ${e.className}`:"",s=[];return t.length?(t.forEach((l,d)=>{i&&r.dropChildIndex===d&&s.push('<div class="molecule-drop-marker"></div>');const p=n.editableMode==="lineage"?{...n,lineagePrefix:`${n.lineagePrefix||""}${d}.`,lineageInitialRoot:n.lineageInitialRoot||n.lineageInitialNode,lineageInitialNode:n.lineageInitialNode?.children?.[d]}:n,c=QS(e,l);s.push(I6(c,d,e.id,p))}),i&&r.dropChildIndex===t.length&&s.push('<div class="molecule-drop-marker"></div>')):(i&&r.dropChildIndex===0&&s.push('<div class="molecule-drop-marker"></div>'),s.push('<div class="molecule-empty-hint">拖入原子组件到此处</div>')),`
    <div class="component molecule molecule-container${o}${i?" molecule-drop-target":""}"
         data-molecule-id="${e.id}"
         style="min-height:${a};">
      ${s.join("")}
    </div>
  `}function I6(e,n,t,i={}){const a=r.selectedId===e.id?"selected":"";return`
    <div class="node-wrap nested molecule-child ${e.schemaId==="SectionTitle"?"section-title-canvas-left":""} ${a}"
        data-select="${e.id}"
         data-node-id="${e.id}"
         data-parent-id="${t}"
         data-child-index="${n}">
      ${a?`<div class="node-label">${e.name}</div>`:""}
      ${ge(e,i)}
    </div>
  `}function k6(e={},n={}){const t=e.text||"立即投放上热门";return`
    <section class="component sticky-bottom-button-fallback">
      <div class="sticky-bottom-button-fallback__fade"></div>
      <div class="sticky-bottom-button-fallback__bar">
        <div class="sticky-bottom-button-fallback__button">
          ${rn(t,"text","span",n)}
        </div>
      </div>
    </section>
  `}function ge(e,n={}){yt(e)&&r.guidedLotteryPrizeOverrides&&co(e);const t=n.editable===!1?{}:{mode:n.editableMode||"canvas",variantId:n.variantId,lineagePrefix:n.lineagePrefix||"",lineageInitialNode:n.lineageInitialNode,lineageInitialRoot:n.lineageInitialRoot};if(e.type==="molecule")return C6(e,n);const i=ee(e.schemaId),a=i?ht(e.schemaId,e.props||{}):e.props||{},o=IP(e.schemaId,a);return i?.id==="StickyBottomButton"||e.schemaId==="StickyBottomButton"?k6(o,t):i?.reactComponent?P6(i,o,t):e.schemaId==="ContentModuleImage"?`
      <section class="component content-module-image">
        <img src="${f(o.src||Br)}" alt="${f(o.alt||"内容模块")}" />
      </section>
    `:e.schemaId==="coverImage"?`
      <section class="component cover-image" style="background:${o.background};color:${o.textColor}">
        <div class="cover-copy">
          ${rn(o.eyebrow,"eyebrow","span",t)}
          ${rn(o.title,"title","h2",t)}
          ${rn(o.subtitle,"subtitle","p",t)}
        </div>
        <div class="cover-visual" aria-hidden="true">
          <div class="cover-ticket"></div>
          <div class="cover-coin"></div>
        </div>
      </section>
    `:e.schemaId==="heroBanner"?`
      <section class="component banner" style="background:${o.background};color:${o.textColor}">
        ${rn(o.title,"title","h2",t)}
        ${rn(o.subtitle,"subtitle","p",t)}
      </section>
    `:e.schemaId==="textBlock"?`
      <section class="component text-block" style="background:${o.background}">
        ${rn(o.title,"title","h3",t).replace("<h3",`<h3 style="color:${o.titleColor}"`)}
        ${rn(o.body,"body","p",t).replace("<p",`<p style="color:${o.bodyColor}"`)}
      </section>
    `:e.schemaId==="priceCard"?`
      <section class="component price-card" style="background:${o.background}">
        ${rn(o.price,"price","div",t).replace("<div",`<div class="price" style="color:${o.priceColor}"`)}
        ${rn(o.caption,"caption","div",t).replace("<div",'<div class="caption"')}
      </section>
    `:`
    <section class="component cta" style="background:${o.background};color:${o.textColor}">
      ${rn(o.text,"text","span",t)}
      ${rn(o.hint,"hint","em",t)}
    </section>
  `}function P6(e,n,t){const i=t.mode||"",a=t.variantId||"",o=Number(e.dimensions?.width||700),s=Number(e.dimensions?.height||300),l=e.heightMode==="auto",d=["正文-活动规则样式3","正文-带底框样式1","正文-带消耗阶梯","正文-用户教育","弹窗-中奖"].includes(e.id),p=l?`--component-width:${o}px;--component-height:${s}px;${d?"min-height:0;":`min-height:${s}px;`}height:auto;`:`--component-width:${o}px;--component-height:${s}px`,c=l?`width:${o}px;${d?"min-height:0;":`min-height:${s}px;`}height:auto;`:`width:${o}px;height:${s}px`,u=t.lineagePrefix||"",g=i==="lineage"?JSON.stringify(t.lineageInitialNode?.props||{}):"";return`
    <div class="react-component-fit" style="${p}">
      <div
        class="react-component-host"
        style="${c}"
        data-react-component="${f(e.reactComponent)}"
        data-props="${f(JSON.stringify(n))}"
        data-edit-mode="${f(i)}"
        data-variant-id="${f(a)}"
        data-lineage-prefix="${f(u)}"
        data-lineage-initial-props="${f(g)}"
      ></div>
    </div>
  `}function z6(e,n=!1){const t=r.selectedId===e.id?"selected":"",i=e.schemaId==="SectionTitle"?"section-title-canvas-left":e.schemaId==="投放案例"?"placement-case-canvas":"",a=e.schemaId==="投放案例"?Is(e):ge(e);return`
    <div class="node-wrap ${n?"nested":"root"} ${i} ${t}" data-select="${e.id}" data-node-id="${e.id}">
      ${n?"":'<div class="drag-grip" title="拖拽排序">⋮⋮</div>'}
      ${t?`<div class="node-label">${e.name}</div>`:""}
      ${a}
    </div>
  `}function _s(){const e=A(".pages-row");e.innerHTML=`<div class="canvas-world"><div class="canvas-world-label">活动画布 · ${v(r.activity.name)}</div>${Bs().map(n=>`
        <div class="dimension-group ${r.selectedDimension===n.dimension?"selected":""}" data-dimension-group="${f(n.dimension)}" data-select-dimension="${f(n.dimension)}">
          <div class="dimension-group-title">
            <div class="dimension-lane-name">
              <strong contenteditable="true" spellcheck="false" data-edit-dimension="${f(n.dimension)}">${v(n.dimension)}</strong>
            </div>
          </div>
          <div class="dimension-page-titles">
            ${n.pages.map(t=>F6(t)).join("")}
          </div>
          <section class="dimension-lane ${r.selectedDimension===n.dimension?"selected":""}" data-dimension="${f(n.dimension)}">
            <div class="dimension-lane-toolbar">
              <button class="dimension-lane-add" data-add-page-dimension="${f(n.dimension)}">新增页面</button>
            </div>
            <div class="dimension-pages">
              ${n.pages.map(t=>N6(t)).join("")}
            </div>
          </section>
        </div>
      `).join("")}</div></div>`,document.fonts?.ready.then(E6),window.renderReactMaterials?.()}function Bs(){const e=[];return r.pages.forEach(n=>{const t=n.dimension||"未分组";let i=e.find(a=>a.dimension===t);i||(i={dimension:t,pages:[]},e.push(i)),i.pages.push(n)}),e}function F6(e){return`
    <div class="page-title" data-page-title="${e.id}">
      <div>
        <strong contenteditable="true" spellcheck="false" data-edit-page-name="${e.id}">${v(e.name)}</strong>
        <div class="page-condition-tags editable-tags" contenteditable="true" spellcheck="false" data-edit-page-tags="${e.id}">${v((e.tags||[]).join(" / "))}</div>
      </div>
      <div class="page-title-actions">
        <button class="page-nav-toggle ${e.navBarEnabled?"active":""}" data-toggle-page-navbar="${e.id}" aria-pressed="${e.navBarEnabled?"true":"false"}">
          ${e.navBarEnabled?"隐藏导航栏":"显示导航栏"}
        </button>
        <button class="delete-page-button" data-delete-page="${e.id}" ${r.pages.length<=1?"disabled":""} aria-label="删除${f(e.name)}">×</button>
      </div>
    </div>
  `}function N6(e){const n=[],t=e.id===r.activePageId;return e.nodes.length||(t&&r.dropPageId===e.id&&r.dropIndex===0&&n.push('<div class="drop-marker"></div>'),n.push(`<div class="empty-canvas">把左侧物料拖进页面<br />松手后加入${e.name}</div>`)),e.nodes.forEach((i,a)=>{t&&r.dropPageId===e.id&&r.dropIndex===a&&n.push('<div class="drop-marker"></div>'),n.push(z6(i))}),t&&r.dropPageId===e.id&&r.dropIndex===e.nodes.length&&n.push('<div class="drop-marker"></div>'),`
    <section class="page-shell ${t?"active":""}" data-page-shell="${e.id}">
      <div class="phone">
        <div class="page" data-page-id="${e.id}" style="background:${fi(e)}">
          ${n.join("")}
          ${e.navBarEnabled?eT():""}
        </div>
      </div>
    </section>
  `}function eT(){return`
    <div class="page-navbar-overlay" aria-hidden="true">
      <img src="${Y3}" alt="" />
    </div>
  `}function E6(){}function _6(){}function nT(){const e=A(".page-save-float");if(!e)return;if(!r.activePageId){e.classList.remove("open");return}const n=document.querySelector(`[data-page-id="${r.activePageId}"]`);if(!n){e.classList.remove("open");return}e.classList.add("open"),e.innerHTML=`
    <span class="float-icon">+</span>
    <span class="float-text">保存为模板</span>
  `,e.dataset.savePageFloat=r.activePageId;const t=n.getBoundingClientRect(),a=Math.min(window.innerWidth-150,t.right+12),o=Math.max(60,Math.min(t.top,window.innerHeight-48));e.style.left=`${a}px`,e.style.top=`${o}px`}function Tn(){const e=A(".quick-toolbar"),n=A(".variant-inspector"),t=A(".richtext-editor"),i=xe(r.nodes,r.selectedId);if(!i){e.classList.remove("open"),n.classList.remove("open"),t.classList.remove("open");return}const a=i.node;let o="";if(a.type==="molecule"&&a.children?.length>0&&(o+=`
      <button class="tool-button" data-toggle-props aria-label="变量">
        <span class="variant-icon">P</span>
        <span class="tool-tip">编辑分子变量</span>
      </button>
      <button class="tool-button" data-save-molecule aria-label="保存为分子">
        <span style="font-size:14px;font-weight:700;">+M</span>
        <span class="tool-tip">保存为分子模板</span>
      </button>
    `),a.type==="atom"){const s=Qk(a);o+=`
      <button class="tool-button color-button" data-toggle-colors aria-label="颜色">
        <span class="color-dot" style="background:${s}"></span>
        <input class="native-color-input" type="color" data-component-color-picker value="${s}" />
        <span class="tool-tip">颜色</span>
      </button>
      <button class="tool-button" data-toggle-variants aria-label="变体">
        <span class="variant-icon">V</span>
        <span class="tool-tip">变体</span>
      </button>
      <button class="tool-button" data-toggle-props aria-label="变量">
        <span class="variant-icon">P</span>
        <span class="tool-tip">编辑变量</span>
      </button>
      <div class="color-popover ${r.colorPanelOpen?"open":""}">
        ${mk.map(l=>`<button class="color-swatch" data-apply-color="${l}" style="background:${l}" aria-label="${l}"></button>`).join("")}
      </div>
    `}e.innerHTML=o,o?e.classList.add("open"):e.classList.remove("open"),r.variantPanelOpen&&a.type==="atom"?M6(i):n.classList.remove("open"),r.propsPanelOpen&&(a.type==="atom"||a.type==="molecule")?B6(i):t.classList.remove("open"),Et()}function B6(e){const n=A(".richtext-editor"),{node:t}=e;if(t.type==="molecule"){A6(n,t);return}const a=(ee(t.schemaId)?.props||[]).filter(o=>!o.isCssVar);if(!a.length){n.innerHTML=`
      <div class="inspector-head">
        <div>
          <strong>变量</strong>
          <span>${v(t.name)}</span>
        </div>
      </div>
      <p class="inspector-note">这个组件暂时没有可编辑变量。</p>
    `,n.classList.add("open");return}n.innerHTML=`
    <div class="inspector-head">
      <div>
        <strong>变量</strong>
        <span>${v(t.name)} · ${a.length} 项</span>
      </div>
    </div>
    <div class="node-prop-list">
      ${a.map(o=>Ir(t,o)).join("")}
    </div>
  `,n.classList.add("open")}function A6(e,n){const i=(G.find(l=>l.id===n.schemaId)?.props||[]).filter(l=>!l.isCssVar),o=(n.children||[]).map((l,d)=>{const c=(ee(l.schemaId)?.props||[]).filter(u=>!u.isCssVar);return{child:l,index:d,props:c}}).filter(l=>l.props.length);if(!i.length&&!o.length){e.innerHTML=`
      <div class="inspector-head">
        <div>
          <strong>分子变量</strong>
          <span>${v(n.name)}</span>
        </div>
      </div>
      <p class="inspector-note">这个分子内部暂时没有可编辑变量。</p>
    `,e.classList.add("open");return}const s=i.length+o.reduce((l,d)=>l+d.props.length,0);e.innerHTML=`
    <div class="inspector-head">
      <div>
        <strong>分子变量</strong>
        <span>${v(n.name)} · ${s} 项</span>
      </div>
    </div>
    <div class="node-prop-list molecule-prop-list">
      ${i.length?`
        <section class="molecule-prop-group">
          <header>${v(n.name||n.schemaId)}</header>
          ${i.map(l=>Ir(n,l)).join("")}
        </section>
      `:""}
      ${o.map(({child:l,index:d,props:p})=>`
            <section class="molecule-prop-group">
              <header>${v(d+1)}. ${v(l.name||l.schemaId)}</header>
              ${p.map(c=>Ir(l,c,{childIndex:d})).join("")}
            </section>
          `).join("")}
    </div>
  `,e.classList.add("open")}function Ir(e,n,t={}){const i=n.key||n.name,a=e.props?.[i]??n.default??"",o=n.type||"string",s=`${e.id}_${i}`,l=Number.isInteger(t.childIndex)?` data-node-prop-child-index="${t.childIndex}"`:"";let d="";return o==="boolean"?d=`
      <label class="node-prop-switch">
        <input type="checkbox" data-node-prop-input="${f(i)}"${l} ${a?"checked":""} />
        <span>${a?"开启":"关闭"}</span>
      </label>
    `:o==="color"?d=`<input id="${f(s)}" type="color" data-node-prop-input="${f(i)}"${l} value="${String(a).startsWith("#")?f(String(a)):"#ffffff"}" />`:o==="number"?d=`<input id="${f(s)}" type="number" data-node-prop-input="${f(i)}"${l} value="${f(String(a))}" />`:rt(n)?d=An(n,a,`id="${f(s)}" data-node-prop-input="${f(i)}"${l}`,n.label||i):In(n)?d=ua(a,`data-node-prop-input="${f(i)}"${l}`,`${e.name} ${n.label||i}`,`data-node-prize-name-input="${f(i)}"${l}`,`data-node-prize-copy-input="${f(i)}"${l}`,`data-node-prize-amount-input="${f(i)}"${l}`):d=`<textarea id="${f(s)}" data-node-prop-input="${f(i)}"${l} rows="${String(a).length>48?3:1}">${v(String(a))}</textarea>`,`
    <div class="node-prop-item">
      <label for="${f(s)}">${v(n.label||i)}</label>
      <code>${v(i)}</code>
      ${n.description?`<p>${v(n.description)}</p>`:""}
      ${d}
    </div>
  `}function M6(e){const n=A(".variant-inspector"),{node:t,parent:i}=e;if(t.type==="molecule"){n.innerHTML=`
      <div class="inspector-head">
        <div>
          <strong>变体</strong>
          <span>分子本身没有变体</span>
        </div>
      </div>
      <p class="inspector-note">请点选分子内部的原子组件，查看并编辑它的变体。</p>
    `,n.classList.add("open");return}const a=t.variants||[],o=a.length?a.map(s=>j6(t,s)).join(""):'<p class="inspector-note">这个组件暂时没有配置变体。</p>';n.innerHTML=`
    <div class="inspector-head">
      <div>
        <strong>变体</strong>
        <span>${i?"分子内原子":"当前原子"} · ${a.length} 个</span>
      </div>
    </div>
    <div class="variant-list">${o}</div>
  `,n.classList.add("open")}function j6(e,n){const t=e.activeVariantId===n.id?"active":"",i={...e,props:{...e.props,...n.props}};return`
    <section class="variant-card ${t}" data-apply-variant="${n.id}">
      <div class="variant-card-head">
        <strong>${v(n.name)}</strong>
        <small>${t?"当前使用":"点击使用"}</small>
      </div>
      <div class="variant-preview">
        ${R6(i,n)}
      </div>
    </section>
  `}function R6(e,n){return ge(e,{editableMode:"variant",variantId:n.id})}let aa=null;function Et(){aa&&cancelAnimationFrame(aa),aa=requestAnimationFrame(()=>{aa=null;const e=A(".quick-toolbar"),n=A(".variant-inspector"),t=A(".richtext-editor"),i=document.querySelector(`[data-node-id="${r.selectedId}"]`);if(!i||!e.classList.contains("open"))return;const a=i.getBoundingClientRect(),s=Math.min(window.innerWidth-96,a.right+10),l=Math.max(60,Math.min(a.top,window.innerHeight-e.offsetHeight-16));e.style.left=`${s}px`,e.style.top=`${l}px`,n.classList.contains("open")&&(n.style.left=`${Math.min(window.innerWidth-340,s+58)}px`,n.style.top=`${l}px`),t.classList.contains("open")&&(t.style.left=`${Math.min(window.innerWidth-360,s+58)}px`,t.style.top=`${l}px`)})}function H6(e,n=r.activePageId){const i=[...(document.querySelector(`[data-page-shell="${n}"]`)||document).querySelectorAll(".node-wrap.root")];if(!i.length)return 0;for(let a=0;a<i.length;a+=1){const o=i[a].getBoundingClientRect();if(e.clientY<o.top+o.height/2)return a}return i.length}function D6(e){return document.elementsFromPoint(e.clientX,e.clientY).find(t=>t.matches?.("[data-molecule-id]"))?.dataset.moleculeId||null}function L6(e,n){const t=document.querySelector(`[data-molecule-id="${n}"]`);if(!t)return null;const i=[...t.querySelectorAll(":scope > .molecule-child")];if(!i.length)return 0;for(let a=0;a<i.length;a+=1){const o=i[a].getBoundingClientRect();if(e.clientY<o.top+o.height/2)return a}return i.length}function G6(e){return document.elementsFromPoint(e.clientX,e.clientY).find(n=>n.matches?.("[data-page-id]"))}function O6(){return{version:"0.1.0",activity:oe(r.activity),viewport:{width:750},activePageId:r.activePageId,pages:r.pages.map(e=>({id:e.id,name:e.name,tags:oe(e.tags||[]),dimension:e.dimension||"未分组",canvas:{background:e.canvasBackground},navBarEnabled:!!e.navBarEnabled,nodes:oe(e.nodes)}))}}const Bd={"投稿赢流量-样式3":{exportBottomSpace:22},"核心玩法模块-抽奖消返-3列":{exportWidth:Xe,exportSideSpace:Yl},"核心玩法模块-抽奖消返-4列":{exportWidth:Xe,exportSideSpace:Yl},账户优惠券提示:{exportPropOverrides:{hideExportMetaNumbers:!0}},提示:{exportPropOverrides:{contentText:"",text:"",description:""}}};function Vi(e){return Bd[e?.schemaId]||Bd[e?.name]||{}}function kr(e,n={}){const t=Vi({schemaId:e,name:e});return{...n,...t.exportPropOverrides||{}}}function tT(e){const n=e?.schemaId||e?.name||"";return Hn(n,e?.name||n||"模块")}function Ui(e){const n=ue(e?.node||e?.sourceNode||{});return e?.pageTheme?.id&&mn([n],e.pageTheme.id),so(n)}function iT(e){const n=e?.schemaId||e?.name||"";return["任务条-样式1","任务条-样式1-点击后","TaskModule"].includes(n)}function aT(e){const n=e?.schemaId||e?.name||"";return["置底按钮","StickyBottomButton"].includes(n)}function gt(e){const n=e?.schemaId||e?.id||e?.name||"";return n==="头图"||n==="HeaderImage"||n==="S级-中秋头图"}function oT(e){if(r.workflowType==="resource")return 0;if(e?.isFallbackContentEntry)return Number(e.fallbackContentBottomSpace||0);if(e?.exportKind==="page-background"||e?.exportKind==="fallback-page"||e?.exportKind==="case-showcase-shell"||e?.exportKind==="case-showcase-card"||e?.exportKind==="lottery-popup"||e?.exportKind==="task-list-title"||e?.exportKind==="node-guide-title"||e?.exportKind==="node-guide-card")return 0;const n=e?.node||e?.sourceNode||{},t=Vi(n);return Number.isFinite(Number(t.exportBottomSpace))?Math.max(0,Number(t.exportBottomSpace)):n?.type==="atom"&&gt(n)||n?.type==="atom"&&aT(n)?0:n?.type==="atom"&&iT(n)?q2:K2}function Re(e){return String(e||"module").replace(/[\\/:*?"<>|]/g,"_").replace(/\s+/g,"_").slice(0,80)}function bi(e){const n=new Set(["默认维度","维度1","默认版本","默认状态","系统状态","默认文案"]);return String(e||"").split(/\s*·\s*/).map(t=>t.trim()).filter(t=>t&&!n.has(t.replace(/\s+/g,"")))}function rT(e,n,t,i,a={}){const o=a.pageName||"",s=a.exportKind||"",l=bi(o);if(s==="page-background"){const c=[...l,"页面背景",...bi(i||"背景+头图")];return`${Re(c.join("_")||"页面背景")}.png`}const d=[...l,...bi(e),...bi(t),...bi(i)],p=d.filter((c,u)=>d.findIndex(g=>N(g)===N(c))===u);return`${Re(p.join("_")||"切图")}.png`}function sT(e){if(!e)return"页面";if(e.isSystemFallback){const t=r.pages.filter(i=>i?.isSystemFallback).findIndex(i=>i.id===e.id);return`兜底页面${t>=0?t+1:""}`}const n=r.pages.filter(t=>!t?.isSystemFallback).findIndex(t=>t.id===e.id);return n>0?`主页面${n+1}`:"主页面"}function Ki(e){const n=oT(e),t=e?.node||e?.sourceNode||{};if(r.workflowType==="resource"&&e?.exportKind!=="page-background"){const o=e?.dimensions||Rn(t);return{width:Number(o.width||300),height:Number(o.height||300)}}if(e?.exportKind==="page-background")return{width:Xe,height:Number(e.dimensions?.height||1334)};if(gt(t)){const o=ee(t.schemaId||t.name);return{width:Xe,height:Number(o?.dimensions?.height||Ca)}}if(e?.dimensions)return{width:Number(e.dimensions.width||Xe),height:Number(e.dimensions.height||300)+n};const i=Rn(t),a=Vi(t);return{...i,width:Number(a.exportWidth||Xe),height:Number(i.height||300)+n}}function As(e){const n=e?.node||e?.sourceNode||{};return e?.exportKind==="page-background"||e?.exportKind==="fallback-page"||e?.exportKind==="case-showcase-card"||e?.exportKind==="node-guide-card"||gt(n)}function Ad(e,n,t){if(n>=t-1)return 0;const i=String(e?.className||"").split(/\s+/);return i.includes("task-list-module")?16:i.includes("bigday-coupon-style1")?[32,24,16][n]??0:i.includes("bigday-coupon-style2")?[24,24][n]??0:i.includes("consumption-return-style1-3col")||i.includes("lottery-consumption-return-3col")||i.includes("lottery-consumption-return-4col")?[40,32,32,40][n]??0:i.includes("lottery-unregistered-module")?[24,24,24][n]??0:i.includes("lottery-registered-module")?[24,24,26][n]??0:i.includes("traffic-submission-module")?[32,32,32][n]??0:i.includes("traffic-submission-style3-module")?[32,32,32][n]??0:i.includes("content-diagnosis-clicked-module")?[32,24,24][n]??0:i.includes("content-diagnosis-quality-video-module")?[32,32][n]??0:i.includes("user-education-case-style1-module")?[32][n]??0:i.includes("user-education-case-style2-module")?[32,32][n]??0:i.includes("user-education-guide-module")?[32,32][n]??0:i.includes("ai-smart-invest-module")?[32,32][n]??0:i.includes("core-benefit-coupon-style2-module")?[32,32][n]??0:i.includes("placement-lottery-module")?[32,16,32,32][n]??0:24}function Rn(e){if(e?.type==="molecule"){const t=e.children||[],i=t.map(Rn),a=String(e.className||"").split(/\s+/),o=a.includes("task-list-module")?0:96;if(a.includes("user-education-case-style1-module"))return{width:702,height:Math.max(120,o+i.reduce((d,p,c)=>d+Number(p.height||0)+Ad(e,c,t.length),0))};const s=Math.max(702,...i.map(d=>Number(d.width||0))),l=Math.max(120,o+i.reduce((d,p,c)=>d+Number(p.height||0)+Ad(e,c,t.length),0));return{width:s,height:l}}const n=ee(e.schemaId||e.name);return{width:Number(n?.dimensions?.width||750),height:Number(n?.dimensions?.height||300)}}function lT(e){return(e?.nodes||[]).filter(n=>n?.canvasPlacement!=="page-side")}function V6(e,n,t){return bn(e?.schemaId)==="hero"&&n<t.length-1?0:32}function Ms(e){if(!e?.isSystemFallback)return null;const n=Array.isArray(e.tags)?e.tags:[],t=Array.isArray(e.nodes)?e.nodes:[],i=o=>n.includes(o)||e.name===o,a=o=>t.some(s=>s?.schemaId===o);return i("活动火爆")||a("无活动提示")?{bottomSpace:W2,pageHeight:X2}:i("内容案例")||a("用户教育案例-样式1")?{bottomSpace:Y2,pageHeight:J2}:{bottomSpace:Number(e.fallbackBottomSpace||0),pageHeight:Number(e.fallbackPageHeight||1334)}}function dT(e){if(e?.isSystemFallback){const i=Ms(e);return Math.max(1334,Number(i?.pageHeight||1334))}const n=lT(e),t=n.reduce((i,a,o)=>{const s=Rn(a);return i+Number(s.height||0)+V6(a,o,n)},0);return Math.max(1334,Math.ceil(t))}function U6(e){return e?.schemaId==="任务列表"||e?.name==="任务列表"||String(e?.className||"").split(/\s+/).includes("task-list-module")}function K6(e){return e?.schemaId==="用户教育案例-样式1"||e?.name==="用户教育案例-样式1"||String(e?.className||"").split(/\s+/).includes("user-education-case-style1-module")}function q6(e){return e?.schemaId==="节点指南"||e?.name==="节点指南"||String(e?.className||"").split(/\s+/).includes("node-guide-module")}function W6(e){return e?.isLotteryResultPopup||e?.schemaId==="弹窗-中奖"||e?.name==="弹窗-中奖"}function pT(e,n){const t=ue(e);return n?.id&&gn(t,n.id),t}function oa(e){const n=Q(),t=Qe(n);e&&t?.id&&mn([e],t.id)}function cT(e){Kr(e);const n=mi(e);return n.length?n:[{id:"default",name:"默认状态",node:e}]}function Yn({page:e,node:n,nodeIndex:t,exportNode:i,dimensionTitle:a,variantTitle:o,idParts:s=[],fileParts:l=[],stateFolderTitle:d="",exportKind:p="",dimensions:c}){const u=tT(n),g=`${String(t+1).padStart(2,"0")}_${u}`,w=sT(e),y=rT(u,t,a,o,d);return{id:[e.id,n.id,...s].map(Re).join("__"),pageId:e.id,pageName:w,pageTheme:Qe(e),nodeId:n.id,moduleTitle:u,moduleFolderTitle:g,dimensionTitle:a,variantTitle:o,sourceNode:n,node:i,exportKind:p,dimensions:c,fileName:y,filePath:[Re(w),g,d?Re(d):"",y].filter(Boolean).join("/")}}function xo(e){co(e);const{base:n,graph:t}=wt(e),i=e?.props?.mainVisualImage;if(gt(e)&&i!==void 0){const a=Number(e?.props?.mainVisualOffsetY||0),o=Number(e?.props?.mainVisualScale||1);zt(n.node,i,a,o),(e.guidedLineageVariants||[]).forEach(s=>zt(s.node,i,a,o))}return(t.nodes||[]).map((a,o)=>{const s=je(e,a.variantId)||n;return{graphNode:a,variant:s,variantIndex:o,dimensionTitle:tN(t,a),variantTitle:s.title||`版本 ${o+1}`}})}function X6(e,n,t){return xo(n).flatMap(({graphNode:i,variant:a,dimensionTitle:o,variantTitle:s})=>{const l=a.node?.children?.[0],d=l?Yn({page:e,node:n,nodeIndex:t,exportNode:ue(l),dimensionTitle:o,variantTitle:`${s} · 模块标题`,idParts:[i.dimensionId||"dimension",a.id||"variant","task-list-title"],fileParts:[s],exportKind:"task-list-title",dimensions:{width:Xe,height:50.09}}):null,c=mo(a.node).flatMap((u,g)=>cT(u.child).map(w=>{const y=Va(w),h=w?.node?pT(u.child,w):ue(u.child),x=u.label||`任务 ${g+1}`;return Yn({page:e,node:{...u.child,id:`${n.id}_${a.id}_${u.child.id}`,name:`${tT(n)} · ${x}`},nodeIndex:t,exportNode:h,dimensionTitle:o,variantTitle:`${s} · ${x} · ${y}`,idParts:[i.dimensionId||"dimension",a.id||"variant",`task-${u.childIndex+1}`,w.id||"default"],fileParts:[x,s]})}));return d?[d,...c]:c})}function Y6(e,n,t){const i=[{title:"随拍",offsetX:0,contentWidth:347,width:389,height:1026},{title:"旅行",offsetX:387,contentWidth:347,width:389,height:1027},{title:"科普",offsetX:774,contentWidth:347,width:347,height:1023}];return xo(n).flatMap(({graphNode:a,variant:o,dimensionTitle:s,variantTitle:l,variantIndex:d})=>{const p=ue(o.node),c=p.children?.[0],u=p.children?.[1];if(!c||!u)return js(e,n,t);const g={...p,children:[c]},w=Rn(p).height,y=Yn({page:e,node:n,nodeIndex:t,exportNode:g,dimensionTitle:s,variantTitle:`${l} · 标题底板`,idParts:[a.dimensionId||"dimension",o.id||d,"case-showcase-shell"],fileParts:[l],exportKind:"case-showcase-shell",dimensions:{width:Xe,height:w}}),h=i.map((x,$)=>({...Yn({page:e,node:n,nodeIndex:t,exportNode:ue(u),dimensionTitle:s,variantTitle:`${l} · ${x.title}`,idParts:[a.dimensionId||"dimension",o.id||d,`case-showcase-card-${$+1}`],fileParts:[l],exportKind:"case-showcase-card",dimensions:{width:x.width,height:x.height}}),caseCardIndex:$,caseCardOffsetX:x.offsetX,caseCardContentWidth:x.contentWidth}));return[y,...h]})}function J6(e,n,t){const i=[{prop:"card1IndustryTitle",title:"服装配饰行业",offsetX:0,offsetY:0},{prop:"card2IndustryTitle",title:"文体娱乐行业",offsetX:680,offsetY:0},{prop:"card3IndustryTitle",title:"餐饮服务行业",offsetX:1360,offsetY:0},{prop:"card4IndustryTitle",title:"传媒资讯行业",offsetX:2040,offsetY:0}];return xo(n).flatMap(({graphNode:a,variant:o,dimensionTitle:s,variantTitle:l,variantIndex:d})=>{const p=ue(o.node),c=p.children?.[0],u=p.children?.[1];if(!c||!u)return js(e,n,t);const g=Yn({page:e,node:n,nodeIndex:t,exportNode:{...p,children:[c]},dimensionTitle:s,variantTitle:`${l} · 模块标题`,idParts:[a.dimensionId||"dimension",o.id||d,"node-guide-title"],fileParts:[l],exportKind:"node-guide-title",dimensions:{width:Xe,height:50.09}}),w=i.map((y,h)=>{const x=String(u.props?.[y.prop]||y.title).replace(/[「」]/g,"").trim();return{...Yn({page:e,node:n,nodeIndex:t,exportNode:ue(u),dimensionTitle:s,variantTitle:`${l} · ${x}`,idParts:[a.dimensionId||"dimension",o.id||d,`node-guide-card-${h+1}`],fileParts:[l],exportKind:"node-guide-card",dimensions:{width:640,height:637.81}}),nodeGuideCardOffsetX:y.offsetX,nodeGuideCardOffsetY:y.offsetY}});return[g,...w]})}function Z6(e,n,t){Nt(n);const i=n.lotteryWinProps||n.props||{},a=Math.max(1,Number(i.prizeCount||1)),o=Array.from({length:a},(d,p)=>{const c=p+1,u=Pe(i[`prize${c}`]),g=String(i[`prize${c}Text`]||u?.name||`奖品${c}`).trim(),w=gi(g),y=ue(n);return vr(y,"弹窗-中奖",{...i,selectedPrizeIndex:c,amountText:w.amountText,prizeText:w.prizeText,prizeSubText:(Number(i.selectedPrizeIndex)===c?i.prizeSubText:"")||i[`prize${c}Copy`]||u?.copy||"满30元赠价值5元流量",buttonText:i[`prize${c}ButtonText`]??i.buttonText??"开心收下"}),y.isLotteryResultPopup=!0,y.activeLotteryPopupResult="win",y.lotteryWinProps={...y.props||{}},Yn({page:e,node:n,nodeIndex:t,exportNode:y,dimensionTitle:"抽奖结果",variantTitle:`中奖${c} · ${g}`,idParts:["popup-win",c],fileParts:["中奖"],exportKind:"lottery-popup",dimensions:Rn(y)})}),s=ce("弹窗-未中奖");s.id=`${n.id}_lose`,mn([s],Qe(e).id);const l=Yn({page:e,node:s,nodeIndex:t,exportNode:s,dimensionTitle:"抽奖结果",variantTitle:"未中奖",idParts:["popup-lose"],fileParts:["未中奖"],exportKind:"lottery-popup",dimensions:Rn(s)});return[...o,l]}function js(e,n,t){return xo(n).flatMap(({graphNode:i,variant:a,dimensionTitle:o,variantTitle:s,variantIndex:l})=>{const d=cT(a.node),p=mi(a.node).length>0;return d.map(c=>{const u=p?Va(c):"",g=p?pT(a.node,c):ue(a.node);return co(g),{...Yn({page:e,node:n,nodeIndex:t,exportNode:g,dimensionTitle:o,variantTitle:u?`${s} · ${u}`:s,stateFolderTitle:u,idParts:[i.dimensionId||"dimension",a.id||l,c.id||"default"]}),stateGroupKey:[i.dimensionId||"dimension",a.id||l].join("|")}})})}function Q6(e,n){const t=document.createElement("a");t.download=e,t.href=n,document.body.appendChild(t),t.click(),t.remove()}function qi(e,n){const t=URL.createObjectURL(n);Q6(e,t),window.setTimeout(()=>URL.revokeObjectURL(t),1e4)}function uT(e){return[...document.querySelectorAll("[data-export-cut-id]")].find(n=>n.dataset.exportCutId===e)}const ra=new Map;function eN(e){const n=new Set;return[e,...e.querySelectorAll("*")].forEach(t=>{String(getComputedStyle(t).fontFamily||"").split(",").map(i=>i.trim().replace(/^['"]|['"]$/g,"")).filter(Boolean).forEach(i=>n.add(i))}),[...n].sort().join("|")}function gT(e){const n=eN(e);if(!ra.has(n)){const t=t3(e).catch(i=>{throw ra.delete(n),console.error("[guided-export] font embedding failed",i),new Error(`字体嵌入失败，请重试：${i?.message||"未知错误"}`)});ra.set(n,t)}return ra.get(n)}async function mT(e,n={}){const t=Number(n.width||Xe);if(window.waitForReactMaterialFonts&&await window.waitForReactMaterialFonts(e),document.fonts?.ready)try{await document.fonts.ready}catch(s){console.warn("[guided-export] font readiness skipped",s)}await Mi();const i=Number(n.height||Math.ceil(Math.max(e.scrollHeight,e.offsetHeight)));if(!t||!i)throw new Error("empty export component");const a=await gT(e),o=await n3(e,{width:t,height:i,pixelRatio:n.pixelRatio||1,cacheBust:!1,fontEmbedCSS:a,backgroundColor:"transparent",style:{width:`${t}px`,minHeight:`${i}px`,overflow:"visible",transform:"none",transformOrigin:"top left","--react-component-scale":"1"}});if(!o)throw new Error("failed to create png blob");return o}async function nN(e,n={}){const t=Number(n.width||Xe);if(window.waitForReactMaterialFonts&&await window.waitForReactMaterialFonts(e),document.fonts?.ready)try{await document.fonts.ready}catch(o){console.warn("[guided-export] font readiness skipped",o)}const i=Number(n.height||Math.ceil(Math.max(e.scrollHeight,e.offsetHeight)));if(!t||!i)throw new Error("empty export component");const a=await gT(e);return N2(e,{width:t,height:i,pixelRatio:1,cacheBust:!1,fontEmbedCSS:a,backgroundColor:"transparent",style:{width:`${t}px`,minHeight:`${i}px`,overflow:"visible",transform:"none",transformOrigin:"top left","--react-component-scale":"1"}})}function tN(e,n){const i=e?.dimensions?.find(a=>a.id===n?.dimensionId)?.title||"默认维度";return i==="维度 1"?"默认维度":i}function iN(e){const n="背景",t="00_背景",i="页面背景",a="背景+头图",o=sT(e),s=rT(n,-1,i,a,{pageName:o,exportKind:"page-background"});return{id:[e.id,"page-background","header"].map(Re).join("__"),pageId:e.id,pageName:o,pageTheme:Qe(e),moduleTitle:n,moduleFolderTitle:t,dimensionTitle:i,variantTitle:a,sourceNode:_e(e),node:_e(e),exportKind:"page-background",dimensions:{width:Xe,height:dT(e)},fileName:s,filePath:[Re(o),s].join("/")}}function fT(e,n,t){return W6(n)?Z6(e,n,t):U6(n)?X6(e,n,t):K6(n)?Y6(e,n,t):q6(n)?J6(e,n,t):js(e,n,t)}function aN(e){return lT(e).filter(t=>bn(t?.schemaId)!=="hero").flatMap((t,i)=>fT(e,t,i).map(a=>({...a,isFallbackContentEntry:!0,fallbackContentBottomSpace:0})))}function oN(e){return["","一","二","三","四","五","六","七","八","九","十"][e]||String(e)}function rN(e){const n=new Map;return e.map(t=>{const i=Re(t.exportKind==="lottery-popup"?"弹窗":t.pageName||t.pageId||"页面"),a=String(t.fileName||"切图.png").replace(/\.png$/i,""),o=`${i}/${Re(a)}`,s=(n.get(o)||0)+1;n.set(o,s);const l=s>1?`${Re(`${a}_副本${oN(s)}`)}.png`:`${Re(a)}.png`;return{...t,fileName:l,filePath:[i,l].join("/")}})}function ho(){const e=r.pages.flatMap(n=>{const t=iN(n);if(n.isSystemFallback)return[t,...aN(n)];const i=(n.nodes||[]).flatMap((a,o)=>fT(n,a,o));return r.workflowType==="resource"?i:[t,...i]});return rN(e)}function sN(e){const n=Ui(e);return e.exportKind==="case-showcase-shell"?`
      <div
        class="guided-export-themed-content guided-export-case-showcase-shell"
        style="--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")};--case-showcase-shell-height:${Number(e.dimensions?.height||1205)}px;"
      >
        ${ge(n,{editable:!1})}
      </div>
    `:`
    <div
      class="guided-export-themed-content guided-export-case-showcase-card"
      data-case-card-index="${Number(e.caseCardIndex||0)}"
      style="width:${Number(e.dimensions?.width||347)}px;height:${Number(e.dimensions?.height||1027)}px;--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")};"
    >
      <div
        class="guided-export-case-showcase-content"
        style="width:${Number(e.caseCardContentWidth||e.dimensions?.width||347)}px;height:${Number(e.dimensions?.height||1027)}px;"
      >
        <div
          class="guided-export-case-showcase-track"
          style="transform:translateX(-${Number(e.caseCardOffsetX||0)}px);"
        >
          ${ge(n,{editable:!1})}
        </div>
      </div>
    </div>
  `}function lN(e){const n=Ui(e);return e.exportKind==="node-guide-title"?`
      <div
        class="guided-export-themed-content guided-export-node-guide-title"
        style="--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")};"
      >
        ${ge(n,{editable:!1})}
      </div>
    `:`
    <div
      class="guided-export-themed-content guided-export-node-guide-card"
      style="width:${Number(e.dimensions?.width||640)}px;height:${Number(e.dimensions?.height||637.81)}px;--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")};"
    >
      <div
        class="guided-export-node-guide-track"
        style="transform:translate(${-Number(e.nodeGuideCardOffsetX||0)}px, -${Number(e.nodeGuideCardOffsetY||0)}px);"
      >
        ${ge(n,{editable:!1})}
      </div>
    </div>
  `}function xT(e){return r.pages.find(n=>n.id===e?.pageId)||null}function dN(e){const n=xT(e),t=e.pageTheme||Qe(n),i=fi(n,t)||t?.background||"#FFE0E9",{height:a}=Ki(e);return`
    <div
      class="guided-export-header-image"
      style="height:${Number(a||Ca)}px;background:${f(i)};background-position:top center;--guided-page-theme-filter:${f(t?.filter||"none")};"
    >
      <div class="guided-export-themed-content">
        ${ge(Ui(e),{editable:!1})}
      </div>
    </div>
  `}function pN(e){const n=xT(e),t=e.pageTheme||Qe(n),i=fi(n,t)||t?.background||"#FFE0E9",a=Number(e.dimensions?.height||dT(n)),o=e.node||_e(n);return`
    <div
      class="guided-export-page-background"
      style="width:${Xe}px;height:${a}px;background:${f(i)};background-position:top center;--guided-page-theme-filter:${f(t?.filter||"none")};"
    >
      ${o?`
            <div class="guided-export-themed-content">
              ${ge(Ui({...e,node:o}),{editable:!1})}
            </div>
          `:""}
    </div>
  `}function cN(e){const{width:n,height:t}=Ki(e),i=oT(e),a=Vi(e?.node||e?.sourceNode),o=Math.max(0,Number(a.exportSideSpace||0)),s=!As(e),l=n>720?.44:.46,d=Math.ceil(n*l),p=Math.ceil(t*l),c=e.exportKind==="page-background"?pN(e):e.exportKind==="fallback-page"?KF(e):e.exportKind==="case-showcase-shell"||e.exportKind==="case-showcase-card"?sN(e):e.exportKind==="node-guide-title"||e.exportKind==="node-guide-card"?lN(e):gt(e.node||e.sourceNode)?dN(e):`
      <div
        class="guided-export-themed-content"
        style="--guided-page-theme-filter:${f(e.pageTheme?.filter||"none")}"
      >
        ${ge(Ui(e),{editable:!1})}
      </div>
    `;return`
    <div
      class="guided-export-cut-frame"
      style="width:${d}px;height:${p}px;"
    >
      <div
        class="guided-export-cut-preview"
        data-export-cut-id="${f(e.id)}"
        ${s?'data-dynamic-export-height="true"':""}
        style="width:${n}px;${s?"height:auto;":`height:${t}px;`}padding:0 ${o}px ${i}px;box-sizing:border-box;--export-preview-scale:${l};"
      >
        ${c}
      </div>
    </div>
  `}function uN(){document.querySelectorAll('[data-dynamic-export-height="true"]').forEach(e=>{const n=e.closest(".guided-export-cut-frame");if(!n)return;const t=Number(getComputedStyle(e).getPropertyValue("--export-preview-scale"))||1;n.style.height=`${Math.ceil(e.scrollHeight*t)}px`})}const Md=new Set(["挂件","下单页弹窗","挽留页弹窗","资源弹窗2","详情页弹窗","资源弹窗1"]);function hT(e){if(r.workflowType!=="resource")return!1;const n=e?.node||e?.sourceNode;return Md.has(n?.schemaId)||Md.has(n?.name)}function gN(e){const{width:n}=Ki(e),t=n>720?.44:.46,i=Math.ceil(n*t),a=hT(e);return`
    <article class="guided-export-card" style="width:${i}px;">
      <header>
        <div>
          <span>版本</span>
          <strong>${v(e.variantTitle)}</strong>
        </div>
        <div class="guided-export-card-actions">
          <button data-guided-export-single="${f(e.id)}">下载 PNG</button>
          ${a?`<button data-guided-export-gif="${f(e.id)}">下载 GIF</button>`:""}
        </div>
      </header>
      ${cN(e)}
    </article>
  `}function mN(e,n){const t=new Map;return n.forEach(i=>{const a=i.stateGroupKey||i.id;t.has(a)||t.set(a,[]),t.get(a).push(i)}),`
    <section class="guided-export-dimension">
      <header>
        <strong>${v(e)}</strong>
        <span>${n.length} 个版本</span>
      </header>
      <div class="guided-export-card-grid">
        ${[...t.values()].map(i=>`
          <div class="guided-export-state-pair">
            ${i.map(gN).join("")}
          </div>
        `).join("")}
      </div>
    </section>
  `}function Rs(e){return e?.nodeId?`node:${e.nodeId}`:`module:${e?.moduleFolderTitle||e?.moduleTitle||e?.exportKind||e?.id||"default"}`}function fN(e,n){const t=new Map;return n.forEach(i=>{t.has(i.dimensionTitle)||t.set(i.dimensionTitle,[]),t.get(i.dimensionTitle).push(i)}),`
    <section class="guided-export-module">
      <header>
        <div>
          <span>模块</span>
          <strong>${v(e)}</strong>
        </div>
        <div class="guided-export-module-actions">
          <em>${n.length} 张</em>
          <button
            type="button"
            data-guided-export-module
            data-guided-export-module-page="${f(n[0]?.pageId||"")}"
            data-guided-export-module-key="${f(Rs(n[0]))}"
          >下载本模块全部切图</button>
        </div>
      </header>
      <div class="guided-export-dimension-list">
        ${[...t.entries()].map(([i,a])=>mN(i,a)).join("")}
      </div>
    </section>
  `}function xN(e,n){const t=new Map;return n.forEach(i=>{const a=Rs(i);t.has(a)||t.set(a,[]),t.get(a).push(i)}),`
    <section class="guided-export-page-group">
      <header class="guided-export-page-head">
        <div>
          <span>${v(e.dimension||"未分组")}</span>
          <strong>${v(e.name||"活动页面")}</strong>
        </div>
        <em>${n.length} 张切图</em>
      </header>
      <div class="guided-export-module-list">
        ${[...t.values()].map(i=>fN(i[0]?.moduleTitle||"模块",i)).join("")}
      </div>
    </section>
  `}function hN(){const e=A(".activity-center");if(!e)return;const n=ho(),t=r.pages.map(i=>({page:i,entries:n.filter(a=>a.pageId===i.id)})).filter(i=>i.entries.length);e.innerHTML=`
    <section class="guided-export-page">
      <header class="guided-export-topbar">
        <div class="guided-export-topbar-inner">
          <button class="guided-export-back" data-guided-back-preview aria-label="返回预览">
            <span>←</span>
            返回预览
          </button>
          <div class="guided-export-title">
            <span>导出切图</span>
            <strong>${v(r.activity?.name||li.activityName||"活动")}</strong>
            <em>${t.length} 个${r.workflowType==="resource"?"资源位":"页面"} · ${n.length} 张切图</em>
          </div>
          <button class="guided-export-batch" data-guided-export-batch ${n.length?"":"disabled"}>
            批量下载 ZIP
          </button>
        </div>
      </header>
      <main class="guided-export-content">
        ${n.length?t.map(({page:i,entries:a})=>xN(i,a)).join(""):'<div class="guided-export-empty">当前没有可导出的切图。</div>'}
      </main>
    </section>
  `,window.renderReactMaterials?.(),window.requestAnimationFrame(()=>{window.requestAnimationFrame(uN)})}function bT(e){return ho().find(n=>n.id===e)}async function bo(){if(await Mi(),await Mi(),document.fonts?.ready)try{await document.fonts.ready}catch(e){console.warn("[guided-export] font readiness skipped",e)}}async function Hs(e,n={}){const t=uT(e.id);if(!t)throw new Error("找不到导出组件");const i=Ki(e),a={width:i.width,...As(e)?{height:i.height}:{}};return mT(t,{...n,...a})}const yT=1200,nr=20,jd=2*1024*1024,bN=[{frameCount:20,maxColors:256},{frameCount:18,maxColors:256},{frameCount:16,maxColors:256},{frameCount:14,maxColors:240},{frameCount:12,maxColors:224},{frameCount:10,maxColors:192},{frameCount:8,maxColors:160}];function yN(e,n){const t=e.reduce((c,u)=>c+u.data.length/4,0),i=Math.max(1,Math.ceil(t/24e4)),a=new Uint8Array(Math.ceil(t/i)*4);let o=0,s=0,l=0;e.forEach(c=>{for(let u=0;u<c.data.length;u+=4){if(c.data[u+3]<128){s+=1,l+=1;continue}l%i===0&&(a[o]=c.data[u],a[o+1]=c.data[u+1],a[o+2]=c.data[u+2],a[o+3]=255,o+=4),l+=1}});const d=a.subarray(0,Math.max(4,o)),p=l3(d,Math.max(2,n-1),{format:"rgb565"});return p.push([0,0,0]),{palette:p,transparentIndex:p.length-1,transparentPixelRatio:s/Math.max(1,t)}}function wN(e,n,t){const i=g3(),a=yT/n.frameCount,{palette:o,transparentIndex:s,transparentPixelRatio:l}=yN(e,n.maxColors),d=l<.15;let p=null;for(let c=0;c<n.frameCount;c+=1){const u=Math.min(e.length-1,Math.floor(c*e.length/n.frameCount)),g=e[u],w=s>=0?o.slice(0,s):o,y=p3(g.data,w,"rgb565");for(let h=0;h<y.length;h+=1){const x=h*4;if(g.data[x+3]<128){y[h]=s;continue}d&&p&&Math.abs(g.data[x]-p.data[x])+Math.abs(g.data[x+1]-p.data[x+1])+Math.abs(g.data[x+2]-p.data[x+2])<=3&&Math.abs(g.data[x+3]-p.data[x+3])<=2&&(y[h]=s)}i.writeFrame(y,g.width,g.height,{...c===0?{palette:o}:{},delay:a,repeat:0,transparent:!0,transparentIndex:s,dispose:d?1:2}),p=g,t?.(c+1,n.frameCount,"encode")}return i.finish(),new Blob([i.bytes()],{type:"image/gif"})}async function vN(e,n){const t=uT(e.id);if(!t)throw new Error("找不到导出组件");const i=Ki(e),a={width:i.width,...As(e)?{height:i.height}:{}},o=t.getAnimations({subtree:!0});o.forEach(p=>p.pause());const s=[],l=yT/nr;try{for(let p=0;p<nr;p+=1){const c=p*l;o.forEach(y=>{y.currentTime=c}),await Mi();const u=await nN(t,a),g=u.getContext("2d",{willReadFrequently:!0});if(!g)throw new Error("无法读取 GIF 画布");const w=g.getImageData(0,0,u.width,u.height);s.push({data:w.data,width:u.width,height:u.height}),n?.(p+1,nr,"capture")}}finally{o.forEach(p=>p.play())}let d=null;for(const p of bN){const c=wN(s,p,n);if(d=c,c.size<=jd)return c}if(d?.size>jd)throw new Error("当前画面无法在保证清晰度的同时压缩到 2MB 以内");return d}async function SN(e){const n=bT(e);if(n){await bo();try{const t=await Hs(n);qi(n.fileName||`${Re(n.variantTitle)}.png`,t)}catch(t){console.error("[guided-export] single export failed",n,t),window.alert(`单张导出失败：${t?.message||"未知错误"}`)}}}async function TN(e,n){const t=bT(e);if(!(!t||!hT(t))){await bo(),n?.setAttribute("disabled","true");try{const i=await vN(t,(o,s,l)=>{n&&(n.textContent=l==="encode"?`压缩 ${o}/${s}`:`渲染 ${o}/${s}`)}),a=String(t.fileName||`${Re(t.variantTitle)}.png`).replace(/\.png$/i,".gif");n&&(n.title=`最近导出：${(i.size/1024/1024).toFixed(2)}MB`),qi(a,i)}catch(i){console.error("[guided-export] gif export failed",t,i),window.alert(`GIF 导出失败：${i?.message||"未知错误"}`)}finally{n?.removeAttribute("disabled"),n&&(n.textContent="下载 GIF")}}}function $N(){return Array.from({length:256},(e,n)=>{let t=n;for(let i=0;i<8;i+=1)t=t&1?3988292384^t>>>1:t>>>1;return t>>>0})}const CN=$N();function IN(e){let n=4294967295;return e.forEach(t=>{n=CN[(n^t)&255]^n>>>8}),(n^4294967295)>>>0}function ve(e){const n=new Uint8Array(2);return new DataView(n.buffer).setUint16(0,e,!0),n}function tn(e){const n=new Uint8Array(4);return new DataView(n.buffer).setUint32(0,e>>>0,!0),n}async function wT(e){return new Uint8Array(await e.arrayBuffer())}function vT(e){const n=new TextEncoder,t=[],i=[];let a=0;e.forEach(l=>{const d=n.encode(l.path),p=l.bytes,c=IN(p),u=[tn(67324752),ve(20),ve(2048),ve(0),ve(0),ve(0),tn(c),tn(p.length),tn(p.length),ve(d.length),ve(0),d],g=u.reduce((w,y)=>w+y.length,0)+p.length;t.push(...u,p),i.push(tn(33639248),ve(20),ve(20),ve(2048),ve(0),ve(0),ve(0),tn(c),tn(p.length),tn(p.length),ve(d.length),ve(0),ve(0),ve(0),ve(0),tn(0),tn(a),d),a+=g});const o=i.reduce((l,d)=>l+d.length,0),s=[tn(101010256),ve(0),ve(0),ve(e.length),ve(e.length),tn(o),tn(a),ve(0)];return new Blob([...t,...i,...s],{type:"application/zip"})}async function ST(e,n,t){const i=new Array(e.length);let a=0;const o=Array.from({length:Math.min(n,e.length)},async()=>{for(;a<e.length;){const s=a;a+=1,i[s]=await t(e[s],s)}});return await Promise.all(o),i}async function kN(){const e=ho();if(!e.length)return;await bo();const n=document.querySelector("[data-guided-export-batch]");n?.setAttribute("disabled","true"),n&&(n.textContent=`正在生成 0/${e.length}`);try{const t=[],i=[];let a=0;if(await ST(e,2,async s=>{try{const l=await Hs(s),d={path:s.filePath,bytes:await wT(l)};t.push(d)}catch(l){console.error("[guided-export] batch item failed",s,l),i.push({entry:s,error:l})}finally{a+=1,n&&(n.textContent=`正在生成 ${a}/${e.length}`)}}),!t.length){const s=i[0]?.error?.message||"没有成功生成的切图";window.alert(`批量导出失败：${s}`);return}t.sort((s,l)=>s.path.localeCompare(l.path,"zh-Hans-CN")),n&&(n.textContent="正在打包 ZIP");const o=vT(t);qi(`${Re(`${r.activity?.name||"活动"}切图`)}.zip`,o),i.length&&window.alert(`已导出 ${t.length} 张，${i.length} 张失败。`)}catch(t){console.error("[guided-export] batch export failed",t),window.alert(`批量导出失败：${t?.message||"未知错误"}`)}finally{n?.removeAttribute("disabled"),n&&(n.textContent="批量下载 ZIP")}}async function PN(e,n,t){const i=ho().filter(a=>a.pageId===e&&Rs(a)===n);if(i.length){await bo(),t?.setAttribute("disabled","true"),t&&(t.textContent=`正在生成 0/${i.length}`);try{const a=[];let o=0;await ST(i,2,async d=>{const p=await Hs(d);a.push({path:[d.stateFolderTitle?Re(d.stateFolderTitle):"默认状态",d.fileName].join("/"),bytes:await wT(p)}),o+=1,t&&(t.textContent=`正在生成 ${o}/${i.length}`)}),a.sort((d,p)=>d.path.localeCompare(p.path,"zh-Hans-CN")),t&&(t.textContent="正在打包 ZIP");const s=i[0]?.moduleTitle||"模块",l=i[0]?.pageName||"页面";qi(`${Re(`${l}_${s}_全部切图`)}.zip`,vT(a))}catch(a){console.error("[guided-export] module export failed",a),window.alert(`模块切图导出失败：${a?.message||"未知错误"}`)}finally{t?.removeAttribute("disabled"),t&&(t.textContent="下载本模块全部切图")}}}function Rd(e,n){A(".code-head strong").textContent=e,A(".code-box pre").textContent=n,A(".code-modal").classList.add("open")}function T(){document.body.dataset.view=r.view;const e=A(".app-shell");if(e&&(e.dataset.view=r.view),r.view==="mine"){A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open"),gP();return}if(r.view==="prd-demo"){A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open"),LP(),window.renderReactMaterials?.(A(".activity-center")||document);return}if(r.view==="resource-level"){r.resourceLevel="daily",We("daily"),r.view="resource-blueprint",T();return}if(r.view==="resource-blueprint"){A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open"),hP(),window.renderReactMaterials?.(A(".activity-center")||document);return}if(r.view==="guided-preview"){A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open"),r.workflowType==="resource"?Ts():At();return}if(r.view==="guided-export"){A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open"),hN();return}if(r.view==="animation-preview-library"){b6(),window.renderReactMaterials?.();return}if(r.view==="admin-component-verifier"){DP(),A(".code-modal")?.classList.remove("open"),A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open");return}if(r.view==="admin"){tS(),A(".code-modal")?.classList.remove("open"),A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open");return}if(oo(),r.view!=="workbench"){A(".code-modal")?.classList.remove("open"),A(".quick-toolbar")?.classList.remove("open"),A(".variant-inspector")?.classList.remove("open"),A(".richtext-editor")?.classList.remove("open");return}document.querySelectorAll("[data-library]").forEach(s=>{s.classList.toggle("active",s.dataset.library===r.activeLibrary)}),document.querySelectorAll("[data-panel-tab]").forEach(s=>{s.classList.toggle("active",s.dataset.panelTab===r.activePanelTab)});const n=document.querySelector('[data-panel-content="materials"]'),t=document.querySelector('[data-panel-content="structure"]');n&&(n.style.display=r.activePanelTab==="materials"?"":"none"),t&&(t.style.display=r.activePanelTab==="structure"?"":"none");const i=A(".tabs");i&&i.classList.toggle("hidden",r.activeLibrary!=="materials");const a=A(".library-panel .panel-title");a&&(a.textContent=r.activeLibrary==="materials"?"物料库":"模板库");const o=A(".library-panel .panel-subtitle");o&&(o.textContent=r.activeLibrary==="materials"?"拖拽物料到画布。":"点击模板新增页面。"),document.querySelectorAll(".tab").forEach(s=>{s.classList.toggle("active",s.dataset.tab===r.activeTab)}),Zt(),pa(),document.fonts?.ready.then(_6),_s(),Tn(),nT(),A(".canvas-toolbar .meta").textContent=`${Q().name} · ${r.pages.length} 页 · ${r.nodes.length} 个组件 · ${Math.round(r.canvasZoom*100)}%`,kT(),He(),window.renderReactMaterials?.(),zN()}function zN(){const e=A(".page-template-modal-container");e&&(e.innerHTML=r.pageTemplateModalOpen?w6():"")}function Ds(){const e=$T(),n=CT();if(!e||!n||Bs().length===0)return;const i=Math.max(n.scrollWidth,n.offsetWidth,750),a=Math.max(n.scrollHeight,n.offsetHeight,1334),o=e.getBoundingClientRect(),s=o.width,l=o.height,d=40,p=s-d*2,c=l-d*2,u=p/i,g=c/a,w=Math.min(u,g,1);r.canvasZoom=$e(w,.1,2),r.canvasPanX=(s-i*r.canvasZoom)/2,r.canvasPanY=(l-a*r.canvasZoom)/2,He()}function Mi(){return new Promise(e=>requestAnimationFrame(e))}function FN(e,n=1500){const i=[...e?.querySelectorAll("img")||[]].map(s=>s.complete?typeof s.decode=="function"?s.decode().catch(()=>{}):Promise.resolve():new Promise(l=>{s.addEventListener("load",l,{once:!0}),s.addEventListener("error",l,{once:!0})})),a=document.fonts?.ready||Promise.resolve(),o=new Promise(s=>window.setTimeout(s,n));return Promise.race([Promise.allSettled([a,...i]),o])}function TT(e=A(".guided-page-shell")){const n=e?.querySelector(".page"),t=e?.querySelector(".guided-phone"),i=e?.closest(".guided-page-tree"),a=n?.querySelector(".guided-node:last-of-type"),o=a?a.offsetTop+a.offsetHeight+32:0,s=Math.max(i?.scrollWidth||0,i?.offsetWidth||0,e?.offsetWidth||0,n?.scrollWidth||0,t?.scrollWidth||0,r.workflowType==="resource"?0:750),l=Math.max(i?.scrollHeight||0,i?.offsetHeight||0,n?.scrollHeight||0,n?.offsetHeight||0,t?.scrollHeight||0,o,r.workflowType==="resource"?320:1334);return{width:s,height:l}}async function Ls(){const e=++_o,n=A(".guided-page-shell");await FN(n);let t="",i=0;const a=performance.now()+900;for(;i<3&&performance.now()<a;){if(await Mi(),e!==_o||r.view!=="guided-preview"||r.guidedCanvasInitialized)return;const o=TT(n),s=`${Math.round(o.width)}x${Math.round(o.height)}`;i=s===t?i+1:0,t=s}if(!(e!==_o||r.view!=="guided-preview")&&(r.guidedCanvasInitialized=!0,fn(),EN(),la)){const o=la;la=null,NN(o)}}function NN(e){const n=A(".guided-device-stage"),t=A(".guided-canvas-world"),i=document.querySelector(`.guided-node[data-node-id="${CSS.escape(e)}"]`);if(!n||!t||!i)return;const a=n.getBoundingClientRect(),o=t.getBoundingClientRect(),s=i.getBoundingClientRect(),l=Math.max(r.canvasZoom,.01),d=(s.left-o.left)/l,p=(s.top-o.top)/l,c=s.width/l,u=s.height/l,g=72,w=Math.max(320,a.width-g*2),y=Math.max(320,a.height-g*2),h=$e(Math.min(w/c,y/u,1.1),l,1.1);r.canvasZoom=h,r.canvasPanX=(a.width-c*h)/2-d*h,r.canvasPanY=(a.height-u*h)/2-p*h,fn(),t.classList.add("is-focusing"),He(),window.setTimeout(()=>{t.classList.remove("is-focusing"),fn()},460)}function EN(){const e=A(".guided-device-stage");if(!e)return;if(!r.guidedVisiblePageIds.length){r.canvasZoom=1,r.canvasPanX=80,r.canvasPanY=100,fn(),He();return}const n=TT(),t=n.width,i=n.height,a=40,o=32,s=Math.max(320,e.clientWidth-a*2),l=Math.max(320,e.clientHeight-o*2),d=Math.min(s/t,l/i,.8);r.canvasZoom=$e(d,.12,.8),r.canvasPanX=a+(s-t*r.canvasZoom)/2,r.canvasPanY=o+(l-i*r.canvasZoom)/2,fn(),He()}function $T(){return r.view==="guided-preview"?A(".guided-device-stage"):A(".workspace .device-stage")}function CT(){return r.view==="guided-preview"?A(".guided-canvas-world"):A(".workspace .canvas-world")}function He(){const e=CT();if(e&&(e.style.transform=`translate3d(${r.canvasPanX}px, ${r.canvasPanY}px, 0) scale(${r.canvasZoom})`,e.style.setProperty("--guided-action-scale",String($e(1/Math.max(r.canvasZoom,.01),.75,1.6))),e.style.setProperty("--guided-title-scale",String($s())),r.view==="guided-preview"&&r.guidedCanvasInitialized&&e.classList.remove("is-initializing"),window.__isZooming?e.classList.add("is-zooming"):e.classList.remove("is-zooming")),!window.__isZooming){const n=A(".canvas-toolbar .meta");n&&(n.textContent=`${Q().name} · ${r.pages.length} 页 · ${r.nodes.length} 个组件 · ${Math.round(r.canvasZoom*100)}%`),Et()}}let ba=null;function IT(){if(!ba){const e=$T();e&&(ba=e.getBoundingClientRect())}return ba}function fn(){ba=null}function _N(e){const n=IT();if(!n)return;const t=r.canvasZoom,i=$e(t*Math.exp(-e.deltaY*.004),.1,2);if(Math.abs(i-t)<.001)return;const a=e.clientX-n.left,o=e.clientY-n.top,s=(a-r.canvasPanX)/t,l=(o-r.canvasPanY)/t;r.canvasZoom=i,r.canvasPanX=a-s*i,r.canvasPanY=o-l*i,He()}function kT(){const e=A(".canvas-color-control");if(!e)return;const n=xk(r.canvasBackground);e.innerHTML=`
    <button class="canvas-color-button" data-toggle-canvas-colors aria-label="画布颜色">
      <span class="color-dot" style="background:${r.canvasBackground}"></span>
      <input class="native-color-input" type="color" data-canvas-color-picker value="${n}" />
      <span>画布颜色</span>
    </button>
    <div class="canvas-color-popover ${r.canvasColorPanelOpen?"open":""}">
      ${fk.map(t=>`<button class="color-swatch" data-apply-canvas-color="${f(t)}" style="background:${f(t)}" aria-label="${f(t)}"></button>`).join("")}
    </div>
  `}function v(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function f(e){return v(e).replaceAll(`
`," ")}let Ci=null;function Pr(){Ci!==null&&(window.clearTimeout(Ci),Ci=null)}function BN(){Pr();const e=A(".activity-center"),n=e?.scrollTop||0,t=e?.scrollLeft||0;Ci=window.setTimeout(()=>{Ci=null,r.view==="prd-demo"&&(T(),requestAnimationFrame(()=>{const i=A(".activity-center");i&&(i.scrollTop=n,i.scrollLeft=t)}))},180)}function AN(){document.addEventListener("click",e=>{if(r.view!=="guided-preview"||e.target.closest("[data-guided-action], [data-guided-order]"))return;const n=e.target.closest(".guided-node[data-select]");if(!n)return;const t=n.closest("[data-page-id]")?.dataset.pageId;t&&t!==r.activePageId&&Sn(t),sn(n.dataset.select),ia()},!0),document.addEventListener("submit",async e=>{const n=e.target.closest("[data-admin-auth-form]");if(n){if(e.preventDefault(),r.adminAuthLoading)return;const o=new FormData(n);r.adminAuthLoading=!0,r.adminAuthError="",T();try{r.adminUnlocked=await V3(o.get("password")),await Wv({syncLocal:!1}),r.adminAuthModalOpen=!1,r.view="admin",r.adminSection="users",r.adminNotice=""}catch(s){r.adminUnlocked=!1,r.adminAuthError=s.message||"后台密码验证失败"}finally{r.adminAuthLoading=!1,T()}return}const t=e.target.closest("[data-admin-add-user-form]");if(t){e.preventDefault();const o=new FormData(t);try{$n(j3(r.collaboration,{id:o.get("userId"),name:o.get("userName")})),r.adminNotice="用户已新增"}catch(s){r.adminNotice=s.message}T();return}const i=e.target.closest("[data-admin-create-team-form]");if(i){e.preventDefault();const o=new FormData(i);try{$n(ql(r.collaboration,{name:o.get("teamName")})),r.adminNotice="组已创建"}catch(s){r.adminNotice=s.message}T();return}const a=e.target.closest("[data-admin-record-form]");if(a){e.preventDefault();const o=new FormData(a);try{const s=JSON.parse(String(o.get("recordSnapshot")||""));if(!s||typeof s!="object")throw new Error("项目快照必须是 JSON 对象");const l={name:String(o.get("recordName")||"").trim(),snapshot:s};$n(D3(r.collaboration,a.dataset.recordId,l)),await O3(a.dataset.recordId,l),r.adminEditingRecordId=null,r.adminNotice="历史记录已覆盖"}catch(s){r.adminNotice=`保存失败：${s.message}`}T()}}),document.addEventListener("click",e=>{if(e.target.closest("[data-placement-case-scrollbar]"))return;if(e.target.closest("[data-open-resource-flow]")){ja(),r.workflowType="resource",r.resourceLevel="daily",We("daily"),r.view="resource-blueprint",T();return}const n=e.target.closest("[data-resource-level-select]");if(n){r.workflowType="resource",r.resourceLevel=n.dataset.resourceLevelSelect==="s"?"s":"daily",We(),r.view="resource-blueprint",T();return}const t=e.target.closest("[data-resource-level-switch]");if(t){r.resourceLevel=t.dataset.resourceLevelSwitch==="s"?"s":"daily",We(),T();return}const i=e.target.closest("[data-resource-add-version]");if(i){const m=We(),b=Jn().slots.find(B=>B.id===i.dataset.resourceAddVersion);if(!b)return;const S=m.modules[b.id].versions;S.push(Ja(b,S.length)),T();return}const a=e.target.closest("[data-resource-remove-version]");if(a){const[m,b]=a.dataset.resourceRemoveVersion.split("|"),B=We().modules?.[m];if(!B||B.versions.length<=1)return;B.versions=B.versions.filter(U=>U.id!==b),B.versions[0]&&(B.versions[0].id="base"),T();return}if(e.target.closest("[data-resource-generate]")){HF();return}if(e.target.closest("[data-open-my-projects]")){rP();return}if(e.target.closest("[data-history-refresh]")){Zv();return}const o=e.target.closest("[data-history-scope]");if(o&&!o.disabled){r.historyScope=o.dataset.historyScope==="team"?"team":"personal",T();return}const s=e.target.closest("[data-copy-record-personal]");if(s){const m=Bt();if(!m)return;$n(Wl(r.collaboration,s.dataset.copyRecordPersonal,{ownerId:m.id,scope:"personal"})),r.historyScope="personal",T();return}const l=e.target.closest("[data-copy-record-team]");if(l){const m=Bt(),b=l.dataset.copyRecordTeam,S=document.querySelector(`[data-copy-record-group="${CSS.escape(b)}"]`)?.value;if(!m||!ri(S))return;$n(Wl(r.collaboration,b,{ownerId:m.id,scope:"team",teamId:S})),r.historyGroupId=S,r.historyScope="team",T();return}const d=e.target.closest("[data-copy-project-to-group]");if(d){const m=d.dataset.copyProjectToGroup,b=document.querySelector(`[data-copy-project-group="${CSS.escape(m)}"]`)?.value;pP(m,b);return}const p=e.target.closest("[data-restore-collab-record]");if(p){const m=r.collaboration.records.find(b=>b.id===p.dataset.restoreCollabRecord);m?.snapshot&&(r.historySaveScope=m.scope,r.historySaveGroupId=m.scope==="team"&&m.teamId||"",r.historyCollaborationRecordId=m.id,Xr(m.snapshot,m.projectId,null));return}const c=e.target.closest("[data-toggle-versions]");if(c){sP(c.dataset.toggleVersions);return}const u=e.target.closest("[data-restore-project]");if(u){dP(u.dataset.restoreProject,u.dataset.versionId||null);return}const g=e.target.closest("[data-restore-local]");if(g){cP(g.dataset.restoreLocal);return}const w=e.target.closest("[data-delete-project]");if(w){uP(w.dataset.deleteProject);return}const y=e.target.closest("[data-delete-local]");if(y){A3(y.dataset.deleteLocal).then(()=>{r.historyLocalDrafts=r.historyLocalDrafts.filter(m=>m.id!==y.dataset.deleteLocal),T()}).catch(m=>{r.historyError=m.message||"本地草稿删除失败",T()});return}if(e.target.closest("[data-demo-open-file-modal]")){ja(),r.workflowType="venue",r.prdBlueprintPasteError="",r.selectedDemoPackageId===Oe&&(r.selectedDemoPackageId=qn.id),r.prdFileModalOpen=!0,T();return}if(e.target.closest("[data-prd-blueprint-table-submit]")){const m=r.prdBlueprintPasteTemplateName;if(!m){r.prdBlueprintPasteError="请先选择页面模板",T(),requestAnimationFrame(()=>{document.querySelector("[data-prd-blueprint-template-select]")?.focus()});return}const b=["人群1","人群2","人群3"],S={},B=Oo(m,b),{rows:U,manualVersions:Se}=ad(B,b,S);r.prdBlueprintPasteVersions=b,r.prdBlueprintPasteModuleVersions=S,r.prdBlueprintPasteRows=B,r.prdManualModuleVersions=Se,r.prdTableRows=U,r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",r.selectedDemoPackageId=Oe,r.prdBlueprintPasteError="",ea();return}if(e.target.closest("[data-prd-feishu-submit]")){const b=e.target.closest("[data-demo-file-modal]")?.querySelector("[data-prd-feishu-input]")?.value||r.prdFeishuUrl||"";if(r.prdFeishuUrl=b,!b.trim()){r.prdFeishuError="请输入飞书文档链接",T(),requestAnimationFrame(()=>{document.querySelector("[data-prd-feishu-input]")?.focus()});return}r.prdFeishuError="正在获取文档内容...",T(),fetch("/api/fetch-feishu-doc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:b})}).then(async S=>{const B=await S.text();let U;try{U=B?JSON.parse(B):null}catch{throw!S.ok&&["127.0.0.1","localhost"].includes(location.hostname)?new Error(`本地飞书读取服务不可用（HTTP ${S.status}），请在 projects 2 目录执行 npm run dev`):new Error(`接口返回不是有效 JSON（HTTP ${S.status}）`)}if(!S.ok)throw new Error(U?.error||(["127.0.0.1","localhost"].includes(location.hostname)?`本地飞书读取服务不可用（HTTP ${S.status}），请在 projects 2 目录执行 npm run dev`:`接口请求失败（HTTP ${S.status}）`));return U}).then(S=>{if(S.success&&S.data&&(S.data.content||S.data.tables?.length)){r.prdTextInput=S.data.content||"";const B=Array.isArray(S.data.tables)?S.data.tables:[];if(B.length){const Se=AI(S.data.content)||r.prdBlueprintPasteTemplateName,Ee=nd(B,Se,[],!1);if(!Ee||Ee.error){r.prdFeishuError=Ee?.error||"未识别到固定格式表格，请确认文档标题和表格结构完整",T();return}const xi=Oo(Ee.templateName,Ee.versions),Ke=_n(Ee.moduleVersions,Ee.versions),vt=td(xi,Ee),PT=za(vt),{rows:zT,manualVersions:FT}=ad(PT,Ee.versions,Ke);r.prdBlueprintPasteTemplateName=Ee.templateName,r.prdBlueprintPasteVersions=Ee.versions,r.prdBlueprintPasteModuleVersions=Ke,r.prdBlueprintPasteRows=Cn(vt,0,Xt(vt,Ee.versions,Ke)),r.prdTableRows=zT,r.prdManualModuleVersions=FT,Ee.guideStateId&&(r.pageTemplateBlueprintStates["page-guide-no-incentive|1"]=Ee.guideStateId),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",r.selectedDemoPackageId=Oe,r.prdFeishuError="",r.prdFileModalOpen=!1,ea();return}const U=ZI(r.prdTextInput);if(!U.length){r.prdFeishuError="未读取到可解析的飞书表格，请检查文档结构",T();return}r.prdTableRows=re(U),r.prdManualModuleVersions={},r.prdBlueprintPasteModuleVersions={},r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",r.selectedDemoPackageId=Oe,r.prdFeishuError="",r.prdFileModalOpen=!1,ea()}else r.prdFeishuError=S.error||"获取文档失败",T()}).catch(S=>{r.prdFeishuError=S.message||"获取文档失败",T()});return}if(e.target.closest("[data-demo-close-file-modal]")||e.target.matches("[data-demo-file-modal]")){r.prdFileModalOpen=!1,T();return}if(e.target.closest("[data-demo-parse-prd]")){ea();return}const h=e.target.closest("[data-prd-task-count-delta]");if(h){const m=String(h.dataset.prdTaskCountRows||"").split(",").map(Number).filter(Number.isInteger),b=r.prdTableRows[m[0]],S=Math.max(1,Math.round(Number(b?.value||3))+Number(h.dataset.prdTaskCountDelta||0));m.forEach(B=>{r.prdTableRows[B]&&(r.prdTableRows[B].value=String(S))}),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(h.closest("[data-prd-template-module-row]"))||T();return}const x=e.target.closest("[data-prd-paragraph-count-delta]");if(x){const m=String(x.dataset.prdParagraphCountRows||"").split(",").map(Number).filter(Number.isInteger),b=r.prdTableRows[m[0]],S=$e(Number(b?.value||4)+Number(x.dataset.prdParagraphCountDelta||0),1,4);m.forEach(U=>{r.prdTableRows[U]&&(r.prdTableRows[U].value=String(S))});const B=Ce(b?.key);B&&Ao(B.moduleIndex),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(x.closest("[data-prd-template-module-row]"))||T();return}const $=e.target.closest("[data-prd-prize-add]");if($){let m=[];try{m=JSON.parse($.dataset.prdPrizeVersionNames||"[]")}catch{m=[]}WI(Number($.dataset.prdPrizeModuleIndex),Number($.dataset.prdPrizeChildIndex),Array.isArray(m)?m:[]),ma(Number($.dataset.prdPrizeModuleIndex)),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke($.closest("[data-prd-template-module-row]"))||T();return}const k=e.target.closest("[data-prd-prize-delete]");if(k){let m=[];try{m=JSON.parse(k.dataset.prdPrizeVersionNames||"[]")}catch{m=[]}XI(Number(k.dataset.prdPrizeModuleIndex),Number(k.dataset.prdPrizeChildIndex),Number(k.dataset.prdPrizeIndex),Array.isArray(m)?m:[]),ma(Number(k.dataset.prdPrizeModuleIndex)),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(k.closest("[data-prd-template-module-row]"))||T();return}const F=e.target.closest("[data-prd-prize-move]");if(F){let m=[];try{m=JSON.parse(F.dataset.prdPrizeVersionNames||"[]")}catch{m=[]}const b=Number(F.dataset.prdPrizeModuleIndex);YI(b,Number(F.dataset.prdPrizeChildIndex),Number(F.dataset.prdPrizeIndex),Number(F.dataset.prdPrizeMove),Array.isArray(m)?m:[])&&(ma(b),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(F.closest("[data-prd-template-module-row]"))||T());return}const _=e.target.closest("[data-prd-task-new-tag-rows]");if(_){const m=_.getAttribute("aria-pressed")!=="true";String(_.dataset.prdTaskNewTagRows||"").split(",").map(Number).filter(Number.isInteger).forEach(b=>{r.prdTableRows[b]&&(r.prdTableRows[b].value=m?"true":"")}),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(_.closest("[data-prd-template-module-row]"))||T();return}const O=e.target.closest("[data-prd-add-module-version]");if(O){const m=O.closest("[data-prd-template-module-row]"),b=O.dataset.prdAddModuleVersion,S=SS(b),B=lo(b);if(S&&B){const U=[...pe,...ne].find(Se=>Se.id===B.templateId);Li(U,B.moduleIndex).forEach(Se=>cs(Se,S.name)),Un(Ni(B.moduleIndex),at)}aF(b,S),ke(m)||T();return}const H=e.target.closest("[data-prd-delete-module-version]");if(H){const m=H.closest("[data-prd-template-module-row]"),b=H.dataset.prdVersionModuleKey,S=H.dataset.prdDeleteModuleVersion;$S(b,S)&&(rF(b,S),ke(m)||T());return}const L=e.target.closest("[data-prd-delete-template-module]");if(L){const[m,b]=L.dataset.prdDeleteTemplateModule.split("|");Ev(m,Number(b))&&!Vo()&&T();return}const Y=e.target.closest("[data-prd-switch-canvas]");if(Y){const[m,b]=Y.dataset.prdSwitchCanvas.split("|");GF(m,Number(b));return}const K=e.target.closest("[data-prd-move-template-module]");if(K){const[m,b,S]=K.dataset.prdMoveTemplateModule.split("|");Pk(m,Number(b),S)&&!Vo()&&T();return}const se=e.target.closest("[data-prd-template-state]");if(se){const[m,b,S]=se.dataset.prdTemplateState.split("|");_k(m,Number(b),S),ke(se.closest("[data-prd-template-module-row]"))||T();return}const I=e.target.closest("[data-prd-template-entry-state]");if(I){const[m,b,S]=I.dataset.prdTemplateEntryState.split("|");Bk(m,Number(b),S),ke(I.closest("[data-prd-template-module-row]"))||T();return}const z=e.target.closest("[data-prd-template-child-state]");if(z){const[m,b,S,B]=z.dataset.prdTemplateChildState.split("|");md(m,Number(b),Number(S),B),ke(z.closest("[data-prd-template-module-row]"))||T();return}const D=e.target.closest("[data-prd-template-module-row]");if(D&&!e.target.closest("button, input, textarea, select, a")){const[m,b]=D.dataset.prdTemplateModuleRow.split("|"),S=r.prdTemplateSelectedModuleIndex;r.prdTemplateSelectedModuleIndex=Number(b),r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null;const B=S==null?null:document.querySelector(`[data-prd-template-module-row="${CSS.escape(`${m}|${S}`)}"]`);B&&B!==D&&ke(B),ke(D)||T();return}if(r.view==="prd-demo"&&r.prdDemoStep==="analysis"&&r.prdTemplateSelectedModuleIndex!==null&&e.target.closest(".blueprint-overview, .prd-variable-table")&&!e.target.closest("[data-prd-template-module-row], [data-prd-add-modal], button, input, textarea, select, a")){const m=document.querySelector(`[data-prd-template-module-row$="|${r.prdTemplateSelectedModuleIndex}"]`);r.prdTemplateSelectedModuleIndex=null,r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,ke(m)||T();return}const j=e.target.closest("[data-prd-open-add-component]");if(j){const[m,b,S="after"]=j.dataset.prdOpenAddComponent.split("|");r.prdTemplateAddAfterIndex=Number(b),r.prdTemplateAddModal={templateId:m,insertIndex:Number(b),direction:S},Uo()||T();return}if(e.target.closest("[data-prd-close-add-component]")||e.target.matches("[data-prd-add-modal]")){r.prdTemplateAddAfterIndex=null,r.prdTemplateAddModal=null,Uo()||T();return}const W=e.target.closest("[data-prd-template-insert-molecule]");if(W){const m=W.dataset.prdTemplateId,b=Number(W.dataset.prdTemplateInsertIndex),S=W.dataset.prdTemplateInsertMolecule;kk(m,b,S)&&(r.prdTemplateAddModal=null,r.prdTemplateAddAfterIndex=null,Vo()||T(),Uo());return}const Z=e.target.closest("[data-blueprint-audience]");if(Z){r.selectedBlueprintAudienceId=Z.dataset.blueprintAudience,T();return}const J=e.target.closest("[data-blueprint-scene]");if(J?.dataset.blueprintScene){r.selectedBlueprintSceneId=J.dataset.blueprintScene,T();return}const P=e.target.closest("[data-prd-header-level]");if(P){const m=P.dataset.prdHeaderLevel==="s"?"s":"default";m==="s"&&r.guidedHeaderLevelId!=="s"&&tF(),r.guidedHeaderLevelId=m,yr(m),ke(P.closest("[data-prd-template-module-row]"))||T();return}if(e.target.closest("[data-demo-generate-activity]")){RF();return}if(e.target.closest("[data-demo-back-analysis]")){DF();return}if(e.target.closest("[data-demo-sync-preview]")){r.guidedWorkspaceMode="split",fs(),r.prdDemoStep="preview",r.view="guided-preview",T();return}if(e.target.closest("[data-guided-open-export]")){r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode=null,r.view="guided-export",T();return}if(e.target.closest("[data-guided-open-theme]")){if(Bi(_e(Q()))==="s")return;r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="page",sn(null),ze({enter:!0});return}if(e.target.closest("[data-guided-open-main-visual]")){r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="resource-main-visual",sn(null),ze({enter:!0});return}if(e.target.closest("[data-guided-open-header-level]")){const m=_e(Q());if(!m)return;r.selectedId=m.id,r.guidedStateMenuNodeId=null,r.guidedPanelMode="hero-level",sn(m.id),ze({enter:!0});return}if(e.target.closest("[data-guided-back-preview]")){r.view="guided-preview",T();return}const q=e.target.closest("[data-guided-export-single]");if(q){SN(q.dataset.guidedExportSingle);return}const V=e.target.closest("[data-guided-export-gif]");if(V){TN(V.dataset.guidedExportGif,V);return}const ie=e.target.closest("[data-guided-export-module]");if(ie){PN(ie.dataset.guidedExportModulePage,ie.dataset.guidedExportModuleKey,ie);return}if(e.target.closest("[data-guided-export-batch]")){kN();return}const me=e.target.closest("[data-guided-workspace-mode]");if(me){r.guidedWorkspaceMode=me.dataset.guidedWorkspaceMode,r.selectedId=null,r.guidedPanelMode=null,T(),requestAnimationFrame(()=>{fn(),He()});return}const ye=e.target.closest("[data-guided-context-pages]");if(ye){const m=ye.dataset.guidedContextPages.split(",").filter(Boolean),b=new Set(r.guidedVisiblePageIds),S=m.some(B=>!b.has(B));m.forEach(B=>{S?b.add(B):b.delete(B)}),r.guidedVisiblePageIds=r.pages.map(B=>B.id).filter(B=>b.has(B)),r.guidedVisiblePageIds.includes(r.activePageId)||(r.activePageId=r.guidedVisiblePageIds[0]||r.pages[0]?.id||r.activePageId),r.selectedId=null,r.guidedPanelMode=null,T();return}const le=e.target.closest("[data-blueprint-add-group]");if(le){const[m,b]=le.dataset.blueprintAddGroup.split("|"),{module:S}=Bn(m,b);S&&(br(S),T());return}const Qn=e.target.closest("[data-blueprint-module-move]");if(Qn){const[m,b,S]=Qn.dataset.blueprintModuleMove.split("|");Jz(m,b,S)&&T();return}const ae=e.target.closest("[data-blueprint-delete-group]");if(ae){const[m,b,S]=ae.dataset.blueprintDeleteGroup.split("|"),{module:B}=Bn(m,b);B&&PS(B,S)&&T();return}if(e.target.closest("[data-demo-open-workbench]")){r.view="workbench",T(),requestAnimationFrame(()=>Ds());return}const C=e.target.closest("[data-guided-order]");if(C&&r.view==="guided-preview"){const m=C.dataset.guidedPage,b=C.dataset.guidedNode;Yk(m,b,C.dataset.guidedOrder)&&(T(),requestAnimationFrame(()=>{fn(),He()}));return}const E=e.target.closest("[data-guided-companion-toggle]");if(E){const m=E.dataset.guidedCompanionToggle,b=E.dataset.guidedCompanionPage,S=new Set(r.guidedVisibleCompanionNodeIds||[]),B=r.guidedVisiblePageIds.includes(b);B&&S.has(m)?(S.delete(m),r.selectedId===m&&(r.selectedId=null,r.guidedPanelMode=null)):(S.add(m),B||(r.guidedVisiblePageIds=r.pages.filter(Se=>Se.id===b||r.guidedVisiblePageIds.includes(Se.id)).map(Se=>Se.id))),r.guidedVisibleCompanionNodeIds=Array.from(S),r.guidedCanvasInitialized=!1,Zo()||T();return}const M=e.target.closest("[data-demo-scenario]");if(M){const m=M.dataset.demoScenario;if(r.pages.find(B=>B.id===m)?.isSystemFallback){Sn(m),r.selectedId=null,r.guidedPanelMode=null,Zo()||T();return}const S=new Set(r.guidedVisiblePageIds);S.has(m)?S.delete(m):S.add(m),r.guidedVisiblePageIds=r.pages.filter(B=>S.has(B.id)).map(B=>B.id),S.has(m)?Sn(m):r.activePageId===m&&r.guidedVisiblePageIds.length&&Sn(r.guidedVisiblePageIds[0]),r.selectedId=null,r.guidedPanelMode=null,Zo()||T();return}const R=e.target.closest("[data-guided-switch-table]");if(R&&r.view==="guided-preview"){LF(R.dataset.guidedSwitchTable,Number(R.dataset.guidedModuleIndex));return}const X=e.target.closest("[data-guided-action]");if(X&&r.view==="guided-preview"){const m=X.closest("[data-page-id]")?.dataset.pageId;if(m&&m!==r.activePageId&&Sn(m),sn(X.dataset.guidedNode),X.dataset.guidedAction==="delete"){Jk(m,X.dataset.guidedNode)&&(r.guidedCanvasInitialized=!1,T());return}if(X.dataset.guidedAction==="states"){const b=X.dataset.guidedNode;r.guidedStateMenuNodeId=r.guidedStateMenuNodeId===b?null:b,r.guidedPanelMode=null,T();return}if(X.dataset.guidedAction==="slide"){r.guidedStateMenuNodeId=null,r.guidedPanelMode=null,WF(X.dataset.guidedNode);return}r.guidedStateMenuNodeId=null,r.guidedPanelMode=X.dataset.guidedAction,r.guidedPanelMode==="global"&&(r.guidedLineageVersion="v3"),ze({enter:!0});return}const fe=e.target.closest(".guided-page-title-node, .guided-page-shell, .guided-phone, .guided-device-stage [data-page-id]");if(fe&&r.view==="guided-preview"&&!e.target.closest(".guided-node, .guided-floating-panel, .guided-node-actions, button")){const m=fe.dataset.guidedPageTitle||fe.dataset.pageId||fe.querySelector?.("[data-page-id]")?.dataset.pageId||fe.closest?.("[data-page-id]")?.dataset.pageId;m&&m!==r.activePageId&&Sn(m),r.selectedId=null,r.guidedStateMenuNodeId=null,r.guidedPanelMode="page",sn(null),document.querySelectorAll(".guided-page-shell").forEach(b=>{b.classList.toggle("has-selected-page",b.querySelector(`[data-page-id="${r.activePageId}"]`))}),document.querySelectorAll(".guided-page-title-node").forEach(b=>{b.classList.toggle("active",b.dataset.guidedPageTitle===r.activePageId),b.classList.toggle("has-selected-page",b.dataset.guidedPageTitle===r.activePageId)}),ze({enter:!0});return}if(e.target.closest("[data-guided-close-panel]")){ia();return}const we=e.target.closest("[data-guided-popup-result]");if(we){const m=xe(r.nodes,we.dataset.guidedNode||r.selectedId);if(!m?.node?.isLotteryResultPopup)return;nt(m.node,we.dataset.guidedPopupResult||"win"),Ft(m.node),Ln(m.node,m.parent)||T();return}const Ie=e.target.closest("[data-guided-popup-prize-index]");if(Ie){const m=xe(r.nodes,Ie.dataset.guidedNode||r.selectedId);if(!m?.node?.isLotteryResultPopup)return;Yo(m.node,Ie.dataset.guidedPopupPrizeIndex||1),Ln(m.node,m.parent)||T();return}const Ae=e.target.closest("[data-guided-lineage-version]");if(Ae){r.guidedLineageVersion=Ae.dataset.guidedLineageVersion,ze();return}const Me=e.target.closest("[data-guided-lineage-card]");if(Me&&!e.target.closest("button, input, textarea, select, [contenteditable='true']")){r.selectedLineageVariantId=Me.dataset.guidedLineageCard,ze();return}const vn=e.target.closest("[data-guided-lineage-delete]");if(vn){const m=te();if(!m?.node)return;const b=vn.dataset.guidedLineageDelete,S=Tt(m);US(m.node,b)&&o6(S,b),ze();return}if(e.target.closest("[data-guided-lineage-add-list]")){const m=te();if(!m?.node)return;const b=i6(m.node);er(Tt(m),b),r.selectedLineageVariantId=b.id,ze();return}const Os=e.target.closest("[data-guided-lineage-add-component]");if(Os){const m=te();if(!m?.node)return;const b=n6(m.node,Os.dataset.guidedLineageAddComponent);er(Tt(m),b),r.selectedLineageVariantId=b.id,ze();return}if(e.target.closest("[data-guided-lineage-add-dimension]")){const m=te();if(!m?.node)return;const{variant:b}=t6(m.node);er(Tt(m),b),r.selectedLineageVariantId=b.id,ze();return}const Vs=e.target.closest("[data-guided-lineage-apply]");if(Vs){const m=te();if(!m?.node)return;const b=je(m.node,Vs.dataset.guidedLineageApply);if(!b)return;Fs(m.node,b),vs(Q()),Ln(m.node,m.parent)||T();return}const Us=e.target.closest("[data-guided-replace-molecule]");if(Us){const m=te();if(!m)return;const b=Us.dataset.guidedReplaceMolecule,S=m.node.moduleGroupId,B=r.nodes.map((Ke,vt)=>({item:Ke,index:vt})).filter(({item:Ke})=>S?Ke.moduleGroupId===S:Ke.id===m.node.id).map(({index:Ke})=>Ke),U=Math.min(...B),Se=p6(b,m);if(!Se.length)return;const Ee=m.node.sourcePageTemplateId,xi=Number(m.node.sourcePageTemplateNodeIndex);Ee&&Number.isInteger(xi)&&(zk(Ee,xi),pr(Ee,xi,b)),Se[0].id=m.node.id,[...B].sort((Ke,vt)=>vt-Ke).forEach(Ke=>r.nodes.splice(Ke,1)),r.nodes.splice(U,0,...Se),r.selectedId=Se[0].id,r.guidedPanelMode=null,r.guidedStateMenuNodeId=null,T();return}const Ks=e.target.closest("[data-guided-add-molecule]");if(Ks&&r.view==="guided-preview"){if(r.suppressClick)return;const m=Ik(),b=(m?.nodes||[]).filter(B=>B.canvasPlacement!=="page-side");Nv(m?.id,b.length,Ks.dataset.guidedAddMolecule)&&(r.guidedPanelMode=null,T());return}const Wi=e.target.closest("[data-guided-page-theme]");if(Wi){if(Wi.disabled||Tv.has(Wi.dataset.guidedPageTheme))return;x6(Wi.dataset.guidedPageTheme);return}const qs=e.target.closest("[data-guided-resource-main-visual]");if(qs){yk(qs.dataset.guidedResourceMainVisual||"subject-1");return}const yo=e.target.closest("[data-guided-variant]");if(yo){const m=xe(r.nodes,yo.dataset.guidedVariantNode)?.node,b=m?.variants?.find(S=>S.id===yo.dataset.guidedVariant);if(m&&b){m.activeVariantId=b.id,m.props={...m.props,...b.props};const S=xe(r.nodes,m.id);Ln(m,S?.parent)||T()}return}const Xi=e.target.closest("[data-guided-inline-state]");if(Xi){const m=xe(r.nodes,Xi.dataset.guidedNode||r.selectedId);m?.node?.isLotteryResultPopup?(nt(m.node,Xi.dataset.guidedInlineState||"win"),Ft(m.node),r.selectedId=m.node.id,r.guidedStateMenuNodeId=m.node.id,r.guidedPanelMode=null,Ln(m.node,m.parent)||T()):m?.node&&gn(m.node,Xi.dataset.guidedInlineState)&&(oa(m.node),gd(m.node),r.selectedId=m.node.id,r.guidedStateMenuNodeId=m.node.id,r.guidedPanelMode=null,Ln(m.node,m.parent)||T());return}const wo=e.target.closest("[data-guided-business-state]");if(wo){const m=te();m?.node?.isLotteryResultPopup?(nt(m.node,wo.dataset.guidedBusinessState||"win"),Ft(m.node),Ln(m.node,m.parent)||T()):m?.node&&gn(m.node,wo.dataset.guidedBusinessState)&&(oa(m.node),gd(m.node),Ln(m.node,m.parent)||T());return}const vo=e.target.closest("[data-guided-child-state]");if(vo){const m=xe(r.nodes,vo.dataset.guidedChildStateNode);if(!m?.node)return;const b=vo.dataset.guidedChildState,S=m.parent,B=S?.children?.findIndex(U=>U.id===m.node.id)??-1;S?.sourcePageTemplateId&&S.sourcePageTemplateNodeIndex!==void 0&&B>=0?(md(S.sourcePageTemplateId,Number(S.sourcePageTemplateNodeIndex),B,b),oa(S)):(gn(m.node,b),oa(m.node)),Ln(m.node,S)||T();return}const Ws=e.target.closest("[data-guided-header-level]");if(Ws){const m=Ws.dataset.guidedHeaderLevel==="s"?"s":"default";r.guidedHeaderLevelId=m,yr(m)&&T();return}const Yi=e.target.closest("[data-guided-header-main-visual]");if(Yi){const m=te();if(m?.node?.schemaId==="头图"){const b=Yi.dataset.guidedHeaderMainVisual||"",S=Number(Yi.dataset.guidedHeaderMainVisualOffsetY||0),B=Number(Yi.dataset.guidedHeaderMainVisualScale||1);zt(m.node,b,S,B),nF(b,S,B)}T();return}const So=e.target.closest(".guided-node[data-select]");if(So&&r.view==="guided-preview"){if(r.guidedStateMenuNodeId){r.guidedStateMenuNodeId=null,r.guidedPanelMode=null,r.selectedId=So.dataset.select,T();return}sn(So.dataset.select),ia();return}if(r.view==="guided-preview"&&e.target.closest(".guided-device-stage")&&!e.target.closest(".guided-node")){sn(null),ia({clearSelection:!0}),r.guidedStateMenuNodeId=null;return}const Xs=e.target.closest("[data-demo-replace-module]");if(Xs){const m=te();if(m){const b=m.node,S=ce(Xs.dataset.demoReplaceModule);S.id=b.id;const B=new Set(Object.keys(b.props||{}));if(Object.keys(S.props||{}).forEach(U=>{B.has(U)&&(S.props[U]=b.props[U])}),m.parent){const U=m.parent.children.findIndex(Se=>Se.id===b.id);U>=0&&m.parent.children.splice(U,1,S)}else{const U=r.nodes.findIndex(Se=>Se.id===b.id);U>=0&&r.nodes.splice(U,1,S)}r.selectedId=S.id,T()}return}if(e.target.closest("[data-open-admin-dashboard]")){iP();return}if(e.target.closest("[data-close-admin-auth]")||e.target.matches("[data-admin-auth-modal]")){r.adminAuthModalOpen=!1,r.adminAuthError="",T();return}const Ys=e.target.closest("[data-admin-section]");if(Ys){r.adminSection=Ys.dataset.adminSection,r.adminNotice="",T();return}const Js=e.target.closest("[data-admin-rename-user]");if(Js){const m=Js.dataset.adminRenameUser,b=document.querySelector(`[data-admin-user-name="${CSS.escape(m)}"]`);try{$n(R3(r.collaboration,m,b?.value)),r.adminNotice="用户名称已更新"}catch(S){r.adminNotice=S.message}T();return}const Zs=e.target.closest("[data-admin-update-team]");if(Zs){const m=Zs.dataset.adminUpdateTeam,b=document.querySelector(`[data-admin-team-name="${CSS.escape(m)}"]`)?.value;try{$n(H3(r.collaboration,m,{name:b})),r.adminNotice="组名称已更新"}catch(S){r.adminNotice=S.message}T();return}const Qs=e.target.closest("[data-admin-edit-record]");if(Qs){r.adminEditingRecordId=Qs.dataset.adminEditRecord,T();return}if(e.target.closest("[data-close-admin-record]")||e.target.matches("[data-admin-record-modal]")){r.adminEditingRecordId=null,T();return}if(e.target.closest("[data-open-admin-component-verifier]")){r.view="admin-component-verifier",T();return}if(e.target.closest("[data-back-admin]")){r.view="admin",T();return}const el=e.target.closest("[data-admin-preview-variant]");if(el){const m=Ha(),b=el.dataset.adminPreviewVariant;r.adminComponentVerifier.variantId=b,r.adminComponentVerifier.parentThemeId=an(m,b),T();return}const nl=e.target.closest("[data-admin-preview-state]");if(nl){const m=ee(nl.dataset.adminPreviewState);if(!m)return;const S=Je(m)[0]?.id||null;r.adminComponentVerifier={type:"atom",schemaId:m.id,parentThemeId:an(m,S),variantId:S,blueprint:{...r.adminComponentVerifier?.blueprint||{}}},T();return}const tl=e.target.closest("[data-admin-molecule-child-state]");if(tl){const[m,b]=tl.dataset.adminMoleculeChildState.split("|");r.adminComponentVerifier.childStates={...r.adminComponentVerifier.childStates||{},[m]:b},T();return}const il=e.target.closest("[data-admin-preview-molecule-theme]");if(il){const m=wi();MP(m,r.adminComponentVerifier,il.dataset.adminPreviewMoleculeTheme),T();return}const al=e.target.closest("[data-admin-preview-page-theme]");if(al){r.adminComponentVerifier.parentThemeId=al.dataset.adminPreviewPageTheme,T();return}if(e.target.closest("[data-admin-export-cut]")){const m=document.querySelector("[data-admin-export-cut-capture]");if(m){const b=kt()==="page"?Da():kt()==="molecule"?wi():Ha(),S=`${b?.name||b?.id||"组件切图"}.png`;mT(m,{pixelRatio:2}).then(B=>qi(S,B)).catch(B=>{console.error("[admin-export] cut export failed",B),window.alert(`导出失败：${B?.message||"未知错误"}`)})}return}const ol=e.target.closest("[data-admin-edit-molecule]");if(ol){Ak(ol.dataset.adminEditMolecule);return}if(e.target.closest("[data-open-animation-preview-library]")){r.libraryReturnView=r.view==="admin"?"admin":null,r.view="animation-preview-library",T();return}if(e.target.closest("[data-back-home]")){const m=r.view==="animation-preview-library"&&r.libraryReturnView==="admin"?"admin":"home";r.view=m,m==="home"&&(r.adminUnlocked=!1,_r().catch(b=>{console.warn("后台解锁状态清理失败",b)})),r.libraryReturnView=null,r.selectedId=null,T();return}if(e.target.closest("[data-open-create-modal]")){r.createModalOpen=!1,r.draftTemplateModalOpen=!1,r.draftTemplateModalTarget=null,r.createDraft={name:"新活动",dimensions:["个人用户"],pages:{}},fd();return}if((e.target.closest("[data-close-create-modal]")||e.target.closest("[data-create-modal-overlay]"))&&!(e.target.closest(".create-modal")&&!e.target.closest("[data-close-create-modal]")&&!e.target.matches("[data-create-modal-overlay]"))){if(!e.target.closest("[data-draft-template-modal]")){r.createModalOpen=!1,r.draftTemplateModalOpen=!1,r.draftTemplateModalTarget=null,et();return}}const rl=e.target.closest("[data-create-name]");if(rl){r.createDraft.name=rl.value;return}const To=e.target.closest("[data-dimension-name]");if(To){const m=parseInt(To.dataset.dimensionName,10);r.createDraft.dimensions[m]=To.value;return}if(e.target.closest("[data-add-dimension]")){r.createDraft.dimensions.push(`维度 ${r.createDraft.dimensions.length+1}`),et();return}const sl=e.target.closest("[data-delete-dimension]");if(sl){const m=parseInt(sl.dataset.deleteDimension,10);r.createDraft.dimensions.splice(m,1),et();return}const ll=e.target.closest("[data-add-draft-page]");if(ll){const m=parseInt(ll.dataset.addDraftPage,10),b=r.createDraft.dimensions[m];r.createDraft.pages[b]||(r.createDraft.pages[b]=[]),r.createDraft.pages[b].push({name:`页面 ${r.createDraft.pages[b].length+1}`,templateId:null}),et();return}const dl=e.target.closest("[data-select-page-template]");if(dl){e.stopPropagation(),r.draftTemplateModalTarget=dl.dataset.selectPageTemplate,r.draftTemplateModalOpen=!0,et();return}if(e.target.closest("[data-close-draft-template-modal]")){r.draftTemplateModalOpen=!1,r.draftTemplateModalTarget=null,et();return}const pl=e.target.closest("[data-select-draft-template]");if(pl){if(r.draftTemplateModalTarget){const[m,b]=r.draftTemplateModalTarget.split(":"),S=parseInt(m,10),B=parseInt(b,10),U=r.createDraft.dimensions[S];r.createDraft.pages[U]&&r.createDraft.pages[U][B]&&(r.createDraft.pages[U][B].templateId=pl.dataset.selectDraftTemplate)}r.draftTemplateModalOpen=!1,r.draftTemplateModalTarget=null,et();return}const $o=e.target.closest("[data-delete-page]");if($o&&$o.dataset.deletePage.includes(":")){const[m,b]=$o.dataset.deletePage.split(":"),S=parseInt(m,10),B=parseInt(b,10),U=r.createDraft.dimensions[S];r.createDraft.pages[U]&&r.createDraft.pages[U].splice(B,1),et();return}const Co=e.target.closest("[data-page-name]");if(Co){const[m,b]=Co.dataset.pageName.split(":"),S=parseInt(m,10),B=parseInt(b,10),U=r.createDraft.dimensions[S];r.createDraft.pages[U]&&r.createDraft.pages[U][B]&&(r.createDraft.pages[U][B].name=Co.value);return}if(e.target.closest("[data-create-next]")){const{dimensions:m}=r.createDraft;if(!r.createDraft.name.trim()){alert("请输入活动名称");return}if(!m.length||m.every(b=>!b.trim())){alert("请至少添加一个维度");return}fd();return}if(e.target.closest("[data-back-home]")){r.view="home",r.selectedId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,T();return}if(e.target.closest("[data-save]")){Ut=e.target.closest("[data-save]"),document.querySelector("[data-save-scope-modal]")?.remove(),document.body.insertAdjacentHTML("beforeend",vP());return}if(e.target.closest("[data-save-create-group]")){const m=document.querySelector("[data-save-new-group]");try{const b=ql(r.collaboration,{name:m?.value}),S=b.teams[b.teams.length-1];$n(b),document.querySelector("[data-save-scope-modal]")?.remove();const B=Ut;Ut=null,bd(B,"team",S.id)}catch(b){m?.setCustomValidity(b.message),m?.reportValidity(),m?.setCustomValidity("")}return}const cl=e.target.closest("[data-save-scope]");if(cl){const m=cl.dataset.saveScope==="team"?"team":"personal",b=m==="team"&&document.querySelector("[data-save-group-select]")?.value||"";if(m==="team"&&!ri(b))return;document.querySelector("[data-save-scope-modal]")?.remove();const S=Ut;Ut=null,bd(S,m,b);return}if(e.target.closest("[data-close-save-scope]")||e.target.matches("[data-save-scope-modal]")){document.querySelector("[data-save-scope-modal]")?.remove(),Ut=null;return}const ul=e.target.closest("[data-panel-tab]");if(ul){r.activePanelTab=ul.dataset.panelTab,T();return}const gl=e.target.closest("[data-library]");if(gl){r.activeLibrary=gl.dataset.library,T();return}const ml=e.target.closest("[data-template-id]");if(ml){Dk(ml.dataset.templateId);return}const fl=e.target.closest("[data-custom-template-id]");if(fl){xI(fl.dataset.customTemplateId);return}const xl=e.target.closest("[data-delete-custom-template]");if(xl){const m=xl.dataset.deleteCustomTemplate,b=ne.findIndex(S=>S.id===m);b!==-1&&(ne.splice(b,1),ft(),pa());return}const hl=e.target.closest("[data-save-page-template]");if(hl){const m=hl.dataset.savePageTemplate,b=r.pages.find(S=>S.id===m);b&&(Ql(b,b.name),pa());return}const bl=e.target.closest("[data-save-page-float]");if(bl){const m=bl.dataset.savePageFloat,b=r.pages.find(S=>S.id===m);b&&(Ql(b,b.name),pa());return}const Io=e.target.closest("[data-structure-node]");if(Io){const m=r.pages.find(b=>xe(b.nodes,Io.dataset.structureNode));m&&(r.activePageId=m.id),r.selectedId=Io.dataset.structureNode,r.colorPanelOpen=!1,r.variantPanelOpen=!1,T();return}const yl=e.target.closest("[data-structure-page]");if(yl&&!e.target.closest("[data-structure-node]")){Sn(yl.dataset.structurePage),T();return}if(e.target.closest("[data-add-page]")){xd();return}const wl=e.target.closest("[data-add-page-dimension]");if(wl){xd(wl.dataset.addPageDimension);return}if(e.target.closest("[data-close-page-template-modal]")){hi();return}if(e.target.matches("[data-page-template-overlay]")){hi();return}const vl=e.target.closest("[data-add-page-to-dimension]");if(vl){const m=vl.dataset.addPageToDimension;Ro(m),hi();return}if(e.target.closest("[data-add-blank-page]")){const m=r.pageTemplateModalDimension||r.selectedDimension||Q()?.dimension||"自定义维度";Ro(m),hi();return}if(e.target.closest("[data-add-dimension-page-modal]")){const m=prompt("请输入新维度名称：",`维度 ${r.pages.length+1}`);if(m&&m.trim()){const b=m.trim();Ro(b),hi()}return}const Sl=e.target.closest("[data-add-page-template]");if(Sl){Lk(Sl.dataset.addPageTemplate,r.pageTemplateModalDimension);return}const ko=e.target.closest("[data-delete-page]");if(ko&&!ko.disabled){Gk(ko.dataset.deletePage);return}const Tl=e.target.closest("[data-toggle-page-navbar]");if(Tl){const m=r.pages.find(b=>b.id===Tl.dataset.togglePageNavbar);m&&(m.navBarEnabled=!m.navBarEnabled,r.activePageId=m.id,r.selectedDimension=m.dimension||"未分组",T());return}const $l=e.target.closest("[data-page-title]");if($l){Sn($l.dataset.pageTitle),e.target.closest("[contenteditable='true'], button")||T();return}const Cl=e.target.closest("[data-delete-molecule]");if(Cl){e.preventDefault(),e.stopPropagation();const m=Cl.dataset.deleteMolecule,b=G.find(S=>S.id===m);b&&confirm(`确定要删除分子模板「${b.name}」吗？`)&&(qk(m),T());return}const Il=e.target.closest("[data-tab]");if(Il){r.activeTab=Il.dataset.tab,T();return}if(e.target.closest("[data-toggle-canvas-colors]")){if(e.target.closest("[data-canvas-color-picker]"))return;r.canvasColorPanelOpen=!r.canvasColorPanelOpen,kT();return}const kl=e.target.closest("[data-apply-canvas-color]");if(kl){r.canvasBackground=kl.dataset.applyCanvasColor,r.canvasColorPanelOpen=!1,T();return}const Ji=e.target.closest("[data-select]");if(Ji){if(r.view==="guided-export")return;if(e.target.closest(".guided-lineage-v3-card")){if(e.target.closest("[contenteditable='true'], input, textarea, select"))return;const S=e.target.closest("[data-guided-lineage-card]");S&&(r.selectedLineageVariantId=S.dataset.guidedLineageCard),ze();return}const m=Ji.closest("[data-page-id]");m&&Sn(m.dataset.pageId);const b=Ji.dataset.select;if(r.selectedId!==b&&(r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.propsPanelOpen=!1),r.selectedId=b,e.target.closest("[data-edit-prop]")){document.querySelectorAll(".node-wrap.selected").forEach(S=>S.classList.remove("selected")),Ji.classList.add("selected"),Tn();return}T(),A(".canvas-wrap").focus();return}if(e.target.closest("[data-toggle-colors]")){if(e.target.closest("[data-component-color-picker]"))return;const m=te();m&&(r.selectedId=m.node.id),r.colorPanelOpen=!r.colorPanelOpen,r.variantPanelOpen=!1,r.propsPanelOpen=!1,Tn();return}if(e.target.closest("[data-toggle-props]")){const m=te();m&&(r.selectedId=m.node.id),r.propsPanelOpen=!r.propsPanelOpen,r.variantPanelOpen=!1,r.colorPanelOpen=!1,Tn();return}const Pl=e.target.closest("[data-apply-color]");if(Pl){const m=te();if(m){r.selectedId=m.node.id,ur(m.node,Pl.dataset.applyColor);const b=m.node.variants?.find(S=>S.id===m.node.activeVariantId);b&&["background","textColor","titleColor","bodyColor","priceColor"].forEach(S=>{S in m.node.props&&(b.props[S]=m.node.props[S])})}r.colorPanelOpen=!1,T();return}if(e.target.closest("[data-save-molecule]")){const m=te();m&&m.node.type==="molecule"&&Wk(m.node.id);return}if(e.target.closest("[data-toggle-variants]")){const m=te();m&&(r.selectedId=m.node.id),r.variantPanelOpen=!r.variantPanelOpen,r.colorPanelOpen=!1,r.richtextEditorOpen=!1,Tn();return}if(e.target.closest("[data-toggle-richtext]")){const m=te();m&&(r.selectedId=m.node.id),r.richtextEditorOpen=!r.richtextEditorOpen,r.colorPanelOpen=!1,r.variantPanelOpen=!1,Tn();return}const zl=e.target.closest("[data-apply-variant]");if(zl&&!e.target.closest("[data-variant-prop]")){const m=te(),b=m?.node.variants?.find(S=>S.id===zl.dataset.applyVariant);m&&b&&(m.node.activeVariantId=b.id,m.node.props={...m.node.props,...b.props},T());return}const Fl=e.target.closest("[data-richtext-type]");if(Fl){const m=te();if(m&&m.node.schemaId==="RichText"){const b=parseInt(Fl.dataset.richtextType,10),S=getRichTextParagraphs(m.node);S[b]&&(S[b].type=S[b].type==="title"?"body":"title",S[b].type==="body"&&(S[b].icon=!1),setRichTextParagraphs(m.node,S),Tn(),T())}return}const Nl=e.target.closest("[data-richtext-color]");if(Nl){const m=te();if(m&&m.node.schemaId==="RichText"){const[b,S]=Nl.dataset.richtextColor.split(":"),B=parseInt(b,10),U=getRichTextParagraphs(m.node);U[B]&&(U[B].color=S,setRichTextParagraphs(m.node,U),Tn(),T())}return}const El=e.target.closest("[data-richtext-bullet]");if(El){const m=te();if(m&&m.node.schemaId==="RichText"){const b=parseInt(El.dataset.richtextBullet,10),S=getRichTextParagraphs(m.node);S[b]&&(S[b].bullet=!S[b].bullet,setRichTextParagraphs(m.node,S),Tn(),T())}return}const _l=e.target.closest("[data-richtext-icon]");if(_l){const m=te();if(m&&m.node.schemaId==="RichText"){const b=parseInt(_l.dataset.richtextIcon,10),S=getRichTextParagraphs(m.node);S[b]&&(S[b].icon=!S[b].icon,setRichTextParagraphs(m.node,S),Tn(),T())}return}if(e.target.closest("[data-export-json]")){Rd("页面 JSON",JSON.stringify(O6(),null,2));return}if(e.target.closest("[data-export-html]")){const m=r.pages.map(b=>{const S=document.querySelector(`[data-page-id="${b.id}"]`);return`<!-- ${b.name} -->
${S?.innerHTML.trim()||""}`}).join(`

`);Rd("静态 HTML",m);return}if(e.target.closest("[data-clear]")){Q().nodes=[],r.selectedId=null,T();return}if(e.target.closest("[data-close-modal]")||e.target.classList.contains("code-modal")){A(".code-modal").classList.remove("open");return}const Bl=e.target.closest("[data-page-shell]");Bl&&Sn(Bl.dataset.pageShell);const Al=e.target.closest("[data-select-dimension]");if(Al&&!e.target.closest("[contenteditable='true'], button, [data-page-shell]")){r.selectedDimension=Al.dataset.selectDimension,r.selectedId=null,r.colorPanelOpen=!1,r.variantPanelOpen=!1,T();return}!e.target.closest(".quick-toolbar, .variant-inspector, .richtext-editor")&&e.target.closest(".device-stage, .pages-row, .canvas-world, .dimension-lane, .page, .phone, .empty-canvas")&&(r.selectedId=null,e.target.closest(".device-stage")&&!e.target.closest(".canvas-world, .dimension-lane, .page, .phone, .empty-canvas")&&(r.activePageId=null,r.selectedDimension=null),r.colorPanelOpen=!1,r.variantPanelOpen=!1,r.canvasColorPanelOpen=!1,T())}),document.addEventListener("wheel",e=>{const n=e.target.closest("[data-guided-lineage-map]");if(!n)return;if(e.preventDefault(),!e.ctrlKey){r.guidedLineagePanX-=e.deltaX,r.guidedLineagePanY-=e.deltaY,Ua();return}const t=r.guidedLineageZoom||1,i=$e(t*Math.exp(-e.deltaY*.004),.35,3);if(Math.abs(i-t)<.001)return;const a=n.getBoundingClientRect(),o=e.clientX-a.left,s=e.clientY-a.top,l=(o-r.guidedLineagePanX)/t,d=(s-r.guidedLineagePanY)/t;r.guidedLineageZoom=i,r.guidedLineagePanX=o-l*i,r.guidedLineagePanY=s-d*i,Ua()},{passive:!1}),document.addEventListener("paste",e=>{const n=e.target.closest("[data-prd-blueprint-cell]"),t=e.target.closest("[data-prd-return-strategy-paste-target]");if(!n&&!t)return;const i=n||t,a=i.closest("[data-demo-file-modal]"),s=i.closest("[data-prd-blueprint-module-table]")?.dataset.prdBlueprintModuleTable||"",l=Eo(a),d=No(a),p=a?.querySelector("[data-prd-blueprint-template-select]")?.value||r.prdBlueprintPasteTemplateName,c=CI(e.clipboardData),u=nd(c,p,d,za(l).length>0);if(u?.error){e.preventDefault(),r.prdBlueprintPasteError=u.error,T();return}const g=u?.rows||c.flat();if(!g.length)return;e.preventDefault();const w=u?{rows:td(l,u,s),versions:u.versions,moduleVersions:_n({...r.prdBlueprintPasteModuleVersions,...u.moduleVersions},u.versions)}:MI(l,d,g,Number(n?.dataset.prdBlueprintRowIndex||0),Number(n?.dataset.prdBlueprintCellIndex||0));r.prdBlueprintPasteTemplateName=u?.templateName||p||"",r.prdBlueprintPasteVersions=u?.versions||w.versions,r.prdBlueprintPasteModuleVersions=w.moduleVersions||_n(r.prdBlueprintPasteModuleVersions,r.prdBlueprintPasteVersions),r.prdBlueprintPasteRows=Cn(w.rows,0,Xt(w.rows,r.prdBlueprintPasteVersions,r.prdBlueprintPasteModuleVersions)),u?.guideStateId&&(r.pageTemplateBlueprintStates["page-guide-no-incentive|1"]=u.guideStateId),r.prdBlueprintPasteError="",T()}),document.addEventListener("input",e=>{const n=e.target.closest("[data-resource-global-theme]");if(n){Ra("__themeId",n.value),wd("__themeId",n.value);return}const t=e.target.closest("[data-resource-global-main-visual]");if(t){Ra("mainVisualImage",t.value),wd("mainVisualImage",t.value);return}const i=e.target.closest("[data-resource-activity-name]");if(i){We().activityName=i.value;return}const a=e.target.closest("[data-resource-version-name]");if(a){const[C,E]=a.dataset.resourceVersionName.split("|"),M=We().modules?.[C]?.versions.find(R=>R.id===E);M&&(M.name=a.value);return}const o=e.target.closest("[data-resource-field]");if(o){const[C,E,M]=o.dataset.resourceField.split("|"),R=We().modules?.[C]?.versions.find(X=>X.id===E);R&&(R.values||(R.values={}),R.values[M]=o.value),nS(C,E);return}const s=e.target.closest("[data-placement-case-scrollbar]");if(s){const C=s.closest(".placement-case-carousel-shell")?.querySelector(".placement-case-carousel");if(C){const E=Math.max(0,C.scrollWidth-C.clientWidth),M=Number(s.value)/Number(s.max)*E;C._placementCaseScrollFrame&&cancelAnimationFrame(C._placementCaseScrollFrame),C._placementCaseScrollFrame=requestAnimationFrame(()=>{C.scrollLeft=M,C._placementCaseScrollFrame=null})}return}const l=e.target.closest("[data-prd-blueprint-cell]");if(l){const C=l.closest("[data-demo-file-modal]"),E=Ve(No(C));r.prdBlueprintPasteVersions=E,r.prdBlueprintPasteModuleVersions=_n(r.prdBlueprintPasteModuleVersions,E);const M=Eo(C);r.prdBlueprintPasteRows=Cn(M,12,Xt(M,E,r.prdBlueprintPasteModuleVersions)),r.prdBlueprintPasteError="";return}const d=e.target.closest("[data-prd-blueprint-version-cell]");if(d){const C=d.closest("[data-demo-file-modal]"),E=Ve(No(C));r.prdBlueprintPasteVersions=E,r.prdBlueprintPasteModuleVersions=_n(r.prdBlueprintPasteModuleVersions,E);const M=Eo(C);r.prdBlueprintPasteRows=Cn(M,12,Xt(M,E,r.prdBlueprintPasteModuleVersions)),r.prdBlueprintPasteError="";return}const p=e.target.closest("[data-prd-version-name]");if(p){const C=p.dataset.prdVersionModuleKey,E=p.dataset.prdVersionId;TS(C,E,p.value),oF(C,E,p.value);return}const c=e.target.closest("[data-admin-blueprint-prop]");if(c){const C=c.dataset.adminBlueprintProp;r.adminComponentVerifier.blueprint[C]=c.value,De();return}const u=e.target.closest("[data-admin-molecule-blueprint-prop]");if(u){const C=u.dataset.adminMoleculeBlueprintProp,E=wi(),M=Zr(E,r.adminComponentVerifier).find(R=>(R.compoundKey||Fe(R.childIndex,R.key))===C);if(r.adminComponentVerifier.blueprint[C]=M?.field?.type==="number"?Number(u.value):u.value,M?.scope==="molecule"&&M?.field?.type==="number"){T();return}De();return}const g=e.target.closest("[data-admin-page-blueprint-prop]");if(g){const C=g.dataset.adminPageBlueprintProp,E=Da(),M=ro(E,r.adminComponentVerifier).find(R=>R.compoundKey===C);if(r.adminComponentVerifier.blueprint[C]=M?.field?.type==="number"?Number(g.value):g.value,M?.scope==="molecule"&&M?.field?.type==="number"){T();return}De();return}const w=e.target.closest("[data-guided-lineage-title]");if(w){const C=te(),E=C?.node?je(C.node,w.dataset.guidedLineageTitle):null;E&&(E.title=w.value,a6(Tt(C),E.id,E.title));return}const y=e.target.closest("[data-guided-lineage-dimension-title]");if(y){const C=te(),{dimensions:E}=C?.node?wt(C.node):{dimensions:[]},M=E.find(R=>R.id===y.dataset.guidedLineageDimensionTitle);M&&(M.title=y.value||"未命名维度");return}const h=e.target.closest("[data-guided-lineage-value]");if(h){const C=te(),[E,M]=h.dataset.guidedLineageValue.split("|"),R=C?.node?je(C.node,E):null;R&&(Ai(R.node,M,h.value),Le(C,E,M,h.value),Sd(Tt(C),C?.parent?`${C.parent.children.indexOf(C.node)}.${M}`:M,M,h.value,h),h.closest("[data-lineage-field]")?.classList.toggle("changed",h.value!==h.dataset.initialValue));return}const x=e.target.closest("[data-guided-lineage-inline]");if(x){const C=te(),[E,M]=x.dataset.guidedLineageInline.split("|"),R=C?.node?je(C.node,E):null;if(R){const X=$6(x);Ai(R.node,M,X),Le(C,E,M,X),Sd(Tt(C),C?.parent?`${C.parent.children.indexOf(C.node)}.${M}`:M,M,X,x),e.isComposing||ZS(x,X)}return}const $=e.target.closest("[data-guided-global-value]");if($){const[C,E,M]=$.dataset.guidedGlobalValue.split("|"),R=ln(),fe=R.find(Ie=>Ie.id===C)?.modules.find(Ie=>Ie.id===E),we=fe?.rows[Number(M)];we&&(we.value=$.value,fe.inputScope==="activity"&&R.forEach(Ie=>{const Ae=Ie.modules.find(Me=>Me.inputScope==="activity"&&Me.slot===fe.slot);Ae?.rows[Number(M)]&&(Ae.rows[Number(M)].value=$.value)}));return}const k=e.target.closest("[data-blueprint-prd-field]");if(k){const C=k.dataset.blueprintPrdField;r.selectedDemoPackageId===Oe?Ze()[C]=k.value:li[C]=k.value;return}const F=e.target.closest("[data-prd-header-level-field]");if(F){const C=F.dataset.prdHeaderLevelField;xs(C,F.value),wS(F.dataset.prdHeaderLevelTemplate,Number(F.dataset.prdHeaderLevelModuleIndex));return}const _=e.target.closest("[data-prd-template-variable-row]");if(_){const C=_.dataset.prdTemplateVariableRow;let E=Pn(C);E<0&&(r.prdTableRows.push({key:C,value:""}),E=r.prdTableRows.length-1),r.prdTableRows[E].value=_.type==="checkbox"?_.checked?"true":"":_.value,Id(C,r.prdTableRows[E].value),Wt(C),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="";const M=_.dataset.prdTemplateVariableKey||"",R=_.dataset.prdTemplateVariableLabel||"";if(M==="taskCount"||N(R)===N("任务数量")){const X=_.closest("[data-prd-template-module-row]");ke(X)||T()}else Cd(E);return}const O=e.target.closest("[data-prd-return-tier-type-rows]");if(O){String(O.dataset.prdReturnTierTypeRows||"").split(",").map(E=>Number(E)).filter(E=>Number.isInteger(E)&&E>=0).forEach(E=>{r.prdTableRows[E]&&(r.prdTableRows[E].value=O.value)}),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(O.closest("[data-prd-template-module-row]"))||T();return}const H=e.target.closest("[data-prd-consumption-detail-mode]");if(H){const C=Number(H.dataset.prdConsumptionModuleIndex),E=H.value===at?at:un;Number.isInteger(C)&&(Un(Ni(C),E),E===un&&Ao(C)),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(H.closest("[data-prd-template-module-row]"))||T();return}const L=e.target.closest("[data-prd-consumption-version-tier]");if(L){const C=Number(L.dataset.prdConsumptionModuleIndex),M=(L.dataset.prdConsumptionVersionId||"base")==="base"?"":L.dataset.prdConsumptionVersionName||"",R=Number(L.value)===4?4:3,X=L.dataset.prdConsumptionTemplateId||"";if(Un(eo(C,M),String(R)),R===4){const fe=[...pe,...ne].find(we=>we.id===X);fe&&cr(fe.nodes?.[C])!=="核心玩法模块-抽奖消返-4列"&&pr(X,C,"核心玩法模块-抽奖消返-4列")}r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",ke(L.closest("[data-prd-template-module-row]"))||T();return}const Y=e.target.closest("[data-prd-table-row]");if(Y){const C=Number(Y.dataset.prdTableRow);if(r.prdTableRows[C]){const E=r.prdTableRows[C].key||"";r.prdTableRows[C].value=Y.type==="checkbox"?Y.checked?"true":"":Y.value,Iz(Y);const M=Ce(E);M&&!ct(M.compoundKey)&&Ao(M.moduleIndex),Id(E,r.prdTableRows[C].value),iF(Y,r.prdTableRows[C].value),Wt(E),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",Y.tagName==="SELECT"&&/(?:rewardType[1-4]|第[1-4]档\s*·\s*类型)/.test(E)?ke(Y.closest("[data-prd-template-module-row]"))||T():Cd(C)}return}const K=e.target.closest("[data-blueprint-audience-field]");if(K){const[C,E]=K.dataset.blueprintAudienceField.split("|"),M=Yz().find(R=>R.id===C);M&&(M[E]=K.value);return}const se=e.target.closest("[data-blueprint-module-field]");if(se){const[C,E,M]=se.dataset.blueprintModuleField.split("|"),{module:R}=Bn(C,E);R&&(R[M]=se.value);return}const I=e.target.closest("[data-blueprint-group-name]");if(I){const[C,E,M]=I.dataset.blueprintGroupName.split("|"),{module:R}=Bn(C,E),X=R?hn(R).find(fe=>fe.id===M):null;X&&(X.name=I.value.trim()||"未命名分组");return}const z=e.target.closest("[data-blueprint-variant-value]");if(z){Pr();const C=st(z.value);z.rows=C,z.closest(".blueprint-variant-value-cell")?.classList.toggle("is-multiline",C>1);const[E,M,R,X]=z.dataset.blueprintVariantValue.split("|"),{module:fe}=Bn(E,M),we=fe?hn(fe):[],Ie=we.find(Me=>Me.id===R),Ae=Ie?.rows[Number(X)];if(Ae){if(Ae.value=z.value,Ae.moleculePropKey){const Me=zS({...fe,rows:Ie.rows});Me?.length&&(Ie.rows=Me),we[0]?.id===R&&(fe.rows=oe(Ie.rows)),z.dataset.blueprintRefreshOnBlur="true";return}we[0]?.id===R&&(fe.rows=oe(Ie.rows))}return}const D=e.target.closest("[data-blueprint-value]");if(D){Pr();const C=st(D.value);D.rows=C,D.closest(".blueprint-compact-field")?.classList.toggle("is-multiline",C>1);const[E,M,R]=D.dataset.blueprintValue.split("|"),X=ln(),we=X.find(Ae=>Ae.id===E)?.modules.find(Ae=>Ae.id===M),Ie=we?.rows[Number(R)];if(Ie){if(Ie.value=D.value,Ie.moleculePropKey){po(we),D.dataset.blueprintRefreshOnBlur="true";return}we.inputScope==="activity"&&X.forEach(Ae=>{const Me=Ae.modules.find(vn=>vn.inputScope==="activity"&&vn.slot===we.slot);Me?.rows[Number(R)]&&(Me.rows[Number(R)].value=D.value)})}return}const j=e.target.closest("[data-blueprint-state-value]");if(j){const C=st(j.value);j.rows=C,j.closest(".blueprint-compact-field")?.classList.toggle("is-multiline",C>1);const[E,M,R,X]=j.dataset.blueprintStateValue.split("|"),Me=ln().find(vn=>vn.id===E)?.modules.find(vn=>vn.id===M)?.states?.find(vn=>vn.id===R)?.rows[Number(X)];Me&&(Me.value=j.value);return}const W=e.target.closest("[data-demo-prop-input]");if(W&&r.view==="guided-preview"){const C=te();if(C){const E=W.dataset.demoPropInput;C.node.props[E]=W.value,Le(C,C.parent?.activeLineageVariantId||C.node.activeLineageVariantId||"base",E,W.value);const M=document.querySelector(`[data-node-id="${C.node.id}"]`);M&&(M.innerHTML=`
            <div class="guided-node-kind">${v(_a[bn(C.node.schemaId)]||"模块")}</div>
            ${ge(C.node)}
          `,window.renderReactMaterials?.(M))}return}const Z=e.target.closest("[data-create-activity-name]");if(Z){r.createDraft.name=Z.value;return}if(e.target.closest("[data-edit-activity-name]")){r.activity.name=e.target.textContent.trim()||"未命名活动";return}const J=e.target.closest("[data-edit-page-name]");if(J){const C=r.pages.find(E=>E.id===J.dataset.editPageName);C&&(C.name=J.textContent.trim()||"未命名页面"),He(),Zt();return}const P=e.target.closest("[data-edit-page-dimension]");if(P){const C=r.pages.find(E=>E.id===P.dataset.editPageDimension);C&&(C.dimension=P.textContent.trim()||"未分组"),Zt();return}const q=e.target.closest("[data-edit-dimension]");if(q){const C=q.dataset.editDimension,E=q.textContent.trim()||"未分组";r.pages.forEach(M=>{(M.dimension||"未分组")===C&&(M.dimension=E)}),q.dataset.editDimension=E,r.selectedDimension=E,Zt();return}const V=e.target.closest("[data-edit-page-tags]");if(V){const C=r.pages.find(E=>E.id===V.dataset.editPageTags);C&&(C.tags=V.textContent.split(/[、,，/]+/).map(E=>E.trim()).filter(Boolean)),Zt();return}const ie=e.target.closest("[data-canvas-color-picker]");if(ie){r.canvasBackground=ie.value,r.canvasColorPanelOpen=!1,T();return}const me=e.target.closest("[data-component-color-picker]");if(me){const C=te();if(C){r.selectedId=C.node.id,ur(C.node,me.value);const E=C.node.variants?.find(M=>M.id===C.node.activeVariantId);E&&["background","textColor","titleColor","bodyColor","priceColor"].forEach(M=>{M in C.node.props&&(E.props[M]=C.node.props[M])}),r.colorPanelOpen=!1,T()}return}const ye=e.target.closest("[data-edit-prop]"),le=e.target.closest("[data-variant-prop]"),Qn=ye?.closest("[data-node-id]")?.dataset.nodeId,ae=xe(r.nodes,Qn||r.selectedId);if(ae){if(ye){const C=ye.closest("[data-guided-popup-prize-preview]"),E=ye.closest('[data-guided-popup-result-preview="lose"]');ae.node.isLotteryResultPopup&&C?Yo(ae.node,Number(C.dataset.guidedPopupPrizePreview)||1):ae.node.isLotteryResultPopup&&E&&nt(ae.node,"lose");const M=ha(ye),R=ye.textContent,X=ye.dataset.editProp;ae.node.props[X]=R;const fe=ae.node.variants?.find(we=>we.id===ae.node.activeVariantId);if(fe&&X in fe.props){fe.props[X]=R;const we=document.querySelector(`[data-variant-id="${fe.id}"][data-variant-prop="${X}"]`);we&&(we.textContent=R)}if(Le(ae,ae.parent?.activeLineageVariantId||ae.node.activeLineageVariantId||"base",X,R),r.view==="guided-preview"&&lt(ae.node)&&!E&&(Nt(ae.node),Ti(ae.node)),Qo(ae.node,X,e)&&fa(ae.node,X,M,ae.parent))return;Et();return}if(le){const C=ae.node.variants?.find(M=>M.id===le.dataset.variantId);if(!C)return;const E=le.textContent;if(C.props[le.dataset.variantProp]=E,ae.node.activeVariantId===C.id){ae.node.props[le.dataset.variantProp]=E;const M=document.querySelector(`[data-node-id="${ae.node.id}"] [data-edit-prop="${le.dataset.variantProp}"]`);if(M&&(M.textContent=E),Qo(ae.node,le.dataset.variantProp,e)&&fa(ae.node,le.dataset.variantProp,ha(le),ae.parent))return}Le(ae,C.id,le.dataset.variantProp,E),Et()}}}),document.addEventListener("compositionend",e=>{if(r.view!=="guided-preview")return;const n=e.target.closest("[data-edit-prop]"),t=e.target.closest("[data-variant-prop]"),i=n?.dataset.editProp||t?.dataset.variantProp,a=(n||t)?.closest("[data-node-id]")?.dataset.nodeId,o=xe(r.nodes,a||r.selectedId);if(!o?.node||!Qo(o.node,i,e))return;const s=n||t,l=s.closest("[data-guided-popup-prize-preview]"),d=s.closest('[data-guided-popup-result-preview="lose"]');o.node.isLotteryResultPopup&&l?Yo(o.node,Number(l.dataset.guidedPopupPrizePreview)||1):o.node.isLotteryResultPopup&&d&&nt(o.node,"lose");const p=s.textContent;if(n){o.node.props[i]=p;const c=o.node.variants?.find(u=>u.id===o.node.activeVariantId);c&&i in c.props&&(c.props[i]=p),Le(o,o.parent?.activeLineageVariantId||o.node.activeLineageVariantId||"base",i,p)}else if(t){const c=o.node.variants?.find(u=>u.id===t.dataset.variantId);if(!c)return;c.props[i]=p,o.node.activeVariantId===c.id&&(o.node.props[i]=p),Le(o,c.id,i,p)}fa(o.node,i,ha(s),o.parent)}),document.addEventListener("focusout",e=>{e.target.closest("[data-edit-page-dimension], [data-edit-dimension]")&&T();const n=e.target.closest("[data-prd-template-variable-row]"),t=e.target.closest("[data-prd-table-row]"),i=Number(n?.dataset.prdTemplateVariableRow?Pn(n.dataset.prdTemplateVariableRow):t?.dataset.prdTableRow);if(Number.isInteger(i)&&i>=0&&mz(i),e.target.closest("[data-blueprint-refresh-on-blur]")&&BN(),r.view!=="guided-preview")return;const a=e.target.closest("[data-edit-prop], [data-variant-prop]");if(a?.closest('[data-guided-popup-result-preview="lose"]')){window.requestAnimationFrame(()=>{r.view==="guided-preview"&&At()});return}const o=a?.closest("[data-node-id]")?.dataset.nodeId,s=xe(r.nodes,o||r.selectedId);lt(s?.node)&&(Nt(s.node),Ti(s.node),s.node.pendingLotteryPrizeOriginalName="",s.node.pendingLotteryPrizeOriginalValue="",window.requestAnimationFrame(()=>{r.view==="guided-preview"&&At()}))}),document.addEventListener("input",e=>{const n=e.target.closest("[data-node-prize-name-input]");if(n){const I=te(),z=n.dataset.nodePrizeNameInput;if(!I||!z)return;const D=n.dataset.nodePropChildIndex,j=D===void 0?I.node:I.node.children?.[Number(D)];if(!j?.props)return;const W=Gn(j.props[z],n.value);j.props[z]=W,qe(j.props,z,W),nn(n,W);const Z=j.variants?.find(J=>J.id===j.activeVariantId);if(Z&&z in Z.props&&(Z.props[z]=W,qe(Z.props,z,W)),Le(D===void 0?I:{node:j,parent:I.node},j.activeLineageVariantId||I.node.activeLineageVariantId||"base",z,W),Jo(I.node,z)){St();return}St();return}const t=e.target.closest("[data-node-prize-copy-input]");if(t){const I=te(),z=t.dataset.nodePrizeCopyInput;if(!I||!z)return;const D=t.dataset.nodePropChildIndex,j=D===void 0?I.node:I.node.children?.[Number(D)];if(!j?.props)return;const W=On(j.props[z],t.value);j.props[z]=W,qe(j.props,z,W);const Z=j.variants?.find(J=>J.id===j.activeVariantId);if(Z&&z in Z.props&&(Z.props[z]=W,qe(Z.props,z,W)),Le(D===void 0?I:{node:j,parent:I.node},j.activeLineageVariantId||I.node.activeLineageVariantId||"base",z,W),Jo(I.node,z)){St();return}St();return}const i=e.target.closest("[data-node-prize-amount-input]");if(i){const I=te(),z=i.dataset.nodePrizeAmountInput;if(!I||!z)return;const D=i.dataset.nodePropChildIndex,j=D===void 0?I.node:I.node.children?.[Number(D)];if(!j?.props)return;const W=Kt(j.props[z],i.value);j.props[z]=W,qe(j.props,z,W),nn(i,W);const Z=j.variants?.find(J=>J.id===j.activeVariantId);if(Z&&z in Z.props&&(Z.props[z]=W,qe(Z.props,z,W)),Le(D===void 0?I:{node:j,parent:I.node},j.activeLineageVariantId||I.node.activeLineageVariantId||"base",z,W),Jo(I.node,z)){St();return}St();return}const a=e.target.closest("[data-admin-prize-name-prop]");if(a){const I=a.dataset.adminPrizeNameProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Gn(r.adminComponentVerifier.blueprint[I],a.value),qe(r.adminComponentVerifier.blueprint,I,r.adminComponentVerifier.blueprint[I]),nn(a,r.adminComponentVerifier.blueprint[I]),De();return}const o=e.target.closest("[data-admin-prize-copy-prop]");if(o){const I=o.dataset.adminPrizeCopyProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=On(r.adminComponentVerifier.blueprint[I],o.value),De();return}const s=e.target.closest("[data-admin-prize-amount-prop]");if(s){const I=s.dataset.adminPrizeAmountProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Kt(r.adminComponentVerifier.blueprint[I],s.value),nn(s,r.adminComponentVerifier.blueprint[I]),De();return}const l=e.target.closest("[data-admin-molecule-prize-name-prop]");if(l){const I=l.dataset.adminMoleculePrizeNameProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Gn(r.adminComponentVerifier.blueprint[I],l.value),qe(r.adminComponentVerifier.blueprint,I,r.adminComponentVerifier.blueprint[I]),nn(l,r.adminComponentVerifier.blueprint[I]),De();return}const d=e.target.closest("[data-admin-molecule-prize-copy-prop]");if(d){const I=d.dataset.adminMoleculePrizeCopyProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=On(r.adminComponentVerifier.blueprint[I],d.value),De();return}const p=e.target.closest("[data-admin-molecule-prize-amount-prop]");if(p){const I=p.dataset.adminMoleculePrizeAmountProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Kt(r.adminComponentVerifier.blueprint[I],p.value),nn(p,r.adminComponentVerifier.blueprint[I]),De();return}const c=e.target.closest("[data-admin-page-prize-name-prop]");if(c){const I=c.dataset.adminPagePrizeNameProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Gn(r.adminComponentVerifier.blueprint[I],c.value),qe(r.adminComponentVerifier.blueprint,I,r.adminComponentVerifier.blueprint[I]),nn(c,r.adminComponentVerifier.blueprint[I]),De();return}const u=e.target.closest("[data-admin-page-prize-copy-prop]");if(u){const I=u.dataset.adminPagePrizeCopyProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=On(r.adminComponentVerifier.blueprint[I],u.value),De();return}const g=e.target.closest("[data-admin-page-prize-amount-prop]");if(g){const I=g.dataset.adminPagePrizeAmountProp;if(!I)return;r.adminComponentVerifier.blueprint[I]=Kt(r.adminComponentVerifier.blueprint[I],g.value),nn(g,r.adminComponentVerifier.blueprint[I]),De();return}const w=e.target.closest("[data-blueprint-prize-name-value]");if(w){const[I,z,D]=w.dataset.blueprintPrizeNameValue.split("|"),j=ln(),Z=j.find(P=>P.id===I)?.modules.find(P=>P.id===z),J=Z?.rows[Number(D)];if(J){const P=Gn(J.value,w.value);J.value=P,nn(w,P),Z.inputScope==="activity"&&j.forEach(q=>{const V=q.modules.find(ie=>ie.inputScope==="activity"&&ie.slot===Z.slot);V?.rows[Number(D)]&&(V.rows[Number(D)].value=P)})}return}const y=e.target.closest("[data-blueprint-prize-copy-value]");if(y){const[I,z,D]=y.dataset.blueprintPrizeCopyValue.split("|"),j=ln(),Z=j.find(P=>P.id===I)?.modules.find(P=>P.id===z),J=Z?.rows[Number(D)];if(J){const P=On(J.value,y.value);J.value=P,Z.inputScope==="activity"&&j.forEach(q=>{const V=q.modules.find(ie=>ie.inputScope==="activity"&&ie.slot===Z.slot);V?.rows[Number(D)]&&(V.rows[Number(D)].value=P)})}return}const h=e.target.closest("[data-blueprint-prize-amount-value]");if(h){const[I,z,D]=h.dataset.blueprintPrizeAmountValue.split("|"),J=ln().find(P=>P.id===I)?.modules.find(P=>P.id===z)?.rows[Number(D)];J&&(J.value=Kt(J.value,h.value),nn(h,J.value));return}const x=e.target.closest("[data-prd-prize-name-row]");if(x){const I=Number(x.dataset.prdPrizeNameRow);r.prdTableRows[I]&&(r.prdTableRows[I].value=Gn(r.prdTableRows[I].value,x.value),nn(x,r.prdTableRows[I].value),Wt(r.prdTableRows[I].key||""),Jt(I));return}const $=e.target.closest("[data-prd-prize-amount-row]"),k=e.target.closest("[data-prd-prize-copy-row]");if(k){const I=Number(k.dataset.prdPrizeCopyRow);r.prdTableRows[I]&&(r.prdTableRows[I].value=On(r.prdTableRows[I].value,k.value),nn(k,r.prdTableRows[I].value),Wt(r.prdTableRows[I].key||""),Jt(I));return}if($){const I=Number($.dataset.prdPrizeAmountRow);r.prdTableRows[I]&&(r.prdTableRows[I].value=Kt(r.prdTableRows[I].value,$.value),nn($,r.prdTableRows[I].value),Wt(r.prdTableRows[I].key||""),Jt(I));return}const F=e.target.closest("[data-node-prop-input]");if(!F)return;const _=te();if(!_)return;const O=F.dataset.nodePropChildIndex,H=O===void 0?_.node:_.node.children?.[Number(O)];if(!H?.props)return;const Y=((H.type==="molecule"?G.find(I=>I.id===H.schemaId):ee(H.schemaId))?.props||[]).find(I=>(I.key||I.name)===F.dataset.nodePropInput);if(!Y)return;let K;if(Y.type==="boolean"){K=F.checked;const I=F.closest(".node-prop-switch")?.querySelector("span");I&&(I.textContent=K?"开启":"关闭")}else Y.type==="number"?K=Number(F.value):K=F.value;H.props[F.dataset.nodePropInput]=K,In(Y)&&qe(H.props,F.dataset.nodePropInput,K);const se=H.variants?.find(I=>I.id===H.activeVariantId);if(se&&F.dataset.nodePropInput in se.props&&(se.props[F.dataset.nodePropInput]=K,In(Y)&&qe(se.props,F.dataset.nodePropInput,K)),Le(O===void 0?_:{node:H,parent:_.node},H.activeLineageVariantId||_.node.activeLineageVariantId||"base",F.dataset.nodePropInput,K),r.view==="guided-preview"&&lt(_.node)){Nt(_.node),Ti(_.node);return}H.type==="molecule"&&(Ri(H),mn([H],Qe(Q()).id)),St()}),document.addEventListener("change",e=>{const n=e.target.closest("[data-history-group-select]");if(n){r.historyGroupId=n.value,T();return}const t=e.target.closest("[data-prd-blueprint-template-select]");if(t){r.prdBlueprintPasteTemplateName=t.value,r.prdBlueprintPasteVersions=t.value?["人群1","人群2","人群3"]:Ve([]),r.prdBlueprintPasteModuleVersions={},r.prdBlueprintPasteRows=t.value?Oo(t.value,r.prdBlueprintPasteVersions):Cn([]),r.prdBlueprintPasteError="",T();return}const i=e.target.closest("[data-admin-verifier-type]");if(i){if(i.value==="molecule"){const h=G.find(x=>x.id!=="MoleculeContainer");r.adminComponentVerifier={type:"molecule",schemaId:h?.id||"",blueprint:{},childStates:{}}}else if(i.value==="page"){const h=[...pe,...ne].find(x=>x.id!=="blank-page");r.adminComponentVerifier={type:"page",schemaId:h?.id||"",blueprint:{}}}else{const h=jt[0],$=Je(h)[0]?.id||null;r.adminComponentVerifier={type:"atom",schemaId:h.id,parentThemeId:an(h,$),variantId:$,blueprint:{}}}T();return}const a=e.target.closest("[data-admin-select-component]");if(a){if(kt()==="page"){const k=[...pe,...ne].find(F=>F.id===a.value);if(!k)return;r.adminComponentVerifier={type:"page",schemaId:k.id,blueprint:{}},T();return}if(kt()==="molecule"){const k=G.find(F=>F.id===a.value);if(!k)return;r.adminComponentVerifier={type:"molecule",schemaId:k.id,blueprint:{},childStates:{}},T();return}const h=ee(a.value);if(!h)return;const $=Je(h)[0]?.id||null;r.adminComponentVerifier={type:"atom",schemaId:h.id,parentThemeId:an(h,$),variantId:$,blueprint:{}},T();return}const o=e.target.closest("[data-prd-prize-table-row]");if(o){const h=Number(o.dataset.prdPrizeTableRow);r.prdTableRows[h]&&(r.prdTableRows[h].value=o.value,Wt(r.prdTableRows[h].key||""),r.prdTableBlueprint=null,r.prdTableBlueprintSignature="",qt(o),Jt(h));return}const s=e.target.closest(".prize-library-select[data-admin-page-blueprint-prop]");if(s){const h=s.dataset.adminPageBlueprintProp;r.adminComponentVerifier.blueprint[h]=s.value,qe(r.adminComponentVerifier.blueprint,h,s.value),qt(s),De();return}const l=e.target.closest(".prize-library-select[data-admin-molecule-blueprint-prop]");if(l){const h=l.dataset.adminMoleculeBlueprintProp;r.adminComponentVerifier.blueprint[h]=l.value,qe(r.adminComponentVerifier.blueprint,h,l.value),qt(l),De();return}const d=e.target.closest(".prize-library-select[data-admin-prize-prop]");if(d){const h=d.dataset.adminPrizeProp;r.adminComponentVerifier.blueprint[h]=d.value,qe(r.adminComponentVerifier.blueprint,h,d.value),qt(d),De();return}const p=e.target.closest(["select[data-prd-table-row]","select[data-prd-return-tier-type-rows]","select[data-prd-consumption-detail-mode]","select[data-prd-consumption-version-tier]","select[data-prd-template-variable-row]","select[data-blueprint-value]","select[data-blueprint-variant-value]","select[data-admin-blueprint-prop]","select[data-admin-molecule-blueprint-prop]","select[data-admin-page-blueprint-prop]"].join(","));if(p){p.dispatchEvent(new Event("input",{bubbles:!0}));return}const c=e.target.closest("[data-blueprint-prize-value]");if(c){const[h,x,$]=c.dataset.blueprintPrizeValue.split("|"),k=ln(),_=k.find(H=>H.id===h)?.modules.find(H=>H.id===x),O=_?.rows[Number($)];O&&(O.value=c.value,qt(c),_.inputScope==="activity"&&k.forEach(H=>{const L=H.modules.find(Y=>Y.inputScope==="activity"&&Y.slot===_.slot);L?.rows[Number($)]&&(L.rows[Number($)].value=c.value)}));return}const u=e.target.closest("[data-demo-package]");if(u){r.selectedDemoPackageId=u.dataset.demoPackage,T();return}const g=e.target.closest("[data-node-prop-input]");if(g){const h=te(),x=g.dataset.nodePropChildIndex,$=x===void 0?h?.node:h?.node.children?.[Number(x)],F=(($?ee($.schemaId):null)?.props||[]).find(_=>(_.key||_.name)===g.dataset.nodePropInput);In(F)&&qt(g),g.dispatchEvent(new Event("input",{bubbles:!0}));return}const w=e.target.closest("[data-page-type]");if(!w)return;const y=w.dataset.pageType;w.checked?r.createDraft.pageTypes.includes(y)||r.createDraft.pageTypes.push(y):r.createDraft.pageTypes=r.createDraft.pageTypes.filter(h=>h!==y)}),document.addEventListener("keydown",e=>{if(e.code==="Space"&&!e.repeat&&!e.target.closest("input, textarea, select, [contenteditable='true']")){r.spaceDown=!0,e.preventDefault();return}const n=e.target.closest("input, textarea, select, [contenteditable='true']");r.view==="workbench"&&(!["Delete","Del","Backspace"].includes(e.key)||n||!r.selectedId||(e.preventDefault(),e.stopPropagation(),Uv(r.selectedId),r.selectedId=null,T()))},!0),document.addEventListener("keyup",e=>{e.code==="Space"&&(r.spaceDown=!1)}),document.addEventListener("mousedown",MN),document.addEventListener("mousemove",jN),document.addEventListener("mouseup",RN),window.addEventListener("resize",()=>{fn(),Et()}),Gs(A(".workspace .device-stage"))}function Gs(e){if(!e||e.dataset.canvasInteractionsBound==="true")return;e.dataset.canvasInteractionsBound="true",e.addEventListener("scroll",Et);let n=null,t=null,i=null,a=null;e.addEventListener("wheel",o=>{o.preventDefault(),t={deltaX:o.deltaX,deltaY:o.deltaY,ctrlKey:o.ctrlKey,clientX:o.clientX,clientY:o.clientY},window.__isZooming||(IT(),window.__isZooming=!0),i&&clearTimeout(i),i=setTimeout(()=>{window.__isZooming=!1,a&&cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=null,He(),fn()})},150),!n&&(n=requestAnimationFrame(()=>{if(n=null,!t)return;const s=t;t=null,s.ctrlKey?_N({deltaY:s.deltaY,clientX:s.clientX,clientY:s.clientY}):(r.canvasPanX-=s.deltaX,r.canvasPanY-=s.deltaY,He())}))},{passive:!1})}function MN(e){const n=e.target.closest("[data-guided-lineage-map]"),t=e.target.closest("button, input, textarea, select, [contenteditable='true']");if(n&&e.button===0&&!t){r.guidedLineagePanDrag={startX:e.clientX,startY:e.clientY,originX:r.guidedLineagePanX,originY:r.guidedLineagePanY},e.preventDefault();return}const i=e.target.closest(".device-stage"),a=e.target.closest("[data-material-id]"),o=r.view==="guided-preview"?e.target.closest("[data-guided-add-molecule]"):null,s=r.view==="guided-preview"?null:e.target.closest(".node-wrap.root"),l=r.view==="guided-preview"?null:e.target.closest(".molecule-child"),d=e.target.closest("input, textarea, select, [contenteditable='true']"),p=e.target.closest(".quick-toolbar, .variant-inspector, .richtext-editor, .topbar, [data-delete-molecule], .placement-case-carousel")||d&&!o,c=i?.classList.contains("guided-device-stage")&&!e.target.closest(".guided-node, .guided-floating-panel, .guided-bottom-nav, .guided-page-title-node, .guided-page-shell, .guided-phone, .guided-device-stage [data-page-id], button");if(i&&!p&&(e.button===1||e.button===0&&(r.spaceDown||c))){r.canvasPanDrag={startX:e.clientX,startY:e.clientY,originX:r.canvasPanX,originY:r.canvasPanY},e.preventDefault();return}if(e.button!==0||p||!a&&!s&&!l&&!o)return;const u=(s||l)?.closest("[data-page-id]");u&&Sn(u.dataset.pageId);const g=s||l,w=g?.dataset.nodeId,y=g?.querySelector(".node-label")?.textContent,h=o?.querySelector("strong")?.textContent||G.find(x=>x.id===o?.dataset.guidedAddMolecule)?.name;r.pointerDrag={kind:o?"guided-molecule":a?"material":"node",schemaId:o?.dataset.guidedAddMolecule||a?.dataset.materialId,type:o?"molecule":a?.dataset.type,nodeId:w,sourcePageId:u?.dataset.pageId,label:o?h:a?a.querySelector("strong")?.textContent:y||"组件",startX:e.clientX,startY:e.clientY,active:!1,ghost:null}}function jN(e){if(r.guidedLineagePanDrag){r.guidedLineagePanX=r.guidedLineagePanDrag.originX+e.clientX-r.guidedLineagePanDrag.startX,r.guidedLineagePanY=r.guidedLineagePanDrag.originY+e.clientY-r.guidedLineagePanDrag.startY,Ua(),e.preventDefault();return}if(r.canvasPanDrag){r.canvasPanX=r.canvasPanDrag.originX+e.clientX-r.canvasPanDrag.startX,r.canvasPanY=r.canvasPanDrag.originY+e.clientY-r.canvasPanDrag.startY,He(),e.preventDefault();return}const n=r.pointerDrag;if(!n)return;const t=Math.hypot(e.clientX-n.startX,e.clientY-n.startY);if(!n.active&&t<6)return;n.active||(n.active=!0,r.suppressClick=!0,n.ghost=document.createElement("div"),n.ghost.className="drag-ghost",n.ghost.textContent=n.kind==="node"?`移动 ${n.label}`:`添加 ${n.label}`,document.body.appendChild(n.ghost)),e.preventDefault(),n.ghost.style.left=`${e.clientX+12}px`,n.ghost.style.top=`${e.clientY+12}px`;const a=G6(e)?.dataset.pageId||null;let o=null,s=null;if(a&&n.kind!=="guided-molecule"){const d=D6(e);d&&xe(r.nodes,d)&&(o=d,s=L6(e,d))}const l=a&&!o?H6(e,a):null;(r.dropIndex!==l||r.dropPageId!==a||r.dropMoleculeId!==o||r.dropChildIndex!==s)&&(r.dropIndex=l,r.dropPageId=a,r.dropMoleculeId=o,r.dropChildIndex=s,a&&(r.activePageId=a),r.view==="guided-preview"?At():_s(),He())}function RN(e){if(r.guidedLineagePanDrag){r.guidedLineagePanDrag=null,e.preventDefault();return}if(r.canvasPanDrag){r.canvasPanDrag=null,e.preventDefault();return}const n=r.pointerDrag;n&&(n.ghost&&n.ghost.remove(),n.active&&(r.dropPageId&&(r.activePageId=r.dropPageId),r.dropMoleculeId&&r.dropChildIndex!==null?n.kind==="material"&&n.type==="atom"?Vk(n.schemaId,r.dropMoleculeId,r.dropChildIndex):n.kind==="node"&&Uk(n.nodeId,r.dropMoleculeId,r.dropChildIndex):r.dropIndex!==null&&(n.kind==="guided-molecule"?Nv(r.dropPageId||r.activePageId,r.dropIndex,n.schemaId)&&(r.guidedPanelMode=null):n.kind==="material"?Hk(n.schemaId,n.type,r.dropIndex):(Ok(n.nodeId,r.dropIndex,n.sourcePageId,r.activePageId),r.selectedId=n.nodeId,r.colorPanelOpen=!1,r.variantPanelOpen=!1))),r.pointerDrag=null,r.dropIndex=null,r.dropPageId=null,r.dropMoleculeId=null,r.dropChildIndex=null,n.active&&T(),n.active&&(window.setTimeout(()=>{r.suppressClick=!1},0),e.preventDefault()))}function HN(){A("#app").innerHTML=`
    <main class="app-shell">
      <header class="topbar">
        <div class="brand">
          <strong>H5 Visual Builder</strong>
          <span>活动 / 页面 / 分子 / 原子</span>
        </div>
        <div class="top-actions">
          <button data-back-home>活动中心</button>
          <button data-open-my-projects>我的</button>
          <button data-save class="save-btn">保存</button>
        </div>
      </header>
      <section class="activity-center"></section>
      <section class="workspace">
        <aside class="panel">
          <div class="panel-tabs">
            <button class="panel-tab active" data-panel-tab="materials">物料库</button>
            <button class="panel-tab" data-panel-tab="structure">结构树</button>
          </div>
          <section class="library-panel" data-panel-content="materials">
            <div class="panel-head compact">
              <div class="panel-title">物料库</div>
              <div class="panel-subtitle">拖拽物料到画布。</div>
            </div>
            <div class="library-switch">
              <button class="library-tab active" data-library="materials">物料库</button>
              <button class="library-tab" data-library="templates">模板库</button>
            </div>
            <div class="tabs">
              <button class="tab active" data-tab="atom">原子组件</button>
              <button class="tab" data-tab="molecule">分子组件</button>
            </div>
            <div class="material-list"></div>
          </section>
          <section class="structure-panel" data-panel-content="structure" style="display:none;">
            <div class="structure-tree"></div>
          </section>
        </aside>
        <section class="canvas-wrap" tabindex="-1">
          <div class="canvas-toolbar">
            <strong>H5 画布</strong>
            <div class="canvas-toolbar-actions">
              <button class="add-page-button" data-add-page>新增页面</button>
              <div class="canvas-color-control"></div>
              <span class="meta"></span>
            </div>
          </div>
          <div class="device-stage">
            <div class="pages-row"></div>
          </div>
        </section>
      </section>
      <div class="quick-toolbar"></div>
      <div class="page-save-float"></div>
      <aside class="variant-inspector"></aside>
      <aside class="richtext-editor"></aside>
      <div class="page-template-modal-container"></div>
      <div class="code-modal">
        <div class="code-box">
          <div class="code-head">
            <strong>导出</strong>
            <button data-close-modal>关闭</button>
          </div>
          <pre></pre>
        </div>
      </div>
    </main>
  `,AN(),document.addEventListener("input",Do),document.addEventListener("change",Do),document.addEventListener("click",()=>{window.setTimeout(Do,0)}),r.adminUnlocked=!1,_r().catch(e=>{console.warn("后台解锁状态清理失败",e)}),T(),Wv()}HN();
