import React, {Component} from 'react';


class Day extends Component {

    constructor(props) {
        super(props);

        this.state = {"error": ""};

    }

    componentDidMount() {

    }


    render() {


        return (
            <div className={'homeHolder'}>
                <div className={'tile'}>
                    <div className={'tileHead'}>
                        Go to the Mindful Day Planner
                    </div>
                    <div className={'tileBody'}>

                        <p>It's not just about what you <i>need</i> to do!</p>
                        <p>It's also about what to you want to do to take care of yourself and lead a more balanced life</p>

                    </div>


                    <div >
                        <a  className={'btn btn-primary'} href={'./fqtrack'}>Plan My Day</a>
                    </div>

                </div>
                <div className={'tile'}>
                    <div className={'tileHead'}>
                        Habit Helper
                    </div>
                    <div className={'tileBody'}>

                        <p>Forming new positive habits takes practice</p>
                        <p>Get reminders and track progress using the Habit Helper</p>

                    </div>


                    <div >
                        <a  className={'btn btn-primary'} href={'./habits'}>Build Good Habits</a>
                    </div>

                </div>
            </div>
        );
    }
}

export default Day;
