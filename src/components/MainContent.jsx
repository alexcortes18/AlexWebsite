import ProfilePicture from '../assets/Alex_dark_blue.jpg'
import Plus from '../assets/plus.png'

export default function MainContent() {
    return (
        <div className="main-content">
            <div className="introduction">
                <p>Hi, <br />
                    Nice to meet you! <br />
                    I’m Alex.</p>

                <p className='small-introduction'>I come from Honduras, and have been living in Taiwan since fall 2021.
                    I’m a Mechatronic Engineer, with a masters in ISA - Information in Systems
                    and Applications from 清華大學.</p>
                <hr></hr>
                <div className='years-experience'>
                    <p>3</p>
                    <img src={Plus} alt='plus-sign' />
                    <div className='different-domains-text'>
                        <p>
                            Years of Experience
                            in different domains
                        </p>
                    </div>
                </div>
            </div>
            <div className='pp-container'>
                <img className="profile-picture" src={ProfilePicture} alt="Alex Headshot Picture" />
            </div>
        </div>
    );
}