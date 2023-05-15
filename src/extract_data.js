import React from 'react';
import { useState, useEffect } from 'react';


export function extract_data_from_rtf(obj, data) {
    
    //  this is where the application-specific knowledge is

    // console.log('text data', typeof text_data, data);

    return { ...obj,
	     
	     'FORENAME': extract_forename(data),
	     
	     'SURNAME': extract_surname(data),

	     'FULLNAME': extract_fullname(data),
	     
	     'DOB': extract_dob(data),
	     
	     'MOB': extract_mobile(data),

	     'TEL': extract_hometel(data),

	     'ADDRESS': extract_addr_line(data),

	     'POST CODE': extract_postcode(data),

	     'REFERRER NAME': extract_refer_name(data),

	     'REFERRING DEPT/ORG': extract_refer_dept(data),

	     'REF DATE': extract_refer_date(data),

	     'REF DATE_STR': extract_refer_date_str(data),

	     'REF DATE_MONTH': extract_refer_date_month(data),

	     'GP': extract_gp(data) };
    
};


export function extract_names(data) {

    return data.match(/Name:.*Sex:/)[0]
	.replace('Name:','')
	.replace('Sex:', '').trim()
	.split(',');

}

export function extract_fullname(data) {

    try {

	const names = extract_names(data);

	return title_case(names[1].trim() + " " + names[0]);

    } catch { return "" }
    
}

export function extract_forename(data) {

    try {

	const names = extract_names(data);

	return title_case(names[1].trim());

    } catch { return "" }
    
}

export function extract_surname(data) {

    try {

	const names = extract_names(data);
    
	return title_case(names[0]);

    } catch { return "" }
}

export function extract_dob(data) {

    try {

	const extraction = data
	      .match(/DOB.*Age/)[0]
	      .replace('DOB','')
	      .replace('Age','')
	      .replace(',','').trim();

	const date_obj = new Date(Date.parse(extraction));
	
	return date_obj.toLocaleDateString('en-GB', {
                     year: 'numeric',
                     month: '2-digit',
            day: '2-digit' });
	
    // return data.match(/DOB.*Age/)[0].trim();
    
    } catch { return "" }
    
}

export function extract_phones(data) {
    
    return data.match(/Telephone.*Hospital/)[0]
	.replace('Telephone:','')
	.replace('Hospital:','')
	.replace(',','').trim();
    
}

export function extract_mobile(data) {

    try {

	const phones = extract_phones(data);

	return phones.match(/Mobile = [0-9]*/)[0]
	    .replace('Mobile = ','').trim();

    } catch { return "" }
    
}

export function extract_hometel(data) {

    try {

	const phones = extract_phones(data);

	return phones.match(/Home = [0-9]*/)[0]
	    .replace('Home = ', '').trim();

    } catch { return "" }
    
}

export function extract_addr(data) {

    return data.match(/Address.*Patient Telephone/)[0]
	  .replace('Address:','')
	  .replace('Patient Telephone','')
	  .split(',');

}

export function extract_addr_line(data) {

    try {

	const addr = extract_addr(data);

	return addr[0].trim();
    
    } catch { return "" }
}

export function extract_postcode(data) {

    try {

	const addr = extract_addr(data);

	return addr.slice(-1)[0].trim();

    } catch { return "" }
    
}

export function extract_refer_dept(data) {

    try {

	if data.includes("TDT") { return "TDT" }

	else {

	    return data
		.match(/Referring Speciality.*Other/)[0]
		.replace('Referring Speciality','')
		.replace('Other','')
		.replace(',','').trim();

	    }

    } catch { return "" }
    
}

export function extract_refer_name(data) {

    try {

	const names = data
	      .match(/Requesting Doctor.*Consultant in Charge/)[0]
	      .replace('Requesting Doctor:', '')
	      .replace('Consultant in Charge', '').trim()
	      .split(',');

	return title_case(names[1].trim() + " " + names[0].trim());

    } catch { return "" }

}

export function extract_refer_date_generic(data) {

	return data
	    .match(/Requested on.*Patient Name/)[0]
	    .replace('Requested on :','')
	    .replace('Patient Name','').trim()
	.split(',')[0];
	
}    

export function extract_refer_date(data) {

    try {

	const date_obj = new
	Date(Date.parse(extract_refer_date_generic(data)));
	
	return date_obj.toLocaleDateString('en-GB', { year: 'numeric',
						      month: '2-digit', day: '2-digit'});
			     
    } catch { return "" }

}

export function extract_refer_date_str(data) {

    try {

	const refer_date_str = extract_refer_date(data);

	return "_" + refer_date_str;
			     
    } catch { return "" }

}

export function extract_refer_date_month(data) {

    try {

	const date_obj = new Date(Date.parse(extract_refer_date_generic(data)));
	
	return date_obj.toLocaleDateString('en-GB', {
                     month: 'long'
        }).toUpperCase();
		     
    } catch { return "" }

}

export function convert_date_to_obj(date) {

    const date_obj = Date.parse(date);

    return date.toLocaleDateString('en-GB', {
	    year: 'numeric',
	    month: '2-digit',
	    day: '2-digit'
    });

}

export function extract_gp(data) {

    try {

	return title_case(data
			  .match(/Practice.*_/)[0]
			  .replace('Practice:','')
			  .replace(/,.*/,'')
			  .trim());

    } catch { return "" }
    
}

export function title_case(str) {
    
    return str.toLowerCase().split(' ').map(function(word) {
	
	return (word.charAt(0).toUpperCase() + word.slice(1));
	
    }).join(' ');
    
}
