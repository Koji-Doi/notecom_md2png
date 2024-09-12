console.clear();

// standard theme = 'std'
let std_v = vals['std'];
// form 変更反映
let csssel = { text: "#innertext p", h2text: "#innertext h2", h3text: "#innertext h3", emtext: "#innertext em", sttext: "#innertext strong", tdtext: "#innertext td", thtext: "#innertext th" };
// theme
let theme_select = document.getElementById('theme');
let theme = theme_select.value;
//Default values for the selected theme
let inputs = document.querySelectorAll('input,select,textarea');

function uniq(array) { // 配列の重複要素除去
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}

function chkval(v){
  return(
      (typeof v == "undefined") ? "undefined"
    : (typeof v == "object")    ? Object.keys(v).join("|")
    : (typeof v == "string")    ? v.substring(0,100)
    : v
  );
}

function theme_val(theme0, propname) {

  if (typeof theme0 == "undefined") {
    theme0 = (typeof theme == 'undefined') ? 'std' : theme;
  }
  if (!(theme0 in vals)) {
    return (undefined);
  }
  return (vals[(propname in vals[theme0]) ? theme0 : 'std'][propname]);
}

function theme_options(){
  let out='';
  Object.keys(theme_group).forEach(group =>{
    out += `<optgroup label="${group}">` + "\n";
    theme_group[group].forEach(opt=>{
      let desc = (vals[opt]['_label']) ? vals[opt]['_label'] : opt; 
      out += `  <option value="${opt}">${desc}</option>` + "\n";
    });
    out += "</optgroup>\n";
  });
  return(out);
}
document.getElementById('theme').innerHTML = theme_options();

function shadow_val(t, c) {
  t = t.replace(/(\d+)$/, '$1px');
  return (`${t}  ${t} 0 ${c}, `
    + `-${t} -${t} 0 ${c}, `
    + `-${t}  ${t} 0 ${c}, `
    + ` ${t} -${t} 0 ${c}, `
    + ` ${t}  0    0 ${c}, `
    + `-${t}  0    0 ${c}, `
    + ` 0     ${t} 0 ${c}, `
    + ` 0    -${t} 0 ${c}`);
}

function id2propname(id) {
  return (id.match("c_e1")          ? "-webkit-text-stroke-color"
        : id.match("t_e1")          ? "-webkit-text-stroke-width"
        : id.match("c_e2")          ? "textShadow"
        : id.match("t_e2")          ? "textShadow"
        : id.match("bgcolor")       ? "backgroundColor"
        : id.match("color")         ? "color"
        : id.match("size")          ? "fontSize"
        : id.match("weight")        ? "fontWeight"
        : id.match("style")         ? "fontStyle"
        : id.match("valign")        ? "verticalAlign"
        : id.match("align")         ? "textAlign"
        : id.match("padding_top")   ? "paddingTop"
        : id.match("bgcolor")       ? "backgroundColor"
        : id.match("bgimage_pre")   ? "backgroundImage"
        : id.match("bgimage_users") ? "backgroundImage"
        : id.match("padding_left")  ? "paddingLeft" : '');
}

// 指定されたCSSプロパティを更新
function updateCSSProperty(selector, property, value_css, value_form, param) {
  const elements = document.querySelectorAll(selector);
  if(typeof value_css == 'undefined'){
    if(typeof property == 'undefined'){
      const inputs = document.querySelectorAll('input,select');
      let pp     = uniq(Object.keys(inputs).map(k=>{return(id2propname(inputs[k].id))}));
      pp = pp.filter(k=>{return k!=""});
      pp.forEach(p => {
        const v = elements[0].style[p];
        if((typeof v != 'undefined') && v!=""){
          console.log(`${selector}: ${p} = "${v}"`);
        }
      });
    }else{
    //  console.log(`${selector}: ${property} = ${elements[0].style[property]}`);
    }
  }else{
    //console.log(`update: ${selector}, ${property}, ${value_css}, ${value_form}, ${param}`);
    elements.forEach(element => {
      element.style[property] = value_css;
    });
    vals['_'][param] = value_form;
  }
}

// 全てのCSSプロパティを更新
function updateCSSProperty_all(inputs){
  inputs.forEach( input => {
    let target = '#innertext';
    let prop   = id2propname(input.name);
    let v      = theme_val('_', input.name);
    let v_unit = v;

    if((typeof prop=="undefined") || prop=="theme" || prop=="") {return;}


    // reset values if necessary
    if(input.name=="textarea"){
    }else if(input.name=="bgimage_pre"){
      target = 'main';
    }else if(input.name=="bgimage_users"){
      target = 'main';
    }else if(input.name=="bgcolor"){
      target = 'main';
    }else if(input.name.match("padding")){
      v_unit = v+"px";
    }else if(input.name.match("textv?align")){
    }else{
      //console.log("input.name = ", input.name);
      let xx = input.name.match("((?:h2|h3|st|em|th|td)?text)_(.*)");
      prop   = id2propname(xx[2]);
      target = csssel[xx[1]];
      v_unit = (xx[2].match("(size|padding|t_e1)")) ? v+"px" 
             : (xx[2].match("[ct]_e2"))             ? ((std_v[input.name] = v), shadow_val(std_v[`${xx[1]}_t_e2`], std_v[`${xx[1]}_c_e2`]))
             : v;
    }

    // set style for each property
    if((typeof prop != 'undefined') && (typeof v != 'undefined')){
      // console.log(`"${target}" ${prop}=${v_unit} | ${input.name}=${v}`);
      document.querySelectorAll(target).forEach(t =>{
 /*        if(prop=="backgroundColor"){
          if(!(theme_val('_', 'bgimage_users') && theme_val('_', 'bgimage_pre'))){
            console.log('bgcolor to be set here.');
            t.style[prop] = v;
          }
        }else if(prop=="backgroundImage"){
          const user = theme_val('_', 'bgimage_user');
          const pre  = theme_val('_', 'pre');
          if(typeof user != 'undefined'){ //if users image is set, use it.
            console.log('set users');
          }else{
            if(typeof pre != 'undefined'){ //if only pre image is set, use it.
              console.log('set pre');
            }
          }
        }else{ */
          t.style[prop] = v_unit;
        //}
      });
    }else{
      //console.log(`update all: prop=${chkval(prop)}, v=${chkval(v)} `);
    }
  });

  // 最後に背景設定
  set_bgimage(theme_val('_', 'bgimage_users') || srcimg[theme_val('_', 'bgimage_pre')]);

  //console.log("end of updatecssall");
} // updateCSSProperty_all()

// テキスト入力欄を空に
document.getElementById('clear_button').addEventListener('click', function () {
  document.getElementById('textarea').value = "";
});

// make png file
document.getElementById('save_button').addEventListener('click', function () {
  downloadElAsPng();
});

// ユーザーが選択肢を変更するたびにthemeを更新する
theme_select.addEventListener("change", function () {
  theme = this.value;
  init_by_theme(theme);
});

// 何か変更されるたびにcss, innertextを更新
document.querySelectorAll('textarea,input').forEach( x=> {
  x.addEventListener('change', function(){
    console.log(`${x.name} changed.`);
  });
});

// *text
["text", "h2text", "h3text", "emtext", "sttext", "thtext", "tdtext"].map(
  // **bold** -> <strong>bold</strong> font-weight: bold
  // *italic* -> <em>italic</em>       font-style: italic
  (target) => {
    ["color", "size", "c_e1", "t_e1", "c_e2", "t_e2"].map(
      (p0) => {
        let p = target + "_" + p0;
        document.getElementById(p).addEventListener('change', function () {
          let p_val = document.getElementById(p).value;
          let t_e2 = target + "_t_e2";
          let c_e2 = target + "_c_e2";
          let prop = p.match("c_e1")  ? ["-webkit-text-stroke-color", p_val]
                   : p.match("t_e1")  ? ["-webkit-text-stroke-width", p_val + "px"]
                   : p.match("c_e2")  ? ["textShadow", ((std_v[c_e2] = p_val), shadow_val(std_v[t_e2], std_v[c_e2]))]
                   : p.match("t_e2")  ? ["textShadow", ((std_v[t_e2] = p_val), shadow_val(std_v[t_e2], std_v[c_e2]))]
                   : p.match("color") ? ["color", p_val]
                   : p.match("size")  ? ["fontSize", p_val + "px"] : [];
          updateCSSProperty(csssel[target], prop[0], prop[1], p_val, p);
        });
      } // p0
    ); // map for color size etc.

    ["weight", "style"].map(
      (p0) => {
        let p = target + "_" + p0;
        document.querySelectorAll(`input[name="${p}"]`).forEach(function (radio) {
          radio.addEventListener('change', function () {
            let prop = (p0 == "weight") ? "fontWeight" : "fontStyle";
            updateCSSProperty(csssel[target], prop, this.value, this.value, p);
          });
        });
      });
  } // target
);

['textalign', 'textvalign'].forEach((k) => {
  document.querySelectorAll(`input[name="${k}"]`).forEach(function (radio) {
    radio.addEventListener('change', function () {
      updateCSSProperty('#innertext', id2propname(k), this.value, this.value, k);
    });
  });
});

['padding_top', 'padding_left'].forEach((k) => {
  document.querySelectorAll(`input[name="${k}"]`).forEach(function (event) {
    event.addEventListener('change', function () {
      let v = document.getElementById(k).value;
      document.querySelector("#innertext").style[`${id2propname(k)}`] = v + "px";
      vals['_'][k] = v;
    });
  });
});

document.getElementById('textarea').addEventListener('change', function () {
  // テキスト入力フォームの内容を取得
  var textInput = document.getElementById('textarea').value;

  // 隠し機能：使用フォント名を追記する
  textInput = textInput.replace("***fontname***", getComputedStyle(document.querySelector('main')).font);

  // md -> html
  document.getElementById('innertext').innerHTML = md.render(textInput);
  //updateCSSProperty_all(inputs);
  // update css other than 'bg*'
  updateCSSProperty_all(Object.keys(inputs).filter(x=>{return !inputs[x].name.match("bg")}).map(x=>{return inputs[x]}));
  vals['_']['textarea'] = textInput;
  //init_by_theme('_');
}); //document.getElementById('#textarea')

// 背景色を選ぶ。背景画像が選択されていたらそちらを優先
document.getElementById('bgcolor').addEventListener('change', function (event) {
  vals['_']['bgcolor'] = this.value;
  console.log('bgcolor', this.value);
  set_bgimage(theme_val('_', 'bgimage_users') || srcimg[theme_val('_', 'bgimage_pre')]);
  if ((typeof vals['_']['bgimage_users'] === "undefined") || ((typeof vals['_']['bgimage_pre'] === "undefined")) ) {
    updateCSSProperty('main', 'backgroundColor', this.value, this.value, 'bgcolor') 
  }
});

// 既設backgroundimageのどれかを選ぶ。ユーザー画像が選択されていたらそちらを優先
document.getElementById('bgimage_pre').addEventListener('change', function (event) {
  if (typeof vals['_']['bgimage_users'] === "undefined" || vals['_']['bgimage_users'] == "") {
    vals['_']['bgimage_pre'] = this.value;
    set_bgimage(srcimg[this.value]);
  } else {
    console.log('user image already set');
  }
}); // document.getElementById('bgimage_pre')

// 背景画像のユーザー選択
document.getElementById('bgimage_users').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      //let base64String = reader.result;
      //const main = document.querySelector('main');
      //main.style.backgroundImage = `url(${base64String})`;
      set_bgimage(reader.result);
    };
    reader.readAsDataURL(file);
    vals['_']['bgimage_users'] = file;
  }else{
    set_bgimage('');
    vals['_']['bgimage_users'] = '';
  }
}); // document.getElementById('bgimage_users').
// End of form 変更反映

// png, jpg -> base64string
function img_base64(file){
  const filename = (typeof x == "string" && x.match)   ? x
  : (typeof x == "object" && x["name"]) ? x["name"] : undefined;
  let base64string;
  if(filename){
    const reader = new FileReader();
    reader.onloadend = function () {
      console.log(`file ${file} is loaded and converted into base64`);
      base64string = reader.result
    };
    return(base64string);
  }
  return(undefined);
}

function set_bgimage(x){
  //x: png file path, or base64-encoded data
  console.trace();
  let base64String;
  const main = document.querySelector('main');

  //if x is false, set bgcolor instead of backgroundImage
  if(typeof x == "undefined" || x == ""){
    main.style.backgroundImage = "";
    main.style.backgroundColor = theme_val('_', 'bgcolor');
  }else{
    if(typeof x == "string" && x.match("data:image/[a-z]+;base64")){
      base64String = x;
    }else if(typeof x == "object" && x["name"].match("data:image/[a-z]+;base64")){
      base64String = x["name"];
    }else{
      const filename = (typeof x == "string" && x.match)   ? x
                   : (typeof x == "object" && x["name"]) ? x["name"] : undefined;
      if(filename){
        const reader = new FileReader();
        reader.onloadend = function () {
          console.log(`file ${file} is loaded and converted into base64`);
          base64String = reader.result
        };
        reader.readAsDataURL(filename);  
      }
    }
    if(base64String){
      main.style.backgroundImage = `url(${base64String})`;  
    }
  }
}

// 比較演算子（=，<>，<，<=，>，>=）をそのまま置換する
function get_html(markdown_text) {
    //let markdown_text = $(selector).html();
    // let markdown_text = document.querySelectorAll(selector)[1].innerHTML;
  markdown_text = markdown_text.replace(/&lt;/g,);
  markdown_text = markdown_text.replace(/&gt;/g,);
  markdown_text = markdown_text.replace(/&amp;/g,);
  return markdown_text;
}

// マークダウンの基本設定
function md2html(txt) {
  const markdown_setting = window.markdownit({
    html: true, // htmlタグを有効にする
    breaks: true, // md内の改行を<br>に変換
  });

  const markdown_editer = $(".js-markdown-editer");

  if (typeof txt != 'undefined') {
    markdown_editer.html(markdown_setting.render(txt))
  } else {
    // マークダウンの設定をjs-markdown-editerにHTMLとして反映させる
    //const markdown_html = markdown_setting.render(get_html(markdown_editer.html()));
    const markdown_html = markdown_setting.render(document.getElementById('innertext').innerHTML);
    markdown_editer.html(
      markdown_html
    );
    console.log("markdown_html: ", markdown_html);
    updateCSSProperty_all(inputs);
    console.log("update css after md2html");
  }

} // function md2html(txt)

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
}; // function downloadElAsPng

// markdown object
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
});

// Set input form parameters, and reflect to innertext or main. And vals['_'] is updated.
function init_by_theme(t) {
  document.querySelectorAll('input,select,textarea').forEach(input => {
    const inputName = input.name;
    if (inputName == "theme") {
      return;
    }
    let v = theme_val(t, inputName); // value for form
    let v1 = v; // value for css 
    let prop = id2propname(inputName);
    let e0 = [];
    let target_tag = '';
    if (inputName == "textarea") {
      e0[0] = inputName;
      //var htmltxt   = md.render(theme_val('_', 'textarea'));
      //let innertext = document.getElementById('innertext');
      //innertext.innerHTML = theme_val('_', 'textarea');
      input.value = v;
      vals['_'][prop] = v;
      document.getElementById('innertext').innerHTML = v;
    } else if (e0 = inputName.match("padding_(top|left)")) {
      input.value = v;
      //updateCSSProperty('#innertext', id2propname(e0[0]), v + "px", v, inputName);
    } else if (e0 = inputName.match("textv?align")) {
      if (input.value === v) {
        input.checked = true;
      }
      let vv = input.id.match("([a-zA-Z]+)_align$")[1]; //left,center,right,top,middle,bottom
      if (vv == v) {
        document.querySelectorAll('#innertext').forEach((e1) => {
          try {
            e1.style[prop] = v;
          } catch (er) {
            console.log(er)
          }
          vals['_'][prop] = v;
        })
      }
    } else if (e0 = inputName.match("bgcolor")) {
      input.value = v;
      vals['_'][inputName] = vals[t][inputName] = v;
    } else if (e0 = inputName.match("bgimage_pre")) {
        //set_bgimage((v=="") ? "" : srcimg[v]); -> ここでなくupdateCSSProperty_allの中で実行
        input.value = v;
        vals['_'][inputName] = vals[t][inputName] = v;  
      //  updateCSSProperty('main', prop, v, v, inputName);
    } else if (e0 = inputName.match("bgimage_users")) {
      console.log("check bgimage_users on theme:", theme);
      try {
        vals['_'][inputName] = vals[t][inputName] = v;  
        input.value = v;
      } catch (er) { }
      //updateCSSProperty('main', prop, v, v, inputName);
    } else if (e0 = inputName.match("^(h2|h3|em|st|th|td)?([a-zA-Z0-9]+)_(.*)")) {
      try {
        target_tag = (typeof e0[1] === 'undefined') ? 'p'
                   : (e0[1] == 'st')                ? 'strong'
                   : e0[1];
      } catch (e) {
        console.log(e, e0);
      }
      if (v !== undefined) {
        if (input.type === "radio") {
          if (input.value === v) {
            input.checked = true;
          }
          let vv = input.id.match("_([a-zA-Z0-9]+)$")[1];
/*           if (vv == v) {
            document.querySelectorAll(`#innertext ${target_tag}`).forEach((e1) => {
              try {
                e1.style[prop] = v;
              } catch (er) {
                console.log(er)
              }
            })
          } */
        } else if (input.type === "number" || input.type === "color" || input.type === "file") {
          v1 = (e0[3] == "size") ? v + "px" : v;
          //console.log(">", e0[0], v1);
          input.value = v;
          vals['_'][inputName] = vals[t][inputName] = v;  
          //updateCSSProperty(`#innertext ${target_tag}`, id2propname(inputName), v1, v, inputName) 
        }
      }
      //updateCSSProperty(`#innertext ${target_tag}`, prop, v1, v, inputName);
    } // if (e0 = ...) h2,h3,em,...
  }); // inputs.forEach
  md2html();
  updateCSSProperty_all(inputs);

} // init_by_theme()
init_by_theme(theme);
//md2html();
