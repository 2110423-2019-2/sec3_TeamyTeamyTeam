import React, { Component } from "react";
import ManageAlbum from "./manageAlbum";
import "../../../stylesheets/portfolio.css";

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
  }

  DeleteAlbum(id) {
    let albums = this.state.albums.filter((album) => album.id !== id);
    this.setState({ albums });
    //แก้databaseส่วนalbumพร้อมทั้งลบรูปทั้งหมด
  }

  AddAlbum() {
    const album = {
      id: this.state.albums[this.state.albums.length - 1]
        ? this.state.albums[this.state.albums.length - 1].id + 1
        : 1,
      name: "Added Album",
      photoLists: [],
    };
    let albums = this.state.albums;
    albums.push(album);
    this.setState({ albums });
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
