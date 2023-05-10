import { React, useState, useEffect } from 'react';

export function objs_arr_to_json(objs_arr=[{}], set_data_json) {

    const pretty_objs = objs_arr.map( (obj) =>

				      JSON.stringify(obj, null, 4)

				    );

    set_data_json(pretty_objs.join("\n"));

};

export function format_data(data_as_objs, csv_header) {

    const csv_header_arr = csv_header.split(',');
    
    const final_output = new Array(data_as_objs.length + 1);

    final_output[0] = csv_header;

    data_as_objs.map( (obj, index_a) => {

	const new_row = new Array(csv_header_arr.length);
	
	csv_header_arr.map( (header, index_b) => {

	    new_row[index_b] = obj[header];

	})


	final_output[index_a + 1] = new_row.join(',');

    });

    console.log(final_output);
    
    return final_output.join('\n');

};

