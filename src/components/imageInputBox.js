import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

class ImageInputBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: new Image()

        };
    }
    render(){
        return(
            <button style={ {width : "150px", height : "150px", backgroundColor: "#FAE5F2", color : "gray", fontSize : "50px", border : "0"} }>+</button>
        )
    }
        
}
export default ImageInputBox;
