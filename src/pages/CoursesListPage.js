import React, {useState, useEffect} from 'react'

function CoursesListPage () {

    let [ courses, setCourses] = useState([]) 

    useEffect(()=>{
        getCourses()
    }, [])

    let getCourses = async ()=>{
        let response = await fetch('http://127.0.0.1:8000/api/courses/')
        let data = await response.json()
        setCourses(data)
    }

  return (
    <div>
        <div className='courses-list'>
            {courses.map((course, index)=>(
                <div key={index} className='course-card'>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <p>{course.is_paid}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CoursesListPage