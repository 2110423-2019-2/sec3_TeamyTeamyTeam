import React, { Component } from "react";
import ManageAlbum from "./manageAlbum";
import "../../stylesheets/portfolio.css";
import axios from 'axios';
class ManagePortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.name,
      albums: [
        {
          id: 1,
          name: "Cafe",
          photoLists: [],
        },
      ], //เก็บjsonของalbum ในalbumก็เก็บรูปอีกที
    };
    this.DeleteAlbum = this.DeleteAlbum.bind(this);
    this.AddAlbum = this.AddAlbum.bind(this);
  }

  componentDidMount() {
    
    //ดึงalbumมาจากdatabase
    axios
    .get("http://localhost:9000/api/portfolio/" + localStorage.email)
    .then((res) => {
      console.log("",res);
      this.setState({ albums: res.data.data[0].album  });
    })
    .catch((err) => console.error(err));
  }

  async DeleteAlbum(id) {
    let albums = await this.state.albums.filter((album) => album.id !== id);
    this.setState({ albums });
    //แก้databaseส่วนalbumพร้อมทั้งลบรูปทั้งหมด
    // ------------------------- Fix ------------------------- //
    await axios
    .put("http://localhost:9000/album/"+ localStorage.email +'-'+this.state.name+'-'+this.state.id ,{
      albumName: this.state.name,
      portfolioID: localStorage.email +'-'+this.state.name+'-'+this.state.id, 
      imageURLs: this.state.photoLists
    })
     // ------------------------- Fix ------------------------- //
  }

  async AddAlbum() {
    const album = await {
      id: this.state.albums[this.state.albums.length - 1]
        ? this.state.albums[this.state.albums.length - 1].id + 1
        : 1,
      name: "Added Album",
      photoLists: [],
    };
    let albums = await this.state.albums;
    albums.push(album);
    this.setState({ albums });
    // ------------------------- Fix ------------------------- //
    await axios
    .put("http://localhost:9000/album/"+ localStorage.email +'-'+this.state.name+'-'+this.state.id ,{
      albumName: this.state.name,
      portfolioID: localStorage.email +'-'+this.state.name+'-'+this.state.id, 
      imageURLs: this.state.photoLists
    })
    // ------------------------- Fix ------------------------- //
  }

  render() {
    return (
      <div className="my-5 container">
        <h1 className="text-purple">
          <ion-icon name="images-outline"></ion-icon> Manage Portfolio
        </h1>
        <div class="d-flex align-items-center mt-3">
          <div class="bd-highlight">
            <h2>Albums</h2>
          </div>
          <div class="bd-highlight">
            <a href="#" className="text-success" onClick={this.AddAlbum}>
              <h3>
                <ion-icon name="add-circle"></ion-icon>
              </h3>
            </a>
          </div>
        </div>
        <div className="container">
          {this.state.albums.map((album) => (
            <ManageAlbum
              key={album.id.toString()}
              album={album}
              onDelete={this.DeleteAlbum}
              hasSeperateLine={
                album !== this.state.albums[this.state.albums.length - 1]
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ManagePortfolio;
