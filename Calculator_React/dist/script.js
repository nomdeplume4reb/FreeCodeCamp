class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      lastClicked: '' };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperations = this.handleOperations.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }

  clearDisplay() {
    this.setState({ display: '0' });
  }

  handleNumbers(num) {
    this.setState(prevState => {
      let updatedDisplay;
      // prevents 0s at the beginning:
      if (prevState.display === '0') {
        updatedDisplay = prevState.display.concat(num).substring(1);
      } else
      {
        updatedDisplay = prevState.display + num;
      }

      return {
        display: updatedDisplay,
        lastClicked: num };

    });
  }

  handleDecimal(dec) {


    this.setState(prevState => {
      let updatedDisplay = prevState.display;
      let displayArr = updatedDisplay.split(new RegExp('[\-+*/]', 'g'));
      let lastElem = displayArr[displayArr.length - 1];
      console.log(lastElem);
      if (!lastElem.includes('.')) {
        updatedDisplay = prevState.display + dec;
      } else {
        updatedDisplay;
      }

      return {
        display: updatedDisplay,
        lastClicked: '.' };

    });
  }

  handleOperations(op) {
    this.setState(prevState => {
      let updatedDisplay;
      updatedDisplay = prevState.display + op;

      let groupedOps;

      let lastNumIndx = updatedDisplay.split('').
      map(el => parseInt(el)).
      map(el => Number.isInteger(el)).
      lastIndexOf(true);
      // gets grouped operations if more than one is clicked
      if (this.state.lastClicked === '/' ||
      this.state.lastClicked === '*' ||
      this.state.lastClicked === '+' ||
      this.state.lastClicked === '-') {
        groupedOps = updatedDisplay.slice(lastNumIndx + 1);
      } else {
        groupedOps;
      }
      // prevents multiple operations except '-':
      if (op !== '-' && (this.state.lastClicked === '/' ||
      this.state.lastClicked === '*' ||
      this.state.lastClicked === '+' ||
      this.state.lastClicked === '-')) {
        updatedDisplay = updatedDisplay.replace(groupedOps, op);
      } else {
        updatedDisplay;
      }

      return {
        display: updatedDisplay,
        lastClicked: op };

    });
  }


  handleEquals() {
    let expression = this.state.display;
    let result = eval(expression);

    result = (Math.round(100000 * result) / 100000).toString();

    this.setState({
      display: result,
      lastClicked: 'equals' });

  }

  handleDelete() {
    this.setState(prevState => {
      if (prevState.display === '0') {
        return {
          display: '0' };

      } else {
        return {
          display: prevState.display.substring(0, prevState.display.length - 1) };

      }
    });
  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "calculator" },
      React.createElement("div", { className: "outter-display-container" },
      React.createElement("div", { className: "display-container" },
      React.createElement("h1", { id: "display" }, this.state.display))),


      React.createElement("div", { className: "button-panel" },
      React.createElement("div", { id: "num-buttons" },
      React.createElement("button", { id: "seven",
        onClick: () => this.handleNumbers('7') }, "7"),
      React.createElement("button", { id: "eight",
        onClick: () => this.handleNumbers('8') }, "8"),
      React.createElement("button", { id: "nine",
        onClick: () => this.handleNumbers('9') }, "9"),
      React.createElement("button", { id: "four",
        onClick: () => this.handleNumbers('4') }, "4"),
      React.createElement("button", { id: "five",
        onClick: () => this.handleNumbers('5') }, "5"),
      React.createElement("button", { id: "six",
        onClick: () => this.handleNumbers('6') }, "6"),
      React.createElement("button", { id: "one",
        onClick: () => this.handleNumbers('1') }, "1"),
      React.createElement("button", { id: "two",
        onClick: () => this.handleNumbers('2') }, "2"),
      React.createElement("button", { id: "three",
        onClick: () => this.handleNumbers('3') }, "3"),
      React.createElement("button", { id: "zero",
        onClick: () => this.handleNumbers('0') }, "0"),
      React.createElement("button", { id: "decimal",
        onClick: () => this.handleDecimal('.') }, "."),
      React.createElement("button", { id: "delete", onClick: this.handleDelete }, "DEL"),
      React.createElement("img", { id: "freecodecamp",
        src: "https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_large.svg" }),
      React.createElement("button", { id: "clear",
        onClick: this.clearDisplay }, "C")),

      React.createElement("div", { id: "op-buttons" },
      React.createElement("button", { id: "add",
        onClick: () => this.handleOperations('+') }, "+"),
      React.createElement("button", { id: "subtract",
        onClick: () => this.handleOperations('-') }, "-"),
      React.createElement("button", { id: "divide",
        onClick: () => this.handleOperations('/') }, "/"),
      React.createElement("button", { id: "multiply",
        onClick: () => this.handleOperations('*') }, "x"),
      React.createElement("button", { id: "equals",
        onClick: this.handleEquals }, "="))),


      React.createElement("br", null), React.createElement("br", null))));



  }}



ReactDOM.render(React.createElement(App, null), document.getElementById("root"));