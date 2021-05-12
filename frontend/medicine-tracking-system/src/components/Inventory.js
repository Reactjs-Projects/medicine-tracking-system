import React from "react";
import AddButton from "./Button/AddButton";
import SearchBar from './SearchBar';
import MedicineTable from './MedicineTable';

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      filterText: ''
    };
  }

  componentDidMount() {
    this.getStock();
  }

  getStock = async () => {
    const data = await fetch("https://localhost:5003/api/medicines/read");
    const items = await data.json();
    this.setState({ stocks: items });
  };

  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText,
    });
  }

  render() {
    return (
      <section className="inventory">
        <div className="wrapper">
          <div>
            <AddButton />
          </div>
          <header>
            <h1>Stock Inventory Report</h1>
          </header>
          <section>
            <SearchBar
              fiterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <MedicineTable
              medicines={this.state.stocks}
              filterText={this.state.filterText}
            />
          </section>
        </div>
      </section>
    );
  }
}

export default Inventory;
