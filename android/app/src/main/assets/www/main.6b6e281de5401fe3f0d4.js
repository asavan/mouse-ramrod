(()=>{"use strict";(()=>{function e(e){switch(e.toLowerCase().trim()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return Boolean(e)}}function t(t,o,n,s){const r=t.location.search,i=new URLSearchParams(r);for(const[t,o]of i)"number"==typeof n[t]?n[t]=parseInt(o,10):"boolean"==typeof n[t]?n[t]=e(o):n[t]=o;s(t,o,n).on("gameover",(()=>{o.getElementById("butInstall").classList.remove("hidden2")}))}function o(e,t){return e+" "+function(e,t){return t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}(e,t)}function n(e,t){let o=0,n=!1,s=-1,r=!1,i=!1;const u=t(e);return{isWin:()=>r,tryMoveToIndex:t=>{return!n&&((o=t)>=0&&o<e&&(s=t,n=!0,!0));var o},getMoveCount:()=>o,isRamrodPos:e=>e===s,isMousePos:e=>i&&u.isMousePos(e),setShowMousePos:e=>{i=e,n=!1,s=-1},mouseMove:()=>{n&&(++o,r=u.hit(s),i=!0)}}}function s(e){let t=[],o=[];for(let o=0;o<e;++o)t.push(o);const n=(t,o)=>{var n;(n=o)>=0&&n<e&&(t.includes(o)||t.push(o))};return{hit:e=>{const s=t.filter((t=>t!==e)),r=[];for(const e of s)n(r,e-1),n(r,e+1);return o=t,t=r,0===t.length},getPositions:()=>t,isMousePos:e=>o.includes(e)}}function r(e){const t=t=>t>=0&&t<e;let o=Math.floor((e-1)/2),n=[];const s=(e,o)=>{t(o)&&e.push(o)};s(n,o),s(n,o+1);const r=o=>t(o)?(t=>0===t||t===e-1)(o)?1:2:0,i=()=>o;return{getPrevPos:i,hit:function(e){const t=n.filter((t=>t!==e));let i=0,u=-1;for(const e of t){const t=r(e-1)+r(e+1);i<t&&(i=t,u=e)}return n=[],0===i?(o=e,!0):(o=u,s(n,o+1),s(n,o-1),!1)},isWin:()=>0===n.length,isMousePos:e=>e===i()}}function i(e){return Math.floor(Math.random()*e)}function u(e){let t=i(e),o=-1;const n=[-1,1];return{getPos:()=>t,hit:function(s){if(o=t,s===t)return!0;const r=[];for(const o of n){const n=t+o;(u=n)>=0&&u<e&&r.push(n)}var u,c;return 0===r.length||(t=(c=r)[i(c.length)],!1)},isMousePos:e=>e===o}}function c(){}(function(e,o,n,s){!function(e,t,o,n,s){"loading"!==o.readyState?e(t,o,n,s):o.addEventListener("DOMContentLoaded",(()=>{e(t,o,n,s)}))}(t,e,o,n,s)})(window,document,{mouse:0,ramrod:1,collision:1,size:5,sound:!1,install:!0},(function(e,t,i){const l=t.querySelector(".box"),a=t.querySelector(".message"),f=t.querySelector(".overlay"),d=t.querySelector(".close"),m=t.getElementById("tada");t.documentElement.style.setProperty("--field-size",i.size);const h={gameover:c,mouse:c,ramrod:c},v=[s,r,r,u,r,s,u,r],g=n(i.size,v[i.mouse]);function M(){var e;f.querySelector(".content").textContent="За  "+o(g.getMoveCount(),["ход","хода","ходов"]),f.classList.add("show"),h.gameover(g.getMoveCount()),i.sound&&(e=m)&&e.play()}function y(){!function(e,t,n,s){const r=["","&#128045;","&#128001;","&#128431;","&#128432;","&#128433;","&#128433;&#65039;","&#128511;"],i=["&#128371;","&#128296;","&#129683;","&#9935;","&#128481;","&#128298;","&#128295;","&#128204;","&#129696;","&#129668;"],u=["&#129700;","&#128165;","&#127878;","&#9904;&#65039;"];function c(e,t){e.innerHTML=t?`<span>${t}</span>`:""}for(let o=0;o<s.size;o++){const n=t.childNodes[o];e.isRamrodPos(o)?e.isWin()?c(n,u[s.collision]):c(n,i[s.ramrod]):e.isMousePos(o)?c(n,r[s.mouse]):c(n,"")}n&&e.getMoveCount()&&(n.textContent=o(e.getMoveCount(),["ход","хода","ходов"]))}(g,l,a,i),g.isWin()&&setTimeout(M,200)}return function(e,t,o,n){for(let s=0;s<e;s++){const e=n.createElement("div");e.className=t,o.appendChild(e)}}(i.size,"cell",l,t),y(),l.addEventListener("click",(function(e){const t=function(e,t){return e.preventDefault(),e.target.classList.contains("cell")?function(e,t){for(let o=0;o<t.children.length;o++)if(t.children[o]===e.target)return o;return-1}(e,t):-1}(e,l);g.tryMoveToIndex(t)&&setTimeout((function(){g.mouseMove(),y(),g.isWin()||setTimeout((()=>{g.setShowMousePos(!1),y()}),200)}),60)}),!1),d.addEventListener("click",(e=>{e.preventDefault(),f.classList.remove("show")}),!1),{on:function(e,t){h[e]=t}}}))})()})();