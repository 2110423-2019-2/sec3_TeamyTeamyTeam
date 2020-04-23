import React, { Component } from "react";
import axios from "axios";
import JobStatus from "./jobStatus";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

// //////////////// refactor ใหม่หมด ////////////////// //
class JobHistory extends Component {
  constructor(props) {
    super(props);
    this.getResult = this.getResult.bind(this);
    this.state = {
      currentJob: [], //ให้fetch job มาแสดงผล
      historyResult: [
        {
          title: "Title2",
          style: "Wedding",
          user: "Ton",
          meetUpTime: "Half day morning",
          actDate: new Date().toString().substr(4, 11),
          location: "123456",
          status: "Cancelled",
          download: "url"
        }
      ],
      columns: [
        { dataField: "title", text: "Title" },
        { dataField: "style", text: "Style" },
        { dataField: "employerEmail", text: "Employer" },
        { dataField: "portfolioName", text: "Photographer" },
        { dataField: "meetUpTime", text: "Time" },
        { dataField: "actDate", text: "Appointed Date" },
        { dataField: "location", text: "Location" },
        { dataField: "progress", text: "Status" },
        { dataField: "download", text: "Download" }
      ]
    };
  }

  getResult() {
    console.log("this.props.email", localStorage.getItem("email")); // ควรจะเป็น this.props.appState.email
    //This function is where Back-end operates e.g. fetching photographer data from server
    let history = []; // use next sprint to match real case
    //Use this.state.keyword to query correct photographers
    axios
      .get("http://localhost:9000/api/offerHistory/" + localStorage.getItem("email")) // ควรจะเป็น this.props.appState.email
      .then(res => {
        console.log(res.data.data);
        //historyResult = res.data.data;
        //console.log(historyResult)
        this.setState({
          historyResult: res.data.data
        });

        // {  title: 'Title2', style: 'Wedding', portfolioName: 'Ton', meetUpTime: '1/1/2020', actDate: 'Half day morning', location:'123456', progress:'Cancelled' },
        // { title: 'Title3', style: 'Portrait', portfolioName: 'Jane', meetUpTime: '17/10/2019', actDate: 'Half day evening', location:'123456', progress:'Finished' },
        // {  title: 'Title4', style: 'Graduation', portfolioName: 'Otto', meetUpTime: '16/9/2019', actDate: 'Full day', location:'123456', progress:'Finished' }
      })
      .catch(err => console.error(err));
  }

  /*renderTableData() {
    return this.state.historyResult.map(hist => {
      const {
        title,
        style,
        portfolioName,
        actDate,
        meetUpTime,
        location,
        progress
      } = hist; //destructuring
      return (
        <tr key={title}>
          <th scope="row">{title}</th>
          <td>{title}</td>
          <td>{style}</td>
          <td>{portfolioName}</td>
          <td>{actDate}</td>
          <td>{meetUpTime}</td>
          <td>{location}</td>
          <td>{progress}</td>
        </tr>
      );
    });
  }*/
  componentDidMount(){
    this.getResult()
  }
  render() {
    const options = {
      page: 1,
      sizePerPageList: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "All", value: this.state.historyResult.length }
      ],
      sizePerPage: 5,
      pageStartIndex: 1,
      paginationSize: 3,
      prePageText: "<",
      nextPageText: ">",
      firstPageText: "<<",
      lastPageText: ">>"
    };

    return (
      <div className="container">
        <JobStatus />
        <h1 className="text-purple">
          <ion-icon name="file-tray-full-outline"></ion-icon> History
        </h1>
        <div class="table-responsive">
          <BootstrapTable
            keyField="id"
            data={this.state.historyResult}
            columns={this.state.columns}
            pagination={paginationFactory(options)}
          />
        </div>
      </div>
    );
  }
}

export default JobHistory;
