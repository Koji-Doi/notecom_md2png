console.clear();
// standard theme = 'std'
let std_v = vals['std'];

function theme_val(theme, propname){
  if(typeof theme =="undefined"){
    theme = 'std';
  }
  if(!(theme in vals)){
    return(undefined);
  }
  return(vals[(propname in vals[theme]) ? theme : 'std'][propname]);
}

function shadow_val(t, c){
  t = t.replace(/(\d+)$/, '$1px');
  return( `${t}  ${t} 0 ${c}, `
       + `-${t} -${t} 0 ${c}, `
       + `-${t}  ${t} 0 ${c}, `
       + ` ${t} -${t} 0 ${c}, `
       + ` ${t}  0    0 ${c}, `
       + `-${t}  0    0 ${c}, `
       + ` 0     ${t} 0 ${c}, `
       + ` 0    -${t} 0 ${c}`);
}

function id2propname(id){
  return(id.match("c_e1")          ? "-webkit-text-stroke-color"
       : id.match("t_e1")          ? "-webkit-text-stroke-width"
       : id.match("c_e2")          ? "textShadow"
       : id.match("t_e2")          ? "textShadow"
       : id.match("color")         ? "color"
       : id.match("size")          ? "fontSize" 
       : id.match("weight")        ? "fontWeight" 
       : id.match("style")         ? "fontStyle"
       : id.match("valign")        ? "verticalAlign"
       : id.match("align")         ? "textAlign"
       : id.match("padding_top")   ? "paddingTop"
       : id.match("bgimage_pre")   ? "backgroundImage"
       : id.match("bgimage_users") ? "backgroundImage"
       : id.match("bgcolor")       ? "backgroundColor"
       : id.match("padding_left")  ? "paddingLeft" : '');
}

// すべての要素に対して指定されたCSSプロパティを更新
function updateCSSProperty(selector, property, value_css, value_form, param) {
  const elements = document.querySelectorAll(selector);  
  elements.forEach(element => {
    element.style[property] = value_css;
  });
  vals['_'][param] = value_form;
}

// テキスト入力欄を空に
document.getElementById('clear_button').addEventListener('click', function() {
  document.getElementById('textarea').value = "";
});

// make png file
document.getElementById('save_button').addEventListener('click', function() {
  downloadElAsPng();
});

// form 変更反映
let csssel = {text:"#innertext p", h2text:"#innertext h2", h3text:"#innertext h3", em:"#innertext em", strong:"#innertext strong", tdtext:"#innertext td", thtext:"#innertext th"};

// theme
let theme_select = document.getElementById('theme');
let        theme = theme_select.value;

// ユーザーが選択肢を変更するたびにthemeを更新する
theme_select.addEventListener("change", function() {
  theme = this.value;
  init_by_theme(theme);
});

// *text
["text","h2text","h3text","emtext","sttext","thtext","tdtext"].map(
// **bold** -> <strong>bold</strong> font-weight: bold
// *italic* -> <em>italic</em>       font-style: italic
  (target) => {
    ["color","size","c_e1","t_e1","c_e2","t_e2"].map(
      (p0) => {
        let p = target + "_" + p0;
        document.getElementById(p).addEventListener('change', function(){
          let p_val = document.getElementById(p).value;
          let t_e2  = target + "_t_e2";
          let c_e2  = target + "_c_e2";
          let prop = p.match("c_e1")  ? ["-webkit-text-stroke-color", p_val] 
                   : p.match("t_e1")  ? ["-webkit-text-stroke-width", p_val+"px"]
                   : p.match("c_e2")  ? ["textShadow", ((std_v[c_e2]=p_val), shadow_val(std_v[t_e2], std_v[c_e2]))]
                   : p.match("t_e2")  ? ["textShadow", ((std_v[t_e2]=p_val), shadow_val(std_v[t_e2], std_v[c_e2]))]
                   : p.match("color") ? ["color" , p_val]
                   : p.match("size")  ? ["fontSize", p_val+"px"] :[];
          updateCSSProperty(csssel[target], prop[0], prop[1], p_val, p);
        });
      } // p0
    ); // map for color size etc.

    ["weight","style"].map(
      (p0) => {
        let p = target + "_" + p0;
        document.querySelectorAll(`input[name="${p}"]`).forEach(function(radio) {
          radio.addEventListener('change', function() {
            let prop = (p0=="weight") ? "fontWeight" : "fontStyle";
            updateCSSProperty(csssel[target], prop, this.value, this.value, p);
          });    
        });
      });
  } // target
);

['textalign', 'textvalign'].forEach((k) => {
  document.querySelectorAll(`input[name="${k}"]`).forEach(function(radio) {
    radio.addEventListener('change', function() {
      updateCSSProperty('#innertext', id2propname(k), this.value, this.value, k);
    });
  });
});

['padding_top', 'padding_left'].forEach( (k) => {
  document.querySelectorAll(`input[name="${k}"]`).forEach(function(event) {
    event.addEventListener('change', function() {
      let v  = document.getElementById(k).value;
      document.querySelector("#innertext").style[`${id2propname(k)}`] = v+"px";
      vals['_'][k] = v;
    });
  });
});

document.getElementById('textarea').addEventListener('change', function() {
  // テキスト入力フォームの内容を取得
  var textInput = document.getElementById('textarea').value;

  // mainブロック内にテキストを追記
  const main = document.querySelector('main');

  // 隠し機能：使用フォント名を追記する
  textInput = textInput.replace("***fontname***", getComputedStyle(document.querySelector('main')).font);

  // md -> html
/*    var htmltxt = md.render(textInput);
  let innertext = document.getElementById('innertext');
  innertext.innerHTML = htmltxt; */
  vals['_']['textarea'] = textInput;
  init_by_theme('_');
}); //document.getElementById('#textarea')

// 既設backgroundimageのどれかを選ぶ。ユーザー画像が選択されていたらそちらを優先
document.getElementById('bgimage_pre').addEventListener('change', function(event){
  if(typeof vals['_']['bgimage_users'] === "undefined"){
    vals['_']['bgimage_pre'] = this.value;
    set_bgimage(srcimg[this.value]);
  }else{
    console.log('user image already set');
  }
});

// 背景画像のユーザー選択
document.getElementById('bgimage_users').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function() {
      //let base64String = reader.result;
      //const main = document.querySelector('main');
      //main.style.backgroundImage = `url(${base64String})`;
      set_bgimage(reader.result);
    };
    reader.readAsDataURL(file);
    vals['_']['bgimage_users'] = file;
  }
});

function set_bgimage(base64String){
  //const base64String = reader.result;
  const main = document.querySelector('main');
  main.style.backgroundImage = `url(${base64String})`;  
}

// マークダウンの基本設定

const markdown_setting = window.markdownit({
html: true, // htmlタグを有効にする
breaks: true, // md内の改行を<br>に変換
});

const markdown_editer = $(".js-markdown-editer");
// マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
const markdown_html = markdown_setting.render(getHtml(markdown_editer));
markdown_editer.html(markdown_html);

// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function getHtml(selector) {
let markdown_text = $(selector).html();
// let markdown_text = document.querySelectorAll(selector)[1].innerHTML;
markdown_text = markdown_text.replace(/&lt;/g, );
markdown_text = markdown_text.replace(/&gt;/g, );
markdown_text = markdown_text.replace(/&amp;/g, );
return markdown_text;
}

// https://khsmty.com/article/html2canvas-image-download/
function downloadElAsPng() {
const el = document.querySelector("main");
if (!el) {
  console.error("要素が見つかりませんでした。");
  return;
}

html2canvas(el).then((canvasEl) => {
  const aEl = document.createElement("a");
  aEl.href = canvasEl.toDataURL("image/png");
  aEl.download = "md_snapshot.png";
  aEl.click();
  }
);
};

//Default values for the selected theme
const inputs = document.querySelectorAll('input,select,textarea');
// markdown object
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
  });

// Set input form parameters, and reflect to innertext or main
function init_by_theme(t){
inputs.forEach(input => {
  const inputName = input.name;
  if(inputName=="theme"){
    return;
  }
  let v = theme_val(t, inputName);
  let prop = id2propname(inputName);
  let e0 = [];
  let target_tag = '';
  if(inputName=="textarea"){
    e0[0] = inputName;
    var htmltxt   = md.render(theme_val('_', 'textarea'));
    let innertext = document.getElementById('innertext');
    innertext.innerHTML = htmltxt;
  }else if(e0 = inputName.match("padding_(top|left)")){
    input.value = v;
    updateCSSProperty('#innertext', id2propname(e0[0]), v+"px", v, inputName);
  }else if(e0 = inputName.match("textv?align")){
    if (input.value === v) {
          input.checked = true;
    }
    let vv = input.id.match("([a-zA-Z]+)_align$")[1]; //left,center,right,top,middle,bottom
    if(vv == v){
      document.querySelectorAll('#innertext').forEach((e1)=>{
        try{
          e1.style[prop] = v;
        }catch(er){
          console.log(er)
        }
      })
    }
  }else if(e0 = inputName.match("bgcolor")){

  }else if(e0 = inputName.match("bgimage_pre")){
    set_bgimage(srcimg[v]);
    input.value = v;
    vals[t][inputName] = v;
  //  updateCSSProperty('main', prop, v, v, inputName);
  }else if(e0 = inputName.match("bgimage_users")){ 
    console.log("check bgimage_users on theme:", theme);
    try{
      input.value = v;
    }catch(er){}
    updateCSSProperty('main', prop, v, v, inputName);
  }else if(e0 = inputName.match("^(h2|h3|em|st|th|td)?([a-zA-Z0-9]+)_(.*)")){
    try{
      target_tag = (typeof e0[1] === 'undefined') ? 'p' 
                                : (e0[1] == 'st') ? 'strong' 
                                : e0[1];
    }catch(e){
      console.log(e, e0);
    }
    if (v !== undefined) {
      if (input.type === "radio") {
        if (input.value === v) {
          input.checked = true;
        }
        let vv = input.id.match("_([a-zA-Z0-9]+)$")[1];
        if(vv == v){
           document.querySelectorAll(`#innertext ${target_tag}`).forEach((e1)=>{
            try{
              e1.style[prop] = v;
            }catch(er){
              console.log(er)
            }
          })
        }
      } else if (input.type === "number" || input.type === "color" || input.type === "file") {
        let v1 = (e0[3]=="size") ? v+"px" : v;
        //console.log(">", e0[0], v1);
        input.value = v;
        updateCSSProperty(`#innertext ${target_tag}`, id2propname(inputName), v1, v, inputName) 
      }
    }
    //updateCSSProperty(`#innertext ${target_tag}`, prop, v, v, inputName);
  } // if (e0 = ...)
});
} // init_by_theme()
init_by_theme(theme);