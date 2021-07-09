import React from 'react'

export default function Table({countries}) {

   //  console.log("Table COmpo: ",countries)
    return (
        <div className="table">
         
{countries.map((countryInfo)=>{
                    const {country, cases} = countryInfo;
          return           <tr key={country}>
                        <td>{country}</td>
                        <td>{cases}</td>

                    </tr>
                })}
                 
        </div>
    )
}
