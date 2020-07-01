function etchASketch() {
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const app = document.getElementById("app");
  const main = document.getElementById("main");
  const header = document.createElement("div");
  const headerText = document.createElement("div");
  const container = document.createElement("div");
  const sidenav = document.createElement("div");
  const settings = document.createElement("div");
  const content = document.createElement("div");
  const grid = document.createElement("div");
  const footer = document.createElement("div");
  let gridSize = 16;

  /*
   * Initial element attributes
   */
  headerText.textContent = "ETCH A SKETCH";

  /*
   * Component elements
   */
  function component() {
    header.appendChild(headerText);
    sidenav.appendChild(settings);
    content.appendChild(grid);
    container.appendChild(sidenav);
    buildSettings(settings);
    container.appendChild(content);
    buildGrid(grid, gridSize);

    main.appendChild(header);
    main.appendChild(container);
    main.appendChild(footer);
    return main;
  }

  /*
   * Component methods
   */
  function blockClick(e) {
    console.log(e.target.id);
  }

  function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  function blockOver(e) {
    let opacity = parseFloat(e.target.style["opacity"]) || 0.0;
    if (opacity !== 1.0) opacity += 0.1;
    if (document.querySelector('#randomColor').checked) {
      let r = getRandInt(0, 255);
      let g = getRandInt(0, 255);
      let b = getRandInt(0, 255);
      e.target.style["background-color"] = `rgb(${r},${g},${b})`;
    } else {
      e.target.style["background-color"] = "#000000";
    }
    e.target.style["opacity"] = `${opacity}`;
  }

  function blockOut(e) {
    e.target.style["background-color"] = "#000000";
    if (document.querySelector('#trailing').checked) {
      e.target.style["transition-property"] = "background-color";
      e.target.style["transition-duration"] = "1s";
      e.target.style["transition-delay"] = "1s";
    }
  }

  function gridChange(e) {
    buildGrid(grid, e.target.value);  
  }

  function resetSettings() {
    let randomColorInput = document.querySelector('#randomColor');
    let trailingInput = document.querySelector('#trailing');
    let gridSizeInput = document.querySelector('#gridSize');

    randomColorInput.checked = false;
    trailingInput.checked = false;
    gridSizeInput.value = gridSize;
    buildGrid(grid, gridSize);
  }

  function buildSettings(parentNode) {
    const arr = [
      {"name":"randomColor","type":"checkbox"},
      {"name":"trailing","type":"checkbox"},
      {"name":"gridSize","type":"text","value":gridSize,"event":gridChange},
      {"name":"reset","type":"button","event":resetSettings}
    ];
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      const setting = document.createElement("div");
      setting.style["width"] = "inherit";
      setting.style["display"] = "flex";
      setting.style["align-items"] = "center";
      if (arr[i]["type"] !== "button") {
        const lbl = document.createElement("label");
        const inpt = document.createElement("input");
        inpt.style["width"] = "50px";
        inpt.style["margin-left"] = "5px";
        lbl.textContent = `${obj["name"]}: `;
        inpt.id = obj["name"];
        inpt.type = obj["type"];
        if (typeof obj["value"] !== "undefined") {
          inpt.value = obj["value"];
        }
        if (typeof obj["event"] !== "undefined") {
          inpt.addEventListener('change', obj["event"]);
        }
        setting.appendChild(lbl);
        setting.appendChild(inpt);
      } else {
        const btn = document.createElement("button");
        btn.textContent = obj["name"];
        btn.addEventListener('click', obj["event"]);
        setting.appendChild(btn);
      }
      parentNode.appendChild(setting);
    }
  }

  function destroyGrid(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }

  function buildGrid(parentNode, n) {
    destroyGrid(parentNode);
    // auto resize blocks to fill parentNode
    let gridW = Math.floor(parseInt(grid.style.width) / n);
    // let gridH = Math.floor(parseInt(grid.style.height) / n);
    let blockSize = gridW;
    for (let i = 0; i < n ** 2; i++) {
      const block = document.createElement("div");
      block.id = i;
      // block styles
      block.style["width"] = `${blockSize}px`;
      block.style["height"] = `${blockSize}px`;
      block.style["background-color"] = "#ffffff";
      block.style["border-radius"] = "5px";
      block.style["box-shadow"] = "0px 0px 1px black";
      // event listeners
      block.addEventListener("click", blockClick);
      block.onmouseover = blockOver;
      block.onmouseout = blockOut;
      parentNode.appendChild(block);
    }
  }

  /*
   * Component styles
   */
  // global styles
  html.style["height"] = "100%";
  body.style["min-height"] = "100%";
  body.style["background-color"] = "#020202";
  body.style["color"] = "#ffffff";
  // app styles
  app.style["font-family"] = "Roboto, sans-serif";
  header.style["width"] = "100%";
  header.style["height"] = "72px";
  header.style["background-color"] = "#2196F3";
  header.style["display"] = "flex";
  header.style["justify-content"] = "center";
  header.style["align-items"] = "center;"
  headerText.style["text-align"] = "center";
  headerText.style["font-size"] = "2em";
  container.style["width"] = "960px";
  container.style["height"] = "550px";
  container.style["display"] = "flex";
  container.style["margin"] = "0 auto";
  sidenav.style["width"] = "200px";
  sidenav.style["background-color"] = "#424242";
  sidenav.style["display"] = "flex";
  sidenav.style["flex-flow"] = "column";
  sidenav.style["justify-content"] = "center";
  sidenav.style["align-items"] = "center";
  settings.style["width"] = "125px";
  settings.style["height"] = "125px";
  settings.style["display"] = "flex";
  settings.style["flex-flow"] = "column";
  settings.style["justify-content"] = "space-evenly";
  content.style["width"] = "100%";
  content.style["height"] = "100%";
  content.style["background-color"] = "#ffffff";
  content.style["display"] = "flex";
  content.style["justify-content"] = "center";
  content.style["align-items"] = "center";
  content.style["padding"] = "0px";
  content.style["margin"] = "0px";
  grid.style["width"] = "525px";
  grid.style["height"] = "525px";
  grid.style["display"] = "flex";
  grid.style["flex-wrap"] = "wrap";
  grid.style["padding"] = "0px";
  grid.style["margin"] = "0px";

  /*
   * Render component
   */
  function render() {
    app.appendChild(component());
  }

  render();
}

export default etchASketch;
