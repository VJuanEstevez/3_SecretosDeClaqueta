(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{#e;constructor(e){this.#e=String(e)}toString(){return this.#e}},t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};function n(e){return String(e).replace(/[&<>"']/g,e=>t[e])}function r(t){return new e(t)}function i(t){return t==null||t===!1?``:Array.isArray(t)?t.map(i).join(``):t instanceof e?t.toString():n(t)}function a(e,...t){let n=``;return e.forEach((e,r)=>{n+=e,r<t.length&&(n+=i(t[r]))}),r(n)}function o(e){let t=document.createElement(`template`);return t.innerHTML=String(e).trim(),t.content.firstElementChild}var s=null;function c(e){s??=document.getElementById(`live-region`),s&&(s.textContent=``,requestAnimationFrame(()=>{s.textContent=e}))}function l(){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}var u=`movie-poster`,d=`cubic-bezier(0.22, 1, 0.36, 1)`,f=!1;async function p(e,t){f||l()||typeof document.startViewTransition!=`function`?e.innerHTML=String(t):await document.startViewTransition(()=>{e.innerHTML=String(t)}).updateCallbackDone}function m(e,t){!e||l()?t():typeof document.startViewTransition==`function`?(e.style.viewTransitionName=u,f=!0,document.startViewTransition(()=>{t();let e=document.querySelector(`[data-poster-transition]`);e&&(e.style.viewTransitionName=u)}).finished.catch(()=>{}).finally(()=>{f=!1,e.style.viewTransitionName=``,document.querySelector(`[data-poster-transition]`)?.style.removeProperty(`view-transition-name`)})):h(e,t)}function h(e,t){f=!0;let n=e.getBoundingClientRect(),r=getComputedStyle(e).borderRadius,i=e.cloneNode(!0);i.removeAttribute(`data-poster`),i.removeAttribute(`style`),i.setAttribute(`aria-hidden`,`true`),i.style.cssText=[`position: fixed`,`top: ${n.top}px`,`left: ${n.left}px`,`width: ${n.width}px`,`height: ${n.height}px`,`margin: 0`,`object-fit: cover`,`border-radius: ${r}`,`z-index: 120`,`pointer-events: none`].join(`;`),document.body.append(i),t();let a=document.querySelector(`[data-poster-transition]`);if(!a){i.remove(),f=!1;return}let o=a.getBoundingClientRect(),s=a.closest(`.detail__poster-frame`),c=s?getComputedStyle(s).borderRadius:getComputedStyle(a).borderRadius;a.style.visibility=`hidden`,i.animate([{top:`${n.top}px`,left:`${n.left}px`,width:`${n.width}px`,height:`${n.height}px`,borderRadius:r},{top:`${o.top}px`,left:`${o.left}px`,width:`${o.width}px`,height:`${o.height}px`,borderRadius:c}],{duration:520,easing:d,fill:`forwards`}).finished.catch(()=>{}).finally(()=>{f=!1,i.remove(),a.style.visibility=``})}var g={clapper:`
    <rect x="4.8" y="11.3" width="15.6" height="8.2" rx="1.4" />
    <path d="M5.2 11.3 20.5 7.5V4.6L5.2 8.4Z" />
    <path d="m8.2 10.5 1.6-3.2M12.1 9.5l1.6-3.2M16 8.5l1.6-3.2" />
    <path d="M8 14.6h8.8M8 17.1h5.2" />
    <circle cx="4.1" cy="11.3" r=".8" fill="currentColor" stroke="none" />
  `,heart:`<path d="M12 20.4S4.6 16.1 4.6 11.2A4.05 4.05 0 0 1 12 8.2a4.05 4.05 0 0 1 7.4 3c0 4.9-7.4 9.2-7.4 9.2Z" />`,star:`<path d="m12 3.7 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8Z" />`,search:`<circle cx="11" cy="11" r="6.4" /><path d="m15.9 15.9 4.4 4.4" />`,arrowLeft:`<path d="M19 12H5" /><path d="m11 18-6-6 6-6" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,arrowUp:`<path d="M12 19V5" /><path d="m6 11 6-6 6 6" />`,download:`<path d="M12 3.5v11" /><path d="m7.5 10 4.5 4.5L16.5 10" /><path d="M4.5 19.5h15" />`,close:`<path d="m6 6 12 12M18 6 6 18" />`,calendar:`<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3.5V7M16 3.5V7" />`,clock:`<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />`,user:`<circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />`,film:`<rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M8 4.5v15M16 4.5v15M3 9.5h5M3 14.5h5M16 9.5h5M16 14.5h5" />`,sparkle:`<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" />`,pause:`<path d="M9.2 5.5v13M14.8 5.5v13" stroke-width="2.2" />`,play:`<path d="M8.6 5.8v12.4L18.4 12 8.6 5.8Z" />`,sun:`<circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.3M12 18.9v2.3M4.5 4.5l1.6 1.6M17.9 17.9l1.6 1.6M2.8 12h2.3M18.9 12h2.3M4.5 19.5l1.6-1.6M17.9 6.1l1.6-1.6" />`,moon:`<path d="M20.4 14.7A8.7 8.7 0 0 1 9.3 3.6 8.7 8.7 0 1 0 20.4 14.7Z" />`};function _(e,{className:t=`icon`,strokeWidth:n=1.7}={}){return r(`<svg class="${t}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="${n}" stroke-linecap="round" stroke-linejoin="round">${g[e]??``}</svg>`)}function ee(e){let t=Number(e);return!Number.isFinite(t)||t<=0?`—`:t.toLocaleString(`es-ES`,{minimumFractionDigits:1,maximumFractionDigits:1})}function te(e){let t=String(e??``).slice(0,4);return/^\d{4}$/.test(t)?t:`—`}function ne(e){let t=Number(e);if(!Number.isFinite(t)||t<=0)return``;let n=Math.floor(t/60),r=t%60;return n?r?`${n} h ${r} min`:`${n} h`:`${r} min`}function re(e,t,n){return`${e} ${e===1?t:n}`}function ie(e){return String(e).padStart(2,`0`)}var v=null,y=``;function b(){let e=window.location.hash.replace(/^#/,``)||`/`,[t,n=``]=e.split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:new URLSearchParams(n),raw:e}}function ae({render:e}){v=e;let t=e=>{let t=b();t.raw!==y&&(y=t.raw,v(t,e??null))};window.addEventListener(`popstate`,e=>{t(e.state?.routeState??null)}),window.addEventListener(`hashchange`,()=>{t(null)});let n=b();y=n.raw,v(n,null)}function x(e,{state:t=null,replace:n=!1}={}){let r=e.startsWith(`#`)?e.slice(1):e;return n?window.history.replaceState({routeState:t},``,`#${r}`):window.history.pushState({routeState:t},``,`#${r}`),y=r,v(b(),t)}function S(e){let t=e.startsWith(`#`)?e.slice(1):e;window.history.replaceState({routeState:null},``,`#${t}`),y=t}var C=`sdc:favorites`,w=new Set;function oe(){try{let e=JSON.parse(window.localStorage.getItem(C)??`[]`);return Array.isArray(e)?e.filter(e=>e&&Number.isFinite(Number(e.id))).map(e=>({id:Number(e.id),title:String(e.title??`Título desconocido`),posterPath:e.posterPath??null,backdropPath:e.backdropPath??null,releaseDate:String(e.releaseDate??``),year:String(e.year??`—`),rating:Number(e.rating??0),overview:String(e.overview??``)})):[]}catch{return[]}}var T=oe();function se(){try{window.localStorage.setItem(C,JSON.stringify(T))}catch{}}function E(){w.forEach(e=>e(T))}function ce(e){return{id:Number(e.id),title:String(e.title??`Título desconocido`),posterPath:e.posterPath??null,backdropPath:e.backdropPath??null,releaseDate:String(e.releaseDate??``),year:String(e.year??`—`),rating:Number(e.rating??0),overview:String(e.overview??``)}}function le(){return[...T]}function ue(){return T.length}function D(e){return T.some(t=>t.id===Number(e))}function O(e){let t=Number(e.id),n=D(t);return T=n?T.filter(e=>e.id!==t):[ce(e),...T],se(),E(),!n}function k(e){return w.add(e),()=>w.delete(e)}window.addEventListener(`storage`,e=>{e.key===C&&(T=oe(),E())});var A=`sdc:theme`,de={dark:`#08080c`,light:`#f6f3ea`},j=new Set;function M(){try{return window.localStorage.getItem(A)===`light`?`light`:`dark`}catch{return`dark`}}var N=M();function P(){document.documentElement.dataset.theme=N;let e=document.querySelector(`meta[name="theme-color"]`);e&&e.setAttribute(`content`,de[N])}function F(){j.forEach(e=>e(N))}function I(){return N}function fe(e){if(e===`dark`||e===`light`){N=e;try{window.localStorage.setItem(A,N)}catch{}P(),F()}}function pe(){fe(N===`dark`?`light`:`dark`)}function me(e){return j.add(e),()=>j.delete(e)}function he(){P()}window.addEventListener(`storage`,e=>{e.key===A&&(N=M(),P(),F())});var L=null;function ge(e){L&&(L.hidden=!e)}function _e(e){e.append(o(a`
      <div class="site-header__inner container">
        <a class="brand" href="#/" aria-label="Secretos de claqueta — Inicio">
          <span class="brand__mark">
            ${_(`clapper`,{className:`brand__mark-icon`,strokeWidth:1})}
          </span>
          <span class="brand__text">
            <span class="brand__name">Secretos</span>
            <span class="brand__sub">de claqueta</span>
          </span>
        </a>

        <search class="site-header__search" data-header-search hidden>
          <form class="search search--compact" data-header-search-form>
            <label class="visually-hidden" for="header-search">Buscar películas</label>
            <span class="search__icon">${_(`search`)}</span>
            <input
              class="search__input"
              id="header-search"
              name="q"
              type="search"
              placeholder="Buscar una película…"
              autocomplete="off"
              spellcheck="false"
              enterkeyhint="search"
            />
            <button
              class="search__clear"
              type="button"
              data-header-search-clear
              aria-label="Borrar búsqueda"
              hidden
            >
              ${_(`close`)}
            </button>
            <button class="search__submit" type="submit">Buscar</button>
          </form>
        </search>

        <div class="header-actions">
          <button class="theme-toggle" type="button" data-theme-toggle>
            <span class="theme-toggle__icon" data-theme-icon="dark">${_(`sun`)}</span>
            <span class="theme-toggle__icon" data-theme-icon="light" hidden>${_(`moon`)}</span>
            <span class="visually-hidden" data-theme-label></span>
          </button>

          <a class="favorites-link" href="#/favorites" data-favorites-link>
            <span class="favorites-link__label">Favoritos</span>
            <span class="favorites-link__count" data-favorites-count hidden>0</span>
          </a>
        </div>
      </div>
    `)),L=e.querySelector(`[data-header-search]`);let t=e.querySelector(`[data-header-search-form]`),n=t?.elements.namedItem(`q`),r=e.querySelector(`[data-header-search-clear]`),i=()=>{n&&(n.value=``,r&&(r.hidden=!0),n.focus(),c(`Búsqueda borrada.`))};n?.addEventListener(`input`,()=>{r&&(r.hidden=n.value.length===0)}),r?.addEventListener(`click`,i),n?.addEventListener(`keydown`,e=>{e.key===`Escape`&&n.value&&(e.preventDefault(),i())}),t?.addEventListener(`submit`,e=>{e.preventDefault();let t=n?.value.trim()??``;t&&x(`/search?q=${encodeURIComponent(t)}`)});let s=e.querySelector(`[data-favorites-link]`),l=e.querySelector(`[data-favorites-count]`),u=()=>{let e=ue();l&&(l.textContent=String(e),l.hidden=e===0),s&&(s.dataset.active=String(e>0),s.setAttribute(`aria-label`,e===0?`Favoritos`:`Favoritos, ${re(e,`película guardada`,`películas guardadas`)}`))};u(),k(u);let d=e.querySelector(`[data-theme-toggle]`),f=d?.querySelector(`[data-theme-label]`),p=d?.querySelector(`[data-theme-icon="dark"]`),m=d?.querySelector(`[data-theme-icon="light"]`),h=()=>{let e=I()===`dark`;p&&(p.hidden=!e),m&&(m.hidden=e),f&&(f.textContent=e?`Cambiar a tema claro`:`Cambiar a tema oscuro`)};d?.addEventListener(`click`,()=>{pe(),c(I()===`dark`?`Tema oscuro activado.`:`Tema claro activado.`)}),h(),me(h);let g=()=>{e.classList.toggle(`is-scrolled`,window.scrollY>8)};g(),window.addEventListener(`scroll`,g,{passive:!0})}async function ve(e,t){try{let n=await fetch(e,{mode:`cors`});if(!n.ok)throw Error(`HTTP ${n.status}`);let r=await n.blob(),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=t,document.body.append(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(i),1e3),c(`Póster descargado.`)}catch{window.open(e,`_blank`,`noopener,noreferrer`),c(`La descarga directa no estuvo disponible. Se abrió la imagen en una pestaña nueva.`)}}var ye=3200,be=280,R=null,xe=0,Se=0;function Ce(){let e=o(a`
    <div class="favorite-toast" aria-hidden="true" hidden>
      <span class="favorite-toast__icon">${_(`heart`)}</span>
      <p class="favorite-toast__text">
        <span class="favorite-toast__title">Guardada en favoritos</span>
        <span class="favorite-toast__name" data-toast-name></span>
      </p>
    </div>
  `);return document.body.append(e),e}function z(e){let t=R?.isConnected?R:R=Ce();t.querySelector(`[data-toast-name]`).textContent=e,window.clearTimeout(xe),window.clearTimeout(Se),document.body.classList.add(`has-favorite-toast`),t.hidden=!1,t.classList.remove(`is-visible`),t.offsetWidth,t.classList.add(`is-visible`),xe=window.setTimeout(()=>{t.classList.remove(`is-visible`),document.body.classList.remove(`has-favorite-toast`),Se=window.setTimeout(()=>{t.hidden=!0},be)},ye)}function we(...e){let t=e.filter(Boolean);if(t.length===0)return;if(t.length===1)return t[0];if(typeof AbortSignal.any==`function`)return AbortSignal.any(t);let n=new AbortController;return t.forEach(e=>{e.aborted?n.abort(e.reason):e.addEventListener(`abort`,()=>n.abort(e.reason),{once:!0})}),n.signal}var Te=`https://api.themoviedb.org/3`,B=`https://image.tmdb.org/t/p`,V=`611d10a450514ccf8e09857f609f36d1`,H=`./poster-placeholder.svg`,Ee=3e5,De=50,U=new Map,W=V.length>0,G=H,K=class extends Error{constructor(e,{kind:t=`request`,status:n=0,cause:r}={}){super(e,{cause:r}),this.name=`TmdbError`,this.kind=t,this.status=n}};function Oe(e=12e3){return typeof AbortSignal.timeout==`function`?AbortSignal.timeout(e):void 0}function ke(e,t){if(U.size>=De){let e=U.keys().next().value;U.delete(e)}U.set(e,{savedAt:Date.now(),data:t})}async function q(e,{params:t={},signal:n}={}){if(!W)throw new K(`Falta configurar la clave de TMDB.`,{kind:`config`});let r=new URL(`${Te}${e}`);r.searchParams.set(`language`,`es-ES`),r.searchParams.set(`api_key`,V),Object.entries(t).forEach(([e,t])=>{t!=null&&t!==``&&r.searchParams.set(e,t)});let i=r.toString(),a=U.get(i);if(a&&Date.now()-a.savedAt<Ee)return a.data;try{let e=await fetch(r,{signal:we(n,Oe()),headers:{accept:`application/json`}});if(!e.ok)throw new K(`TMDB respondió con el estado ${e.status}.`,{kind:`http`,status:e.status});let t=await e.json();return ke(i,t),t}catch(e){throw e instanceof K?e:e?.name===`AbortError`?new K(`La solicitud se canceló.`,{kind:`abort`,cause:e}):new K(`No pudimos conectar con TMDB.`,{kind:`network`,cause:e})}}function J(e){return{id:Number(e.id),title:e.title||e.name||`Título desconocido`,originalTitle:e.original_title||e.title||``,posterPath:e.poster_path??null,backdropPath:e.backdrop_path??null,releaseDate:e.release_date??``,year:te(e.release_date),rating:Number(e.vote_average??0),voteCount:Number(e.vote_count??0),overview:e.overview??``}}function Ae(e){return{...J(e),runtime:Number(e.runtime??0),tagline:e.tagline??``,genres:Array.isArray(e.genres)?e.genres.map(e=>e.name):[],originalLanguage:e.original_language??``}}function je(e){return(Array.isArray(e)?e:[]).slice(0,12).map(e=>({id:Number(e.id),name:e.name??``,character:e.character??``,profilePath:e.profile_path??null}))}function Y(e,t=`w500`){return e?`${B}/${t}${e}`:H}function Me(e,t=`w1280`){return e?`${B}/${t}${e}`:null}function Ne(e,t=`w185`){return e?`${B}/${t}${e}`:null}async function Pe({signal:e}={}){return((await q(`/trending/movie/week`,{signal:e})).results??[]).map(J).filter(e=>e.title)}async function Fe(e,{signal:t,page:n=1}={}){let r=await q(`/search/movie`,{params:{query:e,include_adult:`false`,page:n},signal:t});return{results:(r.results??[]).map(J).filter(e=>e.title),total:Number(r.total_results??0)}}async function Ie(e,{signal:t}={}){let[n,r]=await Promise.all([q(`/movie/${e}`,{signal:t}),q(`/movie/${e}/credits`,{signal:t}).catch(e=>{if(e?.kind===`abort`)throw e;return{cast:[],crew:[]}})]),i=(r.crew??[]).find(e=>e.job===`Director`);return{movie:Ae(n),cast:je(r.cast),director:i?.name??null}}var Le={before:`Antes del rodaje`,during:`Durante el rodaje`,after:`Después del estreno`},Re={27205:[{phase:`before`,title:`La idea esperó casi una década`,text:`Christopher Nolan concibió el germen de Inception antes de rodar Batman Begins. Warner lo aprobó como proyecto propio solo después del éxito de El caballero oscuro.`},{phase:`during`,title:`El pasillo giratorio existía de verdad`,text:`Se construyó un corredor de más de treinta metros que rotaba sobre sí mismo. Joseph Gordon-Levitt se entrenó durante semanas para rodar las peleas dentro de él.`},{phase:`during`,title:`El vagón invadió una calle real`,text:`La secuencia del tren se rodó con una locomotora y un vagón colocados en plena calle de Los Ángeles, sin recurrir a un decorado digital.`},{phase:`after`,title:`La peonza nunca se ve caer`,text:`El montaje corta justo antes de revelar si el objeto se tambalea. Michael Caine defendió durante años su propia lectura del final, alimentando el debate.`},{phase:`after`,title:`Se convirtió en la original más taquillera de Nolan`,text:`Con unos 160 millones de presupuesto, superó los 830 millones de recaudación. Durante más de una década fue su película no franquiciada con mayor éxito.`}],238:[{phase:`before`,title:`El estudio no quería a Al Pacino`,text:`Paramount prefería nombres más comerciales para Michael Corleone. Coppola insistió hasta imponer a Pacino, que estuvo a punto de abandonar el proyecto.`},{phase:`before`,title:`Marlon Brando se fabricó su propio personaje`,text:`Se presentó a la prueba con algodón en la boca y el pelo engominado. La transformación convenció al estudio de que Vito Corleone era posible.`},{phase:`during`,title:`El gato del despacho fue un hallazgo`,text:`Un gato callejero se coló en el decorado y se quedó acurrucado en el regazo de Brando. Coppola decidió dejarlo en el plano.`},{phase:`during`,title:`La boda se rodó con cinco cámaras`,text:`La secuencia inicial movilizó a cientos de extras y varias cámaras simultáneas. El material resultante se convirtió en una lección de montaje paralelo.`},{phase:`after`,title:`Salvó a un estudio y cambió el cine de gánsteres`,text:`Paramount atravesaba dificultades cuando la película arrasó en taquilla. Ganó tres premios Oscar y redefinió el género para siempre.`}],680:[{phase:`before`,title:`El maletín brillante escondía una bombilla`,text:`El famoso resplandor no era un efecto digital: dentro del maletín se colocó una luz y unos reflectores para crear el enigma.`},{phase:`before`,title:`Los actores no ensayaron el baile`,text:`Tarantino les pidió que improvisaran el twist en el restaurante. La toma que llegó al montaje conserva esa energía de primera vez.`},{phase:`during`,title:`Todo se rodó en cincuenta días`,text:`El presupuesto rondaba los ocho millones de dólares. El equipo trabajó a contrarreloj en localizaciones reales de Los Ángeles.`},{phase:`during`,title:`El reloj de oro era una pieza de atrezo muy personal`,text:`Tarantino escribió el monólogo del reloj pensando en el valor de los objetos heredados. La pieza se convirtió en uno de los símbolos de la película.`},{phase:`after`,title:`Resucitó una carrera y ganó el Oscar al guion`,text:`El papel de Vincent Vega devolvió a John Travolta al primer plano. La película se llevó la estatuilla al mejor guion original.`}],550:[{phase:`before`,title:`Los dos protagonistas eligieron su lado`,text:`Brad Pitt y Edward Norton se reunieron con David Fincher y decidieron intercambiar los papeles que el estudio tenía en mente. El resto encajó solo.`},{phase:`before`,title:`El jabón se fabricó de verdad`,text:`El departamento de arte preparó lotes reales siguiendo una receta artesanal. Las barras que aparecen en pantalla son piezas físicas, no réplicas de utilería.`},{phase:`during`,title:`La escalera se rodó sin dobles`,text:`La pelea del sótano se coreografió durante días y se filmó con los actores al completo. Fincher buscaba que los golpes sonaran secos y creíbles.`},{phase:`after`,title:`El estreno llegó en un momento delicado`,text:`La promoción se topó con la matanza de Columbine y el estudio moderó la campaña. Aun así, la película encontró su público con el tiempo.`},{phase:`after`,title:`De fracaso a clásico de culto`,text:`En cines pasó sin hacer ruido, pero el DVD la convirtió en un fenómeno generacional. Hoy es una de las películas más citadas de su época.`}],157336:[{phase:`before`,title:`El proyecto nació para otro director`,text:`Jonathan Nolan desarrolló la historia con Steven Spielberg. Cuando Spielberg se marchó, Christopher asumió la dirección y reescribió el guion.`},{phase:`before`,title:`La ciencia fue consultada desde el primer borrador`,text:`Kip Thorne asesoró al equipo durante años. Las ecuaciones del agujero negro acabaron generando una publicación científica real.`},{phase:`during`,title:`El llanto de Cooper fue real`,text:`Matthew McConaughey pidió no ver los mensajes de sus hijos antes de rodar la escena. Su reacción ante la pantalla se grabó a la primera.`},{phase:`during`,title:`La biblioteca era un decorado gigantesco`,text:`Se construyeron estanterías a escala real para la secuencia del teseracto. Los libros se colocaron a mano para que la cámara pudiera atravesarlas.`},{phase:`after`,title:`El estreno apostó por el formato grande`,text:`La película se proyectó en 70 mm e IMAX en salas seleccionadas. Ganó el Oscar a los mejores efectos visuales.`}],496243:[{phase:`before`,title:`La semilla fue una anécdota de clases particulares`,text:`Bong Joon-ho se inspiró en la experiencia de un amigo que daba tutorías a familias adineradas. La idea creció durante años antes de convertirse en guion.`},{phase:`before`,title:`La casa se diseñó como un decorado completo`,text:`La vivienda principal se construyó a escala real, con la planta baja y el sótano en sets separados. Cada ventana se colocó pensando en la cámara.`},{phase:`during`,title:`La inundación se rodó en un tanque`,text:`Para la escena del sótano anegado se construyó un gran tanque de agua. El equipo ensayó la coreografía con los actores antes de abrir las compuertas.`},{phase:`after`,title:`Hizo historia en los Oscar`,text:`Fue la primera película de habla no inglesa en ganar el premio a mejor película. También se llevó dirección, guion original y película internacional.`},{phase:`after`,title:`El equipo celebró hasta el amanecer`,text:`Tras la ceremonia, el reparto y Bong Joon-ho improvisaron una fiesta que se alargó durante horas. Las fotos de esa noche dieron la vuelta al mundo.`}],155:[{phase:`before`,title:`Ledger se encerró con el personaje`,text:`Heath Ledger pasó semanas aislado construyendo la voz y la risa del Joker. Llenó un cuaderno con ideas que luego llevó directamente al set.`},{phase:`before`,title:`El camión volcado no era digital`,text:`Para la persecución se utilizó un cañón de nitrógeno que volteó el vehículo en una calle real de Chicago. La toma se repitió hasta dar con el ángulo exacto.`},{phase:`during`,title:`El hospital era una fábrica abandonada`,text:`La explosión de la escena final se rodó en una antigua fábrica que después fue demolida. El equipo aprovechó la estructura real para el derrumbe.`},{phase:`after`,title:`El Oscar póstumo llegó a su familia`,text:`Ledger recibió la estatuilla a mejor actor de reparto. Sus padres y su hermana recogieron el premio en nombre del intérprete.`},{phase:`after`,title:`La campaña viral cambió el marketing`,text:`Los carteles de «Why so serious?» y los sitios falsos convirtieron la promoción en un juego. Muchas campañas posteriores copiaron la fórmula.`}],603:[{phase:`before`,title:`El proyecto se presentó con un cómic de tres páginas`,text:`Los Wachowski convencieron al estudio con un cómic que resumía el mundo de la película. El guion completo llegó después para cerrar el acuerdo.`},{phase:`before`,title:`Cuatro meses de artes marciales`,text:`El reparto se sometió a un entrenamiento intensivo con Yuen Woo-ping. Keanu Reeves llegó al rodaje con una preparación física completamente distinta.`},{phase:`during`,title:`El bullet time usó más de cien cámaras`,text:`Las cámaras se distribuyeron en un arco alrededor de la acción y se dispararon de forma sincronizada. El efecto se completó después con posproducción.`},{phase:`during`,title:`El verde del mundo digital se añadió después`,text:`Durante el rodaje no había dominante verde: se aplicó en el etalonaje. Esa decisión permitió separar con claridad los dos niveles de realidad.`},{phase:`after`,title:`El secreto fue parte de la campaña`,text:`El marketing ocultó deliberadamente la trama y jugó con la confusión del público. La película superó los 460 millones de dólares en todo el mundo.`}],129:[{phase:`before`,title:`La historia nació para una niña de diez años`,text:`Miyazaki escribió el relato pensando en la hija de un amigo. Quería hacer una película que ella pudiera entender sin explicaciones.`},{phase:`before`,title:`El mundo se inspiró en lugares reales`,text:`La casa de baños tomó referencias de los baños de Dogo Onsen y del barrio de Jiufen. El equipo viajó para estudiar la arquitectura y la luz.`},{phase:`during`,title:`Casi todo se dibujó a mano`,text:`El estudio produjo decenas de miles de fotogramas tradicionales. La animación digital se reservó para momentos muy concretos.`},{phase:`after`,title:`Rompió la barrera del Oscar`,text:`Fue la primera película no anglosajona en ganar el premio a mejor película animada. El reconocimiento abrió puertas al anime en Occidente.`},{phase:`after`,title:`El mundo volvió a existir fuera de la pantalla`,text:`Años después, el parque de Ghibli recreó algunos de sus escenarios. Miyazaki siempre rechazó la idea de una secuela directa.`}],105:[{phase:`before`,title:`Marty tuvo dos actores antes que Fox`,text:`Eric Stoltz rodó varias semanas en el papel antes de ser sustituido. Michael J. Fox compaginó el rodaje con su serie de televisión.`},{phase:`before`,title:`El DeLorean parecía un platillo volante`,text:`Se eligió el coche por su diseño futurista y su precio asequible. El alerón y los cables completaron la ilusión de máquina del tiempo.`},{phase:`during`,title:`Fox dormía apenas tres horas`,text:`Rodaba la película de noche y la serie de día. El agotamiento se nota en algunas tomas que el equipo decidió conservar.`},{phase:`during`,title:`El cartel del centro comercial cambia`,text:`El nombre del lugar muta después del primer viaje al pasado. Es uno de los detalles más buscados por los seguidores de la trilogía.`},{phase:`after`,title:`Se convirtió en la película del año`,text:`Fue el estreno más taquillero de 1985 y dio pie a dos secuelas. El reloj del ayuntamiento y el monopatín siguen siendo iconos pop.`}],329:[{phase:`before`,title:`Spielberg compró los derechos antes del estreno literario`,text:`La novela de Michael Crichton llegó a las librerías con la película ya en marcha. El autor participó en el guion y en el diseño de los dinosaurios.`},{phase:`before`,title:`El T-Rex era una máquina de seis toneladas`,text:`El animatrónico medía doce metros y se movía con sistemas hidráulicos. En los días de lluvia el equipo tenía que protegerlo como si fuera un edificio.`},{phase:`during`,title:`El vaso de agua temblaba con una cuerda`,text:`Bajo el asiento del Jeep se tensó una cuerda de guitarra para provocar la vibración. El efecto se sincronizó con los pasos del dinosaurio.`},{phase:`during`,title:`El rugido mezcla varios animales`,text:`Se combinaron grabaciones de un bebé elefante, un cocodrilo y un tigre. El resultado se procesó hasta sonar imposible de identificar.`},{phase:`after`,title:`Cambió los efectos visuales para siempre`,text:`La película demostró que el CGI podía sostener una superproducción. Recaudó más de mil millones de dólares y relanzó el interés por los dinosaurios.`}],1417:[{phase:`before`,title:`El guion nació junto a otra película`,text:`Guillermo del Toro escribió El laberinto del fauno como complemento de El espinazo del diablo. Quería explorar la guerra desde la mirada de una niña.`},{phase:`before`,title:`El fauno exigía cinco horas de maquillaje`,text:`Doug Jones actuó con prótesis que limitaban su visión periférica. Aprendió a moverse en el set guiado por marcas y por la voz del equipo.`},{phase:`during`,title:`El banquete se rodó como una pesadilla real`,text:`La mesa del monstruo pálido se construyó en un set enorme. Del Toro buscaba que el espectador sintiera hambre y asco al mismo tiempo.`},{phase:`after`,title:`Tres Oscar para una película de fantasía`,text:`Ganó fotografía, dirección artística y maquillaje. El reconocimiento consolidó la carrera internacional de del Toro.`},{phase:`after`,title:`El cuaderno original sigue guardado`,text:`El director conserva los bocetos con los que imaginó el fauno y el monstruo pálido. Muchos diseños cambiaron muy poco hasta el rodaje.`}]},ze=[`before`,`during`,`during`,`after`,`after`],Be={before:[e=>`${e.title} pasó por varias versiones antes de llegar al set. ${e.director} y el equipo reescribieron el arranque hasta encontrar el tono definitivo.`,e=>`La primera idea de ${e.title} era bastante distinta: se barajaron otro reparto y otro desenlace. Lo que hoy vemos nació de descartar la opción más obvia.`,e=>`El rodaje estuvo a punto de no ocurrir. La producción se retrasó varios meses mientras se cerraban el presupuesto y el calendario de ${e.director}.`],during:[e=>`Una de las tomas más recordadas de ${e.title} no estaba en el guion. El equipo la improvisó en el set y acabó entrando en el montaje final.`,e=>`Se levantó un decorado a escala real para una sola secuencia. Después de ${e.year}, ese espacio se convirtió en leyenda entre los técnicos.`,e=>`El equipo rodó más material del previsto y usó dos cámaras en varias escenas. Algunas reacciones espontáneas terminaron siendo esenciales.`,e=>`Los actores ensayaron durante semanas antes de la primera claqueta. Parte de esa preparación se coló en el guion como gestos y silencios.`],after:[e=>`Tras el estreno, ${e.title} cambió la forma de promocionar las películas del género. El boca a boca hizo el resto.`,e=>`El montaje final dejó fuera secuencias que hoy se consideran piezas perdidas. Algunos fragmentos aparecieron años después en material de archivo.`,e=>`En la temporada de premios de ${e.year}, la película sumó más nominaciones de las esperadas. La campaña empezó discreta y terminó dominando la conversación.`,e=>`Con el tiempo se convirtió en una película de revisión obligada. Sus detalles escondidos alimentan teorías de los espectadores desde el estreno.`]};function Ve(e,t){return{title:e.title,year:e.year,director:t||`el equipo de dirección`}}function He(e,t){let n=Ve(e,t),r=Number(e.id)||0;return ze.map((e,t)=>{let i=Be[e],a=i[(r+t*7)%i.length];return{phase:e,title:Ue(e,t,n),text:a(n)}})}function Ue(e,t,n){return e===`before`?t===0?`Un proyecto que cambió de forma`:`El rodaje que casi no sucede`:e===`during`?t===1?`La toma que nadie había planeado`:`Un decorado para la historia`:t===3?`Lo que el estreno dejó atrás`:`El legado de ${n.title}`}function We(e,{director:t=null}={}){let n=Re[Number(e.id)];return Array.isArray(n)?n:He(e,t)}function Ge(e){return e.length===0?a`<p class="detail-section__note">No hay información de reparto disponible.</p>`:a`
    <ul class="cast">
      ${e.map(e=>{let t=e.name.split(/\s+/).slice(0,2).map(e=>e.charAt(0)).join(``).toUpperCase();return a`
          <li class="cast__item">
            ${e.profilePath?a`<img
                    class="cast__avatar"
                    src="${Ne(e.profilePath)}"
                    alt=""
                    width="185"
                    height="185"
                    loading="lazy"
                    decoding="async"
                  />`:a`<span class="cast__avatar cast__avatar--initials" aria-hidden="true"
                    >${t}</span
                  >`}
            <p class="cast__name">${e.name}</p>
            ${e.character?a`<p class="cast__role">${e.character}</p>`:``}
          </li>
        `})}
    </ul>
  `}function Ke(e){return a`
    <ol class="secrets">
      ${e.map((e,t)=>a`
          <li class="secret">
            <span class="secret__index" aria-hidden="true">${ie(t+1)}</span>
            <div class="secret__content">
              <span class="secret__phase" data-phase="${e.phase}">
                ${Le[e.phase]??`Rodaje`}
              </span>
              <h3 class="secret__title">${e.title}</h3>
              <p class="secret__text">${e.text}</p>
            </div>
          </li>
        `)}
    </ol>
  `}function qe(e,t,n){let r=We(e,{director:n}),i=ne(e.runtime);return a`
    <article class="detail">
      <div class="container detail__inner">
        <div
          class="detail__hero"
          style="--hero-poster: url('${Y(e.posterPath,`w780`)}')"
        >
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${Y(e.posterPath,`w780`)}"
              alt="Póster de ${e.title}"
              width="780"
              height="1170"
              decoding="async"
            />
          </div>

          <div class="detail__intro">
            <h1 class="detail__title">${e.title}</h1>
            ${e.tagline?a`<p class="detail__tagline">«${e.tagline}»</p>`:``}

            <ul class="detail__meta">
              <li class="detail__meta-item">
                ${_(`calendar`)}
                <span>${e.year}</span>
              </li>
              ${i?a`<li class="detail__meta-item">${_(`clock`)}<span>${i}</span></li>`:``}
              <li class="detail__meta-item">
                ${_(`star`)}
                <span>${ee(e.rating)}</span>
                <span class="visually-hidden">sobre 10</span>
              </li>
              ${n?a`<li class="detail__meta-item">${_(`user`)}<span>${n}</span></li>`:``}
              ${e.genres.length?a`<li class="detail__meta-item">
                      <span class="detail-section__note">${e.genres.join(` · `)}</span>
                    </li>`:``}
              <li class="detail__meta-item detail__meta-item--action">
                <button class="fav-button" type="button" data-detail-favorite>
                  ${_(`heart`)}
                </button>
                <button
                  class="fav-button detail__download"
                  type="button"
                  data-detail-download
                  aria-label="Descargar póster de ${e.title}"
                >
                  ${_(`download`)}
                </button>
              </li>
            </ul>

            ${e.overview?a`<p class="detail__overview">${e.overview}</p>`:a`<p class="detail__overview">Sin sinopsis disponible en castellano.</p>`}
          </div>
        </div>

        <section class="detail-section" aria-labelledby="cast-title">
          <div class="detail-section__head">
            <div>
              <h2 id="cast-title">Reparto</h2>
            </div>
          </div>
          ${Ge(t)}
        </section>

        <section class="detail-section" aria-labelledby="secrets-title">
          <div class="detail-section__head">
            <div>
              <h2 id="secrets-title">Secretos de rodaje</h2>
            </div>
            <p class="detail-section__note">
              Contenido de archivo recreado para esta demostración.
            </p>
          </div>
          ${Ke(r)}
        </section>
      </div>
      <button class="back-to-top" type="button" data-back-to-top aria-label="Volver arriba">
        ${_(`arrowUp`)}
      </button>
    </article>
  `}function Je({posterSrc:e,title:t}){return a`
    <article class="detail">
      <div class="detail__backdrop" data-detail-backdrop aria-hidden="true"></div>
      <div class="container detail__inner">
        <div class="detail__hero" style="--hero-poster: url('${e??`./poster-placeholder.svg`}')">
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${e??`./poster-placeholder.svg`}"
              alt="${t?`Póster de ${t}`:`Cargando póster`}"
              width="780"
              height="1170"
              decoding="async"
            />
          </div>
          <div class="detail__intro">
            <p class="eyebrow">Archivo de claqueta</p>
            <h1 class="detail__title">${t||`Cargando película…`}</h1>
            <div class="skeleton-card__body" aria-hidden="true">
              <span class="skeleton-line skeleton-line--title"></span>
              <span class="skeleton-line"></span>
              <span class="skeleton-line skeleton-line--short"></span>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function Ye(e){let t=e?.kind===`config`,n=e?.kind===`http`&&e.status===404,r=t?`Falta la clave de TMDB`:n?`Esa película no está en el archivo`:`No pudimos abrir la ficha`,i=t?`Añade VITE_TMDB_API_KEY a tu archivo .env y reinicia el servidor para cargar los detalles.`:n?`Puede que el enlace esté mal escrito o que TMDB ya no tenga esa referencia.`:`Comprueba tu conexión y vuelve a intentarlo desde la cartelera.`;return a`
    <section class="page container" aria-labelledby="detail-error-title">
      <div class="state state--error">
        <span class="state__icon">${_(`film`)}</span>
        <h1 id="detail-error-title">${r}</h1>
        <p>${i}</p>
        <a class="btn btn--ghost" href="#/">Explorar tendencias</a>
      </div>
    </section>
  `}var X=new Map,Xe=30;function Ze(e,t){X.size>=Xe&&X.delete(X.keys().next().value),X.set(e,t)}function Qe(e){let t=Number(e);Number.isFinite(t)&&!X.has(t)&&Ie(t).then(e=>Ze(t,e)).catch(()=>{})}function $e(e,t,n){let r=e.querySelector(`[data-detail-favorite]`),i=e.querySelector(`[data-favorite-text]`);if(!r)return;let a=()=>{let e=D(t.id);r.setAttribute(`aria-pressed`,String(e)),r.setAttribute(`aria-label`,e?`Quitar ${t.title} de favoritos`:`Añadir ${t.title} a favoritos`),i&&(i.textContent=e?`En tus favoritos`:`Guardar en favoritos`)};r.addEventListener(`click`,()=>{let e=O(t);e&&z(t.title),c(e?`${t.title} añadida a favoritos.`:`${t.title} eliminada de favoritos.`)},{signal:n});let o=k(a);n.addEventListener(`abort`,o,{once:!0}),a()}function et(e,t,n){let r=e.querySelector(`[data-detail-download]`);r&&r.addEventListener(`click`,()=>{let e=t.title.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)||`pelicula`;ve(Y(t.posterPath,`original`),`${e}-poster.jpg`)},{signal:n})}function tt(e,t){let n=e.querySelector(`[data-back-to-top]`);if(!n)return;let r=()=>n.classList.toggle(`is-visible`,window.scrollY>400);n.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:l()?`instant`:`smooth`})},{signal:t}),window.addEventListener(`scroll`,r,{signal:t,passive:!0}),r()}async function nt(e,t,n){let{movie:r,cast:i,director:a}=t;await p(e,qe(r,i,a));let o=e.querySelector(`[data-detail-backdrop]`),s=r.posterPath?Y(r.posterPath,`w780`):Me(r.backdropPath,`w1280`)??`./poster-placeholder.svg`;o&&(o.style.backgroundImage=`url("${s}")`);let c=e.querySelector(`[data-poster-transition]`);c?.addEventListener(`error`,()=>{c.src=G},{once:!0,signal:n}),$e(e,r,n),et(e,r,n),tt(e,n),document.title=`${r.title} (${r.year}) — Secretos de claqueta`}async function rt({outlet:e,params:t,state:n,signal:r}){let i=Number(t[0]);if(!Number.isFinite(i)){await p(e,Ye({kind:`http`,status:404})),document.title=`Película no disponible — Secretos de claqueta`;return}let a=X.get(i);if(a)await nt(e,a,r);else{await p(e,Je({posterSrc:n?.posterSrc??null,title:n?.title??``})),document.title=`Cargando película… — Secretos de claqueta`;try{let t=await Ie(i,{signal:r});if(r.aborted)return;Ze(i,t),await nt(e,t,r)}catch(t){if(t?.kind===`abort`||r.aborted)return;await p(e,Ye(t)),document.title=`Película no disponible — Secretos de claqueta`}}}function Z(e,{signal:t,hideDot:n=!1}={}){let r=o(a`
    <article class="movie-card">
      <a
        class="movie-card__link"
        href="#/movie/${e.id}"
        aria-label="Ver el detalle de ${e.title} (${e.year})"
      >
        <figure class="movie-card__media">
          <img
            class="movie-card__poster"
            data-poster
            src="${Y(e.posterPath)}"
            alt=""
            width="500"
            height="750"
            loading="lazy"
            decoding="async"
          />
          <span class="movie-card__shine" aria-hidden="true"></span>
        </figure>
        <div class="movie-card__body">
          <h3 class="movie-card__title">${e.title}</h3>
          <p class="movie-card__meta">
            <span class="movie-card__year">${e.year}</span>
            ${n?``:a`<span class="movie-card__dot" aria-hidden="true"></span>`}
            <span class="movie-card__rating">
              ${_(`star`)}
              <span class="visually-hidden">Puntuación:</span>
              ${ee(e.rating)}
              <span class="visually-hidden">de 10</span>
            </span>
          </p>
        </div>
      </a>
      <button class="fav-toggle" type="button" data-favorite>
        ${_(`heart`)}
        <span class="visually-hidden" data-favorite-label></span>
      </button>
    </article>
  `),i=r.querySelector(`[data-poster]`),s=r.querySelector(`[data-favorite]`),l=r.querySelector(`[data-favorite-label]`),u=r.querySelector(`.movie-card__link`),d=()=>Qe(e.id),f=0,p=()=>{f=window.setTimeout(d,160)},m=()=>window.clearTimeout(f);u?.addEventListener(`pointerenter`,p,{signal:t}),u?.addEventListener(`pointerleave`,m,{signal:t}),u?.addEventListener(`focus`,d,{once:!0,signal:t}),t?.addEventListener(`abort`,m,{once:!0}),i.addEventListener(`error`,()=>{i.src=G},{once:!0,signal:t});function h(){let t=D(e.id);s.setAttribute(`aria-pressed`,String(t)),s.setAttribute(`aria-label`,t?`Quitar ${e.title} de favoritos`:`Añadir ${e.title} a favoritos`),l.textContent=t?`En tus favoritos`:`Añadir a favoritos`}s.addEventListener(`click`,()=>{let t=O(e);h(),s.classList.remove(`is-bumping`),s.offsetWidth,s.classList.add(`is-bumping`),t&&z(e.title),c(t?`${e.title} añadida a favoritos.`:`${e.title} eliminada de favoritos.`)},{signal:t}),h();let g=k(()=>{r.isConnected?h():g()});return t?.addEventListener(`abort`,g,{once:!0}),r}function it(e,{signal:t}={}){let n=document.createElement(`ul`);return n.className=`movie-grid`,e.forEach((e,r)=>{let i=document.createElement(`li`);i.className=`movie-grid__item`,i.style.setProperty(`--index`,String(r)),i.append(Z(e,{signal:t})),n.append(i)}),n}function at(){return a`
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton-card__poster"></div>
      <div class="skeleton-card__body">
        <span class="skeleton-line skeleton-line--title"></span>
        <span class="skeleton-line skeleton-line--short"></span>
      </div>
    </div>
  `}function ot(e=8){return a`
    <ul class="movie-grid" aria-hidden="true">
      ${Array.from({length:e},()=>a`<li class="movie-grid__item">${at()}</li>`)}
    </ul>
  `}function st(){return a`
    <section class="page container" aria-labelledby="favorites-title">
      <header class="page__head">
        <h1 class="page__title" id="favorites-title">Películas guardadas</h1>
        <p class="page__lead" data-favorites-summary></p>
      </header>

      <div class="favorites-grid" data-favorites-grid></div>

      <div class="empty-state" data-favorites-empty hidden>
        <span class="empty-state__heart">${_(`heart`)}</span>
        <h2>Tu lista está en blanco</h2>
        <p>
          Guarda las películas que quieras revisitar. Sus secretos de rodaje seguirán aquí cuando
          vuelvas.
        </p>
        <a class="btn btn--gold" href="#/">Explorar tendencias</a>
      </div>
    </section>
  `}async function ct({outlet:e,signal:t}){await p(e,st()),document.title=`Favoritos — Secretos de claqueta`,e.querySelector(`[data-favorites-summary]`);let n=e.querySelector(`[data-favorites-grid]`),r=e.querySelector(`[data-favorites-empty]`),i=()=>{let e=le(),i=document.activeElement?.closest?.(`.movie-card__link`)??null,a=i?.getAttribute(`href`)?.match(/\/movie\/(\d+)/)?.[1]??null,o=!!i;if(e.length===0)r.hidden=!1,n.replaceChildren(),o&&r.querySelector(`a`)?.focus();else if(r.hidden=!0,n.replaceChildren(it(e,{signal:t})),o){let e=a?n.querySelector(`a[href="#/movie/${a}"]`):null;(e?e.parentElement.querySelector(`.fav-toggle`):n.querySelector(`.fav-toggle`))?.focus()}};i();let a=k(i);t.addEventListener(`abort`,a,{once:!0})}var lt=30;function ut(e,{signal:t,autoplay:n=!0}={}){let r=e.querySelector(`[data-carousel-track]`);if(!r)return;let i=window.matchMedia(`(prefers-reduced-motion: reduce)`),a=!1,o=!1,s=0,c=0,l=0,u=0,d=0,f=()=>{let e=Number.parseFloat(getComputedStyle(r).columnGap)||16;s=(r.scrollWidth+e)/2};e.addEventListener(`pointerenter`,()=>{a=!0},{signal:t}),e.addEventListener(`pointerleave`,()=>{a=!1},{signal:t}),e.addEventListener(`focusin`,()=>{o=!0},{signal:t}),e.addEventListener(`focusout`,t=>{e.contains(t.relatedTarget)||(o=!1)},{signal:t});let p=null;if(typeof ResizeObserver==`function`&&(p=new ResizeObserver(f),p.observe(r)),f(),!n||!t){t?.addEventListener(`abort`,()=>p?.disconnect(),{once:!0});return}let m=e=>{u||=e;let t=Math.min(e-u,120);if(u=e,!(a||o||i.matches||document.hidden)&&s>r.clientWidth){let e=r.scrollLeft;for(Math.abs(e-l)>2&&(c=e),c+=lt*t/1e3;c>=s;)c-=s;r.scrollLeft=c,l=r.scrollLeft}d=requestAnimationFrame(m)};d=requestAnimationFrame(m),t.addEventListener(`abort`,()=>{cancelAnimationFrame(d),p?.disconnect()},{once:!0})}var dt=20;function ft(){return a`
    <div class="state">
      <span class="state__icon">${_(`film`)}</span>
      <h3>Conecta tu clave de TMDB</h3>
      <p>
        Para cargar pósters y tendencias necesitas una clave de API. Crea un archivo
        <code>.env</code> en la raíz del proyecto con esta línea:
      </p>
      <p><code>VITE_TMDB_API_KEY=tu_clave</code></p>
      <p>Después reinicia el servidor de desarrollo para que Vite la lea.</p>
      <a
        class="btn btn--ghost"
        href="https://www.themoviedb.org/settings/api"
        target="_blank"
        rel="noreferrer"
      >
        Obtener una clave gratuita
        <span class="visually-hidden">en TMDB (se abre en una pestaña nueva)</span>
      </a>
    </div>
  `}function pt({title:e,text:t,retry:n=!1}){return a`
    <div class="state state--error">
      <span class="state__icon">${_(`film`)}</span>
      <h3>${e}</h3>
      <p>${t}</p>
      ${n?a`<button class="btn btn--ghost" type="button" data-retry>Reintentar</button>`:``}
    </div>
  `}function mt(e){return a`
    <div class="home">
      <section class="hero container" aria-labelledby="hero-title">
        <h1 class="hero__title" id="hero-title">
          Descubre los mejores secretos de <em>Hollywood</em>
        </h1>
        <p class="hero__subtitle">
          Busca tu pelicula favorita y descubre lo que ocurrió antes, durante y después de la
          claqueta.
        </p>
        <search>
          <form class="search" data-search-form>
            <label class="visually-hidden" for="movie-search">Buscar películas</label>
            <span class="search__icon">${_(`search`)}</span>
            <input
              class="search__input"
              id="movie-search"
              name="q"
              type="search"
              placeholder="Busca una película"
              autocomplete="off"
              spellcheck="false"
              enterkeyhint="search"
              value="${e}"
            />
            <button
              class="search__clear"
              type="button"
              data-search-clear
              aria-label="Borrar búsqueda"
              ${e?``:a`hidden`}
            >
              ${_(`close`)}
            </button>
            <button class="search__submit" type="submit">Buscar</button>
          </form>
        </search>
      </section>

      <div class="container">
        <section class="section" data-trending aria-labelledby="trending-title">
          <header class="section-head">
            <div>
              <p class="eyebrow">Esta semana</p>
              <h2 id="trending-title">Tendencias ahora mismo</h2>
            </div>
          </header>
          <div data-trending-body>
            <div class="carousel" data-carousel>
              <ul class="carousel__track" data-carousel-track>
                ${Array.from({length:6},()=>a`<li class="carousel__item">${at()}</li>`)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  `}async function ht({outlet:e,query:t,signal:n}){await p(e,mt((t.get(`q`)??``).trim())),document.title=`Secretos de claqueta — Historias que no salieron en los créditos`;let r=e.querySelector(`[data-search-form]`),i=r.elements.namedItem(`q`),o=e.querySelector(`[data-search-clear]`),s=e.querySelector(`[data-trending]`),l=e.querySelector(`[data-trending-body]`),u=(e,t)=>{e.querySelector(`[data-retry]`)?.addEventListener(`click`,()=>{e.innerHTML=String(a`<div class="state"><p>Cargando de nuevo…</p></div>`),t()},{signal:n})},d=async()=>{if(!W)l.innerHTML=String(ft());else try{let e=await Pe({signal:n});if(n.aborted)return;if(e.length===0){l.innerHTML=String(pt({title:`Sin tendencias disponibles`,text:`TMDB no devolvió resultados esta vez. Inténtalo de nuevo en un momento.`,retry:!0})),u(l,d);return}let t=document.createElement(`ul`);t.className=`carousel__track`,t.dataset.carouselTrack=``;let r=e.slice(0,dt),i=(e,t=!1)=>{let r=document.createElement(`li`);return r.className=`carousel__item`,t&&r.setAttribute(`aria-hidden`,`true`),r.append(Z(e,{signal:n,hideDot:!0})),t&&r.querySelectorAll(`a, button`).forEach(e=>{e.tabIndex=-1}),r};t.append(...r.map(e=>i(e)),...r.map(e=>i(e,!0)));let a=document.createElement(`div`);a.className=`carousel`,a.dataset.carousel=``,a.append(t),l.replaceChildren(a),ut(s,{signal:n})}catch(e){if(e?.kind===`abort`||n.aborted)return;l.innerHTML=String(pt({title:`No pudimos cargar las tendencias`,text:e?.kind===`config`?`Falta la clave de API de TMDB en el archivo .env.`:`Revisa tu conexión y vuelve a intentarlo.`,retry:!0})),u(l,d)}};i.addEventListener(`input`,()=>{o.hidden=i.value.length===0,i.value.trim().length===0&&S(`#/`)},{signal:n}),r.addEventListener(`submit`,e=>{e.preventDefault();let t=i.value.trim();t&&x(`/search?q=${encodeURIComponent(t)}`)},{signal:n}),o.addEventListener(`click`,()=>{i.value=``,o.hidden=!0,S(`#/`),i.focus(),c(`Búsqueda borrada.`)},{signal:n}),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&i.value&&(e.preventDefault(),i.value=``,o.hidden=!0,S(`#/`),c(`Búsqueda borrada.`))},{signal:n}),d()}var gt=2;function _t(e){return a`
    <section class="page container" aria-labelledby="search-title">
      <header class="page__head">
        <p class="eyebrow">Buscar</p>
        <h1 class="page__title" id="search-title">Resultados para «${e}»</h1>
      </header>
      <div data-search-body></div>
    </section>
  `}async function vt({outlet:e,query:t,signal:n}){let r=(t.get(`q`)??``).trim();await p(e,_t(r)),document.title=`Resultados para «${r}» — Secretos de claqueta`;let i=e.querySelector(`[data-search-body]`);if(r.length<gt)i.innerHTML=String(a`
      <div class="state">
        <span class="state__icon">${_(`search`)}</span>
        <h2>Escribe al menos dos caracteres</h2>
        <p>Vuelve al buscador para introducir el título de una película.</p>
      </div>
    `);else if(!W)i.innerHTML=String(a`
      <div class="state">
        <span class="state__icon">${_(`film`)}</span>
        <h2>Conecta tu clave de TMDB</h2>
        <p>
          Añade <code>VITE_TMDB_API_KEY</code> al archivo <code>.env</code> y reinicia el servidor.
        </p>
      </div>
    `);else{i.innerHTML=String(ot(8));try{let{results:e}=await Fe(r,{signal:n});if(n.aborted)return;if(e.length===0){i.innerHTML=String(a`
        <div class="state">
          <span class="state__icon">${_(`search`)}</span>
          <h2>Nada que proyectar</h2>
          <p>No encontramos coincidencias para «${r}».</p>
        </div>
      `);return}i.replaceChildren(it(e,{signal:n}))}catch(e){if(e?.kind===`abort`||n.aborted)return;i.innerHTML=String(a`
      <div class="state state--error">
        <span class="state__icon">${_(`film`)}</span>
        <h2>La búsqueda no llegó a puerto</h2>
        <p>No pudimos consultar TMDB. Comprueba tu conexión y vuelve a intentarlo.</p>
      </div>
    `)}}}he();var Q=document.getElementById(`main`);_e(document.getElementById(`site-header`));var yt=[{pattern:/^\/$/,view:ht},{pattern:/^\/search$/,view:vt,headerSearch:!0},{pattern:/^\/movie\/(\d+)$/,view:rt,headerSearch:!0},{pattern:/^\/favorites$/,view:ct,headerSearch:!0}],$=new AbortController,bt=0,xt=!0;function St(){return a`
    <section class="page container" aria-labelledby="not-found-title">
      <p class="eyebrow">Fuera de plano</p>
      <h1 class="page__title" id="not-found-title">Esta página no existe</h1>
      <p class="page__lead">
        El enlace que has seguido no forma parte del archivo. Vuelve a la cartelera para seguir
        explorando secretos de rodaje.
      </p>
      <p class="page__lead">
        <a class="btn btn--gold" href="#/">Volver a la cartelera</a>
      </p>
    </section>
  `}function Ct(){let e=Q.querySelector(`h1`);e&&(e.tabIndex=-1,e.focus({preventScroll:!0}))}async function wt(e,t){let n=++bt;$.abort(),$=new AbortController;let r=yt.map(t=>({definition:t,found:e.path.match(t.pattern)})).find(e=>e.found);ge(!!r?.definition.headerSearch),window.scrollTo({top:0,left:0,behavior:`instant`}),Q.setAttribute(`aria-busy`,`true`);try{r?await r.definition.view({outlet:Q,params:r.found.slice(1),query:e.query,state:t,signal:$.signal}):(await p(Q,St()),document.title=`Página no encontrada — Secretos de claqueta`)}catch(e){e?.kind!==`abort`&&console.error(e)}finally{n===bt&&(Q.removeAttribute(`aria-busy`),xt||Ct(),xt=!1)}}document.addEventListener(`click`,e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let t=e.target.closest(`a[href^="#/"]`);if(!t)return;let n=t.getAttribute(`href`);if(!n)return;if(n===window.location.hash){e.preventDefault();return}e.preventDefault();let r=n.slice(1),i=t.querySelector(`img[data-poster]`),a=i?{posterSrc:i.currentSrc||i.src,title:t.querySelector(`.movie-card__title`)?.textContent?.trim()??``}:null;i&&r.startsWith(`/movie/`)?m(i,()=>x(r,{state:a})):x(r,{state:a})}),ae({render:wt});