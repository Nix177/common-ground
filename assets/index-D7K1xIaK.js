(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class p{columns;constructor(){this.columns={nextUp:[],inProgress:[],done:[]}}addTask(e,t="nextUp"){this.columns[t]&&this.columns[t].push(e)}moveTask(e,t,n){if(!this.columns[t]||!this.columns[n])return;const s=this.columns[t].indexOf(e);s>-1&&(this.columns[t].splice(s,1),this.columns[n].push(e))}getBoard(){return this.columns}}const v="potager-urbain-bercy",b="Créer un jardin partagé de 50m2 en permaculture",g={duration_months:3,intensity:"low",milestones:["Obtention permis","Premier semis","Récolte"]},k=[{role:"Lead",status:"filled",skills:["manage","gardening"]},{role:"Logistique (Camionnette)",status:"open",skills:["transport"]}],f="sociocracy_lite",y={project_id:v,mission:b,moral_contract:g,stack_requirements:k,governance:f};class S{constructor(e,t){this.containerId=e,this.data=t}render(){const e=document.getElementById(this.containerId);e&&(e.innerHTML=`
      <div class="blueprint-summary">
        <p><strong>Mission:</strong> ${this.data.mission}</p>
        <div class="blueprint-details">
            <div class="detail-group">
                <h4>Contrat Moral</h4>
                <ul>
                    <li>Durée: ${this.data.moral_contract.duration_months} mois</li>
                    <li>Intensité: ${this.data.moral_contract.intensity}</li>
                </ul>
            </div>
            <div class="detail-group">
                <h4>Stack Technique & Humain</h4>
                <ul class="stack-list">
                    ${this.data.stack_requirements.map(t=>`
                        <li class="req-item ${t.status}">
                            <span class="role">${t.role}</span>
                            <span class="skills">${t.skills.join(", ")}</span>
                            <span class="status-badge">${t.status}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>
        </div>
      </div>
    `)}}class x{constructor(e,t,n){this.containerId=e,this.kanban=t,this.onTaskMove=n}render(){const e=document.getElementById(this.containerId);if(!e)return;e.innerHTML="";const t=this.kanban.getBoard();["nextUp","inProgress","done"].forEach(s=>{const i=t[s]||[],r=document.createElement("div");r.className=`kanban-column col-${s}`;const a=document.createElement("h3");a.textContent=s.replace(/([A-Z])/g," $1").trim(),r.appendChild(a),i.forEach(c=>{const l=document.createElement("div");l.className="task-card",l.innerHTML=`
            <div class="task-header">
                <strong>${c.title}</strong>
                <small>${c.assignee||"Unassigned"}</small>
            </div>
            <div class="task-actions">
                ${this.createMoveButtons(s)}
            </div>
        `;const u=l.querySelector(".btn-prev"),h=l.querySelector(".btn-next");u&&u.addEventListener("click",()=>{this.moveTask(c,s,"prev")}),h&&h.addEventListener("click",()=>{this.moveTask(c,s,"next")}),r.appendChild(l)}),e.appendChild(r)})}createMoveButtons(e){let t="";return(e==="inProgress"||e==="done")&&(t+='<button class="btn-prev" title="Move back">←</button>'),(e==="nextUp"||e==="inProgress")&&(t+='<button class="btn-next" title="Advance">→</button>'),t}moveTask(e,t,n){const s=["nextUp","inProgress","done"];let r=s.indexOf(t);n==="next"?r++:r--,r>=0&&r<s.length&&(this.kanban.moveTask(e,t,s[r]),this.onTaskMove())}}class T{alpha=.6;beta=.4;calculateScore(e,t){const n=this.calculateSkillSimilarity(e.skills,t.requiredSkills),s=this.calculateTimeIntersection(e.availability,t.requiredHours);return this.alpha*n+this.beta*s}calculateSkillSimilarity(e,t){return e.filter(s=>t.includes(s)).length/t.length}calculateTimeIntersection(e,t){return 1}}class ${constructor(e){this.containerId=e}matcher=new T;availableSkills=["manage","gardening","transport","cooking","finance"];selectedSkills=["gardening"];currentTaskReqs=["gardening","transport"];render(){const e=document.getElementById(this.containerId);if(!e)return;const t={id:"sim-user",skills:this.selectedSkills,availability:[]},n={id:"sim-task",requiredSkills:this.currentTaskReqs,requiredHours:[]},s=this.matcher.calculateScore(t,n);e.innerHTML=`
        <div class="matcher-layout">
            <div class="matcher-controls">
                <h4>Volunteer Skills</h4>
                <div class="skills-form">
                    ${this.renderCheckboxes(this.availableSkills,this.selectedSkills)}
                </div>
            </div>
            
            <div class="matcher-visual">
                <div class="score-display">
                    <span class="score-label">Match Score</span>
                    <span class="score-value ${this.getScoreClass(s)}">${s.toFixed(2)}</span>
                </div>
                <div class="match-details">
                    <small>Required: ${this.currentTaskReqs.join(", ")}</small>
                </div>
            </div>
        </div>
    `,e.querySelectorAll('input[type="checkbox"]').forEach(i=>{i.addEventListener("change",r=>{const a=r.target;a.checked?this.selectedSkills.push(a.value):this.selectedSkills=this.selectedSkills.filter(c=>c!==a.value),this.render()})})}renderCheckboxes(e,t){return e.map(n=>`
        <label class="skill-checkbox">
            <input type="checkbox" value="${n}" ${t.includes(n)?"checked":""}>
            ${n}
        </label>
      `).join("")}getScoreClass(e){return e>=.8?"score-high":e>=.5?"score-med":"score-low"}}document.querySelector("#app").innerHTML=`
  <header>
    <h1>Common Ground</h1>
    <p class="subtitle">Le Github des Passions</p>
  </header>
  
  <main>
    <section id="blueprint-section">
      <h2>Project Blueprint</h2>
      <div id="blueprint-content" class="card"></div>
    </section>

    <section id="kanban-section">
      <h2>Micro Kanban</h2>
      <div id="kanban-board" class="kanban-board">
        <!-- Components will be injected here -->
      </div>
    </section>

    <section id="matcher-section">
      <h2>Availability Matcher</h2>
      <div class="card" id="matcher-container">
        <!-- Components will be injected here -->
      </div>
    </section>
  </main>
`;const M=new S("blueprint-content",y);M.render();const d=new p;d.addTask({id:1,title:"Créer le design system",assignee:"Alice"},"nextUp");d.addTask({id:2,title:"Définir les rôles",assignee:"Bob"},"inProgress");d.addTask({id:3,title:"Initialiser le repo",assignee:"Charlie"},"done");const m=new x("kanban-board",d,()=>{m.render()});m.render();const L=new $("matcher-container");L.render();
