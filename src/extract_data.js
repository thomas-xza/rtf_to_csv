import React from 'react';
import { useState, useEffect } from 'react';


function extract_data_from_rtf(obj, text_data) {
    
    //  this is where the application-specific knowledge is

    // console.log('text-data', typeof text_data, text_data);

    return { ...obj,
	     
	     'NAME': extract_forename(data),
	     
	     'SURNAME': extract_surname(data),
	     
	     'DOB': extract_dob(data),
	     
	     'MOB': extract_mobile(data),

	     'TEL': extract_hometel(data),

	     'ADDRESS': extract_addr_line(data),

	     'POST CODE': extract_postcode(data),

	     'REFERRER NAME': extract_refer_name(data),

	     'REFERRING DEPT/ORG': extract_refer_dept(data),

	     'PRACTICE': extract_gp(data) }
    
};


function extract_names(data) {

    return data.match(/Name:.*Sex:/)[0]
	  .replace('Name:','')
	  .replace('Sex:', '')
	  .split(',');

}

function extract_forename(data) {

    const names = extract_names(data)

    return names[1].trim();
    
}

function extract_surname(data) {

    const names = extract_names(data)
    
    return names[0].trim();
}

function extract_dob(data) {

    return data.match(/DOB.*Age/)[0].match(/[0-9]{4}/)[0].trim();
    
}

function extract_phones(data) {
    
    return data.match(/Telephone.*Hospital/)[0]
	  .replace('Telephone:','')
	  .replace('Hospital:','').trim();
    
}

function extract_mobile(data) {

    const phones = extract_phones(data)

    return phones.match(/Mobile = [0-9]*/)[0]
	.replace('Mobile = ','').trim();
    
}

function extract_hometel(data) {

    const phones = extract_phones(data)

    return phones.match(/Home = [0-9]*/)[0]
	.replace('Home = ', '').trim();
}

function extract_addr(data) {

    return data.match(/Address.*Patient Telephone/)[0]
	  .replace('Address:','')
	  .replace('Patient Telephone','')
	  .split(',');

}

function extract_addr_line(data) {

    const addr = extract_addr(data)

    return addr[0].trim();
    
}

function extract_postcode(data) {

    const addr = extract_addr(data)

    return addr.slice(-1)[0].trim();
    
}

function extract_refer_dept(data) {

    return data
	.match(/Referring Speciality.*Other/)[0]
	.replace('Referring Speciality','')
	.replace('Other','')
	.replace(',','').trim();
    
}

function extract_refer_name(data) {

    return data
	.match(/Requesting Doctor.*Consultant/)[0]
	.replace('Requesting Doctor:', '')
	.replace('Consultant', '')
	.replace(', ','').trim();

}

function extract_gp(data) {

    return data
	.match(/Practice.*_/)[0]
	.replace('Practice:','')
	.replace(/,.*/,'').trim();
    
}
