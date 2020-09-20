import React, {Component} from 'react';



class Day extends Component {

    constructor(props) {
        super(props);

        this.state = {"error": ""};

    }

    componentDidMount() {

        console.log("Day - didMount - currentDay: "+this.props.currentDay);

    }

    changeDate(event) {
        let newVal = event.target.value;



        this.props.dayChange(newVal);

    }


    render() {


        return (
            <div>
                <div className={'dayHolder'}>

                    <input type="date" value={this.props.currentDay||''} onChange={(event) => this.changeDate(event)}/>

                </div>
            </div>
        );
    }
}

export default Day;
