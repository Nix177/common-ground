(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class v{columns;constructor(){this.columns={nextUp:[],inProgress:[],done:[]}}addTask(e,t="nextUp"){this.columns[t]&&this.columns[t].push(e)}moveTask(e,t,s){if(!this.columns[t]||!this.columns[s])return;const i=this.columns[t].indexOf(e);i>-1&&(this.columns[t].splice(i,1),this.columns[s].push(e))}getBoard(){return this.columns}}const b="potager-urbain-bercy",y="Notre objectif est de transformer le toit du gymnase de Bercy en un écosystème nourricier de 500m². Nous voulons prouver que la ville peut produire une partie de son alimentation tout en recréant du lien social. Ce n'est pas juste du jardinage, c'est un acte de résilience climatique et de convivialité de quartier.",f={duration_months:6,intensity:"medium",milestones:["Obtention du permis A.T. (Occupation Temporaire)","Construction des bacs de culture (40 unités)","Atelier Semis & Plantation Avril","Premier Festival des Récoltes"]},x=[{role:"Chef de Projet",status:"filled",skills:["gestion","leadership"]},{role:"Expert Permaculture",status:"filled",skills:["jardinage","biologie"]},{role:"Logistique (Camionnette)",status:"open",skills:["transport","permis_b"]},{role:"Comptable / Trésorier",status:"open",skills:["finance","excel"]},{role:"Community Manager",status:"open",skills:["communication","réseaux_sociaux"]},{role:"Bricoleurs (Construction Bacs)",status:"open",skills:["bricolage","outillage"]}],k="sociocracy_lite",T={project_id:b,mission:y,moral_contract:f,stack_requirements:x,governance:k};class ${constructor(e,t){this.containerId=e,this.data=t}render(){const e=document.getElementById(this.containerId);if(!e)return;const t=[{name:"Sarah L.",color:"#f472b6"},{name:"Marc D.",color:"#60a5fa"}];e.innerHTML=`
      <div class="blueprint-header" style="margin-bottom: 2rem;">
        <p style="font-size: 1.1rem; opacity: 0.8; margin-bottom: 1rem;">${this.data.mission}</p>
        <div class="meta-tags" style="display: flex; gap: 1rem; font-size: 0.9rem;">
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">📅 ${this.data.moral_contract.duration_months} mois</span>
             <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px;">🔥 Intensité: ${this.data.moral_contract.intensity}</span>
        </div>
      </div>

      <h3>Besoins du projet</h3>
      <div class="blueprint-grid">
        ${this.data.stack_requirements.map(s=>this.createReqCard(s)).join("")}
      </div>

      <div class="contributors-section" style="margin-top: 2rem; border-top: 1px solid var(--surface-border); padding-top: 1rem;">
        <small style="text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Membres actifs</small>
        <div class="avatars" style="display: flex; margin-top: 0.5rem; gap: -10px;">
            ${t.map(s=>`
                <div title="${s.name}" style="
                    width: 32px; height: 32px; 
                    background: ${s.color}; 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    font-size: 0.8rem; font-weight: bold; 
                    border: 2px solid var(--bg-gradient-start);
                    margin-right: -8px;
                    cursor: help;
                ">${s.name[0]}</div>
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
    `}createReqCard(e){const t=e.status==="open",s=t?"open":"filled",i=t?"Recherche":"Pourvu";return`
      <div class="req-card ${s}">
        <div>
          <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem;">${e.role}</div>
          <div style="font-size: 0.85rem; opacity: 0.7;">
            ${e.skills.join(" • ")}
          </div>
        </div>
        <div class="status-badge ${s}">
          ${i}
        </div>
      </div>
    `}}class w{constructor(e,t,s){this.containerId=e,this.kanban=t,this.onTaskMove=s}render(){const e=document.getElementById(this.containerId);if(!e)return;e.innerHTML="";const t=this.kanban.getBoard();["nextUp","inProgress","done"].forEach(i=>{const r=t[i]||[],n=document.createElement("div");n.className=`kanban-column col-${i}`;const l=document.createElement("h3");l.innerHTML=`${i.replace(/([A-Z])/g," $1").trim()} <span style="opacity:0.4; font-size:0.8em; margin-left:8px;">${r.length}</span>`,n.appendChild(l),r.forEach(a=>{const d=document.createElement("div");d.className="task-card";const g=a.assignee?`hsl(${a.assignee.length*40}, 70%, 60%)`:"#cbd5e1",h=a.assignee?a.assignee.substring(0,2).toUpperCase():"??";d.innerHTML=`
            <div class="task-header">
                <strong>${a.title}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 1rem;">
                <div title="Assignee: ${a.assignee}" style="
                    width: 24px; height: 24px; 
                    background: ${g}; 
                    border-radius: 50%; 
                    color: white;
                    font-size: 10px; 
                    display: flex; align-items: center; justify-content: center;
                    font-weight: bold;
                ">${h}</div>
                
                <div class="task-actions">
                    ${this.createMoveButtons(i)}
                </div>
            </div>
        `;const u=d.querySelector(".btn-prev"),p=d.querySelector(".btn-next");u&&u.addEventListener("click",()=>{this.moveTask(a,i,"prev")}),p&&p.addEventListener("click",()=>{this.moveTask(a,i,"next")}),n.appendChild(d)}),e.appendChild(n)})}createMoveButtons(e){let t="";return(e==="inProgress"||e==="done")&&(t+='<button class="btn-prev" title="Move back">←</button>'),(e==="nextUp"||e==="inProgress")&&(t+='<button class="btn-next" title="Advance">→</button>'),t}moveTask(e,t,s){const i=["nextUp","inProgress","done"];let n=i.indexOf(t);s==="next"?n++:n--,n>=0&&n<i.length&&(this.kanban.moveTask(e,t,i[n]),this.onTaskMove())}}class S{alpha=.6;beta=.4;calculateScore(e,t){const s=this.calculateSkillSimilarity(e.skills,t.requiredSkills),i=this.calculateTimeIntersection(e.availability,t.requiredHours);return this.alpha*s+this.beta*i}calculateSkillSimilarity(e,t){return e.filter(i=>t.includes(i)).length/t.length}calculateTimeIntersection(e,t){return 1}}class j{constructor(e){this.containerId=e}matcher=new S;availableSkills=["Gestion","Jardinage","Transport","Cuisine","Finance"];selectedSkills=["Jardinage"];currentTaskReqs=["Jardinage","Transport"];render(){const e=document.getElementById(this.containerId);if(!e)return;const t={id:"sim-user",skills:this.selectedSkills,availability:[]},s={id:"sim-task",requiredSkills:this.currentTaskReqs,requiredHours:[]},i=this.matcher.calculateScore(t,s);e.innerHTML=`
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
    `,e.querySelectorAll('input[type="checkbox"]').forEach(r=>{r.addEventListener("change",n=>{const l=n.target;l.checked?this.selectedSkills.push(l.value):this.selectedSkills=this.selectedSkills.filter(a=>a!==l.value),this.render()})})}renderCheckboxes(e,t){return e.map(s=>`
        <label class="skill-checkbox" style="padding: 8px 16px; background: ${t.includes(s)?"var(--primary)":"rgba(255,255,255,0.1)"}; border-radius: 20px; cursor: pointer; transition: all 0.2s;">
            <input type="checkbox" value="${s}" ${t.includes(s)?"checked":""} style="display: none;">
            ${s}
        </label>
      `).join("")}getScoreClass(e){return e>=.8?"score-high":e>=.5?"score-med":"score-low"}}class C{constructor(e){this.containerId=e}render(){const e=document.getElementById(this.containerId);if(!e)return;const t=[{user:"Marie C.",action:"a rejoint le projet",time:"À l'instant",type:"join"},{user:"Thomas B.",action:'a terminé "Achat terreau"',time:"Il y a 2h",type:"task"},{user:"Lucas V.",action:"a partagé un fichier",time:"Il y a 4h",type:"file"},{user:"Sarah L.",action:'a commenté sur "Permis"',time:"Il y a 5h",type:"comment"},{user:"Système",action:'Nouvelle étape "Semis" débloquée',time:"Hier",type:"milestone"}];e.innerHTML=`
            <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                <h3 style="margin: 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Activité Récente</h3>
                <span style="width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></span>
            </div>
            <div class="activity-list" style="display: flex; flex-direction: column; gap: 1rem;">
                ${t.map(s=>this.createActivityItem(s)).join("")}
            </div>
        `}createActivityItem(e){return`
            <div class="activity-item" style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.5rem; border-radius: 8px; transition: background 0.2s;">
                <div class="activity-icon" style="
                    width: 32px; height: 32px; 
                    background: rgba(255,255,255,0.05); 
                    border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.9rem;
                    color: ${this.getIconColor(e.type)};
                ">
                    ${this.getIcon(e.type)}
                </div>
                <div class="activity-content" style="flex: 1;">
                    <p style="margin: 0; font-size: 0.9rem;">
                        <strong style="color: #f1f5f9;">${e.user}</strong> ${e.action}
                    </p>
                    <small style="color: var(--text-muted); font-size: 0.75rem;">${e.time}</small>
                </div>
            </div>
        `}getIcon(e){switch(e){case"join":return"👋";case"task":return"✅";case"file":return"📂";case"comment":return"💬";case"milestone":return"🏆";default:return"•"}}getIconColor(e){switch(e){case"join":return"#f472b6";case"task":return"#4ade80";case"milestone":return"#fbbf24";default:return"#94a3b8"}}}document.querySelector("#app").innerHTML=`
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

    <section id="activity-section">
        <div class="card">
           <div id="activity-feed"></div>
        </div>
    </section>
  </main>
    
  <footer style="text-align: center; margin-top: 4rem; opacity: 0.5; font-size: 0.8rem;">
    <p>&copy; 2024 Common Ground. Built for the future.</p>
  </footer>
`;const M=new $("blueprint-content",T);M.render();const o=new v;o.addTask({id:1,title:"Valider les statuts asso",assignee:"Marie C."},"done");o.addTask({id:2,title:"Achat terreau (200L)",assignee:"Thomas B."},"done");o.addTask({id:3,title:"Design des plans des bacs",assignee:"Lucas V."},"inProgress");o.addTask({id:4,title:"Contacter la Mairie (permis)",assignee:"Sarah L."},"inProgress");o.addTask({id:5,title:"Récupérer palettes bois",assignee:"Marc D."},"nextUp");o.addTask({id:6,title:"Créer page Instagram",assignee:"Elise"},"nextUp");o.addTask({id:7,title:"Budget prévisionnel Q2",assignee:"Karim"},"nextUp");o.addTask({id:8,title:"Organiser apéro lancement",assignee:void 0},"nextUp");const m=new w("kanban-board",o,()=>{m.render()});m.render();const L=new j("matcher-container");L.render();const B=new C("activity-feed");B.render();
