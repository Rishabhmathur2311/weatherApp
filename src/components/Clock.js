import React, { useState } from "react";

const Clock=()=>{
    let time=new Date().toLocaleTimeString();
    const [ctime, setTime]=useState(time);

    const updateTime=()=>{
        time=new Date().toLocaleTimeString();
        setTime(time);
    };

    setInterval(updateTime,1000);

    return (
        <div>
            {ctime}
        </div>
    );
}

export default Clock;