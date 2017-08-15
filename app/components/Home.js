import React from 'react';
import {connect} from 'react-redux'
import Messages from './Messages';
import Panel from '../components/Panel'

class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Messages messages={this.props.messages}/>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel
                        >
                            <h3>Demo Users</h3>
                            <h5>User 1</h5>
                            <pre> name: "Admin User",
                                email: "admin@test.com",
                                role: "ADMIN",
                                password: "admin123"</pre>

                            <h5>User 2</h5>
                            <pre>
                                name: "Staff",
                                email: "staff@test.com",
                                role: "STAFF",
                                password: "staff123"
                            </pre>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Home);
