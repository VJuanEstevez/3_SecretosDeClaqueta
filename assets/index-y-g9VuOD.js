(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{#e;constructor(e){this.#e=String(e)}toString(){return this.#e}},t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};function n(e){return String(e).replace(/[&<>"']/g,e=>t[e])}function r(t){return new e(t)}function i(t){return t==null||t===!1?``:Array.isArray(t)?t.map(i).join(``):t instanceof e?t.toString():n(t)}function a(e,...t){let n=``;return e.forEach((e,r)=>{n+=e,r<t.length&&(n+=i(t[r]))}),r(n)}function o(e){let t=document.createElement(`template`);return t.innerHTML=String(e).trim(),t.content.firstElementChild}var s=null;function c(e){s??=document.getElementById(`live-region`),s&&(s.textContent=``,requestAnimationFrame(()=>{s.textContent=e}))}function l(){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}var u=`movie-poster`,d=`cubic-bezier(0.22, 1, 0.36, 1)`;function f(e,t){!e||l()?t():typeof document.startViewTransition==`function`?(e.style.viewTransitionName=u,document.startViewTransition(()=>{t();let e=document.querySelector(`[data-poster-transition]`);e&&(e.style.viewTransitionName=u)}).finished.catch(()=>{}).finally(()=>{e.style.viewTransitionName=``,document.querySelector(`[data-poster-transition]`)?.style.removeProperty(`view-transition-name`)})):p(e,t)}function p(e,t){let n=e.getBoundingClientRect(),r=getComputedStyle(e).borderRadius,i=e.cloneNode(!0);i.removeAttribute(`data-poster`),i.removeAttribute(`style`),i.setAttribute(`aria-hidden`,`true`),i.style.cssText=[`position: fixed`,`top: ${n.top}px`,`left: ${n.left}px`,`width: ${n.width}px`,`height: ${n.height}px`,`margin: 0`,`object-fit: cover`,`border-radius: ${r}`,`z-index: 120`,`pointer-events: none`].join(`;`),document.body.append(i),t();let a=document.querySelector(`[data-poster-transition]`);if(!a){i.remove();return}let o=a.getBoundingClientRect(),s=a.closest(`.detail__poster-frame`),c=s?getComputedStyle(s).borderRadius:getComputedStyle(a).borderRadius;a.style.visibility=`hidden`,i.animate([{top:`${n.top}px`,left:`${n.left}px`,width:`${n.width}px`,height:`${n.height}px`,borderRadius:r},{top:`${o.top}px`,left:`${o.left}px`,width:`${o.width}px`,height:`${o.height}px`,borderRadius:c}],{duration:520,easing:d,fill:`forwards`}).finished.catch(()=>{}).finally(()=>{i.remove(),a.style.visibility=``})}var m={clapper:`
    <rect x="4.8" y="11.3" width="15.6" height="8.2" rx="1.4" />
    <path d="M5.2 11.3 20.5 7.5V4.6L5.2 8.4Z" />
    <path d="m8.2 10.5 1.6-3.2M12.1 9.5l1.6-3.2M16 8.5l1.6-3.2" />
    <path d="M8 14.6h8.8M8 17.1h5.2" />
    <circle cx="4.1" cy="11.3" r=".8" fill="currentColor" stroke="none" />
  `,heart:`<path d="M12 20.4S4.6 16.1 4.6 11.2A4.05 4.05 0 0 1 12 8.2a4.05 4.05 0 0 1 7.4 3c0 4.9-7.4 9.2-7.4 9.2Z" />`,star:`<path d="m12 3.7 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8Z" />`,search:`<circle cx="11" cy="11" r="6.4" /><path d="m15.9 15.9 4.4 4.4" />`,arrowLeft:`<path d="M19 12H5" /><path d="m11 18-6-6 6-6" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,close:`<path d="m6 6 12 12M18 6 6 18" />`,calendar:`<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3.5V7M16 3.5V7" />`,clock:`<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />`,user:`<circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />`,film:`<rect x="3" y="4.5" width="18" height="15" rx="2" /><path d="M8 4.5v15M16 4.5v15M3 9.5h5M3 14.5h5M16 9.5h5M16 14.5h5" />`,sparkle:`<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" />`,pause:`<path d="M9.2 5.5v13M14.8 5.5v13" stroke-width="2.2" />`,play:`<path d="M8.6 5.8v12.4L18.4 12 8.6 5.8Z" />`,sun:`<circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.3M12 18.9v2.3M4.5 4.5l1.6 1.6M17.9 17.9l1.6 1.6M2.8 12h2.3M18.9 12h2.3M4.5 19.5l1.6-1.6M17.9 6.1l1.6-1.6" />`,moon:`<path d="M20.4 14.7A8.7 8.7 0 0 1 9.3 3.6 8.7 8.7 0 1 0 20.4 14.7Z" />`};function h(e,{className:t=`icon`,strokeWidth:n=1.7}={}){return r(`<svg class="${t}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="${n}" stroke-linecap="round" stroke-linejoin="round">${m[e]??``}</svg>`)}function g(e){let t=Number(e);return!Number.isFinite(t)||t<=0?`—`:t.toLocaleString(`es-ES`,{minimumFractionDigits:1,maximumFractionDigits:1})}function _(e){let t=String(e??``).slice(0,4);return/^\d{4}$/.test(t)?t:`—`}function v(e){let t=Number(e);if(!Number.isFinite(t)||t<=0)return``;let n=Math.floor(t/60),r=t%60;return n?r?`${n} h ${r} min`:`${n} h`:`${r} min`}function y(e,t,n){return`${e} ${e===1?t:n}`}function b(e){return String(e).padStart(2,`0`)}var x=null,S=``;function C(){let e=window.location.hash.replace(/^#/,``)||`/`,[t,n=``]=e.split(`?`);return{path:t.startsWith(`/`)?t:`/${t}`,query:new URLSearchParams(n),raw:e}}function w({render:e}){x=e;let t=e=>{let t=C();t.raw!==S&&(S=t.raw,x(t,e??null))};window.addEventListener(`popstate`,e=>{t(e.state?.routeState??null)}),window.addEventListener(`hashchange`,()=>{t(null)});let n=C();S=n.raw,x(n,null)}function T(e,{state:t=null,replace:n=!1}={}){let r=e.startsWith(`#`)?e.slice(1):e;return n?window.history.replaceState({routeState:t},``,`#${r}`):window.history.pushState({routeState:t},``,`#${r}`),S=r,x(C(),t)}function E(e){let t=e.startsWith(`#`)?e.slice(1):e;window.history.replaceState({routeState:null},``,`#${t}`),S=t}var D=`sdc:favorites`,O=new Set;function k(){try{let e=JSON.parse(window.localStorage.getItem(D)??`[]`);return Array.isArray(e)?e.filter(e=>e&&Number.isFinite(Number(e.id))).map(e=>({id:Number(e.id),title:String(e.title??`Título desconocido`),posterPath:e.posterPath??null,backdropPath:e.backdropPath??null,releaseDate:String(e.releaseDate??``),year:String(e.year??`—`),rating:Number(e.rating??0),overview:String(e.overview??``)})):[]}catch{return[]}}var A=k();function ee(){try{window.localStorage.setItem(D,JSON.stringify(A))}catch{}}function te(){O.forEach(e=>e(A))}function ne(e){return{id:Number(e.id),title:String(e.title??`Título desconocido`),posterPath:e.posterPath??null,backdropPath:e.backdropPath??null,releaseDate:String(e.releaseDate??``),year:String(e.year??`—`),rating:Number(e.rating??0),overview:String(e.overview??``)}}function re(){return[...A]}function ie(){return A.length}function j(e){return A.some(t=>t.id===Number(e))}function M(e){let t=Number(e.id),n=j(t);return A=n?A.filter(e=>e.id!==t):[ne(e),...A],ee(),te(),!n}function N(e){return O.add(e),()=>O.delete(e)}window.addEventListener(`storage`,e=>{e.key===D&&(A=k(),te())});var P=`sdc:theme`,ae={dark:`#08080c`,light:`#f6f3ea`},F=new Set;function oe(){try{return window.localStorage.getItem(P)===`light`?`light`:`dark`}catch{return`dark`}}var I=oe();function L(){document.documentElement.dataset.theme=I;let e=document.querySelector(`meta[name="theme-color"]`);e&&e.setAttribute(`content`,ae[I])}function se(){F.forEach(e=>e(I))}function ce(){return I}function le(e){if(e===`dark`||e===`light`){I=e;try{window.localStorage.setItem(P,I)}catch{}L(),se()}}function ue(){le(I===`dark`?`light`:`dark`)}function de(e){return F.add(e),()=>F.delete(e)}function fe(){L()}window.addEventListener(`storage`,e=>{e.key===P&&(I=oe(),L(),se())});var R=null;function pe(e){R&&(R.hidden=!e)}function me(e){e.append(o(a`
      <div class="site-header__inner container">
        <a class="brand" href="#/" aria-label="Secretos de claqueta — Inicio">
          <span class="brand__mark">
            ${h(`clapper`,{className:`brand__mark-icon`,strokeWidth:1})}
          </span>
          <span class="brand__text">
            <span class="brand__name">Secretos</span>
            <span class="brand__sub">de claqueta</span>
          </span>
        </a>

        <search class="site-header__search" data-header-search hidden>
          <form class="search search--compact" data-header-search-form>
            <label class="visually-hidden" for="header-search">Buscar películas</label>
            <span class="search__icon">${h(`search`)}</span>
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
            <button class="search__submit" type="submit">Buscar</button>
          </form>
        </search>

        <div class="header-actions">
          <button class="theme-toggle" type="button" data-theme-toggle>
            <span class="theme-toggle__icon" data-theme-icon="dark">${h(`sun`)}</span>
            <span class="theme-toggle__icon" data-theme-icon="light" hidden>${h(`moon`)}</span>
            <span class="visually-hidden" data-theme-label></span>
          </button>

          <a class="favorites-link" href="#/favorites" data-favorites-link>
            ${h(`heart`)}
            <span class="favorites-link__label">Favoritos</span>
            <span class="favorites-link__count" data-favorites-count hidden>0</span>
          </a>
        </div>
      </div>
    `)),R=e.querySelector(`[data-header-search]`);let t=e.querySelector(`[data-header-search-form]`),n=t?.elements.namedItem(`q`);t?.addEventListener(`submit`,e=>{e.preventDefault();let t=n?.value.trim()??``;t&&T(`#/?q=${encodeURIComponent(t)}`)});let r=e.querySelector(`[data-favorites-link]`),i=e.querySelector(`[data-favorites-count]`),s=()=>{let e=ie();i&&(i.textContent=String(e),i.hidden=e===0),r&&(r.dataset.active=String(e>0),r.setAttribute(`aria-label`,e===0?`Favoritos`:`Favoritos, ${y(e,`película guardada`,`películas guardadas`)}`))};s(),N(s);let l=e.querySelector(`[data-theme-toggle]`),u=l?.querySelector(`[data-theme-label]`),d=l?.querySelector(`[data-theme-icon="dark"]`),f=l?.querySelector(`[data-theme-icon="light"]`),p=()=>{let e=ce()===`dark`;d&&(d.hidden=!e),f&&(f.hidden=e),u&&(u.textContent=e?`Cambiar a tema claro`:`Cambiar a tema oscuro`)};l?.addEventListener(`click`,()=>{ue(),c(ce()===`dark`?`Tema oscuro activado.`:`Tema claro activado.`)}),p(),de(p);let m=()=>{e.classList.toggle(`is-scrolled`,window.scrollY>8)};m(),window.addEventListener(`scroll`,m,{passive:!0})}function he(...e){let t=e.filter(Boolean);if(t.length===0)return;if(t.length===1)return t[0];if(typeof AbortSignal.any==`function`)return AbortSignal.any(t);let n=new AbortController;return t.forEach(e=>{e.aborted?n.abort(e.reason):e.addEventListener(`abort`,()=>n.abort(e.reason),{once:!0})}),n.signal}var ge=`https://api.themoviedb.org/3`,z=`https://image.tmdb.org/t/p`,_e=`611d10a450514ccf8e09857f609f36d1`,ve=`/3_SecretosDeClaqueta/poster-placeholder.svg`,ye=3e5,be=50,B=new Map,V=_e.length>0,H=ve,U=class extends Error{constructor(e,{kind:t=`request`,status:n=0,cause:r}={}){super(e,{cause:r}),this.name=`TmdbError`,this.kind=t,this.status=n}};function xe(e=12e3){return typeof AbortSignal.timeout==`function`?AbortSignal.timeout(e):void 0}function Se(e,t){if(B.size>=be){let e=B.keys().next().value;B.delete(e)}B.set(e,{savedAt:Date.now(),data:t})}async function W(e,{params:t={},signal:n}={}){if(!V)throw new U(`Falta configurar la clave de TMDB.`,{kind:`config`});let r=new URL(`${ge}${e}`);r.searchParams.set(`language`,`es-ES`),r.searchParams.set(`api_key`,_e),Object.entries(t).forEach(([e,t])=>{t!=null&&t!==``&&r.searchParams.set(e,t)});let i=r.toString(),a=B.get(i);if(a&&Date.now()-a.savedAt<ye)return a.data;try{let e=await fetch(r,{signal:he(n,xe()),headers:{accept:`application/json`}});if(!e.ok)throw new U(`TMDB respondió con el estado ${e.status}.`,{kind:`http`,status:e.status});let t=await e.json();return Se(i,t),t}catch(e){throw e instanceof U?e:e?.name===`AbortError`?new U(`La solicitud se canceló.`,{kind:`abort`,cause:e}):new U(`No pudimos conectar con TMDB.`,{kind:`network`,cause:e})}}function G(e){return{id:Number(e.id),title:e.title||e.name||`Título desconocido`,originalTitle:e.original_title||e.title||``,posterPath:e.poster_path??null,backdropPath:e.backdrop_path??null,releaseDate:e.release_date??``,year:_(e.release_date),rating:Number(e.vote_average??0),voteCount:Number(e.vote_count??0),overview:e.overview??``}}function Ce(e){return{...G(e),runtime:Number(e.runtime??0),tagline:e.tagline??``,genres:Array.isArray(e.genres)?e.genres.map(e=>e.name):[],originalLanguage:e.original_language??``}}function we(e){return(Array.isArray(e)?e:[]).slice(0,12).map(e=>({id:Number(e.id),name:e.name??``,character:e.character??``,profilePath:e.profile_path??null}))}function K(e,t=`w500`){return e?`${z}/${t}${e}`:ve}function Te(e,t=`w1280`){return e?`${z}/${t}${e}`:null}function Ee(e,t=`w185`){return e?`${z}/${t}${e}`:null}async function De({signal:e}={}){return((await W(`/trending/movie/week`,{signal:e})).results??[]).map(G).filter(e=>e.title)}async function Oe(e,{signal:t,page:n=1}={}){let r=await W(`/search/movie`,{params:{query:e,include_adult:`false`,page:n},signal:t});return{results:(r.results??[]).map(G).filter(e=>e.title),total:Number(r.total_results??0)}}async function ke(e,{signal:t}={}){let[n,r]=await Promise.all([W(`/movie/${e}`,{signal:t}),W(`/movie/${e}/credits`,{signal:t}).catch(e=>{if(e?.kind===`abort`)throw e;return{cast:[],crew:[]}})]),i=(r.crew??[]).find(e=>e.job===`Director`);return{movie:Ce(n),cast:we(r.cast),director:i?.name??null}}var Ae={before:`Antes del rodaje`,during:`Durante el rodaje`,after:`Después del estreno`},je={27205:[{phase:`before`,title:`La idea esperó casi una década`,text:`Christopher Nolan concibió el germen de Inception antes de rodar Batman Begins. Warner lo aprobó como proyecto propio solo después del éxito de El caballero oscuro.`},{phase:`during`,title:`El pasillo giratorio existía de verdad`,text:`Se construyó un corredor de más de treinta metros que rotaba sobre sí mismo. Joseph Gordon-Levitt se entrenó durante semanas para rodar las peleas dentro de él.`},{phase:`during`,title:`El vagón invadió una calle real`,text:`La secuencia del tren se rodó con una locomotora y un vagón colocados en plena calle de Los Ángeles, sin recurrir a un decorado digital.`},{phase:`after`,title:`La peonza nunca se ve caer`,text:`El montaje corta justo antes de revelar si el objeto se tambalea. Michael Caine defendió durante años su propia lectura del final, alimentando el debate.`},{phase:`after`,title:`Se convirtió en la original más taquillera de Nolan`,text:`Con unos 160 millones de presupuesto, superó los 830 millones de recaudación. Durante más de una década fue su película no franquiciada con mayor éxito.`}],238:[{phase:`before`,title:`El estudio no quería a Al Pacino`,text:`Paramount prefería nombres más comerciales para Michael Corleone. Coppola insistió hasta imponer a Pacino, que estuvo a punto de abandonar el proyecto.`},{phase:`before`,title:`Marlon Brando se fabricó su propio personaje`,text:`Se presentó a la prueba con algodón en la boca y el pelo engominado. La transformación convenció al estudio de que Vito Corleone era posible.`},{phase:`during`,title:`El gato del despacho fue un hallazgo`,text:`Un gato callejero se coló en el decorado y se quedó acurrucado en el regazo de Brando. Coppola decidió dejarlo en el plano.`},{phase:`during`,title:`La boda se rodó con cinco cámaras`,text:`La secuencia inicial movilizó a cientos de extras y varias cámaras simultáneas. El material resultante se convirtió en una lección de montaje paralelo.`},{phase:`after`,title:`Salvó a un estudio y cambió el cine de gánsteres`,text:`Paramount atravesaba dificultades cuando la película arrasó en taquilla. Ganó tres premios Oscar y redefinió el género para siempre.`}],680:[{phase:`before`,title:`El maletín brillante escondía una bombilla`,text:`El famoso resplandor no era un efecto digital: dentro del maletín se colocó una luz y unos reflectores para crear el enigma.`},{phase:`before`,title:`Los actores no ensayaron el baile`,text:`Tarantino les pidió que improvisaran el twist en el restaurante. La toma que llegó al montaje conserva esa energía de primera vez.`},{phase:`during`,title:`Todo se rodó en cincuenta días`,text:`El presupuesto rondaba los ocho millones de dólares. El equipo trabajó a contrarreloj en localizaciones reales de Los Ángeles.`},{phase:`during`,title:`El reloj de oro era una pieza de atrezo muy personal`,text:`Tarantino escribió el monólogo del reloj pensando en el valor de los objetos heredados. La pieza se convirtió en uno de los símbolos de la película.`},{phase:`after`,title:`Resucitó una carrera y ganó el Oscar al guion`,text:`El papel de Vincent Vega devolvió a John Travolta al primer plano. La película se llevó la estatuilla al mejor guion original.`}],550:[{phase:`before`,title:`Los dos protagonistas eligieron su lado`,text:`Brad Pitt y Edward Norton se reunieron con David Fincher y decidieron intercambiar los papeles que el estudio tenía en mente. El resto encajó solo.`},{phase:`before`,title:`El jabón se fabricó de verdad`,text:`El departamento de arte preparó lotes reales siguiendo una receta artesanal. Las barras que aparecen en pantalla son piezas físicas, no réplicas de utilería.`},{phase:`during`,title:`La escalera se rodó sin dobles`,text:`La pelea del sótano se coreografió durante días y se filmó con los actores al completo. Fincher buscaba que los golpes sonaran secos y creíbles.`},{phase:`after`,title:`El estreno llegó en un momento delicado`,text:`La promoción se topó con la matanza de Columbine y el estudio moderó la campaña. Aun así, la película encontró su público con el tiempo.`},{phase:`after`,title:`De fracaso a clásico de culto`,text:`En cines pasó sin hacer ruido, pero el DVD la convirtió en un fenómeno generacional. Hoy es una de las películas más citadas de su época.`}],157336:[{phase:`before`,title:`El proyecto nació para otro director`,text:`Jonathan Nolan desarrolló la historia con Steven Spielberg. Cuando Spielberg se marchó, Christopher asumió la dirección y reescribió el guion.`},{phase:`before`,title:`La ciencia fue consultada desde el primer borrador`,text:`Kip Thorne asesoró al equipo durante años. Las ecuaciones del agujero negro acabaron generando una publicación científica real.`},{phase:`during`,title:`El llanto de Cooper fue real`,text:`Matthew McConaughey pidió no ver los mensajes de sus hijos antes de rodar la escena. Su reacción ante la pantalla se grabó a la primera.`},{phase:`during`,title:`La biblioteca era un decorado gigantesco`,text:`Se construyeron estanterías a escala real para la secuencia del teseracto. Los libros se colocaron a mano para que la cámara pudiera atravesarlas.`},{phase:`after`,title:`El estreno apostó por el formato grande`,text:`La película se proyectó en 70 mm e IMAX en salas seleccionadas. Ganó el Oscar a los mejores efectos visuales.`}],496243:[{phase:`before`,title:`La semilla fue una anécdota de clases particulares`,text:`Bong Joon-ho se inspiró en la experiencia de un amigo que daba tutorías a familias adineradas. La idea creció durante años antes de convertirse en guion.`},{phase:`before`,title:`La casa se diseñó como un decorado completo`,text:`La vivienda principal se construyó a escala real, con la planta baja y el sótano en sets separados. Cada ventana se colocó pensando en la cámara.`},{phase:`during`,title:`La inundación se rodó en un tanque`,text:`Para la escena del sótano anegado se construyó un gran tanque de agua. El equipo ensayó la coreografía con los actores antes de abrir las compuertas.`},{phase:`after`,title:`Hizo historia en los Oscar`,text:`Fue la primera película de habla no inglesa en ganar el premio a mejor película. También se llevó dirección, guion original y película internacional.`},{phase:`after`,title:`El equipo celebró hasta el amanecer`,text:`Tras la ceremonia, el reparto y Bong Joon-ho improvisaron una fiesta que se alargó durante horas. Las fotos de esa noche dieron la vuelta al mundo.`}],155:[{phase:`before`,title:`Ledger se encerró con el personaje`,text:`Heath Ledger pasó semanas aislado construyendo la voz y la risa del Joker. Llenó un cuaderno con ideas que luego llevó directamente al set.`},{phase:`before`,title:`El camión volcado no era digital`,text:`Para la persecución se utilizó un cañón de nitrógeno que volteó el vehículo en una calle real de Chicago. La toma se repitió hasta dar con el ángulo exacto.`},{phase:`during`,title:`El hospital era una fábrica abandonada`,text:`La explosión de la escena final se rodó en una antigua fábrica que después fue demolida. El equipo aprovechó la estructura real para el derrumbe.`},{phase:`after`,title:`El Oscar póstumo llegó a su familia`,text:`Ledger recibió la estatuilla a mejor actor de reparto. Sus padres y su hermana recogieron el premio en nombre del intérprete.`},{phase:`after`,title:`La campaña viral cambió el marketing`,text:`Los carteles de «Why so serious?» y los sitios falsos convirtieron la promoción en un juego. Muchas campañas posteriores copiaron la fórmula.`}],603:[{phase:`before`,title:`El proyecto se presentó con un cómic de tres páginas`,text:`Los Wachowski convencieron al estudio con un cómic que resumía el mundo de la película. El guion completo llegó después para cerrar el acuerdo.`},{phase:`before`,title:`Cuatro meses de artes marciales`,text:`El reparto se sometió a un entrenamiento intensivo con Yuen Woo-ping. Keanu Reeves llegó al rodaje con una preparación física completamente distinta.`},{phase:`during`,title:`El bullet time usó más de cien cámaras`,text:`Las cámaras se distribuyeron en un arco alrededor de la acción y se dispararon de forma sincronizada. El efecto se completó después con posproducción.`},{phase:`during`,title:`El verde del mundo digital se añadió después`,text:`Durante el rodaje no había dominante verde: se aplicó en el etalonaje. Esa decisión permitió separar con claridad los dos niveles de realidad.`},{phase:`after`,title:`El secreto fue parte de la campaña`,text:`El marketing ocultó deliberadamente la trama y jugó con la confusión del público. La película superó los 460 millones de dólares en todo el mundo.`}],129:[{phase:`before`,title:`La historia nació para una niña de diez años`,text:`Miyazaki escribió el relato pensando en la hija de un amigo. Quería hacer una película que ella pudiera entender sin explicaciones.`},{phase:`before`,title:`El mundo se inspiró en lugares reales`,text:`La casa de baños tomó referencias de los baños de Dogo Onsen y del barrio de Jiufen. El equipo viajó para estudiar la arquitectura y la luz.`},{phase:`during`,title:`Casi todo se dibujó a mano`,text:`El estudio produjo decenas de miles de fotogramas tradicionales. La animación digital se reservó para momentos muy concretos.`},{phase:`after`,title:`Rompió la barrera del Oscar`,text:`Fue la primera película no anglosajona en ganar el premio a mejor película animada. El reconocimiento abrió puertas al anime en Occidente.`},{phase:`after`,title:`El mundo volvió a existir fuera de la pantalla`,text:`Años después, el parque de Ghibli recreó algunos de sus escenarios. Miyazaki siempre rechazó la idea de una secuela directa.`}],105:[{phase:`before`,title:`Marty tuvo dos actores antes que Fox`,text:`Eric Stoltz rodó varias semanas en el papel antes de ser sustituido. Michael J. Fox compaginó el rodaje con su serie de televisión.`},{phase:`before`,title:`El DeLorean parecía un platillo volante`,text:`Se eligió el coche por su diseño futurista y su precio asequible. El alerón y los cables completaron la ilusión de máquina del tiempo.`},{phase:`during`,title:`Fox dormía apenas tres horas`,text:`Rodaba la película de noche y la serie de día. El agotamiento se nota en algunas tomas que el equipo decidió conservar.`},{phase:`during`,title:`El cartel del centro comercial cambia`,text:`El nombre del lugar muta después del primer viaje al pasado. Es uno de los detalles más buscados por los seguidores de la trilogía.`},{phase:`after`,title:`Se convirtió en la película del año`,text:`Fue el estreno más taquillero de 1985 y dio pie a dos secuelas. El reloj del ayuntamiento y el monopatín siguen siendo iconos pop.`}],329:[{phase:`before`,title:`Spielberg compró los derechos antes del estreno literario`,text:`La novela de Michael Crichton llegó a las librerías con la película ya en marcha. El autor participó en el guion y en el diseño de los dinosaurios.`},{phase:`before`,title:`El T-Rex era una máquina de seis toneladas`,text:`El animatrónico medía doce metros y se movía con sistemas hidráulicos. En los días de lluvia el equipo tenía que protegerlo como si fuera un edificio.`},{phase:`during`,title:`El vaso de agua temblaba con una cuerda`,text:`Bajo el asiento del Jeep se tensó una cuerda de guitarra para provocar la vibración. El efecto se sincronizó con los pasos del dinosaurio.`},{phase:`during`,title:`El rugido mezcla varios animales`,text:`Se combinaron grabaciones de un bebé elefante, un cocodrilo y un tigre. El resultado se procesó hasta sonar imposible de identificar.`},{phase:`after`,title:`Cambió los efectos visuales para siempre`,text:`La película demostró que el CGI podía sostener una superproducción. Recaudó más de mil millones de dólares y relanzó el interés por los dinosaurios.`}],1417:[{phase:`before`,title:`El guion nació junto a otra película`,text:`Guillermo del Toro escribió El laberinto del fauno como complemento de El espinazo del diablo. Quería explorar la guerra desde la mirada de una niña.`},{phase:`before`,title:`El fauno exigía cinco horas de maquillaje`,text:`Doug Jones actuó con prótesis que limitaban su visión periférica. Aprendió a moverse en el set guiado por marcas y por la voz del equipo.`},{phase:`during`,title:`El banquete se rodó como una pesadilla real`,text:`La mesa del monstruo pálido se construyó en un set enorme. Del Toro buscaba que el espectador sintiera hambre y asco al mismo tiempo.`},{phase:`after`,title:`Tres Oscar para una película de fantasía`,text:`Ganó fotografía, dirección artística y maquillaje. El reconocimiento consolidó la carrera internacional de del Toro.`},{phase:`after`,title:`El cuaderno original sigue guardado`,text:`El director conserva los bocetos con los que imaginó el fauno y el monstruo pálido. Muchos diseños cambiaron muy poco hasta el rodaje.`}]},Me=[`before`,`during`,`during`,`after`,`after`],Ne={before:[e=>`${e.title} pasó por varias versiones antes de llegar al set. ${e.director} y el equipo reescribieron el arranque hasta encontrar el tono definitivo.`,e=>`La primera idea de ${e.title} era bastante distinta: se barajaron otro reparto y otro desenlace. Lo que hoy vemos nació de descartar la opción más obvia.`,e=>`El rodaje estuvo a punto de no ocurrir. La producción se retrasó varios meses mientras se cerraban el presupuesto y el calendario de ${e.director}.`],during:[e=>`Una de las tomas más recordadas de ${e.title} no estaba en el guion. El equipo la improvisó en el set y acabó entrando en el montaje final.`,e=>`Se levantó un decorado a escala real para una sola secuencia. Después de ${e.year}, ese espacio se convirtió en leyenda entre los técnicos.`,e=>`El equipo rodó más material del previsto y usó dos cámaras en varias escenas. Algunas reacciones espontáneas terminaron siendo esenciales.`,e=>`Los actores ensayaron durante semanas antes de la primera claqueta. Parte de esa preparación se coló en el guion como gestos y silencios.`],after:[e=>`Tras el estreno, ${e.title} cambió la forma de promocionar las películas del género. El boca a boca hizo el resto.`,e=>`El montaje final dejó fuera secuencias que hoy se consideran piezas perdidas. Algunos fragmentos aparecieron años después en material de archivo.`,e=>`En la temporada de premios de ${e.year}, la película sumó más nominaciones de las esperadas. La campaña empezó discreta y terminó dominando la conversación.`,e=>`Con el tiempo se convirtió en una película de revisión obligada. Sus detalles escondidos alimentan teorías de los espectadores desde el estreno.`]};function Pe(e,t){return{title:e.title,year:e.year,director:t||`el equipo de dirección`}}function Fe(e,t){let n=Pe(e,t),r=Number(e.id)||0;return Me.map((e,t)=>{let i=Ne[e],a=i[(r+t*7)%i.length];return{phase:e,title:Ie(e,t,n),text:a(n)}})}function Ie(e,t,n){return e===`before`?t===0?`Un proyecto que cambió de forma`:`El rodaje que casi no sucede`:e===`during`?t===1?`La toma que nadie había planeado`:`Un decorado para la historia`:t===3?`Lo que el estreno dejó atrás`:`El legado de ${n.title}`}function Le(e,{director:t=null}={}){let n=je[Number(e.id)];return Array.isArray(n)?n:Fe(e,t)}function Re(e){return e.length===0?a`<p class="detail-section__note">No hay información de reparto disponible.</p>`:a`
    <ul class="cast">
      ${e.map(e=>{let t=e.name.split(/\s+/).slice(0,2).map(e=>e.charAt(0)).join(``).toUpperCase();return a`
          <li class="cast__item">
            ${e.profilePath?a`<img
                  class="cast__avatar"
                  src="${Ee(e.profilePath)}"
                  alt=""
                  width="185"
                  height="185"
                  loading="lazy"
                  decoding="async"
                />`:a`<span class="cast__avatar cast__avatar--initials" aria-hidden="true">${t}</span>`}
            <p class="cast__name">${e.name}</p>
            ${e.character?a`<p class="cast__role">${e.character}</p>`:``}
          </li>
        `})}
    </ul>
  `}function ze(e){return a`
    <ol class="secrets">
      ${e.map((e,t)=>a`
          <li class="secret">
            <span class="secret__index" aria-hidden="true">${b(t+1)}</span>
            <div class="secret__content">
              <span class="secret__phase" data-phase="${e.phase}">
                ${Ae[e.phase]??`Rodaje`}
              </span>
              <h3 class="secret__title">${e.title}</h3>
              <p class="secret__text">${e.text}</p>
            </div>
          </li>
        `)}
    </ol>
  `}function Be(e,t,n){let r=Le(e,{director:n}),i=v(e.runtime);return a`
    <article class="detail">
      <div class="detail__backdrop" data-detail-backdrop aria-hidden="true"></div>
      <div class="container detail__inner">
        <div class="detail__hero">
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${K(e.posterPath,`w780`)}"
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
                ${h(`calendar`)}
                <span>${e.year}</span>
              </li>
              ${i?a`<li class="detail__meta-item">${h(`clock`)}<span>${i}</span></li>`:``}
              <li class="detail__meta-item">
                ${h(`star`)}
                <span>${g(e.rating)}</span>
                <span class="visually-hidden">sobre 10</span>
              </li>
              ${n?a`<li class="detail__meta-item">${h(`user`)}<span>${n}</span></li>`:``}
              ${e.genres.length?a`<li class="detail__meta-item"><span class="detail-section__note">${e.genres.join(` · `)}</span></li>`:``}
              <li class="detail__meta-item detail__meta-item--action">
                <button class="fav-button" type="button" data-detail-favorite>
                  ${h(`heart`)}
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
            <p class="detail-section__note">${t.length?y(t.length,`intérprete`,`intérpretes`):`Sin datos de reparto`}</p>
          </div>
          ${Re(t)}
        </section>

        <section class="detail-section" aria-labelledby="secrets-title">
          <div class="detail-section__head">
            <div>
              <h2 id="secrets-title">Secretos de rodaje</h2>
            </div>
            <p class="detail-section__note">Contenido de archivo recreado para esta demostración.</p>
          </div>
          ${ze(r)}
        </section>

        <a class="detail__back detail__back--end" href="#/">
          ${h(`arrowLeft`)}
          Volver a la cartelera
        </a>
      </div>
    </article>
  `}function Ve({posterSrc:e,title:t}){return a`
    <article class="detail">
      <div class="detail__backdrop" data-detail-backdrop aria-hidden="true"></div>
      <div class="container detail__inner">
        <div class="detail__hero">
          <div class="detail__poster-frame">
            <img
              class="detail__poster"
              data-poster-transition
              src="${e??`/3_SecretosDeClaqueta/poster-placeholder.svg`}"
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

        <a class="detail__back detail__back--end" href="#/">
          ${h(`arrowLeft`)}
          Volver a la cartelera
        </a>
      </div>
    </article>
  `}function He(e){let t=e?.kind===`config`,n=e?.kind===`http`&&e.status===404,r=t?`Falta la clave de TMDB`:n?`Esa película no está en el archivo`:`No pudimos abrir la ficha`,i=t?`Añade VITE_TMDB_API_KEY a tu archivo .env y reinicia el servidor para cargar los detalles.`:n?`Puede que el enlace esté mal escrito o que TMDB ya no tenga esa referencia.`:`Comprueba tu conexión y vuelve a intentarlo desde la cartelera.`;return a`
    <section class="page container" aria-labelledby="detail-error-title">
      <div class="state state--error">
        <span class="state__icon">${h(`film`)}</span>
        <h1 id="detail-error-title">${r}</h1>
        <p>${i}</p>
        <a class="btn btn--ghost" href="#/">Explorar tendencias</a>
      </div>
      <a class="detail__back detail__back--end" href="#/">${h(`arrowLeft`)} Volver a la cartelera</a>
    </section>
  `}var q=new Map,Ue=30;function We(e,t){q.size>=Ue&&q.delete(q.keys().next().value),q.set(e,t)}function Ge(e){let t=Number(e);Number.isFinite(t)&&!q.has(t)&&ke(t).then(e=>We(t,e)).catch(()=>{})}function Ke(e,t,n){let r=e.querySelector(`[data-detail-favorite]`),i=e.querySelector(`[data-favorite-text]`);if(!r)return;let a=()=>{let e=j(t.id);r.setAttribute(`aria-pressed`,String(e)),r.setAttribute(`aria-label`,e?`Quitar ${t.title} de favoritos`:`Añadir ${t.title} a favoritos`),i&&(i.textContent=e?`En tus favoritos`:`Guardar en favoritos`)};r.addEventListener(`click`,()=>{c(M(t)?`${t.title} añadida a favoritos.`:`${t.title} eliminada de favoritos.`)},{signal:n});let o=N(a);n.addEventListener(`abort`,o,{once:!0}),a()}function qe(e,t,n){let{movie:r,cast:i,director:a}=t;e.innerHTML=String(Be(r,i,a));let o=e.querySelector(`[data-detail-backdrop]`),s=r.posterPath?K(r.posterPath,`w780`):Te(r.backdropPath,`w1280`)??`/3_SecretosDeClaqueta/poster-placeholder.svg`;o&&(o.style.backgroundImage=`url("${s}")`);let c=e.querySelector(`[data-poster-transition]`);c?.addEventListener(`error`,()=>{c.src=H},{once:!0,signal:n}),Ke(e,r,n),document.title=`${r.title} (${r.year}) — Secretos de claqueta`}async function Je({outlet:e,params:t,state:n,signal:r}){let i=Number(t[0]);if(!Number.isFinite(i)){e.innerHTML=String(He({kind:`http`,status:404})),document.title=`Película no disponible — Secretos de claqueta`;return}let a=q.get(i);if(a){qe(e,a,r);return}let o={posterSrc:n?.posterSrc??null,title:n?.title??``};e.innerHTML=String(Ve(o)),document.title=`Cargando película… — Secretos de claqueta`;try{let t=await ke(i,{signal:r});if(r.aborted)return;We(i,t),qe(e,t,r)}catch(t){if(t?.kind===`abort`||r.aborted)return;e.innerHTML=String(He(t)),document.title=`Película no disponible — Secretos de claqueta`}}function J(e,{signal:t}={}){let n=o(a`
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
            src="${K(e.posterPath)}"
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
            <span class="movie-card__dot" aria-hidden="true"></span>
            <span class="movie-card__rating">
              ${h(`star`)}
              <span class="visually-hidden">Puntuación:</span>
              ${g(e.rating)}
              <span class="visually-hidden">de 10</span>
            </span>
          </p>
        </div>
      </a>
      <button class="fav-toggle" type="button" data-favorite>
        ${h(`heart`)}
        <span class="visually-hidden" data-favorite-label></span>
      </button>
    </article>
  `),r=n.querySelector(`[data-poster]`),i=n.querySelector(`[data-favorite]`),s=n.querySelector(`[data-favorite-label]`),l=n.querySelector(`.movie-card__link`),u=()=>Ge(e.id),d=0,f=()=>{d=window.setTimeout(u,160)},p=()=>window.clearTimeout(d);l?.addEventListener(`pointerenter`,f,{signal:t}),l?.addEventListener(`pointerleave`,p,{signal:t}),l?.addEventListener(`focus`,u,{once:!0,signal:t}),t?.addEventListener(`abort`,p,{once:!0}),r.addEventListener(`error`,()=>{r.src=H},{once:!0,signal:t});function m(){let t=j(e.id);i.setAttribute(`aria-pressed`,String(t)),i.setAttribute(`aria-label`,t?`Quitar ${e.title} de favoritos`:`Añadir ${e.title} a favoritos`),s.textContent=t?`En tus favoritos`:`Añadir a favoritos`}i.addEventListener(`click`,()=>{let t=M(e);m(),i.classList.remove(`is-bumping`),i.offsetWidth,i.classList.add(`is-bumping`),c(t?`${e.title} añadida a favoritos.`:`${e.title} eliminada de favoritos.`)},{signal:t}),m();let _=N(()=>{n.isConnected?m():_()});return t?.addEventListener(`abort`,_,{once:!0}),n}function Ye(e,{signal:t}={}){let n=document.createElement(`ul`);return n.className=`movie-grid`,e.forEach((e,r)=>{let i=document.createElement(`li`);i.className=`movie-grid__item`,i.style.setProperty(`--index`,String(r)),i.append(J(e,{signal:t})),n.append(i)}),n}function Xe(){return a`
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton-card__poster"></div>
      <div class="skeleton-card__body">
        <span class="skeleton-line skeleton-line--title"></span>
        <span class="skeleton-line skeleton-line--short"></span>
      </div>
    </div>
  `}function Ze(e=8){return a`
    <ul class="movie-grid" aria-hidden="true">
      ${Array.from({length:e},()=>a`<li class="movie-grid__item">${Xe()}</li>`)}
    </ul>
  `}function Qe(){return a`
    <section class="page container" aria-labelledby="favorites-title">
      <header class="page__head">
        <h1 class="page__title" id="favorites-title">Películas guardadas</h1>
        <p class="page__lead" data-favorites-summary></p>
      </header>

      <div data-favorites-grid></div>

      <div class="empty-state" data-favorites-empty hidden>
        <span class="empty-state__heart">${h(`heart`)}</span>
        <h2>Tu lista está en blanco</h2>
        <p>
          Guarda las películas que quieras revisitar. Sus secretos de rodaje seguirán aquí
          cuando vuelvas.
        </p>
        <a class="btn btn--gold" href="#/">Explorar tendencias</a>
      </div>
    </section>
  `}function $e({outlet:e,signal:t}){e.innerHTML=String(Qe()),document.title=`Favoritos — Secretos de claqueta`,e.querySelector(`[data-favorites-summary]`);let n=e.querySelector(`[data-favorites-grid]`),r=e.querySelector(`[data-favorites-empty]`),i=()=>{let e=re(),i=document.activeElement?.closest?.(`.movie-card__link`)??null,a=i?.getAttribute(`href`)?.match(/\/movie\/(\d+)/)?.[1]??null,o=!!i;if(e.length===0)r.hidden=!1,n.replaceChildren(),o&&r.querySelector(`a`)?.focus();else if(r.hidden=!0,n.replaceChildren(Ye(e,{signal:t})),o){let e=a?n.querySelector(`a[href="#/movie/${a}"]`):null;(e?e.parentElement.querySelector(`.fav-toggle`):n.querySelector(`.fav-toggle`))?.focus()}};i();let a=N(i);t.addEventListener(`abort`,a,{once:!0})}var et=6,tt=5200,Y=0;function nt(e,t,{signal:n}={}){if(window.clearInterval(Y),Y=0,!e)return;let r=(Array.isArray(t)?t:[]).filter(e=>e.posterPath).slice(0,et);if(r.length===0)return;let i=r.map((e,t)=>{let n=document.createElement(`img`);return n.className=t===0?`hero__slide is-active`:`hero__slide`,n.src=K(e.posterPath,`w500`),n.alt=``,n.width=500,n.height=750,n.decoding=`async`,n.loading=t===0?`eager`:`lazy`,n});if(e.replaceChildren(...i),i.length<2||l())return;let a=0,o=window.setInterval(()=>{document.hidden||(i[a].classList.remove(`is-active`),a=(a+1)%i.length,i[a].classList.add(`is-active`))},tt);Y=o,n?.addEventListener(`abort`,()=>{window.clearInterval(o),Y===o&&(Y=0)},{once:!0})}var rt=4600;function it(e,{signal:t,autoplay:n=!0}={}){let r=e.querySelector(`[data-carousel-track]`),i=e.querySelector(`[data-carousel-prev]`),a=e.querySelector(`[data-carousel-next]`),o=e.querySelector(`[data-carousel-toggle]`);if(!r)return;let s=window.matchMedia(`(prefers-reduced-motion: reduce)`),c=!1,l=!1,u=()=>{let e=r.querySelector(`.carousel__item`);if(!e)return r.clientWidth*.8;let t=Number.parseFloat(getComputedStyle(r).columnGap||`16`)||16;return e.getBoundingClientRect().width+t},d=()=>{let e=r.scrollWidth-r.clientWidth;i&&(i.disabled=r.scrollLeft<=2),a&&(a.disabled=r.scrollLeft>=e-2)};if(i?.addEventListener(`click`,()=>r.scrollBy({left:-u()*2,behavior:`smooth`}),{signal:t}),a?.addEventListener(`click`,()=>r.scrollBy({left:u()*2,behavior:`smooth`}),{signal:t}),r.addEventListener(`scroll`,d,{signal:t,passive:!0}),window.addEventListener(`resize`,d,{signal:t,passive:!0}),typeof ResizeObserver==`function`){let e=new ResizeObserver(d);e.observe(r),t?.addEventListener(`abort`,()=>e.disconnect(),{once:!0})}let f=()=>{o&&(o.setAttribute(`aria-pressed`,String(l)),o.setAttribute(`aria-label`,l?`Reanudar el carrusel automático`:`Pausar el carrusel automático`),o.innerHTML=String(h(l?`play`:`pause`)))};o&&(o.hidden=s.matches,o.addEventListener(`click`,()=>{l=!l,l||(c=!1),f()},{signal:t}),f());let p=()=>{c=!0},m=()=>{c=!1};if(e.addEventListener(`pointerenter`,p,{signal:t}),e.addEventListener(`pointerleave`,m,{signal:t}),e.addEventListener(`focusin`,p,{signal:t}),e.addEventListener(`focusout`,t=>{e.contains(t.relatedTarget)||m()},{signal:t}),d(),requestAnimationFrame(d),!n||!t)return;let g=window.setInterval(()=>{if(c||l||s.matches||document.hidden)return;let e=r.scrollWidth-r.clientWidth;e<=4||(r.scrollLeft>=e-8?r.scrollTo({left:0,behavior:`smooth`}):r.scrollBy({left:u(),behavior:`smooth`}))},rt);t.addEventListener(`abort`,()=>window.clearInterval(g),{once:!0})}var X=2,at=380,ot=20;function st(){return a`
    <div class="state">
      <span class="state__icon">${h(`film`)}</span>
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
  `}function Z({title:e,text:t,retry:n=!1}){return a`
    <div class="state state--error">
      <span class="state__icon">${h(`film`)}</span>
      <h3>${e}</h3>
      <p>${t}</p>
      ${n?a`<button class="btn btn--ghost" type="button" data-retry>Reintentar</button>`:``}
    </div>
  `}function ct(e){return a`
    <div class="state">
      <span class="state__icon">${h(`search`)}</span>
      <h3>Nada que proyectar</h3>
      <p>
        No encontramos coincidencias para «${e}». Prueba con el título original, otro año o
        una palabra clave distinta.
      </p>
    </div>
  `}function lt(e){return a`
    <div class="home">
      <section class="hero container" aria-labelledby="hero-title">
        <div class="hero__slider" data-hero-slider aria-hidden="true"></div>
        <h1 class="hero__title" id="hero-title">
          Descubre los mejores secretos de <em>Hollywood</em>
        </h1>
        <p class="hero__subtitle">
          Busca tu pelicula favorita y
          descubre lo que ocurrió antes, durante y después de la claqueta.
        </p>
        <search>
          <form class="search" data-search-form>
            <label class="visually-hidden" for="movie-search">Buscar películas</label>
            <span class="search__icon">${h(`search`)}</span>
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
              ${h(`close`)}
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
            <div class="carousel-controls" data-carousel-controls>
              <button
                class="round-button"
                type="button"
                data-carousel-prev
                aria-label="Ver pósters anteriores"
              >
                ${h(`arrowLeft`)}
              </button>
              <button
                class="round-button"
                type="button"
                data-carousel-toggle
                aria-label="Pausar el carrusel automático"
                aria-pressed="false"
              >
                ${h(`pause`)}
              </button>
              <button
                class="round-button"
                type="button"
                data-carousel-next
                aria-label="Ver más pósters"
              >
                ${h(`arrowRight`)}
              </button>
            </div>
          </header>
          <div data-trending-body>
            <div class="carousel" data-carousel>
              <ul class="carousel__track" data-carousel-track>
                ${Array.from({length:6},()=>a`<li class="carousel__item">${Xe()}</li>`)}
              </ul>
            </div>
          </div>
        </section>

        <section class="section" data-results hidden aria-labelledby="results-title">
          <header class="section-head">
            <div>
              <p class="eyebrow">Buscador</p>
              <h2 id="results-title" data-results-title>Resultados</h2>
            </div>
          </header>
          <p class="results__status" data-results-status role="status"></p>
          <div data-results-body></div>
        </section>
      </div>
    </div>
  `}async function ut({outlet:e,query:t,signal:n}){let r=(t.get(`q`)??``).trim();e.innerHTML=String(lt(r)),document.title=`Secretos de claqueta — Historias que no salieron en los créditos`;let i=e.querySelector(`[data-search-form]`),o=i.elements.namedItem(`q`),s=e.querySelector(`[data-search-clear]`),l=e.querySelector(`[data-trending]`),u=e.querySelector(`[data-trending-body]`),d=e.querySelector(`[data-carousel-controls]`),f=e.querySelector(`[data-results]`),p=e.querySelector(`[data-results-title]`),m=e.querySelector(`[data-results-status]`),h=e.querySelector(`[data-results-body]`),g=0,_=new AbortController,v=0;n.addEventListener(`abort`,()=>{window.clearTimeout(g),_.abort()},{once:!0});let b=e=>{h.replaceChildren(),e instanceof Node?h.append(e):h.innerHTML=String(e)},x=(e,{body:t,status:n=``})=>{l.hidden=!0,f.hidden=!1,p.textContent=e,m.textContent=n,b(t)},S=()=>{v+=1,_.abort(),f.hidden=!0,l.hidden=!1,m.textContent=``},C=(e,t)=>{e.querySelector(`[data-retry]`)?.addEventListener(`click`,()=>{e.innerHTML=String(a`<div class="state"><p>Cargando de nuevo…</p></div>`),t()},{signal:n})},w=async()=>{if(!V)d.hidden=!0,u.innerHTML=String(st());else try{let t=await De({signal:n});if(n.aborted)return;if(nt(e.querySelector(`[data-hero-slider]`),t,{signal:n}),t.length===0){d.hidden=!0,u.innerHTML=String(Z({title:`Sin tendencias disponibles`,text:`TMDB no devolvió resultados esta vez. Inténtalo de nuevo en un momento.`,retry:!0})),C(u,w);return}let r=document.createElement(`ul`);r.className=`carousel__track`,r.dataset.carouselTrack=``,r.append(...t.slice(0,ot).map(e=>{let t=document.createElement(`li`);return t.className=`carousel__item`,t.append(J(e,{signal:n})),t}));let i=document.createElement(`div`);i.className=`carousel`,i.dataset.carousel=``,i.append(r),d.hidden=!1,u.replaceChildren(i),it(l,{signal:n})}catch(e){if(e?.kind===`abort`||n.aborted)return;d.hidden=!0,u.innerHTML=String(Z({title:`No pudimos cargar las tendencias`,text:e?.kind===`config`?`Falta la clave de API de TMDB en el archivo .env.`:`Revisa tu conexión y vuelve a intentarlo.`,retry:!0})),C(u,w)}},T=async(e,{updateUrl:t=!1}={})=>{let r=e.trim();if(window.clearTimeout(g),r.length<X){r.length===0&&(S(),t&&E(`#/`));return}if(!V){x(`Resultados para «${r}»`,{body:st(),status:`Falta la configuración de TMDB.`}),t&&E(`#/?q=${encodeURIComponent(r)}`);return}_.abort(),_=new AbortController;let i=++v,a=he(n,_.signal);x(`Resultados para «${r}»`,{body:Ze(8),status:`Buscando películas…`}),t&&E(`#/?q=${encodeURIComponent(r)}`);try{let{results:e,total:t}=await Oe(r,{signal:a});if(i!==v||a.aborted)return;if(e.length===0){b(ct(r)),m.textContent=`Ninguna coincidencia`;return}b(Ye(e,{signal:n})),m.textContent=t>e.length?`Mostrando ${e.length} de ${t} coincidencias`:y(e.length,`película encontrada`,`películas encontradas`)}catch(e){if(i!==v||e?.kind===`abort`||a.aborted)return;b(Z({title:`La búsqueda no llegó a puerto`,text:`No pudimos consultar TMDB. Comprueba tu conexión y vuelve a intentarlo.`})),m.textContent=`Error de búsqueda`}};o.addEventListener(`input`,()=>{s.hidden=o.value.length===0,window.clearTimeout(g),o.value.trim().length<X?(S(),o.value.trim().length===0&&E(`#/`)):g=window.setTimeout(()=>T(o.value,{updateUrl:!0}),at)},{signal:n}),i.addEventListener(`submit`,e=>{e.preventDefault(),T(o.value,{updateUrl:!0})},{signal:n}),s.addEventListener(`click`,()=>{o.value=``,s.hidden=!0,S(),E(`#/`),o.focus(),c(`Búsqueda borrada.`)},{signal:n}),o.addEventListener(`keydown`,e=>{e.key===`Escape`&&o.value&&(e.preventDefault(),o.value=``,s.hidden=!0,S(),E(`#/`),c(`Búsqueda borrada.`))},{signal:n}),w(),r.length>=X&&T(r)}fe();var Q=document.getElementById(`main`);me(document.getElementById(`site-header`));var dt=[{pattern:/^\/$/,view:ut},{pattern:/^\/movie\/(\d+)$/,view:Je,headerSearch:!0},{pattern:/^\/favorites$/,view:$e,headerSearch:!0}],$=new AbortController,ft=0,pt=!0;function mt(){return a`
    <section class="page container" aria-labelledby="not-found-title">
      <p class="eyebrow">Fuera de plano</p>
      <h1 class="page__title" id="not-found-title">Esta página no existe</h1>
      <p class="page__lead">
        El enlace que has seguido no forma parte del archivo. Vuelve a la cartelera para
        seguir explorando secretos de rodaje.
      </p>
      <p class="page__lead">
        <a class="btn btn--gold" href="#/">Volver a la cartelera</a>
      </p>
    </section>
  `}function ht(){let e=Q.querySelector(`h1`);e&&(e.tabIndex=-1,e.focus({preventScroll:!0}))}async function gt(e,t){let n=++ft;$.abort(),$=new AbortController;let r=dt.map(t=>({definition:t,found:e.path.match(t.pattern)})).find(e=>e.found);pe(!!r?.definition.headerSearch),window.scrollTo({top:0,left:0,behavior:`instant`}),Q.setAttribute(`aria-busy`,`true`);try{r?await r.definition.view({outlet:Q,params:r.found.slice(1),query:e.query,state:t,signal:$.signal}):(Q.innerHTML=String(mt()),document.title=`Página no encontrada — Secretos de claqueta`)}catch(e){e?.kind!==`abort`&&console.error(e)}finally{n===ft&&(Q.removeAttribute(`aria-busy`),pt||ht(),pt=!1)}}document.addEventListener(`click`,e=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let t=e.target.closest(`a[href^="#/"]`);if(!t)return;let n=t.getAttribute(`href`);if(!n)return;if(n===window.location.hash){e.preventDefault();return}e.preventDefault();let r=n.slice(1),i=t.querySelector(`img[data-poster]`),a=i?{posterSrc:i.currentSrc||i.src,title:t.querySelector(`.movie-card__title`)?.textContent?.trim()??``}:null;i&&r.startsWith(`/movie/`)?f(i,()=>T(r,{state:a})):T(r,{state:a})}),w({render:gt});