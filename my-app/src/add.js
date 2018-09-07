import React from 'react';
// import ReactDOM from 'react-dom';


// 这个组件纯粹瞎写着玩的
class Lifecycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 1
        }
    }


    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: this.state.data + 1
            })
        }, 1000)
    }

    render() {
        return (
            <div>{this.state.data}</div>
        );
    }
}

export default Lifecycle;