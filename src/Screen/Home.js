import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addData } from "../Reducers/Data";
import { Card, Slider, Checkbox } from "antd";
import Get from "../Get";
import { API_KEY } from "../API";

function Home({ addTheData, data }) {
  let [range, setRange] = useState({
    min: 0,
    max: 303,
  });
  let [filterMeasure, setFilterMeasure] = useState([]);
  useEffect(() => {
    Get(`/api/v1/product?limit=50`)
      .then((res) => {
        let resData = res.data.data.rows ?? [];
        let dataHandler = [...data.Data.data];
        for (let item in resData) {
          dataHandler.push(res.data.data.rows[item]);
        }
        addTheData(dataHandler);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { Meta } = Card;
  let dataProps = data.Data.data;
  let maxNumber = Math.max.apply(
    Math,
    dataProps.map(function (o) {
      return o.sell_price;
    })
  );

  //filter by price
  let filteredData = dataProps.filter(
    (item) => item.sell_price >= range.min && item.sell_price <= range.max
  );

  //filter by price and checkbox
  let newFilteredData = filteredData.filter((f) =>
    filterMeasure.includes(f.unit_measure)
  );

  //map all unit measure
  let dataForFilter = new Set(dataProps.map((item) => item.unit_measure));

  return (
    <div style={styles.container}>
      <div style={styles.filter}>
        <div>
          <h3>Filter By Price</h3>
          <Slider
            range
            autoFocus
            value={[range.min, range.max]}
            min={0}
            max={maxNumber}
            onChange={(e) =>
              setRange({
                ...range,
                min: e[0],
                max: e[1],
              })
            }
          />
        </div>
        <div style={{ gridColumn: "3 /3" }}>
          <h3>Filter By Unit Measure</h3>
          <Checkbox.Group
            options={[...dataForFilter]}
            onChange={(e) => setFilterMeasure(e)}
          />
        </div>
      </div>
      <div style={styles.thumbnail}>
        {(
          (filterMeasure.length > 0 ? newFilteredData : filteredData) || []
        ).map(
          ({
            id,
            name,
            sell_price,
            unit_measure,
            SpreeStore,
            SpreeProductImages,
          }) => (
            <div style={styles.cardWrapepr} key={id}>
              <Card
                hoverable
                style={{ width: 240, alignItems: "center" }}
                cover={
                  <img
                    alt="example"
                    src={`${API_KEY}${SpreeProductImages[0].thumbnail_image}`}
                  />
                }
              >
                <Meta title={name} description={SpreeStore.store_name} />
                <div>{`$ ${sell_price}`}</div>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
}

let styles = {
  container: {
    display: "grid",
    alignItems: "center",
    gridRowGap: 30,
  },
  thumbnail: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: 10,
  },
  cardWrapepr: {
    display: "grid",
    justifyItems: "center",
  },
  filter: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
};

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTheData: (data) => {
      dispatch(addData(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
