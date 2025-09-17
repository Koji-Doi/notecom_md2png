let theme_group = {
  基本テーマ: ['std'],
  バナー作成: ['blueback', 'baloon1', 'baloon2', 'flower', 'computerwork', 'nature', 'black_board_man'], 
  表作成:     ['tbl1']
};
let vals ={
  '_':{}, // current setting
    std:{
      _label: "標準",
      // p
      text_size:     '150',     // text font size [px]
      text_color:    '#ffffff',// text color
      text_weight:   'normal', // normal or bold
      text_style:    'normal', // normal or italic
      text_t_e1:     '2',      // text stroke thickness
      text_c_e1:     '#000000',// text stroke color
      text_t_e2:     '2',      // text shadow width
      text_c_e2:     '#ffffff',// text shadow color
      // h2
      h2text_size:   '170',    // h2 text font size [px]
      h2text_color:  '#ff0000',// h2 text color
      h2text_weight: 'normal', // h2 normal or bold
      h2text_style:  'normal', // h2 normal or italic
      h2text_t_e1:   '2',      // h2 text stroke thickness
      h2text_c_e1:   '#000000',// h2 text stroke color
      h2text_t_e2:   '4',      // h2 text shadow width
      h2text_c_e2:   '#ffffff',// h2 text shadow color
      // h3
      h3text_size:   '150',    // h3 text font size [px]
      h3text_color:  '#ffffaa',// h3 text color
      h3text_weight: 'normal', // h3 normal or bold
      h3text_style:  'normal', // h3 normal or italic
      h3text_t_e1:   '2',      // h3 text stroke thickness
      h3text_c_e1:   '#000000',// h3 text stroke color
      h3text_t_e2:   '2',      // h3 text shadow width
      h3text_c_e2:   '#ffffff',// h3 text shadow color
      // em
      emtext_size:   '150',     // empahasized(em) text font size [px]
      emtext_color:  '#000000',// empahasized(em) text color
      emtext_weight: 'bold', // empahasized(em) 'normal' or 'bold'
      emtext_style:  'normal', // empahasized(em) 'normal' or 'italic'
      emtext_t_e1:   '2',      // empahasized(em) text stroke thickness
      emtext_c_e1:   '#000000',// empahasized(em) text stroke color
      emtext_t_e2:   '2',      // empahasized(em) text shadow width
      emtext_c_e2:   '#ffffff',// empahasized(em) text shadow color
      // strong
      sttext_size:   '150',     // strong text font size [px]
      sttext_color:  '#ffff00',// strong text color
      sttext_weight: 'bold',   // strong 'normal' or 'bold'
      sttext_style:  'normal', // strong 'normal' or 'italic'
      sttext_t_e1:   '2',      // strong text stroke thickness
      sttext_c_e1:   '#000000',// strong text stroke color
      sttext_t_e2:   '2',      // strong text shadow width
      sttext_c_e2:   '#ffffff',// strong text shadow color
  
      // table
      thtext_size:   '50',     // header cell (th) text font size [px]
      thtext_color:  '#ffffff',// header cell (th) text color
      thtext_weight: 'bold',   // header cell (th) normal or bold
      thtext_style:  'normal', // header cell (th) normal or italic
      thtext_t_e1:   '5',      // header cell (th) text stroke thickness
      thtext_c_e1:   '#ff0000',// header cell (th) text stroke color
      thtext_t_e2:   '5',      // header cell (th) text shadow width
      thtext_c_e2:   '#ffffff',// header cell (th) text shadow color
      tdtext_size:   '50',     // cell (td) text font size [px]
      tdtext_color:  '#000000',// cell (td) text color
      tdtext_weight: 'normal', // cell (td) normal or bold
      tdtext_style:  'normal', // cell (td) normal or italic
      tdtext_t_e1:   '2',      // cell (td) text stroke thickness
      tdtext_c_e1:   '#000000',// cell (td) text stroke color
      tdtext_t_e2:   '2',      // cell (td) text shadow width
      tdtext_c_e2:   '#ffffff',// cell (td) text shadow color
  
      // textbox align
      textalign:     'center', // text horizontal align: 'left', 'center' or 'right'
      textvalign:    'middle', // text vertical align: 'top', 'middle' or 'bottom'
      padding_left:  '0',      // left padding [px]
      padding_top:   '0',      // top padding [px]

      // background
      bgcolor:       '#000000',// background color (not effective if bgimage is set)
      prebgimg:      '',  // preloaded background image
      bgimage_users: undefined,// background image file name (jpeg/png)
      bgimage_pre:   '',  // preset background images (baloon1, baloon2, blackboard, computerwork, flower, nature, or plant)
      textarea:
`
## 今日の呟き

Noteにだって
**つぶやき**が欲しい
`
    },
    blueback:{
      _label:       '青バックスライド風',
      bgimage_pre:  '',
      bgcolor:      '#0000ff',
      h2text_size:  '220',
      h2text_weight:'bold',
      h2text_t_e1:  '5',
      h2text_t_e2:  '2',
      h2text_color: '#ffffff',
      h3text_size:  '170',
      h3text_t_e1:  '5',
      h3text_t_e2:  '4',
      h3text_color: '#ffff00'
    },
    baloon1: {
      _label:        '吹き出しと少女1',
      bgimage_pre:   'baloon1',
      textalign:     'left',
      padding_left:  '100' 
    },
    baloon2: {
      _label:        '吹き出しと少女2',
      bgimage_pre:   'baloon2',
      textalign:     'left',
      padding_left:  '100' 
    },
    flower: {
      _label:        '左右に花束',
      bgimage_pre:   'flower'
    },
    computerwork: {
      _label:        'オフィスでPC作業',
      bgimage_pre:   'computerwork',
      textalign:     'left',
      padding_left:  '150',
      text_c_e2:      '#ffffff' 
    },
    nature: {
      _label:        '自然の風景',
      bgimage_pre:   'nature'
    },
  
    black_board_man:{
      _label:        '黒板と男性',
      bgimage_pre:   'blackboard', 
      /* text_color:    '#ffff00',
      #text_size:     '120',
      #text_weight:   'normal',
      #emtext_color:  '#ff0000',
      #emtext_style:  'normal',
      #sttext_color:  '#ffff00',
      #sttext_weight: 'bold', */
      padding_left:  '-100',
      padding_top:   '130'
    },

    tbl1:{
      _label: '標準的な表',
      bgimage_pre: '',
      textarea:
`|       | 1列目 | 2列目 | 3列目 |
|-------|-------|-------|-------|
| 1行目 | 1-1   | 1-2   | 1-3   |
| 2行目 | 2-1   | 2-2   | 2-3   |
`
    }

};
console.log("setting.js:", Object.keys(vals));