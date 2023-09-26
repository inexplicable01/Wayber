import React, {useEffect, useState} from 'react';
import {useTable} from 'react-table';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = 'your_mapbox_access_token_here';

const ListingPage = () => {
    const [map, setMap] = useState(null);
    const [propertyData, setPropertyData] = useState([]);

    useEffect(() => {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98.5795, 39.8283],
            zoom: 3,
        });

        setMap(map);

        // Load property data (you should replace this with actual API calls or data fetching)
        setPropertyData([
            {
                id: 1,
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                price: 1000000,
                bedrooms: 3,
                bathrooms: 2,
                area: 1500,
            },
            // Add more properties here
        ]);

        return () => {
            map.remove();
        };
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'State',
                accessor: 'state',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Bedrooms',
                accessor: 'bedrooms',
            },
            {
                Header: 'Bathrooms',
                accessor: 'bathrooms',
            },
            {
                Header: 'Area',
                accessor: 'area',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: propertyData});

    return (
        <div>
            <div id="map" style={{width: '100%', height: '400px'}}></div>
            <table {...getTableProps()} style={{width: '100%', marginTop: '1rem'}}>
                <thead>
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                        {headerGroup.headers.map((column, columnIndex) => (
                            <th {...column.getHeaderProps()} key={columnIndex}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={rowIndex}>
                            {row.cells.map((cell, cellIndex) => {
                                return (
                                    <td {...cell.getCellProps()} key={cellIndex}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>

            </table>
        </div>
    );
};


export default ListingPage;

