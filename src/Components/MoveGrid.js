import React, {Component} from 'react';



class moveGrid extends Component {

    getArrow(rot) {

        if(rot===null)
        {
            return <span></span>
        }

        let rotAngle = "rotate(" + rot + ")";
        return <svg
            className="bi bi-arrow-down"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            transform={rotAngle}
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                  clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clipRule="evenodd"/>
        </svg>


    }

    constructor(props) {
        super(props);

        this.state = {"error": ""};

    }

    moveTo(mtq)
    {

        this.props.onMove(mtq);
    }

    render() {
let qNum = this.props.quadrant;

    let arrows = [0,0,0,0];

    let classes = ['mGrid','mGrid','mGrid','mGrid'];


    if (qNum===1)
    {
        arrows[0] = null;
        arrows[1] = -90;
        arrows[2] = 0;
        arrows[3] = -45;

        classes[0]='bGrid';


    } else if (qNum===2)
    {
        arrows[0] = 90;
        arrows[1] = null;
        arrows[2] = 45;
        arrows[3] = 0;
        classes[1]='bGrid';


    }else if (qNum===3)
    {
        arrows[0] = 180;
        arrows[1] = 225;
        arrows[2] = null;
        arrows[3] = -90;
        classes[2]='bGrid';

    }else if (qNum===4)
    {
        arrows[0] = 135;
        arrows[1] = 180;
        arrows[2] = 90;
        arrows[3] = null;
        classes[3]='bGrid';
    }


        return (
            <div className={'moveGridHolder'}>
                <div style={{'float':"left", 'position':'relative','top':'5px'}}>Move</div>
                <div className={classes[0]} onClick={(mtq)=>this.moveTo(1)}>{this.getArrow(arrows[0])}</div>
                <div className={classes[1]} onClick={(mtq)=>this.moveTo(2)} >{this.getArrow(arrows[1])}</div>
                <div className={classes[2]} onClick={(mtq)=>this.moveTo(3)} >{this.getArrow(arrows[2])}</div>
                <div className={classes[3]} onClick={(mtq)=>this.moveTo(4)} >{this.getArrow(arrows[3])}</div>

            </div>
        );
    }
}

export default moveGrid;
