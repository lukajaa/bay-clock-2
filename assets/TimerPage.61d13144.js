import{a6 as M,r as s,a7 as o,a8 as u,a9 as n,ah as h,an as y,aa as k,ac as f,ag as r,C as V,aj as m,a2 as Q,al as S,am as g,ak as b}from"./index.4db8ee6b.js";import{b as I,Q as T,a as C}from"./QSlider.b9852c23.js";import{B as U}from"./BackButton.4d3f0d8b.js";const j={class:"window-height row items-center text-center full-height full-width bg-blue"},N={class:"col items-center"},P={key:0,class:"column justify-center items-center"},D={key:1,class:"q-my-none text-white"},E={class:"text-white q-my-md"},F={key:1,class:"column justify-center items-center"},L={key:0},Y={class:"text-white q-my-md"},$={key:1,class:"text-white q-my-md"},z={key:0,class:"fixed-bottom text-white q-pa-md"},A=n("p",null," The original idea for homework timers on Bay Clock was part of Ella Yacubian's creative process project. ",-1),G=n("p",null,[b(" The Pomodoro Technique was developed by Francesco Cirillo. It functions in 30 minute blocks with 25 minutes allotted for work and 5 minutes for a break. Learn more "),n("a",{href:"https://todoist.com/productivity-methods/pomodoro-technique"},"here"),b(". ")],-1),R=M({__name:"TimerPage",setup(H){const p=s("pomodoro"),c=s("25:00"),a=s("none"),_=s(""),d=s(25),i=s("off"),v=s(""),e=s(0),w=s(!1);function B(){a.value="work",e.value=1500,setInterval(()=>{e.value-=1,c.value=Math.floor(e.value/60).toString()+":"+(Math.floor(e.value%60)<10?"0"+Math.floor(e.value%60):Math.floor(e.value%60)).toString(),e.value<=0&&(a.value=="work"?(e.value=300,c.value="5:00",a.value="break"):(e.value=1500,c.value="25:00",a.value="work"))},1e3)}function q(){_.value=d.value.toString()+":00",i.value="on",e.value=d.value*60;let x=setInterval(()=>{e.value-=1,_.value=Math.floor(e.value/60).toString()+":"+(Math.floor(e.value%60)<10?"0"+Math.floor(e.value%60):Math.floor(e.value%60)).toString(),e.value<=0&&(i.value="off",clearInterval(x))},1e3)}return(x,t)=>(o(),u("div",j,[n("div",N,[p.value=="pomodoro"?(o(),u("div",P,[a.value=="work"||a.value=="none"?(o(),h(y,{key:0,modelValue:v.value,"onUpdate:modelValue":t[0]||(t[0]=l=>v.value=l),placeholder:"I'm working on...","label-color":"white",color:"white","input-class":"text-h3 text-white text-center","hide-bottom-space":"",borderless:""},null,8,["modelValue"])):(o(),u("h3",D,"Break")),n("h1",E,k(c.value),1),a.value=="none"?(o(),h(V,{key:2,label:"start","text-color":"blue",color:"white",class:"q-mb-md",onClick:B})):f("",!0)])):(o(),u("div",F,[r(y,{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=l=>v.value=l),placeholder:"I'm working on...","label-color":"white",color:"white","input-class":"text-h3 text-white text-center","hide-bottom-space":"",borderless:""},null,8,["modelValue"]),i.value=="off"?(o(),u("div",L,[n("h1",Y,k(d.value)+" minutes",1),r(I,{modelValue:d.value,"onUpdate:modelValue":t[2]||(t[2]=l=>d.value=l),min:0,max:60},null,8,["modelValue"]),r(V,{label:"start","text-color":"blue",color:"white",class:"q-mb-md",onClick:q})])):(o(),u("h1",$,k(_.value),1))])),a.value=="none"&&i.value=="off"?(o(),h(T,{key:2,modelValue:p.value,"onUpdate:modelValue":t[3]||(t[3]=l=>p.value=l),class:"text-white"},{default:m(()=>[r(C,{name:"pomodoro",icon:"timelapse",label:"Pomodoro"}),r(C,{name:"custom",icon:"timer",label:"Custom"})]),_:1},8,["modelValue"])):f("",!0)]),a.value=="none"&&i.value=="off"?(o(),u("div",z,[n("a",{onClick:t[4]||(t[4]=l=>w.value=!0)},"Credits")])):f("",!0),r(Q,{modelValue:w.value,"onUpdate:modelValue":t[5]||(t[5]=l=>w.value=l)},{default:m(()=>[r(S,{style:{width:"500px","max-width":"80vw"}},{default:m(()=>[r(g,{class:"text-h5"},{default:m(()=>[b(" Credits ")]),_:1}),r(g,null,{default:m(()=>[A,G]),_:1})]),_:1})]),_:1},8,["modelValue"]),a.value=="none"&&i.value=="off"?(o(),h(U,{key:1})):f("",!0)]))}});export{R as default};
