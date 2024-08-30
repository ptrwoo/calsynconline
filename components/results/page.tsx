// 'use client'
// import { aggregateResponses } from '@/utils/aggregateResponses'
// import React, { useEffect, useState } from 'react'

interface availabilityData {
  count: number;
  names: string[];
}

interface ResultsProps {
  availabilityData: { [date: string]: availabilityData };
}

const Results: React.FC<ResultsProps> = ({ availabilityData }) => {
  // const [availabilityData, setAvailabilityData] = useState<{ [date:string]: availabilityData }>({})

  // useEffect(() => {
  //   try{
  //     const aggregateData = aggregateResponses();
  //     setAvailabilityData(aggregateData)
  //   } catch(error) {
  //     console.error('Error fetching availability data:', error)
  //   }
  // }, [])

  return (
    <div>
      <h3>Availability Results</h3>
      {Object.keys(availabilityData).length > 0 ? (
        <ul>
          {Object.entries(availabilityData).map(([date, { count, names }]) => (
            <li key={date}>
              {date}: {count} users available
              <ul>
                {names.map((name, index) => (
                  <li key={index}>- {name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p> No availability data found </p>
      )}
    </div>
  );
};

export default Results;
