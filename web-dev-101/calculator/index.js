function calculator() {
  // Component elements
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const app = document.getElementById("app");
  const main = document.getElementById("main");
  const header = document.createElement("div");
  const headerText = document.createElement("div");
  const container = document.createElement("div");
  const content = document.createElement("div");
  const calculator = document.createElement("div");
  const display = document.createElement("div");
  const footer = document.createElement("div");

  /*
   * Component object
   */
  const obj = {};
  obj.accumulator = "0";
  obj.total = 0;
  obj.history = [];
  obj.log = [];
  obj.numberString = "0";
  obj.error = null;

  function print(str) {
    document.querySelector("#displayInput").textContent = str;
  }

  function getSize() {
    return obj.log.length;
  }

  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  function operate(op, a, b) {
    obj.error = null;
    if (op === "+") return add(a, b);
    if (op === "-") return subtract(a, b);
    if (op === "*") return multiply(a, b);
    if (op === "/") {
      if (b === 0) {
        obj.error = "Divide by Zero Error";
        print(obj.error);
        return a;
      } else {
        return divide(a, b);
      }
    }
  }

  function operators(e) {
    // push ops on odd length
    let n = getSize();
    if (n % 2 !== 0) {
      let op = e.target.textContent;
      obj.log.push(op);
      // evaluate or update accumulator
      if (op === "=") {
        obj.accumulator = equal(true);
      } else {
        obj.accumulator = equal();
        print(obj.accumulator); 
      }
    }

    obj.numberString = "0";
  }

  function equal(reset) {
    let n = getSize();
    let total = 0;
    let a = Number(obj.accumulator);
    if (n === 2) {
      let b = Number(obj.numberString);
      let op = "+";
      total = operate(op, a, b);
    } else {
      let b = Number(obj.log[n-2]);
      let op = obj.log[n-3];
      total = operate(op, a, b);
    }

    if (reset) {
      obj.log = [total.toString()];
      obj.accumulator = "0";
    }

    if (!obj.error) print(obj.log[0]);
    return total.toString();
  }

  function numberInput(e) {
    let n = e.target.textContent;
    // build numberString
    if (obj.numberString === "0") {
      obj.numberString = n;
    } else {
      obj.numberString += n;
    }

    // push numberString on even length
    // or edit last numberString
    if (obj.log.length % 2 === 0) {
      obj.log.push(obj.numberString);
    } else {
      obj.log[obj.log.length-1] = obj.numberString;
    }

    print(obj.numberString);
  }

  function updateDisplay(str) {
    document.querySelector("#displayInput").textContent = str;
  }

  function allClear() {
    obj.accumulator = 0;
    obj.total = 0;
    obj.log = [];
    clear();
  }

  function clear() {
    obj.numberString = "0";
    if (obj.log.length === 1) obj.accumulator = Number(obj.numberString);
    updateDisplay(obj.numberString);
  }

  function square() {
    if (obj.length % 2 !== 0) {
      obj.numberString = Math.pow(Number(obj.numberString), 2).toString();
      obj.log[obj.log.length-1] = obj.numberString;
      print(obj.numberString);
    }
  }

  function sign() {
    if (obj.length % 2 !== 0) {
      let n = Number(obj.numberString);
      if (n > 0) {
        n = 0 - n;
        obj.numberString = n.toString();
      } else {
        obj.numberString = Math.abs(obj.numberString).toString();
      }
      
      obj.log[obj.log.length-1] = obj.numberString;
      print(obj.numberString);
    }
  }

  function decimal() {
    let match = obj.numberString.search(/\./);
    if (obj.numberString === "0" || match === -1) {
      obj.numberString += ".";
    }
    print(obj.numberString);
  }

  function btnMouseEnter(e) {
    e.target.style["color"] = "teal";
    e.target.style["box-shadow"] = "0px 0px 8px teal";
  }

  function btnMouseLeave(e) {
    e.target.style["color"] = "#000000";
    e.target.style["box-shadow"] = "0px 0px 0px teal";
  }

  /*
   * Initial element attributes
   */
  headerText.textContent = "CALCULATOR";

  /*
   * Component methods
   */
  function buildCalculator() {
    //const displayResults = document.createElement("div");
    const displayInput = document.createElement("div");
    //displayInput.contentEditable = true;
    //display.appendChild(displayResults);
    display.appendChild(displayInput);
    //displayResults.id = "displayResults";
    //displayResults.style["border"] = "1px solid red";
    //displayResults.style["width"] = "100%";
    //displayResults.style["height"] = "auto";
    //displayResults.textContent = getDisplay();
    displayInput.id = "displayInput";
    // displayInput.style["border"] = "1px solid green";
    displayInput.style["width"] = "100%";
    displayInput.style["height"] = "55px";
    displayInput.style["text-align"] = "right";
    displayInput.style["font-size"] = "3em";
    displayInput.style["overflow"] = "auto";
    displayInput.textContent = obj.numberString;
    calculator.appendChild(display);
    const buttons = [
      {"name":"allClear","label":"AC","event":allClear}, 
      {"name":"clear","label":"C","event":clear}, 
      {"name":"square","label":"x^2","event":square}, 
      {"name":"add","label":"+","event":operators}, 
      {"name":"one","label":"1","event":numberInput}, 
      {"name":"two","label":"2","event":numberInput}, 
      {"name":"three","label":"3","event":numberInput}, 
      {"name":"subtract","label":"-","event":operators}, 
      {"name":"four","label":"4","event":numberInput}, 
      {"name":"five","label":"5","event":numberInput}, 
      {"name":"six","label":"6","event":numberInput}, 
      {"name":"multiply","label":"*","event":operators}, 
      {"name":"seven","label":"7","event":numberInput}, 
      {"name":"eight","label":"8","event":numberInput}, 
      {"name":"nine","label":"9","event":numberInput}, 
      {"name":"divide","label":"/","event":operators}, 
      {"name":"sign","label":"-/+","event":sign}, 
      {"name":"zero","label":"0","event":numberInput}, 
      {"name":"decimal","label":".","event":decimal}, 
      {"name":"equal","label":"=","event":operators}, 
    ];
    buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.textContent = b["label"];
      btn.addEventListener("click", b["event"]);
      btn.addEventListener("mouseenter", btnMouseEnter);
      btn.addEventListener("mouseleave", btnMouseLeave);
      btn.style["width"] = parseInt(calculator.style["width"]) / 4 + "px";
      btn.style["height"] = "50px";
      btn.style["color"] = "#000000";
      btn.style["font-size"] = "1.5em";
      btn.style["border"] = "1px solid black";
      btn.style["box-shadow"] = "0px 0px 1px #646464";
      calculator.appendChild(btn);
    });
  }

  /*
   * Component styles
   */
  // global styles
  html.style["height"] = "100%";
  body.style["min-height"] = "100%";
  body.style["background-color"] = "#212121";
  body.style["color"] = "#ffffff";
  body.style["padding"] = "0px";
  body.style["margin"] = "0px";
  // app styles
  app.style["font-family"] = "Roboto, sans-serif";
  header.style["width"] = "100%";
  header.style["height"] = "72px";
  header.style["background-color"] = "#2196F3";
  header.style["display"] = "flex";
  header.style["justify-content"] = "center";
  headerText.style["align-self"] = "center";
  headerText.style["font-size"] = "2em";
  container.style["width"] = "400px";
  container.style["height"] = "400px";
  container.style["display"] = "flex";
  container.style["margin"] = "15px auto";
  content.style["width"] = "100%";
  //content.style["height"] = "100%";
  // content.style["background-color"] = "#202020";
  content.style["display"] = "flex";
  content.style["justify-content"] = "center";
  content.style["align-items"] = "center";
  content.style["padding"] = "15px";
  //content.style["border"] = "1px solid red";
  content.style["margin"] = "0px";
  calculator.style["width"] = "300px";
  calculator.style["height"] = "auto";
  calculator.style["background-color"] = "#212121";
  calculator.style["display"] = "flex";
  calculator.style["flex-wrap"] = "wrap";
  //calculator.style["border"] = "1px solid yellow";
  calculator.style["border-radius"] = "5px";
  calculator.style["margin"] = "15px";
  display.style["width"] = "100%";
  //display.style["height"] = "150px";
  display.style["background-color"] = "#040404";
  display.style["display"] = "flex";
  display.style["flex-wrap"] = "wrap";
  display.style["justify-content"] = "space-between";
  display.style["align-content"] = "space-between";
  display.style["padding"] = "5px 8px";
  display.style["border-radius"] = "5px";
  display.style["overflow"] = "auto";

  /*
   * Render component
   */
  function render() {
    header.appendChild(headerText);
    content.appendChild(calculator);
    buildCalculator();
    container.appendChild(content);

    main.appendChild(header);
    main.appendChild(container);
    main.appendChild(footer);
    app.appendChild(main);
  }

  render();
}

export default calculator;
