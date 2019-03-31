import React, { Component } from 'react';
import {
  ResponsiveContainer, ComposedChart,
  Line, Area, Bar, XAxis, YAxis, Scatter,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './App.css';

const rand = () => {
  return Math.floor(Math.random()*1000)+500;
};

const randC = () => {
  return `#${Math.floor(Math.random()*16777216).toString(16)}`;
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: 3,
      cats: 3,
      data: [],
      w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
  }

  computeData = () => {
    const { pages, cats } = this.state;
    var Data = [];
    for (let p = 0; p < pages; p++) {
      let ret = {name: `Page ${p}`};
      for (let c = 0; c < cats; c++) {
        ret[`d${c}`] = rand();
      }
      Data.push(ret);
    }
    this.setState({data: Data});
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      });
    }, true);
    this.computeData();
  }

  render() {
    const { w, data, pages, cats } = this.state;
    //var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var bg = `#${parseInt(w/2000*256).toString(16)}AAAA`;
    console.log(bg);

    console.log(JSON.stringify(data));

    const Chart = (Choose = Line) => {
      var lines = [];
      for(let l = 0; l < cats; l++){
        lines.push(<Choose type="monotone" key={l.toString()} dataKey={`d${l}`} fill={randC()} />);
      }
      var ret = (
        <ResponsiveContainer key={Date()}>
          <ComposedChart
            data={data} 
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {lines}
          </ComposedChart>
        </ResponsiveContainer>
      );
      return ret;
    };


    return (
      <div className="App"  style={{background: bg}}>
        <div className="Inputs">
          <div className="Input">
            Pages: <input type="number" placeholder="between 1 and 10"/>
          </div>
          <div className="Input">
            Lines: <input type="number" placeholder="between 1 and 10"/>
          </div>
        </div>
        <div className="All">
          <div className="Row">
            <div className="Module">
              <div className="Module-Content">
                {Chart(Line)}
              </div>
            </div>
            <div className="Module">
              <div className="Module-Content">
              {Chart(Bar)}
              </div>
            </div>
          </div>
          <div className="Row">
          <div className="Module">
              <div className="Module-Content">
              {Chart(Area)}
              </div>
            </div>
            <div className="Module">
              <div className="Module-Content">
              {Chart(Scatter)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
