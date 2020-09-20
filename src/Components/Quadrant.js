import React, {Component} from 'react';
import Heart from './Heart';
import MoveGrid from './MoveGrid';


class Quadrant extends Component {

    getEditIcon() {

        return <svg className="bi bi-pencil-square" width="14px" height="14px" viewBox="0 0 16 16"
                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
            <path fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
                  clipRule="evenodd"/>
        </svg>
    }



    constructor(props) {
        super(props);

        this.state = {"error": ""};
        this.state = {"newTask": ""};
        this.state = {"editingTask": {}};
        this.state = {"editMode": false};


    }

    componentDidMount() {

        //console.log("Quadrant did mount");

    }

    onKeyPress(event) {

        switch (event.charCode) {
            case 13:
                this.addTask();
                break;
            default:
        }
    }

    updateTask(event) {
        //if (event.target.)
        this.setState({"newTask": event.target.value});

    }

    moveTask(mtq)
    {
        let tsk = this.state.editingTask;

        tsk.quadrant = mtq;

        this.setState({"editingTask":tsk});

        this.addTask()
    }

    removeTask()
    {
        let tsk = this.state.editingTask;

        this.props.onRemoveTask(tsk.task_id)
    }

    addTask() {
        let tt = this.state.newTask;
        let es = this.state.editMode;
        if (tt !== '' && tt !== undefined) {
            if (es) {

                this.setState({'editMode': false});
                let ut = this.state.editingTask;

                ut.task_text = tt;

                this.props.onUpdateTask(ut);
            } else {
                this.props.onAddTask(tt);
            }

        }

        this.setState({newTask: ''});

    }

    completeTask(event, task_id) {
        // alert("completed - "+task_id)

        this.props.onTaskClicked(task_id);
    }

    startEdit(task, oldText) {
        this.setState({'editingTask': task});

        // hide new task button
        // show update and cancel buttons
        this.setState({'editMode': true});

        //put old text in edit box
        this.setState({'newTask': oldText});


    }

    cancelEdit() {
        this.setState({'editMode': false});

        // clear text input
        this.setState({'newTask': ''});
    }

    render() {


        let qName = this.props.qName;
        let subLabel = this.props.subLabel;

        let tasks = this.props.tasks;
        let qNum = 0;


        let tasksToShow = [];
        let dayPerc = 0;
        let doneCount = 0;

        for (let t of tasks) {
            let chk = <input type="checkbox" id={"tsk_" + t.task_id}
                             onChange={(event, task_id) => this.completeTask(event, t.task_id)} checked={t.done}/>

            qNum = t.quadrant;
            if (t.done) {
                doneCount++;
            }

            let thisTask = <div key={t.task_id}>
                <div className={'taskText'}> {chk} </div>
                <div className={'taskText'}
                     style={{"position": "relative", "top": "3px", "left": "5px"}}> {t.task_text}

                    <div className={'editIcon'}
                         onClick={(task, oldtext) => this.startEdit(t, t.task_text)}>{this.getEditIcon()}</div>

                </div>


                <div className={"line"}></div>
            </div>

            tasksToShow.push(thisTask);
        }

        dayPerc = (doneCount / tasks.length) * 100;

        return (
            <div>
                <div className={'qName'}>

                    <div className={'qHead'}>{qName}</div>
                    <div className={'subHead'}>{subLabel}</div>
                    <div className={'heartHolder'}><Heart percent={dayPerc}/></div>
                    <div className={"line"}></div>

                    <div style={{"paddingLeft": "30px", "overflow": "auto", "height": "250px"}}>
                        <div className={"line"}></div>
                        <div className={'taskText'}>

                            <div style={{"paddingBottom": "20px"}}>
                                {tasksToShow}
                            </div>
                            <input type={'text'} onKeyPress={(event) => this.onKeyPress(event)}
                                   placeholder={this.props.placeholder || ''} size="40" value={this.state.newTask || ''}
                                   onChange={(event) => this.updateTask(event)}/>
                            <div style={{"padding": "10px"}}>
                                <button style={!this.state.editMode ? {} : {'display': 'none'}}
                                        onClick={() => this.addTask()}>Add Task
                                </button>

                                <div style={this.state.editMode ? {} : {'display': 'none'}}>
                                    <div className={'deleteButt'} onClick={() => this.removeTask()}>Delete</div>
                                    <div className={'mover'}><MoveGrid quadrant={qNum} onMove={(mtq)=>this.moveTask(mtq)}/></div>

                                    <div className={"line"}></div>
                                    <button onClick={() => this.addTask()}>Update Task</button>
                                    &nbsp;
                                    <button onClick={() => this.cancelEdit()}>Cancel</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quadrant;
