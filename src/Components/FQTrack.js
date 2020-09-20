import React, {Component, Fragment} from 'react';
import Quadrant from "./Quadrant";
import {getDay, toggleTask, addTask, updateTask, removeTask,addHabitsToDay} from '../util/apiServiceUtil';
import Day from "./Day";
import moment from "moment";
import _ from "lodash";
import {addHabitsToDay_service_api} from "../util/config";


class FQTrack extends Component {


    constructor(props) {
        super(props);
        this.state = {"error": ""};

        let today = moment().format('YYYY-MM-DD');
        this.state = {"dayDate": today};


    }

    componentDidMount() {


        let today = moment().format('YYYY-MM-DD');
        this.changeDay(today);


    }

    startPage() {
        let today = moment().format('YYYY-MM-DD');
        this.changeDay(today);

    }

    changeDay(newDay) {

        let user = this.props.user;

        console.log("Main - changeDay - newDay: " + newDay);


        this.setState({"dayDate": newDay});

        let _day = {};
        _day.user_id = user.sub.split('|')[1];
        _day.date = newDay;

        //get day
        getDay(_day, (day) => {

                this.setState({"day": day})
            },
            (error) => {

                console.log("ERROR in getDay =  " + error);
                this.setState({"error": error});
            })

    }

    taskToggle(task_id) {
        // alert("update task - "+task_id);
        toggleTask({"task_id": task_id}, (ntask) => {

                let oldDay = this.state.day;

                for (let t of oldDay.day.Tasks) {
                    if (t.task_id === task_id) {
                        t.done = !t.done;
                    }
                }

                this.setState({"day": oldDay})
            },
            (error) => {

                console.log("ERROR in getDay =  " + error);
                this.setState({"error": error});
            })

    }

    addTask(newTask, quad) {
        let oldDay = this.state.day;

        let task = {
            "task": {

                "task_text": newTask,
                "done": false,
                "notes": null,
                "quadrant": quad,
                "day_id": oldDay.day.day_id
            }
        }

        addTask(task, (ntask) => {

                if (oldDay.day.Tasks === undefined) {
                    oldDay.day.Tasks = [];
                }


                oldDay.day.Tasks.push(ntask.task);

                this.setState({"day": oldDay})
            },
            (error) => {

                console.log("ERROR in getDay =  " + error);
                this.setState({"error": error});
            })


    }

    updateTask(updatedTask) {

        let task = {
            "task": updatedTask
        };

        updateTask(task, (ntask) => {

                this.changeDay(this.state.dayDate);
            },
            (error) => {

                console.log("ERROR in updateTask =  " + error);
                this.setState({"error": error});
            })


    }

    addHabits()
    {
        let day_id = this.state.day.day.day_id;

        addHabitsToDay({"day_id":day_id}, (day) => {

            if(day.err==="no habits found")
            {

                alert("You don't seem to have any active habits set up.");
            }

                this.changeDay(this.state.dayDate);
            },
            (error) => {

                console.log("ERROR in addHabits =  " + error);
                this.setState({"error": error});
            })
    }


    removeTask(task_id) {


        removeTask({"task_id":task_id}, (ntask) => {

                this.changeDay(this.state.dayDate);
            },
            (error) => {

                console.log("ERROR in removeTask =  " + error);
                this.setState({"error": error});
            })


    }

    render() {
        // NOTE: array is 1 based! so there's a blank at the start
        let qLabels = ["", "Soul", "Offering", "Home & Family", "Intention"];

        // NOTE: array is 1 based! so there's a blank at the start
        let qPlaceholders = ["",
            "walk in nature, meditation, bath",
            "papers to write, phone calls for work",
            "Laundry,  Groceries, Cleaning house",
            "Self Care, Gratitude, Love"
        ];

        // NOTE: array is 1 based! so there's a blank at the start
        let qSubPlaceholders = ["",
            "What are you going to do to nurture yourself?",
            "What are you going to do for work and community?",
            "What are you going to do to support your inner circle",
            "What is your intention for the day"
        ];



        let daDay = this.state.day;
        // console.log("Main - render - daDay: " + JSON.stringify(daDay));


        let prettyDay = moment(this.state.dayDate).format("dddd, MMMM Do YYYY");

        // console.log("Main-Render(): session = " + JSON.stringify(session));


        let daBody = [];

        if (daDay === undefined || daDay === {} || _.isEmpty(daDay)) {

            daBody.push(<div key={"qStart"}>
                <button onClick={() => this.startPage()}>Start</button>
            </div>)
        } else {

            let allTasks = daDay.day.Tasks;


            // NOTE: array is 1 based! so there's a blank at the start
            let qTasks = [[], [], [], [], []];


            if (allTasks !== undefined) {
                for (let tk of allTasks) {

                    qTasks[tk.quadrant].push(tk);

                }
            }


            for (let i = 1; i < 5; i++) {
                let thisQ = <div className={'quad quad' + i} key={"qDiv" + i}>
                    <Quadrant placeholder={qPlaceholders[i]}
                              subLabel={qSubPlaceholders[i]}
                              onUpdateTask={(updatedTask) => this.updateTask(updatedTask)}
                              onAddTask={(newTask, quad) => this.addTask(newTask, i)}
                              onRemoveTask={(task_id) => this.removeTask(task_id)}
                              onTaskClicked={(task_id) => this.taskToggle(task_id)} key={"q" + i} tasks={qTasks[i]}
                              qName={qLabels[i]}/>
                </div>

                daBody.push(thisQ);

            }

        }


        return (
            <Fragment>
                <div>
                    <div className={'line'}></div>
                    {prettyDay}


                    <Day dayChange={(newDay) => this.changeDay(newDay)} currentDay={this.state.dayDate}/>
<div>
    <button className={'btn btn-primary'} onClick={()=>this.addHabits()}>I want to reinforce my new good habits!</button>
</div>
                    <div className={"appHolder"}>
                        {daBody}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default FQTrack;
