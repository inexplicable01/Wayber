// import React, { Component } from "react";
// import { Col } from "reactstrap";
//
//           // <Col lg={4} key={key} className="mt-3">
//           //   <div className="services-box text-center hover-effect">
//           //     <i className={service.icon + " text-primary"}></i>
//           //     <h4 className="pt-3">{service.title}</h4>
//           //     <p className="pt-3 text-muted">{service.desc}</p>
//           //   </div>
//           // </Col>
//
// class ServiceBox extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         {this.props.services.map((service, key) => (
//           <Col lg={4} key={key} className="mt-3">
//             <div className="services-box  text-center hover-effect">
//               <i className={service.icon + " text-primary"}></i>
//               <h4 className="pt-3">{service.title}</h4>
//               <p className="pt-3 text-muted">{service.desc}</p>
//             </div>
//           </Col>
//         ))}
//       </React.Fragment>
//     );
//   }
// }
//
// export default ServiceBox;


import React, { Component } from "react";
import { Col } from "reactstrap";

class ServiceBox extends Component {
  render() {
    const { service } = this.props;

    return (
      <div className="services-box text-center hover-effect" style={{ height: '33vh', overflow: 'auto' }}>
        <i className={service.icon + " text-primary"}></i>
        <h4 className="pt-3">{service.title}</h4>
        <p className="pt-3 text-muted">{service.desc}</p>
      </div>
    );
  }
}

export default ServiceBox;
