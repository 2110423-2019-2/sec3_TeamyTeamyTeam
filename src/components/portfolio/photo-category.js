import React, { Component } from "react";
import Photo from "./photo";

class PhotoCategory extends Component {
  componentDidMount() {
    this.getPhoto();
  }

  state = {
    photoList: []
  };

  getPhoto() {
    let photoList = [];
    photoList.push(
      "https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/999515/pexels-photo-999515.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    photoList.push(
      "https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    );
    this.setState({ photoList });
  }

  render() {
    return (
      //   <div className="container-fluid ">
      //     <div className="container testimonial-group">
      //       <div className="row text-center flex-nowrap">
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/1800994/pexels-photo-1800994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/937483/pexels-photo-937483.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/773371/pexels-photo-773371.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      //           <img
      //             className="img-fluid"
      //             src="https://images.pexels.com/photos/999515/pexels-photo-999515.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      //             alt="Card image cap"
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      <div className="container-fluid mb-5">
        <h1>{this.props.category}</h1>
        <div className="card-columns">
          {this.state.photoList.map(link => (
            <Photo imgLink={link} />
          ))}
        </div>
        <button className="col-sm-12 mt-3 btn btn-outline-primary">
          See more
        </button>
      </div>
    );
  }
}

export default PhotoCategory;
