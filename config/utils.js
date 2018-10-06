class Utils {
  assetsHandle(data){
    let css = [],js=[];
    for(let option of data.js){
      js.push(`<script src='${option}'></script>`)
    }
    for(let option of data.css){
      css.push(`<link rel="stylesheet" href="${option}">`)
    }
    return {
      css,
      js
    }
  }
}
module.exports = new Utils();
