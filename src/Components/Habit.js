import React, {Component} from 'react';
import {getUserHabits} from "../util/apiServiceUtil";

import '../css/Habit.css';

class Habit extends Component {

    constructor(props) {
        super(props);

        this.state = {"error": ""};

    }

    componentDidMount() {
        this.getHabits();
    }

    getHabits() {
        let user = this.props.user;
        let user_id = {"user_id": user.sub.split('|')[1]};
        console.log("Habit - getHabits for: " + user_id.user_id);

        //get habits
        getUserHabits(user_id, (habits) => {

                this.setState({"habits": habits})
            },
            (error) => {

                console.log("ERROR in getUserHabits =  " + error);
                this.setState({"error": error});
            })
    }


    render() {

        let habits = this.state.habits;
        let habsToShow = [];

        if (habits === undefined || !habits.success) {
            return (<div>Working...</div>)
        }

        let habitsHeader = [];



        let headRow1 = <div className={'habitRow'}><div key={'habTitleRow1'} className={'habitLabel cell'}>&nbsp;</div><div style={{'width':'78%'}} className={'cell'}>Days in the past</div></div>
        habsToShow.push(headRow1);


        for (let i = 0; i < 11; i++) {
            let headCell = <div className={'head cell'} key={'headCell'+i}> {i}</div>

            habitsHeader.push(headCell);
        }

        let headToShow = <div className={'habitRow'}><div key={'habTitleRow'} className={'habitLabel cell'}>&nbsp; </div>{habitsHeader}</div>
        habsToShow.push(headToShow);

        for (let hab of habits.habits) {
            let thisHab = <div className={'habitRow'}>
                <div key={hab.habit_id} className={'habitLabel cell'}>{hab.label}</div>
            </div>

            habsToShow.push(thisHab)
        }


        return (
            <div className={'homeHolder'}>
                <div className={'pageHeader'}>Habit Helper</div>


                <div>

                    {habsToShow}
                </div>


            </div>
        );
    }
}

export default Habit;
