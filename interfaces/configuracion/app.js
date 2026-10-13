const storageKey = 'linde-preferencias-v1';
const defaults = {email:true, reminders:true, profile:false, locale:'es-CL', dark:false, compact:false, highlights:true, grouped:false};
if (new URLSearchParams(location.search).get('inicio') === '1') {
  try { sessionStorage.removeItem(storageKey); } catch {}
  history.replaceState(null,'',location.pathname);
}
let saved;
try { saved = {...defaults, ...JSON.parse(sessionStorage.getItem(storageKey) || '{}')}; } catch { saved = {...defaults}; }
let draft = {...saved};
let view = 'preferences';
const content = document.querySelector('#content');
const icons = {
  compact:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  highlights:'<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3Z"/>',
  grouped:'<path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>'
};
const optionNames = {compact:'Vista compacta', highlights:'Destacar novedades', grouped:'Agrupar actividad'};
function applyTheme(values) { document.body.classList.toggle('dark', values.dark); }
function row(key,label,detail) {
  return `<div class="setting-row"><div><label for="${key}">${label}</label><small id="${key}-detail">${detail}</small></div><input class="switch" type="checkbox" id="${key}" name="${key}" aria-describedby="${key}-detail" ${draft[key]?'checked':''}></div>`;
}
function renderPreferences(){
  content.innerHTML = `<div class="settings-heading"><p class="eyebrow">Configuración personal</p><h1>Preferencias</h1><p class="lead">Elige cómo quieres usar tu cuenta.</p></div>
  <form id="preferences-form"><div class="card settings-card">
  <section class="setting-section"><h2 class="section-title">Notificaciones</h2>${row('email','Novedades por correo','Recibe noticias y actualizaciones de Linde.')}${row('reminders','Recordatorios','Recibe avisos de tus próximas actividades.')}</section>
  <section class="setting-section"><h2 class="section-title">Privacidad</h2>${row('profile','Perfil visible','Permite que otras personas vean tu nombre de perfil.')}</section>
  <section class="setting-section"><h2 class="section-title">Apariencia e idioma</h2><div class="setting-row"><label for="locale">Idioma de la cuenta</label><select id="locale" name="locale"><option value="es-CL" ${draft.locale==='es-CL'?'selected':''}>Español (Chile)</option><option value="es-ES" ${draft.locale==='es-ES'?'selected':''}>Español (España)</option></select></div>${row('dark','Modo oscuro','Usa una apariencia oscura en tu cuenta.')}</section></div>
  <section class="card secondary-settings"><h2>Vista de actividad</h2><div class="view-options">${Object.keys(icons).map(key=>`<button type="button" class="icon-option" data-option="${key}" aria-label="${optionNames[key]}" aria-pressed="${draft[key]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${icons[key]}</svg></button>`).join('')}</div></section>
  <div class="actions save-actions"><button class="button" type="submit">Guardar cambios</button></div></form>`;
  const form = content.querySelector('form');
  form.addEventListener('change',event=>{
    const input = event.target;
    draft[input.name] = input.type==='checkbox' ? input.checked : input.value;
    applyTheme(draft);
  });
  content.querySelectorAll('[data-option]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.option; draft[key]=!draft[key]; button.setAttribute('aria-pressed',String(draft[key]));
  }));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    saved={...draft};
    try {sessionStorage.setItem(storageKey,JSON.stringify(saved));} catch {}
  });
}
function renderOverview(){
  content.innerHTML=`<div class="settings-heading"><p class="eyebrow">Tu espacio</p><h1>Mi cuenta</h1><p class="lead">Tu información y tus preferencias, en un solo lugar.</p></div><section class="card"><div class="overview-head"><span class="avatar">MR</span><div><h2>Martina Ríos</h2><p class="muted">martina.rios@example.com</p></div></div><div class="divider"></div><h3>Preferencias de tu cuenta</h3><dl class="summary-list"><div><dt>Novedades por correo</dt><dd>${saved.email?'Activadas':'Desactivadas'}</dd></div><div><dt>Recordatorios</dt><dd>${saved.reminders?'Activados':'Desactivados'}</dd></div><div><dt>Perfil</dt><dd>${saved.profile?'Visible':'Privado'}</dd></div><div><dt>Idioma</dt><dd>${saved.locale==='es-CL'?'Español (Chile)':'Español (España)'}</dd></div><div><dt>Apariencia</dt><dd>${saved.dark?'Oscura':'Clara'}</dd></div></dl><div class="actions"><button id="open-preferences" class="button secondary">Ir a preferencias</button></div></section>`;
  content.querySelector('#open-preferences').addEventListener('click',()=>navigate('preferences'));
}
function navigate(next){
  if(next===view)return;
  draft={...saved};view=next;applyTheme(saved);
  document.querySelectorAll('[data-view]').forEach(button=>{
    button.classList.toggle('current',button.dataset.view===view);
    if(button.dataset.view===view)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
  });
  if(view==='preferences')renderPreferences();else renderOverview();
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>navigate(button.dataset.view)));
applyTheme(saved);renderPreferences();
