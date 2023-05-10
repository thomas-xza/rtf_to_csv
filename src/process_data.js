import { React, useState, useEffect } from 'react';

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

export function objs_arr_to_json(objs_arr=[{}], set_data_json) {

    const pretty_objs = objs_arr.map( (obj) =>

				      JSON.stringify(obj, null, 4)

				    );

    set_data_json(pretty_objs.join("\n"));

};

function format_data(data_as_objs, csv_header) {

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

function convert_rtf_to_plain_text(rtf) {
    
    return rtf
	.replace(/\\par[d]?/g, '')
	.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '').trim();

};

function add_data_to_objs(objs_arr) {

    console.log("add_data_to_objs", objs_arr);

    const date = new Date();

    const new_objs = objs_arr.map( (obj) => {

	obj["DATE"] = date.toLocaleDateString('en-GB', {
	    year: 'numeric',
	    month: '2-digit',
	    day: '2-digit',
	});

	obj["REFERRAL TYPE"] = "Email";

	obj["REFERRAL SOURCE"] = "UHL";

	return obj;

    })

    return new_objs;

};

function extract_data_from_rtf(new_obj, text_data) {
    
    //  this is where the application-specific knowledge is

    // console.log('text-data', typeof text_data, text_data);

    const names = text_data.match(/Name:.*Sex:/)[0]
	  .replace('Name:','')
	  .replace('Sex:', '')
	  .split(',');

    new_obj['NAME'] = names[1].trim();
    
    new_obj['SURNAME'] = names[0].trim();

    new_obj['DOB'] = text_data.match(/DOB.*Age/)[0].match(/[0-9]{4}/)[0].trim();

    const phones = text_data.match(/Telephone.*Hospital/)[0]
	  .replace('Telephone:','')
	  .replace('Hospital:','').trim();

    new_obj['MOB'] = phones.match(/Mobile = [0-9]*/)[0]
	.replace('Mobile = ','').trim();
    
    new_obj['TEL'] = phones.match(/Home = [0-9]*/)[0]
	.replace('Home = ', '').trim();

    const address = text_data.match(/Address.*Patient Telephone/)[0]
	  .replace('Address:','')
	  .replace('Patient Telephone','')
	  .split(',');

    new_obj['ADDRESS'] = address[0].trim();
    
    new_obj['POST CODE'] = address.slice(-1)[0].trim();

    new_obj["REFERRER NAME"] = text_data
	.match(/Requesting Doctor.*Consultant/)[0]
	.replace('Requesting Doctor:', '')
	.replace('Consultant', '')
	.replace(', ','').trim();

    new_obj["REFERRING DEPT/ORG"] = text_data
	.match(/Referring Speciality.*Other/)[0]
	.replace('Referring Speciality','')
	.replace('Other','')
	.replace(',','').trim();
    
    new_obj["PRACTICE"] = text_data
	.match(/Practice.*_/)[0]
	.replace('Practice:','')
	.replace(/,.*/,'').trim();
    
    return new_obj;

};

