"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4163],{4163:(k,l,i)=>{i.r(l),i.d(l,{SadrzajTekstovaPageModule:()=>M});var c=i(177),u=i(9417),s=i(7863),d=i(6336),p=i(467),h=i(3577),t=i(4438),f=i(8058),v=i(8490);function P(n,r){if(1&n){const o=t.RV6();t.j41(0,"ion-item")(1,"ion-button",6),t.bIt("click",function(){const a=t.eBV(o).$implicit,m=t.XpG(2);return t.Njj(m.openContent(a.content_id))}),t.nrm(2,"img",7),t.j41(3,"p"),t.EFF(4),t.k0s()()()}if(2&n){const o=r.$implicit;t.R7$(4),t.JRh(o.content_name)}}function j(n,r){if(1&n&&(t.j41(0,"ion-list",4),t.DNE(1,P,5,1,"ion-item",5),t.k0s()),2&n){const o=t.XpG();t.R7$(),t.Y8G("ngForOf",o.categories)}}let g=(()=>{var n;class r{constructor(e,a,m){this.dataCtrl=e,this.contentCtrl=a,this.router=m,this.dataLoad=!1,this.translate=[],this.categories=[],this.content=null}ngOnInit(){this.test_data()}test_data(){var e=this;return(0,p.A)(function*(){try{const a=yield e.contentCtrl.getCategoryContent(598);console.log("upoznajte dabrove",a),a&&a.length>0&&(e.categories=a),e.dataLoad=!0}catch(a){console.error("Error fetching content:",a)}})()}openContent(e){this.router.navigateByUrl("/text/"+e)}}return(n=r).\u0275fac=function(e){return new(e||n)(t.rXU(f.e),t.rXU(v.u),t.rXU(d.Ix))},n.\u0275cmp=t.VBU({type:n,selectors:[["app-sadrzaj-tekstova"]],decls:6,vars:1,consts:[["id","main-content","scroll-y","true"],["src","assets/menu.png","alt","menu icon",1,"menu-button"],[1,"container"],["lines","none",4,"ngIf"],["lines","none"],[4,"ngFor","ngForOf"],["expand","full",3,"click"],["src","assets/menu.png","alt","menu icon",1,"card-image"]],template:function(e,a){1&e&&(t.j41(0,"ion-content",0)(1,"ion-menu-button"),t.nrm(2,"img",1),t.k0s(),t.nrm(3,"app-back-button"),t.j41(4,"div",2),t.DNE(5,j,2,1,"ion-list",3),t.k0s()()),2&e&&(t.R7$(5),t.Y8G("ngIf",a.categories.length>0))},dependencies:[s.bv,s.Jm,s.W9,s.uz,s.nf,s.MC,c.MD,c.Sq,c.bT,h.X],styles:["ion-content[_ngcontent-%COMP%]{--background: url(/assets/app-naslovna.jpg) 0 0/100% 100% no-repeat}.container[_ngcontent-%COMP%]{background-color:#fff;border-radius:50px 50px 0 0;width:100%;max-height:70vh;display:flex;justify-content:flex-start;align-items:center;flex-direction:column;z-index:1;overflow-y:auto;position:absolute;bottom:0;right:0;padding:2rem 3rem 10rem}h1[_ngcontent-%COMP%]{font-size:1.5rem;color:#a3622a;font-weight:900;text-align:center}p[_ngcontent-%COMP%]{font-size:.8rem;text-indent:1.5rem;position:relative;top:3px;text-transform:none}ion-button[_ngcontent-%COMP%]{width:80vmin;height:auto;margin:.5rem 0;display:flex;justify-content:flex-start;align-items:center;--background: #a3622a;--color: white}.menu-button[_ngcontent-%COMP%]{background-color:transparent;max-width:20vmin;margin:auto;position:absolute;top:65%;left:45%;transform:translate(-50%,-50%)}ion-menu-button[_ngcontent-%COMP%]{position:absolute;top:3rem;right:1rem;height:18vmin;width:20%;--background: #a3612c;--border-radius: 50%}.card-image[_ngcontent-%COMP%]{width:18%;padding-top:1rem;background-color:#7f460d;position:absolute;left:-1rem}@media (min-width: 360px){.container[_ngcontent-%COMP%]{padding:0rem 3rem 6rem;font-size:.8rem}.img[_ngcontent-%COMP%]{max-width:100%;height:50vmin}ion-menu-button[_ngcontent-%COMP%]{position:absolute;top:3rem;right:1rem}.card-image[_ngcontent-%COMP%]{width:20%;padding-top:1rem;background-color:#7f460d;position:absolute;left:-1rem}p[_ngcontent-%COMP%]{font-size:.7rem;text-indent:1.5rem;position:relative;top:3px;text-transform:none;padding:0 2rem}}@media (min-width: 800px){ion-menu-button[_ngcontent-%COMP%]{position:absolute;top:3rem;right:2rem;height:16vmin;width:18%}p[_ngcontent-%COMP%]{font-size:.6rem;padding:0 1rem}}@media (min-width: 1024px){ion-menu-button[_ngcontent-%COMP%]{position:absolute;top:3rem;right:8rem;height:16vmin;width:18%}p[_ngcontent-%COMP%]{width:90%}}"]}),r})();const C=[{path:"",component:g}];let b=(()=>{var n;class r{}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[d.iI.forChild(C),d.iI]}),r})(),M=(()=>{var n;class r{}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.$C({type:n}),n.\u0275inj=t.G2t({imports:[c.MD,u.YN,s.bv,b,g]}),r})()}}]);