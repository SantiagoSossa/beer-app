import React from "react";

const TableBeer = props => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr className="trSearchBar">
            <th className="thSearchBar" colSpan="6">
              <i className="fas fa-search"></i>
              <input
                placeholder="Busca por nombre..."
                id="searchBar"
                type="text"
                onBlur={props.searchBeer}
                onKeyUp={props.searchBeer}
              />
            </th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Alcohol</th>
            <th>IBU</th>
            <th>Photo</th>
            <th>Rating</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.beerList.map(beer => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>{beer.alcohol}</td>
              <td>{beer.IBU}</td>
              <td>
                <img
                  onClick={props.showImage.bind(null, beer.photo)}
                  src={beer.photo}
                  alt=""
                />
              </td>
              <td>{beer.rating}</td>
              <td style={{ textAlign: "center" }}>
                <button onClick={props.showEdit.bind(null, beer)}>
                  <i
                    title="Edit"
                    style={{ color: "#0984e3" }}
                    className="fas fa-edit"></i>
                </button>
                <button onClick={props.showDelete}>
                  <i
                    id={beer.id}
                    title="Unofficial"
                    style={{ color: "#e83634" }}
                    className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBeer;
