import React from 'react';
import styles from './Workshop.module.scss'

const Workshop = ({ workshop }) => {

    console.log(workshop)
    
    const isDisabled = workshop.videoLink == ""

    return (
    <div className={`col-md-4 col-sm-6 col-12`}>
            <div className={`${styles.workshop}`}>
                <img className={`img-fluid w-100`} src={workshop.thumbnail} alt="" />
                <div className={`${styles['workshop-text']}`}>
                    <div className='d-flex justify-content-between'>
                        <p>{workshop.instructorName}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i> {workshop.date}</p>
                    </div>
                    <h3>{workshop.title}</h3>
                    <p>
                        {workshop.description.substring(0, 100)}
                    </p>
                    {workshop.status == "Pending" && <a target="_blank" href={workshop.joiningLink}><button className='custom-btn'>Join</button></a>}
                    {/* {workshop.status == "Done" && <a target="_blank" href={workshop.joiningLink}><button disabled={isDisabled} className={`${isDisabled ? "disable-btn" : "custom-btn"}`}>Recorded video</button></a>} */}
                    {workshop.status == "Done" && <a target="_blank" href={workshop.joiningLink}><button disabled={isDisabled} className="custom-btn">Recorded video</button></a>}
                </div>
            </div>
        </div>
    );
};

export default Workshop;