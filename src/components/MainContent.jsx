import ProfilePicture from '../assets/Alex_dark_blue.jpg'
import Plus from '../assets/plus.png'
import classes from './MainContent.module.css'

export default function MainContent() {
    return (
        <div className={classes.mainContent}>
            <div className={classes.introduction}>
                <p>Hi, <br />
                    Nice to meet you! <br />
                    I’m Alex.</p>

                <p className={classes.smallIntroduction}>I come from Honduras, and have been living in Taiwan since fall 2021.
                    I’m a Mechatronic Engineer, with a masters in ISA - Information in Systems
                    and Applications from 清華大學.</p>
                <hr></hr>
                <div className={classes.yearsExperience}>
                    <p>3</p>
                    <img src={Plus} alt='plus-sign' />
                    <div className={classes.differentDomainsText}>
                        <p>
                            Years of Experience
                            in different domains
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.ppContainer}>
                <img className={classes.profilePicture} src={ProfilePicture} alt="Alex Headshot Picture" />
            </div>
        </div>
    );
}