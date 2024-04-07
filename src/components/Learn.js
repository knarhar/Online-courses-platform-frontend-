import React from 'react'
import cube from '../statics/images/cube.jpg'
import learn from '../statics/images/learn and grow.png'
import '../statics/css/homepage.css'
const Learn = () => {
    return (
        <div>
            <div className='learn'>
                <img src={learn} width="700px" />
                <p>Your CourseCore learning experience is grounded in cutting edge cognitive science.
                    With more than two dozen distinct learning features to help you achieve your goals, our approach follows three key principles:
                    Learn new knowledge and skills in a variety of ways, from engaging video lectures and dynamic graphics to data visualizations
                    and interactive elements.
                </p>
            </div>

            <div className='learn2'>
                <p>
                    Demonstrating your knowledge is a critical part of learning. CourseCore courses and programs 
                    provide a space to practice with quizzes, open response assessments, virtual environments, and more.
                    <br/>Learning on CourseCore transforms how you think and what you can do, and translates directly into the real 
                    world—immediately apply your new capabilities in the context of your job.
                </p>
                <img src={cube} alt='cube'/>
            </div>

        </div>
    )
}

export default Learn
