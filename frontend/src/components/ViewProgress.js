import React from 'react'
import {LineChart,XAxis,YAxis,CartesianGrid,Line,Tooltip,Legend} from 'recharts'
import { useLocation } from 'react-router-dom';

const TooltipContent= (props) =>{
 if(!props || !props.active || !props.payload || !props.payload[0]){
 return
 }
const data=props.payload[0].payload
return(
  <div >
     <div>Assignment_Number: {data.assignment_number}</div>
     <div>Mark: {data.mark}</div>
     
  </div>
)
}

function ViewProgress(){
  const [data,setData]=React.useState([])
  const location = useLocation();
  const loggedInUser = new URLSearchParams(location.search).get('username');
   console.log("the user before effect: %s",loggedInUser);

    React.useEffect(() => {
      // Make an API call to fetch data from Spring Boot
      
      if(loggedInUser){
      fetch(`http://localhost:8080/student/getAssignStudent?s=${loggedInUser}`)
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
          console.log("the user in effect: %s",loggedInUser);
      }
  }, [loggedInUser]);
  console.log("the user after effect: %s",loggedInUser);
        return (
          <div className="App">
            <LineChart data={data} width={1000} height={300}>
              <XAxis dataKey={"assignment_number"} />
              <YAxis domain={[0,10]} type='number'/>
              <CartesianGrid stroke="grey" strokeDasharray="5 5"/>
              <Line dataKey={"mark"} stroke="purple" strokeWidth={3} isAnimationActive={false}/>
              <Legend/>
              <Tooltip content={<TooltipContent/>}/>

            </LineChart>


          </div>
        );
      
    }

export default ViewProgress