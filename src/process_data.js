import React from 'react';
import { useState, useEffect } from 'react';
import { extract_data_from_rtf } from './extract_data';


export function process_data(loaded_files, csv_header) {

    // console.log('process data #1', loaded_files);
    
    
    const cleaned_data_arr = loaded_files.map( (data, index) => 
					       
					       convert_rtf_to_plain_text(data)

					     );

    console.log(cleaned_data_arr);

    const obj_template = csv_to_obj(csv_header);

    const data_as_objs_arr = cleaned_data_arr.map( (data) => 

						   extract_data_from_rtf(obj_template, data)

						 );

    console.log(data_as_objs_arr);

    // return data_as_objs_arr;

    const final_objs_arr = add_data_to_objs(data_as_objs_arr);

    console.log(final_objs_arr);

    return final_objs_arr;

};

function csv_to_obj(csv_header) {

    const obj_template = {};

    csv_header.split(',').map(
	
	(field_name) => obj_template[field_name] = '' )

    return obj_template;

};

function convert_rtf_to_plain_text(rtf) {

    console.log(rtf);

    const clean_rtf = rtf
	.replace(/\\par[d]?/g, '')
	.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '').trim();
    
    console.log(clean_rtf);
    
    return clean_rtf;

};

function add_data_to_objs(objs_arr) {

    //  This function adds generic kinds of data to all records input

    console.log("add_data_to_objs", objs_arr);

    const date = new Date();

    const new_objs = objs_arr.map( (obj) => {

	return { ...obj,
		 
		 'DATE': date.toLocaleDateString('en-GB', {
		     year: 'numeric',
		     month: '2-digit',
		     day: '2-digit',
		 }),

		 'DATE_MONTH': date.toLocaleDateString('en-GB', {
		     month: 'long'
		 }),

		 'REFERRAL TYPE': 'Email',

		 'REFERRAL SOURCE': 'Lewisham Hospital',
		 
		 'REFERRING TEAM': 'LEWISHAM HOSPITAL',
		 
		 'PLACEHOLDER': ''
		 
	       };

    })

    return new_objs;

};

