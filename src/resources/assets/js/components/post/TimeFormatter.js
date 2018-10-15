import React from 'react';
import util from 'app/lib/util';

class TimeFormatterComponent extends React.Component {

    constructor(props){
        super(props);
        var date = new Date(props.date);
        date = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()));
        var now  = new Date();
        var diffTime = util.formatDateDiff(now, date);
        this.state = {
            date: date.toString(),
            diffTime: diffTime
        };
    }

    render(){
        return <div className="ui timestamp icon-Meta_Time">
                    <i className="wait icon"></i>
                    <span className="timestamp__date--published">{this.state.date}</span>
                    <span className='timestamp-separator'>|</span>
                    <span className="timestamp__date--modified">
                        <strong>Updated</strong>
                        {this.state.diffTime}
                    </span>
                </div>;
    }

};

TimeFormatterComponent.defaultProps = {};

export default TimeFormatterComponent;
