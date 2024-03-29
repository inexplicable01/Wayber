import React, {Component} from "react";
import {Col} from "reactstrap";



class TeamBox extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.teams.map((team, key) => (
                    <Col key={key}>
                        <div className="team-box text-center hover-effect">
                            <div className="team-wrapper">
                                <div className="team-member">
                                    <img
                                        alt="team"
                                        style={{
                                            width: "300px",
                                            height: "400px",
                                            objectFit: "cover",
                                            borderRadius: "50%"
                                        }}
                                        src={team.image}
                                        className="img-fluid rounded"
                                    />
                                </div>
                            </div>
                            <h4 className="team-name">{team.title}</h4>
                            <p className="text-uppercase team-designation">{team.desc}</p>
                        </div>
                    </Col>
                ))}
            </React.Fragment>
        );
    }
}

export default TeamBox;
