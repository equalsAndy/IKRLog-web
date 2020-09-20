import React, {Component} from 'react';


class Heart extends Component {

    constructor(props) {
        super(props);

        this.state = {"password": ""};
        this.state = {"username": ""};


    }





    render() {

        let perc = this.props.percent;

        let g = 255*(perc/100);
        let r = 255-g;


        let _color = "rgb("+r+","+g+",100)";

       // console.log("_color = "+_color);

        return (
            <div className={"heartHolder"}>


                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill={_color}  d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                </svg>
            </div>
        );
    }
}

export default Heart;
