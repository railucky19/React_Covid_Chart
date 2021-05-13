import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'
//Datatables Modules

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery';


export default function Main() {

    const [coviddata, setcoviddata] = useState([]);

    useEffect(() => {

        axios.get('https://api.covid19api.com/summary').then((res) => {
            console.log(res.data)
            setcoviddata(res.data.Countries)
        }).catch((err) => {
            console.log(err)

        })

        $(document).ready(() => {
            $('#mytable').DataTable()
        })

    }, [])

    const tabledata = coviddata.map((obj) => {
        return <tr>
            <td>{obj.Country}</td>
            <td>{obj.CountryCode}</td>
            <td>{obj.Date}</td>
            <td>{obj.NewConfirmed}</td>
            <td>{obj.NewDeaths}</td>
            <td>{obj.NewRecovered}</td>
            <td>{obj.TotalConfirmed}</td>
            <td>{obj.TotalDeaths}</td>
            <td>{obj.TotalRecovered}</td>
            <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
        </tr>

    })


    return (
        <div>
            <h1 style={{ backgroundColor: "red" }}>Covid19 Status</h1>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <table id='mytable' className='table table-dark'>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Country Code</th>
                                <th>Date</th>
                                <th>New Confirmed</th>
                                <th>New Deaths</th>
                                <th>New Recovered</th>
                                <th>Total Confirmed</th>
                                <th>Total Deaths</th>
                                <th>Total Recovered</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabledata}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
