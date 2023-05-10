import React from 'react';
import { useState, useEffect } from 'react';
import { extract_data_from_rtf } from './extract_data';


function extract_names(data) {

    return data.match(/Name:.*Sex:/)[0]
	  .replace('Name:','')
	  .replace('Sex:', '')
	  .split(',');

}

function extract_forename(data) {

    new_obj['NAME'] = names[1].trim();
    
}

function extract_surname(data) {

    new_obj['SURNAME'] = names[0].trim();
}

function extract_dob(data) {

    new_obj['DOB'] = text_data.match(/DOB.*Age/)[0].match(/[0-9]{4}/)[0].trim();
}

function extract_mobile(data) {

}

function extract_hometel(data) {

}

function extract_addr(data) {

}

function extract_postcode(data) {

}

function extract_refer_dept(data) {

}

function extract_refer_name(data) {

}

function extract_gp(data) {

}



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

