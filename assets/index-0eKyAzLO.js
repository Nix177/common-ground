(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class b{columns;constructor(){this.columns={nextUp:[],inProgress:[],done:[]}}addTask(e,t="nextUp"){this.columns[t]&&this.columns[t].push(e)}moveTask(e,t,r){if(!this.columns[t]||!this.columns[r])return;const i=this.columns[t].indexOf(e);i>-1&&(this.columns[t].splice(i,1),this.columns[r].push(e))}getBoard(){return this.columns}}const v="potager-urbain-bercy",f="Créer un jardin partagé de 50m2 en permaculture",y={duration_months:3,intensity:"low",milestones:["Obtention permis","Premier semis","Récolte"]},x=[{role:"Lead",status:"filled",skills:["manage","gardening"]},{role:"Logistique (Camionnette)",status:"open",skills:["transport"]}],k="sociocracy_lite",$={project_id:v,mission:f,moral_contract:y,stack_requirements:x,governance:k};class w{constructor(e,t){this.containerId=e,this.data=t}render(){const e=document.getElementById(this.containerId);if(!e)return;const t=[{name:"Sarah L.",color:"#f472b6"},{name:"Marc D.",color:"#60a5fa"}];e.innerHTML=`
      <div class="blueprint-header" style="margin-bottom: 2rem;">
        <p style="font-size: 1.1rem; opacity: 0.8; margin-bottom: 1rem;">${this.data.mission}</p>
        <div class="meta-tags" style="display: flex; gap: 1rem; font-size: 0.9rem;">
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">📅 ${this.data.moral_contract.duration_months} mois</span>
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">🔥 Intensité: ${this.data.moral_contract.intensity}</span>
        </div>
      </div>

      <h3>Besoins du projet</h3>
      <div class="blueprint-grid">
        ${this.data.stack_requirements.map(r=>this.createReqCard(r)).join("")}
      </div>

      <div class="contributors-section" style="margin-top: 2rem; border-top: 1px solid var(--surface-border); padding-top: 1rem;">
        <small style="text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Membres actifs</small>
        <div class="avatars" style="display: flex; margin-top: 0.5rem; gap: -10px;">
            ${t.map(r=>`
                <div title="${r.name}" style="
                    width: 32px; height: 32px; 
                    background: ${r.color}; 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    font-size: 0.8rem; font-weight: bold; 
                    border: 2px solid var(--bg-gradient-start);
                    margin-right: -8px;
                    cursor: help;
                ">${r.name[0]}</div>
            `).join("")}
            <div style="
                width: 32px; height: 32px; 
                background: #334155; 
                border-radius: 50%; 
                display: flex; align-items: center; justify-content: center; 
                font-size: 0.7rem; 
                border: 2px solid var(--bg-gradient-start);
                margin-right: -8px;
            ">+5</div>
        </div>
      </div>
    `}createReqCard(e){const t=e.status==="open",r=t?"open":"filled",i=t?"Recherche":"Pourvu";return`
      <div class="req-card ${r}">
        <div>
          <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">${e.role}</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">
            ${e.skills.join(" • ")}
          </div>
        </div>
        <div class="status-badge ${r}">
          ${i}
        </div>
      </div>
    `}}class S{constructor(e,t,r){this.containerId=e,this.kanban=t,this.onTaskMove=r}render(){const e=document.getElementById(this.containerId);if(!e)return;e.innerHTML="";const t=this.kanban.getBoard();["nextUp","inProgress","done"].forEach(i=>{const s=t[i]||[],n=document.createElement("div");n.className=`kanban-column col-${i}`;const o=document.createElement("h3");o.innerHTML=`${i.replace(/([A-Z])/g," $1").trim()} <span style="opacity:0.4; font-size:0.8em; margin-left:8px;">${s.length}</span>`,n.appendChild(o),s.forEach(a=>{const c=document.createElement("div");c.className="task-card";const h=a.assignee?`hsl(${a.assignee.length*40}, 70%, 60%)`:"#cbd5e1",g=a.assignee?a.assignee.substring(0,2).toUpperCase():"??";c.innerHTML=`
            <div class="task-header">
                <strong>${a.title}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 1rem;">
                <div title="Assignee: ${a.assignee}" style="
                    width: 24px; height: 24px; 
                    background: ${h}; 
                    border-radius: 50%; 
                    color: white;
                    font-size: 10px; 
                    display: flex; align-items: center; justify-content: center;
                    font-weight: bold;
                ">${g}</div>
                
                <div class="task-actions">
                    ${this.createMoveButtons(i)}
                </div>
            </div>
        `;const p=c.querySelector(".btn-prev"),u=c.querySelector(".btn-next");p&&p.addEventListener("click",()=>{this.moveTask(a,i,"prev")}),u&&u.addEventListener("click",()=>{this.moveTask(a,i,"next")}),n.appendChild(c)}),e.appendChild(n)})}createMoveButtons(e){let t="";return(e==="inProgress"||e==="done")&&(t+='<button class="btn-prev" title="Move back">←</button>'),(e==="nextUp"||e==="inProgress")&&(t+='<button class="btn-next" title="Advance">→</button>'),t}moveTask(e,t,r){const i=["nextUp","inProgress","done"];let n=i.indexOf(t);r==="next"?n++:n--,n>=0&&n<i.length&&(this.kanban.moveTask(e,t,i[n]),this.onTaskMove())}}class T{alpha=.6;beta=.4;calculateScore(e,t){const r=this.calculateSkillSimilarity(e.skills,t.requiredSkills),i=this.calculateTimeIntersection(e.availability,t.requiredHours);return this.alpha*r+this.beta*i}calculateSkillSimilarity(e,t){return e.filter(i=>t.includes(i)).length/t.length}calculateTimeIntersection(e,t){return 1}}class L{constructor(e){this.containerId=e}matcher=new T;availableSkills=["Gestion","Jardinage","Transport","Cuisine","Finance"];selectedSkills=["Jardinage"];currentTaskReqs=["Jardinage","Transport"];render(){const e=document.getElementById(this.containerId);if(!e)return;const t={id:"sim-user",skills:this.selectedSkills,availability:[]},r={id:"sim-task",requiredSkills:this.currentTaskReqs,requiredHours:[]},i=this.matcher.calculateScore(t,r);e.innerHTML=`
        <div class="matcher-layout" style="display: grid; grid-template-columns: 1fr 300px; gap: 2rem;">
            
            <div class="matcher-card" style="background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 12px; border: 1px solid var(--surface-border);">
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <div style="width: 64px; height: 64px; background: #818cf8; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
                        AL
                    </div>
                    <div>
                        <h3 style="font-size: 1.25rem;">Alexandre L.</h3>
                        <p style="color: var(--secondary); margin: 0;">Bénévole depuis 2023</p>
                    </div>
                </div>

                <h4 style="margin-bottom: 1rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; color: var(--text-muted);">Compétences</h4>
                <div class="skills-form" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${this.renderCheckboxes(this.availableSkills,this.selectedSkills)}
                </div>
            </div>
            
            <div class="matcher-visual" style="text-align: center; background: rgba(0,0,0,0.2); padding: 2rem; border-radius: 12px; display: flex; flex-direction: column; justify-content: center;">
                <div class="score-display">
                    <span class="score-label">Compatibilité Mission</span>
                    <span class="score-value ${this.getScoreClass(i)}" style="font-size: 5rem; display: block; margin: 1rem 0;">${(i*100).toFixed(0)}%</span>
                </div>
                <div class="match-details" style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--surface-border);">
                    <small style="color: var(--text-muted);">Besoin: ${this.currentTaskReqs.join(", ")}</small>
                </div>
            </div>
        </div>
    `,e.querySelectorAll('input[type="checkbox"]').forEach(s=>{s.addEventListener("change",n=>{const o=n.target;o.checked?this.selectedSkills.push(o.value):this.selectedSkills=this.selectedSkills.filter(a=>a!==o.value),this.render()})})}renderCheckboxes(e,t){return e.map(r=>`
        <label class="skill-checkbox" style="padding: 8px 16px; background: ${t.includes(r)?"var(--primary)":"rgba(255,255,255,0.1)"}; border-radius: 20px; cursor: pointer; transition: all 0.2s;">
            <input type="checkbox" value="${r}" ${t.includes(r)?"checked":""} style="display: none;">
            ${r}
        </label>
      `).join("")}getScoreClass(e){return e>=.8?"score-high":e>=.5?"score-med":"score-low"}}document.querySelector("#app").innerHTML=`
  <header>
    <h1>Common Ground</h1>
    <p class="subtitle">Le GitHub des Passions</p>
    <div style="margin-top: 2rem;">
      <button style="padding: 12px 24px; background: white; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; color: var(--primary);">Commencer un projet</button>
    </div>
  </header>
  
  <main>
    <section id="blueprint-section">
      <div class="card">
        <h2>Project Blueprint</h2>
        <div id="blueprint-content"></div>
      </div>
    </section>

    <section id="kanban-section">
      <div class="card" style="background: transparent; border: none; box-shadow: none; padding: 0;">
        <h2 style="padding-left: 0; border: none;">Micro Kanban</h2>
        <div id="kanban-board" class="kanban-board">
          <!-- Components will be injected here -->
        </div>
      </div>
    </section>

    <section id="matcher-section">
      <div class="card">
        <h2>Availability Matcher</h2>
        <div id="matcher-container">
          <!-- Components will be injected here -->
        </div>
      </div>
    </section>
  </main>
    
  <footer style="text-align: center; margin-top: 4rem; opacity: 0.5; font-size: 0.8rem;">
    <p>&copy; 2024 Common Ground. Built for the future.</p>
  </footer>
`;const M=new w("blueprint-content",$);M.render();const d=new b;d.addTask({id:1,title:"Créer le design system",assignee:"Alice"},"nextUp");d.addTask({id:2,title:"Définir les rôles",assignee:"Bob"},"inProgress");d.addTask({id:3,title:"Initialiser le repo",assignee:"Charlie"},"done");const m=new S("kanban-board",d,()=>{m.render()});m.render();const j=new L("matcher-container");j.render();
