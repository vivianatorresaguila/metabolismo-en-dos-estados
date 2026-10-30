"use strict";
const organNames = {liver:"Hígado",muscle:"Músculo esquelético",adipose:"Tejido adiposo",brain:"Cerebro",rbc:"Eritrocitos"};
const explorerData = {
  fed: {
    signal:"Aumenta la insulina y la relación insulina/glucagón tras una comida mixta con carbohidratos.",
    fuels:"Glucosa absorbida; los lípidos dietarios viajan principalmente como TAG en quilomicrones.",
    goal:"Utilizar nutrientes y reponer reservas. El almacenamiento depende del aporte y la demanda.",
    organs:{
      liver:{role:"Integra los nutrientes que llegan y favorece su utilización y almacenamiento.",input:"Glucosa por la vena porta y nutrientes procedentes de la comida.",output:"Almacena glucógeno; puede exportar TAG en VLDL.",routes:[["Glucogénesis","Glucosa → glucosa-6-fosfato → glucógeno","Repone la reserva hepática, que después puede contribuir a mantener la glicemia."],["Glucólisis","Glucosa → piruvato","Favorece el uso de glucosa. El piruvato puede aportar acetil-CoA para oxidación o, según el contexto, síntesis de lípidos."],["Lipogénesis","Acetil-CoA → ácidos grasos → TAG","Puede aumentar con exceso de energía y carbohidratos. No significa que toda la glucosa ingerida se convierta en grasa."]],note:"La entrada de glucosa por GLUT2 no requiere insulina. La señal hormonal regula el destino metabólico de esa glucosa."},
      muscle:{role:"Capta glucosa para obtener ATP y reponer su propia reserva de glucógeno.",input:"Glucosa circulante; también puede utilizar ácidos grasos según la demanda.",output:"ATP para el trabajo muscular y glucógeno para uso local.",routes:[["Captación por GLUT4","Insulina → señal celular → GLUT4 en membrana","La insulina favorece la captación de glucosa en músculo. La contracción también puede estimular GLUT4 por mecanismos propios."],["Glucogénesis","Glucosa → glucógeno muscular","Repone reservas para el músculo; su glucógeno no mantiene directamente la glicemia."],["Glucólisis y oxidación","Glucosa → piruvato → oxidación mitocondrial","La glucólisis y la oxidación del piruvato aportan ATP según la demanda y las condiciones del músculo."]],note:"El músculo carece de glucosa-6-fosfatasa: no exporta glucosa libre desde su glucógeno como lo hace el hígado."},
      adipose:{role:"Favorece el almacenamiento de energía en triacilglicéridos.",input:"Ácidos grasos de TAG de lipoproteínas y glucosa captada mediante GLUT4.",output:"Almacena TAG; disminuye la liberación de ácidos grasos desde sus reservas.",routes:[["Captación de lípidos","TAG circulantes → ácidos grasos → adipocito","La lipoproteína lipasa (LPL) facilita la liberación de ácidos grasos desde TAG de quilomicrones y VLDL para su captación."],["Síntesis de TAG","Ácidos grasos + glicerol-3-fosfato → TAG","La glucosa aporta glicerol-3-fosfato para esterificar ácidos grasos y almacenarlos."],["Freno de la lipólisis","Insulina → menor movilización de TAG","La insulina inhibe la lipólisis intracelular y favorece el balance hacia el almacenamiento."]],note:"Distingue la LPL, que actúa sobre TAG de lipoproteínas, de las lipasas intracelulares que movilizan la reserva del adipocito."},
      brain:{role:"Utiliza principalmente glucosa para sostener su actividad en este contexto.",input:"Glucosa circulante.",output:"ATP para señalización, gradientes iónicos y funciones celulares.",routes:[["Captación de glucosa","Sangre → barrera hematoencefálica → células cerebrales","El suministro principal de glucosa al cerebro no depende de la translocación de GLUT4 por insulina."],["Glucólisis y oxidación","Glucosa → piruvato → acetil-CoA → ATP","La glucólisis se integra con el ciclo de Krebs y la fosforilación oxidativa para cubrir la demanda energética."]],note:"El cerebro no cambia a usar principalmente ácidos grasos después de una comida ni tras un ayuno nocturno habitual."},
      rbc:{role:"Necesitan glucosa en ambos estados: el eritrocito maduro no tiene mitocondrias.",input:"Glucosa circulante.",output:"Lactato hacia la sangre y ATP para sus funciones.",routes:[["Glucólisis","Glucosa → piruvato → lactato","Produce ATP por fosforilación a nivel de sustrato. La formación de lactato regenera NAD⁺ para sostener la glucólisis."],["Vía de las pentosas","Glucosa-6-fosfato → NADPH","El NADPH contribuye a mantener el glutatión reducido y la defensa frente al estrés oxidativo; esta vía no produce ATP directamente."]],note:"Transportar oxígeno no implica usarlo para producir ATP: sin mitocondrias, el eritrocito maduro no realiza β-oxidación ni fosforilación oxidativa."}
    }
  },
  fast:{
    signal:"Disminuye la insulina y aumenta la relación glucagón/insulina. El glucagón actúa especialmente sobre el hígado.",
    fuels:"Glucosa de producción endógena y ácidos grasos no esterificados del tejido adiposo, transportados por albúmina.",
    goal:"Mantener el suministro de glucosa y cubrir la demanda de ATP utilizando reservas.",
    organs:{
      liver:{role:"Contribuye a mantener la glicemia mientras obtiene energía de ácidos grasos.",input:"Ácidos grasos, glicerol, lactato y aminoácidos glucogénicos, como alanina.",output:"Glucosa hacia la sangre; la producción de cetonas puede aumentar de manera gradual.",routes:[["Glucogenólisis","Glucógeno hepático → glucosa → sangre","Moviliza la reserva hepática. La glucosa-6-fosfatasa permite liberar glucosa libre para otros tejidos."],["Gluconeogénesis","Lactato, glicerol y alanina → glucosa","Ya contribuye durante el ayuno nocturno y coexiste con la glucogenólisis. Su aporte relativo depende del tiempo, las reservas y el contexto."],["β-oxidación","Ácidos grasos → acetil-CoA + equivalentes reductores","La oxidación de ácidos grasos sostiene la producción de ATP hepático y apoya el costo energético de la gluconeogénesis."],["Cetogénesis","Acetil-CoA → cuerpos cetónicos","Puede aumentar al disminuir la insulina y crecer el aporte de ácidos grasos. Una noche de ayuno no equivale a la adaptación al ayuno prolongado."]],note:"El glicerol aporta carbono para glucosa. Los ácidos grasos de cadena par aportan energía, pero no forman glucosa neta."},
      muscle:{role:"En reposo puede aumentar el uso de ácidos grasos y reducir su demanda de glucosa.",input:"Ácidos grasos circulantes y glucosa, según actividad y demanda.",output:"ATP para el músculo; lactato y alanina pueden aportar sustratos para el hígado.",routes:[["β-oxidación","Ácidos grasos → acetil-CoA → oxidación → ATP","El uso de ácidos grasos contribuye a cubrir la demanda muscular y a reservar glucosa para tejidos que la necesitan."],["Glucógeno local","Glucógeno muscular → glucosa-6-fosfato → glucólisis","Es una reserva de uso muscular, especialmente durante actividad. El ayuno nocturno en reposo no implica que deba agotarse."],["Intercambio con hígado","Lactato o alanina → sangre → hígado","Estos sustratos pueden incorporarse a la gluconeogénesis hepática. El intercambio depende de la actividad y del contexto metabólico."]],note:"El glucagón no dirige la glucogenólisis del músculo esquelético. La regulación muscular responde a contracción, demanda energética y otras señales."},
      adipose:{role:"Moviliza parte de sus TAG para abastecer a otros tejidos.",input:"Reserva intracelular de TAG.",output:"Ácidos grasos no esterificados y glicerol hacia la sangre.",routes:[["Lipólisis","TAG → ácidos grasos + glicerol","Las lipasas intracelulares, entre ellas ATGL y HSL, participan en la movilización secuencial de la reserva."],["Regulación hormonal","Menos insulina → menor freno antilipolítico","La caída de insulina facilita la movilización; la señal adrenérgica también regula la lipólisis. No se atribuye este cambio a una acción directa principal del glucagón en el adipocito humano."],["Destino de productos","Ácidos grasos → tejidos · glicerol → hígado","Los ácidos grasos viajan unidos a albúmina para oxidarse; el glicerol puede aportar carbono a la gluconeogénesis."]],note:"La lipólisis libera sustratos; la β-oxidación los oxida dentro de las células. Son procesos distintos y ocurren en compartimentos diferentes."},
      brain:{role:"Sigue utilizando principalmente glucosa durante un ayuno nocturno habitual.",input:"Glucosa mantenida por producción endógena, sobre todo hepática.",output:"ATP para mantener su actividad continua.",routes:[["Glucólisis y oxidación","Glucosa → piruvato → oxidación mitocondrial","La glicemia sostenida permite que el cerebro continúe obteniendo energía de glucosa entre comidas."],["Uso de cetonas","Cuerpos cetónicos → acetil-CoA → ATP","El cerebro puede utilizar cuerpos cetónicos. Su contribución crece con la disponibilidad y la duración del ayuno; no se representa como el combustible principal de una noche habitual."]],note:"El cambio de combustible depende del tiempo y del contexto. No debe trasladarse al ayuno nocturno el patrón del ayuno prolongado."},
      rbc:{role:"Mantienen su dependencia de la glucosa, aunque otros tejidos usen más ácidos grasos.",input:"Glucosa circulante de producción endógena.",output:"Lactato hacia la sangre.",routes:[["Glucólisis","Glucosa → lactato + ATP","La falta de mitocondrias mantiene la necesidad de glucólisis para producir ATP, también durante el ayuno."],["Ciclo de Cori","Lactato → hígado → glucosa → eritrocito","El hígado puede reciclar el lactato mediante gluconeogénesis, un proceso que consume energía hepática."],["Vía de las pentosas","Glucosa-6-fosfato → NADPH","Sostiene funciones de defensa antioxidante también en ayuno; no sustituye a la glucólisis como fuente de ATP."]],note:"Los eritrocitos maduros no pueden reemplazar glucosa por ácidos grasos ni por cuerpos cetónicos para producir ATP."}
    }
  }
};
let exploreState="fed", exploreOrgan="liver", exploreRoute=0;
function setExploreState(state){
  exploreState=state;exploreRoute=0;
  document.querySelectorAll("[data-explore-state]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.exploreState===state)));
  document.getElementById("explore-signal").textContent=explorerData[state].signal;
  document.getElementById("explore-fuels").textContent=explorerData[state].fuels;
  document.getElementById("explore-goal").textContent=explorerData[state].goal;
  renderOrgan();
  document.getElementById("explore-status").textContent="Explorando "+(state==="fed"?"estado alimentado":"ayuno nocturno")+" · "+organNames[exploreOrgan];
}
function renderOrgan(){
  const d=explorerData[exploreState].organs[exploreOrgan];
  document.querySelectorAll("[data-organ]").forEach(b=>{const selected=b.dataset.organ===exploreOrgan;b.setAttribute("aria-selected",String(selected));b.tabIndex=selected?0:-1;});
  const panel=document.getElementById("organ-panel");panel.setAttribute("aria-labelledby","organ-tab-"+exploreOrgan);
  document.getElementById("organ-name").textContent=organNames[exploreOrgan];
  document.getElementById("organ-role").textContent=d.role;
  document.getElementById("organ-input").textContent=d.input;
  document.getElementById("organ-output").textContent=d.output;
  document.getElementById("organ-note").textContent=d.note;
  const routes=document.getElementById("route-buttons");routes.replaceChildren();
  d.routes.forEach((r,i)=>{const b=document.createElement("button");b.type="button";b.textContent=r[0];b.dataset.route=String(i);b.setAttribute("aria-controls","route-detail");b.setAttribute("aria-pressed",String(i===exploreRoute));b.addEventListener("click",()=>{exploreRoute=i;renderRoute();});routes.appendChild(b);});
  renderRoute();
}
function renderRoute(){
  const r=explorerData[exploreState].organs[exploreOrgan].routes[exploreRoute];
  document.querySelectorAll("[data-route]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.route)===exploreRoute)));
  document.getElementById("route-flow").textContent=r[1];
  document.getElementById("route-copy").textContent=r[2];
}
document.querySelectorAll("[data-explore-state]").forEach(b=>b.addEventListener("click",()=>setExploreState(b.dataset.exploreState)));
document.querySelectorAll("[data-organ]").forEach(b=>{
  b.addEventListener("click",()=>{exploreOrgan=b.dataset.organ;exploreRoute=0;renderOrgan();});
  b.addEventListener("keydown",event=>{
    const keys=["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"];
    if(!keys.includes(event.key))return;
    event.preventDefault();const tabs=[...document.querySelectorAll("[data-organ]")];let i=tabs.indexOf(b);
    if(event.key==="Home")i=0;else if(event.key==="End")i=tabs.length-1;else i=(i+(event.key==="ArrowRight"||event.key==="ArrowDown"?1:-1)+tabs.length)%tabs.length;
    tabs[i].click();tabs[i].focus();
  });
});
function openComparison(){document.getElementById("compare").classList.remove("hidden");document.getElementById("compare").scrollIntoView({behavior:"smooth",block:"start"});document.getElementById("compare-title").focus({preventScroll:true});}
document.querySelectorAll("[data-open-compare]").forEach(b=>b.addEventListener("click",openComparison));
setExploreState("fed");
